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

Existing DPP engines: MASTER `history/national-movement/` (History Ch 3 fp, Ch 4 sp, Ch 5 ml, Ch 6 gandhi, Ch 7 qim, Ch 8 ina, Ch 9 ip) and copy `chemistry/dpp/` (Chemistry Ch 1 periodic). The copies are byte-identical except their `<script src>` data tags: edit the master only, then `node .claude/skills/icse-dpp-builder/scripts/sync-engines.js` (add a new subject copy to its ENGINE_COPIES; `--check` shows drift). Per-subject wording comes from `pattern.js → ui {title, subject, storePrefix, soundBase}`. Old per-chapter vaults replaced so far: History Ch 6, Ch 7, Ch 9 (user prefers "replace").

For a small chapter (≲30 raw questions) one Sonnet-high agent can extract AND compile in one go (worked for Ch 7) — cheaper than separate agents.

## THE EXACT-PRESENTATION RULE (user's top requirement — every subject, every question)
Every question must appear in the DPP **exactly as it is printed in the question paper** — a student should feel they are looking at the real paper:
- **Text verbatim:** same words, spelling, punctuation, numbering ((i)/(ii), (a)/(b)), bracketed marks, instructions ("any two", "with reference to the picture given below"). Never paraphrase, shorten or "clean up". Source/case extracts and passages are reproduced in full, not summarised.
- **Same structure:** the shared stem/lead-in goes in `stem`; sub-parts keep their order and labels; MCQ options keep their exact order and wording (A–R labels "(A)/(B)/(R)" are content).
- **Images exactly as printed:** every picture, photograph, map, cartoon, graph, diagram, circuit, ray diagram, table drawn as an image, chemical apparatus, toposheet extract etc. is CROPPED from the official paper PDF page (PyMuPDF: render the page at zoom ≈2, crop the figure with its labels, save PNG/WebP ≲150 KB) into `<engine folder>/img/<chapter>/<src-id>-<ref>.png` (e.g. `img/gandhi/B2019-Q7.png`) and referenced with `img` (string or array). Images inside options go in `optionImgs` (array aligned with options, null where none). Keep `picture` as the text description (used as alt text and for search). Never hot-link images from other websites; crop only from the official CISCE PDF (or the APP/specimen reproduction).
- **Maths / science notation exact:** keep subscripts/superscripts (<sub>/<sup>), units, symbols (Ω, °, √, π, →, ⇌), fractions and equations exactly; if notation can't be typed faithfully (matrices, long equations, constructions, tables), crop it as an image too.
- **Language exact:** Hindi in Devanagari exactly as printed; English grammar/transformation items character-for-character.
- If the printed text is unreadable in every official copy, keep the closest official copy and add flag `text-reconstructed` — never silently fill gaps.
- **One image belongs to one question (user, 26 Nov 2026).** Never reuse one crop for two or three different questions. Each question shows the crop of its own figure, from its own paper and page. Before publishing, list every `img`/`optionImgs` path and check that no path, and no file with identical bytes, is used by more than one question (variations that are exact repeats are the only exception). A wrong or shared picture is worse than none.
- **Crop check:** open every crop next to its PDF page and confirm it is the right figure, complete (labels, axes, options) and readable. Recrop at a higher zoom if text is fuzzy.

### Mixed-chapter questions: show the WHOLE question, highlight our part (FINAL decision, user, 26 Nov 2026)
When a printed question has sub-parts from several chapters, do NOT cut it into pieces and do NOT drop it:
- Show the full question exactly as printed (every sub-part, in order, with the shared stem and figures), because the sub-parts often build on each other and must be solved in sequence.
- Highlight the sub-part(s) of this chapter (wrap them in `<mark class="this-ch">`), and add a short note at the top, e.g. "Only (ii) and (iv) are from Chemical Bonding. The other parts are from Ch 1 and Ch 8; skip them here." Set flag `mixed-chapters` and list the other chapters.
- Answers, marks, time and self-marking cover only the highlighted parts. Marks shown = the highlighted parts' marks (say "of [N] marks in the paper").
- This replaces the older Ch 1 approach (partial extracts + `straddles-ch2`) for every new DPP.

### Answer diagrams (electron-dot, structures, apparatus) — official first, our clean redraw only when needed (user, 26 Nov 2026)
- Default: the answer diagram is the official one, cropped from the CISCE marking scheme / APP / specimen answer key.
- Add a diagram we draw ONLY when both are true: (1) the official crop is blurry, cut or hard to read, and (2) we can draw it exactly and correctly. Then show BOTH side by side with the note: "Two images: the first is from the official paper; the second is redrawn by us so it is easier to read."
- Our drawings must look like a clean board-exam answer: minimal, black on white, standard dots and crosses, shared pairs between symbols, lone pairs shown, charges in brackets, no colours, gradients, icons or decoration. Inline SVG or a PNG in `img/<chapter>/drawn/`. Never invent a diagram for a question that has no official picture unless the question itself asks the student to draw it; then the redraw is the model answer, labelled "Model answer (drawn by us)".
The answer side is the only place that is rewritten (board's official answer first, then point-wise).

## Step 1 — Intake: ASK ABOUT EVERY OPTION BEFORE STARTING (user's standing order, 26 Nov 2026)
**The defaults below are NOT silent.** Before any research, ask the user about every choice that has more than one sensible answer, the defaults included, with the default marked "(Recommended)". The user built these defaults long ago and may want a different one for this chapter, so asking up front is the only way to catch it before work is wasted. Do this every time, for every chapter, even when a default "always applies":
- Ask in rounds of up to 4 questions per AskUserQuestion call; use 2–3 rounds when needed. More questions are better than one wrong default.
- Cover at least: DPP sections/split, sources (board / specimens / CFPQ / anything to add or drop), year range, old vault (replace / keep both), scope edges and straddling topics, answer style (official verbatim / short points / both), figures (crop / text only), variations strictness, audit step on/off, model/agent setup and token budget, commit and push.
- In each option's description, say what it changes. Skip only what the user already answered in this conversation.
- After the answers, write a one-line summary of the choices before starting.
Default answers are in brackets.
- **DPP sections** for this chapter, taken from the subject file (e.g. History: MCQ / Short / Long; Maths: MCQ / Short / Long problems; Physics: MCQ / Theory / Numericals; Geography: MCQ / Short / Long / Map). [the subject file's recommended split]
- **Sources — default, but still confirm with the user** (user decision, 23 Nov 2026: "make these three the default… ignore improvement papers"): (1) ICSE **board papers of the last 10 exams that actually happened** — 2016–2020, 2022 Semester 1 + Semester 2, 2023–2026 (no exam in 2021); (2) **all official CISCE specimen papers of the last 10 years** (≈2017–2027; repeats merge as extra year tags); (3) **CISCE Competency Focused Practice Questions** (every edition on cisce.org). Answers from CISCE Analysis of Pupil Performance / specimen marking schemes / CFPQ keys. **Improvement/Supplementary papers are never used** (only unofficial retyped copies exist; they can't be shown exactly as printed and have no official answers). Change only if the user explicitly asks.
- **Existing engine for this chapter?** If the chapter already has an older vault: [replace it — user chose "replace" for History Ch 6].
- **Scope edges** of the chapter (topics the site files under another chapter) — e.g. Muslim League kept out of Second Phase. [follow the site's chapter split in data.json]
Do NOT offer to read the PW class-notes PDFs — the user said never read them; answers follow the board's official answers.

## Step 2 — Collect official questions (subagents)
- Run at most 2–3 agents at once (the user's usage limit burns fast). Use Sonnet (medium for search/file work, high for extraction & compiling). Avoid many parallel Opus agents.
- FIRST reuse local caches: `~/.../scratchpad/research/` from earlier sessions may be gone — check; if present, reuse (txt/, dl*/, spec_dl/, cfpq_dl/). Otherwise download into the scratchpad, never into the repo.
- Split extraction by year range when a chapter is big (2016–2020 / 2022–2026 / specimens+CFPQ). Prompt template: `references/workflow-notes.md`.
- Output per agent: raw JSON with `source_inventory` (every paper scanned, found or not, marks this chapter carried — zeros included) and `questions[]` (exact wording and layout as printed, q_ref, marks, format, options + key, picture description PLUS the page number and bounding box of every figure so it can be cropped, verbatim_confidence, official_answer[] copied as printed, official_errors[]).
- Never invent questions. Missing paper > guessed paper.

## Step 3 — Compile the chapter data file
- One compiler agent per chapter (Sonnet, high effort), writing `data-<chapter>.js` (schema in `references/data-schema.md`) plus a `<code>-clusters.md` report: id → seen → variations (one-line reason each is truly the same ask) → related, and excluded items with reasons.
- Section mapping from the subject file. Exact repeats → extra `seen` entries. Variations ONLY when the same ask, very similar language, same answer core.
- Answers: if the board published an official answer (APP marking scheme, specimen answer key, CFPQ key) → `answer.official` holds it verbatim and `answer.points` follow it, one point per mark, keywords in `<mark>`. Otherwise concise board-style points. MCQ `why` explains key + each distractor.

## Step 4 — YOU review variations (cheap, do it yourself)
Read the clusters report. Be stricter than the compiler: a different scenario, a picture/portrait instead of a quote, different options logic, different number of points, causes vs results, name vs explain → NOT a variation. Promote with `node scripts/promote-variation.js <file> <code> <varId> <newId>` and fix any "same as main question" wording in the promoted answer. Tell the user which ones you split and why.

## Step 4b — Completeness audit (ASK the user which option, at intake)
Options to offer: (1) **Batch audit later**: build all requested chapters first, then audit them all in one fresh session after the usage limit resets (user chose this 26 Nov 2026 for Chemistry Ch 2–9: cheaper, all papers read once); (2) **Audit every chapter now**: one fresh Sonnet-high agent after each chapter; (3) **No audit**. Never tell the user "nothing is missing" for a chapter that has not been audited.
How the audit runs (one fresh Sonnet-high agent, read-only):
A fresh agent re-reads EVERY question of the subject's part of each in-scope paper from the official text (APP reproductions, specimen PDFs, CFPQ), tags each with its chapter, and diffs against the data files: missing / wrong chapter / wrong ref-marks / items not found in any paper. Add whatever it reports missing before publishing. (History Ch 3–8 audit, Nov 2026: 146 in-scope items in 14 papers = 146 DPP rows, 0 missing.) This is what lets you tell the user "nothing is missing" truthfully.

## Step 5 — Plug into the engine
- History engine: `history/national-movement/index.html` (chapters fp, sp, ml, gandhi, …). Add `<script src="data-<chapter>.js?v=1">` next to the others. Chapters appear in the switcher automatically (ordered by `meta.chapterNo`).
- Another subject: create ONE engine copy per subject (e.g. `physics/dpp/index.html`) by copying the master and changing only the `<script src>` tags, register it in sync-engines.js ENGINE_COPIES, and write that subject's `pattern.js` (with `ui` — pick a new `storePrefix` — and `dppSections`; phone tab `short` labels must fit ≈57 px, i.e. ≤ 6–7 characters). If its DPP sections differ from mcq/short/long, declare `dppSections: [{id, full, short, sub, icon, noun}]` in pattern.js — the engine reads it. Never copy the engine per chapter. Record every engine copy in PROJECT_STATE.md so fixes are applied to all copies.
- Crop every figure into `img/<chapter>/` and set `img` / `optionImgs` (Exact-presentation rule). Open a few image questions in the browser and compare side-by-side with the PDF page.
- Run `node scripts/smoke.js <engine-folder>` → 0 errors, and `node scripts/sync-engines.js --check` → all in sync. (A–R options starting "(A)/(B)/(R)" are content, not letter prefixes — ignore that warning.)

## Step 6 — Wire into the site (see PROJECT_STATE rules)
- data.json: add one `interactive` item per DPP section at the TOP of the chapter's `items`, `file: "<engine>/index.html?ch=<code>&sec=<sec>"`, badge like `"DPP 1 • 14 MCQs • 1 Mark"`; set chapter `featured: true`; update description with searchable keywords. Regenerate data.js = `window.COURSE_DATA = <json>;`. Replacing an old vault = remove its item from `items` (keep the file).
- script.js: edit ONLY the `LATEST_RELEASE` block at the top (subjectId, chapterId, title, note, `items` = the new DPP item ids with short labels, `more`, `nav`). It drives the sidebar NEW link and the Home "New" card — nothing else in script.js needs touching (v14+).
- index.html: bump `?v=` on all 3 lines, and set the same number in `sw.js` (`const VERSION`).
- PROJECT_STATE.md: add a section for the new DPPs (counts, sources, decisions) and update the directory tree.

## Step 7 — Verify, commit, push
- `.claude/launch.json` config "site" (python http.server 8080) → preview_start; set `sessionStorage.ilberiz_auth='granted'` and reload; open the chapter, launch each DPP, check counts, reveal an answer, open variations, check phone width (no horizontal scroll). Stop the server after.
- Commit `feat(<subject>): … v13.x` with the Co-Authored-By trailer; `git push origin main` (the user approved publishing).
- Final message: per-section counts table, which variations you split, what is unverified (agent-determined MCQ keys, missing official answers), and the next chapter offer.
