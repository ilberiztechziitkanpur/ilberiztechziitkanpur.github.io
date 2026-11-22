// Promote a "variation" that turned out to ask something different into its own question.
// Usage: node promote-variation.js <data-file.js> <chapterCode> <variationId> <newQuestionId>
// Example: node promote-variation.js data-second-phase.js sp sp-mcq-07-v1 sp-mcq-13
// The new question copies sec/topic/difficulty/skill/confidence/flags from its parent,
// and both questions are linked through `related`.
const fs = require('fs');
const [file, key, varId, newId] = process.argv.slice(2);
if (!file || !key || !varId || !newId) { console.error('usage: node promote-variation.js <file> <code> <varId> <newId>'); process.exit(1); }
const w = {}; new Function('window', fs.readFileSync(file, 'utf8'))(w);
const D = w.NM_DPP_DATA[key];
const parent = D.questions.find(q => (q.variations || []).some(v => v.id === varId));
if (!parent) { console.error('variation not found: ' + varId); process.exit(1); }
const v = parent.variations.splice(parent.variations.findIndex(x => x.id === varId), 1)[0];
const nq = {
  id: newId, sec: parent.sec, topic: parent.topic,
  format: v.picture ? (v.options ? 'PICTURE' : parent.format) : parent.format,
  marks: v.marks || parent.marks, stem: v.stem || null, picture: v.picture || null, q: v.q,
  options: v.options, correct: v.correct, seen: v.seen, answer: v.answer, variations: [],
  related: [parent.id], difficulty: parent.difficulty, skill: parent.skill,
  confidence: parent.confidence, flags: (parent.flags || []).slice()
};
if (nq.options == null) { delete nq.options; delete nq.correct; }
parent.related = Array.from(new Set([...(parent.related || []), newId]));
D.questions.splice(D.questions.indexOf(parent) + 1, 0, nq);
fs.writeFileSync(file, `window.NM_DPP_DATA = window.NM_DPP_DATA || {};\nwindow.NM_DPP_DATA.${key} = ${JSON.stringify(D, null, 1)};\n`);
console.log(`promoted ${varId} -> ${newId} (parent ${parent.id}). Re-check its answer text for "same as main question" wording.`);
