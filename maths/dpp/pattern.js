window.NM_DPP_PATTERN = {
  ui: { title: "Maths DPP", subject: "Mathematics", storePrefix: "mathdpp_", soundBase: "../../sounds/" },
  paper: "ICSE Mathematics (code 511)", duration: "3 hours (+15 min reading time, no writing)", marks: 80, internal: 20,
  dppSections: [
    { id: "mcq", full: "MCQ (Q1)", short: "MCQ", sub: "Q1", icon: "checklist", noun: "MCQ" },
    { id: "short", full: "Short problems (1–3 marks)", short: "Short", sub: "1–3 marks", icon: "short_text", noun: "problem" },
    { id: "long", full: "Long problems (4–5 marks)", short: "Long", sub: "4–5 marks", icon: "calculate", noun: "problem" }
  ],
  sections: [
    { name: "Section A (compulsory)", marks: 40, items: [
      { q: "Q1", what: "15 objective items, 1 mark each: MCQ, assertion-reason, diagram based and short word problems", marks: 15 },
      { q: "Q2–Q3", what: "Structured 4–5 mark problems: mensuration, quadratic equations, coordinate geometry, GST, A.P., graph and reflection", marks: 25 }
    ] },
    { name: "Section B (attempt any 4 of 7)", marks: 40, items: [
      { q: "Q4–Q10", what: "10 marks each, usually 3 + 3 + 4 (Q9: 5 + 5): commercial maths, algebra, geometry, constructions, statistics, trigonometry", marks: 10 }
    ] }
  ],
  secMap: {
    mcq: "Section A · Q1 and every other multiple-choice item (Semester 1 2022, specimens, CFPQ)",
    short: "Problems of 1–3 marks from any section",
    long: "Problems of 4–5 marks from any section (constructions, graphs, ogives, proofs, word problems)"
  },
  marking: [
    "Omission of essential working loses marks: show formula, substitution and every step",
    "Method marks are given step by step; a final answer alone earns little",
    "Give units in answers (cm², cm³, ₹) and round as the question asks (e.g. 3 significant figures, nearest whole number)",
    "Graphs: state the scale, label the axes, plot accurately and join the points as asked",
    "Constructions: use ruler and compasses only and keep every construction line and arc",
    "No negative marking; attempt all of Section A and exactly four questions of Section B"
  ],
  timePerMark: 1.8,
  history: [
    { years: "2016–2020", pattern: "Section A (40, compulsory): Q1–Q4, each with parts (a)–(c) of 3–4 marks. Section B (40): any four of Q5–Q11." },
    { years: "2021", pattern: "No board exam (COVID); no paper." },
    { years: "2022", pattern: "Two semesters. Semester 1: all-MCQ paper. Semester 2: short and structured questions on the remaining chapters." },
    { years: "2023–2026", pattern: "Section A (40): Q1 15 objective items, Q2–Q3 structured problems. Section B (40): any four of Q4–Q10, 10 marks each." },
    { years: "2027 (specimen)", pattern: "Same as 2023–26 (CISCE ICSE 2027 Specimen 511 Mathematics QP + marking scheme)." }
  ],
  syllabus: {},
  sourcesNote: "Sources: ICSE board papers 2016–2026 (no exam 2021; 2022 = Semester 1 + 2), all official CISCE specimen papers of the last 10 years, and the CISCE Competency Focused Practice Questions. Official answers from the CISCE Analysis of Pupil Performance and specimen marking schemes. Improvement papers are not used."
};
