window.NM_DPP_PATTERN = {
  ui: { title: "Biology DPP", subject: "Biology", storePrefix: "biodpp_", soundBase: "../../sounds/" },
  paper: "ICSE Biology (Science Paper 3, code 523)", duration: "2 hours (+15 min reading time, no writing)", marks: 80, internal: 20,
  dppSections: [
    { id: "mcq", full: "MCQ (Q1)", short: "MCQ", sub: "Q1", icon: "checklist", noun: "MCQ" },
    { id: "short", full: "Short answers (1 mark)", short: "Short", sub: "Q2", icon: "short_text", noun: "short answer" },
    { id: "long", full: "Long answers (2–5 marks)", short: "Long", sub: "Q3–Q8", icon: "subject", noun: "long answer" },
    { id: "diagram", full: "Diagram questions", short: "Diagram", sub: "draw / label", icon: "draw", noun: "diagram question" }
  ],
  sections: [
    { name: "Section A (compulsory)", marks: 40, items: [
      { q: "Q1", what: "15 MCQs, 1 mark each: case based, assertion-reason, statement, data and sequence items", marks: 15 },
      { q: "Q2", what: "Five 5-mark sets: biological terms, passage fill-ups, odd one out with category, case short answers, labelled diagram match", marks: 25 }
    ] },
    { name: "Section B (attempt any 4 of 6)", marks: 40, items: [
      { q: "Q3–Q8", what: "10 marks each, 4–5 sub-parts (1 + 2 + 2 + 2 + 3), usually ending with a 3-mark neat labelled diagram", marks: 10 }
    ] }
  ],
  secMap: {
    mcq: "Section A · Q1 and every other multiple-choice item (Semester 1 2022, specimens, CFPQ)",
    short: "1-mark items: terms, fill-ups, odd one out, matching, short case answers",
    long: "2–5 mark parts: differences, reasons, explanations, experiments in words",
    diagram: "Any part that asks you to draw or label a diagram, or is built on a printed diagram, photo or graph"
  },
  marking: [
    "1 mark per correct point or keyword; 'state two' means two distinct points",
    "Differences: give contrasting pairs on the same basis (one mark each), a table is fine",
    "Diagrams (3 marks): neat outline 1, correct labels 2; pencil, straight label lines that do not cross, title under the diagram",
    "Use exact biological terms and spellings (examiners reward keywords)",
    "Photosynthesis equation must be balanced, with light and chlorophyll over the arrow",
    "No negative marking; attempt all of Section A and exactly four questions of Section B"
  ],
  timePerMark: 1.5,
  history: [
    { years: "2016–2020", pattern: "Section I (40, compulsory): Q1 with parts (a)–(h) of short items (terms, odd one out, match, differences, functions). Section II (40): any four of Q2–Q7, each with diagram, reason and short-answer parts." },
    { years: "2021", pattern: "No board exam (COVID); no paper." },
    { years: "2022", pattern: "Two semesters. Semester 1: all-MCQ paper. Semester 2: short and structured questions on the remaining chapters." },
    { years: "2023–2026", pattern: "Section A (40): Q1 15 MCQs, Q2 five 5-mark objective sets. Section B (40): any four of Q3–Q8, 10 marks each." },
    { years: "2027 (specimen)", pattern: "Same as 2023–26 (CISCE ICSE 2027 Specimen 523 Biology QP + marking scheme)." }
  ],
  syllabus: {},
  sourcesNote: "Sources: ICSE board papers 2016–2026 (no exam 2021; 2022 = Semester 1 + 2), all official CISCE specimen papers of the last 10 years, and the CISCE Competency Focused Practice Questions. Official answers from the CISCE Analysis of Pupil Performance and specimen marking schemes. Improvement papers are not used."
};
