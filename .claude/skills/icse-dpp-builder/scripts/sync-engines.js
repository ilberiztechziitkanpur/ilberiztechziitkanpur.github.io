// Keep every DPP engine copy identical: copies the master engine into each copy,
// preserving each copy's own <script src="pattern.js / data-*.js"> block.
// Usage (repo root): node .claude/skills/icse-dpp-builder/scripts/sync-engines.js [--check]
//   master = history/national-movement/index.html ; copies = ENGINE_COPIES below.
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = process.cwd();
const MASTER = 'history/national-movement/index.html';
const ENGINE_COPIES = ['chemistry/dpp/index.html'];   // add physics/dpp/index.html etc. here
const CHECK = process.argv.includes('--check');

const SCRIPT_BLOCK = /((?:[ \t]*<script src="[^"]+"><\/script>\r?\n)+)/;
function split(html, file) {
  const m = html.match(SCRIPT_BLOCK);
  if (!m) throw new Error('no <script src> block in ' + file);
  return { before: html.slice(0, m.index), block: m[1], after: html.slice(m.index + m[1].length) };
}
const master = split(fs.readFileSync(path.join(ROOT, MASTER), 'utf8'), MASTER);
let drift = 0;
for (const rel of ENGINE_COPIES) {
  const p = path.join(ROOT, rel);
  const cur = split(fs.readFileSync(p, 'utf8'), rel);
  const next = master.before + cur.block + master.after;
  const same = next === fs.readFileSync(p, 'utf8');
  if (!same) drift++;
  if (CHECK) { console.log((same ? 'in sync  ' : 'DRIFTED  ') + rel); continue; }
  if (!same) fs.writeFileSync(p, next);
  console.log((same ? 'unchanged ' : 'synced    ') + rel);
}
if (CHECK && drift) process.exit(1);
