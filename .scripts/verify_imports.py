#!/usr/bin/env python3
"""Verifier helper: scan the section files (and Home.tsx) for orphan imports."""
import os, re, sys

TARGETS = (
    ["client/src/pages/Home.tsx"]
    + sorted(
        os.path.join("client/src/pages/sections", f)
        for f in os.listdir("client/src/pages/sections")
        if f.endswith(".tsx")
    )
)

def parse_imports(src: str):
    names = []
    for m in re.finditer(
        r"import\s+(?:(\w+)\s*,?\s*)?(?:\{([^}]+)\})?\s*from\s*['\"][^'\"]+['\"]",
        src,
    ):
        default, named = m.groups()
        if default:
            names.append(default.strip())
        if named:
            for tok in named.split(","):
                tok = tok.strip()
                if tok.startswith("type "):
                    tok = tok[5:].strip()
                if tok:
                    names.append(tok)
    return names

def main():
    bad = 0
    for f in TARGETS:
        src = open(f).read()
        body = re.sub(r"^import[^;]*;\s*$", "", src, flags=re.MULTILINE)
        names = parse_imports(src)
        unused = [n for n in names if not re.search(rf"\b{re.escape(n)}\b", body)]
        status = "none" if not unused else ",".join(unused)
        marker = "OK " if not unused else "BAD"
        print(f"  {marker} {f}: imports={len(names)} unused={status}")
        if unused:
            bad += 1
    print(f"\nTotal files with orphan imports: {bad}")
    sys.exit(0 if bad == 0 else 1)

if __name__ == "__main__":
    main()
