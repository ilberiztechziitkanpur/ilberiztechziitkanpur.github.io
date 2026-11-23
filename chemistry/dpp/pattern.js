window.NM_DPP_PATTERN = {
  ui: { title: "Chemistry DPP", subject: "Chemistry", storePrefix: "chemdpp_", soundBase: "../../sounds/" },
  paper: "ICSE Chemistry (Science Paper 2, code 522)", duration: "2 hours (+15 min reading time, no writing)", marks: 80, internal: 20,
  dppSections: [
    { id: "mcq", full: "MCQ (Q1)", short: "MCQ", sub: "Q1", icon: "checklist", noun: "MCQ" },
    { id: "obj", full: "One-markers (Q2)", short: "1-mark", sub: "Q2", icon: "short_text", noun: "one-mark" },
    { id: "secb", full: "Section B (Q3–Q8)", short: "Sec B", sub: "Q3–Q8", icon: "subject", noun: "Section B" }
  ],
  sections: [
    { name: "Section A (compulsory)", marks: 40, items: [
      { q: "Q1", what: "15 MCQs, 1 mark each: plain, diagram/picture based, statement I/II, assertion-reason, data/test-tube based", marks: 15 },
      { q: "Q2", what: "Five 5-mark parts of 1-mark items: diagram-based questions, balanced equations, complete the sentences by choosing from the bracket, match Column A with Column B, IUPAC names / structures", marks: 25 }
    ] },
    { name: "Section B (attempt any 4 of 6)", marks: 40, items: [
      { q: "Q3", what: "(i) 2 + (ii) 2 + (iii) 3 + (iv) 3", marks: 10 },
      { q: "Q4", what: "(i) 3 + (ii) 3 + (iii) 4", marks: 10 },
      { q: "Q5", what: "(i) 2 + (ii) 2 + (iii) 3 + (iv) 3", marks: 10 },
      { q: "Q6", what: "(i) 3 + (ii) 3 + (iii) 4", marks: 10 },
      { q: "Q7", what: "(i) 2 + (ii) 2 + (iii) 3 + (iv) 3", marks: 10 },
      { q: "Q8", what: "(i) 3 + (ii) 3 + (iii) 4", marks: 10 }
    ] }
  ],
  secMap: {
    mcq: "Section A · Q1 (15 MCQs, 1 mark each)",
    obj: "Section A · Q2 (fill in / choose from the bracket, match, name, arrange · 1 mark each)",
    secb: "Section B · Q3–Q8 (any 4 of 6; sub-parts of 2, 3 or 4 marks)"
  },
  marking: [
    "MCQ: 1 mark for the correct option; write the option letter and the answer (CISCE accepts either, but never two options)",
    "One-markers: one exact word, symbol or order per mark; for 'arrange' questions the whole order must be right for the mark",
    "Trends: say the direction AND the reason in terms of nuclear charge and number of shells ('increases because the nuclear charge increases while the number of shells stays the same')",
    "Element-table questions: state group and period separately (e.g. 'Period 3, Group 17'); use the electronic configuration to justify",
    "Give reasons: 1 mark per correct scientific reason; a restatement of the question earns nothing",
    "No negative marking; attempt all of Section A and exactly four questions of Section B"
  ],
  timePerMark: 1.5,
  history: [
    { years: "2016–2020", pattern: "Section I (40 marks, compulsory): Q1–Q2 made of short objective parts (fill in, choose the correct answer, name, identify, arrange, match, equations, give reasons). Section II (40 marks): attempt any four of six questions (Q3–Q9 style), 10 marks each, sub-parts (a)/(b)/(c)/(d) of 2–4 marks." },
    { years: "2021", pattern: "No board exam (COVID); no paper." },
    { years: "2022", pattern: "Two semesters. Semester 1 (Nov–Dec 2021): 40-mark, all-MCQ paper (1 hour). Semester 2: 40 marks, Section A compulsory + any three of Section B." },
    { years: "2023–2026", pattern: "Section A (40, compulsory): Q1 = 15 MCQs (competency-style: statement, assertion-reason, diagram based) + Q2 = five 5-mark parts of one-markers. Section B (40): any four of Q3–Q8, 10 marks each." },
    { years: "2027 (specimen)", pattern: "Same as 2023–26 (confirmed from the CISCE ICSE 2027 Specimen 522 QP + marking scheme)." }
  ],
  syllabus: {
    periodic: "Periodic Properties and variations of Properties – Physical and Chemical. (i) Periodic properties and their variations in groups and periods. Definitions and trends of the following periodic properties in groups and periods should be studied: atomic size, metallic character, non-metallic character, ionisation potential, electron affinity, electronegativity. (ii) Periodicity on the basis of atomic number for elements. The study of modern periodic table up to period 4 (students to be exposed to the complete modern periodic table but no questions will be asked on elements beyond period 4 – Calcium); periodicity and other related properties to be explained on the basis of nuclear charge and shells (not orbitals). (Special reference to the alkali metals and halogen groups). (CISCE ICSE Chemistry syllabus 2027, Class X, Unit 1 — exact wording.)"
  },
  sourcesNote: "Structure from the CISCE ICSE 2027 Specimen (522 Chemistry QP + MS); syllabus from the CISCE 2027 Chemistry syllabus PDF; older patterns read from the board papers themselves. Sources: ICSE board papers 2016–2026 (no exam 2021; 2022 = Semester 1 + 2), all official CISCE specimen papers of the last 10 years, and the CISCE Competency Focused Practice Questions. Improvement papers are not used."
};
