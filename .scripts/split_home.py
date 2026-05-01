#!/usr/bin/env python3
"""
Slice 01 Builder helper: split client/src/pages/Home.tsx into
client/src/pages/sections/{Section}Section.tsx files.

Strategy:
1) Read Home.tsx as a list of lines.
2) Slice each function-component (and its co-located helpers) by line range.
3) Per-section, scan the JSX body for which lucide-react icons,
   @/components/* helpers, sonner toast, and @/lib/content constants are
   referenced; emit only those imports.
4) Write the section file with a header comment, the imports, the helpers,
   and the function renamed to <Section>Section as the default export.
5) Rewrite Home.tsx to a thin composer that imports each section file.

Run from repo root: python3 .scripts/split_home.py
"""
from __future__ import annotations
import os
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
HOME = REPO / "client/src/pages/Home.tsx"
OUT_DIR = REPO / "client/src/pages/sections"

# (start_line_1based, end_line_1based_inclusive, source_name, new_name)
# Ranges chosen to fully include each function-component and any helpers
# that are used only by that component. Lines verified against repo HEAD of
# branch `slice-01/home-tsx-split` before this script was written.
SECTIONS = [
    (103, 209, "Hero",          "OverviewSection"),
    (212, 268, "Diagnosis",     "DiagnosisSection"),
    (271, 401, "Schema",        "SchemaSection"),       # includes TemplateBlock 345-401
    (404, 542, "Install",       "InstallSection"),
    (547, 740, "Prompts",       "PromptLibrarySection"),# includes PromptGroup, PromptLibraryItem
    (745, 955, "BuildAndVerify","BuildVerifySection"),
    (960, 1487,"PhaseTwo",      "PhaseTwoSection"),
    (1491,1700,"MetaPRs",       "MetaPRsSection"),
    (1704,1815,"References",    "ReferencesSection"),
]

# Constants that come from "@/lib/content"
CONTENT_NAMES = [
    "BUILD_VERIFY_MARKDOWN", "BUILD_VERIFY_PRINCIPLES", "BUILD_VERIFY_STAGES",
    "ESCALATION_RULE", "FAILURE_MODES", "HANDOFF_TEMPLATE",
    "INSTALL_ANTI_PATTERNS", "INSTALL_STEPS",
    "PHASE_TWO_CALIBRATION", "PHASE_TWO_DORMANT", "PHASE_TWO_FINDINGS",
    "PHASE_TWO_BUILDER_PR_DESCRIPTION", "PHASE_TWO_BUILDER_PROMPT",
    "PHASE_TWO_VERIFIER_PR_COMMENT", "PHASE_TWO_INSTALL_COMPLETE",
    "PHASE_TWO_INTRO", "PHASE_TWO_LEVERAGE", "PHASE_TWO_PHASES",
    "PHASE_TWO_PROMPT", "PHASE_TWO_TRIAGE", "PHASE_TWO_WIRING",
    "META_INTRO", "META_WHEN_TO_USE",
    "META_VERIFIER_PROMPT_PHASE_1", "META_VERIFIER_PROMPT_PHASE_2",
    "META_BUILDER_PROMPT_PHASE_2",
    "META_BUILDER_PR_DESCRIPTION", "META_VERIFIER_PR_COMMENT",
    "PROMPT_LIBRARY",
    "REFERENCES", "REFERENCE_READING_ORDER",
    "REFERENCE_READING_ORDER_INTRO", "REFERENCE_NOTE",
    "SCHEMA_FILES",
]
# Type-only imports from @/lib/content
CONTENT_TYPES = ["LibraryPrompt"]

# lucide-react icons available in original Home.tsx import line
LUCIDE = ["ArrowDown", "Check", "ChevronRight", "Copy", "ExternalLink", "FileText"]

# Local @/components imports (not from diagrams)
LOCAL_COMPONENTS = {
    "BuildVerifyDiagram": "@/components/BuildVerifyDiagram",
    "MarkdownBlock": "@/components/MarkdownBlock",
    "PromptCard": "@/components/PromptCard",
    "SectionHeader": "@/components/SectionHeader",
}

# Components from @/components/diagrams barrel
DIAGRAM_NAMES = [
    "DiagramFigureLegend", "DocumentCadenceDiagram",
    "FailureModesMatrixDiagram", "InstallPipelineDiagram",
    "MetaPRScopeDiagram", "PhaseModelDiagram", "PromptScenariosDiagram",
    "ReferenceArchitectureDiagram",
]

def detect_imports(body: str):
    """Scan a JSX/TS body and return import lines needed to compile it."""
    needed = {
        "react": set(),       # e.g. {"useState"}
        "lucide": set(),
        "sonner_toast": "toast" in re.findall(r"\btoast\b", body).__str__() if False else ("toast" in body and re.search(r"\btoast\b", body)),
        "content": set(),
        "content_types": set(),
        "components": set(),  # local component names
        "diagrams": set(),
    }
    # react hooks
    for hook in ("useState", "useEffect", "useMemo", "useCallback", "useRef"):
        if re.search(rf"\b{hook}\b", body):
            needed["react"].add(hook)
    # lucide icons
    for ic in LUCIDE:
        # Match as JSX tag, function arg, or identifier; avoid "FileText" matching "FileText/" etc only.
        if re.search(rf"\b{ic}\b", body):
            needed["lucide"].add(ic)
    # sonner toast
    needed["sonner_toast"] = bool(re.search(r"\btoast\b", body))
    # content constants
    for name in CONTENT_NAMES:
        if re.search(rf"\b{name}\b", body):
            needed["content"].add(name)
    for tname in CONTENT_TYPES:
        if re.search(rf"\b{tname}\b", body):
            needed["content_types"].add(tname)
    # local components
    for cname in LOCAL_COMPONENTS.keys():
        if re.search(rf"\b{cname}\b", body):
            needed["components"].add(cname)
    # diagram components
    for d in DIAGRAM_NAMES:
        if re.search(rf"\b{d}\b", body):
            needed["diagrams"].add(d)
    return needed

def render_imports(needed):
    out = []
    if needed["react"]:
        out.append('import { ' + ", ".join(sorted(needed["react"])) + ' } from "react";')
    if needed["lucide"]:
        out.append('import { ' + ", ".join(sorted(needed["lucide"])) + ' } from "lucide-react";')
    if needed["sonner_toast"]:
        out.append('import { toast } from "sonner";')
    # local components: one line per file (paths differ)
    for cname in sorted(needed["components"]):
        path = LOCAL_COMPONENTS[cname]
        out.append(f'import {{ {cname} }} from "{path}";')
    if needed["diagrams"]:
        out.append('import {\n  ' + ",\n  ".join(sorted(needed["diagrams"])) + ',\n} from "@/components/diagrams";')
    if needed["content"] or needed["content_types"]:
        items = sorted(needed["content"])
        for tname in sorted(needed["content_types"]):
            items.append(f"type {tname}")
        if len(items) == 1:
            out.append(f'import {{ {items[0]} }} from "@/lib/content";')
        else:
            inner = ",\n  ".join(items)
            out.append(f'import {{\n  {inner},\n}} from "@/lib/content";')
    return "\n".join(out)

def main():
    raw = HOME.read_text(encoding="utf-8")
    lines = raw.split("\n")
    # split() drops the trailing newline (if present) into an empty last
    # element; we'll preserve that semantics when rewriting.
    # Note: we'll index using 1-based lines.
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    section_imports_summary = []

    for (start, end, src_name, new_name) in SECTIONS:
        # 1-based inclusive -> python slice
        body = "\n".join(lines[start-1:end])
        # Replace the function declaration name with the export-default name.
        # Match `function <SrcName>(`  (the source uses zero-arg components)
        body_renamed = re.sub(
            rf"^function {src_name}\b",
            f"export default function {new_name}",
            body,
            count=1,
            flags=re.MULTILINE,
        )
        # Sanity: ensure the rename actually happened.
        if body_renamed == body:
            raise SystemExit(f"Rename failed for {src_name} at {start}-{end}; aborting.")

        needed = detect_imports(body_renamed)
        imports = render_imports(needed)
        section_imports_summary.append((new_name, sorted(needed["content"])))

        header = (
            f"/*\n"
            f" * {new_name} — extracted from Home.tsx in Slice 01.\n"
            f" * Original lines: L{start}-L{end}.\n"
            f" * No JSX or copy changes; this is a pure file-move + import-trim.\n"
            f" */\n"
        )
        text = header + imports + "\n" + body_renamed + ("\n" if not body_renamed.endswith("\n") else "")
        # Ensure file ends with exactly one newline.
        if not text.endswith("\n"):
            text += "\n"
        out_path = OUT_DIR / f"{new_name}.tsx"
        out_path.write_text(text, encoding="utf-8")
        print(f"  wrote {out_path.relative_to(REPO)}  ({end-start+1} src lines)")

    # 2) Rewrite Home.tsx as a thin composer.
    composer = '''/*
 * Home.tsx — Single-page Agent Handoff Framework guide.
 * Design philosophy: "The Engineer's Notebook" — graph-paper background, paper cards,
 * mono stamps, IBM Plex Serif display titles, drafting-red accent.
 *
 * IA (9 sections):
 *   01 Overview
 *   02 Diagnosis
 *   03 Document Schema
 *   04 Install on Existing Repo
 *   05 Prompt Library  (consolidated; scenario-ordered)
 *   06 Build & Verify
 *   07 After the Install (Phase 2 operation)
 *   08 META-PRs (PRs that change the spec itself)
 *   09 References
 *
 * Each section lives in its own file under client/src/pages/sections/ to
 * stay under the 800-line cap declared in PROJECT.md. This file is the
 * top-level composer only.
 */
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import OverviewSection from "@/pages/sections/OverviewSection";
import DiagnosisSection from "@/pages/sections/DiagnosisSection";
import SchemaSection from "@/pages/sections/SchemaSection";
import InstallSection from "@/pages/sections/InstallSection";
import PromptLibrarySection from "@/pages/sections/PromptLibrarySection";
import BuildVerifySection from "@/pages/sections/BuildVerifySection";
import PhaseTwoSection from "@/pages/sections/PhaseTwoSection";
import MetaPRsSection from "@/pages/sections/MetaPRsSection";
import ReferencesSection from "@/pages/sections/ReferencesSection";

export default function Home() {
  return (
    <div className="graph-paper min-h-screen text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <OverviewSection />
        <DiagnosisSection />
        <SchemaSection />
        <InstallSection />
        <PromptLibrarySection />
        <BuildVerifySection />
        <PhaseTwoSection />
        <MetaPRsSection />
        <ReferencesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
'''
    HOME.write_text(composer, encoding="utf-8")
    print(f"  rewrote {HOME.relative_to(REPO)}  ({composer.count(chr(10))+1} lines)")
    print("\nPer-section content imports:")
    for name, content in section_imports_summary:
        print(f"  {name}: {len(content)} content imports")

if __name__ == "__main__":
    main()
