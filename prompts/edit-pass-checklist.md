<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: client/src/lib/content.ts (PROMPT_LIBRARY:edit-pass)
  Regenerate: pnpm generate:prompts
  Agent Handoff Framework by Roy McFarland (github.com/roymcfarland).
  License: MIT (same as the repository) — vendor freely.
  Guide: https://www.worksmithlabs.com/
-->
# PROJECT.md · Human Edit Pass Checklist

You are the only person who can turn the Inventory draft into a real
PROJECT.md. This is not an LLM prompt — it is the checklist you run
against the draft before you commit it. Budget ~30 minutes.

The draft is a map, not authority. Your job is to validate the technical
claims and add the intent that code cannot reveal.

---

## 1. Evidence audit — spot-check 5 claims

Open the draft and pick five random claims in the Architecture or
Conventions sections. For each one:

  [ ] Open the cited file.
  [ ] Confirm the pattern or claim is actually present.
  [ ] If it is NOT present, delete the claim or rewrite with real evidence.

If more than one of the five claims fails this check, re-run the
Inventory prompt with a stricter "quote the relevant code, not just the
file path" constraint.

---

## 2. Stack versions — spot-check 3 dependencies

Open `package.json` (or equivalent) and confirm that three randomly-
picked dependencies in the draft's Stack section match the versions the
repo actually pins. Version hallucination is a common Inventory failure
mode.

  [ ] Dependency 1 matches.
  [ ] Dependency 2 matches.
  [ ] Dependency 3 matches.

---

## 3. Non-goals — fill in at least three

Non-goals are what the project deliberately does NOT do. The Inventory
agent usually cannot write these well because absence in code is not the
same thing as an intentional boundary.

Fill in at least three real non-goals, even as one-liners. Candidates:

  [ ] Tenancy — single-tenant only, or multi-tenant?
  [ ] i18n — English-only, or localized?
  [ ] Mobile — web-only, or a mobile client in scope?
  [ ] ORM stance — intentionally raw SQL? Banned libraries?
  [ ] Dependency philosophy — liberal, conservative, or any banned packages?

Write what is true today. If you change your mind in six months, you can
edit. What you cannot do is leave "TBD" and expect a future Builder to
not assume a default.

---

## 4. Human-only context — add one paragraph

Add a new section that the Inventory pass could never have written.
3–5 sentences covering any of:

  [ ] Business or regulatory constraints (FDA, HIPAA, SOC 2, compliance)
  [ ] Who the users are and their technical sophistication
  [ ] Commercial model (SaaS, internal tool, white-label, client work)
  [ ] Known upcoming changes that should influence architecture decisions
  [ ] People context — who reviews PRs, who owns auth, who owns infra

A useful test: "If a new engineer asked me to explain this project in 30
seconds at dinner, what would I say?" That is this paragraph.

---

## 5. Open questions — resolve or archive them

The Inventory pass surfaced open questions. Do ONE of the following to
every one of them before committing:

  [ ] Answer it inline in the relevant section (e.g., Non-goals, Auth,
      Deployment) and DELETE the question from the Open Questions list.
  [ ] Convert it to a tracked action item (e.g., "planned HANDOFF slice").
  [ ] Move it to a "Resolved open questions" footer with the answer.

Answered questions MUST NOT remain in the "Open questions" list. Leaving
them there makes the next Builder uncertain about which are current.

---

## 6. Commit discipline

  [ ] The diff contains ONLY PROJECT.md. No stray IDE files, no
      formatter reflows on unrelated files.
  [ ] Branch is named `docs/bootstrap-project-md` (or similar `docs/`
      prefix).
  [ ] Commit title starts with `docs: `.
  [ ] Commit body summarizes what you added in the edit pass —
      specifically Non-goals, Human-only context, and any resolved
      open questions.
  [ ] Open a PR to `main` and merge through your normal repository
      policy. No Builder pass needed — this is a human-authored doc.
  [ ] Optional: tag the merge commit `install-v1` if this repo uses
      release or audit tags.

---

Only after all six sections are checked: proceed to Step 03 (Verifier
sanity check) of the install.
