---
name: icse-dpp-builder
description: Build an interactive PYQ-based DPP (MCQ / short / long or subject-specific sections) for any ICSE Class 10 subject and chapter on the Ilberiz Techz site — official CISCE sources only, strict "Show Variations" grouping, year tags, probability, board-exact answers, Learn/Practice/Test modes. Use when the user says things like "make interactive DPP for <subject> <chapter>", "next chapter DPP", "MCQ and theory DPP for this chapter".
---

# ICSE Interactive DPP Builder

The user gives a subject + chapter (often in one line). You research official questions, compile a data file, plug it into the shared engine, wire it into the site, test, commit and push. This skill is the full playbook — follow it instead of re-deriving the approach.

Read first, every time:
1. `PROJECT_STATE.md` (repo root) — site rules (data.json + data.js sync, sidebar single NEW link, Fast Track exclusive to the newest release, version bump, git push).
2. `references/subjects/<subject>.md` — that subject's exact paper pattern, DPP section mapping, marking conventions, official sources and URLs.
3. `references/data-schema.md` — the data-file schema, variation rule and probability formula.
4. `references/workflow-notes.md` — lessons learned, agent prompt templates, pitfalls.

Subject files in `references/subjects/`: maths.md · physics.md · chemistry.md · biology.md · history-civics.md · geography.md · english.md (Language + Literature) · hindi.md · computer.md. Each has the exact 2027 paper pattern, the recommended DPP section split, marking conventions, official source URLs, the syllabus chapter list and subject gotchas. Items marked UNVERIFIED there must be checked against the latest specimen before relying on them.

Existing DPP engines (apply engine fixes to every copy): `history/national-movement/` (History Ch 3 fp, Ch 4 sp, Ch 5 ml, Ch 6 gandhi, Ch 7 qim, Ch 8 ina). Old per-chapter vaults replaced so far: Ch 6, Ch 7 (user prefers "replace").

For a small chapter (≲30 raw questions) one Sonnet-high agent can extract AND compile in one go (worked for Ch 7) — cheaper than separate agents.

## Step 1 — Intake (ask once, in ONE AskUserQuestion call, max 4 questions)
Default answers are in brackets; mark the default "(Recommended)". Skip any question already answered.
- **DPP sections** for this chapter, taken from the subject file (e.g. History: MCQ / Short / Long; Maths: MCQ / Short / Long problems; Physics: MCQ / Theory / Numericals; Geography: MCQ / Short / Long / Map). [the subject file's recommended split]
- **Sources & windows**: [Board papers last 10 years incl. 2022 Sem 1 & 2; Specimen papers latest 3 releases; CISCE Competency Focused Practice Questions latest 3 editions (History only has the July 2024 edition); CISCE Analysis of Pupil Performance for official answers. Improvement/Supplementary papers EXCLUDED unless an official CISCE copy exists.]
- **Existing engine for this chapter?** If the chapter already has an older vault: [replace it — user chose "replace" for History Ch 6].
- **Scope edges** of the chapter (topics the site files under another chapter) — e.g. Muslim League kept out of Second Phase. [follow the site's chapter split in data.json]
Do NOT offer to read the PW class-notes PDFs — the user said never read them; answers follow the board's official answers.

## Step 2 — Collect official questions (subagents)
- Run at most 2–3 agents at once (the user's usage limit burns fast). Use Sonnet (medium for search/file work, high for extraction & compiling). Avoid many parallel Opus agents.
- FIRST reuse local caches: `~/.../scratchpad/research/` from earlier sessions may be gone — check; if present, reuse (txt/, dl*/, spec_dl/, cfpq_dl/). Otherwise download into the scratchpad, never into the repo.
- Split extraction by year range when a chapter is big (2016–2020 / 2022–2026 / specimens+CFPQ). Prompt template: `references/workflow-notes.md`.
- Output per agent: raw JSON with `source_inventory` (every paper scanned, found or not, marks this chapter carried — zeros included) and `questions[]` (exact wording, q_ref, marks, format, options + key, picture description, verbatim_confidence, official_answer[] copied as printed, official_errors[]).
- Never invent questions. Missing paper > guessed paper.

## Step 3 — Compile the chapter data file
- One compiler agent per chapter (Sonnet, high effort), writing `data-<chapter>.js` (schema in `references/data-schema.md`) plus a `<code>-clusters.md` report: id → seen → variations (one-line reason each is truly the same ask) → related, and excluded items with reasons.
- Section mapping from the subject file. Exact repeats → extra `seen` entries. Variations ONLY when the same ask, very similar language, same answer core.
- Answers: if the board published an official answer (APP marking scheme, specimen answer key, CFPQ key) → `answer.official` holds it verbatim and `answer.points` follow it, one point per mark, keywords in `<mark>`. Otherwise concise board-style points. MCQ `why` explains key + each distractor.

## Step 4 — YOU review variations (cheap, do it yourself)
Read the clusters report. Be stricter than the compiler: a different scenario, a picture/portrait instead of a quote, different options logic, different number of points, causes vs results, name vs explain → NOT a variation. Promote with `node scripts/promote-variation.js <file> <code> <varId> <newId>` and fix any "same as main question" wording in the promoted answer. Tell the user which ones you split and why.

## Step 5 — Plug into the engine
- History engine: `history/national-movement/index.html` (chapters fp, sp, ml, gandhi, …). Add `<script src="data-<chapter>.js?v=1">` next to the others. Chapters appear in the switcher automatically (ordered by `meta.chapterNo`).
- Another subject: create ONE engine copy per subject (e.g. `physics/dpp/index.html`) from the history engine, with that subject's `pattern.js`. If its DPP sections differ from mcq/short/long, declare `dppSections: [{id, full, short, sub, icon, noun}]` in pattern.js — the engine reads it. Never copy the engine per chapter. Record every engine copy in PROJECT_STATE.md so fixes are applied to all copies.
- Run `node scripts/smoke.js <engine-folder>` → 0 errors. (A–R options starting "(A)/(B)/(R)" are content, not letter prefixes — ignore that warning.)

## Step 6 — Wire into the site (see PROJECT_STATE rules)
- data.json: add one `interactive` item per DPP section at the TOP of the chapter's `items`, `file: "<engine>/index.html?ch=<code>&sec=<sec>"`, badge like `"DPP 1 • 14 MCQs • 1 Mark"`; set chapter `featured: true`; update description with searchable keywords. Regenerate data.js = `window.COURSE_DATA = <json>;`. Replacing an old vault = remove its item from `items` (keep the file).
- script.js: replace the single sidebar NEW quick-launch; replace Fast Track chips with the new release only (+ `chipActions` entries, opening the viewer via the chapter item).
- index.html: bump `?v=` on all 3 lines.
- PROJECT_STATE.md: add a section for the new DPPs (counts, sources, decisions) and update the directory tree.

## Step 7 — Verify, commit, push
- `.claude/launch.json` config "site" (python http.server 8080) → preview_start; set `sessionStorage.ilberiz_auth='granted'` and reload; open the chapter, launch each DPP, check counts, reveal an answer, open variations, check phone width (no horizontal scroll). Stop the server after.
- Commit `feat(<subject>): … v13.x` with the Co-Authored-By trailer; `git push origin main` (the user approved publishing).
- Final message: per-section counts table, which variations you split, what is unverified (agent-determined MCQ keys, missing official answers), and the next chapter offer.
