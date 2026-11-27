window.NM_DPP_PATTERN = {
  ui: { title: "Geography DPP", subject: "Geography", storePrefix: "geodpp_", soundBase: "../../sounds/" },
  paper: "ICSE Geography (H.C.G. Paper 2, code 502)", duration: "2 hours (+15 min reading time, no writing)", marks: 80, internal: 20,
  dppSections: [
    { id: "mcq", full: "MCQ (Q3)", short: "MCQ", sub: "Part I Q3", icon: "checklist", noun: "MCQ" },
    { id: "short", full: "Short answers (2 marks)", short: "Short", sub: "1–2 marks", icon: "short_text", noun: "short answer" },
    { id: "long", full: "Long answers (3 marks)", short: "Long", sub: "3+ marks", icon: "subject", noun: "long answer" }
  ],
  sections: [
    { name: "Part I (compulsory)", marks: 30, items: [
      { q: "Q1", what: "Interpretation of the Survey of India toposheet extract: five sub-questions of 2 marks ((a) and (b), 1 mark each): contours and spot heights, scale and distance, grid references, area, settlements, drainage, symbols", marks: 10 },
      { q: "Q2", what: "Outline map of India: mark, label or shade six items and identify four marked features", marks: 10 },
      { q: "Q3", what: "10 MCQs, 1 mark each: factual, analogy, assertion-reason, incorrectly matched pair", marks: 10 }
    ] },
    { name: "Part II (attempt any 5 of 9)", marks: 50, items: [
      { q: "Q4–Q12", what: "One question per chapter (Climate, Soil, Natural Vegetation, Water, Minerals & Energy, Agriculture, Manufacturing, Transport, Waste Management): (i) 2 + (ii) 2 + (iii) 3 + (iv) 3", marks: 10 }
    ] }
  ],
  secMap: {
    mcq: "Part I · Q3 (10 MCQs, 1 mark each)",
    short: "Part I Q1–Q2 items and Part II (i)/(ii) parts (1–2 marks)",
    long: "Part II (iii)/(iv) parts (3 marks: reasons, differences, data and picture based)"
  },
  marking: [
    "Part II: 1 mark per correct point; a 3-mark 'give reasons' part needs three separate reasons",
    "Write key geographical terms (e.g. 'retreating monsoon', 'leaching', 'shifting cultivation') — examiners look for them",
    "Toposheet: read only what the map shows; give 4- or 6-figure grid references and units (km, km², m) for every calculated answer",
    "Map of India: mark with the correct symbol and name it; shade neatly; use arrows only as instructed",
    "No negative marking; attempt all of Part I and exactly five questions of Part II"
  ],
  timePerMark: 1.5,
  history: [
    { years: "2016–2020", pattern: "Part I (30, compulsory): Q1 toposheet and Q2 map of India. Part II (50): attempt any five of Q3–Q11 on the chapters, sub-parts (a)–(d) of 2–3 marks." },
    { years: "2021", pattern: "No board exam (COVID); no paper." },
    { years: "2022", pattern: "Two semesters. Semester 1: all-MCQ paper. Semester 2: short and structured questions on the remaining chapters." },
    { years: "2023–2026", pattern: "Part I (30): Q1 toposheet, Q2 map of India, Q3 MCQs. Part II (50): any five of Q4–Q12, one per chapter, (i) 2 + (ii) 2 + (iii) 3 + (iv) 3." },
    { years: "2027 (specimen)", pattern: "Same as 2023–26 (CISCE ICSE 2027 Specimen 502 Geography QP + marking scheme)." }
  ],
  syllabus: {},
  sourcesNote: "Sources: ICSE board papers 2016–2026 (no exam 2021; 2022 = Semester 1 + 2), all official CISCE specimen papers of the last 10 years, and the CISCE Competency Focused Practice Questions. Official answers from the CISCE Analysis of Pupil Performance and specimen marking schemes. Improvement papers are not used. Questions from chapters no longer in the 2027 syllabus are left out."
};
