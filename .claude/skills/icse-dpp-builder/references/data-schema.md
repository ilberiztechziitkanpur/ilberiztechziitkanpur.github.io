# DPP data schema (engine: history/national-movement/index.html and per-subject copies)

Product: interactive PYQ-based DPPs for ICSE Class 10 History, chapters
- **fp** = Ch 3 "First Phase of the Indian National Movement (1885–1907)"
- **sp** = Ch 4 "Second Phase of the Indian National Movement (1905–1916)" (Muslim League & Lucknow Pact EXCLUDED — separate chapter)

Each chapter has **3 DPPs**, matching the ICSE History & Civics paper:
- `mcq`   — Section A Q1 objective questions (MCQ, assertion–reason, picture-identify), 1 mark
- `short` — Section A short answers (Q2-type, usually 2 marks; older papers' Part I Q2)
- `long`  — Section B History sub-questions (Q6–Q10 (a)/(b)/(c), 3–4 marks each; picture/source based ones included)

## Allowed sources (user-approved defaults)
- ICSE Board papers, last 10 years (2016–2026; no exam 2021), incl. 2022 Semester 1 (MCQ) & Semester 2
- CISCE Specimen papers — latest 3 releases (2025, 2026, 2027)
- CISCE Competency Focused Practice Questions / item banks — latest 3 editions (History & Civics: only the July 2024 edition exists)
- CISCE Analysis of Pupil Performance — official answer points, official MCQ keys & common errors (2016–2020 and 2023–2026)
- EXCLUDED: Improvement/Supplementary papers (no official copies), older specimens, invented "expected" questions.

## Files (repo: C:\Users\ASUS\Downloads\ILBERIZ TECHZ IIT KANPUR)
```
history/national-movement/
  index.html              # the engine (self-contained HTML/CSS/JS)
  data-first-phase.js     # window.NM_DPP_DATA.fp = {...}
  data-second-phase.js    # window.NM_DPP_DATA.sp = {...}
  pattern.js              # window.NM_DPP_PATTERN = {...}  (exam blueprint, shared)
```
Deep links: `index.html?ch=fp&sec=mcq` | `short` | `long`; `ch=sp` likewise. Defaults: ch=fp, sec=mcq.

## Data schema (data-*.js)
```js
window.NM_DPP_DATA = window.NM_DPP_DATA || {};
window.NM_DPP_DATA.fp = {
  meta: {
    code: "fp", chapterNo: 3,
    title: "First Phase of the Indian National Movement (1885–1907)",
    shortTitle: "First Phase",
    syllabus: "official syllabus wording for this chapter",
    notes: [ { label: "PW Class Notes 01", file: "../notes/First_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf", covers: "Early Nationalists, Naoroji" } ],
    topics: [ { id: "moderates-methods", name: "Early Nationalists – methods", note: 0 } ],   // note = index into notes[] (optional)
    updated: "2026-11-22"
  },
  sources: [   // EVERY paper/document scanned for this chapter, found or not
    { id: "B2019", label: "ICSE Board 2019", type: "BOARD", year: 2019, found: true, marks: { mcq: 0, short: 2, long: 3 }, url: "..." },
    // type ∈ BOARD | BOARD_SEM1 | BOARD_SEM2 | SUPPLEMENTARY | SPECIMEN | CFPQ
    // ids: B2016..B2026, SEM1-2022, SEM2-2022, SUP2025, SUP2026, S2025, S2026, S2027, C2025, C2026, C2027
  ],
  questions: [ Question, ... ]
};
```
### Question
```js
{
  id: "fp-mcq-01",            // fp|sp - mcq|short|long - NN
  sec: "mcq",                 // mcq | short | long
  topic: "moderates-methods", // meta.topics id
  format: "MCQ",              // MCQ | AR | PICTURE | SHORT | LONG | SOURCE
  marks: 1,
  stem: null,                 // shared Section-B stem line, e.g. "With reference to the Early Nationalists, answer the following:"
  picture: null,              // text description of a picture/map/source, if the question uses one
  q: "Question text exactly as printed (primary version = most recent board appearance)",
  options: ["...", "...", "...", "..."],   // MCQ/AR/PICTURE-MCQ only; no "(a)" prefixes
  correct: 2,                 // 0-based index into options
  seen: [                     // where THIS wording appeared (identical/trivially-identical wording only)
    { src: "B2024", ref: "Q1(xi)", marks: 1, note: "" }
  ],
  answer: {
    points: [                 // one entry per marking point; HTML allowed; wrap marking keywords in <mark>…</mark>
      "<b>Faith in British justice:</b> they believed the British were <mark>just and fair</mark> …"
    ],
    why: "MCQ/AR only: why the key is right and why each distractor is wrong (short)",
    official: null,           // or { src: "APP 2019", points: ["…"], errors: ["…"] }  (CISCE examiner report, paraphrased)
    tip: "How to score full marks (what examiners look for)",
    words: "≈40–60 words"     // suggested length (not for MCQ)
  },
  variations: [               // ONLY near-identical asks (same core answer, very similar language)
    { id: "fp-mcq-01-v1", q: "...", stem: null, picture: null, options: [...], correct: 1, marks: 1,
      seen: [ { src: "B2019", ref: "Q2(iii)", marks: 2 } ],
      diff: "What exactly differs from the main question (wording/marks/options) — and that the answer core is the same",
      answer: { points: [...], why: "...", official: null, tip: "...", words: "..." } }
  ],
  related: ["fp-short-04"],   // looks similar but asks something DIFFERENT → practise separately
  difficulty: "Easy",         // Easy | Medium | Hard
  skill: "Recall",            // Recall | Understanding | Application | Analysis | Evaluation
  confidence: "HIGH",         // verbatim confidence of the question text: HIGH | MEDIUM | LOW
  flags: []                   // e.g. "key-disputed", "partly-out-of-syllabus", "wording-reconstructed-from-2-sources"
}
```
### Variation rule (critical — user's #1 concern)
A question goes into `variations` ONLY if it asks the same thing in very similar language and the same answer core earns full marks. If it asks a different aspect, a different number of points, a different person/event, a comparison vs a description, causes vs consequences, "explain" vs "name", or anything that could make a student stuck → it is a SEPARATE question (link both via `related`). When in doubt → separate.
Exact repeats (same wording) are NOT variations — they are extra entries in `seen`.

## pattern.js schema
```js
window.NM_DPP_PATTERN = {
  paper: "ICSE History & Civics (H.C.G. Paper 1)", duration: "2 hours", marks: 80, internal: 20,
  sections: [ { name: "Section A (compulsory)", marks: 30, items: [ { q: "Q1", what: "16 MCQs (Civics + History)", marks: 16 }, ... ] }, ... ],
  secMap: { mcq: "Section A · Q1 (1 mark each)", short: "Section A · Q2 (2 marks each)", long: "Section B · Q6–Q10 (a)/(b)/(c), 3–4 marks" },
  marking: [ "2-mark answer = 2 distinct value points", ... ],
  timePerMark: 1.5,
  history: [ { years: "2016–2020", pattern: "..." }, ... ],
  syllabus: { fp: "...", sp: "..." },
  sourcesNote: "..."
};
```

## Probability — computed by the ENGINE (see workflow-notes.md for the formula). Never hand-assign. Make `topic` ids meaningful and shared across questions of the same topic, because topic frequency drives the score.

## Other subjects
- Sections other than mcq/short/long: declare in pattern.js `dppSections: [{ id: "numerical", full: "Numericals (Sec B)", short: "Numericals", sub: "Section B", icon: "calculate", noun: "numerical" }, ...]` and use those ids in `sec`.
- Source ids used so far: B2016..B2026, SEM1-2022, SEM2-2022, S2025, S2026, S2027, CFPQ2024. Types: BOARD | BOARD_SEM1 | BOARD_SEM2 | SUPPLEMENTARY | SPECIMEN | CFPQ.
- Maths/Physics/Chemistry numericals: put the full worked solution as ordered `points` (one step per mark: formula, substitution, answer with unit) — step marking is how CISCE marks.
