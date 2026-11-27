# ICSE DPP project: status, decisions and handoff (updated 28 Nov 2026, site v16.5)

Read this first in any new chat. It records everything decided and built in the 26–28 Nov 2026 sessions.

## 1. Project in one paragraph
Site: `C:\Users\ASUS\Downloads\ILBERIZ TECHZ IIT KANPUR` (git repo, `git push origin main` publishes the live site; user approved commit + push after every chapter). ICSE Class 10 study site (Ilberiz Techz). Interactive PYQ DPPs are built from official CISCE papers into one shared engine per subject: master `history/national-movement/index.html`, copies `chemistry/dpp/`, `geography/dpp/`, `physics/dpp/` (byte-identical except `<script src>` tags; edit the master, then `node .claude/skills/icse-dpp-builder/scripts/sync-engines.js`). One `data-<code>.js` per chapter + `pattern.js` per subject.

## 2. What is DONE (all live, v16.5)
| Subject | Chapters with new DPPs | DPP sections | Questions |
|---|---|---|---|
| History & Civics | Ch 3–9 (fp, sp, ml, gandhi, qim, ina, ip) | MCQ / Short / Long | built before 26 Nov |
| Chemistry | Ch 1 periodic (rebuilt), 2 bonding, 3 acids, 4 analytical, 5 mole, 6 electrolysis, 7 metallurgy, 8.1 hcl, 8.2 ammonia, 8.3 nitric, 8.4 sulphuric, 9 organic, 10 practical (new "Practical Chemistry") | MCQ / One-markers (Q2) / Section B | 106, 102, 96, 82, 89, 101, 93, 67, 82, 59, 73, 170, 16 |
| Geography | topo (Q1 toposheet), indiamap (Q2 Map of India, new chapter), climate, soil, vegetation, water, mineral, energy, agriculture, manufacturing, transport, waste (site Ch 1–10) | MCQ / Short / Long | 134, 104, 83, 86, 80, 81, 33, 55, 74, 88, 71, 67 |
| Physics | force, wpe, machines, refraction, lens, spectrum, sound, current, household, electromagnetism, calorimetry, radioactivity (site Ch 1–12) | MCQ / Sec A / Theory / Numericals | 61, 80, 54, 99, 56, 44, 99, 80, 43, 64, 96, 73 |
Progress: 38 of the site's 97 chapters (≈39%) have full interactive DPPs.
Old vaults REPLACED (links removed, old pages are redirect stubs to the new DPP): Chemistry compounds-mcq; Geography climate/soil/vegetation/water/transport/waste theory vaults + all *-mcq suites + 100-MCQ engine (`geography/mcq`, chapter chap-geo-mcq removed) + toposheet engine; Physics unit1-*, unit4-*, radioactivity vault. History Ch 6, 7, 9 vaults were replaced earlier.

## 3. NOT done yet (in priority order)
1. **Batch completeness audit** of Chemistry, Geography and Physics (user chose: build first, audit everything later in one fresh session). Until then never claim "nothing missing".
2. **"Recent pattern (2022 onwards)" switch** (user idea, 27 Nov): engine toggle per DPP: Full 10 years (first study) vs 2022+ (revision): keep a question if it or any variation was seen in board SEM1-2022/SEM2-2022/2023–2026, specimens 2022–2027, or CFPQ. Data already has years in `seen`; engine-only change, no agents. Show counts per mode; remember choice in localStorage.
3. **Physics answer diagrams to draw** (answers currently in words): blurry official: machines-theory-05, refraction-saq-11, lens-theory-01; no official figure: machines-theory-06, -11 (+v1), machines-numerical-04, -05, refraction-theory-06, -10, -11, -19, -20, -23, -34, lens-theory-06, -07, -09, sound-theory-18, current-theory-03, -04, electromagnetism-theory-17, -18, -24. Rule in §5.
4. **Browser check** of all new chapters (not done: in the 26–28 Nov session the local `python -m http.server` was blocked by the auto-mode safety check and the preview tool was tied to another folder). Check: mixed banner + `<ins>` highlight, answer images, 4-tab Physics layout on a 375 px phone.
5. **Remaining subjects:** Biology (14 ch), Mathematics (15), English (4; only an older Grammar vault), Hindi (4), Computer (9), History Ch 1–2 and 10–20 (Ch 1, 2, 10 have older-style vaults).
6. Minor: smoke.js warns "(a) prefix" on assertion-reason options that print "(A) is true…" (false positive); Ch 1 Chemistry rebuild retired 9 old question ids (progress on those lost); the DPP status page artifact from 26 Nov was deleted.

## 4. Workers and limits (user, 27–28 Nov)
- The user's Claude weekly limit runs out fast. Claude (Opus) = planner, checker, polisher, wiring, commit/push. Heavy reading/extraction/compiling = a worker.
- Worker options (ask at intake): (a) ONE Sonnet subagent at a time, high effort, never parallel; resume a stopped agent with SendMessage; (b) **Antigravity CLI** (installed 28 Nov) running Google models (e.g. "Hydrogen") on the user's Google AI Pro accounts, thinking high/extra-high, driven by the user. With (b): Claude writes a self-contained task file in `papers/_handoff/<task>.md` (inputs, outputs, rules, checklist, "never commit or push"), the user runs it in Antigravity, the worker writes outputs + `REPORT.md`, Claude verifies (smoke.js, image check, spot-check vs PDF), wires, commits, pushes. Don't guess Antigravity CLI command syntax; ask the user.
- Give one worker as much related work as it can do well, but keep its working context well under half its window; it writes results to files as it goes.

## 5. Standing rules decided by the user (all subjects)
- **Ask about every option before starting** (sections, sources, years, old vault, scope, answer style, figures, variations, audit, worker, publish), defaults marked Recommended, rounds of ≤4 questions. If the user is away, take the Recommended option and record it.
- **Sources:** board papers of the last 10 exams (2016–2020, 2022 Sem 1 + Sem 2, 2023–2026; no 2021), all CISCE specimens of the last 10 years, all CISCE Competency Focused Practice Questions. Answers from APP / specimen marking schemes / CFPQ keys. Improvement/supplementary papers NEVER.
- **Exact presentation:** every question verbatim as printed (text, numbering, tables as HTML, notation); every figure cropped from the paper PDF.
- **One image per question.** Never reuse a crop for different questions. Only exceptions: a Geography paper's toposheet map shared by its Q1 parts, and its official marked India map shared by its Q2 answers; one printed figure used by two records of the same printed question.
- **Mixed-chapter questions (FINAL):** never cut a printed question. Show it whole, wrap this chapter's parts in `<ins>`, `mixed` banner names the other parts' chapters, flag `mixed-chapters`, marks/answers only for this chapter's parts.
- **Answer diagrams:** official crop first. Add our redraw only if the official one is blurry AND we can draw it exactly; show both side by side with the note "Two images: the first is from the official paper; the second is redrawn by us so it is easier to read." Drawings: minimal black-on-white board style (SVG in `img/<ch>/drawn/`). A "draw…" question with no official figure gets a model answer labelled "Model answer (drawn by us)".
- **Wrong official keys:** show the correct answer, keep official lines verbatim in `answer.official`, flag `official-key-error`, tip starts "Note: the official key says … but …".
- **Strict variations:** same ask, very similar wording, same answer core. Scenario vs plain, different numbers/points/compound/circuit → separate questions linked by `related`.
- **Old vaults:** replace, old page redirects.
- **Out-of-syllabus questions** (vs 2027 syllabus): left out, listed in clusters reports.
- Chemistry: Ch 8 split into 4 chapters (hcl, ammonia, nitric, sulphuric); Practical Chemistry chapter for anion/gas tests etc. Geography: 3 DPPs per chapter + Toposheet + Map of India; toposheet questions without a map sheet kept with flag `map-sheet-missing`, no guessed values. Physics: 4 DPPs, site's 12 chapters.
- Commit and push after every finished chapter; bump `?v=` in index.html (3 places), `VERSION` in sw.js and `APP_VERSION` in script.js; update `LATEST_RELEASE` in script.js.

## 6. Pipeline and tools (cheapest that worked)
1. **Library:** `papers/<subject>/` (git-ignored): board/, specimen/, app/, cfpq/, syllabus/, alternates/, text/ (page text "=== PAGE n ==="), maps/ (Geography), extracted/ (BRIEF.md, COMPILE.md, raw/, bych/, clusters/, img-stage/, scripts/), INDEX.md (every file + source URL). Check it before downloading anything.
2. **Download** (one worker): fill the library + INDEX.md + text/.
3. **Extract once per paper, all chapters tagged per part** (`extracted/BRIEF.md`), in sequential batches (board 2016–22 / board 2023–26 / specimens 2017–23 / specimens 2024–27 + CFPQ) → `extracted/raw/*.json`.
4. **Split:** `node papers/_tools/split.js papers/<subject>/extracted raw` → `bych/<code>.json`. Keep partial/temporary files out of raw/.
5. **Compile** per chapter (`extracted/COMPILE.md`) with a generic builder `extracted/scripts/build-chapter.js` + `<code>-defs.js` (Geography and Physics have one); data files are generated, not hand-typed; after builder changes, published chapters must rebuild byte-identical.
6. **Review** variations/unsure items in `clusters/<code>-clusters.md`.
7. **Wire:** `node papers/_tools/wire.js <repo> <subject> code1,code2` (adds DPP items to data.json/data.js + script tags; config per subject inside), `node papers/_tools/replace-old.js <repo> <Subject> <chapterId> "<new dpp url>" folder1,folder2` (removes old items, writes redirect stubs; `git checkout` a shared old engine until its last chapter is wired). Then smoke.js (0 errors), sync-engines `--check`, version bump, commit, push.
Chemistry used the older scratchpad briefs (now copied to `papers/chemistry/extracted/BRIEF2.md`, `COMPILE2.md`).
