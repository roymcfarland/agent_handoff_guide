/*
 * Home.tsx — Single-page Agent Handoff Framework guide.
 * Design philosophy: "The Engineer's Notebook" — graph-paper background, paper cards,
 * mono stamps, IBM Plex Serif display titles, drafting-red accent.
 *
 * IA (10 sections):
 *   01 Overview
 *   02 Diagnosis
 *   03 Document Schema
 *   04 Install on Existing Repo
 *   05 Prompt Library  (consolidated; scenario-ordered)
 *   06 Build & Verify
 *   07 Field Notes (lessons from operating the framework — the receipts)
 *   08 After the Install (Phase 2 operation)
 *   09 META-PRs (PRs that change the spec itself)
 *   10 References
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
import FieldNotesSection from "@/pages/sections/FieldNotesSection";
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
        <FieldNotesSection />
        <PhaseTwoSection />
        <MetaPRsSection />
        <ReferencesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
