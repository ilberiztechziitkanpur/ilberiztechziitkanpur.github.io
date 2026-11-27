'use strict';
/* ==========================================================================
   Ilberiz Techz — ICSE Class 10 study portal (v14)
   Vanilla JS, no build step. Data comes from data.js (window.COURSE_DATA)
   with data.json as the HTTP fallback.
   ========================================================================== */

/* --------------------------------------------------------------------------
   0. Latest release spotlight (Rules 10 & 15)
   Update ONLY this block when a new release is published. It drives the
   single "New" link in the laptop sidebar and the "New" card on Home.
   -------------------------------------------------------------------------- */
const LATEST_RELEASE = {
    subjectId: 'sub-10-chem',
    chapterId: 'chap-chem-2',
    title: 'Chemistry Ch 2–9 interactive PYQ DPPs',
    note: 'Bonding, Acids, Analytical, Mole Concept, Electrolysis, Metallurgy, HCl, Ammonia, Nitric and Sulphuric Acid, Organic and Practical Chemistry: every ICSE board, specimen and competency question, shown exactly as printed. Mixed-chapter questions appear whole with this chapter’s parts highlighted.',
    items: [
        { id: 'chem-bonding-dpp-mcq', label: 'Ch 2 Bonding', meta: '102 questions in 3 DPPs' },
        { id: 'chem-acids-dpp-mcq', label: 'Ch 3 Acids, Bases & Salts', meta: '96 questions in 3 DPPs' },
        { id: 'chem-analytical-dpp-mcq', label: 'Ch 4 Analytical', meta: '82 questions in 3 DPPs' },
        { id: 'chem-mole-dpp-mcq', label: 'Ch 5 Mole Concept', meta: '89 questions in 3 DPPs' },
        { id: 'chem-electrolysis-dpp-mcq', label: 'Ch 6 Electrolysis', meta: '101 questions in 3 DPPs' },
        { id: 'chem-metallurgy-dpp-mcq', label: 'Ch 7 Metallurgy', meta: '93 questions in 3 DPPs' },
        { id: 'chem-hcl-dpp-mcq', label: 'Ch 8 Hydrogen Chloride', meta: '67 questions in 3 DPPs' },
        { id: 'chem-ammonia-dpp-mcq', label: 'Ch 8 Ammonia', meta: '82 questions in 3 DPPs' },
        { id: 'chem-nitric-dpp-mcq', label: 'Ch 8 Nitric Acid', meta: '59 questions in 3 DPPs' },
        { id: 'chem-sulphuric-dpp-mcq', label: 'Ch 8 Sulphuric Acid', meta: '73 questions in 3 DPPs' },
        { id: 'chem-organic-dpp-mcq', label: 'Ch 9 Organic Chemistry', meta: '170 questions in 3 DPPs' },
        { id: 'chem-practical-dpp-mcq', label: 'Practical Chemistry', meta: '16 questions in 3 DPPs' }
    ],
    more: { label: 'Chemistry chapters', href: '#/s/sub-10-chem' },
    nav: { label: 'Chemistry: Ch 2–9 DPPs', href: '#/s/sub-10-chem' }
};

const APP_VERSION = '15.9';
const TELEGRAM_URL = 'https://t.me/ilberiztechziitkanpur';

/* --------------------------------------------------------------------------
   1. Small helpers
   -------------------------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function h(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
}
const plural = (n, one, many) => `${n} ${n === 1 ? one : (many || one + 's')}`;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const truncate = (s, n) => { s = String(s || ''); return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s; };
const onEach = (root, sel, fn, type = 'click') => $$(sel, root).forEach((el) => el.addEventListener(type, () => fn(el)));
const pressOnly = (root, sel, active) => $$(sel, root).forEach((el) => el.setAttribute('aria-pressed', String(el === active)));
const mq = (query) => matchMedia(query).matches;
const reducedMotion = () => mq('(prefers-reduced-motion: reduce)');
const isWide = () => mq('(min-width: 720px)');

function lsGet(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v == null ? fallback : v; } catch (e) { return fallback; }
}
function lsSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
}
function lsJSON(key, fallback) {
    try { const v = JSON.parse(lsGet(key)); return v == null ? fallback : v; } catch (e) { return fallback; }
}
function timeAgo(t) {
    const s = Math.max(1, Math.round((Date.now() - t) / 1000));
    if (s < 60) return 'just now';
    const m = Math.round(s / 60); if (m < 60) return `${m} min ago`;
    const hr = Math.round(m / 60); if (hr < 24) return `${hr} h ago`;
    const d = Math.round(hr / 24); if (d < 7) return `${d} d ago`;
    return new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}
function formatMB(bytes) {
    if (!bytes) return '0 MB';
    const mb = bytes / (1024 * 1024);
    return mb >= 100 ? `${Math.round(mb)} MB` : `${mb.toFixed(1)} MB`;
}

/* --------------------------------------------------------------------------
   2. Preferences (theme, accent, sound, haptics, reader)
   -------------------------------------------------------------------------- */
const ACCENTS = [
    { id: 'yellow', name: 'Yellow', c: '#FFD43B' },
    { id: 'green', name: 'Green', c: '#5EE08A' },
    { id: 'pink', name: 'Pink', c: '#FF8CC6' },
    { id: 'blue', name: 'Blue', c: '#6CCBFF' },
    { id: 'orange', name: 'Orange', c: '#FFA552' }
];

const oneOf = (v, allowed) => (allowed.includes(v) ? v : allowed[0]);   // first = default
const asTheme = (v) => oneOf(v, ['dark', 'light', 'system']);
const asVolume = (v, fallback) => { const n = parseInt(v, 10); return isFinite(n) ? clamp(n, 0, 100) : fallback; };
const prefs = {
    theme: asTheme(lsGet('ilberiz_theme')),
    accent: oneOf(lsGet('ilberiz_accent'), ACCENTS.map((a) => a.id)),
    sound: lsGet('ilberiz_audio') !== 'off',
    volume: asVolume(lsGet('ilberiz_volume'), 80),
    haptics: lsGet('ilberiz_haptics') !== 'off',
    reader: oneOf(lsGet('ilberiz_reader'), ['auto', 'builtin', 'native'])
};
const setReaderPref = (v) => { prefs.reader = v; lsSet('ilberiz_reader', v); };

function effectiveTheme() {
    return prefs.theme === 'system' ? (mq('(prefers-color-scheme: light)') ? 'light' : 'dark') : prefs.theme;
}
function applyTheme() {
    const light = effectiveTheme() === 'light';
    const root = document.documentElement;
    root.setAttribute('data-theme', light ? 'light' : 'dark');
    root.setAttribute('data-accent', prefs.accent);
    $('#meta-theme-color').setAttribute('content', light ? '#F3F4F6' : '#0F1216');
    labelIcon($('#btn-theme'), light ? 'dark_mode' : 'light_mode', light ? 'Switch to dark mode' : 'Switch to light mode');
}
function labelIcon(btn, icon, label) {
    $('.ms', btn).textContent = icon;
    btn.setAttribute('aria-label', label);
}
function setThemePref(v) { prefs.theme = v; lsSet('ilberiz_theme', v); applyTheme(); }
function setAccent(v) { prefs.accent = v; lsSet('ilberiz_accent', v); applyTheme(); }
function syncSoundButton() {
    labelIcon($('#btn-sound'), prefs.sound ? 'volume_up' : 'volume_off', prefs.sound ? 'Mute sounds' : 'Turn sounds on');
}
function setSound(on) {
    prefs.sound = on;
    lsSet('ilberiz_audio', on ? 'on' : 'off');
    syncSoundButton();
    if (on) sfx.play('on');
}
// DPP engines (iframes, same origin) share these prefs; follow their changes live.
window.addEventListener('storage', (e) => {
    if (e.key === 'ilberiz_theme') { prefs.theme = asTheme(e.newValue); applyTheme(); }
    else if (e.key === 'ilberiz_audio') { prefs.sound = e.newValue !== 'off'; syncSoundButton(); }
    else if (e.key === 'ilberiz_volume') { prefs.volume = asVolume(e.newValue, prefs.volume); sfx.setVolume(prefs.volume); }
});
function useBuiltInReader() {
    if (location.protocol === 'file:') return false;
    if (prefs.reader !== 'auto') return prefs.reader === 'builtin';
    return mq('(pointer: coarse)') || navigator.pdfViewerEnabled === false;
}

/* --------------------------------------------------------------------------
   3. Sound (recorded "soft glass & thock" samples in sounds/, synth fallback) + haptics
   Volume 0-100 lives in ilberiz_volume; the DPP engines read the same prefs.
   -------------------------------------------------------------------------- */
const SOUND_FILES = {
    tap: 'tap.wav', open: 'open.wav', on: 'on.wav', off: 'off.wav',
    chime: 'chime.wav', page: 'page.wav', save: 'save.mp3', success: 'success.mp3'
};
// event -> layers: [sample, gain, playbackRate, delay s]
const SOUND_MAP = {
    tap: [['tap', 0.38, 1]],
    open: [['open', 0.6, 1]],
    back: [['tap', 0.36, 0.84]],
    on: [['on', 0.5, 1]],
    off: [['off', 0.42, 1]],
    save: [['save', 0.45, 1]],
    success: [['success', 0.8, 1], ['save', 0.16, 1, 0.07]],
    error: [['chime', 0.45, 0.75], ['chime', 0.4, 0.63, 0.12]],
    page: [['page', 0.55, 1]]
};
// fallback while samples load (first tap) or when files can't be fetched (file://): [frequency, options]
const SYNTH = {
    tap: [[720, { dur: 0.05, gain: 0.04, slide: 430 }]],
    open: [[587.33, { dur: 0.1, gain: 0.035, type: 'triangle' }], [880, { t: 0.05, dur: 0.14, gain: 0.03, type: 'triangle' }]],
    back: [[784, { dur: 0.08, gain: 0.03, type: 'triangle' }], [523.25, { t: 0.045, dur: 0.12, gain: 0.028, type: 'triangle' }]],
    on: [[660, { dur: 0.07, gain: 0.04 }], [990, { t: 0.05, dur: 0.1, gain: 0.035 }]],
    off: [[740, { dur: 0.07, gain: 0.035 }], [494, { t: 0.05, dur: 0.1, gain: 0.03 }]],
    save: [[1046.5, { dur: 0.09, gain: 0.032 }], [1396.9, { t: 0.06, dur: 0.16, gain: 0.028 }]],
    success: [523.25, 659.25, 783.99, 1046.5].map((f, i) => [f, { t: i * 0.075, dur: 0.38, gain: 0.04 }]),
    error: [[330, { dur: 0.14, gain: 0.05, type: 'triangle' }], [247, { t: 0.12, dur: 0.22, gain: 0.05, type: 'triangle' }]],
    page: [[520, { dur: 0.08, gain: 0.025, type: 'triangle', slide: 900 }]]
};
const volumeGain = (v) => 1.4 * Math.pow(clamp(v, 0, 100) / 100, 1.6);
const sfx = {
    ctx: null,
    out: null,
    buf: {},
    lastTap: 0,
    lastEvent: 0,
    ensure() {
        if (!prefs.sound) return null;
        try {
            if (!this.ctx) {
                const AC = window.AudioContext || window.webkitAudioContext;
                if (!AC) return null;
                const ctx = new AC();
                const master = ctx.createGain();
                master.gain.value = volumeGain(prefs.volume);
                // transparent safety limiter so stacked sounds never clip
                const lim = ctx.createDynamicsCompressor();
                Object.entries({ threshold: -6, knee: 6, ratio: 12, attack: 0.002, release: 0.12 }).forEach(([k, v]) => { lim[k].value = v; });
                master.connect(lim);
                lim.connect(ctx.destination);
                this.ctx = ctx;
                this.out = master;
                this.load();
            }
            if (this.ctx.state === 'suspended') this.ctx.resume();
            return this.ctx;
        } catch (e) { return null; }
    },
    load() {
        if (location.protocol === 'file:') return;
        const ctx = this.ctx;
        Object.keys(SOUND_FILES).forEach((k) => {
            fetch('sounds/' + SOUND_FILES[k])
                .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(r.status))))
                .then((ab) => new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej)))
                .then((b) => { this.buf[k] = b; })
                .catch(() => {});
        });
    },
    setVolume(v) {
        if (!this.out) return;
        try { this.out.gain.setTargetAtTime(volumeGain(v), this.ctx.currentTime, 0.02); } catch (e) { this.out.gain.value = volumeGain(v); }
    },
    layer(name, gain, rate, t = 0) {
        const ctx = this.ctx;
        const src = ctx.createBufferSource();
        src.buffer = this.buf[name];
        // tiny pitch variation keeps repeated taps from sounding mechanical
        src.playbackRate.value = rate * (name === 'tap' ? 0.97 + Math.random() * 0.06 : 1);
        const g = ctx.createGain();
        g.gain.value = gain;
        src.connect(g);
        g.connect(this.out);
        src.start(ctx.currentTime + t);
    },
    note(freq, { t = 0, dur = 0.12, type = 'sine', gain = 0.05, slide = null } = {}) {
        const ctx = this.ctx;
        const now = ctx.currentTime + t;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, now);
        if (slide) o.frequency.exponentialRampToValueAtTime(slide, now + dur);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(gain * 2.5, now + 0.006);
        g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
        o.connect(g);
        g.connect(this.out);
        o.start(now);
        o.stop(now + dur + 0.03);
    },
    play(name) {
        if (!this.ensure()) return;
        const t0 = performance.now();
        if (name === 'tap') {
            if (t0 - this.lastTap < 50 || t0 - this.lastEvent < 150) return;
            this.lastTap = t0;
        } else this.lastEvent = t0;
        const layers = SOUND_MAP[name];
        try {
            if (layers.every((l) => this.buf[l[0]])) layers.forEach((l) => this.layer(...l));
            else SYNTH[name].forEach((n) => this.note(...n));
        } catch (e) {}
    }
};
function haptic(pattern = 6) {
    if (!prefs.haptics || !navigator.vibrate) return;
    try { navigator.vibrate(pattern); } catch (e) {}
}

/* --------------------------------------------------------------------------
   4. Library: recent, saved, done, reading position (per device)
   -------------------------------------------------------------------------- */
const LIB_KEY = 'ilberiz_library';
const lib = (() => {
    const raw = lsJSON(LIB_KEY, {});
    const data = {
        recent: Array.isArray(raw.recent) ? raw.recent : [],
        saved: Array.isArray(raw.saved) ? raw.saved : [],
        done: Array.isArray(raw.done) ? raw.done : [],
        pos: raw.pos && typeof raw.pos === 'object' ? raw.pos : {}
    };
    const save = () => lsSet(LIB_KEY, JSON.stringify(data));
    return {
        data,
        touch(id) {
            data.recent = [{ id, t: Date.now() }, ...data.recent.filter((r) => r.id !== id)].slice(0, 24);
            save();
        },
        isSaved: (id) => data.saved.includes(id),
        toggleSave(id) {
            const on = !data.saved.includes(id);
            data.saved = on ? [id, ...data.saved] : data.saved.filter((x) => x !== id);
            save();
            return on;
        },
        isDone: (id) => data.done.includes(id),
        setDone(id, on) {
            data.done = data.done.filter((x) => x !== id);
            if (on) data.done.unshift(id);
            save();
        },
        getPos: (id) => data.pos[id] || null,
        setPos(id, page, pages) {
            data.pos[id] = { page, pages, t: Date.now() };
            const oldest = Object.keys(data.pos).sort((a, b) => data.pos[a].t - data.pos[b].t);
            oldest.slice(0, Math.max(0, oldest.length - 200)).forEach((k) => delete data.pos[k]);
            save();
        },
        clear() { data.recent = []; data.saved = []; data.done = []; data.pos = {}; save(); }
    };
})();

/* --------------------------------------------------------------------------
   5. Course data index
   -------------------------------------------------------------------------- */
const state = { data: null, batch: null, rendered: null, navType: 'push', first: true };
const subjectIdx = new Map();
const chapIdx = new Map();   // chapter + subchapter id -> { node, subject, parent }
const itemIdx = new Map();   // item id -> { item, subject, chapter, subchapter, container }

const SUBJECT_FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'stem', label: 'Science & Maths', subjects: ['sub-10-math', 'sub-10-phy', 'sub-10-chem', 'sub-10-bio', 'sub-10-comp'] },
    { id: 'humanities', label: 'History & Geography', subjects: ['sub-10-his', 'sub-10-geo'] },
    { id: 'lang', label: 'Languages', subjects: ['sub-10-eng', 'sub-10-hin'] }
];
const TYPE_ICON = { pdf: 'description', dpp: 'quiz', video: 'play_circle' };

function itemKind(item) {
    if (item.type === 'pdf') return 'pdf';
    if (item.type === 'interactive' || item.type === 'app') return 'dpp';
    return 'video';
}
function allItems(node) {
    return [...(node.items || []), ...((node.subchapters || []).flatMap((sc) => sc.items || []))];
}
function countItems(list) {
    const notes = list.filter((it) => itemKind(it) === 'pdf').length;
    const done = list.filter((it) => lib.isDone(it.id)).length;
    return { notes, dpps: list.length - notes, done, total: list.length, pct: list.length ? Math.round((done / list.length) * 100) : 0 };
}
function chapterLabel(name, parentName) {
    let clean = String(name || '').replace(/^[\p{Extended_Pictographic}️‍\s]+/u, '').trim();
    if (parentName) {
        const pt = chapterLabel(parentName).title;
        if (clean.startsWith(pt + ' — ')) clean = clean.slice(pt.length + 3);
    }
    const m = clean.match(/^(Civics\s+)?(Ch|Chapter|Unit|Poem|Story)\s*(\d+)\s*[:.]\s*(.+)$/i);
    if (m) {
        const n = m[3];
        const kind = m[2].toLowerCase();
        const num = m[1] ? 'C' + n : (kind === 'unit' ? 'U' + n : n);
        const short = `${m[1] ? 'Civics' : ({ unit: 'Unit', poem: 'Poem', story: 'Story' }[kind] || 'Ch')} ${n}`;
        return { num, short, title: m[4].trim(), kind };
    }
    return { num: null, short: '', title: clean, kind: '' };
}
const fullLabel = (lbl) => (lbl.short ? `${lbl.short}: ${lbl.title}` : lbl.title);
const shortLabel = (lbl) => lbl.short || lbl.title;
function itemParts(item) {
    const t = String(item.title || '');
    const note = t.match(/^(.+?)\s+(\d{1,2})\s+Class Notes$/i);
    if (note) return { eyebrow: note[1], title: `Class notes ${note[2]}` };
    const i = t.indexOf(' — ');
    if (i > 0) return { eyebrow: t.slice(0, i), title: t.slice(i + 3) };
    return { eyebrow: '', title: t };
}
function contextLine(entry) {
    const parts = [entry.subject.name, shortLabel(chapterLabel(entry.chapter.name))];
    if (entry.subchapter) parts.push(shortLabel(chapterLabel(entry.subchapter.name, entry.chapter.name)));
    return parts.filter(Boolean).join(' · ');
}
const nodeHref = (subject, node, parent) => `#/s/${subject.id}/${parent ? parent.id + '/' : ''}${node.id}`;
const containerHref = (entry) => nodeHref(entry.subject, entry.container, entry.subchapter && entry.chapter);
const bareURL = (url) => url.split('#')[0].split('?')[0];
function fileURL(file) {
    try { return bareURL(new URL(file, location.href).href); } catch (e) { return file; }
}

function buildIndexes() {
    state.data.batches.forEach((batch) => batch.subjects.forEach((subject) => {
        subjectIdx.set(subject.id, subject);
        const addItems = (chapter, subchapter) => ((subchapter || chapter).items || []).forEach((item) => itemIdx.set(item.id, { item, subject, chapter, subchapter, container: subchapter || chapter }));
        subject.chapters.forEach((chapter) => {
            chapIdx.set(chapter.id, { node: chapter, subject, parent: null });
            addItems(chapter, null);
            (chapter.subchapters || []).forEach((sc) => {
                chapIdx.set(sc.id, { node: sc, subject, parent: chapter });
                addItems(chapter, sc);
            });
        });
    }));
}

/* --------------------------------------------------------------------------
   6. Subject emblems (hand-drawn line art, currentColor)
   -------------------------------------------------------------------------- */
const EMBLEM_PATHS = {
    'sub-10-math': '<path d="M8 40h32M8 40V8"/><path d="M12 36Q24 2 36 36"/><path d="M8 24h3M8 16h3M20 40v-3M32 40v-3"/>',
    'sub-10-phy': '<path d="M24 6c5.5 6 5.5 30 0 36c-5.5-6-5.5-30 0-36z"/><path d="M3 15h21l18 9M3 33h21l18-9M3 24h39"/>',
    'sub-10-chem': '<path d="M24 8l14 8v16l-14 8l-14-8V16z"/><circle cx="24" cy="24" r="7"/>',
    'sub-10-bio': '<path d="M9 39C9 20 21 9 40 8c0 19-11 31-31 31z"/><path d="M9 39L31 17M17 31h8M22 26v-7M27 21h6"/>',
    'sub-10-geo': '<path d="M24 7c10 0 17 6.5 17 16.5S34 41 23.5 41S7 34 7 24.5S14 7 24 7z"/><path d="M24 14.5c6 0 9.5 4 9.5 9.5s-4 10-9.5 10s-9.5-4-9.5-9.5s3.5-10 9.5-10z"/><circle cx="24" cy="24" r="2.6"/>',
    'sub-10-his': '<path d="M7 12L24 5l17 7M9 12h30M12 16h24M16 16v20M24 16v20M32 16v20M12 36h24M9 41h30"/>',
    'sub-10-eng': '<path d="M24 13c-5-3.5-11-4.5-17-3.5v27c6-1 12 0 17 3.5c5-3.5 11-4.5 17-3.5v-27c-6-1-12 0-17 3.5z"/><path d="M24 13v27"/>',
    'sub-10-hin': '<text x="24" y="34" text-anchor="middle" font-size="27" font-weight="700" fill="currentColor" stroke="none" font-family="\'Noto Sans Devanagari\',\'Nirmala UI\',Mangal,sans-serif">अ</text>',
    'sub-10-comp': '<path d="M17 14L7 24l10 10M31 14l10 10l-10 10M27 9l-6 30"/>'
};
function emblem(subjectId, cls = '') {
    const paths = EMBLEM_PATHS[subjectId] || '<circle cx="24" cy="24" r="14"/>';
    return `<svg class="${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

/* --------------------------------------------------------------------------
   7. Toasts
   -------------------------------------------------------------------------- */
function toast(message, { icon = 'check_circle', action = null, ms = 2800 } = {}) {
    const root = $('#toasts');
    const el = h(`<div class="toast" role="status"><span class="ms">${icon}</span><span>${esc(message)}</span></div>`);
    if (action) {
        const b = h(`<button type="button">${esc(action.label)}</button>`);
        b.addEventListener('click', () => { action.fn(); remove(); });
        el.appendChild(b);
    }
    while (root.children.length > 2) root.firstElementChild.remove();
    root.appendChild(el);
    let timer = setTimeout(remove, ms);
    function remove() {
        clearTimeout(timer);
        if (!el.isConnected) return;
        el.classList.add('out');
        setTimeout(() => el.remove(), 200);
    }
}

/* --------------------------------------------------------------------------
   8. History-aware navigation + overlays (phone back button works)
   -------------------------------------------------------------------------- */
const scrollMem = new Map();
let overlay = null;         // { name, unmount }
let afterOverlayPop = null;
let reader = null;          // { id, el, cleanup }

const depth = () => (history.state && typeof history.state.ilb === 'number' ? history.state.ilb : 0);

function go(hash, { replace = false } = {}) {
    if (!hash.startsWith('#')) hash = '#' + hash;
    if (overlay) {
        dismissOverlay(() => go(hash, { replace }));
        return;
    }
    if (hash === location.hash && !replace) { route(); return; }
    rememberScroll();
    if (replace) history.replaceState({ ilb: depth() }, '', hash);
    else history.pushState({ ilb: depth() + 1 }, '', hash);
    state.navType = 'push';
    route();
}
function goBack(fallback) {
    if (depth() > 0) history.back();
    else go(fallback || '#/', { replace: true });
}
function rememberScroll() {
    if (state.rendered) scrollMem.set(state.rendered, window.scrollY);
}

const overlayRoot = () => $('#overlay-root');
function refocus(el) { if (el && el.focus) el.focus({ preventScroll: true }); }
function showOverlay(name, mount, unmount) {
    if (overlay) closeOverlayUI();
    history.pushState({ ilb: depth() + 1, overlay: name }, '', location.href);
    overlay = { name, unmount };
    mount();
    document.body.classList.add('no-scroll');
}
function closeOverlayUI() {
    if (!overlay) return;
    const o = overlay;
    overlay = null;
    try { o.unmount(); } catch (e) {}
    if (!reader) document.body.classList.remove('no-scroll');
}
function dismissOverlay(then) {
    if (!overlay) { if (then) then(); return; }
    if (overlay.closing) return;
    if (history.state && history.state.overlay === overlay.name) {
        overlay.closing = true;
        afterOverlayPop = then || null;
        history.back();
    } else {
        closeOverlayUI();
        if (then) then();
    }
}

window.addEventListener('popstate', (e) => {
    const st = e.state || {};
    if (overlay && st.overlay !== overlay.name) {
        closeOverlayUI();
        if (afterOverlayPop) { const fn = afterOverlayPop; afterOverlayPop = null; fn(); return; }
    }
    if (st.overlay && !overlay) {
        history.replaceState({ ilb: st.ilb || 0 }, '', location.href);
    }
    state.navType = 'pop';
    route();
});
window.addEventListener('hashchange', () => {
    if (!history.state || typeof history.state.ilb !== 'number') {
        history.replaceState({ ilb: 1 }, '', location.href);
        state.navType = 'push';
    }
    route();
});

function parseRoute(hash = location.hash) {
    const parts = hash.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean).map(decodeURIComponent);
    const key = '#/' + parts.join('/');
    const [page, a, b, c] = parts;
    if (page === 'subjects') return { name: 'subjects', key: '#/subjects' };
    if (page === 'library') return { name: 'library', tab: a || 'recent', key: '#/library' + (a ? '/' + a : '') };
    if (page === 's' && b) return { name: 'chapter', subjectId: a, chapterId: b, subId: c || null, key };
    if (page === 's' && a) return { name: 'subject', subjectId: a, key };
    if (page === 'read' && a) return { name: 'read', itemId: a, key: '#/read/' + a };
    return { name: 'home', key: '#/' };
}

function route() {
    if (!state.data) return;
    const r = parseRoute();
    if (overlay && !(history.state && history.state.overlay)) closeOverlayUI();
    if (r.name === 'read') {
        const entry = itemIdx.get(r.itemId);
        if (!entry) { go('#/', { replace: true }); return; }
        const parentRoute = parseRoute(containerHref(entry));
        if (state.rendered !== parentRoute.key) renderPage(parentRoute, { transition: false });
        if (!reader || reader.id !== r.itemId) openReader(entry);
        return;
    }
    if (reader) {
        closeReader();
        state.rendered = null; // refresh so progress / done states are current
        renderPage(r, { transition: false });
        return;
    }
    renderPage(r, { transition: !state.first });
}
/* --------------------------------------------------------------------------
   9. Page rendering
   -------------------------------------------------------------------------- */
const view = () => $('#view');

function renderPage(r, { transition = true } = {}) {
    const same = state.rendered === r.key;
    if (same && transition) return; // duplicate event for a page already on screen
    state.rendered = r.key;
    const navType = state.navType;
    const paint = () => {
        const page = buildPage(r);
        const v = view();
        v.innerHTML = '';
        v.appendChild(page.el);
        updateChrome(r, page);
        markOffline(v);
        const y = navType === 'pop' ? (scrollMem.get(r.key) || 0) : 0;
        window.scrollTo(0, same ? window.scrollY : y);
    };
    if (transition && !same && document.startViewTransition && !reducedMotion() && !document.hidden) {
        try {
            const vt = document.startViewTransition(paint);
            vt.ready.catch(() => {});
            vt.finished.catch(() => {});
        } catch (e) { paint(); }
    } else {
        paint();
    }
    state.first = false;
}

function buildPage(r) {
    switch (r.name) {
        case 'subjects': return pageSubjects();
        case 'subject': return pageSubject(r.subjectId);
        case 'chapter': return pageChapter(r.subjectId, r.chapterId, r.subId);
        case 'library': return pageLibrary(r.tab);
        default: return pageHome();
    }
}

function updateChrome(r, page) {
    const topbar = $('#topbar');
    const isRoot = ['home', 'subjects', 'library'].includes(r.name);
    topbar.classList.toggle('has-back', !isRoot);
    $('#top-title').textContent = page.topTitle;
    topbar.dataset.back = page.backHref || '#/';
    document.title = page.docTitle ? `${page.docTitle} | Ilberiz Techz` : 'Ilberiz Techz | ICSE Class 10 Notes & DPPs';

    // breadcrumbs (laptop)
    const trail = [{ label: 'Home', href: '#/' }, ...(page.crumbs || [])];
    $('#crumbs').innerHTML = trail.map((c, i) => (i < trail.length - 1
        ? `<a href="${c.href}">${esc(c.label)}</a>`
        : `<span class="here"${i ? ' aria-current="page"' : ''}>${esc(c.label)}</span>`)).join('<span class="ms sep" aria-hidden="true">chevron_right</span>');

    // tab bar
    const tab = isRoot ? r.name : 'subjects';
    $$('#tabbar .tab').forEach((t) => {
        const on = t.dataset.tab === tab;
        t.classList.toggle('active', on);
        if (t.tagName === 'A') { if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current'); }
    });

    // sidebar
    const navKey = isRoot ? r.name : 's:' + r.subjectId;
    $$('#side-nav [data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === navKey));
    syncLibCount();
}
function syncLibCount() {
    const el = $('#side-nav [data-lib-count]');
    if (el) el.textContent = lib.data.saved.length || '';
}

function sectionHead(title, link) {
    return `<div class="section-head"><h2>${esc(title)}</h2>${link ? `<a class="link" href="${link.href}">${esc(link.label)}<span class="ms">chevron_right</span></a>` : ''}</div>`;
}

// "3 notes" / "2 DPPs" / "1/5 done" chips
function countChips(c, { done = true } = {}) {
    return (c.notes ? `<span class="chip"><span class="ms">description</span>${plural(c.notes, 'note')}</span>` : '')
        + (c.dpps ? `<span class="chip accent"><span class="ms">quiz</span>${plural(c.dpps, 'DPP')}</span>` : '')
        + (done && c.done ? `<span class="chip ok"><span class="ms">check</span>${c.done}/${c.total} done</span>` : '');
}
function emptyState(icon, title, text, actions, style = '') {
    return `<div class="empty-state"${style ? ` style="${style}"` : ''}><span class="ms">${icon}</span><h3>${title}</h3><p>${text}</p><div class="actions">${actions}</div></div>`;
}
function starButton(id) {
    const on = lib.isSaved(id);
    return `<button type="button" class="icon-btn star${on ? ' on' : ''}" data-star="${id}" aria-pressed="${on}" aria-label="${on ? 'Remove from Library' : 'Save to Library'}"><span class="ms">${on ? 'bookmark' : 'bookmark_add'}</span></button>`;
}

function subjectTile(subject) {
    const c = countItems(subject.chapters.flatMap(allItems));
    const meta = c.total
        ? [c.notes ? plural(c.notes, 'note') : '', c.dpps ? plural(c.dpps, 'DPP') : ''].filter(Boolean).join(' · ')
        : 'Notes coming soon';
    return `
        <a class="subj${c.total ? '' : ' soon'}" href="#/s/${subject.id}" data-subject="${subject.id}">
            <span class="subj-emblem">${emblem(subject.id)}</span>
            ${emblem(subject.id, 'subj-art')}
            <h3>${esc(subject.name)}</h3>
            <p class="desc">${esc(subject.description || '')}</p>
            <span class="meta">${meta}</span>
            ${c.done ? `<span class="bar" title="${c.pct}% done"><i style="--w:${c.pct}%"></i></span>` : ''}
        </a>`;
}

function itemRow(entry, { context = false } = {}) {
    const { item } = entry;
    const k = itemKind(item);
    const done = lib.isDone(item.id);
    const pos = lib.getPos(item.id);
    const metaBits = [];
    if (k === 'pdf' && item.size) metaBits.push(`<span class="m">${esc(item.size)}</span>`);
    if (k === 'dpp' && item.badge) metaBits.push(`<span class="m">${esc(item.badge)}</span>`);
    if (pos && pos.page > 1 && !done) metaBits.push(`<span class="m resume"><span class="ms">bookmark</span>Page ${pos.page} of ${pos.pages}</span>`);
    if (k === 'pdf') metaBits.push(`<span class="m offline" data-offline-file="${esc(fileURL(item.file))}" hidden><span class="ms">offline_pin</span>Offline</span>`);
    return `
        <div class="item" data-subject="${entry.subject.id}">
            <a class="item-main" href="#/read/${item.id}">
                <span class="type-ico ${k}"><span class="ms">${TYPE_ICON[k]}</span>${done ? '<span class="done-dot"><span class="ms">check</span></span>' : ''}</span>
                <div class="item-text">
                    ${context ? `<div class="eyebrow">${esc(contextLine(entry))}</div>` : ''}
                    <h3>${esc(context ? item.title : itemParts(item).title)}</h3>
                    ${item.subtitle ? `<p class="sub">${esc(item.subtitle)}</p>` : ''}
                    ${metaBits.length ? `<div class="item-meta">${metaBits.join('')}</div>` : ''}
                </div>
            </a>
            ${starButton(item.id)}
        </div>`;
}

function dppCard(entry) {
    const { item } = entry;
    const done = lib.isDone(item.id);
    return `
        <div class="dpp" data-subject="${entry.subject.id}">
            <a class="dpp-main" href="#/read/${item.id}">
                <span class="dpp-top"><span class="chip accent">${esc(item.badge || 'Interactive')}</span>${done ? '<span class="chip ok"><span class="ms">check</span>Done</span>' : ''}</span>
                <h3>${esc(itemParts(item).title)}</h3>
                ${item.subtitle ? `<p class="sub">${esc(item.subtitle)}</p>` : ''}
                <span class="dpp-foot"><span class="start"><span class="ms">play_arrow</span>${done ? 'Practise again' : 'Start practice'}</span></span>
            </a>
            ${starButton(item.id)}
        </div>`;
}

function greeting() {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 12) return 'Good morning';
    if (hr >= 12 && hr < 17) return 'Good afternoon';
    if (hr >= 17 && hr < 22) return 'Good evening';
    return 'Late-night revision?';
}

function recentEntries() {
    return lib.data.recent.map((r) => ({ ...itemIdx.get(r.id), t: r.t })).filter((e) => e.item);
}

/* ----- Home ----- */
function pageHome() {
    const recents = recentEntries();
    const last = recents[0];
    let topLeft;
    if (last) {
        const isPdf = itemKind(last.item) === 'pdf';
        const pos = lib.getPos(last.item.id);
        const paged = pos && pos.pages;
        const more = recents.slice(1, 4).map((e) => `<a class="btn btn-sm" href="#/read/${e.item.id}" data-subject="${e.subject.id}"><span class="ms" style="color:var(--sub-ink)">${TYPE_ICON[itemKind(e.item)]}</span>${esc(truncate(itemParts(e.item).title.replace(/^Interactive\s+/i, ''), 30))}</a>`).join('');
        topLeft = `
            <div class="panel continue-wrap" data-subject="${last.subject.id}">
                <a class="continue" href="#/read/${last.item.id}">
                    <span class="continue-label"><span class="ms">${isPdf ? 'auto_stories' : 'quiz'}</span>${isPdf ? 'Continue reading' : 'Continue practice'}</span>
                    <h3>${esc(last.item.title)}</h3>
                    <span class="meta">${esc(contextLine(last))}${paged ? ` · Page ${pos.page} of ${pos.pages}` : ` · Opened ${timeAgo(last.t)}`}</span>
                    ${paged ? `<span class="bar"><i style="--w:${Math.round((pos.page / pos.pages) * 100)}%"></i></span>` : ''}
                    <span class="continue-foot"><span class="btn btn-primary btn-sm"><span class="ms">play_arrow</span>${isPdf ? 'Resume' : 'Open DPP'}</span></span>
                </a>
                ${more ? `<div class="continue-more">${more}</div>` : ''}
            </div>`;
    } else {
        topLeft = `
            <div class="panel welcome">
                <h3>Start with a subject</h3>
                <p>Open any note and the site remembers the page you stopped at.</p>
                <div class="actions">
                    <a class="btn btn-primary" href="#/subjects"><span class="ms">grid_view</span>Subjects</a>
                    <button type="button" class="btn" data-action="search"><span class="ms">search</span>Search a topic</button>
                </div>
            </div>`;
    }

    const rel = LATEST_RELEASE;
    const relSub = subjectIdx.get(rel.subjectId);
    const relChap = chapIdx.get(rel.chapterId);
    const relCh = relChap ? chapterLabel(relChap.node.name).short : '';
    const release = relSub ? `
        <section class="panel release" data-subject="${relSub.id}" aria-label="New release">
            ${emblem(relSub.id, 'release-art')}
            <div class="release-top"><span class="chip new">New</span><span class="chip sub">${esc(relSub.name)}${relCh ? ' · ' + esc(relCh) : ''}</span></div>
            <h3>${esc(rel.title)}</h3>
            <p>${esc(rel.note)}</p>
            <div class="release-list">
                ${rel.items.filter((ri) => itemIdx.has(ri.id)).map((ri) => `
                    <a class="release-item" href="#/read/${ri.id}">
                        <span class="ico"><span class="ms">quiz</span></span>
                        <span><strong>${esc(ri.label)}</strong><small>${esc(ri.meta)}</small></span>
                        <span class="ms go">chevron_right</span>
                    </a>`).join('')}
            </div>
            ${rel.more ? `<a class="btn btn-ghost btn-sm" style="align-self:flex-start;margin-left:-8px;color:var(--accent-text)" href="${rel.more.href}">${esc(rel.more.label)}<span class="ms">chevron_right</span></a>` : ''}
        </section>` : '';

    const saved = lib.data.saved.map((id) => itemIdx.get(id)).filter(Boolean).slice(0, 4);
    const subjects = state.batch.subjects;
    const sub = recents.length
        ? 'Pick up where you stopped, or open a subject.'
        : 'ICSE Class 10 class notes and PYQ practice for every subject.';

    const el = h(`
        <div class="page${state.first ? ' reveal' : ''}">
            <div class="greet"><h1>${greeting()}</h1><p>${sub}</p></div>
            <div class="home-top">${topLeft}${release}</div>
            <div data-install-slot></div>
            <section class="section">
                ${sectionHead('Subjects', { href: '#/subjects', label: 'See all' })}
                <div class="subj-grid">${subjects.map(subjectTile).join('')}</div>
            </section>
            ${saved.length ? `<section class="section">${sectionHead('Saved', { href: '#/library/saved', label: 'Library' })}<div class="item-list two">${saved.map((e) => itemRow(e, { context: true })).join('')}</div></section>` : ''}
            <a class="panel community" href="${TELEGRAM_URL}" target="_blank" rel="noopener noreferrer">
                <span class="ico"><span class="ms">send</span></span>
                <div><strong>Join the Telegram group</strong><small>New notes, DPP releases and doubt help</small></div>
                <span class="ms" style="color:var(--faint)">open_in_new</span>
            </a>
        </div>`);
    renderInstallBanner($('[data-install-slot]', el));
    return { el, topTitle: 'Ilberiz Techz' };
}

/* ----- All subjects ----- */
let subjectFilter = 'all';
function pageSubjects() {
    const subjects = state.batch.subjects;
    const inFilter = (f) => subjects.filter((s) => !f.subjects || f.subjects.includes(s.id));
    const totals = countItems(subjects.flatMap((s) => s.chapters.flatMap(allItems)));
    const el = h(`
        <div class="page">
            <div class="page-head">
                <h1>Subjects</h1>
                <p>${plural(totals.notes, 'class note')} and ${plural(totals.dpps, 'interactive DPP')} across ${subjects.length} ICSE Class 10 subjects (2025–27 syllabus).</p>
            </div>
            <div class="filters" role="group" aria-label="Filter subjects">
                ${SUBJECT_FILTERS.map((f) => `<button type="button" class="filter" data-filter="${f.id}" aria-pressed="${subjectFilter === f.id}">${esc(f.label)} <span class="n">${inFilter(f).length}</span></button>`).join('')}
            </div>
            <div class="subj-grid" data-grid></div>
        </div>`);
    const paintGrid = () => { $('[data-grid]', el).innerHTML = inFilter(SUBJECT_FILTERS.find((f) => f.id === subjectFilter)).map(subjectTile).join(''); };
    paintGrid();
    onEach(el, '[data-filter]', (b) => {
        subjectFilter = b.dataset.filter;
        pressOnly(el, '[data-filter]', b);
        paintGrid();
    });
    return { el, topTitle: 'Subjects', docTitle: 'Subjects', crumbs: [{ label: 'Subjects' }] };
}

/* ----- One subject (chapters) ----- */
const chapterFilters = {};
const TOPIC_WORDS = { poem: ['poem', 'poems', 'Poems'], story: ['story', 'stories', 'Stories'], ch: ['chapter', 'chapters', 'Chapters in this unit'] };
const topicWords = (node) => TOPIC_WORDS[chapterLabel(node.subchapters[0].name, node.name).kind] || ['topic', 'topics', 'Topics'];
function chapterRow(subject, node, parent) {
    const c = countItems(allItems(node));
    const lbl = chapterLabel(node.name, parent && parent.name);
    const subs = node.subchapters || [];
    const tags = (subs.length ? `<span class="chip">${plural(subs.length, ...topicWords(node))}</span>` : '') + countChips(c);
    const numInner = lbl.num ? esc(lbl.num) : `<span class="ms">${esc(node.icon || 'auto_stories')}</span>`;
    return `
        <a class="chap${c.total ? '' : ' empty'}" href="${nodeHref(subject, node, parent)}" data-subject="${subject.id}" data-has-notes="${c.notes > 0}" data-has-dpps="${c.dpps > 0}">
            <span class="ring${c.pct === 100 ? ' done' : ''}" style="--p:${c.pct}"><span>${c.pct === 100 ? '<span class="ms">check</span>' : numInner}</span></span>
            <div>
                <h3>${esc(lbl.title)}</h3>
                ${node.description ? `<p class="desc">${esc(node.description)}</p>` : ''}
                <div class="tags">${tags || '<span class="chip">Notes coming soon</span>'}</div>
            </div>
            <span class="ms go">chevron_right</span>
        </a>`;
}

function pageSubject(subjectId) {
    const subject = subjectIdx.get(subjectId);
    if (!subject) return notFound();
    const c = countItems(subject.chapters.flatMap(allItems));
    const isUnits = subject.chapters.some((ch) => /^Unit\s/i.test(ch.name));
    const f = chapterFilters[subjectId] || 'all';
    const perChapter = subject.chapters.map((ch) => countItems(allItems(ch)));
    const notesN = perChapter.filter((x) => x.notes).length;
    const dppN = perChapter.filter((x) => x.dpps).length;
    const filter = (id, label, n) => (n ? `<button type="button" class="filter" data-cf="${id}" aria-pressed="${f === id}">${label} <span class="n">${n}</span></button>` : '');
    const el = h(`
        <div class="page" data-subject="${subject.id}">
            <header class="subj-head" data-subject="${subject.id}">
                <span class="subj-emblem">${emblem(subject.id)}</span>
                ${emblem(subject.id, 'subj-art')}
                <div><h1>${esc(subject.name)}</h1><p>${esc(subject.description || '')}</p></div>
                <div class="subj-stats">
                    <span class="chip">${plural(subject.chapters.length, isUnits ? 'unit' : 'chapter')}</span>
                    ${countChips(c, { done: false })}
                </div>
                ${c.total ? `<div class="subj-progress"><span class="bar"><i style="--w:${c.pct}%"></i></span><span>${c.done} of ${c.total} done</span></div>` : ''}
            </header>
            ${(notesN && notesN < subject.chapters.length) || dppN ? `
            <div class="filters" role="group" aria-label="Filter chapters">
                ${filter('all', 'All', subject.chapters.length)}${filter('notes', 'With notes', notesN)}${filter('dpps', 'With DPPs', dppN)}
            </div>` : '<div style="height:16px"></div>'}
            <div class="chap-list">${subject.chapters.map((ch) => chapterRow(subject, ch)).join('')}</div>
        </div>`);
    const applyFilter = (val) => {
        chapterFilters[subjectId] = val;
        $$('.chap', el).forEach((row) => { row.hidden = val !== 'all' && row.dataset[val === 'notes' ? 'hasNotes' : 'hasDpps'] !== 'true'; });
        pressOnly(el, '[data-cf]', $(`[data-cf="${val}"]`, el));
    };
    applyFilter(f);
    onEach(el, '[data-cf]', (b) => applyFilter(b.dataset.cf));
    return { el, topTitle: subject.name, docTitle: subject.name, backHref: '#/subjects', crumbs: [{ label: 'Subjects', href: '#/subjects' }, { label: subject.name }] };
}

/* ----- One chapter / unit / sub-chapter ----- */
function pageChapter(subjectId, chapterId, subId) {
    const subject = subjectIdx.get(subjectId);
    const ch = chapIdx.get(chapterId);
    if (!subject || !ch) return notFound();
    const chapter = ch.node;
    const sc = subId ? chapIdx.get(subId) : null;
    const node = sc ? sc.node : chapter;
    const lbl = chapterLabel(node.name, sc ? chapter.name : null);
    const parentLbl = chapterLabel(chapter.name);
    const items = node.items || [];
    const entries = items.map((it) => itemIdx.get(it.id));
    const dpps = entries.filter((e) => itemKind(e.item) === 'dpp');
    const notes = entries.filter((e) => itemKind(e.item) !== 'dpp');
    const subs = !sc && chapter.subchapters ? chapter.subchapters : [];
    const c = countItems(allItems(node));
    const eyebrow = sc ? `${subject.name} · ${shortLabel(parentLbl)}` : subject.name;
    const backHref = sc ? `#/s/${subject.id}/${chapter.id}` : `#/s/${subject.id}`;

    const el = h(`
        <div class="page" data-subject="${subject.id}">
            <div class="page-head">
                <div class="row" style="margin:0 0 4px">
                    <a class="chip sub" href="#/s/${subject.id}"><span class="side-dot" style="margin:0;width:8px;height:8px"></span>${esc(eyebrow)}</a>
                    ${lbl.short ? `<span class="chip">${esc(lbl.short)}</span>` : ''}
                </div>
                <h1>${esc(lbl.title)}</h1>
                ${node.author ? `<p>${esc(node.author)}</p>` : ''}
                ${node.description ? `<p class="clamp" data-expand title="Tap to read more">${esc(node.description)}</p>` : ''}
                ${c.total ? `<div class="row">
                    ${countChips(c)}
                </div>` : ''}
            </div>
            ${dpps.length ? `<section class="section" style="margin-top:8px">${sectionHead(subs.length ? 'Unit practice' : 'Practice (PYQ DPPs)')}<div class="dpp-grid">${dpps.map(dppCard).join('')}</div></section>` : ''}
            ${notes.length ? `<section class="section">${sectionHead(subs.length ? 'Unit notes' : 'Class notes')}<div class="item-list two">${notes.map((e) => itemRow(e)).join('')}</div></section>` : ''}
            ${subs.length ? `<section class="section">${sectionHead(topicWords(chapter)[2])}<div class="chap-list">${subs.map((s) => chapterRow(subject, s, chapter)).join('')}</div></section>` : ''}
            ${items.length || subs.length ? '' : emptyState('hourglass_top', 'Notes for this chapter are on the way',
                `Join the Telegram group to hear the moment they are published. Other chapters of ${esc(subject.name)} may already have notes.`,
                `<a class="btn" href="${backHref}"><span class="ms">arrow_back</span>Back to ${esc(sc ? (parentLbl.short || 'unit') : subject.name)}</a>
                <a class="btn btn-primary" href="${TELEGRAM_URL}" target="_blank" rel="noopener noreferrer"><span class="ms">send</span>Telegram group</a>`, 'margin-top:12px')}
        </div>`);
    const crumbs = [{ label: 'Subjects', href: '#/subjects' }, { label: subject.name, href: `#/s/${subject.id}` }];
    if (sc) crumbs.push({ label: shortLabel(parentLbl), href: backHref });
    crumbs.push({ label: fullLabel(lbl) });
    return { el, topTitle: lbl.short ? `${lbl.short} · ${lbl.title}` : lbl.title, docTitle: `${lbl.title} — ${subject.name}`, backHref, crumbs };
}

/* ----- Library ----- */
function pageLibrary(tab) {
    const tabs = [
        { id: 'recent', label: 'Recent', icon: 'history', ids: lib.data.recent.map((r) => r.id), empty: ['history', 'Nothing opened yet', 'Notes and DPPs you open will show up here, with the page you stopped at.'] },
        { id: 'saved', label: 'Saved', icon: 'bookmark', ids: lib.data.saved, empty: ['bookmark_add', 'No saved items', 'Tap the bookmark on any note or DPP to keep it here for quick revision.'] },
        { id: 'done', label: 'Done', icon: 'task_alt', ids: lib.data.done, empty: ['task_alt', 'Nothing marked done', 'Mark a note as done from the reader menu to track your progress per chapter.'] }
    ];
    const cur = tabs.find((t) => t.id === tab) || tabs[0];
    const entries = cur.ids.map((id) => itemIdx.get(id)).filter(Boolean);
    const el = h(`
        <div class="page">
            <div class="page-head"><h1>Library</h1><p>Your recent, saved and finished notes. Stored on this device only.</p></div>
            <div class="seg lib-tabs" role="group" aria-label="Library sections">
                ${tabs.map((t) => `<button type="button" data-lib="${t.id}" aria-pressed="${t.id === cur.id}"><span class="ms">${t.icon}</span>${t.label}${t.ids.length ? ` <span style="opacity:.6">${t.ids.length}</span>` : ''}</button>`).join('')}
            </div>
            ${entries.length
                ? `<div class="item-list two">${entries.map((en) => itemRow(en, { context: true })).join('')}</div>`
                : emptyState(...cur.empty, '<a class="btn btn-primary" href="#/subjects"><span class="ms">grid_view</span>Browse subjects</a>')}
        </div>`);
    onEach(el, '[data-lib]', (b) => go(`#/library/${b.dataset.lib}`, { replace: true }));
    return { el, topTitle: 'Library', docTitle: 'Library', crumbs: [{ label: 'Library' }] };
}

function notFound() {
    const el = h(`<div class="page">${emptyState('search_off', 'This page does not exist', 'The link may be old. Open Subjects to find your chapter.', '<a class="btn btn-primary" href="#/subjects">Open subjects</a>', 'margin-top:24px')}</div>`);
    return { el, topTitle: 'Not found', docTitle: 'Not found' };
}

/* ----- Sidebar ----- */
function renderSidebar() {
    $('#side-nav').innerHTML = `
        <a class="side-link" href="#/" data-nav="home"><span class="ms">home</span><span>Home</span></a>
        <a class="side-link" href="#/subjects" data-nav="subjects"><span class="ms">grid_view</span><span>All subjects</span></a>
        <a class="side-link" href="#/library" data-nav="library"><span class="ms">bookmarks</span><span>Library</span><span class="count" data-lib-count>${lib.data.saved.length || ''}</span></a>
        <a class="side-link side-new" href="${LATEST_RELEASE.nav.href}"><span class="ms">auto_awesome</span><span>${esc(LATEST_RELEASE.nav.label)}</span><span class="chip new">New</span></a>
        <div class="side-label">Subjects</div>
        ${state.batch.subjects.map((s) => `<a class="side-link" href="#/s/${s.id}" data-nav="s:${s.id}" data-subject="${s.id}"><span class="side-dot"></span><span>${esc(s.name)}</span><span class="count">${s.chapters.flatMap(allItems).length || ''}</span></a>`).join('')}
    `;
}

/* --------------------------------------------------------------------------
   10. Search (command palette on laptop, full-screen on phone)
   -------------------------------------------------------------------------- */
let searchIndex = [];
function buildSearchIndex() {
    const add = (kind, title, path, href, subject, heading, words) =>
        searchIndex.push({ kind, title, path, href, subjectId: subject.id, tl: heading.toLowerCase(), blob: words.filter(Boolean).join(' ').toLowerCase() });
    itemIdx.forEach((entry) => {
        const { item, subject, chapter, subchapter: sc } = entry;
        add(itemKind(item), item.title, contextLine(entry), `#/read/${item.id}`, subject, item.title,
            [item.title, item.subtitle, item.badge, chapter.name, chapter.description, sc && sc.name, sc && sc.author, subject.name]);
    });
    chapIdx.forEach(({ node, subject, parent }) => {
        const n = allItems(node).length;
        add('chap', fullLabel(chapterLabel(node.name, parent && parent.name)),
            `${subject.name}${parent ? ' · ' + chapterLabel(parent.name).short : ''} · ${n ? plural(n, 'item') : 'coming soon'}`,
            nodeHref(subject, node, parent), subject, node.name, [node.name, node.description, node.author, parent && parent.name, subject.name]);
    });
    subjectIdx.forEach((s) => add('subject', s.name, 'Subject', `#/s/${s.id}`, s, s.name, [s.name, s.description]));
}
const reEscape = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const searchWords = (q) => q.toLowerCase().split(/\s+/).filter(Boolean);
function runSearch(q) {
    const words = searchWords(q);
    const phrase = q.toLowerCase().trim();
    const out = [];
    for (const e of searchIndex) {
        if (!words.every((w) => e.blob.includes(w))) continue;
        let score = 0;
        words.forEach((w) => {
            if (e.tl.includes(w)) score += 3;
            if (new RegExp('(^|[^a-z0-9])' + reEscape(w)).test(e.tl)) score += 2;
            score += 1;
        });
        if (e.tl.includes(phrase)) score += 6;
        if (e.kind === 'subject') score += 4;
        if (e.kind === 'chap') score += 1;
        out.push({ e, score });
    }
    return out.sort((a, b) => b.score - a.score).map((x) => x.e);
}
function highlight(text, q) {
    return esc(text).replace(new RegExp(`(${searchWords(q).map(reEscape).join('|')})`, 'gi'), '<mark>$1</mark>');
}
const SEARCH_SUGGESTIONS = ['Quit India', 'Julius Caesar', 'Electricity', 'Photosynthesis', 'Climate', 'Ammonia', 'Nervous System', 'Light'];

function openSearch(initial = '') {
    let sel = 0;
    const el = h(`
        <div class="search" role="dialog" aria-modal="true" aria-label="Search">
            <div class="search-head">
                <button type="button" class="icon-btn back" aria-label="Close search"><span class="ms">arrow_back</span></button>
                <label class="search-field">
                    <span class="ms">search</span>
                    <input type="search" placeholder="Search notes, chapters, DPPs" autocomplete="off" enterkeyhint="search" aria-label="Search notes, chapters and DPPs" spellcheck="false">
                    <button type="button" class="icon-btn clear" aria-label="Clear search" hidden><span class="ms">close</span></button>
                </label>
            </div>
            <div class="search-body" role="listbox" aria-label="Results"></div>
            <div class="search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>Enter</kbd> open</span><span><kbd>Esc</kbd> close</span></div>
        </div>`);
    const scrim = h('<div class="scrim"></div>');
    const input = el.querySelector('input');
    const body = el.querySelector('.search-body');
    const clearBtn = el.querySelector('.clear');

    const recentSearches = () => lsJSON('ilberiz_searches', []);
    function pushRecent(q) {
        const list = [q, ...recentSearches().filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 6);
        lsSet('ilberiz_searches', JSON.stringify(list));
    }
    const rowHTML = (kind, icon, title, r, attrs = '') => `<a class="result${attrs && r.i === sel ? ' sel' : ''}" href="${r.href}"${attrs} data-subject="${r.subjectId}">
            <span class="type-ico ${kind}"><span class="ms">${icon}</span></span>
            <span><strong>${title}</strong><small>${esc(r.path)}</small></span>
            <span class="ms enter">keyboard_return</span></a>`;
    const resultHTML = (r, q) => (TYPE_ICON[r.kind]
        ? rowHTML(r.kind, TYPE_ICON[r.kind], highlight(r.title, q), r, ` data-i="${r.i}" role="option"`)
        : rowHTML('chap', r.kind === 'subject' ? 'grid_view' : 'menu_book', highlight(r.title, q), r, ` data-i="${r.i}" role="option"`));
    const suggestHTML = (list) => `<div class="suggest">${list.map((x) => `<button type="button" data-q="${esc(x)}">${esc(x)}</button>`).join('')}</div>`;
    const groupHTML = (title, html) => (html ? `<div class="search-group"><h4>${title}</h4>${html}</div>` : '');
    function paint() {
        const q = input.value.trim();
        clearBtn.hidden = !q;
        if (!q) {
            const rec = recentSearches();
            body.innerHTML = groupHTML('Recent searches <button type="button" data-clear-recent>Clear</button>', rec.length && suggestHTML(rec))
                + groupHTML('Recently opened', recentEntries().slice(0, 4).map((e) => rowHTML(itemKind(e.item), TYPE_ICON[itemKind(e.item)], esc(e.item.title), { href: `#/read/${e.item.id}`, subjectId: e.subject.id, path: contextLine(e) })).join(''))
                + groupHTML('Try', suggestHTML(SEARCH_SUGGESTIONS));
            return;
        }
        const results = runSearch(q);
        if (!results.length) {
            body.innerHTML = `<div class="search-empty"><span class="ms">search_off</span><p>No notes or chapters match “${esc(q)}”.<br>Try a chapter name like “Climate” or a topic like “Dandi March”.</p></div>`;
            return;
        }
        const things = results.filter((r) => TYPE_ICON[r.kind]);
        const shown = [...results.filter((r) => !TYPE_ICON[r.kind]).slice(0, 6), ...things.slice(0, 40)];   // keyboard order = visual order
        sel = clamp(sel, 0, shown.length - 1);
        const rows = shown.map((r, i) => ({ ...r, i }));
        const html = (list) => list.map((r) => resultHTML(r, q)).join('');
        body.innerHTML = groupHTML('Subjects & chapters', html(rows.filter((r) => !TYPE_ICON[r.kind])))
            + groupHTML(`Notes & DPPs${things.length > 40 ? ' (top 40)' : ''}`, html(rows.filter((r) => TYPE_ICON[r.kind])));
    }
    function moveSel(d) {
        const list = $$('.result[data-i]', body);
        if (!list.length) return;
        sel = clamp(sel + d, 0, list.length - 1);
        list.forEach((x) => x.classList.toggle('sel', Number(x.dataset.i) === sel));
        list[sel].scrollIntoView({ block: 'nearest' });
    }
    function openHref(href) {
        const q = input.value.trim();
        if (q) pushRecent(q);
        dismissOverlay(() => go(href));
    }

    let deb;
    input.addEventListener('input', () => { clearTimeout(deb); sel = 0; deb = setTimeout(paint, 60); });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); moveSel(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); moveSel(-1); }
        else if (e.key === 'Enter') {
            e.preventDefault();
            const cur = $(`.result[data-i="${sel}"]`, body) || $('.result', body);
            if (cur) openHref(cur.getAttribute('href'));
        } else if (e.key === 'Escape') { e.preventDefault(); dismissOverlay(); }
    });
    clearBtn.addEventListener('click', () => { input.value = ''; paint(); input.focus(); });
    el.querySelector('.back').addEventListener('click', () => dismissOverlay());
    scrim.addEventListener('click', () => dismissOverlay());
    body.addEventListener('click', (e) => {
        const qBtn = e.target.closest('[data-q]');
        if (qBtn) { input.value = qBtn.dataset.q; sel = 0; paint(); input.focus(); return; }
        if (e.target.closest('[data-clear-recent]')) { lsSet('ilberiz_searches', '[]'); paint(); return; }
        const a = e.target.closest('a.result');
        if (a) { e.preventDefault(); e.stopPropagation(); sfx.play('open'); haptic(6); openHref(a.getAttribute('href')); }
    });

    const prevFocus = document.activeElement;
    showOverlay('search', () => {
        if (isWide()) overlayRoot().appendChild(scrim);
        overlayRoot().appendChild(el);
        input.value = initial;
        paint();
        requestAnimationFrame(() => input.focus());
    }, () => {
        el.remove();
        scrim.remove();
        refocus(prevFocus);
    });
}

/* --------------------------------------------------------------------------
   11. Sheets (settings, reader menu, contents)
   -------------------------------------------------------------------------- */
function openSheet(name, title, buildBody) {
    const scrim = h('<div class="scrim"></div>');
    const sheet = h(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="sheet-grip" aria-hidden="true"></div><div class="sheet-head"><h2>${esc(title)}</h2><button type="button" class="icon-btn" data-close aria-label="Close"><span class="ms">close</span></button></div><div class="sheet-body"></div></div>`);
    const body = $('.sheet-body', sheet);
    const closeBtn = $('[data-close]', sheet);
    buildBody(body);
    scrim.addEventListener('click', () => dismissOverlay());
    closeBtn.addEventListener('click', () => dismissOverlay());
    sheet.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); dismissOverlay(); } });
    // swipe down to close (phones)
    let startY = null;
    sheet.addEventListener('touchstart', (e) => { if (body.scrollTop <= 0) startY = e.touches[0].clientY; }, { passive: true });
    sheet.addEventListener('touchmove', (e) => {
        if (startY == null) return;
        const dy = e.touches[0].clientY - startY;
        if (dy > 0) sheet.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    sheet.addEventListener('touchend', (e) => {
        if (startY == null) return;
        const dy = (e.changedTouches[0].clientY - startY);
        startY = null;
        sheet.style.transform = '';
        if (dy > 90) dismissOverlay();
    });
    const prevFocus = document.activeElement;
    showOverlay(name, () => {
        overlayRoot().append(scrim, sheet);
        requestAnimationFrame(() => refocus(closeBtn));
    }, () => {
        scrim.classList.add('out');
        sheet.classList.add('out');
        setTimeout(() => { scrim.remove(); sheet.remove(); }, 230);
        refocus(prevFocus);
    });
}

let installPrompt = null;
const isStandalone = () => mq('(display-mode: standalone)') || window.navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const volumeIcon = (v) => (v < 34 ? 'volume_mute' : v < 67 ? 'volume_down' : 'volume_up');
const NO_OFFLINE = 'None yet — notes you open are saved automatically';
function openSettings() {
    openSheet('settings', 'Settings', (body) => {
        const q = (sel) => $(sel, body);
        const seg = (attr, current, options) => options.map(([id, icon, label]) => `<button type="button" data-${attr}="${id}" aria-pressed="${id === current}"><span class="ms">${icon}</span>${label}</button>`).join('');
        const row = (icon, title, note, extra = '') => `<span class="ms">${icon}</span><span class="label"><strong>${title}</strong><small>${note}</small></span>${extra}`;
        const toggle = (pref, on) => `<span class="switch"><input type="checkbox" data-pref="${pref}" ${on ? 'checked' : ''}><span></span></span>`;
        body.innerHTML = `
            <div class="set-group">
                <h3>Appearance</h3>
                <div class="seg full" role="group" aria-label="Theme">
                    ${seg('theme-pref', prefs.theme, [['system', 'contrast', 'Auto'], ['dark', 'dark_mode', 'Dark'], ['light', 'light_mode', 'Light']])}
                </div>
                <div class="set-row" style="margin-top:8px">
                    <div class="label"><strong>Highlighter colour</strong><small>Used for buttons, progress and highlights</small></div>
                </div>
                <div class="swatches" role="group" aria-label="Highlighter colour">
                    ${ACCENTS.map((a) => `<button type="button" class="swatch" style="--c:${a.c}" data-accent="${a.id}" aria-pressed="${prefs.accent === a.id}" aria-label="${a.name}"></button>`).join('')}
                </div>
            </div>
            <div class="set-group">
                <h3>Sound & touch</h3>
                <label class="set-row">${row('volume_up', 'Sound effects', 'Soft glass and thock sounds', toggle('sound', prefs.sound))}</label>
                <div class="set-row vol-row"${prefs.sound ? '' : ' hidden'} data-vol-row><span class="ms" data-vol-icon>${volumeIcon(prefs.volume)}</span><span class="label"><strong>Volume</strong><small data-vol-label>${prefs.volume}%</small></span><input type="range" class="vol" min="0" max="100" step="5" value="${prefs.volume}" aria-label="Sound volume" data-vol style="--v:${prefs.volume}%"></div>
                ${'vibrate' in navigator ? `<label class="set-row">${row('vibration', 'Vibration', 'Light buzz on taps (Android)', toggle('haptics', prefs.haptics))}</label>` : ''}
            </div>
            <div class="set-group">
                <h3>Opening PDF notes</h3>
                <div class="seg full" role="group" aria-label="PDF reader">
                    ${seg('reader', useBuiltInReader() ? 'builtin' : 'native', [['builtin', 'chrome_reader_mode', 'Built-in reader'], ['native', 'picture_as_pdf', 'Browser viewer']])}
                </div>
                <p style="font-size:.8rem;color:var(--muted);margin-top:8px">The built-in reader works on every phone, remembers your page and opens saved notes offline. The browser viewer uses your browser's own PDF tools.</p>
            </div>
            <div class="set-group">
                <h3>Offline & app</h3>
                <div class="set-row"><span class="ms">offline_pin</span><span class="label"><strong>Notes saved offline</strong><small data-offline-usage>Checking…</small></span><button type="button" class="btn btn-sm" data-clear-offline hidden>Clear</button></div>
                <div class="set-row">${installRow(row)}</div>
            </div>
            <div class="set-group">
                <a class="set-row" href="${TELEGRAM_URL}" target="_blank" rel="noopener noreferrer">${row('send', 'Telegram community', 'Updates and doubt help', '<span class="ms">open_in_new</span>')}</a>
                <button type="button" class="set-row" data-reset-lib>${row('restart_alt', 'Clear history & progress', 'Recent, saved, done and reading positions on this device')}</button>
                <button type="button" class="set-row" data-action="lock">${row('lock', 'Lock website', 'Asks for the passcode again')}</button>
            </div>
            <p style="font-size:.75rem;color:var(--faint);text-align:center;padding-top:6px">Ilberiz Techz · version ${APP_VERSION}</p>`;
        onEach(body, '[data-theme-pref]', (b) => { setThemePref(b.dataset.themePref); pressOnly(body, '[data-theme-pref]', b); });
        onEach(body, '[data-accent]', (b) => { setAccent(b.dataset.accent); pressOnly(body, '[data-accent]', b); sfx.play('save'); });
        onEach(body, '[data-reader]', (b) => { setReaderPref(b.dataset.reader); pressOnly(body, '[data-reader]', b); });
        onEach(body, '[data-install]', doInstall);
        onEach(body, '[data-pref]', (inp) => {
            if (inp.dataset.pref === 'sound') { setSound(inp.checked); q('[data-vol-row]').hidden = !inp.checked; }
            else { prefs.haptics = inp.checked; lsSet('ilberiz_haptics', inp.checked ? 'on' : 'off'); haptic(20); }
        }, 'change');
        const vol = q('[data-vol]');
        let volTimer = 0;
        vol.addEventListener('input', () => {
            const v = +vol.value;
            prefs.volume = v;
            vol.style.setProperty('--v', v + '%');
            q('[data-vol-label]').textContent = v + '%';
            q('[data-vol-icon]').textContent = volumeIcon(v);
            sfx.setVolume(v);
            clearTimeout(volTimer);
            volTimer = setTimeout(() => { lsSet('ilberiz_volume', String(v)); sfx.play('tap'); }, 140);
        });        onEach(body, '[data-reset-lib]', () => {
            if (!window.confirm('Clear recent, saved, done and reading positions on this device?')) return;
            lib.clear();
            toast('History and progress cleared', { icon: 'restart_alt' });
            dismissOverlay(() => { state.rendered = null; route(); renderSidebar(); });
        });

        // offline usage
        const usage = q('[data-offline-usage]');
        const clearBtn = q('[data-clear-offline]');
        offlineUsage().then((u) => {
            if (!u) { usage.textContent = location.protocol === 'file:' ? 'Available when the site is opened online' : 'Not supported in this browser'; return; }
            usage.textContent = u.count ? `${plural(u.count, 'note')} · ${formatMB(u.bytes)}` : NO_OFFLINE;
            clearBtn.hidden = !u.count;
        });
        clearBtn.addEventListener('click', async () => {
            try { await caches.delete(NOTES_CACHE); } catch (e) {}
            offlineSet = new Set();
            usage.textContent = NO_OFFLINE;
            clearBtn.hidden = true;
            toast('Offline notes cleared', { icon: 'delete' });
        });
    });
}

function installRow(row) {
    if (isStandalone()) return row('install_mobile', 'App installed', 'You are using the installed app');
    if (installPrompt) return row('install_mobile', 'Install as an app', 'Home-screen icon, opens full screen', '<button type="button" class="btn btn-primary btn-sm" data-install>Install</button>');
    if (isIOS()) return row('ios_share', 'Install on iPhone or iPad', 'In Safari tap Share, then “Add to Home Screen”');
    return row('install_mobile', 'Install as an app', 'Open the browser menu and choose “Install app” or “Add to Home screen”');
}
async function doInstall() {
    if (!installPrompt) return;
    const p = installPrompt;
    installPrompt = null;
    try {
        p.prompt();
        const choice = await p.userChoice;
        if (choice.outcome === 'accepted') { toast('Installing Ilberiz Techz', { icon: 'install_mobile' }); sfx.play('success'); }
    } catch (e) {}
    removeInstallBanner();
}
const removeInstallBanner = () => $$('[data-install-banner]').forEach((b) => b.remove());
function renderInstallBanner(slot) {
    if (!slot || !installPrompt || isStandalone() || lsGet('ilberiz_install_dismissed') === '1') return;
    const b = h(`<div class="panel install-banner" data-install-banner>
        <span class="ms">install_mobile</span>
        <div><strong>Install the app</strong><small>One tap from your home screen, works offline for opened notes</small></div>
        <button type="button" class="btn btn-primary btn-sm" data-install>Install</button>
        <button type="button" class="icon-btn" data-dismiss aria-label="Not now"><span class="ms">close</span></button>
    </div>`);
    b.querySelector('[data-install]').addEventListener('click', doInstall);
    b.querySelector('[data-dismiss]').addEventListener('click', () => { lsSet('ilberiz_install_dismissed', '1'); b.remove(); });
    slot.appendChild(b);
}

/* --------------------------------------------------------------------------
   12. Offline notes bookkeeping
   -------------------------------------------------------------------------- */
const NOTES_CACHE = 'ilb-notes-v1';   // same name in sw.js
let offlineSet = new Set();
async function loadOfflineSet() {
    if (!('caches' in window)) return;
    try {
        const cache = await caches.open(NOTES_CACHE);
        offlineSet = new Set((await cache.keys()).map((k) => bareURL(k.url)));
        markOffline(document);
    } catch (e) {}
}
function markOffline(root) {
    if (!offlineSet.size) return;
    $$('[data-offline-file]', root).forEach((el) => { el.hidden = !offlineSet.has(el.dataset.offlineFile); });
}
async function offlineUsage() {
    if (!('caches' in window) || location.protocol === 'file:') return null;
    try {
        const cache = await caches.open(NOTES_CACHE);
        const keys = await cache.keys();
        let bytes = 0;
        await Promise.all(keys.map(async (k) => {
            const r = await cache.match(k);
            const len = r && Number(r.headers.get('content-length'));
            if (len) bytes += len;
        }));
        return { count: keys.length, bytes };
    } catch (e) { return null; }
}

/* --------------------------------------------------------------------------
   13. Readers: PDF (built-in or browser viewer), DPP engines, video
   -------------------------------------------------------------------------- */
const pdfEntries = (node) => (node.items || []).filter((it) => itemKind(it) === 'pdf').map((it) => itemIdx.get(it.id));
const notesInContainer = (entry) => pdfEntries(entry.container);
const noteIndex = (entry, list) => list.findIndex((x) => x.item.id === entry.item.id);
function notesInSubject(subject) {
    const groups = [];
    const add = (node, lbl) => { const list = pdfEntries(node); if (list.length) groups.push({ label: fullLabel(lbl), list }); };
    subject.chapters.forEach((ch) => {
        add(ch, chapterLabel(ch.name));
        (ch.subchapters || []).forEach((sc) => add(sc, chapterLabel(sc.name, ch.name)));
    });
    return groups;
}
// shared pieces of the reader bars
const iconBtn = (id, icon, label, cls = '') => `<button type="button" class="icon-btn${cls && ' ' + cls}" data-r="${id}" aria-label="${label}"><span class="ms">${icon}</span></button>`;
const SAVE_BTN = iconBtn('save', 'bookmark_add', 'Save to Library', 'star wide-only');
const DONE_BTN = '<button type="button" class="btn btn-sm wide-only" data-r="done" aria-pressed="false"><span class="ms">check_circle</span><span data-lbl>Mark done</span></button>';
const readerTitle = (title = '', ctx = '') => `<div class="reader-title"><strong data-r="title">${title}</strong><small data-r="ctx">${ctx}</small></div>`;
const docTitle = (entry) => { document.title = `${entry.item.title} | Ilberiz Techz`; };
const escToClose = (e) => { if (!overlay && e.key === 'Escape') { e.preventDefault(); closeReaderNav(); } };

function openReader(entry) {
    if (reader) closeReader(true);
    lib.touch(entry.item.id);
    document.body.classList.add('no-scroll');
    const open = { pdf: useBuiltInReader() ? builtInReader : browserPdfReader, dpp: engineViewer, video: videoViewer }[itemKind(entry.item)];
    const { el, cleanup } = open(entry);
    overlayRoot().appendChild(el);
    reader = { id: entry.item.id, el, cleanup, entry };
    docTitle(entry);
}
function closeReader(immediate = false) {
    if (!reader) return;
    const r = reader;
    reader = null;
    try { r.cleanup(); } catch (e) {}
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    if (immediate || reducedMotion()) r.el.remove();
    else { r.el.classList.add('out'); setTimeout(() => r.el.remove(), 160); }
    if (!overlay) document.body.classList.remove('no-scroll');
}
function toChapter(entry) {
    sfx.play('back');
    go(containerHref(entry), { replace: true });
}
function closeReaderNav() {
    sfx.play('back');
    goBack(reader ? containerHref(reader.entry) : '#/');
}
function setReaderItem(entry) {
    // switch note inside an open reader without adding history entries
    history.replaceState({ ilb: depth() }, '', `#/read/${entry.item.id}`);
    if (reader) { reader.id = entry.item.id; reader.entry = entry; }
    lib.touch(entry.item.id);
    docTitle(entry);
}

function setDone(entry, btn, on) {
    lib.setDone(entry.item.id, on);
    if (btn) syncDoneBtn(btn, on);
}
function toggleDone(entry, btn) {
    const on = !lib.isDone(entry.item.id);
    setDone(entry, btn, on);
    if (on) { sfx.play('success'); haptic([12, 40, 12]); toast('Marked as done', { icon: 'task_alt', action: { label: 'Undo', fn: () => setDone(entry, btn, false) } }); }
    else { sfx.play('off'); toast('Marked as not done', { icon: 'radio_button_unchecked' }); }
}
function syncToggle(btn, on, icon, label) {
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', String(on));
    labelIcon(btn, icon, label);
}
function syncDoneBtn(btn, on) {
    syncToggle(btn, on, on ? 'task_alt' : 'check_circle', on ? 'Mark as not done' : 'Mark as done');
    $('.ms', btn).classList.toggle('fill', on);
    $('[data-lbl]', btn).textContent = on ? 'Done' : 'Mark done';
}
function syncSaveBtn(btn, on) {
    syncToggle(btn, on, on ? 'bookmark' : 'bookmark_add', on ? 'Remove from Library' : 'Save to Library');
}
function toggleSave(id, btn) {
    const on = lib.toggleSave(id);
    if (btn) syncSaveBtn(btn, on);
    $$(`[data-star="${id}"]`).forEach((b) => syncSaveBtn(b, on));
    sfx.play(on ? 'save' : 'off');
    haptic(on ? [8, 30, 8] : 6);
    toast(on ? 'Saved to Library' : 'Removed from Library', { icon: on ? 'bookmark' : 'bookmark_remove' });
    syncLibCount();
}
function openContents(entry, onPick) {
    openSheet('contents', `${entry.subject.name} notes`, (body) => {
        body.innerHTML = notesInSubject(entry.subject).map((g) => `
            <div class="toc-chapter">${esc(g.label)}</div>
            ${g.list.map((e) => `<button type="button" class="toc-item${e.item.id === entry.item.id ? ' current' : ''}" data-id="${e.item.id}"><span class="ms">${lib.isDone(e.item.id) ? 'task_alt' : 'description'}</span><span>${esc(itemParts(e.item).title)}${e.item.subtitle ? `<br><small style="white-space:normal;font-weight:500">${esc(truncate(e.item.subtitle, 90))}</small>` : ''}</span><small>${esc(e.item.size || '')}</small></button>`).join('')}`).join('');
        onEach(body, '[data-id]', (b) => dismissOverlay(() => onPick(itemIdx.get(b.dataset.id))));
        requestAnimationFrame(() => $('.current', body).scrollIntoView({ block: 'center' }));
    });
}

function openReaderMenu(entry, { contents, doneBtn, saveBtn }) {
    openSheet('reader-menu', 'Note options', (body) => {
        const { item } = entry;
        const saved = lib.isSaved(item.id);
        const done = lib.isDone(item.id);
        const isPdf = itemKind(item) === 'pdf';
        const btn = (id, icon, label, on) => `<button type="button" class="menu-item${on ? ' on' : ''}" data-m="${id}"><span class="ms">${icon}</span>${label}</button>`;
        const link = (id, icon, label, attrs) => `<a class="menu-item" data-m="${id}" href="${esc(item.file)}" ${attrs}><span class="ms">${icon}</span>${label}</a>`;
        body.innerHTML = [
            contents && btn('contents', 'format_list_bulleted', `All notes in ${esc(entry.subject.name)}`),
            btn('done', 'task_alt', done ? 'Marked as done' : 'Mark as done', done),
            btn('save', 'bookmark', saved ? 'Saved in Library' : 'Save to Library', saved),
            link('ext', 'open_in_new', isPdf ? "Open in your phone's PDF viewer" : 'Open in a new tab', 'target="_blank" rel="noopener noreferrer"'),
            isPdf && link('dl', 'download', `Download PDF${item.size ? ` (${esc(item.size)})` : ''}`, `download="${esc(item.title)}.pdf"`),
            isPdf && btn('mode', 'swap_horiz', useBuiltInReader() ? "Always use the browser's PDF viewer" : 'Always use the built-in reader'),
            btn('chapter', 'arrow_back', 'Back to chapter')
        ].filter(Boolean).join('');
        const actions = {
            contents,
            done: () => toggleDone(entry, doneBtn),
            save: () => toggleSave(item.id, saveBtn),
            mode: () => { const e2 = reader && reader.entry; if (e2) { closeReader(true); openReader(e2); } },
            chapter: () => toChapter(entry)
        };
        body.addEventListener('click', (e) => {
            const b = e.target.closest('[data-m]');
            if (!b) return;
            const m = b.dataset.m;
            if (m === 'mode') setReaderPref(useBuiltInReader() ? 'native' : 'builtin');
            if (actions[m]) dismissOverlay(actions[m]);
            else setTimeout(() => dismissOverlay(), 50);   // links: let the click through first
        });
    });
}

/* ----- Browser PDF viewer (laptops): native iframe with thin bar ----- */
function browserPdfReader(entry) {
    let cur = entry;
    const frames = new Map();
    const el = h(`
        <div class="reader" role="dialog" aria-modal="true" aria-label="Notes reader" data-subject="${entry.subject.id}">
            <div class="reader-bar">
                ${iconBtn('back', 'arrow_back', 'Close notes')}
                ${readerTitle()}
                <div class="note-steps" data-r="steps">
                    ${iconBtn('prev', 'chevron_left', 'Previous note ([)')}
                    <span class="label" data-r="pos"></span>
                    ${iconBtn('next', 'chevron_right', 'Next note (])')}
                </div>
                ${iconBtn('toc', 'format_list_bulleted', 'All notes in this subject')}
                ${SAVE_BTN}${DONE_BTN}
                <span class="sep wide-only"></span>
                <a class="icon-btn wide-only" data-r="ext" target="_blank" rel="noopener noreferrer" aria-label="Open in new tab"><span class="ms">open_in_new</span></a>
                <a class="icon-btn wide-only" data-r="dl" aria-label="Download PDF"><span class="ms">download</span></a>
                ${iconBtn('fs', 'fullscreen', 'Full screen (F)', 'wide-only')}
                ${iconBtn('more', 'more_vert', 'More options')}
            </div>
            <div class="reader-body" data-r="body"></div>
        </div>`);
    const q = (n) => $(`[data-r="${n}"]`, el);
    const doneBtn = q('done');
    const saveBtn = q('save');
    if (isWide()) q('more').style.display = 'none';

    function show(e) {
        cur = e;
        const list = notesInContainer(e);
        const i = noteIndex(e, list);
        q('title').textContent = e.item.title;
        q('ctx').textContent = contextLine(e);
        q('steps').hidden = list.length < 2;
        q('pos').textContent = `${i + 1} / ${list.length}`;
        q('prev').disabled = i <= 0;
        q('next').disabled = i < 0 || i >= list.length - 1;
        q('ext').href = q('dl').href = e.item.file;
        q('dl').download = `${e.item.title}.pdf`;
        syncDoneBtn(doneBtn, lib.isDone(e.item.id));
        syncSaveBtn(saveBtn, lib.isSaved(e.item.id));
        let f = frames.get(e.item.id);
        if (!f) {
            f = document.createElement('iframe');
            f.className = 'reader-frame';
            f.title = e.item.title;
            f.setAttribute('allow', 'fullscreen');
            const pos = lib.getPos(e.item.id);
            f.src = `${e.item.file}#${pos && pos.page > 1 ? `page=${pos.page}&` : ''}view=Fit`;
            q('body').appendChild(f);
            frames.set(e.item.id, f);
            if (frames.size > 5) {
                const oldest = frames.keys().next().value;
                if (oldest !== e.item.id) { frames.get(oldest).remove(); frames.delete(oldest); }
            }
        }
        frames.forEach((fr, id) => fr.classList.toggle('hidden', id !== e.item.id));
        if (e !== entry || reader) setReaderItem(e);
    }
    const pick = (t) => { sfx.play('page'); show(t); };
    function step(d) {
        const list = notesInContainer(cur);
        const t = list[noteIndex(cur, list) + d];
        if (t) pick(t);
    }
    async function toggleFs() {
        try {
            if (document.fullscreenElement) await document.exitFullscreen();
            else if (el.requestFullscreen) await el.requestFullscreen();
        } catch (e) {}
    }
    function onFsChange() {
        const on = document.fullscreenElement === el;
        labelIcon(q('fs'), on ? 'fullscreen_exit' : 'fullscreen', on ? 'Exit full screen (F)' : 'Full screen (F)');
    }
    function onKey(e) {
        if (overlay) return;
        const tag = e.target && e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        if (e.key === '[' || (e.altKey && e.key === 'ArrowLeft')) { e.preventDefault(); step(-1); }
        else if (e.key === ']' || (e.altKey && e.key === 'ArrowRight')) { e.preventDefault(); step(1); }
        else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFs(); }
        else if (e.key === 'Escape' && !document.fullscreenElement) { e.preventDefault(); closeReaderNav(); }
    }
    // take key focus back from the PDF iframe so the shortcuts keep working
    ['pointerenter', 'pointerdown'].forEach((t) => $('.reader-bar', el).addEventListener(t, () => window.focus(), { passive: true }));

    q('back').addEventListener('click', closeReaderNav);
    q('prev').addEventListener('click', () => step(-1));
    q('next').addEventListener('click', () => step(1));
    q('toc').addEventListener('click', () => openContents(cur, pick));
    doneBtn.addEventListener('click', () => toggleDone(cur, doneBtn));
    saveBtn.addEventListener('click', () => toggleSave(cur.item.id, saveBtn));
    q('fs').addEventListener('click', toggleFs);
    q('more').addEventListener('click', () => openReaderMenu(cur, { doneBtn, saveBtn, contents: () => openContents(cur, show) }));
    window.addEventListener('keydown', onKey, true);
    document.addEventListener('fullscreenchange', onFsChange);
    show(entry);
    return {
        el,
        cleanup() {
            window.removeEventListener('keydown', onKey, true);
            document.removeEventListener('fullscreenchange', onFsChange);
        }
    };
}

/* ----- Built-in reader (phones): PDF.js, full screen, pinch zoom, resume ----- */
let pdfjsPromise = null;
function loadPdfJs() {
    if (!pdfjsPromise) {
        pdfjsPromise = new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'vendor/pdfjs/pdf.min.js';
            s.onload = () => {
                if (!window.pdfjsLib) { reject(new Error('PDF engine missing')); return; }
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdfjs/pdf.worker.min.js';
                resolve(window.pdfjsLib);
            };
            s.onerror = () => { pdfjsPromise = null; reject(new Error('PDF engine failed to load')); };
            document.head.appendChild(s);
        });
    }
    return pdfjsPromise;
}
async function fetchWithProgress(url, onProgress, signal) {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const total = Number(res.headers.get('content-length')) || 0;
    if (!res.body || !res.body.getReader) {
        const buf = new Uint8Array(await res.arrayBuffer());
        onProgress(buf.length, buf.length);
        return buf;
    }
    const rd = res.body.getReader();
    const chunks = [];
    let got = 0;
    for (;;) {
        const { done, value } = await rd.read();
        if (done) break;
        chunks.push(value);
        got += value.length;
        onProgress(got, total);
    }
    const out = new Uint8Array(got);
    let o = 0;
    chunks.forEach((c) => { out.set(c, o); o += c.length; });
    return out;
}

function builtInReader(entry) {
    let cur = entry;
    let doc = null;
    let pages = [];          // { el, n, w, h, canvas, task, renderedW }
    let zoom = 1;
    let current = 1;
    let destroyed = false;
    let abort = null;
    let io = null;
    let saveTimer = null;
    let pillTimer = null;
    let lastScroll = 0;
    let quietScroll = 0;   // ignore bar auto-hide for programmatic scrolls

    const el = h(`
        <div class="reader pr" role="dialog" aria-modal="true" aria-label="Notes reader" data-subject="${entry.subject.id}">
            <div class="reader-bar">
                ${iconBtn('back', 'arrow_back', 'Close notes')}
                ${readerTitle()}
                ${iconBtn('toc', 'format_list_bulleted', 'All notes in this subject')}
                ${SAVE_BTN}
                ${iconBtn('more', 'more_vert', 'More options')}
            </div>
            <div class="reader-body">
                <div class="pr-scroll" data-r="scroll"><div class="pr-pages" data-r="pages"></div></div>
                <div class="pr-loading" data-r="loading"></div>
                <div class="pr-pill" data-r="pill" aria-live="polite"></div>
                <div class="pr-zoom" data-r="zoom" hidden>
                    <button type="button" data-z="in" aria-label="Zoom in"><span class="ms">add</span></button>
                    <button type="button" data-z="out" aria-label="Zoom out"><span class="ms">remove</span></button>
                </div>
            </div>
        </div>`);
    const q = (n) => $(`[data-r="${n}"]`, el);
    const scroller = q('scroll');
    const pagesEl = q('pages');
    const loading = q('loading');
    const pill = q('pill');
    const saveBtn = q('save');

    function syncZoomBtns() { q('zoom').hidden = zoom === 1 && !isWide(); }
    function setBars(show) { el.classList.toggle('bars-hidden', !show); }
    function showPill() {
        if (!doc) return;
        pill.textContent = `${current} / ${doc.numPages}`;
        pill.classList.add('show');
        clearTimeout(pillTimer);
        pillTimer = setTimeout(() => pill.classList.remove('show'), 1200);
    }
    function headerText() {
        q('title').textContent = itemParts(cur.item).title;
        q('ctx').textContent = doc ? `${contextLine(cur)} · Page ${current} of ${doc.numPages}` : contextLine(cur);
        syncSaveBtn(saveBtn, lib.isSaved(cur.item.id));
    }

    function loadingCard(html) { loading.hidden = false; loading.innerHTML = `<div class="pr-loading-card">${html}</div>`; }
    function showError(msg) {
        const offline = !navigator.onLine;
        loadingCard(`
            <span class="ms">${offline ? 'cloud_off' : 'error'}</span>
            <strong>${offline ? 'This note is not saved on this device yet' : 'The note could not be opened'}</strong>
            <small>${offline ? 'Connect to the internet once and open it — after that it works offline.' : esc(msg)}</small>
            <div class="actions">
                <button type="button" class="btn btn-primary btn-sm" data-retry><span class="ms">refresh</span>Try again</button>
                <a class="btn btn-sm" href="${esc(cur.item.file)}" target="_blank" rel="noopener noreferrer"><span class="ms">open_in_new</span>Open in phone viewer</a>
            </div>`);
        loading.querySelector('[data-retry]').addEventListener('click', () => load(cur));
    }

    async function load(e) {
        cur = e;
        teardownDoc();
        headerText();
        pagesEl.innerHTML = '';
        loadingCard(`<span class="ms">description</span><strong>Opening notes</strong><span class="bar"><i style="--w:4%"></i></span><small data-prog>${esc(e.item.size || '')}</small>`);
        const barI = loading.querySelector('.bar > i');
        const prog = loading.querySelector('[data-prog]');
        abort = new AbortController();
        try {
            const [pdfjs, data] = await Promise.all([
                loadPdfJs(),
                fetchWithProgress(e.item.file, (got, total) => {
                    if (destroyed) return;
                    if (total) {
                        barI.style.setProperty('--w', `${Math.max(4, Math.round((got / total) * 100))}%`);
                        prog.textContent = `${formatMB(got)} of ${formatMB(total)}`;
                    } else prog.textContent = `${formatMB(got)} loaded`;
                }, abort.signal)
            ]);
            if (destroyed || cur !== e) return;
            doc = await pdfjs.getDocument({ data, isEvalSupported: false }).promise;
            if (destroyed || cur !== e) { doc.destroy(); return; }
            offlineSet.add(fileURL(e.item.file));
            await buildPages(e);
        } catch (err) {
            if (destroyed || (err && err.name === 'AbortError')) return;
            showError(err && err.message ? err.message : 'Unknown error');
        }
    }

    async function buildPages(e) {
        const first = await doc.getPage(1);
        const vp = first.getViewport({ scale: 1 });
        const frag = document.createDocumentFragment();
        pages = [];
        for (let n = 1; n <= doc.numPages; n++) {
            const p = document.createElement('div');
            p.className = 'pr-page';
            p.style.aspectRatio = `${vp.width} / ${vp.height}`;
            p.dataset.n = n;
            p.innerHTML = `<span class="pn">${n}</span>`;
            frag.appendChild(p);
            pages.push({ el: p, n, canvas: null, task: null, renderedW: 0, near: false });
        }
        const list = notesInContainer(e);
        const next = list[noteIndex(e, list) + 1];
        const done = lib.isDone(e.item.id);
        const end = h(`<div class="pr-end">
            <span class="ms" style="font-size:32px;color:var(--accent-text)">${done ? 'task_alt' : 'flag'}</span>
            <h3>End of ${esc(itemParts(e.item).title)}</h3>
            <p>${next ? `Next up: ${esc(itemParts(next.item).title)}${next.item.subtitle ? ' — ' + esc(truncate(next.item.subtitle, 80)) : ''}` : 'That was the last note in this chapter.'}</p>
            <div class="actions">
                <button type="button" class="btn${done ? '' : ' btn-primary'}" data-end="done"><span class="ms">task_alt</span>${done ? 'Done' : 'Mark as done'}</button>
                ${next ? `<button type="button" class="btn btn-primary" data-end="next"><span class="ms">skip_next</span>Next note</button>` : `<button type="button" class="btn" data-end="chapter"><span class="ms">arrow_back</span>Back to chapter</button>`}
            </div></div>`);
        end.addEventListener('click', (ev) => {
            const b = ev.target.closest('[data-end]');
            if (!b) return;
            if (b.dataset.end === 'done') {
                if (!lib.isDone(cur.item.id)) toggleDone(cur, null);
                b.classList.remove('btn-primary');
                b.innerHTML = '<span class="ms">task_alt</span>Done';
            } else if (b.dataset.end === 'next') { sfx.play('page'); switchTo(next); }
            else toChapter(cur);
        });
        frag.appendChild(end);
        pagesEl.appendChild(frag);
        loading.hidden = true;
        loading.innerHTML = '';
        syncZoomBtns();

        io = new IntersectionObserver((ents) => {
            ents.forEach((en) => {
                const pg = pages[Number(en.target.dataset.n) - 1];
                if (!pg) return;
                pg.near = en.isIntersecting;
                if (en.isIntersecting) renderPage(pg); else releasePage(pg);
            });
        }, { root: scroller, rootMargin: '150% 0px' });
        pages.forEach((pg) => io.observe(pg.el));

        // resume
        const pos = lib.getPos(e.item.id);
        current = 1;
        if (pos && pos.page > 1 && pos.page <= doc.numPages) {
            const target = pages[pos.page - 1].el;
            requestAnimationFrame(() => {
                quietScroll = performance.now() + 400;
                scroller.scrollTop = target.offsetTop - 56;
                current = pos.page;
                headerText();
                toast(`Opened at page ${pos.page}`, { icon: 'bookmark', action: { label: 'Start over', fn: () => { scroller.scrollTop = 0; } } });
            });
        } else {
            scroller.scrollTop = 0;
        }
        headerText();
    }

    async function renderPage(pg) {
        if (!doc || destroyed) return;
        const cssW = pg.el.clientWidth;
        if (!cssW) return;
        if (pg.canvas && Math.abs(pg.renderedW - cssW) / cssW < 0.15) return;
        cancelTask(pg);
        try {
            const page = await doc.getPage(pg.n);
            if (destroyed || !pg.near) return;
            const base = page.getViewport({ scale: 1 });
            pg.el.style.aspectRatio = `${base.width} / ${base.height}`;
            const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
            let scale = (cssW / base.width) * dpr;
            const maxPx = 7.5e6;
            if (base.width * base.height * scale * scale > maxPx) scale = Math.sqrt(maxPx / (base.width * base.height));
            const vp = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            canvas.width = Math.floor(vp.width);
            canvas.height = Math.floor(vp.height);
            const ctx = canvas.getContext('2d', { alpha: false });
            const task = page.render({ canvasContext: ctx, viewport: vp });
            pg.task = task;
            await task.promise;
            pg.task = null;
            if (destroyed || !pg.near) { canvas.width = 0; canvas.height = 0; return; }
            if (pg.canvas) { pg.canvas.width = 0; pg.canvas.remove(); }
            pg.canvas = canvas;
            pg.renderedW = cssW;
            pg.el.insertBefore(canvas, pg.el.firstChild);
        } catch (e) { pg.task = null; }
    }
    function cancelTask(pg) { if (pg.task) { pg.task.cancel(); pg.task = null; } }
    function releasePage(pg) {
        cancelTask(pg);
        if (pg.canvas) { pg.canvas.width = 0; pg.canvas.height = 0; pg.canvas.remove(); pg.canvas = null; pg.renderedW = 0; }
    }
    function rerenderVisible() { pages.forEach((pg) => { if (pg.near) renderPage(pg); }); }

    function updateCurrent() {
        if (!pages.length) return;
        const mid = scroller.scrollTop + Math.min(160, scroller.clientHeight * 0.25);
        let lo = 0; let hi = pages.length - 1; let ans = 0;
        while (lo <= hi) {
            const m = (lo + hi) >> 1;
            if (pages[m].el.offsetTop <= mid) { ans = m; lo = m + 1; } else hi = m - 1;
        }
        const n = ans + 1;
        if (n !== current) {
            current = n;
            headerText();
            clearTimeout(saveTimer);
            const id = cur.item.id; const total = doc.numPages;
            saveTimer = setTimeout(() => lib.setPos(id, n, total), 500);
        }
    }

    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            ticking = false;
            const y = scroller.scrollTop;
            const dy = y - lastScroll;
            if (performance.now() < quietScroll) { lastScroll = y; updateCurrent(); return; }
            if (Math.abs(dy) > 6) {
                if (dy > 0 && y > 120) setBars(false);
                else if (dy < 0) setBars(true);
                lastScroll = y;
            }
            updateCurrent();
            showPill();
        });
    }

    // ---- pinch zoom, double tap, tap to toggle bars ----
    let pinch = null;
    let tapInfo = null;
    let lastTap = 0;
    function applyZoom(newZoom, fx, fy) {
        // fx, fy: focal point in scroller viewport coordinates
        newZoom = clamp(newZoom, 1, 4);
        const k = newZoom / zoom;
        if (Math.abs(k - 1) < 0.01) return;
        const cx = scroller.scrollLeft + fx;
        const cy = scroller.scrollTop + fy;
        zoom = newZoom;
        quietScroll = performance.now() + 300;
        pagesEl.style.width = `${zoom * 100}%`;
        scroller.scrollLeft = cx * k - fx;
        scroller.scrollTop = cy * k - fy;
        syncZoomBtns();
        clearTimeout(applyZoom.t);
        applyZoom.t = setTimeout(rerenderVisible, 160);
    }
    const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    scroller.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            const rect = scroller.getBoundingClientRect();
            const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
            const my = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
            pinch = { d0: dist(e.touches), z0: zoom, mx, my, k: 1, ox: scroller.scrollLeft + mx, oy: scroller.scrollTop + my };
            pagesEl.style.transformOrigin = `${pinch.ox}px ${pinch.oy}px`;
            tapInfo = null;
        } else if (e.touches.length === 1 && !e.target.closest('.pr-end')) {
            tapInfo = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
        }
    }, { passive: true });
    scroller.addEventListener('touchmove', (e) => {
        if (pinch && e.touches.length === 2) {
            e.preventDefault();
            const target = clamp(pinch.z0 * (dist(e.touches) / pinch.d0), 1, 4);
            pinch.k = target / pinch.z0;
            pagesEl.style.transform = `scale(${pinch.k})`;
        } else if (tapInfo && e.touches.length === 1) {
            if (Math.hypot(e.touches[0].clientX - tapInfo.x, e.touches[0].clientY - tapInfo.y) > 10) tapInfo = null;
        }
    }, { passive: false });
    scroller.addEventListener('touchend', (e) => {
        if (pinch && e.touches.length < 2) {
            const p = pinch;
            pinch = null;
            pagesEl.style.transform = '';
            pagesEl.style.transformOrigin = '';
            applyZoom(p.z0 * p.k, p.mx, p.my);
            return;
        }
        if (tapInfo && e.touches.length === 0 && Date.now() - tapInfo.t < 300) {
            const now = Date.now();
            const rect = scroller.getBoundingClientRect();
            const fx = tapInfo.x - rect.left;
            const fy = tapInfo.y - rect.top;
            if (now - lastTap < 300) {
                lastTap = 0;
                clearTimeout(onTapToggle.t);
                applyZoom(zoom > 1.05 ? 1 : 2.2, fx, fy);
                haptic(6);
            } else {
                lastTap = now;
                clearTimeout(onTapToggle.t);
                onTapToggle.t = setTimeout(onTapToggle, 280);
            }
        }
        tapInfo = null;
    });
    function onTapToggle() { setBars(el.classList.contains('bars-hidden')); }
    // desktop: ctrl + wheel zoom
    scroller.addEventListener('wheel', (e) => {
        if (!e.ctrlKey) return;
        e.preventDefault();
        const rect = scroller.getBoundingClientRect();
        applyZoom(zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX - rect.left, e.clientY - rect.top);
    }, { passive: false });
    q('zoom').addEventListener('click', (e) => {
        const b = e.target.closest('[data-z]');
        if (!b) return;
        applyZoom(zoom * (b.dataset.z === 'in' ? 1.35 : 1 / 1.35), scroller.clientWidth / 2, scroller.clientHeight / 2);
    });

    function switchTo(e) {
        setReaderItem(e);
        zoom = 1;
        pagesEl.style.width = '';
        load(e);
    }
    function teardownDoc() {
        clearTimeout(saveTimer);
        if (io) { io.disconnect(); io = null; }
        pages.forEach(releasePage);
        pages = [];
        if (abort) { abort.abort(); abort = null; }
        if (doc) { doc.destroy(); doc = null; }
    }
    let lastW = window.innerWidth;
    function onResize() {
        if (Math.abs(window.innerWidth - lastW) < 40) return;
        lastW = window.innerWidth;
        clearTimeout(onResize.t);
        onResize.t = setTimeout(rerenderVisible, 200);
    }

    scroller.addEventListener('scroll', onScroll, { passive: true });
    q('back').addEventListener('click', closeReaderNav);
    const pick = (t, sound) => { if (t.item.id === cur.item.id) return; if (sound) sfx.play('page'); switchTo(t); };
    q('toc').addEventListener('click', () => openContents(cur, (t) => pick(t, true)));
    saveBtn.addEventListener('click', () => toggleSave(cur.item.id, saveBtn));
    q('more').addEventListener('click', () => openReaderMenu(cur, { saveBtn, contents: () => openContents(cur, pick) }));
    window.addEventListener('keydown', escToClose);
    window.addEventListener('resize', onResize);
    load(entry);
    return {
        el,
        cleanup() {
            destroyed = true;
            if (doc) lib.setPos(cur.item.id, current, doc.numPages);
            teardownDoc();
            clearTimeout(pillTimer);
            window.removeEventListener('keydown', escToClose);
            window.removeEventListener('resize', onResize);
        }
    };
}

/* ----- DPP engine viewer ----- */
function engineViewer(entry) {
    const { item } = entry;
    const el = h(`
        <div class="reader" role="dialog" aria-modal="true" aria-label="Practice" data-subject="${entry.subject.id}">
            <div class="reader-bar">
                ${iconBtn('back', 'arrow_back', 'Close practice')}
                ${readerTitle(esc(itemParts(item).title), esc(contextLine(entry) + (item.badge ? ' · ' + item.badge : '')))}
                ${SAVE_BTN}${DONE_BTN}
                ${iconBtn('reload', 'refresh', 'Restart', 'wide-only')}
                <a class="icon-btn wide-only" href="${esc(item.file)}" target="_blank" rel="noopener noreferrer" aria-label="Open in new tab"><span class="ms">open_in_new</span></a>
                ${iconBtn('more', 'more_vert', 'More options')}
            </div>
            <div class="reader-body"><iframe class="reader-frame" title="${esc(item.title)}" allow="fullscreen" src="${esc(item.file)}"></iframe></div>
        </div>`);
    const q = (n) => $(`[data-r="${n}"]`, el);
    const doneBtn = q('done');
    const saveBtn = q('save');
    syncDoneBtn(doneBtn, lib.isDone(item.id));
    syncSaveBtn(saveBtn, lib.isSaved(item.id));
    if (isWide()) q('more').style.display = 'none';
    q('back').addEventListener('click', closeReaderNav);
    doneBtn.addEventListener('click', () => toggleDone(entry, doneBtn));
    saveBtn.addEventListener('click', () => toggleSave(item.id, saveBtn));
    q('reload').addEventListener('click', () => { $('iframe', el).src = item.file; });
    q('more').addEventListener('click', () => openReaderMenu(entry, { doneBtn, saveBtn }));
    window.addEventListener('keydown', escToClose);
    return { el, cleanup() { window.removeEventListener('keydown', escToClose); } };
}

/* ----- Telegram video viewer (legacy items) ----- */
function videoViewer(entry) {
    const post = `https://t.me/${state.data.channelUsername}/${entry.item.telegramPostId}`;
    const el = h(`
        <div class="reader" role="dialog" aria-modal="true" aria-label="Lecture video">
            <div class="reader-bar">
                ${iconBtn('back', 'arrow_back', 'Close video')}
                ${readerTitle(esc(entry.item.title), esc(contextLine(entry)))}
                <a class="btn btn-sm" href="${post}" target="_blank" rel="noopener noreferrer"><span class="ms">open_in_new</span>Telegram</a>
            </div>
            <div class="reader-body"><iframe class="reader-frame" src="${post}?embed=1&dark=1" title="${esc(entry.item.title)}" allowfullscreen></iframe></div>
        </div>`);
    $('[data-r="back"]', el).addEventListener('click', closeReaderNav);
    return { el, cleanup() {} };
}

/* --------------------------------------------------------------------------
   14. Passcode lock (single source of truth: Rule 13)
   -------------------------------------------------------------------------- */
const SITE_SECURITY_PASSCODE = '11223344';
const AUTH_STORAGE_KEY = 'ilberiz_auth';
const AUTH_TOKEN = 'granted';

function isUserAuthenticated() {
    try {
        const auth = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
        return auth === AUTH_TOKEN || auth === SITE_SECURITY_PASSCODE;
    } catch (e) { return false; }
}
function setAuthentication(remember) {
    try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, AUTH_TOKEN);
        if (remember) localStorage.setItem(AUTH_STORAGE_KEY, AUTH_TOKEN);
        else localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {}
}
function clearAuthentication() {
    try { sessionStorage.removeItem(AUTH_STORAGE_KEY); localStorage.removeItem(AUTH_STORAGE_KEY); } catch (e) {}
}

function setupAuthGate() {
    const input = $('#auth-password-input');
    const group = $('#auth-input-group');
    const err = $('#auth-error-msg');
    const btn = $('#auth-submit-btn');
    const eye = $('#auth-toggle-visibility');
    let unlocking = false;

    eye.addEventListener('click', () => {
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        labelIcon(eye, show ? 'visibility_off' : 'visibility', show ? 'Hide passcode' : 'Show passcode');
        input.focus();
    });
    input.addEventListener('input', () => {
        group.classList.remove('has-error');
        err.textContent = '';
        if (input.value.trim() === SITE_SECURITY_PASSCODE) submit();
    });
    $('#auth-form').addEventListener('submit', (e) => { e.preventDefault(); submit(); });

    function submit() {
        if (unlocking) return;
        const entered = input.value.trim();
        if (entered === SITE_SECURITY_PASSCODE) {
            unlocking = true;
            sfx.play('success');
            haptic([12, 40, 12]);
            setAuthentication($('#auth-remember-checkbox').checked);
            btn.classList.add('success');
            btn.innerHTML = '<span class="ms">check_circle</span><span>Unlocked</span>';
            const gate = $('#auth-gate');
            gate.classList.add('unlocking');
            setTimeout(() => {
                document.documentElement.classList.add('is-authenticated');
                gate.classList.remove('unlocking');
                unlocking = false;
                const redirect = new URLSearchParams(location.search).get('redirect');
                if (redirect) {
                    try {
                        const d = decodeURIComponent(redirect);
                        if (d.startsWith('/') || d.startsWith('./') || d.startsWith('../') || d.startsWith('geography/') || d.startsWith(location.origin)) { location.replace(d); return; }
                    } catch (e) {}
                }
                startApp();
            }, 340);
        } else {
            sfx.play('error');
            haptic([30, 40, 30]);
            err.textContent = entered ? 'That passcode is not right. Check it and try again.' : 'Enter the passcode to continue.';
            group.classList.remove('shake');
            void group.offsetWidth;
            group.classList.add('has-error', 'shake');
            input.select();
            input.focus();
        }
    }
}
function lockWebsite() {
    const doLock = () => {
        if (reader) {
            const en = reader.entry;
            closeReader(true);
            history.replaceState({ ilb: depth() }, '', containerHref(en));
            state.rendered = null;
            route();
        }
        clearAuthentication();
        document.documentElement.classList.remove('is-authenticated');
        const input = $('#auth-password-input');
        const btn = $('#auth-submit-btn');
        input.value = '';
        input.type = 'password';
        btn.classList.remove('success');
        btn.innerHTML = '<span class="ms">lock_open</span><span>Unlock</span>';
        $('#auth-error-msg').textContent = '';
        sfx.play('off');
        setTimeout(() => input.focus(), 120);
    };
    dismissOverlay(doLock);
}

/* --------------------------------------------------------------------------
   15. Global wiring
   -------------------------------------------------------------------------- */
const ACTIONS = {
    search() { sfx.play('tap'); haptic(6); openSearch(); },
    settings() { sfx.play('tap'); haptic(6); openSettings(); },
    theme() {
        const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
        setThemePref(next);
        sfx.play(next === 'light' ? 'on' : 'off');
        haptic(8);
    },
    sound() { if (prefs.sound) sfx.play('off'); setSound(!prefs.sound); haptic(8); },
    lock: lockWebsite
};
function onGlobalClick(e) {
    const actionEl = e.target.closest('[data-action]');
    if (actionEl) { ACTIONS[actionEl.dataset.action](); return; }
    const expand = e.target.closest('[data-expand]');
    if (expand) { expand.classList.toggle('open'); return; }
    const star = e.target.closest('[data-star]');
    if (star && !star.closest('.reader')) { e.preventDefault(); toggleSave(star.dataset.star, star); return; }

    const back = e.target.closest('#top-back');
    if (back) { sfx.play('back'); haptic(6); goBack($('#topbar').dataset.back); return; }

    const link = e.target.closest('a[href^="#/"]');
    if (link && !e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
        e.preventDefault();
        const href = link.getAttribute('href');
        sfx.play('open');
        haptic(6);
        if (link.closest('.tabbar, .sidebar') && href === (location.hash || '#/')) window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
        else go(href);
        return;
    }
    const tappable = e.target.closest('button, a, label.set-row');
    if (tappable && !tappable.closest('.lock')) { sfx.play('tap'); haptic(5); }
}

function onGlobalKey(e) {
    const active = document.activeElement;
    const editing = active && (active.isContentEditable || /^(INPUT|TEXTAREA)$/.test(active.tagName));
    if (!document.documentElement.classList.contains('is-authenticated')) return;
    if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !editing)) {
        e.preventDefault();
        if (!overlay || overlay.name !== 'search') openSearch();
        return;
    }
    if (e.key === 'Escape' && overlay) { e.preventDefault(); dismissOverlay(); }
}

function setupPWA() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        installPrompt = e;
        const slot = $('[data-install-slot]');
        if (slot && !slot.children.length) renderInstallBanner(slot);
    });
    window.addEventListener('appinstalled', () => { installPrompt = null; removeInstallBanner(); toast('App installed', { icon: 'install_mobile' }); });
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').then(() => loadOfflineSet()).catch(() => {});
        });
    }
    const syncOnline = () => { $('#offline-pill').hidden = navigator.onLine; };
    window.addEventListener('online', () => { syncOnline(); toast('Back online', { icon: 'wifi' }); });
    window.addEventListener('offline', syncOnline);
    syncOnline();
}

let appStarted = false;
async function startApp() {
    if (appStarted) return;
    appStarted = true;
    state.data = window.COURSE_DATA;
    if (!state.data) {
        try {
            const res = await fetch('data.json');
            if (!res.ok) throw new Error('HTTP ' + res.status);
            state.data = await res.json();
        } catch (err) {
            view().innerHTML = `<div class="page">${emptyState('cloud_off', 'Course data could not load', 'Check your internet connection and reload the page.', '<button type="button" class="btn btn-primary" onclick="location.reload()">Reload</button>', 'margin-top:24px')}</div>`;
            appStarted = false;
            return;
        }
    }
    state.batch = state.data.batches[0];
    buildIndexes();
    buildSearchIndex();
    renderSidebar();
    if (!history.state || typeof history.state.ilb !== 'number') history.replaceState({ ilb: 0 }, '', location.href);
    state.navType = 'push';
    route();
    loadOfflineSet();
}

function init() {
    history.scrollRestoration = 'manual';
    applyTheme();
    syncSoundButton();
    const systemTheme = matchMedia('(prefers-color-scheme: light)');
    if (systemTheme.addEventListener) systemTheme.addEventListener('change', () => { if (prefs.theme === 'system') applyTheme(); });
    document.addEventListener('click', onGlobalClick);
    window.addEventListener('keydown', onGlobalKey);
    const topbar = $('#topbar');
    let sTick = false;
    window.addEventListener('scroll', () => {
        if (sTick) return;
        sTick = true;
        requestAnimationFrame(() => { topbar.classList.toggle('scrolled', window.scrollY > 4); sTick = false; });
    }, { passive: true });
    setupAuthGate();
    setupPWA();
    if (isUserAuthenticated()) {
        document.documentElement.classList.add('is-authenticated');
        startApp();
    } else {
        document.documentElement.classList.remove('is-authenticated');
        setTimeout(() => $('#auth-password-input').focus(), 150);
    }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
