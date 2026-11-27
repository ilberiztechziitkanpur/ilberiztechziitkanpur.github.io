window.NM_DPP_PATTERN = {
  ui: { title: "Physics DPP", subject: "Physics", storePrefix: "phydpp_", soundBase: "../../sounds/" },
  paper: "ICSE Physics (Science Paper 1, code 521)", duration: "2 hours (+15 min reading time, no writing)", marks: 80, internal: 20,
  dppSections: [
    { id: "mcq", full: "MCQ (Q1)", short: "MCQ", sub: "Q1", icon: "checklist", noun: "MCQ" },
    { id: "saq", full: "Section A short (Q2–Q3)", short: "Sec A", sub: "Q2–Q3", icon: "short_text", noun: "short answer" },
    { id: "theory", full: "Section B theory & diagrams", short: "Theory", sub: "Q4–Q9", icon: "subject", noun: "theory question" },
    { id: "numerical", full: "Numericals (all sections)", short: "Numer.", sub: "any", icon: "calculate", noun: "numerical" }
  ],
  sections: [
    { name: "Section A (compulsory)", marks: 40, items: [
      { q: "Q1", what: "15 MCQs, 1 mark each: plain, figure based, assertion-reason, statement and relationship items", marks: 15 },
      { q: "Q2", what: "Fill in the blanks choosing from the bracket, match the columns, graph analysis", marks: 10 },
      { q: "Q3", what: "Short answers of 2 marks (definitions, reasons, data and diagram based) and one 3-mark application part", marks: 15 }
    ] },
    { name: "Section B (attempt any 4 of 6)", marks: 40, items: [
      { q: "Q4–Q9", what: "3 + 3 + 4 marks each: theory, ray and circuit diagrams, graphs and numericals", marks: 10 }
    ] }
  ],
  secMap: {
    mcq: "Section A · Q1 (15 MCQs, 1 mark each)",
    saq: "Section A · Q2–Q3 non-numerical parts (fill-ups, match, graphs, 2–3 mark short answers)",
    theory: "Section B · Q4–Q9 non-numerical parts (theory, ray diagrams, circuits, graphs)",
    numerical: "Every numerical from any section (formula, substitution, answer with unit)"
  },
  marking: [
    "Numericals: 1 mark for the formula or relation, 1 for correct substitution, 1 for the answer WITH its unit",
    "Ray diagrams: arrows on every ray, correct position and nature of the image; dotted lines for virtual rays",
    "Definitions must use the exact technical terms (e.g. 'moment of force', 'specific heat capacity')",
    "Give reasons: 1 mark per correct reason; restating the question earns nothing",
    "Use g = 10 m s⁻² and the constants given in the question only",
    "No negative marking; attempt all of Section A and exactly four questions of Section B"
  ],
  timePerMark: 1.5,
  history: [
    { years: "2016–2020", pattern: "Section I (40, compulsory): Q1–Q4 of short parts (definitions, reasons, small numericals, diagrams). Section II (40): any four of Q5–Q10, sub-parts (a)–(c) of 3–4 marks." },
    { years: "2021", pattern: "No board exam (COVID); no paper." },
    { years: "2022", pattern: "Two semesters. Semester 1: all-MCQ paper. Semester 2: short and structured questions on the remaining chapters." },
    { years: "2023–2026", pattern: "Section A (40): Q1 15 MCQs, Q2 objective items, Q3 short answers. Section B (40): any four of Q4–Q9, 3 + 3 + 4 marks." },
    { years: "2027 (specimen)", pattern: "Same as 2023–26 (CISCE ICSE 2027 Specimen 521 Physics QP + marking scheme)." }
  ],
  syllabus: {},
  sourcesNote: "Sources: ICSE board papers 2016–2026 (no exam 2021; 2022 = Semester 1 + 2), all official CISCE specimen papers of the last 10 years, and the CISCE Competency Focused Practice Questions. Official answers from the CISCE Analysis of Pupil Performance and specimen marking schemes. Improvement papers are not used."
};
