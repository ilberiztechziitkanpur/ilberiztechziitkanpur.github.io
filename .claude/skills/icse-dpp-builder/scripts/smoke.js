// Smoke test for history/national-movement data files.
// Usage: node smoke.js <dir> [--placeholder]
//   --placeholder  also assert every text field carries "[SAMPLE]" (only for the dev placeholders)
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = process.argv[2];
const PLACEHOLDER = process.argv.includes('--placeholder');
const errors = [], warnings = [];
const err = m => errors.push(m), warn = m => warnings.push(m);

const ctx = { window: {}, console };
vm.createContext(ctx);
// Load every <script src> the engine loads (pattern.js + all data-*.js), in page order
const SCRIPTS = (() => { try { return Array.from(fs.readFileSync(path.join(dir, 'index.html'), 'utf8').matchAll(/<script src="([^"?]+\.js)(?:\?[^"]*)?"/g)).map(m => m[1]); } catch (e) { return []; } })();
if (!SCRIPTS.length) SCRIPTS.push('pattern.js', ...fs.readdirSync(dir).filter(n => /^data-.*.js$/.test(n)));
// Also check data files not yet tagged in index.html (chapters still being built)
for (const n of fs.readdirSync(dir)) if (/^data-.*.js$/.test(n) && !SCRIPTS.includes(n)) SCRIPTS.push(n);
console.log('checking: ' + SCRIPTS.join(', '));
for (const f of SCRIPTS) {
  const p = path.join(dir, f);
  if (!fs.existsSync(p)) { err('missing file ' + f); continue; }
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f }); } catch (e) { err(f + ' threw: ' + e.message); }
}
const DATA = ctx.window.NM_DPP_DATA, PAT = ctx.window.NM_DPP_PATTERN;

const SECS = (PAT && Array.isArray(PAT.dppSections) && PAT.dppSections.length) ? PAT.dppSections.map(d => d.id) : ['mcq', 'short', 'long'];
const TYPES = { BOARD: 'board', BOARD_SEM1: 'board', BOARD_SEM2: 'board', SUPPLEMENTARY: 'board', SPECIMEN: 'official', CFPQ: 'official' };
const FORMATS = ['MCQ', 'AR', 'PICTURE', 'SHORT', 'LONG', 'SOURCE', 'FILL', 'MATCH', 'NAME', 'ARRANGE', 'REASON', 'TABLE', 'NUMERICAL', 'EQUATION', 'DIAGRAM'];
const DIFF = ['Easy', 'Medium', 'Hard'], SKILL = ['Recall', 'Understanding', 'Application', 'Analysis', 'Evaluation'], CONF = ['HIGH', 'MEDIUM', 'LOW'];
const zeroSecs = () => Object.fromEntries(SECS.map(s => [s, 0]));
const isStr = v => typeof v === 'string', isNum = v => typeof v === 'number' && isFinite(v);
const hasSample = v => isStr(v) && v.includes('[SAMPLE]');

/* ---------- pattern.js ---------- */
if (!PAT || typeof PAT !== 'object') err('window.NM_DPP_PATTERN missing');
else {
  if (!isNum(PAT.timePerMark) || PAT.timePerMark <= 0) err('pattern.timePerMark must be a positive number');
  if (!PAT.secMap || !SECS.every(s => isStr(PAT.secMap[s]))) err('pattern.secMap must have mcq/short/long strings');
  if (!Array.isArray(PAT.sections)) err('pattern.sections must be an array');
  else PAT.sections.forEach((s, i) => { if (!isStr(s.name)) err('pattern.sections[' + i + '].name'); if (!Array.isArray(s.items)) err('pattern.sections[' + i + '].items'); });
  if (!Array.isArray(PAT.marking)) err('pattern.marking must be an array');
  if (!Array.isArray(PAT.history)) err('pattern.history must be an array');
  if (!PAT.syllabus || typeof PAT.syllabus !== 'object') err('pattern.syllabus must be an object keyed by chapter code');
  const sum = (PAT.sections || []).reduce((a, s) => a + (s.marks || 0), 0);
  if (isNum(PAT.marks) && sum && sum !== PAT.marks) warn('pattern sections add up to ' + sum + ' but marks = ' + PAT.marks);
  if (PLACEHOLDER && !hasSample(PAT.paper)) err('pattern.paper lacks [SAMPLE]');
}

/* ---------- chapters ---------- */
if (!DATA || typeof DATA !== 'object') { err('window.NM_DPP_DATA missing'); finish(); }
const allIds = new Map();
const chapters = Object.keys(DATA);
if (!chapters.length) err('no chapters in NM_DPP_DATA');

function checkAnswer(a, where, objective, placeholder) {
  if (!a || typeof a !== 'object') { err(where + ': answer missing'); return; }
  if (a.points != null && !Array.isArray(a.points)) err(where + ': answer.points must be an array');
  const pts = Array.isArray(a.points) ? a.points : [];
  if (!objective && !pts.length) warn(where + ': written question without marking points (cannot be self-marked)');
  if (objective && !isStr(a.why)) warn(where + ': objective question without answer.why');
  pts.forEach((p, i) => { if (!isStr(p) || !p.trim()) err(where + ': answer.points[' + i + '] must be a non-empty string'); });
  const marks = pts.join(' ').match(/<mark>/g); if (!objective && pts.length && !marks) warn(where + ': no <mark> keywords in points');
  const open = (pts.join(' ').match(/<mark>/g) || []).length, close = (pts.join(' ').match(/<\/mark>/g) || []).length;
  if (open !== close) err(where + ': unbalanced <mark> tags');
  if (a.official != null) {
    if (typeof a.official !== 'object') err(where + ': answer.official must be an object or null');
    else {
      if (!isStr(a.official.src)) warn(where + ': answer.official.src missing');
      if (!Array.isArray(a.official.points)) err(where + ': answer.official.points must be an array');
      if (a.official.errors != null && !Array.isArray(a.official.errors)) err(where + ': answer.official.errors must be an array');
    }
  }
  if (placeholder) {
    pts.forEach((p, i) => { if (!hasSample(p)) err(where + ': point ' + i + ' lacks [SAMPLE]'); });
    if (a.why && !hasSample(a.why)) err(where + ': why lacks [SAMPLE]');
    if (a.tip && !hasSample(a.tip)) err(where + ': tip lacks [SAMPLE]');
    if (a.official) [].concat(a.official.points || [], a.official.errors || []).forEach(t => { if (!hasSample(t)) err(where + ': official text lacks [SAMPLE]'); });
  }
}
function checkSeen(seen, where, srcById) {
  if (!Array.isArray(seen)) { err(where + ': seen must be an array'); return []; }
  seen.forEach((s, i) => {
    if (!s || !isStr(s.src)) { err(where + ': seen[' + i + '].src missing'); return; }
    if (!srcById[s.src]) err(where + ': seen[' + i + '].src "' + s.src + '" is not in sources[]');
    else if (srcById[s.src].found === false) err(where + ': seen[' + i + '] cites ' + s.src + ' which is marked found:false');
    if (!isStr(s.ref) || !s.ref) warn(where + ': seen[' + i + '].ref empty');
    if (s.marks != null && !isNum(s.marks)) err(where + ': seen[' + i + '].marks must be a number');
  });
  const dup = seen.map(s => s && s.src + '|' + s.ref).filter((k, i, a) => a.indexOf(k) !== i);
  if (dup.length) warn(where + ': duplicate seen entries ' + dup.join(', '));
  return seen;
}
function checkOptions(q, where) {
  const hasOpts = Array.isArray(q.options) && q.options.length >= 2;
  if (q.options != null && !Array.isArray(q.options)) err(where + ': options must be an array');
  if (hasOpts) {
    if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length) err(where + ': correct must be a 0-based index into options');
    q.options.forEach((o, i) => { if (!isStr(o) || !o.trim()) err(where + ': option ' + i + ' empty'); if (/^\s*\(?[a-d]\)\s/i.test(o)) warn(where + ': option ' + i + ' has an "(a)" prefix'); });
  }
  return hasOpts;
}

const report = [];
chapters.forEach(code => {
  const d = DATA[code], W = 'chapter ' + code;
  if (!d || !d.meta) { err(W + ': meta missing'); return; }
  const m = d.meta;
  if (m.code !== code) err(W + ': meta.code "' + m.code + '" != key');
  ['title', 'shortTitle'].forEach(k => { if (!isStr(m[k]) || !m[k]) err(W + ': meta.' + k + ' missing'); });
  if (!isNum(m.chapterNo)) warn(W + ': meta.chapterNo missing');
  const notes = Array.isArray(m.notes) ? m.notes : [];
  notes.forEach((n, i) => {
    if (!isStr(n.file)) err(W + ': notes[' + i + '].file missing');
    else {
      const p = path.resolve(dir, n.file);
      if (!fs.existsSync(p)) err(W + ': notes[' + i + '].file not found on disk: ' + n.file);
    }
  });
  const topics = Array.isArray(m.topics) ? m.topics : [];
  const topicIds = new Set();
  topics.forEach((t, i) => {
    if (!isStr(t.id)) err(W + ': topics[' + i + '].id missing');
    if (topicIds.has(t.id)) err(W + ': duplicate topic id ' + t.id);
    topicIds.add(t.id);
    if (t.note != null && (!Number.isInteger(t.note) || !notes[t.note])) err(W + ': topic ' + t.id + ' note index ' + t.note + ' is not in meta.notes');
    if (PLACEHOLDER && !hasSample(t.name)) err(W + ': topic ' + t.id + ' name lacks [SAMPLE]');
  });
  const sources = Array.isArray(d.sources) ? d.sources : (err(W + ': sources must be an array'), []);
  const srcById = {};
  sources.forEach((s, i) => {
    if (!isStr(s.id)) { err(W + ': sources[' + i + '].id missing'); return; }
    if (srcById[s.id]) err(W + ': duplicate source id ' + s.id);
    srcById[s.id] = s;
    if (!TYPES[s.type]) err(W + ': source ' + s.id + ' has unknown type ' + s.type);
    if (!isNum(s.year)) err(W + ': source ' + s.id + ' year must be a number');
    if (typeof s.found !== 'boolean') warn(W + ': source ' + s.id + ' found should be true/false');
    if (s.found !== false) {
      if (!s.marks || typeof s.marks !== 'object') err(W + ': source ' + s.id + ' marks missing');
      else SECS.forEach(k => { if (!isNum(s.marks[k])) err(W + ': source ' + s.id + ' marks.' + k + ' must be a number'); });
    }
    if (s.url && /^\s*javascript:/i.test(s.url)) err(W + ': source ' + s.id + ' url is javascript:');
  });
  if (!Array.isArray(d.questions)) { err(W + ': questions must be an array'); return; }

  const seenMarks = {}; // src -> sec -> marks from seen
  const counts = zeroSecs();
  let vcount = 0;
  d.questions.forEach((q, qi) => {
    const w = W + ' q[' + qi + '] ' + (q && q.id);
    if (!q || !isStr(q.id)) { err(w + ': id missing'); return; }
    if (allIds.has(q.id)) err(w + ': duplicate id (also in ' + allIds.get(q.id) + ')');
    allIds.set(q.id, code);
    if (!SECS.includes(q.sec)) { err(w + ': sec must be mcq|short|long'); return; }
    counts[q.sec]++;
    if (!new RegExp('^' + code + '-' + q.sec + '-\\d+$').test(q.id)) warn(w + ': id does not follow "' + code + '-' + q.sec + '-NN"');
    if (!topicIds.has(q.topic)) err(w + ': topic "' + q.topic + '" not in meta.topics');
    if (!FORMATS.includes(q.format)) err(w + ': format "' + q.format + '" not one of ' + FORMATS.join('|'));
    if (!isNum(q.marks) || q.marks <= 0) err(w + ': marks must be a positive number');
    if (!isStr(q.q) || !q.q.trim()) err(w + ': q (question text) missing');
    if (q.stem != null && !isStr(q.stem)) err(w + ': stem must be a string or null');
    if (q.picture != null && !isStr(q.picture)) err(w + ': picture must be a string or null');
    if ((q.format === 'PICTURE' || q.format === 'SOURCE') && !q.picture) warn(w + ': ' + q.format + ' question without picture description');
    const obj = checkOptions(q, w);
    if (q.sec === 'mcq' && !obj) warn(w + ': mcq-section question without options');
    if (['MCQ', 'AR'].includes(q.format) && !obj) err(w + ': ' + q.format + ' needs options + correct');
    const seen = checkSeen(q.seen, w, srcById);
    if (!seen.length) warn(w + ': no appearances in seen[]');
    checkAnswer(q.answer, w, obj, PLACEHOLDER);
    if (q.difficulty != null && !DIFF.includes(q.difficulty)) err(w + ': difficulty "' + q.difficulty + '"');
    if (q.skill != null && !SKILL.includes(q.skill)) err(w + ': skill "' + q.skill + '"');
    if (q.confidence != null && !CONF.includes(q.confidence)) err(w + ': confidence "' + q.confidence + '"');
    if (q.flags != null && !Array.isArray(q.flags)) err(w + ': flags must be an array');
    if (q.related != null && !Array.isArray(q.related)) err(w + ': related must be an array');
    if (PLACEHOLDER) { if (!hasSample(q.q)) err(w + ': q lacks [SAMPLE]'); if (q.stem && !hasSample(q.stem)) err(w + ': stem lacks [SAMPLE]'); if (q.picture && !hasSample(q.picture)) err(w + ': picture lacks [SAMPLE]'); }
    const tally = (arr, marks) => arr.forEach(s => { if (!s || !s.src) return; (seenMarks[s.src] = seenMarks[s.src] || zeroSecs())[q.sec] += (isNum(s.marks) ? s.marks : marks); });
    tally(seen, q.marks);
    const vars = q.variations == null ? [] : q.variations;
    if (!Array.isArray(vars)) err(w + ': variations must be an array');
    const allSeen = seen.slice();
    (Array.isArray(vars) ? vars : []).forEach((v, vi) => {
      vcount++;
      const vw = w + ' variation[' + vi + '] ' + (v && v.id);
      if (!v || !isStr(v.id)) { err(vw + ': id missing'); return; }
      if (allIds.has(v.id)) err(vw + ': duplicate id');
      allIds.set(v.id, code);
      if (!v.id.startsWith(q.id + '-v')) warn(vw + ': id should be "' + q.id + '-vN"');
      if (!isStr(v.q) || !v.q.trim()) err(vw + ': q missing');
      if (!isStr(v.diff) || !v.diff.trim()) err(vw + ': diff ("how this differs") missing');
      if (v.marks != null && !isNum(v.marks)) err(vw + ': marks must be a number');
      const vobj = checkOptions(v, vw);
      if (obj !== vobj) warn(vw + ': objective/written type differs from the main question');
      const vs = checkSeen(v.seen, vw, srcById);
      if (!vs.length) warn(vw + ': variation without appearances');
      tally(vs, isNum(v.marks) ? v.marks : q.marks);
      allSeen.push(...vs);
      checkAnswer(v.answer, vw, vobj, PLACEHOLDER);
      if (PLACEHOLDER) { if (!hasSample(v.q)) err(vw + ': q lacks [SAMPLE]'); if (!hasSample(v.diff)) err(vw + ': diff lacks [SAMPLE]'); }
      // exact repeat masquerading as a variation
      if (isStr(v.q) && isStr(q.q) && v.q.trim().toLowerCase() === q.q.trim().toLowerCase()) err(vw + ': same wording as main question — should be an extra seen[] entry, not a variation');
    });
    // probability (spec formula)
    const years = new Set(), off = new Set(); let F, last;
    allSeen.forEach(s => { const src = srcById[s && s.src]; if (!src) return; if (TYPES[src.type] === 'board') years.add(src.year); if (TYPES[src.type] === 'official') off.add(src.id); });
    F = years.size; last = F ? Math.max(...years) : 0;
    const rec = !F ? 0 : last >= 2025 ? 12 : last >= 2023 ? 8 : 3;
    const score = Math.min(97, 15 + 10 * Math.min(F, 6) + rec + Math.min(20, 10 * off.size));
    const label = score >= 75 ? 'Very High' : score >= 55 ? 'High' : score >= 35 ? 'Moderate' : 'Low';
    report.push({ id: q.id, fmt: q.format, marks: q.marks, F, last: last || '-', off: off.size, score, label, overdue: F >= 2 && last <= 2023 ? 'Overdue' : '', vars: (vars || []).length });
  });
  // related targets
  d.questions.forEach(q => (Array.isArray(q.related) ? q.related : []).forEach(r => {
    if (r === q.id) err(W + ' ' + q.id + ': related lists itself');
  }));
  // sources[].marks vs seen totals (only warn: marks may include parts not modelled as questions)
  sources.forEach(s => {
    if (s.found === false || !s.marks) return;
    const got = seenMarks[s.id] || zeroSecs();
    SECS.forEach(k => { if (isNum(s.marks[k]) && s.marks[k] !== got[k]) warn(W + ': ' + s.id + ' marks.' + k + ' = ' + s.marks[k] + ' but seen[] adds up to ' + got[k]); });
  });
  Object.keys(seenMarks).forEach(id => { if (!srcById[id]) err(W + ': seen cites unknown source ' + id); });
  console.log('\n' + code + ' — ' + m.shortTitle + ': ' + SECS.map(s => s + ' ' + counts[s]).join(', ') + ', variations ' + vcount + ', sources ' + sources.length + ' (' + sources.filter(s => s.found !== false).length + ' found)');
});
// related across chapters
chapters.forEach(code => (DATA[code].questions || []).forEach(q => (Array.isArray(q.related) ? q.related : []).forEach(r => {
  if (!allIds.has(r)) err(q.id + ': related id "' + r + '" does not exist');
})));

console.log('\nProbability (engine formula):');
console.table(report);
finish();

function finish() {
  warnings.forEach(w => console.log('WARN  ' + w));
  errors.forEach(e => console.log('ERROR ' + e));
  console.log('\n' + errors.length + ' error(s), ' + warnings.length + ' warning(s)');
  process.exit(errors.length ? 1 : 0);
}
