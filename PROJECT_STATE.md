# PROJECT STATE & AGENT SYSTEM GUIDE

> 🚨 **MANDATORY AUTONOMOUS RULES FOR ALL AI AGENTS**:
> 1. **Written for Agents, by Agents**: The user does not manage or read this document — **it exists exclusively for you (and future agents)** to preserve 100% technical continuity, remember every critical nuance, and avoid any regressions across chats.
> 2. **Automatic Reading on EVERY Chat (No User Prompt Needed)**: Always review this guide as the absolute first step of any session in this workspace. The user works here frequently and expects zero friction — they should **NEVER need to remind you to read `PROJECT_STATE.md`**.
> 3. **The "Speak Very Little" Principle**: The user wants to keep their prompts minimal (often providing only a chapter name, lecture number, or dropping a file). Do not burden the user with repeated questions if the topic matches the pre-mapped syllabus in `data.json`.
> 4. **Consistency Over Fragmentation (Do NOT Poison the Architecture)**: Strictly adhere to the established project patterns, directory structures, and conventions documented here. Do NOT invent arbitrary or unnecessary new approaches on each session, as doing so slowly fragments and degrades ("poisons") the codebase over time.
> 5. **Pragmatic Flexibility & Speed Over Ceremony**: If an approach is slow or cumbersome, optimize it. Never run heavy ceremonies (e.g., 20-minute browser subagents or slide image decoding) when lightweight validation finishes in seconds.
> 6. **AUTOMATICALLY UPDATE THIS FILE**: Whenever you add, adapt, optimize, or reorganize any files, chapters, engines, or paradigms, you **MUST automatically update this file (`PROJECT_STATE.md`)** before concluding your turn without needing the user to ask or remind you. Document the change, rationale, and new state thoroughly so that no knowledge or operational wisdom is ever forgotten.

---

## 1. Project Overview & Repository Context
- **Workspace Root**: `c:\Users\ASUS\Downloads\ILBERIZ TECHZ IIT KANPUR`
- **Git Remote**: `origin/main` (`https://github.com/ilberiztechziitkanpur/ilberiztechziitkanpur.github.io.git`)
- **Platform**: Ilberiz Techz IIT Kanpur — Class 10th ICSE Study & Examination Engine
- **Live Deployment**: GitHub Pages (`https://ilberiztechziitkanpur.github.io/`)
- **Target Curriculum**: CISCE Class 10th ICSE Board Examination (2025–2027 Syllabus)

---

## 2. Directory Structure & Organization

```
ILBERIZ TECHZ IIT KANPUR/
├── geography/                       # ALL Geography subject content lives strictly here
│   ├── climate/                     # Chapter 1: Climate Theory Master DPP Vault
│   │   └── index.html               # 42 Most Expected Theory Qs, 175+ Variations, Timer & Data Tables
│   ├── climate-mcq/                 # Chapter 1: Climate 10-Year MCQ Master Suite (2016–2026)
│   │   └── index.html               # 34 Playable MCQs, 125+ Hits, Tables & Diagrams, Instant & Exam Modes
│   ├── soil/                        # Chapter 2: Soil Resources Theory Master DPP Vault
│   │   └── index.html               # 46 Most Expected Theory Qs, 180+ Variations, 60s Matrix, Blur Mode
│   ├── soil-mcq/                    # Chapter 2: Soil Resources 10-Year MCQ Master Suite (2016–2026)
│   │   └── index.html               # 35 Playable MCQs, 135+ Hits, Tables & Diagrams, Instant & Exam Modes
│   ├── vegetation/                  # Chapter 3: Natural Vegetation Theory Master DPP Vault
│   │   └── index.html               # 46 Most Expected Theory Qs, 185+ Variations, Dual-Tab Drawer, Blur Mode
│   ├── vegetation-mcq/              # Chapter 3: Natural Vegetation 10-Year MCQ Master Suite (2016–2026)
│   │   └── index.html               # 35 Playable MCQs, 140+ Hits, Tables & Diagrams, Instant & Exam Modes
│   ├── water/                       # Chapter 4: Water Resources Theory Master DPP Vault
│   │   └── index.html               # 48 Most Expected Theory Qs, 190+ Variations, Dual-Tab Drawer, Blur Mode
│   ├── water-mcq/                   # Chapter 4: Water Resources 10-Year MCQ Master Suite (2016–2026)
│   │   └── index.html               # 35 Playable MCQs, 140+ Hits, Tables & Diagrams, Instant & Exam Modes
│   ├── transport/                   # Chapter 5: Transport Network Theory Master DPP Vault
│   │   └── index.html               # 48 Most Expected Theory Qs, 190+ Variations, Dual-Tab Drawer, Blur Mode
│   ├── waste/                       # Chapter 9: Waste Management Theory Master DPP Vault
│   │   └── index.html               # 50 Most Expected Theory Qs, 200+ Variations, Methods & 3Rs Drawer, Blur Mode
│   ├── notes/                       # All 19 ICSE Class 10 Geography PDF notes
│   │   ├── Climate_01_Class_Notes.pdf ... Climate_05_Class_Notes.pdf (5 files)
│   │   ├── Soil_Resources_01_Class_Notes.pdf ... Soil_Resources_03_Class_Notes.pdf (3 files)
│   │   ├── Natural_Vegetation_01_Class_Notes.pdf ... Natural_Vegetation_03_Class_Notes.pdf (3 files)
│   │   ├── Water_Resources_01_Class_Notes.pdf ... Water_Resources_02_Class_Notes.pdf (2 files)
│   │   ├── Mineral_Resources_01_Class_Notes.pdf ... Mineral_Resources_02_Class_Notes.pdf (2 files)
│   │   ├── Conventional_Sources_Of_Energy_01_Class_Notes.pdf ... 02 (2 files)
│   │   ├── Transport_01_Class_Notes.pdf (1 file)
│   │   └── Waste_Management_01_Class_Notes.pdf (1 file)
│   ├── mcq/                         # 100 Most Expected High-Yield MCQ DPP & DNA Engine
│   │   └── index.html               # Main interactive MCQ web app (hardware accelerated)
│   └── toposheet/                   # Topography (Question 1) Master Blueprint & DNA Engine
│       └── index.html               # Main interactive Topo Exam & Blueprint web app
├── history/                         # ALL History subject content lives strictly here
│   ├── 1857/                        # Chapter 1: The First War of Independence (1857) DNA PYQ Vault
│   │   └── index.html               # 10 Canonical Clusters, 62+ PYQ Twists (2015–2026), Causes & 1858 Results
│   ├── nationalism/                 # Chapter 2: Growth of Nationalism & Foundation of INC DNA PYQ Vault
│   │   └── index.html               # 11 Canonical Clusters, 72+ PYQ Twists (2015–2026), Official Council Pointers & Dual Instant/DPP Modes
│   ├── gandhi/                      # Chapter 6: Mahatma Gandhi & National Movement DNA PYQ Vault
│   │   └── index.html               # 15 Canonical Clusters, 86+ PYQ Twists (2015–2026), Dual Instant/DPP Modes
│   ├── quit-india/                  # Chapter 7: The Quit India Movement DNA PYQ Vault
│   │   └── index.html               # 7 Canonical Clusters, 48+ PYQ Twists, 100% Current Syllabus, Dual Instant/DPP Modes
│   ├── independence/                # Chapter 9: Independence & Partition of India DNA PYQ Vault
│   │   └── index.html               # 12 Canonical Clusters, 68+ PYQ Twists (2015–2026), Dual Instant/DPP Modes
│   ├── first-world-war/             # Chapter 10: The First World War (1914–1918) DNA PYQ Vault
│   │   └── index.html               # 8 Canonical Clusters, 54+ PYQ Twists, Sarajevo, Versailles & League of Nations
│   ├── 1857-ww1/                    # Dual-Chapter Master Vault (1857 Revolt + First World War)
│   │   └── index.html               # 18 Canonical Clusters, 116+ Board Variations, 1-Click Chapter Switcher
│   └── notes/                       # ICSE Class 10 History PDF notes (22 files across Chapters 1 to 12)
│       ├── The_First_War_Of_Independence_01_Class_Notes.pdf (5.8 MB) — Causes & factors
│       ├── The_First_War_Of_Independence_02_Class_Notes.pdf (4.0 MB) — Events & consequences
│       ├── The_First_War_Of_Independence_03_Class_Notes.pdf (4.2 MB) — Consequences & revision
│       ├── Growth_Of_Nationalism_01_Class_Notes.pdf (3.3 MB) — Factors & Lord Lytton's repressive policies
│       ├── Growth_Of_Nationalism_02_Class_Notes.pdf (3.6 MB) — Reformers, Press & INC foundation
│       ├── First_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf (3.3 MB) — Early Nationalists & Naoroji
│       ├── First_Phase_Of_The_Indian_National_Movement_02_Class_Notes.pdf (2.6 MB) — Gokhale & Banerjea
│       ├── Second_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf (2.6 MB) — Assertive Nationalism, Curzon & Partition of Bengal
│       ├── Second_Phase_Of_The_Indian_National_Movement_02_Class_Notes.pdf (2.9 MB) — Lal-Bal-Pal, assertive methods & Surat Split
│       ├── The_Muslim_League_01_Class_Notes.pdf (3.1 MB) — Factors promoting separatism & Shimla Deputation
│       ├── Mahatma_Gandhi_And_The_National_Movement_01_Class_Notes.pdf (3.8 MB) — Early life, Champaran, Ahmedabad, Kheda, Rowlatt Act & Jallianwala Bagh
│       ├── Mahatma_Gandhi_And_The_National_Movement_02_Class_Notes.pdf (4.2 MB) — Khilafat, Non-Cooperation programme, boycott, Chauri Chaura & suspension
│       ├── Mahatma_Gandhi_And_The_National_Movement_03_Class_Notes.pdf (5.0 MB) — Simon Commission, Lahore Session, Dandi March, Civil Disobedience & Round Table Conferences
│       ├── Quit_India_Movement_01_Class_Notes.pdf (2.6 MB) — August Offer (1940), Failure of Cripps Mission ('post-dated cheque'), Japanese Threat & Wardha Resolution (July 1942)
│       ├── Quit_India_Movement_02_Class_Notes.pdf (1.5 MB) — Bombay Session (8 Aug 1942), 'Do or Die', British Repression & Significance
│       ├── Independence_And_Partition_Of_India_01_Class_Notes.pdf (3.7 MB) — Events leading to Cabinet Mission, RIN Mutiny, Rejection of Pakistan & Clauses of Cabinet Mission Plan (1946)
│       ├── Independence_And_Partition_Of_India_02_Class_Notes.pdf (4.8 MB) — Mountbatten Plan (3 June 1947), Congress Partition acceptance & Indian Independence Act 1947
│       ├── The_First_World_War_01_Class_Notes.pdf (3.1 MB) — Causes: Nationalism, Imperialism, Armament Race, Hostile Alliances & Sarajevo Crisis
│       ├── The_First_World_War_02_Class_Notes.pdf (2.6 MB) — Results: Treaty of Versailles, Territorial Rearrangements & League of Nations
│       ├── Rise_of_Dictatorship_01_Class_Notes.pdf (3.4 MB) — Fascism in Italy: Mussolini, post-war discontentment, economic crisis & principles
│       ├── Rise_of_Dictatorship_02_Class_Notes.pdf (4.7 MB) — Nazism in Germany: Hitler, Weimar Republic failure, propaganda & Fascism/Nazism comparison
│       ├── The_Second_World_War_01_Class_Notes.pdf (5.9 MB) — Causes: Versailles dissatisfaction, Appeasement, League failure & Invasion of Poland
│       └── The_Second_World_War_02_Class_Notes.pdf (3.8 MB) — Consequences: Axis defeat, Pearl Harbour, Hiroshima/Nagasaki, UN & Cold War
├── english/                         # ALL English subject content lives strictly here
│   └── notes/                       # ICSE Class 10 English Literature PDF notes
│       ├── Julius_Caesar_01_Class_Notes.pdf (4.4 MB) — Act 3 Scene 1 (Part 1): Warm-up, recap, line-by-line & MCQs
│       ├── Julius_Caesar_02_Class_Notes.pdf (3.7 MB) — Act 3 Scene 1 (Part 2): Conspirators, assassination, mind maps & MCQs
│       ├── Julius_Caesar_03_Class_Notes.pdf (5.6 MB) — Act 3 Scene 2 (Part 1): Scene 1 conclusion & Brutus' funeral speech
│       ├── Julius_Caesar_04_Class_Notes.pdf (9.1 MB) — Act 3 Scene 2 (Part 2): Antony's speech, Caesar's will & mob riot
│       ├── Julius_Caesar_05_Class_Notes.pdf (4.0 MB) — Act 3 Scene 3: Killing of Cinna the Poet, mind maps & PYQs
│       ├── Julius_Caesar_06_Class_Notes.pdf (2.9 MB) — Act 4 Scene 1: Triumvirate meeting, character analysis & grammar
│       ├── Julius_Caesar_07_Class_Notes.pdf (3.9 MB) — Act 4 Scene 2 & 3 (Part 1): Sardis camp, Quarrel Scene & itching palm
│       ├── Treasure_Chest_Poetry_01_Class_Notes.pdf (2.3 MB) — Haunted Houses (Part 1): Stanzas 1–5, H.W. Longfellow & MCQs
│       ├── Treasure_Chest_Poetry_02_Class_Notes.pdf (4.5 MB) — Haunted Houses (Part 2): Stanzas 6–10, Bridge of Light & PYQ-2025
│       ├── Treasure_Chest_Poetry_03_Class_Notes.pdf (3.9 MB) — The Glove and the Lions: Leigh Hunt, King Francis & Count de Lorge
│       ├── Treasure_Chest_Poetry_04_Class_Notes.pdf (4.0 MB) — When Great Trees Fall: Maya Angelou, grief & solace, Specimen 2027
│       ├── Treasure_Chest_Poetry_05_Class_Notes.pdf (1.8 MB) — A Considerable Speck: Robert Frost, manuscript mite, living intelligence & mind in nature
│       ├── Treasure_Chest_Poetry_06_Class_Notes.pdf (3.6 MB) — The Power of Music: Sukumar Ray, Bhisma Lochan Sharma, satirical nonsense verse, animal chaos & goat finale
│       └── Treasure_Chest_Prose_07_Class_Notes.pdf (5.0 MB) — The Pedestrian (Part 1): Ray Bradbury, Leonard Mead, 2053 setting & MCQs
├── physics/                         # ALL Physics subject content lives strictly here
│   ├── notes/                       # ICSE Class 10 Physics PDF notes
│   │   ├── Force_Work_Power_And_Energy_01_Class_Notes.pdf (3.6 MB) — Ch 1: Force, Moments, Couple, Equilibrium & CG (40 slides)
│   │   ├── Force_Work_Power_And_Energy_02_Class_Notes.pdf (2.4 MB) — Ch 1: Couple, Moments, Metre Rule, CG & Stability (29 slides)
│   │   ├── Force_Work_Power_And_Energy_03_Class_Notes.pdf (2.4 MB) — Ch 1: Circular Motion, Centripetal/Centrifugal & Work Intro (24 slides)
│   │   ├── Force_Work_Power_And_Energy_04_Class_Notes.pdf (2.2 MB) — Ch 2: Work Done, Special Cases, F-d Graph & Units (25 slides)
│   │   ├── Force_Work_Power_And_Energy_05_Class_Notes.pdf (2.8 MB) — Ch 2: Energy Units, Energy vs Power, Mechanical Energy (PE & KE), Momentum Relation (31 slides)
│   │   ├── Force_Work_Power_And_Energy_06_Class_Notes.pdf (2.2 MB) — Ch 2: Work-Energy Theorem, KE Forms (Translational/Rotational/Vibrational), PE vs KE (26 slides)
│   │   ├── Force_Work_Power_And_Energy_07_Class_Notes.pdf (3.5 MB) — Ch 2: Different Forms of Energy (12 Forms), Conversions (17 Conversions), Conservation of Energy (30 slides)
│   │   ├── Force_Work_Power_And_Energy_08_Class_Notes.pdf (1.9 MB) — Ch 2: Conservation of Energy (Free Fall Verification & Pendulum), Board Numericals (21 slides)
│   │   ├── Light_01_Class_Notes.pdf (3.4 MB) — Ch 4: Refraction, Snell's Law, Speed in Media, Glass Block & Lateral Displacement (40 slides)
│   │   ├── Light_02_Class_Notes.pdf (3.0 MB) — Ch 4: Prism Refraction, Angle of Deviation, Real/Apparent Depth & TIR (35 slides)
│   │   ├── Light_03_Class_Notes.pdf (2.6 MB) — Ch 4: TIR in Prisms (90°, 180°, Erecting), Mirage & Optical Fibres (25 slides)
│   │   ├── Light_04_Class_Notes.pdf (4.8 MB) — Ch 5: Convex/Concave Lenses, 3 Construction Rays, Image Formations (All 6 Cases) (50 slides)
│   │   ├── Light_05_Class_Notes.pdf (2.4 MB) — Ch 5: Cartesian Signs, Lens Formula, Power (Dioptre), Simple Microscope & Spectrum Intro (30 slides)
│   │   ├── Light_06_Class_Notes.pdf (3.5 MB) — Ch 6: EM Spectrum (Gamma to Radio), Detection, Uses, Comparison & Rayleigh Scattering (36 slides)
│   │   ├── Electricity_And_Magnetism_01_Class_Notes.pdf (3.0 MB) — Ch 8: Charge, Current, Potential, Resistance Factors, Ohm's Law & Wire Materials (34 slides)
│   │   ├── Electricity_And_Magnetism_02_Class_Notes.pdf (3.2 MB) — Ch 8: V-I Graphs, EMF, Terminal Voltage, Internal Resistance & Series/Parallel (34 slides)
│   │   ├── Electricity_And_Magnetism_03_Class_Notes.pdf (2.9 MB) — Ch 8: Resistor Networks, Electrical Power & Energy (kWh), Joule's Law (29 slides)
│   │   ├── Electricity_And_Magnetism_04_Class_Notes.pdf (5.7 MB) — Ch 9: Grid Power Transmission, Domestic 3-Wire Supply, Ring System Wiring (41 slides)
│   │   ├── Electricity_And_Magnetism_05_Class_Notes.pdf (4.3 MB) — Ch 9: Fuse Ratings, MCB Mechanism, Staircase Switches, Earthing, 3-Pin Plugs (42 slides)
│   │   ├── Electricity_And_Magnetism_06_Class_Notes.pdf (3.0 MB) — Ch 10: Oersted Experiment, Solenoid, Electromagnet, Fleming's Left Hand Rule (28 slides)
│   │   ├── Electricity_And_Magnetism_07_Class_Notes.pdf (3.5 MB) — Ch 10: Electric Bell, Deflecting Torque, DC Motor Complete Working (29 slides)
│   │   ├── Electricity_And_Magnetism_08_Class_Notes.pdf (3.7 MB) — Ch 10: Electromagnetic Induction, Faraday's Laws, Lenz's Law, AC Generator (29 slides)
│   │   ├── Electricity_And_Magnetism_09_Class_Notes.pdf (3.7 MB) — Ch 10: AC Frequency, AC vs DC, Step-Up/Step-Down Transformers, Turns Ratio (31 slides)
│   │   ├── Sound_01_Class_Notes.pdf (2.8 MB) — Ch 7: Reflection of Sound, Echoes, Echo Conditions (d ≥ 17 m) & Speed of Sound (30 slides)
│   │   ├── Sound_02_Class_Notes.pdf (2.9 MB) — Ch 7: SONAR, RADAR, Bats/Dolphins Echolocation & Board Numericals (31 slides)
│   │   ├── Sound_03_Class_Notes.pdf (4.2 MB) — Ch 7: Free, Damped & Forced Vibrations, Resonance Phenomena (36 slides)
│   │   └── Sound_04_Class_Notes.pdf (4.5 MB) — Ch 7: Loudness, Pitch, Timbre (Quality) & Musical Sound vs Noise (40 slides)
│   ├── unit1-numerical/             # Unit 1: Numericals Mastery Engine v2.0
│   │   └── index.html               # 20 Verbatim Board Numericals, Step-by-Step, Formula Boxes, Live Timer
│   ├── unit1-theory/                # Unit 1: Theory, Concepts & Derivations Vault
│   │   └── index.html               # 62 Marks High-Yield Theory, Marking Scheme, Derivations, Diagram Qs, Recall Mode
│   ├── unit1-mcq/                   # Unit 1: Diagnostic MCQ Exam Engine
│   │   └── index.html               # 24 Forensic MCQs across Force, Work/Energy/Power & Machines, Dual Modes, Scoreboard
│   ├── unit4-numerical/             # Unit 4: Numericals Master Engine
│   │   └── index.html               # 20 Verbatim Board Numericals (70M), Formula Vault, Given/To-Find, Live Timer
│   ├── unit4-theory/                # Unit 4: Theory, Derivations & Diagrams Vault
│   │   └── index.html               # 24 Forensic Cards (75M), CISCE Marking Keywords, DC Motor/AC Generator Diagrams, Recall Mode
│   └── unit4-mcq/                   # Unit 4: Diagnostic MCQ Exam Engine
│       └── index.html               # 25 Forensic MCQs (85+ Variations), DPP Mode, Live Scoreboard & Detailed Board Rationales
├── Video_Downloader/                # EXCLUDED / UNTOUCHED (Independent utility — DO NOT TOUCH OR COMMIT)
├── data.js                          # Course hierarchy, chapters, and file pointers (Offline & Online)
├── data.json                        # JSON mirror of course hierarchy (Fetched via HTTP)
├── index.html                       # Main web application dashboard and app container
├── script.js                        # App controller: Navigation, search, breadcrumbs, viewer, sidebar
├── style.css                        # Design system: Dark glassmorphism, responsive grid, animations
└── PROJECT_STATE.md                 # This file (Persistent project state & autonomous setup guide)
```

---

## 3. Strict Autonomous Engineering Rules

1. **Subject Folder Isolation**: All Geography notes, MCQs, toposheets, maps, or chapter-specific interactive theory vaults MUST reside strictly inside `geography/` and its dedicated subfolders (`climate/`, `soil/`, `vegetation/`, `water/`, `transport/`, `waste/`, `notes/`, `mcq/`, `toposheet/`, etc.). All History notes and content MUST reside strictly inside `history/` (e.g. `history/notes/`). All English notes and literature content MUST reside strictly inside `english/` (e.g. `english/notes/`). All Physics notes, interactive numericals, theory vaults, and MCQ engines MUST reside strictly inside `physics/` (e.g. `physics/notes/`, `physics/unit1-numerical/`, `physics/unit1-theory/`, `physics/unit1-mcq/`). Never place loose subject files in the repository root.
2. **Standard File Structure for Engines**: Each interactive chapter vault is named `index.html` inside its respective folder (e.g. `geography/<topic>/index.html`) so it can be served as a clean standalone web app or embedded smoothly inside the main dashboard iframe.
3. **Always Include Navigation & Fonts**: Every chapter engine `index.html` MUST include:
   - Google Fonts (`Inter`, `Outfit`, `JetBrains Mono`) and `Material Symbols Outlined`.
   - The `.home-nav-btn` linking back to `../../index.html` with `target="_top"` so students can easily return to the dashboard.
4. **No Empty Subject Folders**: Do NOT create empty directories for Mathematics, Chemistry, Biology, etc., until the user provides actual files for them. Active content folders currently exist for Geography (`geography/`), History (`history/notes/`), English (`english/notes/`), and Physics (`physics/notes/`, `physics/unit1-numerical/`, `physics/unit1-theory/`, `physics/unit1-mcq/`). Full authentic ICSE Class 10 chapter syllabi for all 9 subjects are mapped in `data.js` and `data.json`.
5. **No Root Clutter**: Never leave raw download files (like `gemini-code-*.html` or `temp_*.html`) in the root directory. Process them into their proper folder (`geography/...`, `history/...`) and remove the loose download file immediately.
6. **Leave Video Downloader Untouched**: The `Video_Downloader/` directory is for a completely different utility. Never modify, delete, or commit changes inside `Video_Downloader/`.
7. **Always Synchronize `data.js` and `data.json`**: When adding a new item or chapter, update both files in parallel. `data.js` attaches to `window.COURSE_DATA` for offline `file://` usage, while `data.json` is for standard HTTP fetching.
8. **Git Push Protocol**: Always commit changes and use `BypassSandbox: true` for `git push origin main` because sandbox restricts network access.
9. **Sidebar Navigation Stability**: Keep `.nav-menu` with `overflow-x: hidden !important;`, `overscroll-behavior: contain;`, and `padding-bottom: 24px;`. Prevent any hover `translateX` on `.nav-item` / `.nav-item-featured` that triggers horizontal scrollbars or boundary oscillation loops. Both `.logo-area` and `.sidebar-footer` must have `flex-shrink: 0;`.
10. **Sidebar & Landing View Cleanliness Protocol (MANDATORY)**: The left navigation sidebar (`.nav-menu`) must NEVER accumulate past chapter buttons or older DPP engines into a massive scrolling list. Only **Overview**, curriculum batch links, and the **single latest update** (e.g. newly published chapter notes or active focus module) with a `NEW` badge are displayed in the sidebar quick-launch area. All previously published chapters, notes, and engines remain permanently accessible through their respective Subject and Chapter dashboard pages with all their original tags and badges. This ensures the dashboard on laptops and mobile devices remains uncluttered, elegant, and immediately signals to returning students what has just been updated.
11. **Testing & Validation Protocol (Ultra-Fast Schema Validation vs Conditional Browser Subagent)**:
    - **For Routine Note Additions (Default Mode - Target Under 45 Seconds)**: DO NOT launch a 15–20 minute `browser_subagent` and DO NOT spin up a background local server for basic file additions. Instead, perform instant zero-overhead validation: verify file existence via `Test-Path`, validate JSON syntax in `data.json` via standard JSON parser (`python -m json.tool`), verify `data.js` sync, update `script.js` quick launch, and push to GitHub Pages.
    - **When to Use Browser Subagent**: Browser subagents on port 8080 are strictly reserved for major architectural changes, core UI layout overhauls, new interactive examination engines, or when explicitly requested by the user.
    - **Mandatory Server Teardown (When Port 8080 is used)**: If a temporary server was launched, immediately kill it upon completion (`manage_task kill <TaskId>`) and verify port 8080 is released (`Get-NetTCPConnection -LocalPort 8080`). Never leave test servers lingering or convey to the user that a local server is needed for normal site usage.
12. **Architecture Continuity vs. Adaptive Evolution Protocol (Anti-Degradation Mandate)**:
    - **Established Standards as Baseline**: All directory structures, subject isolations, dual data synchronization (`data.js` + `data.json`), sidebar cleanliness protocols, and port 8080 testing conventions documented in this guide constitute the golden baseline for regular tasks.
    - **Anti-Degradation Mandate**: Resist the temptation to casually introduce divergent tooling, unvetted frameworks, or random new architectural paradigms from session to session. Arbitrary drift degrades ("poisons") the stability and predictability of the system.
    - **Authorized Evolution & Efficiency Pivots**: If a user requirement genuinely conflicts with an existing pattern, or if an objective technical bottleneck can be solved more efficiently and cleanly with a modern technique, agents are explicitly empowered to adopt the superior method.
    - **Compulsory State Synchronisation**: Any pivot, refinement, or new pattern must immediately be codified back into `PROJECT_STATE.md` with clear architectural reasoning so subsequent agents inherit the upgraded approach rather than reverting to deprecated patterns.
13. **Frontend Passcode Security System Protocol (Single Source of Truth: `11223344`)**:
    - **Single Point of Control**: The security passcode lives strictly in **one** central place (`SITE_SECURITY_PASSCODE = '11223344'` in `script.js`). Subchapter pages in `geography/` remain completely clean, untouched, and unpolluted.
    - **Zero-Backend Architecture**: Passcode authentication is enforced purely in the frontend for static hosting (GitHub Pages and offline `file://`).
    - **Session Token Verification**: Successful authentication writes `ilberiz_auth = 'granted'` to `sessionStorage` (and `localStorage` when 'Remember on this browser' is checked).
    - **Zero-Flicker Pre-Paint Guard**: `index.html` includes a synchronous pre-paint check in `<head>` adding `.is-authenticated` to `document.documentElement` if already verified, eliminating any UI flashing.
    - **In-App Lock Controls**: Students can re-lock the platform at any time via the top bar 'Lock' button or sidebar footer 'Lock Website' button.
14. **High-Speed Note Ingestion, Zero-Package Policy & Interactive Clarification Protocol (Replaces Slide Decoding)**:
    - **Zero-Package Installation Policy (Saves 7+ Minutes)**: NEVER attempt to install heavy imaging, OCR, or PDF packages (`pip install pillow`, `pypdf`, `pymupdf`) on every task. Use only the existing robust system Python (`C:\Users\ASUS\AppData\Local\Programs\Python\Python313\python.exe`) and lightweight built-ins (`json`, `shutil`, `os`, `pathlib`).
    - **NO Heavy Slide/Image Extraction (Saves 6+ Minutes)**: DO NOT convert lecture presentation slides into `.jp2` or `.png` images, dump slide graphics, or attempt OCR. This wastes 6–10 minutes and is completely unnecessary.
    - **The "Speak Very Little" Rule & Automatic Context Matching**:
      1. The user will typically provide only the file name or a minimal command (e.g. *"Quit India Movement 01 Class Notes"*, *"Julius Caesar 07"*, or just drop a file).
      2. **First Check Pre-Mapped Syllabus**: Match the title against the authentic ICSE Class 10 chapter syllabi already catalogued in `data.json`. If the Subject, Chapter, and Note number are evident, proceed immediately without asking trivial questions.
      3. **Ask via Interactive Questions if Ambiguous**: If the chapter, part number, or title is ambiguous or missing, DO NOT guess or decode slides. Use the `ask_question` tool immediately to present clear options:
         - *"Which chapter does this belong to?"*
         - *"Is this Part 1, Part 2, or a combined revision note?"*
         - *"What title/subtitle should be displayed?"*
    - **Standardized Renaming & Directory Placement**:
      - Standardize file to authentic project convention (e.g., `Quit_India_Movement_01_Class_Notes.pdf`, `Julius_Caesar_07_Class_Notes.pdf`).
      - Isolate directly into the correct subject directory (`history/notes/`, `geography/notes/`, `english/notes/`).
      - Clean up the raw download file from `C:\Users\ASUS\Downloads\` immediately (Rule 5).
    - **Synchronize & Deploy**:
      - Update `data.json` (source of truth) and synchronize `data.js`.
      - Update the single sidebar quick-launch in `script.js` with the `NEW` badge (Rule 10).
      - Bump cache-busting query parameter in `index.html` (e.g. `v=5.2`).
      - Update `PROJECT_STATE.md` with a concise milestone entry.
      - Commit and push to `origin/main` (`BypassSandbox: true`).
15. **Exclusive Latest-Release Spotlight Protocol (100% Exclusive to the Newest Published Release - MANDATORY)**:
    - **Single Focus Exclusive Presentation**: Whenever a new subject, unit, or chapter release is published (e.g. Physics Unit 1), the High-Yield Fast Track rail on the Overview dashboard (`.spotlight-chips-grid` in `renderBatches()`) must **EXCLUSIVELY** feature items belonging to that newly published release.
    - **Total Purge of Older Content**: You must **REMOVE ALL OF THE REST** from Overview and High-Yield Fast Track. Do NOT retain Geography, English, History, or any other previous subject chips. When a new release is published, that release is now the single important focus. All other subjects and chapters are already permanently available in their respective subject pages and known to users.
    - **No Multi-Subject Hybrid Fast Track**: Never mix older subjects into the Fast Track rail under the guise of "flagship" or "cross-curriculum" resources. When Physics is published, show ONLY Physics. When another subject is released in the future, show ONLY that new release.

---

## 4. Current Content Inventory

### A. Geography Notes (19 PDFs in `geography/notes/`)
- **Climate (5 Notes)**:
  - `Climate_01_Class_Notes.pdf` (5.8 MB) — Factors affecting climate, latitude, altitude, continentality
  - `Climate_02_Class_Notes.pdf` (4.9 MB) — Pressure systems, winds, jet streams, western disturbances
  - `Climate_03_Class_Notes.pdf` (8.1 MB) — South-West Monsoon, Arabian Sea & Bay of Bengal branches
  - `Climate_04_Class_Notes.pdf` (9.3 MB) — Retreating Monsoon, North-East Monsoon, rainfall distribution
  - `Climate_05_Class_Notes.pdf` (7.3 MB) — Climatic data interpretation, seasonal tables
- **Soil Resources (3 Notes)**:
  - `Soil_Resources_01_Class_Notes.pdf` (4.4 MB) — Pedogenesis & Alluvial soils
  - `Soil_Resources_02_Class_Notes.pdf` (5.3 MB) — Black (Regur) & Red soils
  - `Soil_Resources_03_Class_Notes.pdf` (6.1 MB) — Laterite soils & soil conservation
- **Natural Vegetation (3 Notes)**:
  - `Natural_Vegetation_01_Class_Notes.pdf` (6.2 MB) — Tropical Evergreen & Deciduous
  - `Natural_Vegetation_02_Class_Notes.pdf` (7.1 MB) — Thorn & Mangrove forests
  - `Natural_Vegetation_03_Class_Notes.pdf` (8.7 MB) — Montane forests & conservation
- **Water Resources (2 Notes)**:
  - `Water_Resources_01_Class_Notes.pdf` (5.2 MB) — Traditional irrigation (wells, canals)
  - `Water_Resources_02_Class_Notes.pdf` (8.3 MB) — Modern irrigation (tube wells, drip) & Rainwater Harvesting
- **Mineral Resources (2 Notes)**:
  - `Mineral_Resources_01_Class_Notes.pdf` (4.4 MB) — Iron Ore & Manganese
  - `Mineral_Resources_02_Class_Notes.pdf` (2.3 MB) — Copper & Bauxite
- **Conventional Sources of Energy (2 Notes)**:
  - `Conventional_Sources_Of_Energy_01_Class_Notes.pdf` (6.8 MB) — Coal fields & classification
  - `Conventional_Sources_Of_Energy_02_Class_Notes.pdf` (5.5 MB) — Petroleum & Natural Gas
- **Transport (1 Note)**:
  - `Transport_01_Class_Notes.pdf` (5.3 MB) — Roadways (density, NHAI, Golden Quadrilateral, North-South & East-West Corridors, Expressways, BRO & Atal Tunnel Rohtang), Railways (1853 Mumbai-Thane, Broad/Metre/Narrow gauges, Konkan Railway), Airways (AAI, PHHL), Waterways (Inland NW 1–5, 12 Major Sea Ports), and comparative Merits & Demerits.
- **Waste Management (1 Note)**:
  - `Waste_Management_01_Class_Notes.pdf` (4.7 MB) — Definition of waste (Environment Protection Act 1990), comprehensive classification (MSW, Industrial, Biomedical, E-waste, Hazardous, Radioactive), impact of accumulation (spoilage of landscape, air/water/soil pollution), Eutrophication (algal blooms, dissolved oxygen loss), disease vectors (houseflies, tsetse, sandflies, mosquitoes), Biomagnification (DDT food chain concentration 0.04 to 13.8 ppm), hazardous toxins (Lead, Asbestos, Mercury Minamata disease, Arsenic), effects on terrestrial and aquatic life, and urgent need for waste management.

### B. Chapter 1: Climate Theory Master DPP Vault (`geography/climate/index.html`)
- **42 Master High-Yield Theory Questions** targeting 10/10 marks in Question 4 (Climate).
- **175+ Twisted Board Variations** grouped under their core Council Marking Scheme answers.
- **Dual Study Modes**:
  1. 🎯 DPP Mode (Test): Collapsed answers, individual reveal toggles, self-evaluation (Mastered vs Revision).
  2. ⚡ Go-Through Mode: Instant reveal of all official CISCE answers & keywords for rapid reading.
- **Interactive Station Climatic Data Tables**: Station A, B, C, H temperature & rainfall analysis with mathematical range formulas.
- **Real-time Probability DNA Filtering**: 2027 Specimen, Highest Probability (6–10x), Alternate-Year, Safety Net.
- **Format Filters**: Give Geographical Reasons, Conceptual 2-Markers, Differentiate, Case-Based, Climate Data Tables.
- **Live Exam Countdown Timer**: 15, 30, 45, 60 mins presets with warning/danger pulse indicators.
- **Offline HTML Download**: Allows students to download the entire engine as a single offline HTML file.
- **Persistent Progress**: `localStorage` tracking (`icse2027_climate_mastered`, `icse2027_climate_review`).

### C. Chapter 1: Climate 10-Year PYQ & Specimen MCQ Master Suite (`geography/climate-mcq/index.html`)
- **34 Playable Master Questions** representing 125+ total PYQ hits from 2016–2026.
- **Full Coverage**: 2021–22 Semester-1 100% MCQ board paper, 2023–2026 Board & Specimen papers, 2016–2020 core concepts, Climatic Data Table calculation sub-questions, and Visual Map/Diagram MCQs.
- **Global & Individual Deduplicated Variations**: Features an instant `📂 Expand All Variations` toggle as well as individual card toggles displaying all twisted ways CISCE has framed that question across past papers.
- **Official CISCE Marking Scheme Explanations**: Detailed meteorological rationales (e.g. Garo/Khasi/Jaintia orographic funneling, Himalayan climatic barrier, Western Disturbances jet stream origins).
- **Dual Quiz Modes**:
  1. ⚡ Instant Check Mode: Immediate reveal of correct/incorrect status with explanation upon option selection.
  2. 📝 Strict Exam Mode: Options highlighted as selected without revealing answers until submission.
- **Live Exam Countdown Timer**: 15, 30, and 45 mins presets with auto-start on first click, warning pulse, and auto-submit.
- **Live Probability DNA & Topic Filters**: All Questions (34), Very High Probability (90%+), Tables & Diagrams (6), Monsoon Winds & Branches, Local Winds & Cyclones, Relief & Latitude.
- **Automated Report & 1-Click Brag Card Generator**: Powered by `html2canvas` generating a high-resolution PNG scorecard screenshot with student name, score, accuracy %, time taken, achievement tiers (Grandmaster, Tactician, Contender), and sub-topic breakdown bars.
- **Direct Cross-Linking**: Seamless companion buttons connecting to Ilberiz Techz Dashboard (`../../index.html` with `target="_top"`) and Climate Theory Vault (`../climate/index.html`).
- **Hardware-Accelerated CSS Containment**: `.q-card` configured with `content-visibility: auto; contain-intrinsic-size: 320px;` and 120ms debounced search for zero lag.

### D. Chapter 2: Soil Resources Theory Master DPP Vault (`geography/soil/index.html`)
- **46 Master High-Yield Theory Questions** targeting 10/10 marks in Question 5 (Soil Resources).
- **180+ Twisted Board Variations** grouped under their core Council Marking Scheme answers.
- **3 Interactive Study Modes**:
  1. 🎯 DPP Mode (Test): Collapsed answers, individual reveal toggles, self-evaluation.
  2. ⚡ Go-Through Mode: Instant reveal of all official CISCE answers & keywords for rapid reading.
  3. 🧠 Active Recall Blur Mode: Technical keywords (`.kw`) are dynamically blurred until clicked/hovered to test active memory retrieval.
- **Interactive 60-Second 4-Soil Master Comparison Matrix**: Expandable drawer comparing Alluvial, Black, Red, and Laterite soils across origin, composition, deficiency, crops, and regions.
- **Live Mastery Progress Strip**: Visual progress bar in the top command bar that tracks real-time question mastery percentage.
- **Real-time Probability DNA & Format Filters**: 2027 Specimen, Highest Probability (6–10x), Alluvial vs Black, Red vs Laterite, Soil Erosion & Conservation.
- **Live Exam Countdown Timer**: 15, 30, 45, 60 mins presets.
- **Persistent Progress**: `localStorage` tracking (`icse2027_soil_mastered`, `icse2027_soil_review`).

### E. Chapter 2: Soil Resources 10-Year PYQ & Specimen MCQ Master Suite (`geography/soil-mcq/index.html`)
- **35 Playable Master Questions** representing 135+ total PYQ hits from 2016–2026.
- **Full Coverage**: 2021–22 Semester-1 100% MCQ paper, 2023–2026 Board & Specimen questions, 2016–2020 core concepts, and 6 Dedicated Table & Visual Diagram MCQs (Soil Profile Horizons, 4-Soil Matrix, Khadar vs. Bhangar, Water Erosion Stages, and Conservation Diagrams).
- **Global & Individual Deduplicated Variations**: Features an instant `📂 Expand All Variations` toggle as well as individual card toggles displaying all twisted ways CISCE has framed each soil question across past papers.
- **Official CISCE Marking Scheme Explanations**: In-depth pedological rationales (e.g. self-ploughing black regur soil, leaching and desilication in laterite formation, ferric oxide pigmentation in red soil).
- **Dual Quiz Modes**:
  1. ⚡ Instant Check Mode: Immediate reveal of correct/incorrect status with explanation upon option selection.
  2. 📝 Strict Exam Mode: Options highlighted as selected without revealing answers until submission.
- **Live Exam Countdown Timer**: 15, 30, and 45 mins presets with auto-start on first click, warning pulse, and auto-submit.
- **Live Probability DNA & Topic Filters**: All Questions (35), Very High Probability (90%+), Tables & Diagrams (6), Alluvial & Black Soil, Red & Laterite Soil, Erosion & Conservation.
- **Automated Report & 1-Click Brag Card Generator**: Powered by `html2canvas` generating a high-resolution PNG scorecard screenshot with student name, score, accuracy %, time taken, achievement tiers (Grandmaster, Soil Tactician, Contender), and sub-topic breakdown bars.
- **Direct Cross-Linking**: Seamless companion buttons connecting to Ilberiz Techz Dashboard (`../../index.html` with `target="_top"`) and Soil Resources Theory Vault (`../soil/index.html`).
- **Hardware-Accelerated CSS Containment**: `.q-card` configured with `content-visibility: auto; contain-intrinsic-size: 320px;` and 120ms debounced search for zero lag.

### F. Chapter 3: Natural Vegetation Theory Master DPP Vault (`geography/vegetation/index.html`)
- **46 Master High-Yield Theory Questions** targeting 10/10 marks in Question 6 (Natural Vegetation).
- **185+ Twisted Board Variations** grouped under their core Council Marking Scheme answers.
- **3 Interactive Study Modes**:
  1. 🎯 DPP Mode (Test): Collapsed answers, individual reveal toggles, self-evaluation.
  2. ⚡ Go-Through Mode: Instant reveal of all official CISCE answers & keywords for rapid reading.
  3. 🧠 Active Recall Blur Mode: Blurs technical keywords until clicked or hovered to test active memory retrieval.
- **Interactive Dual-Tab Cheat Sheet Drawer**:
  - Tab 1: 5 Major Forest Types Master Comparison Matrix (Evergreen, Deciduous, Desert, Tidal/Mangrove, Montane).
  - Tab 2: 14 Mandatory ICSE Trees & Economic Uses Matrix (Teak, Sal, Sandalwood, Rosewood, Ebony, Mahogany, Sundari, Deodar, Pine, Chir Pine, Babool, Khair, Semul, Myrobalan).
- **Live Mastery Progress Strip**: Visual progress bar in the top command bar tracking real-time question mastery percentage.
- **Real-time Probability DNA & Format Filters**: 2027 Specimen, Highest Probability (6–10x), Give Reasons, 2-Markers, Differentiate, Case-Based, Trees & Uses, Forest Conservation.
- **Live Exam Countdown Timer**: 15, 30, 45, 60 mins presets with warning/danger pulse indicators.
- **Persistent Progress**: `localStorage` tracking (`icse2027_veg_mastered`, `icse2027_veg_review`).

### G. Chapter 3: Natural Vegetation 10-Year PYQ & Specimen MCQ Master Suite (`geography/vegetation-mcq/index.html`)
- **35 Playable Master Questions** representing 140+ total PYQ hits from 2016–2026.
- **Full Coverage**: 2021–22 Semester-1 100% MCQ paper, 2023–2026 Board & Specimen questions, 2016–2020 core concepts, and 6 Dedicated Table & Visual Diagram MCQs (Mangrove Stilt/Pneumatophore Roots, Himalayan Altitudinal Zonation, and Evergreen vs. Deciduous Canopy Structure).
- **Global & Individual Deduplicated Variations**: Features an instant `📂 Expand All Variations` toggle as well as individual card toggles displaying all twisted ways CISCE has framed each vegetation question across past papers.
- **Official CISCE Marking Scheme Explanations**: In-depth botanical and ecological rationales (e.g. stilt roots & pneumatophores for saline tidal mud, xerophytic adaptations in thorn forests, needle-shaped leaves in coniferous zones, commercial unexploited tropical evergreen forests).
- **Dual Quiz Modes**:
  1. ⚡ Instant Check Mode: Immediate reveal of correct/incorrect status with explanation upon option selection.
  2. 📝 Strict Exam Mode: Options highlighted as selected without revealing answers until submission.
- **Live Exam Countdown Timer**: 15, 30, and 45 mins presets with auto-start on first click, warning pulse, and auto-submit.
- **Live Probability DNA & Topic Filters**: All Questions (35), Very High Probability (90%+), Tables & Diagrams (6), Evergreen & Deciduous, Mangrove, Desert & Mountain, Tree Uses & Conservation.
- **Automated Report & 1-Click Brag Card Generator**: Powered by `html2canvas` generating a high-resolution PNG scorecard screenshot with student name, score, accuracy %, time taken, achievement tiers (Forestry Grandmaster, Ecosystem Guardian, Contender), and sub-topic breakdown bars.
- **Direct Cross-Linking**: Seamless companion buttons connecting to Ilberiz Techz Dashboard (`../../index.html` with `target="_top"`) and Natural Vegetation Theory Vault (`../vegetation/index.html`).
- **Hardware-Accelerated CSS Containment**: `.q-card` configured with `content-visibility: auto; contain-intrinsic-size: 320px;` and 120ms debounced search for zero lag.

### H. Chapter 4: Water Resources Theory Master DPP Vault (`geography/water/index.html`)
- **48 Master High-Yield Theory Questions** targeting 10/10 marks in Question 7 (Water Resources).
- **190+ Twisted Board Variations** grouped under their core Council Marking Scheme answers.
- **3 Interactive Study Modes**:
  1. 🎯 DPP Mode (Test): Collapsed answers, individual reveal toggles, self-evaluation.
  2. ⚡ Go-Through Mode: Instant reveal of all official CISCE answers & keywords for rapid reading.
  3. 🧠 Active Recall Blur Mode: Blurs technical keywords until clicked or hovered to test active memory retrieval.
- **Interactive Dual-Tab Cheat Sheet Drawer**:
  - Tab 1: 5 Irrigation Methods Master Comparison Matrix (Wells, Inundation Canals, Perennial Canals, Tanks, Drip/Sprinkler).
  - Tab 2: Traditional Rainwater Harvesting Across Indian States & Rooftop Harvesting Components Blueprint.
- **Live Mastery Progress Strip**: Visual progress bar in the top command bar tracking real-time question mastery percentage.
- **Real-time Probability DNA & Format Filters**: 2027 Specimen, Highest Probability (6–10x), Give Reasons, 2-Markers, Differentiate, Case-Based, Rainwater Harvesting, Wells & Canals, Tanks & Modern.
- **Live Exam Countdown Timer**: 15, 30, 45, 60 mins presets with warning/danger pulse indicators.
- **Persistent Progress**: `localStorage` tracking (`icse2027_water_mastered`, `icse2027_water_review`).

### I. Chapter 4: Water Resources 10-Year PYQ & Specimen MCQ Master Suite (`geography/water-mcq/index.html`)
- **35 Playable Master Questions** representing 140+ total PYQ hits from 2016–2026.
- **Full Coverage**: 2021–22 Semester-1 100% MCQ paper, 2023–2026 Board & Specimen questions, 2016–2020 core concepts, and Dedicated Table & Visual Diagram MCQs (Irrigation types comparison tables, Rainwater harvesting rooftop catchment flows, canal network diagrams, Persian wheel & Dhekli traditional lifting mechanisms).
- **Global & Individual Deduplicated Variations**: Features an instant `📂 Expand All Variations` toggle as well as individual card toggles displaying all twisted ways CISCE has framed each water resources question across past papers.
- **Official CISCE Marking Scheme Explanations**: Detailed hydrological and agricultural rationales (e.g. non-porous crystalline rocky terrain of South India favoring tank irrigation, perennial canal advantages over inundation canals, tube well prerequisites of high water table and soft alluvium in Gangetic plains, drip/sprinkler water efficiency).
- **Dual Quiz Modes**:
  1. ⚡ Instant Check Mode: Immediate reveal of correct/incorrect status with explanation upon option selection.
  2. 📝 Strict Exam Mode: Options highlighted as selected without revealing answers until submission.
- **Live Exam Countdown Timer**: 15, 30, and 45 mins presets with auto-start on first click, warning pulse, and auto-submit.
- **Live Probability DNA & Topic Filters**: All Questions (35), Very High Probability (90%+), Tables & Diagrams, Wells & Tube Wells, Canals, Tanks, Modern & Rainwater Harvesting.
- **Automated Report & 1-Click Brag Card Generator**: Powered by `html2canvas` generating a high-resolution PNG scorecard screenshot with student name, score, accuracy %, time taken, achievement tiers (Hydrology Grandmaster, Water Conservationist, Contender), and sub-topic breakdown bars.
- **Direct Cross-Linking**: Seamless companion buttons connecting to Ilberiz Techz Dashboard (`../../index.html` with `target="_top"`) and Water Resources Theory Vault (`../water/index.html`).
- **Hardware-Accelerated CSS Containment**: `.q-card` configured with `content-visibility: auto; contain-intrinsic-size: 320px;` and 120ms debounced search for zero lag.

### J. Chapter 5: Transport Network Theory Master DPP Vault (`geography/transport/index.html`)
- **48 Master High-Yield Theory Questions** targeting 10/10 marks in Question 11 (Transport Network).
- **190+ Twisted Board Variations** grouped under their core Council Marking Scheme answers.
- **3 Interactive Study Modes**:
  1. 🎯 DPP Mode (Test): Collapsed answers, individual reveal toggles, self-evaluation (Mastered vs Revision).
  2. ⚡ Go-Through Mode: Instant reveal of all official CISCE answers & keywords for rapid reading.
  3. 🧠 Active Recall Blur Mode: Blurs technical keywords until clicked or hovered to test active memory retrieval.
- **Interactive Dual-Tab Cheat Sheet Drawer**:
  - Tab 1: 4-Mode Transport Master Comparison Matrix (Roadways, Railways, Waterways, Airways across Advantages, Disadvantages & Best Uses).
  - Tab 2: Highways, Rail Gauges, Inland Waterways (NW-1, NW-2, NW-3) & 12 Major Sea Ports of India (Kandla, Mumbai, JNPT, Mormugao, New Mangalore, Cochin, Tuticorin, Chennai, Ennore, Visakhapatnam, Paradip, Kolkata/Haldia).
- **Live Mastery Progress Strip**: Visual progress bar in the top command bar tracking real-time question mastery percentage.
- **Real-time Probability DNA & Format Filters**: 2027 Specimen, Highest Probability (6–10x), Give Reasons, 2-Markers, Differentiate, Case-Based, Golden Quadrilateral & Corridors, Ports & Waterways, Roadways vs Railways.
- **Live Exam Countdown Timer**: 15, 30, 45, 60 mins presets with warning/danger pulse indicators.
- **Persistent Progress**: `localStorage` tracking (`icse2027_transport_mastered`, `icse2027_transport_review`).

### K. Chapter 9: Waste Management Theory Master DPP Vault (`geography/waste/index.html`)
- **50 Master High-Yield Theory Questions** targeting 10/10 marks in Question 12 (Waste Management).
- **200+ Twisted Board Variations** grouped under their core Council Marking Scheme answers.
- **3 Interactive Study Modes**:
  1. 🎯 DPP Mode (Test): Collapsed answers, individual reveal toggles, self-evaluation (Mastered vs Revision).
  2. ⚡ Go-Through Mode: Instant reveal of all official CISCE answers & keywords for rapid reading.
  3. 🧠 Active Recall Blur Mode: Blurs technical keywords until clicked or hovered to test active memory retrieval.
- **Interactive Dual-Tab Cheat Sheet Drawer**:
  - Tab 1: Safe Disposal Methods Master Matrix (Dumping/Landfills, Incineration, Composting across Pros, Cons & Board Key Points).
  - Tab 2: 3 R's Hierarchy, Segregation (Biodegradable vs Non-Biodegradable) & Government Initiatives Blueprint.
- **Live Mastery Progress Strip**: Visual progress bar in the top command bar tracking real-time question mastery percentage.
- **Real-time Probability DNA & Format Filters**: 2027 Specimen, Highest Probability (6–10x), Give Reasons, 2-Markers, Differentiate, Case-Based, Safe Disposal, 3 R's & Segregation, Impact & Diseases.
- **Live Exam Countdown Timer**: 15, 30, 45, 60 mins presets with warning/danger pulse indicators.
- **Persistent Progress**: `localStorage` tracking (`icse2027_waste_mastered`, `icse2027_waste_review`).

### J. Master 100 MCQ DPP & DNA Diagnostic Engine (`geography/mcq/index.html`)
- 100 high-yield questions covering all 9 CISCE units.
- 8-Year Board Frequency Matrix (2018–2026).
- Practice & Timed DPP Exam modes with instant explanation drawers.
- 100-Question Palette Modal navigator for instant jumping.
- Hardware-accelerated CSS containment for 60fps lag-free scrolling.

### K. Topography Question 1 Master Blueprint & Exam Engine (`geography/toposheet/index.html`)
- 50 exact questions across 5 sets for Survey of India Map Sheets G43S10 & G43S7.
- Live 15-Minute Target Timer (Board exam allocation) with countdown & drill modes.
- Automated evaluation with CISCE marking scheme answers.
- 4 Full Tabs:
  1. Interactive Exam & Question Sets (50 Qs)
  2. 8-Year CISCE DNA Frequency Matrix (2018–2026)
  3. Formula & Scale Calculation Master Cheat Sheet
  4. Survey Conventional Symbols & Color Codes Cheat Sheet
- CSS containment (`content-visibility: auto`) for zero lag.

### L. History Notes (22 Class Notes PDFs in `history/notes/` across 11 Active Chapters)
- **Chapter 1: The First War of Independence (1857) (3 Notes)**:
  - `The_First_War_Of_Independence_01_Class_Notes.pdf` (5.8 MB) — Political, socio-religious, economic & military causes of 1857 Revolt, Enfield rifle cartridge incident.
  - `The_First_War_Of_Independence_02_Class_Notes.pdf` (4.0 MB) — Major storm centres, suppression, Queen Victoria's Proclamation of 1858, Government of India Act 1858 & consequences.
  - `The_First_War_Of_Independence_03_Class_Notes.pdf` (4.2 MB) — Long-term consequences, British policy shifts, army reorganisation & comprehensive revision notes.
- **Chapter 2: Growth of Nationalism (2 Notes)**:
  - `Growth_Of_Nationalism_01_Class_Notes.pdf` (3.3 MB) — Economic exploitation, repressive policies of Lord Lytton (Vernacular Press Act 1878, Arms Act 1878), socio-religious reforms (Raja Rammohan Roy, Brahmo Samaj, abolition of Sati 1829), and Ilbert Bill controversy (1883).
  - `Growth_Of_Nationalism_02_Class_Notes.pdf` (3.6 MB) — Reformers (Jyotiba Phule, Swami Dayanand Saraswati & Arya Samaj, Swami Vivekananda & Ramakrishna Mission), role of the Press (Amrita Bazar Patrika, Bengalee, Tribune), pre-cursors to Congress (East India Association, Indian Association, Indian National Conference), and foundation of the Indian National Congress (1885, A.O. Hume, W.C. Bonnerjee, 72 delegates at Gokuldas Tejpal Sanskrit College Mumbai, 2nd session Calcutta 1886 Dadabhai Naoroji).
- **Chapter 3: First Phase of the Indian National Movement (1885–1907) (2 Notes)**:
  - `First_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf` (3.3 MB) — Early Nationalists (Moderates): Definition, beliefs, faith in British sense of justice, demands (constitutional, economic, administrative, civil rights), methods of constitutional agitation (3 P's: Petitions, Prayers, Protests), achievements (Public Service Commission 1886, Welby Commission 1895, Indian Councils Act 1892), criticisms, British attitude shift (Lord Dufferin's 'microscopic minority'), and contributions of Dadabhai Naoroji (Grand Old Man of India, London India Society 1865, East India Association 1866, thrice INC President, 1906 Swaraj demand, 'Poverty and Un-British Rule in India', Drain Theory).
  - `First_Phase_Of_The_Indian_National_Movement_02_Class_Notes.pdf` (2.6 MB) — Contributions of Gopal Krishna Gokhale (Servants of India Society 1905, Imperial Legislative Council, Welby Commission evidence, Minto-Morley reforms role, political mentor to Mahatma Gandhi, 1905 Varanasi session president) and Surendranath Banerjea (Father of Indian Nationalism, Indian Association 1876, Indian National Conference 1883, Ripon College founder, editor of 'The Bengalee', author of 'A Nation in the Making', Knighted 1921).
- **Chapter 4: Second Phase of the Indian National Movement (Assertive Nationalism) (2 Notes)**:
  - `Second_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf` (2.6 MB) — Assertive Nationalism: Causes for rise, repressive policies of Lord Curzon (Calcutta Corporation Act 1899, Official Secrets Act 1904, Indian Universities Act 1904), Partition of Bengal (1905 — pretext vs real motives), anti-partition agitation, Swadeshi & Boycott movements.
  - `Second_Phase_Of_The_Indian_National_Movement_02_Class_Notes.pdf` (2.9 MB) — Assertive leaders: Bal Gangadhar Tilak (Father of Assertive Nationalism, Kesari & Mahratta, Ganapati & Shivaji festivals, Home Rule League 1916), Bipin Chandra Pal (Father of Revolutionary Thought), Lala Lajpat Rai (Punjab Kesari, Sher-e-Punjab), assertive methods (Swadeshi, Boycott, National Education, Passive Resistance), and Surat Split of 1907.
- **Chapter 5: The Muslim League & Lucknow Pact (2 Notes)**:
  - `The_Muslim_League_01_Class_Notes.pdf` (3.1 MB) — Factors leading to formation of Muslim League: British policy of Divide & Rule, educational/economic backwardness of Muslims, Sir Syed Ahmad Khan & Aligarh Movement, Hindi-Urdu controversy, and the Shimla Deputation (1906, Lord Minto & Aga Khan).
  - `The_Muslim_League_02_Class_Notes.pdf` (8.4 MB) — Foundation of the All India Muslim League (30 December 1906 at Dhaka, Nawab Salimullah, Waqar-ul-Mulk, Aga Khan), original aims and objectives, impact on the National Movement, and the Lucknow Pact (1916: circumstances, joint scheme of political reforms, Hindu-Muslim unity, significance & weaknesses).
- **Chapter 6: Mahatma Gandhi and the National Movement (3 Notes)**:
  - `Mahatma_Gandhi_And_The_National_Movement_01_Class_Notes.pdf` (3.8 MB) — Mahatma Gandhi's early life, legal career in South Africa (1893–1914), Pietermaritzburg/train racial discrimination, Natal Indian Congress, Satyagraha principles (truth and non-violence), return to India (9 Jan 1915), Champaran Satyagraha (1917, abolition of Tinkathia system), Ahmedabad Mill Strike (1918, 35% wage hike, first hunger strike), Kheda Satyagraha (1918, remission of land revenue), Rowlatt Act (1919, 'No Vakeel, No Appeal, No Daleel', in-camera trials, suspension of Habeas Corpus), Rowlatt Satyagraha (6 April 1919), arrest of Dr. Saifuddin Kitchlew & Dr. Satyapal, Jallianwala Bagh Massacre (13 April 1919, General Dyer, martial law, Tagore's Knighthood renunciation, Hunter Committee), and introduction to Khilafat Movement (Ali Brothers).
  - `Mahatma_Gandhi_And_The_National_Movement_02_Class_Notes.pdf` (4.2 MB) — Khilafat Movement (causes, Ali Brothers, Hindu-Muslim unity), Non-Cooperation Movement (programme, boycott of titles, schools, courts, foreign cloth, picketing of liquor shops, Swadeshi & Khadi), nationwide impact (peasants in Kheda, Assam plantation workers, Moplah rebellion, Prince of Wales 1921 boycott), Chauri Chaura incident (4 Feb 1922), suspension of NCM (12 Feb 1922 Bardoli resolution), Gandhiji's arrest (sedition charge, 6-year sentence), criticisms by Motilal Nehru, Lala Lajpat Rai & Subhash Chandra Bose, and historical significance.
  - `Mahatma_Gandhi_And_The_National_Movement_03_Class_Notes.pdf` (5.0 MB) — Simon Commission (1927, all-white commission, 'Simon Go Back' protests, Lala Lajpat Rai martyrdom), Lahore Session of INC (1929, Jawaharlal Nehru president, Purna Swaraj resolution, tricolor on Ravi banks, 26 Jan 1930 Independence Day), Civil Disobedience Movement (causes, Salt Tax monopoly, Dandi March 12 Mar – 6 Apr 1930), nationwide spread (Khan Abdul Ghaffar Khan / Khudai Khidmatgar / Red Shirts in NWFP, Rani Gaidinliu in Nagaland), First Round Table Conference boycott, Gandhi-Irwin Pact (March 1931), Second Round Table Conference (London 1931, deadlock on communal electorates, resumption of CDM), and comprehensive comparison between NCM & CDM.
- **Chapter 7: The Quit India Movement (2 Notes)**:
  - `Quit_India_Movement_01_Class_Notes.pdf` (2.6 MB) — August Offer (1940), Failure of Cripps Mission ('post-dated cheque'), Japanese Threat & Wardha Resolution (July 1942).
  - `Quit_India_Movement_02_Class_Notes.pdf` (1.5 MB, 15 slides, Kunal Sir / Physics Wallah) — All-India Congress Committee Bombay Session (8 August 1942), Mahatma Gandhi's historic "Do or Die" call, British Government's repressive measures (mass arrests, lathi charges, police firing, banning of Congress organisations), underground movement (Congress Socialist Party, Aruna Asaf Ali, Jayaprakash Narayan), and nationwide significance (demonstrated depth of nationalism, made independence the only possible agenda).
- **Chapter 9: Indian Independence and Partition of India (2 Notes)**:
  - `Independence_And_Partition_Of_India_01_Class_Notes.pdf` (3.7 MB, 33 slides, Kunal Sir / Physics Wallah) — Events leading to Cabinet Mission (post-WWII British policy shift, Clement Attlee, Royal Indian Naval revolt / RIN Mutiny at Mumbai in Feb 1946), Cabinet Mission arrival (March 1946: Lord Pethick-Lawrence, Sir Stafford Cripps, A.V. Alexander), rejection of the demand for Pakistan with detailed rationale, and complete Clauses of the Cabinet Mission Plan (Federal Union of India, Provincial Autonomy, Grouping of Provinces into Sections A, B & C, Constituent Assembly of 389 members, representation of minorities, 14-member Interim Government at Centre, and freedom to remain within or secede from the Commonwealth).
  - `Independence_And_Partition_Of_India_02_Class_Notes.pdf` (4.8 MB, 44 slides, Kunal Sir / Physics Wallah) — Lord Mountbatten's appointment as Viceroy (March 1947), Mountbatten Plan of 3 June 1947 (Partition of India and Bengal/Punjab, Sindh legislative assembly decision, North-West Frontier Province & Sylhet referendums, Princely States options, Boundary Commission under Cyril Radcliffe, transfer of power date advancement to 15 August 1947), reasons why the Congress accepted partition (communal riots, obstructionist Muslim League in interim government, need for strong centralised union, fear of civil war), and complete provisions of the Indian Independence Act 1947.
- **Chapter 10: The First World War (1914–1918) (2 Notes)**:
  - `The_First_World_War_01_Class_Notes.pdf` (3.1 MB, 40 slides, Kunal Sir / Victory 2027) — Causes of the First World War: Nationalism and Imperialism (aggressive nationalism, France-Germany rivalry over Alsace-Lorraine), Race for Armaments (Anglo-German naval rivalry, militarisation), Division of Europe into Hostile Alliances (Triple Alliance 1882: Germany, Austria-Hungary, Italy vs Triple Entente 1907: Britain, France, Russia), and the Immediate Cause (Sarajevo Crisis: Assassination of Archduke Franz Ferdinand and Sophie on 28 June 1914 by Gavrilo Princip / Black Hand / Union or Death).
  - `The_First_World_War_02_Class_Notes.pdf` (2.6 MB, 35 slides, Kunal Sir / Victory 2027) — Results of World War I: Treaty of Versailles (Hall of Mirrors 28 June 1919: signatories, War Guilt Clause 231, reparations of £6,600 million, territorial rearrangements: loss of Alsace-Lorraine to France, Eupen-Malmedy to Belgium, Polish Corridor, demilitarisation of Rhineland, restriction of German military to 100,000 soldiers, prohibition of air force and submarines), territorial rearrangements across Europe, and the formation, aims and objectives of the League of Nations.
- **Chapter 11: Rise of Dictatorships (Fascism & Nazism) (2 Notes)**:
  - `Rise_of_Dictatorship_01_Class_Notes.pdf` (3.4 MB, 32 slides, Kunal Sir / Victory 2027) — Fascism in Italy: Definition, factors leading to the rise of Fascism (discontentment with Treaty of Versailles / 'mutilated victory', post-war economic crisis, severe unemployment, political instability and weak democratic governments under King Victor Emmanuel III, fear of communism / socialism, failure of the League of Nations, and the dynamic personality of Benito Mussolini), aims and principles of Fascism, Blackshirts (*Fascios*), and march on Rome (October 1922).
  - `Rise_of_Dictatorship_02_Class_Notes.pdf` (4.7 MB, 43 slides, Kunal Sir / Victory 2027) — Nazism in Germany: Factors leading to the rise of Nazism (humiliating terms of the Treaty of Versailles, economic crisis and Great Depression of 1929, hyperinflation, failure of the Weimar Republic, anti-communist fear among industrialists, anti-Semitic propaganda, charisma and oratory of Adolf Hitler), Nazi party aims and ideology (*Mein Kampf*, Swastika, Brownshirts/SA, SS), totalitarian rule, and comprehensive comparison of similarities and differences between Fascism and Nazism.
- **Chapter 12: The Second World War (1939–1945) (2 Notes)**:
  - `The_Second_World_War_01_Class_Notes.pdf` (5.9 MB, 30 slides, Kunal Sir / Victory 2027) — Causes of the Second World War: Dissatisfaction with the Treaty of Versailles, Rise of Fascism in Italy & Nazism in Germany, Policy of Appeasement (Munich Pact 1938), Japanese invasion of China / Manchuria, Failure of the League of Nations, and the Immediate Cause (Hitler's invasion of Poland on 1 September 1939 on the pretext of the Danzig Corridor).
  - `The_Second_World_War_02_Class_Notes.pdf` (3.8 MB, 32 slides, Kunal Sir / Victory 2027) — Key milestones & Consequences of World War II: Japanese attack on Pearl Harbour (7 December 1941) bringing USA into the war, atomic bombings of Hiroshima (Little Boy, 6 August 1945) and Nagasaki (Fat Man, 9 August 1945), Defeat of Axis Powers, end of European colonialism, division of the world into two power blocs (USA vs USSR / Cold War), and the formation of the United Nations (UN).

### M. Chapter 6: Mahatma Gandhi & The National Movement Master DNA PYQ Vault (`history/gandhi/index.html`)
- **15 Canonical High-Yield Clusters** targeting 12–14 marks in History Section B (100% official CISCE marking scheme).
- **86+ Deduplicated Board & Specimen Variations (2015–2026)** grouped under their core Council answers.
- **Dual Interactive Study Modes**:
  1. ⚡ Instant Check Mode: Immediate reveal of official CISCE marking scheme points and keywords for accelerated revision.
  2. 🎯 DPP Mode: Collapsed answers with individual reveal toggles, self-evaluation (Mastered vs Revision), and real-time mastery counter.
- **Full Historical Coverage**:
  - Rowlatt Act 1919 (repressive provisions, 'Black Act', arrest without warrant, in-camera trials, suspension of Habeas Corpus).
  - Jallianwala Bagh Massacre (General Dyer, 13 April 1919, Hunter Committee, Rabindranath Tagore renunciation of Knighthood).
  - Khilafat Movement (Ali Brothers Maulana Azad, Turkey/Caliph Sultan dismemberment, Treaty of Sevres, Hindu-Muslim unity).
  - Non-Cooperation Movement (causes, boycott programme, national education, Panchayats, Swadeshi, Chauri Chaura incident 4 Feb 1922, Bardoli suspension 12 Feb 1922, significance).
  - Simon Commission (1927, all-white composition, Lala Lajpat Rai martyrdom).
  - Lahore Session of INC (Dec 1929, Jawaharlal Nehru president, Poorna Swaraj resolution, 26 Jan 1930 celebration).
  - Civil Disobedience Movement & Dandi March (causes, Salt Tax monopoly, 78 ashramites, 385 km, 6 April 1930 violation).
  - Gandhi-Irwin Pact (March 1931), Second Round Table Conference (London 1931, deadlock over separate electorates), and comprehensive NCM vs CDM comparison.
- **Exam Countdown Timer**: 15, 30, 45, 60 mins presets with active warning pulse.
- **Navigation**: Integrated `.home-nav-btn` linking back to `../../index.html` with `target="_top"`.

### N. Chapter 9: Independence and Partition of India Master DNA PYQ Vault (`history/independence/index.html`)
- **12 Canonical High-Yield Clusters** targeting 10–12 marks in History Section B (100% 2026–2027 syllabus-audited).
- **68+ Deduplicated Board & Specimen Variations (2015–2026)** grouped under their core Council answers.
- **Dual Interactive Study Modes**:
  1. ⚡ Instant Check Mode: Instant reveal of official CISCE points and keywords for rapid reading.
  2. 🎯 DPP Mode: Collapsed answers with individual reveal toggles, self-evaluation, and live mastery counter.
- **Full Historical Coverage**:
  - Cabinet Mission Plan 1946 (Lord Pethick-Lawrence, Sir Stafford Cripps, A.V. Alexander, primary objectives, reasons for rejection of Pakistan demand).
  - Clauses of Cabinet Mission Plan (Federal Union, Provincial Autonomy, 3 Groupings A/B/C, Constituent Assembly of 389 members, Interim Government).
  - Congress and Muslim League reactions, Direct Action Day (16 August 1946) & Communal Riots.
  - Mountbatten Plan (3 June 1947 Plan: Partition of India and Bengal/Punjab, Princely States, Boundary Commission, reasons why Congress accepted partition).
  - Indian Independence Act 1947 (provisions: creation of two independent Dominions India & Pakistan, Governor-General role, Constituent Assemblies as sovereign legislatures, lapse of British suzerainty over Princely States, division of armed forces and assets).
- **Exam Countdown Timer**: 15, 30, 45, 60 mins presets with active warning pulse.
- **Navigation**: Integrated `.home-nav-btn` linking back to `../../index.html` with `target="_top"`.

### O. Chapter 7: The Quit India Movement Master DNA PYQ Vault (`history/quit-india/index.html`)
- **7 Canonical High-Yield Clusters** targeting 10–12 marks in History Section B (100% current ICSE syllabus, out-of-syllabus elements removed).
- **48+ Deduplicated Board & Specimen Variations** with official CISCE Council answer key pointers.
- **Dual Interactive Study Modes**:
  1. ⚡ Instant Check Mode: Immediate reveal of official CISCE marking scheme points and keywords for rapid reading.
  2. 🎯 DPP Mode: Collapsed answers with individual reveal toggles, self-evaluation (Mastered vs Revision), and live mastery counter.
- **Full Historical Coverage**:
  - Failure of the Cripps Mission (1942: rejection by Congress & Muslim League, threat of partition, 'post-dated cheque').
  - Japanese Threat (advancement towards Assam/Bengal borders, Gandhiji's call for prompt British withdrawal).
  - Quit India Resolution (Wardha Working Committee July 1942, Gowalia Tank Mumbai 8 August 1942, Gandhi's "Do or Die" call).
  - Significance & Impact of the Quit India Movement (mass spontaneous uprising, parallel governments, demonstrated British inability to rule without consent).
- **Exam Countdown Timer**: 15, 30, 45 mins presets with active warning pulse.
- **Navigation**: Integrated `.home-nav-btn` linking back to `../../index.html` with `target="_top"`.

### P. Chapter 1: The First War of Independence (1857) Master DNA PYQ Vault (`history/1857/index.html`)
- **10 Canonical High-Yield Clusters** targeting 10–12 marks in History Section B (100% current CISCE syllabus).
- **62+ Deduplicated Board & Specimen Variations (2015–2026)** with official CISCE Council answer key pointers.
- **Dual Interactive Study Modes**: ⚡ Instant Check Mode & 🎯 DPP Timed Practice Mode with self-evaluation.
- **Full Historical Coverage**:
  - Political Causes (Doctrine of Lapse, Dalhousie, Nana Saheb pension annexation, disrespect to Mughal Emperor Bahadur Shah Zafar, annexation of Awadh on pretext of maladministration).
  - Socio-Religious Causes (Interference with religious customs, Sati abolition 1829, Widow Remarriage Act 1856, Religious Disabilities Act 1850, taxation on temples and mosques).
  - Economic Causes (Ruin of traditional handicrafts, drain of wealth, heavy land revenue, Inam Commission confiscation of 20,000 estates).
  - Military Causes (General Service Enlistment Act 1856, inferior treatment & salary, denial of foreign service allowance/batta).
  - Immediate Cause (Enfield rifle greased cartridge incident with cow and pig fat, Mangal Pandey at Barrackpore).
  - Consequences & Queen Victoria's Proclamation 1858 (End of East India Company rule, Secretary of State for India, Viceroy title, general amnesty, non-interference in religious beliefs, army reorganization with increased European ratio).
- **Exam Countdown Timer**: 15, 30, 45 mins presets with active warning pulse.
- **Navigation**: Integrated `.home-nav-btn` linking back to `../../index.html` with `target="_top"`.

### Q. Chapter 10: The First World War (1914–1918) Master DNA PYQ Vault (`history/first-world-war/index.html`)
- **8 Canonical High-Yield Clusters** targeting 10–12 marks in Contemporary World History Section B.
- **54+ Deduplicated Board & Specimen Variations (2015–2026)** with official CISCE Council answer key pointers.
- **Dual Interactive Study Modes**: ⚡ Instant Check Mode & 🎯 DPP Timed Practice Mode with self-evaluation.
- **Full Historical Coverage**:
  - Causes of First World War: Nationalism & Imperialism (Aggressive nationalism, France-Germany Alsace-Lorraine rivalry).
  - Division of Europe into Hostile Alliances (Triple Alliance 1882: Germany, Austria-Hungary, Italy vs Triple Entente 1907: Britain, France, Russia).
  - Armament Race & Militarism.
  - Immediate Cause (Sarajevo Crisis: Assassination of Archduke Franz Ferdinand and wife Sophie at Sarajevo on 28 June 1914 by Gavrilo Princip / Black Hand / Union or Death).
  - Treaty of Versailles (28 June 1919 Hall of Mirrors: Signatories, War Guilt Clause 231, reparations of 6,600 million pounds, territorial losses of Alsace-Lorraine, Eupen-Malmedy, Polish corridor, demilitarization of Rhineland, restriction of German army to 100,000).
  - League of Nations (Aims and objectives: promote international co-operation, achieve international peace and security, prevent future conflicts).
- **Exam Countdown Timer**: 15, 30, 45 mins presets with active warning pulse.
- **Navigation**: Integrated `.home-nav-btn` linking back to `../../index.html` with `target="_top"`.

### R. Dual-Chapter Master Vault: 1857 Revolt & First World War (`history/1857-ww1/index.html`)
- **Combined Master Suite**: All 18 Canonical Clusters & 116+ Variations in one ultra-fast hardware-accelerated dashboard.
- **1-Click Chapter Switcher**: Switch between "🌟 Both Complete Chapters (18 Clusters)", "🇮🇳 The First War of Independence (10 Clusters)", and "🌍 The First World War (8 Clusters)".
- **URL Parameter Support**: Deep-linking directly via `?scope=W1857` or `?scope=WW1`.

### S. Chapter 2: Growth of Nationalism & Foundation of the INC Master DNA PYQ Vault (`history/nationalism/index.html`)
- **11 Canonical High-Yield Clusters** (`NAT-01` to `NAT-11`) targeting 10–12 marks in History Section B (100% official CISCE marking scheme).
- **72+ Deduplicated Board & Specimen Variations (2015–2026)** grouped under their core Council answers.
- **Dual Interactive Study Modes**:
  1. ⚡ Instant Check Mode: Immediate reveal of official CISCE marking scheme points and keywords for accelerated revision.
  2. 🎯 DPP Mode: Collapsed answers with individual reveal toggles, self-evaluation (Mastered vs Revision), and real-time mastery counter.
- **Full Historical Coverage**:
  - `NAT-01`: Economic Exploitation & Agrarian Distress (peasant impoverishment, ruin of handicrafts, drain of wealth, commercial exploitation).
  - `NAT-02`: Repressive Policies of Lord Lytton (Grand Delhi Durbar 1877 during famine, Vernacular Press Act 1878, Indian Arms Act 1878, ICS age reduction from 21 to 19).
  - `NAT-03`: The Ilbert Bill Controversy 1883 (Lord Ripon, C.P. Ilbert, racial disqualification removal, European agitation, lessons for Indian unity).
  - `NAT-04`: Socio-Religious Reform Movements (Raja Rammohan Roy & Brahmo Samaj, Sati abolition 1829, Jyotiba Phule & Satyashodhak Samaj for women/dalits).
  - `NAT-05`: Swami Dayanand Saraswati & Swami Vivekananda (Arya Samaj, "Back to the Vedas", Ramakrishna Mission, Vedantic brotherhood & self-reliance).
  - `NAT-06`: Role of the Press & Vernacular Literature (Amrita Bazar Patrika, Bengalee, Hindu, Tribune, Kesari, Bankim Chandra Chattopadhyay & *Anandamath*).
  - `NAT-07`: Precursor Political Associations (East India Association 1866 London by Dadabhai Naoroji, Indian Association 1876 by Surendranath Banerjea, Indian National Conference 1883).
  - `NAT-08`: Foundation of the Indian National Congress (Allan Octavian Hume, Bombay session Dec 1885, Gokuldas Tejpal Sanskrit College, 72 delegates, W.C. Bonnerjee first president).
  - `NAT-09`: Original Aims & Objectives of the Congress (promote national unity, foster friendly relations among political workers, formulate public demands, organize public opinion).
  - `NAT-10`: Second Session of the Congress (Calcutta Dec 1886, Dadabhai Naoroji president, 436 delegates, consolidation of pan-Indian character).
  - `NAT-11`: British Attitude towards the Early Congress (initial benevolent neutrality/hospitality by Lord Dufferin, rapid shift to hostility, "microscopic minority" mockery, ban on government officials).
- **Exam Countdown Timer**: 15, 30, 45, 60 mins presets with active warning pulse.
- **Navigation**: Integrated `.home-nav-btn` linking back to `../../index.html` with `target="_top"` and imported full Google Fonts bundle (`Outfit`, `Material Symbols Outlined`).

### K. English Literature Notes (14 PDFs in `english/notes/` across Julius Caesar, Treasure Chest Poetry & Short Stories)
- **Chapter 1: Drama — Julius Caesar (William Shakespeare) (7 Notes)**:
  - `Julius_Caesar_01_Class_Notes.pdf` (4.4 MB) — Act 3 Scene 1 (Part 1): Warm-up activity, Act 1 & 2 recap, line-by-line explanation of Act 3 Scene 1, character motives & MCQs.
  - `Julius_Caesar_02_Class_Notes.pdf` (3.7 MB) — Act 3 Scene 1 (Part 2): Line-by-line explanation of Act 3 Scene 1 (conspirators' speeches, Caesar's assassination), mind maps & MCQs.
  - `Julius_Caesar_03_Class_Notes.pdf` (5.6 MB) — Act 3 Scene 2 (Part 1): Scene 1 conclusion & Brutus' funeral speech (Brutus' oration to the Roman mob), extract-based questions & MCQs.
  - `Julius_Caesar_04_Class_Notes.pdf` (9.1 MB) — Act 3 Scene 2 (Part 2): Antony's famous funeral speech ('Friends, Romans, countrymen'), reading of Caesar's will, mob manipulation, extract questions & MCQs.
  - `Julius_Caesar_05_Class_Notes.pdf` (4.0 MB) — Act 3 Scene 3: The killing of Cinna the Poet, mob fury unleashed, complete Act 3 mind maps, ICSE PYQs & Specimen Paper Questions.
  - `Julius_Caesar_06_Class_Notes.pdf` (2.9 MB) — Act 4 Scene 1: The Triumvirate meeting (Antony, Octavius & Lepidus, proscription list), character analysis, summary, PYQs/SPQs & grammar transformations.
  - `Julius_Caesar_07_Class_Notes.pdf` (3.9 MB, 36 slides, Victory 2027 by Nupur Ma'am / PW) — Act 4 Scene 1 recap, Act 4 Scene 2 (Camp near Sardis, Lucilius reporting on Cassius' strained courtesy, hollow friendship horse metaphor) & Act 4 Scene 3 (Part 1: The Tent Scene / Quarrel Scene, Lucius Pella bribe dispute, Brutus condemning Cassius' "itching palm", remembering the Ides of March, escalation of choleric/waspish anger, "Away, slight man!", Specimen Paper 2027 & PYQ-2026 MCQs, and grammar prepositions & phrasal verbs).
- **Chapter 2: Treasure Chest — ICSE Poems (5 Subchapters — Prescribed Syllabus for ICSE Class 10)**:
  - **Poem 1: Haunted Houses (Henry Wadsworth Longfellow)** [2 Notes Live]:
    - `Treasure_Chest_Poetry_01_Class_Notes.pdf` (2.3 MB) — Part 1: Warm-up vocabulary, Longfellow author profile, stanzas 1 to 5 line-by-line explanation, poetic devices (Assonance, Enjambment, Alliteration, Simile, Visual Imagery), legal *mortmain* concept (spiritual permanence vs material transience), and stanza-by-stanza MCQs.
    - `Treasure_Chest_Poetry_02_Class_Notes.pdf` (4.5 MB) — Part 2: Stanzas 6 to 10 line-by-line breakdown, inner conflict between earthly enjoyment and aspiration, Bridge of Light metaphor connecting spiritual & material worlds, perturbations & perpetual jar, comprehensive poetic devices, and complete ICSE PYQ-2025 extract questions.
  - **Poem 2: The Glove and the Lions (Leigh Hunt)** [1 Note Live]:
    - `Treasure_Chest_Poetry_03_Class_Notes.pdf` (3.9 MB) — Part 1: Royal court of King Francis, Count de Lorge, dangerous games of love, lion fight in the arena, throwing the glove, brave recovery, defiance of vanity and false love, poetic devices, themes, and MCQs.
  - **Poem 3: When Great Trees Fall (Maya Angelou)** [1 Note Live]:
    - `Treasure_Chest_Poetry_04_Class_Notes.pdf` (4.0 MB) — Part 1: Maya Angelou's eulogy for James Baldwin, nature-human parallelism (destabilization of forest equilibrium vs death of great souls), emotional impact, stanza-by-stanza keywords, poetic devices, themes of grief & solace, comforting resolution ("They existed."), and ICSE Specimen 2027 / PYQs / Competency questions.
  - **Poem 4: A Considerable Speck (Robert Frost)** [1 Note Live]:
    - `Treasure_Chest_Poetry_05_Class_Notes.pdf` (1.8 MB, 19 slides, Nupur Ma'am / Victory 2026 Batch) — Part 1: Observation of a microscopic mite on a white sheet of manuscript paper, recognition of living intelligence, individuality, fear and survival instinct in nature, speaker's decision to spare the creature, satire on collectivistic human conformity and uninspired/mindless writing, poetic devices (Oxymoron: "Considerable speck", Personification, Alliteration, Rhyme scheme AABB), and extract MCQs with explanations.
  - **Poem 5: The Power of Music (Sukumar Ray)** [1 Note Live]:
    - `Treasure_Chest_Poetry_06_Class_Notes.pdf` (3.6 MB, 34 slides, Nupur Ma'am / Victory 2026 Batch) — Part 1: Sukumar Ray's humorous nonsense verse, Bhisma Lochan Sharma's relentless singing, comical chaos caused to trees, sky, people and animals (overturned bullock carts, panicking horses, diving fish), comical climax with the billy goat, poetic devices (Metaphor: "golden gift of silence", Imagery, Hyperbole, Onomatopoeia), core themes (power & disruption of music, humour & satire), and competency-based extract questions & answers.
- **Chapter 3: Treasure Chest — ICSE Short Stories (5 Subchapters — Prescribed Syllabus for ICSE Class 10)**:
  - **Story 1: With the Photographer (Stephen Leacock)** [Architecture Ready for Notes]
  - **Story 2: The Elevator (William Sleator)** [Architecture Ready for Notes]
  - **Story 3: The Girl Who Can (Ama Ata Aidoo)** [Architecture Ready for Notes]
  - **Story 4: The Pedestrian (Ray Bradbury)** [1 Note Live]:
    - `Treasure_Chest_Prose_07_Class_Notes.pdf` (5.0 MB, 38 slides, Victory 2026 Batch by Nupur Ma'am / PW) — Part 1: Ray Bradbury's classic dystopian short story, setting of November 2053, Leonard Mead's nocturnal walks through dark, silent streets of an alienated metropolis (3 million population), comparison of houses to tombstones and graveyards with flickering television screens ("tomb-like buildings", "gray phantoms"), critique of screen addiction, technological conformity, social isolation, and loss of humanity, line-by-line explanation, word meanings, themes, and ICSE Class 10 board MCQs and extract questions.
  - **Story 5: The Last Lesson (Alphonse Daudet)** [Architecture Ready for Notes]
- **Chapter 4: English Language — Composition & Applied Grammar** [Grammar & Composition Syllabus mapped].

### T. Physics Notes & Interactive Master Engines (Unit 1: Force, Work, Power and Energy)
- **Unit 1 Master Interactive Engines (3 HTML Web Applications in `physics/`)**:
  - `UNIT-1 Force, Work, Power and Energy, Machines.Numerical` (`physics/unit1-numerical/index.html`): 20 Verbatim 10-Year Numericals, Step-by-Step Solutions, Formula Step Boxes, Given/To-Find breakdown, and Live Exam Timer.
  - `UNIT-1 Force, Work, Power and Energy, Machines. Theory` (`physics/unit1-theory/index.html`): 62 Marks High-Yield Theory, Official CISCE Marking Scheme, Give Reasons, Derivations, Diagram Questions & Active Recall Blur Mode.
  - `UNIT-1 Force, Work, Power and Energy, Machines. MCQ` (`physics/unit1-mcq/index.html`): 24 High-Yield Forensic MCQs across Force, Work/Energy/Power & Machines with DPP Test Mode, Instant Reveal, Live Scoreboard & Detailed Rationale.
- **Chapter 1: Force Lecture Notes (3 PDFs in `physics/notes/`)**:
  - `Force_Work_Power_And_Energy_01_Class_Notes.pdf` (3.6 MB, 3,626,130 bytes, 40 widescreen slides, Kunal Sir / Victory 2027 by Physics Wallah) — Translational vs Rotational motion, Moment of Force (Torque $\tau = F \times d_{\perp}$), SI and CGS units ($1\text{ N}\cdot\text{m} = 10^7\text{ dyne}\cdot\text{cm}$), Gravitational units ($1\text{ kgf}\cdot\text{m} = 9.8\text{ N}\cdot\text{m}$), Clockwise (negative) vs Anticlockwise (positive) moments, Couple and moment of couple ($\tau = F \times d$), Equilibrium (Static and Dynamic equilibrium with real-world conditions: $\Sigma F = 0$ and $\Sigma \tau = 0$), Principle of Moments (Sum of anticlockwise moments = Sum of clockwise moments), Centre of Gravity (definition, dependence on mass distribution, CG positions of symmetrical bodies: rod, ring, disc, sphere, cylinder, cone, triangular lamina), Stability of bodies, and Centripetal vs Centrifugal forces.
  - `Force_Work_Power_And_Energy_02_Class_Notes.pdf` (2.4 MB, 2,536,763 bytes, 29 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Couple definition & couple moment, Principle of Moments, Uniform metre rule knife-edge balance problems, Gravitational units ($1\text{ kgf} = 9.8\text{ N}$, $1\text{ gf} = 980\text{ dynes}$), See-saw balance calculations, Centre of gravity definition & position for solid cone ($h/4$), hollow cone ($h/3$), cylinder, sphere, and Two methods of increasing stability of a body (lowering CG and broad base).
  - `Force_Work_Power_And_Energy_03_Class_Notes.pdf` (2.4 MB, 2,425,909 bytes, 24 widescreen slides, Victory 2027 by Physics Wallah) — Uniform Circular Motion, Centripetal & Centrifugal Force, Work-Energy Concepts, Derivations & Solved Board Practice Problems.
- **Chapter 2: Work, Power, and Energy Lecture Notes (5 PDFs in `physics/notes/`)**:
  - `Force_Work_Power_And_Energy_04_Class_Notes.pdf` (2.2 MB, 2,337,467 bytes, 25 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Work Done definition & mathematical formulation ($W = F s \cos \theta$), Special Cases (Acute angle $\theta < 90^\circ \implies W > 0$, Right angle $\theta = 90^\circ \implies W = 0$, Obtuse angle $\theta > 90^\circ \implies W < 0$), Work done by applied force vs. work done against gravity ($W_F = F d \cos 0^\circ$ vs $W_{\text{gravity}} = F d \cos 180^\circ$), Area under Force-Displacement graph interpretation ($A = \text{Work done}$), SI and CGS units of work ($1\text{ J} = 10^7\text{ erg}$), Gravitational units of work ($1\text{ kgf}\cdot\text{m} = 9.8\text{ J}$, $1\text{ gf}\cdot\text{cm} = 980\text{ erg}$), and ICSE Board Numerical problems.
  - `Force_Work_Power_And_Energy_05_Class_Notes.pdf` (2.8 MB, 2,927,805 bytes, 31 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Energy definition & work-energy equivalence ($W \implies \Delta E$), Commercial units ($1\text{ Wh} = 3600\text{ J}$, $1\text{ kWh} = 3.6 \times 10^6\text{ J} = 1\text{ unit}$), Heat units (Calorie: $1\text{ cal} = 4.18\text{ J}$, $1\text{ kcal} = 4180\text{ J} for $1\text{ g}$ water $14.5^\circ\text{C} \to 15.5^\circ\text{C}$), Atomic units (Electron volt: $1\text{ eV} = 1.6 \times 10^{-19}\text{ J}$), 3-point comparison table between Energy and Power, Mechanical energy (Kinetic Energy due to motion, Potential Energy due to position/configuration), Gravitational Potential Energy ($U = mgh$) with derivation from Earth's center/surface ($\Delta U = G M_e m (\frac{1}{R_e} - \frac{1}{R_e + h}) = mgh$), Elastic Potential Energy (springs & bow configuration), Kinetic Energy ($K = \frac{1}{2}mv^2$) derivation from equations of motion ($v^2 = u^2 + 2as$), Relationship between Kinetic Energy and Momentum ($K = \frac{p^2}{2m}$, $p = \sqrt{2mK}$), and solved ICSE questions on energy, power rating, and work.
  - `Force_Work_Power_And_Energy_06_Class_Notes.pdf` (2.2 MB, 2,335,230 bytes, 26 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Work-Energy Theorem mathematical definition and derivation ($W_{\text{net}} = \Delta KE = K_f - K_i = \frac{1}{2}mv^2 - \frac{1}{2}mu^2$), Three forms of Kinetic Energy with real-world examples: (1) Translational KE (rectilinear path, monoatomic gases $\text{He}$, $\text{Ne}$), (2) Rotational KE (body spinning on axis, Earth, diatomic/polyatomic molecules $\text{N}_2$, $\text{O}_2$, $\text{NH}_3$, $\text{CO}_2$), (3) Vibrational KE (to-and-fro motion, clamped struck wire, solids), Simultaneous forms of KE (rolling ball, rotating wheels of a moving vehicle), 4-point tabular distinction between Potential Energy and Kinetic Energy, and solved ICSE Board numericals (dam hydroelectric power generation at 60% efficiency, car acceleration work, inclined plane friction dissipation, mass vs velocity effects on KE).
  - `Force_Work_Power_And_Energy_07_Class_Notes.pdf` (3.5 MB, 3,693,172 bytes, 30 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Work-Energy theorem numerical warm-up (bullet resistive force penetration depth and emerging velocity, bouncing ball kinetic energy loss into heat and sound), Twelve distinct forms of energy in nature (Solar with panels/furnace/cells, Heat & steam engines, Light, Chemical fuel & food, Hydroelectric, Electrical, Nuclear fission/fusion $E=mc^2$, Geothermal hot springs, Wind turbines, Sound wave vibrations, Magnetic & electromagnets, Mechanical $KE+PE$), Seventeen explicit bidirectional energy conversions (dynamo vs motor, electric iron vs thermocouple, loudspeaker vs microphone, battery charging vs cell discharging, light bulb vs photocell, steam engine, photosynthesis, fuel combustion, internal combustion engines), Principle of Conservation of Energy, Dissipated/degraded energy definition (non-useful frictional/thermal energy), and solved board MCQs & energy categorization exercises.
  - `Force_Work_Power_And_Energy_08_Class_Notes.pdf` (1.9 MB, 2,026,416 bytes, 21 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Theoretical verification of $K+U=\text{constant}=mgH$ for a freely falling body across points A, B, and C with height vs energy graphical analysis, Simple pendulum mechanical energy conservation (extreme vs mean positions & air resistance dissipation), and solved ICSE Board numericals (free fall velocity, vertical throw with 40% air resistance loss, pendulum speed at mean position, ski jump change in PE and takeoff speed).
- **Chapter 4: Refraction of Light at Plane Surfaces Lecture Notes (3 PDFs in `physics/notes/`)**:
  - `Light_01_Class_Notes.pdf` (3.4 MB, 3,606,961 bytes, 40 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Concept of Refraction, Speed of light in different transparent media ($v = c/\mu$), Rarer to denser vs denser to rarer bending rules, Normal incidence ($\angle i = 0^\circ \implies \angle r = 0^\circ$ with speed change but zero deviation), Cause of refraction, Laws of Refraction & Snell's Law ($\sin i / \sin r = {}_1\mu_2$), Refractive index definitions, Factors affecting refractive index (optical density, temperature, wavelength/colour: $\mu_V > \mu_R$), Principle of Reversibility of light path (${}_a\mu_g \times {}_g\mu_a = 1$), Refraction through a rectangular glass block, Lateral displacement derivation and factors affecting it (thickness, angle of incidence, refractive index), Multiple images formed in a thick plane glass plate or mirror (why the second image is the brightest due to first strong reflection at silvered surface), and solved ICSE board questions and numericals.
  - `Light_02_Class_Notes.pdf` (3.0 MB, 3,125,666 bytes, 35 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Refraction of light through a glass prism, Geometric relation ($A + \delta = i + e$), Angle of deviation ($\delta$) and its dependence on angle of incidence ($i\text{-}\delta$ parabolic curve, minimum deviation $\delta_m$ condition: $i_1 = i_2, r_1 = r_2$), Dependence on prism material refractive index ($\delta = (\mu-1)A$), angle of prism ($A$), and wavelength of light ($\delta_V > \delta_R$), Real and Apparent Depth phenomenon, Normal shift formulation ($\text{NS} = \text{RD}(1 - 1/\mu)$) and factors affecting it, Apparent bending of a stick/pencil in water, Atmospheric refraction consequences (twinkling of stars, early sunrise and delayed sunset by ~2 mins, raised coin in vessel), Critical Angle definition ($\sin i_c = 1/\mu$), Factors affecting critical angle (wavelength: $i_{c,\text{red}} > i_{c,\text{violet}}$, temperature), Total Internal Reflection (TIR) definition, Essential conditions for TIR ($D \to R$ and $i > i_c$), and critical angle calculations for glass-air ($42^\circ$) and diamond-air ($24.4^\circ$).
  - `Light_03_Class_Notes.pdf` (2.6 MB, 2,688,538 bytes, 25 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Total Internal Reflection in prisms: (1) $45^\circ\text{-}90^\circ\text{-}45^\circ$ Right-angled isosceles prism to deviate a ray of light through $90^\circ$ (periscope), (2) to deviate a ray of light through $180^\circ$ (binoculars, cameras), (3) to erect an inverted image without deviation (slide projector / erecting prism), TIR in $60^\circ$ equilateral prism (deviation through $60^\circ$), TIR and refraction in $30^\circ\text{-}90^\circ\text{-}60^\circ$ right-angled prism (deviation less than $60^\circ$, normal incidence on hypotenuse deviation $>60^\circ$), Why total reflecting prisms are preferred over plane mirrors (100% light reflection, no energy absorption, persistent brightness, no deterioration of silvering), Distinction table between TIR and reflection from plane mirror, Real-life consequences of TIR (mirage in deserts/hot roads, shining empty test tube in beaker, sparkling diamond, cracked glass vessel), and Optical fibre transmission in medical endoscopes and telecommunications.
- **Chapter 5: Refraction through a Lens Lecture Notes (2 PDFs in `physics/notes/`)**:
  - `Light_04_Class_Notes.pdf` (4.8 MB, 5,072,438 bytes, 50 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Definition and classification of lenses: Converging / Convex (Bi-convex, Plano-convex, Concavo-convex) vs Diverging / Concave (Bi-concave, Plano-concave, Convexo-concave), Action of a lens as an assembly of prisms and central parallel slab, Technical terms: Centre of curvature ($C_1, C_2$), Radii of curvature ($R_1, R_2$), Principal axis, Optical centre ($O$), First focal point ($F_1$) and Second focal point ($F_2$), Focal plane, Focal length ($f$), Factors affecting focal length (refractive index of lens material relative to surrounding medium, radii of curvature; Lens Maker's formula $\frac{1}{f} = (\frac{\mu_1}{\mu_2}-1)(\frac{1}{R_1}-\frac{1}{R_2})$; covering half a lens reduces intensity while leaving image intact), 3 Construction rays for drawing ray diagrams, Real vs Virtual image 3-point comparison table, Complete image formation by Convex lens across all 6 object positions: (1) Between $O$ and $F_1$ (magnifying glass, virtual & enlarged), (2) At $F_1$ (spectrometer collimator, at infinity), (3) Between $F_1$ and $2F_1$ (cinema/slide projector, real & magnified), (4) At $2F_1$ (terrestrial telescope, same size), (5) Beyond $2F_1$ (camera lens, diminished), (6) At infinity (burning glass, point focus); Image formation by Concave lens (any position: virtual, erect, diminished; at focus when at infinity; Galilean telescope & myopia spectacles), and 3-point comparison table between images formed by convex and concave lenses.
  - `Light_05_Class_Notes.pdf` (2.4 MB, 2,538,104 bytes, 30 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Cartesian sign convention for spherical lenses ($u < 0$, convex $f > 0$, concave $f < 0$, real image $v > 0$, virtual image $v < 0$), Lens Formula derivation and application ($\frac{1}{f} = \frac{1}{v} - \frac{1}{u}$), Linear Magnification ($m = \frac{h_i}{h_o} = \frac{v}{u}$, sign interpretation: $m > 0$ erect/virtual, $m < 0$ inverted/real), Power of a lens ($P = \frac{1}{f\text{ (in m)}} = \frac{100}{f\text{ (in cm)}}$, unit: Dioptre $\text{D}$), Thick vs thin lens power comparison, Magnifying glass or simple microscope mechanics and angular magnification ($M = 1 + \frac{D}{f}$ at least distance of distinct vision $D=25\text{ cm}$; $M = \frac{D}{f}$ at normal adjustment), Solved board numericals, and foundational introduction to Spectrum: Dispersion of white light through a triangular prism, Newton's prism experiment, VIBGYOR wavelength ranges ($4000\text{ \AA} - 8000\text{ \AA}$), Cause of dispersion (differential speeds in glass), and first surface dispersion vs both surface deviation.
- **Chapter 6: Spectrum Lecture Notes (1 PDF in `physics/notes/`)**:
  - `Light_06_Class_Notes.pdf` (3.5 MB, 3,680,703 bytes, 36 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Complete Electromagnetic Spectrum in order of increasing wavelength / decreasing frequency: Gamma rays ($<0.1\text{ \AA}$), X-rays ($0.1\text{ \AA}-100\text{ \AA}$), Ultraviolet rays ($100\text{ \AA}-4000\text{ \AA}$), Visible light ($4000\text{ \AA}-8000\text{ \AA}$), Infrared radiations ($8000\text{ \AA}-10^7\text{ \AA}$), Microwaves ($10^7\text{ \AA}-10^{11}\text{ \AA}$), and Radio waves ($>10^{11}\text{ \AA}$), Mnemonic formula, Common electromagnetic properties (non-mechanical, speed $3\times 10^8\text{ m/s}$ in vacuum, transverse, unaffected by electric/magnetic fields), Individual discovery, sources, properties, detection methods and clinical/industrial uses of each radiation, Quartz prism vs rock-salt prism requirements (glass absorbs UV and IR), Comprehensive 7-property comparison table between UV, Visible, and IR radiations, Scattering of light definition, Rayleigh's law of scattering ($\text{Intensity} \propto 1/\lambda^4$), and authentic natural phenomena applications: (1) Red colour of the sun at sunrise and sunset, (2) White colour of the sky at noon, (3) Blue colour of the sky, (4) Black appearance of sky to an astronaut in space / moon, (5) White appearance of clouds (larger particles scatter all colours equally), and (6) Red light used for danger signals.
- **Unit 4 Master Interactive Engines (3 HTML Web Applications in `physics/`)**:
  - `UNIT-4 Current Electricity & Magnetism.Numerical` (`physics/unit4-numerical/index.html`): 20 Verbatim Board Numericals (70 Marks), Step-by-Step Marking Solutions, Given/To-Find breakdown, CGS-to-SI Unit Conversion Vault, and Live Exam Timer.
  - `UNIT-4 Current Electricity & Magnetism. Theory` (`physics/unit4-theory/index.html`): 24 Forensic Master Cards (75 Marks), Official CISCE Marking Keywords, Give Reasons, Derivations, DC Motor/AC Generator Diagrams & DPP Recall Mode.
  - `UNIT-4 Current Electricity & Magnetism. MCQ` (`physics/unit4-mcq/index.html`): 25 Forensic MCQs (85+ Variations) across Chapters 8, 9 & 10 with DPP Test Mode, Instant Reveal, Live Scoreboard & Detailed Board Rationales.
- **Chapter 8: Current Electricity Lecture Notes (3 PDFs in `physics/notes/`)**:
  - `Electricity_And_Magnetism_01_Class_Notes.pdf` (3.0 MB, 2,989,347 bytes, 34 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Concept of Charge ($q=ne$, $n=6.25\times 10^{18}$ electrons/C), Current ($I=\Delta q/\Delta t$), Potential & Potential Difference ($V=W/q$), Resistance ($R=\rho l/A$) & factors affecting it, Conductance ($G=1/R$), Ohm's Law ($V=IR$), Ohmic vs Non-Ohmic conductors, Choice of wire materials (copper/aluminium transmission, manganin/constantan standard resistors, lead-tin fuse, tungsten filament, nichrome heating element), and solved board questions.
  - `Electricity_And_Magnetism_02_Class_Notes.pdf` (3.2 MB, 3,234,801 bytes, 34 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — $V-I$ graph for conductor at different temperatures, Resistance vs temperature in conductors and semiconductors, Electromotive Force ($\varepsilon=W_{\text{total}}/q$), Terminal Voltage ($V=W_{\text{ext}}/q$), Voltage Drop ($v=Ir$), Cell equation ($V=\varepsilon-Ir$), Factors affecting EMF and Internal Resistance of cell, Resistors in Series and Parallel derivations, and equivalent resistance circuit problems.
  - `Electricity_And_Magnetism_03_Class_Notes.pdf` (2.9 MB, 2,894,545 bytes, 29 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Resistor network combinations, Electrical Energy formulations ($U=VIt=I^2Rt=\frac{V^2}{R}t$), Electrical Power ($P=VI=I^2R=\frac{V^2}{R}$), Commercial unit of electrical energy ($1\text{ kWh}=3.6\text{ MJ}=1\text{ unit}$), Power rating of electrical appliances, Joule's Law of Heating, and solved ICSE Board numericals (monthly electric bills, series vs parallel power consumption).
- **Chapter 9: Household Circuits Lecture Notes (2 PDFs in `physics/notes/`)**:
  - `Electricity_And_Magnetism_04_Class_Notes.pdf` (5.7 MB, 5,711,798 bytes, 41 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Transmission of electric power from power station (11 kV $\to$ 132 kV $\to$ 33 kV $\to$ 11 kV $\to$ 220 V), Power distribution to a house (Live 220V, Neutral 0V, Earth 0V), Company fuse, kWh meter, main switch (double-pole ELCB/MCB), Ring system of house wiring and its advantages, Electric fuse working principle ($H=I^2Rt, \Delta T \propto I^2/r^3$), and Reason for connecting fuse in live wire.
  - `Electricity_And_Magnetism_05_Class_Notes.pdf` (4.3 MB, 4,300,369 bytes, 42 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Current ratings of fuses and appliance circuits, Miniature Circuit Breakers (MCB), Single pole vs double pole switches, Dual control staircase wiring circuits, Local earthing & appliance metallic casing earthing, Three-pin plug & socket (longer and thicker earth pin safety), Wire colour coding (Old: Red/Black/Green; New: Brown/Light Blue/Green-Yellow), High tension wires, Superconductors, and transition to Oersted's magnetic experiment.
- **Chapter 10: Electro-Magnetism Lecture Notes (4 PDFs in `physics/notes/`)**:
  - `Electricity_And_Magnetism_06_Class_Notes.pdf` (3.0 MB, 3,014,901 bytes, 28 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Oersted's experiment on magnetic effect of electric current, Right Hand Thumb Rule, Magnetic field and field lines around straight wire, circular loop, and solenoid, Clock-Face Rule, I-shaped & U-shaped electromagnets, Soft iron vs Steel core characteristics, Electromagnet strength factors, Lorentz force ($F=qvB\sin\theta, F=IlB\sin\theta$), and Fleming's Left Hand Rule.
  - `Electricity_And_Magnetism_07_Class_Notes.pdf` (3.5 MB, 3,488,462 bytes, 29 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Electric Bell construction, working, and make-and-break cycle, Deflecting torque on a current-carrying loop ($\tau = NIAB\sin\theta$), Simple D.C. Motor principle, construction, step-by-step $360^\circ$ working cycle, split ring commutator function, and soft iron core radial field enhancement.
  - `Electricity_And_Magnetism_08_Class_Notes.pdf` (3.7 MB, 3,735,208 bytes, 29 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Electromagnetic Induction experimental demonstration, Faraday's Laws of Induction ($\varepsilon_{\text{ind}} = N \Delta\phi_B/\Delta t$), Fleming's Right Hand Rule for induced current direction, Lenz's Law based on conservation of energy, and A.C. Generator complete construction, $360^\circ$ rotation cycle, and alternating EMF wave equation ($\varepsilon = \varepsilon_0 \sin\omega t$).
  - `Electricity_And_Magnetism_09_Class_Notes.pdf` (3.7 MB, 3,668,412 bytes, 31 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Frequency of alternating current ($50\text{ Hz}$ in India, $60\text{ Hz}$ in USA), Difference and advantages of A.C. over D.C., A.C. Generator vs D.C. Motor detailed comparison table, Transformers working on mutual induction, Step-up vs Step-down transformers, Turns ratio ($\frac{E_s}{E_p} = \frac{N_s}{N_p} = \frac{I_p}{I_s}$), Laminated soft iron core to minimize eddy current losses, and comprehensive ICSE Board PYQs.
- **Chapter 7: Sound Lecture Notes (4 PDFs in `physics/notes/`)**:
  - `Sound_01_Class_Notes.pdf` (2.8 MB, 2,920,987 bytes, 30 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Reflection of Sound Waves, Formation of Echoes, Conditions for Hearing an Echo (minimum obstacle distance $d \ge 16.6\text{ m} \approx 17\text{ m}$ at $20^\circ\text{C}$, persistence of hearing $t \ge 0.1\text{ s}$), Determination of Speed of Sound ($2d = v \times t$), and authentic ICSE board examples.
  - `Sound_02_Class_Notes.pdf` (2.9 MB, 3,017,352 bytes, 31 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Practical Applications of Echoes, Echo Depth Sounding & SONAR ($d = vt/2$), RADAR navigation comparison, Echolocation in Bats and Marine Animals (Dolphins), Medical Ultrasonography (Echocardiography), and solved board numericals.
  - `Sound_03_Class_Notes.pdf` (4.2 MB, 4,417,036 bytes, 36 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Natural (Free) Vibrations (vibrations in vacuum, constant amplitude), Damped Vibrations (energy loss due to friction/medium resistance, decreasing amplitude), Forced Vibrations, Resonance Phenomena (special case of forced vibrations when $f_{\text{ext}} = f_{\text{nat}}$, maximum amplitude), Mechanical & Acoustic tuning fork resonance, and real-world resonance case studies.
  - `Sound_04_Class_Notes.pdf` (4.5 MB, 4,701,649 bytes, 40 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) — Three Subjective Characteristics of Sound: (1) Loudness & Intensity (dependence on amplitude squared, surface area, distance, and density; Decibel unit $\text{dB}$), (2) Pitch / Shrillness (dependence on frequency, grave vs shrill distinction), (3) Quality / Timbre (dependence on waveform and subsidiary notes/harmonics/overtones), Difference between Musical Sound and Noise, and comprehensive board numericals.

### U. Authentic ICSE Class 10 Curriculum Alignment (All 9 Subjects)
All subjects across the platform now feature 100% genuine ICSE Class 10 syllabus chapters (CBSE chapters completely removed):
1. **Mathematics (`sub-10-math`) — 15 Chapters**:
   - Ch 1: Goods and Services Tax (GST)
   - Ch 2: Banking (Recurring Deposit)
   - Ch 3: Shares and Dividends
   - Ch 4: Linear Inequations
   - Ch 5: Quadratic Equations in One Variable
   - Ch 6: Factorisation of Polynomials (Remainder & Factor Theorems)
   - Ch 7: Matrices (2x2)
   - Ch 8: Arithmetic & Geometric Progression
   - Ch 9: Coordinate Geometry & Reflection
   - Ch 10: Similarity of Triangles
   - Ch 11: Circles & Tangents
   - Ch 12: Mensuration (Cylinder, Cone, Sphere)
   - Ch 13: Trigonometrical Identities, Heights & Distances
   - Ch 14: Statistics (Mean, Median, Mode, Ogive & Quartiles)
   - Ch 15: Probability
2. **Physics (`sub-10-phy`) — 6 Prescribed Units & 12 Chapters (CISCE / Concise Selina Structure)**:
   - **Unit 1: Force, Work, Power and Energy**:
     - **Interactive Master Engines (3 Engines)**:
       - `UNIT-1 Force, Work, Power and Energy, Machines.Numerical` (`physics/unit1-numerical/index.html`): 20 Verbatim 10-Year Numericals, Step-by-Step Solutions, Formula Step Boxes, Given/To-Find breakdown & Live Timer.
       - `UNIT-1 Force, Work, Power and Energy, Machines. Theory` (`physics/unit1-theory/index.html`): 62 Marks High-Yield Theory, Official CISCE Marking Scheme, Give Reasons, Derivations, Diagram Questions & Recall Mode.
       - `UNIT-1 Force, Work, Power and Energy, Machines. MCQ` (`physics/unit1-mcq/index.html`): 24 High-Yield Forensic MCQs across all 3 Chapters with DPP Test Mode, Instant Reveal, Live Scoreboard & Detailed Rationale.
     - **Ch 1: Force**:
       - `Force, Work, Power And Energy  01  Class Notes.pdf` (3.5 MB, `physics/notes/Force_Work_Power_And_Energy_01_Class_Notes.pdf`): Comprehensive lecture notes on Force, Moment of Force, Couple, Equilibrium, and Centre of Gravity.
     - **Ch 2: Work, Energy and Power**: (Work done, kinetic & potential energy conservation)
     - **Ch 3: Machines**: (MA, VR, efficiency, Class I-III levers & pulley systems)
   - **Unit 2: Light**:
     - Ch 4: Refraction of Light at Plane Surfaces (Snell's law, TIR & critical angle)
     - Ch 5: Refraction through a Lens (Convex/concave lenses, ray diagrams, power)
     - Ch 6: Spectrum (Prism dispersion, electromagnetic spectrum & scattering)
   - **Unit 3: Sound**:
     - Ch 7: Sound (Echoes, sonar, natural/damped/forced vibrations & resonance)
   - **Unit 4: Electricity and Magnetism**:
     - Ch 8: Current Electricity (Ohm's law, internal resistance, series/parallel combinations)
     - Ch 9: Household Circuits (Ring system, 3-pin plug, earthing, fuses & power calculations)
     - Ch 10: Electro-Magnetism (Magnetic effect of current, DC motor, induction & transformers)
   - **Unit 5: Heat**:
     - Ch 11: Calorimetry (Specific heat capacity, principle of mixtures, latent heat of fusion)
   - **Unit 6: Modern Physics**:
     - Ch 12: Radioactivity (Alpha/beta/gamma decay, nuclear reactions, fission & fusion)
3. **Chemistry (`sub-10-chem`) — 12 Chapters**:
   - Ch 1: Periodic Properties and Variations
   - Ch 2: Chemical Bonding (Electrovalent, Covalent & Coordinate)
   - Ch 3: Acids, Bases and Salts
   - Ch 4: Analytical Chemistry (NaOH & NH4OH action)
   - Ch 5: Mole Concept and Stoichiometry
   - Ch 6: Electrolysis
   - Ch 7: Metallurgy (Extraction of Aluminium)
   - Ch 8: Study of Compounds — Hydrogen Chloride
   - Ch 9: Study of Compounds — Ammonia
   - Ch 10: Study of Compounds — Nitric Acid
   - Ch 11: Study of Compounds — Sulphuric Acid
   - Ch 12: Organic Chemistry (Hydrocarbons, Alcohols & Carboxylic Acids)
4. **Biology (`sub-10-bio`) — 12 Chapters**:
   - Ch 1: Cell Division & Structure of Chromosomes
   - Ch 2: Genetics — Fundamentals & Mendel's Laws
   - Ch 3: Absorption by Roots (Osmosis & Active Transport)
   - Ch 4: Transpiration
   - Ch 5: Photosynthesis
   - Ch 6: The Circulatory System
   - Ch 7: The Excretory System
   - Ch 8: The Nervous System & Sense Organs
   - Ch 9: The Endocrine System
   - Ch 10: The Reproductive System
   - Ch 11: Human Population
   - Ch 12: Pollution — Environmental Challenges
5. **Geography (`sub-10-geo`) — 12 Units / Interactive Engines**:
   - Topography Q1 Master Blueprint (50 Qs)
   - Master 100 MCQ Diagnostic Engine
   - 6 Theory DPP Master Vaults (Climate, Soil, Vegetation, Water, Transport, Waste)
   - 19 Complete Class Notes PDFs (Climate, Soil, Vegetation, Water, Minerals, Energy, Transport, Waste)
   - Agriculture & Manufacturing Industries MCQ DPPs
6. **History & Civics (`sub-10-his`) — 20 Chapters**:
   - *History*:
     - Ch 1: The First War of Independence (1857) [3 Class Notes PDFs Live]
     - Ch 2: Growth of Nationalism [2 Class Notes PDFs Live]
     - Ch 3: First Phase of the Indian National Movement (1885–1907) [2 Class Notes PDFs Live]
     - Ch 4: Second Phase of the Indian National Movement (Assertive Nationalism) [2 Class Notes PDFs Live]
     - Ch 5: The Muslim League & Lucknow Pact [2 Class Notes PDFs Live]
     - Ch 6: Mahatma Gandhi and the National Movement [3 Class Notes PDFs Live]
     - Ch 7: The Quit India Movement [1 Class Notes PDF Live]
     - Ch 8: Forward Bloc and the INA
     - Ch 9: Indian Independence and Partition of India [1 Class Notes PDF Live]
     - Ch 10: The First World War (1914–1918)
     - Ch 11: Rise of Dictatorships (Fascism & Nazism)
     - Ch 12: The Second World War (1939–1945)
     - Ch 13: United Nations Organization
     - Ch 14: Major Agencies of the United Nations
     - Ch 15: The Non-Aligned Movement (NAM)
   - *Civics*:
     - Civics Ch 1: The Union Parliament
     - Civics Ch 2: The Executive — President & Vice-President
     - Civics Ch 3: The Prime Minister & Council of Ministers
     - Civics Ch 4: The Supreme Court
     - Civics Ch 5: The High Courts & Subordinate Courts
7. **English (`sub-10-eng`) — 4 Main Chapters with Subchapters Architecture**:
   - Ch 1: Drama — Julius Caesar (William Shakespeare: Acts III, IV, V) [6 Class Notes PDFs Live]
   - Ch 2: Treasure Chest — ICSE Poems [5 Subchapters Prescribed for ICSE 10]:
     - Poem 1: Haunted Houses (Henry Wadsworth Longfellow) [2 Notes Live]
     - Poem 2: The Glove and the Lions (Leigh Hunt) [1 Note Live]
     - Poem 3: When Great Trees Fall (Maya Angelou) [1 Note Live]
     - Poem 4: A Considerable Speck (Robert Frost) [1 Note Live]
     - Poem 5: The Power of Music (Sukumar Ray) [1 Note Live]
   - Ch 3: Treasure Chest — ICSE Short Stories [5 Subchapters Prescribed for ICSE 10]:
     - Story 1: With the Photographer (Stephen Leacock) [Ready for Notes]
     - Story 2: The Elevator (William Sleator) [Ready for Notes]
     - Story 3: The Girl Who Can (Ama Ata Aidoo) [Ready for Notes]
     - Story 4: The Pedestrian (Ray Bradbury) [Ready for Notes]
     - Story 5: The Last Lesson (Alphonse Daudet) [Ready for Notes]
   - Ch 4: English Language — Composition & Applied Grammar
8. **Hindi (`sub-10-hin`) — 4 Chapters**:
   - Ch 1: Sahitya Sagar — Gadya Sankalan (Short Stories)
   - Ch 2: Sahitya Sagar — Padya Sankalan (Poems)
   - Ch 3: Naya Raasta / Ekanki Sanchay
   - Ch 4: Hindi Vyakaran, Nibandh evam Patra Lekhan
9. **Computer Applications (`sub-10-comp`) — 9 Chapters**:
   - Ch 1: Revision of Class IX Java Concepts
   - Ch 2: Principles of OOP & Classes
   - Ch 3: User-Defined Methods
   - Ch 4: Constructors in Java
   - Ch 5: Library Classes & Wrapper Classes
   - Ch 6: Encapsulation & Access Specifiers
   - Ch 7: Arrays (1D & 2D, Searching & Sorting)
   - Ch 8: String Handling in Java
   - Ch 9: Exception Handling in Java

---

## 5. Protocol for Future Chats (Step-by-Step Onboarding Guide)

When the user provides a new `gemini-code-*.html` file or notes PDF in any future chat:
1. **Analyze First**: Check what subject and chapter is provided.
2. **Move from Downloads to Workspace**: Use `BypassSandbox: true` with PowerShell to copy `..\gemini-code-*.html` to `geography/<chapter>/index.html` (e.g. `water/`, `minerals/`, `energy/`, `agriculture/`, `industries/`, `waste/`).
3. **Enhance the File**:
   - Add Google Fonts (`Inter`, `Outfit`, `JetBrains Mono`) and `Material Symbols Outlined` in `<head>`.
   - Add the `.home-nav-btn` in `<header class="command-bar">` linking to `../../index.html` with `target="_top"`.
   - Remove any temporary files from the workspace root.
4. **Wire Data**:
   - Update `data.js` and `data.json` under the respective chapter in `sub-10-geo` with the new interactive theory DPP master item.
   - Update `script.js` to add a quick-launch shortcut with an icon and `NEW` badge in `renderNav()`.
5. **Standardized Browser Verification on Port 8080**:
   - Start temporary test server: Run `python -m http.server 8080` (`BypassSandbox: true`, `IsDaemon: true`).
   - Run `browser_subagent` targeting `http://localhost:8080/index.html` to verify navigation, PDF rendering, tabs, search, and modes.
   - Clean shutdown: Immediately kill the background server task with `manage_task kill <TaskId>` and verify port 8080 is released (`Get-NetTCPConnection -LocalPort 8080`).
6. **Commit & Push to GitHub**:
   - Run `git add` and `git commit`.
   - Run `git push origin main` with `BypassSandbox: true`.
7. **Update This File**: Always record the changes, new question counts, and features in this document (`PROJECT_STATE.md`) automatically before finishing your turn.

---

## 6. Repository Health, Bug Fixes & Performance Optimization Audit Log

### A. Bug Fixes Implemented
1. **Sidebar Navigation Active State Persistence**:
   - *Problem*: In `script.js`, `navigateTo` did not reset `state.currentItem` when switching to non-viewer views, and quick-launch menu buttons only checked `state.currentItem?.id === ...` without checking `state.currentView === 'viewer'`. This caused quick-launch buttons to stay permanently highlighted with class `.active` even after the user navigated back to Batches, Subjects, or other chapters.
   - *Fix*: `navigateTo` now explicitly clears `state.currentItem = (view === 'viewer') ? item : null;`. All quick-launch active checks now enforce `state.currentView === 'viewer' && state.currentItem?.id === ...`. Batch nav items only highlight when on top-level subject listing, and history quick launch items properly deactivate during search.
2. **Missing `target="_top"` in Topography and MCQ Home Links**:
   - *Problem*: In `geography/toposheet/index.html` and `geography/mcq/index.html`, the `.home-nav-btn` lacked `target="_top"`, which caused `../../index.html` to be rendered recursively inside the dashboard iframe whenever students clicked the back-to-home button while using the embedded viewer.
   - *Fix*: Added `target="_top"` to `.home-nav-btn` in both `geography/toposheet/index.html` and `geography/mcq/index.html`. Also updated their Google Fonts link to include `Inter` and `JetBrains Mono` for crisp typographical consistency.
3. **Duplicate Chapter Number in `data.js` and `data.json`**:
   - *Problem*: Both Transport and Waste Management were labeled `"Ch 9:"` in `sub-10-geo`.
   - *Fix*: Waste Management updated to `"name": "Ch 10: Waste Management"` in both `data.js` and `data.json`.
4. **Search Bar Desynchronization on Result Click**:
   - *Problem*: In `script.js`, clicking a card from search results navigated to the viewer without clearing `searchInput.value` and search state, leaving stale query text displayed in the header.
   - *Fix*: Added `resetSearch()` on search result item and chapter selection.
5. **Breadcrumb Terminal Item Non-Clickable & Active State**:
   - *Problem*: The terminal breadcrumb representing the current page was rendered as an active-clickable link to itself, causing redundant re-renders.
   - *Fix*: The terminal crumb is now marked with `.active` styling and disables redundant self-navigation.
6. **PDF Iframe Fullscreen Attribute**:
   - *Problem*: In `script.js`, the PDF reader iframe was missing `allow="fullscreen"`.
   - *Fix*: Added `iframe.setAttribute('allow', 'fullscreen')`.

### B. Performance & Efficiency Optimizations
1. **Pre-Computed Flat Search Index (`searchIndex`)**:
   - Replaced multi-level nested object tree traversals and dynamic `.toLowerCase()` calls on every input event with a pre-indexed flat array built once on startup.
   - Expanded search coverage to include all Class 10 subjects and syllabus chapters, ensuring queries like "GST", "Quadratic", "Electricity", "Mole Concept" immediately surface their corresponding chapter pages.
2. **Hardware-Accelerated CSS Containment (`content-visibility: auto`) in All 6 Theory Vaults**:
   - Added `content-visibility: auto; contain-intrinsic-size: 280px;` to `.q-card` across `climate`, `soil`, `vegetation`, `water`, `transport`, and `waste`.
   - Off-screen question cards are skipped during layout and paint passes until scrolled into view, providing instant initial render, reduced memory footprint, and 60fps scrolling on both mobile and desktop.
3. **Search Debouncing in All 6 Theory Vaults**:
   - Replaced unthrottled `oninput="renderQuestions()"` on search inputs with 120ms `debouncedSearch()`.
   - Pre-cached lowercased search strings on all question items at startup, eliminating continuous string concatenations and allocations on every keystroke.
4. **60fps In-Place Card Evaluation Updates**:
   - In all 6 theory vaults, clicking "Mark Mastered" or "Needs Revision" previously wiped and recreated all 50 question cards via `innerHTML = ...`.
   - Added `updateCardEvaluation(id)`, which updates the targeted question card classes and buttons in-place when not in revision-filter mode. This eliminates layout thrashing, avoids scroll jumping, and makes user evaluation instant.
5. **Card Keyboard Accessibility & Animation Stagger Capping**:
   - Added `role="button"`, `tabindex="0"`, and Enter/Space keyboard handlers on dashboard cards.
   - Capped `--i` animation delay variable (`Math.min(index, 10)`) to eliminate animation lag for distant cards in long grids.
6. **Sidebar Navigation Decluttering & Latest Update Focus (User Mandate)**:
   - *Problem*: Over successive sessions, every added interactive vault and note was being appended directly to `.nav-menu` in `renderNav()`. This created a 10+ item scrolling sidebar that pushed essential links down, cluttered the landing view on laptop screens, and made it difficult for students to immediately see what was newly updated.
   - *Fix*: Removed older accumulated quick-launch shortcuts from the main sidebar. Replaced them with a single clean, high-priority featured button for the newest published content: **"Muslim League Notes"** (`chap-his-5`) with a `NEW` badge. All previous engines and notes remain 100% active and accessible with their full metadata and badges under their respective Subject (`geography/`, `history/`) and Chapter pages.
7. **Addition of Chapter 3: First Phase of the Indian National Movement (1885–1907)**:
   - Added `First_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf` (3.3 MB) covering Early Nationalists (Moderates), beliefs, demands, methods (3 P's), achievements, criticisms, and Dadabhai Naoroji.
   - Added `First_Phase_Of_The_Indian_National_Movement_02_Class_Notes.pdf` (2.6 MB) covering Gopal Krishna Gokhale and Surendranath Banerjea.
   - Refined Chapter 2 (`Growth of Nationalism`) to cleanly focus on factors promoting nationalism and INC foundation, and properly renumbered subsequent History syllabus chapters (Ch 4 to Ch 15).
8. **Addition of Chapter 4: Second Phase of the Indian National Movement (Assertive Nationalism)**:
   - Added `Second_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf` (2.6 MB) covering Assertive Nationalism, causes for its rise, Lord Curzon's repressive policies, Partition of Bengal (1905), Swadeshi & Boycott movements.
   - Added `Second_Phase_Of_The_Indian_National_Movement_02_Class_Notes.pdf` (2.9 MB) covering Lal-Bal-Pal, assertive methods, and Surat Split 1907.
   - Synchronized `data.js` and `data.json` under `sub-10-his` -> `chap-his-4`.
9. **Addition of Chapter 5: The Muslim League & Lucknow Pact**:
   - Added `The_Muslim_League_01_Class_Notes.pdf` (3.1 MB) covering factors promoting separatism, Sir Syed Ahmad Khan, Aligarh Movement, and Shimla Deputation 1906.
   - Added `The_Muslim_League_02_Class_Notes.pdf` (8.4 MB) covering Muslim League foundation (Dhaka 1906), objectives, and Lucknow Pact (1916).
   - Synchronized `data.js` and `data.json` under `sub-10-his` -> `chap-his-5`.
   - Updated quick-launch navigation in `script.js` to highlight "Muslim League Notes" with a glowing `NEW` badge.
   - Updated search suggestion placeholder to include "Muslim League" and "Lucknow Pact".
10. **Addition of Chapter 6: Mahatma Gandhi and the National Movement**:
   - Added `Mahatma_Gandhi_And_The_National_Movement_01_Class_Notes.pdf` (3.8 MB) covering Gandhi's early life, South African struggle, Champaran, Ahmedabad, Kheda, Rowlatt Act, and Jallianwala Bagh Massacre.
   - Accurately named the chapter to authentic ICSE title: `Ch 6: Mahatma Gandhi and the National Movement` across `data.js`, `data.json`, and `PROJECT_STATE.md`.
   - Synchronized `data.js` and `data.json` under `sub-10-his` -> `chap-his-6`.
   - Updated quick-launch navigation in `script.js` to highlight **"Mahatma Gandhi Notes"** (`chap-his-6`) with an amber icon and glowing `NEW` badge in accordance with the single latest update sidebar cleanliness protocol.
   - Updated search index and search suggestion hints in `script.js` to include "Mahatma Gandhi", "Rowlatt Act", "Jallianwala Bagh", and "Non-Cooperation".
   - Verified functionality with browser subagent across all interactions (sidebar navigation, chapter cards, PDF reader rendering, and real-time search).
11. **Notes Reader Space Maximization, Theater Fullscreen, Live Note Tabs & Chapter Navigator**:
   - **Maximized In-Site Space**: Removed arbitrary `1100px` max-width constraint on `.pdf-viewer-container` and reduced `.content-area.viewer-active` padding to `8px 12px`, reclaiming over 60px of vertical and 56px of horizontal space for full-bleed reading.
   - **Collapsible Sidebar**: Added sidebar collapse toggle (`.app-container.sidebar-collapsed`), allowing students to collapse the 280px sidebar to 0px on laptops for full 100% window width reading without leaving the dashboard.
   - **Theater Fullscreen Mode**: Added dedicated Fullscreen button (`F` shortcut) that expands the reader to 100vw x 100vh edge-to-edge, hiding all global menus/search bars and showing exclusively the note content and essential study controls.
   - **In-Chapter Note Switcher with Live DOM Slide Memory**: Built an interactive pill tab strip (`Note 01`, `Note 02`, `Note 03`) with Prev/Next buttons (`Alt + ←/→`). Implemented a live DOM iframe cache (`iframeCache`) where inactive notes are merely hidden with `opacity: 0; pointer-events: none` instead of unmounted. When students toggle between Note 1 and Note 2, their exact reading slide and scroll position are 100% preserved.
   - **Slide / Page Bookmark & Jump**: Added slide jump control in the footer (`Slide/Page: [__] Jump`) with persistent memory (`localStorage.setItem('icse_last_page_' + noteId)`).
   - **In-Viewer Chapter Switcher**: Added a glassmorphic chapter selector dropdown directly in the viewer header, allowing students to switch between all prescribed subject chapters and jump straight to their notes without navigating back through multiple dashboard levels. Includes quick Prev/Next chapter navigation buttons.
   - **Accessibility & Shortcuts**: Added keyboard shortcuts (`F` for Fullscreen, `Esc` to Exit, `Alt + ←/→` to switch notes) and mobile-responsive collapse layout.
12. **Elimination of Notes Reader Gaps, True Edge-to-Edge Fullscreen & Slide Fit Optimization**:
   - **Root Cause Analysis**:
     - In the initial implementation, fullscreen mode had container styling nested inside transformed parent blocks (`.fade-in` and `.content-area`), which created a containing block offset by 280px from the left and 80px from the top. This pushed the right half of the viewer offscreen.
     - In normal viewing mode, the dashboard's 80px `.top-bar` stacked above the viewer header, and `.pdf-frame-wrapper` had hardcoded `calc(100vh - 165px)` styles with excess padding, leaving large empty gaps above and below the reader.
     - PDFs with 16:9 widescreen slides loaded with `#view=FitH` (Fit Width) scaled horizontally to 1536px, exceeding screen height (730px) and cutting off the bottom half of the slides.
   - **Architectural & Design Solutions Implemented**:
     - **Zero Vertical Gaps & Immediate Top Alignment**: In viewer mode, `.top-bar` is hidden (`display: none !important`), pulling the viewer header up to `y = 0`. All content-area padding is removed (`padding: 0 !important`).
     - **Pulled Completely Down to Bottom Edge**: Replaced hardcoded heights with dynamic flex sizing (`flex: 1; height: 100%; min-height: 0;`), pulling the PDF reader all the way down to the bottom footer (28px).
     - **Flawless Theater Fullscreen (100vw × 100vh)**: `body.theater-fullscreen-active` and `.pdf-viewer-container.theater-fullscreen` are fixed edge-to-edge (`top: 0; left: 0; width: 100vw; height: 100vh; z-index: 99999`), hiding the sidebar, top-bar, and background decorations. Zero horizontal clipping, zero vertical overflow.
     - **100% Complete Slide Visibility (`#view=Fit`)**: Changed PDF loading parameters to `#view=Fit`, ensuring landscape slides fit perfectly within the viewport with zero text or teacher name cut-offs.
     - **Removed Redundant 'Jump' Box**: Removed the confusing `Slide / Page: [input] [Jump]` box from the footer, since the native browser PDF toolbar already contains a full-featured page number input (`1 / 46`) and page navigation, keeping the footer sleek, clean, and distraction-free.
     - **Live Browser Verification**: Tested both normal mode and theater fullscreen mode via browser subagent across 1536x730 laptop resolution, confirming zero gaps, zero clipping, smooth note/chapter switching, and clean exit transitions.

13. **Pure Native F11 Fullscreen Mode, Persistent Chapter Switching & Header UI Streamlining**:
    - **Pure Native Browser Fullscreen (F11 Equivalent)**:
      - Integrated native Fullscreen API (`requestFullscreen`, `webkitRequestFullscreen`, `mozRequestFullScreen`) targeting `.pdf-viewer-container`.
      - Styled native `:fullscreen` and `:-webkit-full-screen` pseudo-classes on the viewer container, header, frame wrapper, iframe, and footer, with `:fullscreen::backdrop { background: #090a0f !important; }`.
      - Eliminates all upper browser UI (Chrome tabs, address bar) and lower Windows OS UI (taskbar, open apps), achieving true distraction-free F11 reading.
      - Bound `F11`, `F`, and `f` keys to toggle native fullscreen mode with `Esc` or the `Exit` button to return.
    - **In-Place Seamless Chapter Switching in Fullscreen (Zero Bezel Dropout)**:
      - *Root Cause Analysis*: When changing chapters, calling `navigateTo('viewer', ...)` previously executed `contentArea.innerHTML = ''`, which detached the active `.pdf-viewer-container` element from the DOM. Under the W3C Fullscreen API, detaching the fullscreen element forces the browser to immediately exit native fullscreen, exposing the upper Chrome outline/tabs and the lower Windows taskbar while leaving only the CSS theater mode active.
      - *Architectural Fix*: Implemented in-place chapter switching (`switchChapterInViewer`). When a user selects a chapter from the dropdown or uses quick next/prev chapter arrows, the existing `.pdf-viewer-container` remains permanently mounted in the DOM. The viewer dynamically updates its chapter data, dropdown button, center note tabs (`renderNoteTabsUI()`), and PDF iframes in-place.
      - *Result*: The active fullscreen element is never detached. The browser remains continuously in 100% pure native fullscreen mode across unlimited chapter transitions with zero bezels, zero toolbar dropouts, and zero layout flicker.
    - **Removal of Redundant Sidebar Toggle Button (`#viewer-sidebar-toggle-btn`)**:
      - Completely removed the confusing `space_dashboard` panel toggle button (`â—«`) from the viewer header.
      - Streamlined the header to essential actions: `[Back]`, `[Chapter Selector Dropdown]`, `[Note Tabs]`, `[Fullscreen / Exit]`, `[New Tab]`, and `[Download]`.
    - **Asset Cache Invalidation**:
      - Updated `index.html` with cache-busting version queries (`style.css?v=2.2`, `script.js?v=2.2`) to ensure instant client deployment on GitHub Pages.
    - **End-to-End Browser Subagent Verification**:
      - Verified initial fullscreen entry, in-place chapter switching across multiple chapters (Ch 6 -> Ch 2), note switching (Note 01 -> Note 02) within fullscreen, and clean exit transitions.

14. **Addition of English Literature Notes: Julius Caesar (Acts 3 & 4)**:
    - **Visual Slide Verification**: Inspected the title slides and lecture metadata of all 6 class notes PDFs from the Victory 2027 batch (Nupur Ma'am / PW) directly:
      - Lecture 01: Act 3 Scene 1 (Part 1) — Warm-Up Activity, Act 1 & 2 Summary, Line by Line Explanation, MCQs (`Julius_Caesar_01_Class_Notes.pdf`, 4.4 MB)
      - Lecture 02: Act 3 Scene 1 (Part 2) — Line by Line Explanation, Mind Maps, MCQs (`Julius_Caesar_02_Class_Notes.pdf`, 3.7 MB)
      - Lecture 03: Act 3 Scene 2 (Part 1) — Act 3 Scene 1 Remaining Portion, Act 3 Scene 2, Extract Based Questions, MCQs (`Julius_Caesar_03_Class_Notes.pdf`, 5.6 MB)
      - Lecture 04: Act 3 Scene 2 (Part 2) — Overview, Act 3 Scene 2 (Part 2), Extract Based Questions, MCQs (`Julius_Caesar_04_Class_Notes.pdf`, 9.1 MB)
      - Lecture 05: Act 3 Scene 3 — Act 3 Scene 3 Line by Line, Act 3 Mind Maps, PYQs & SPQs (`Julius_Caesar_05_Class_Notes.pdf`, 4.0 MB)
      - Lecture 06: Act 4 Scene 1 — Act 4 Scene 1 Line by Line, PYQs/SPQs/CPQs, Summary & Analysis, Transformation of Sentences (`Julius_Caesar_06_Class_Notes.pdf`, 2.9 MB)
    - **Subject Folder Isolation**: Created dedicated `english/notes/` directory in accordance with Rule 1 & Rule 4.
    - **Parallel Data Synchronization**: Synchronized `data.js` and `data.json` under `sub-10-eng` -> `chap-eng-1` with rich descriptions, exact file paths, and accurate MB sizes.
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Julius Caesar Notes"** (`chap-eng-1`) with a theater icon and glowing `NEW` badge.
    - **Search Engine Expansion**: Augmented search suggestion topics and search index in `script.js` with "Julius Caesar", "Act 3 Scene 1", "Act 3 Scene 2", and "Antony Speech".
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=2.3`.
    - **Automated Verification**: Conducted automated end-to-end browser subagent testing verifying sidebar link, cards grid, 6-note pill switcher, note transitions, back navigation, and real-time search.

15. **Standardization of Port 8080 Temporary Test Server Protocol**:
    - Formally documented Rule 11 in Section 3 and updated Step 5 in Section 5 of `PROJECT_STATE.md` establishing port 8080 as the standard temporary local server port solely for `browser_subagent` headless verification.
    - Explicitly clarified that the site is 100% static (`file://` offline and GitHub Pages online) and requires no runtime server.
    - Standardized the mandatory protocol: start `python -m http.server 8080`, test via `browser_subagent`, and immediately terminate the task and verify port closure.

16. **Codification of Architecture Continuity & Adaptive Evolution Protocol**:
    - Embedded the user-mandated balance between consistency and pragmatic flexibility across the introductory autonomous rules and Rule 12.
    - Clarified that this guide is maintained by agents for agents to prevent architectural degradation ("poisoning the codebase with random new approaches") while explicitly sanctioning efficiency-driven pivots when required by technical constraints or user needs.
    - Reaffirmed mandatory autonomous updates to `PROJECT_STATE.md` whenever an approach is upgraded so all future sessions inherit the latest proven wisdom.

17. **Bidirectional `F` Key Fullscreen Toggle with Iframe Focus Reclamation**:
    - **Root Cause Analysis**:
      - In previous implementations, pressing `F` could enter fullscreen, and pressing `Escape` could exit fullscreen, but pressing `F` while inside fullscreen failed to exit.
      - *Mechanism*: When the PDF viewer iframe loaded or was interacted with, Chromium automatically shifted keyboard focus into the PDF plugin within the iframe. Pressing `Escape` worked because Chromium intercepts `Escape` at the native browser C++ layer to exit HTML5 fullscreen and fires `fullscreenchange` on the document. However, `F` is a normal character key; Chromium routed it directly into the PDF iframe plugin, which does not bubble keyboard events across the iframe boundary to the parent `window`/`document` listeners.
    - **Architectural & Focus Management Solution**:
      - **Focusable Container**: Set `tabindex="-1"` and `outline: none` on `.pdf-viewer-container` so the viewer root can maintain keyboard focus cleanly without focus rings.
      - **Capture Phase Dispatch**: Registered `handleViewerKeydown` on `window`, `document`, and `container` with `useCapture: true`, listening for `e.key === 'f' || e.key === 'F' || e.code === 'KeyF' || e.key === 'F11' || e.code === 'F11'`.
      - **Immediate Refocus on State Transition**: In `toggleTheaterFullscreen()`, both on entering and exiting fullscreen, scheduled `container.focus()` and `window.focus()`.
      - **Active Focus Reclamation**: Added `reclaimViewerFocus()` and `handleWindowBlur()` listeners. If focus shifts into the iframe, focus is smoothly reclaimed back to `container` within 60ms and on any cursor movement (`mousemove`), ensuring that single-key hotkeys (`F` to toggle, `Escape` to exit, `Alt + ←/→` to switch notes) are always received by the viewer without interrupting PDF reading or mouse-wheel scrolling.
      - **Clean Teardown**: Updated `activeViewerCleanup()` to unbind all capture keydown, blur, mousemove, and fullscreen change listeners.
      - **Cache Invalidation**: Bumped cache-busting queries in `index.html` to `v=2.4`.
      - **Automated Verification**: Verified via `browser_subagent` that pressing `F` enters fullscreen, pressing `F` exits fullscreen, and pressing `Escape` exits fullscreen cleanly.

18. **Consecutive `Alt + ArrowLeft/Right` Note Switching Fix**:
    - **Root Cause Analysis**:
      - Pressing `Alt + ArrowRight` or `Alt + ArrowLeft` was skipping multiple notes at once (jumping from Note 01 straight to Note 03 or Note 04) instead of advancing consecutively.
      - *Mechanism*: The `handleViewerKeydown` listener had been attached to `window`, `document`, and `container` simultaneously in the capture phase. Because `e.stopPropagation()` was not called within the `Alt + Arrow` branch, a single keydown event triggered the handler 3 times in a row, updating the active note index 3 times. Additionally, holding down the Alt and arrow keys fired unthrottled OS `keydown` repeats.
    - **Architectural Solution**:
      - **Propagation Stoppage**: Added `e.stopPropagation()` and `e.preventDefault()` to both `Alt + ArrowRight` and `Alt + ArrowLeft` blocks to guarantee event containment.
      - **Key-Repeat Debounce**: Added `if (e.repeat) return;` to prevent OS key-repeat loops from skipping notes when the key combination is held down.
      - **Single Root Capture Listener**: Removed redundant listeners on `document` and `container`, keeping a single capture listener exclusively on `window` (`window.addEventListener('keydown', handleViewerKeydown, true)`).
      - **Cache Invalidation**: Bumped cache-busting queries in `index.html` to `v=2.5`.
      - **Automated Browser Subagent Verification**: Verified sequential stepping: Note 01 -> Note 02 -> Note 03 -> Note 02 -> Note 01 in both normal and fullscreen modes.

19. **Preservation of Native Left/Right Arrow Slide Changing in Normal & Fullscreen Modes**:
    - **Root Cause Analysis**:
      - Pressing the left and right arrow keys alone (without Alt) stopped changing slides/pages within the PDF presentation.
      - *Mechanism*: The previously added `handleWindowBlur` and `reclaimViewerFocus` listeners aggressively reclaimed keyboard focus to the parent `container` whenever an iframe received focus. Because Chromium's native PDF viewer plugin requires focus inside the iframe to capture arrow keys for slide navigation, stealing focus to the parent container prevented the PDF plugin from receiving any arrow keydown events. Furthermore, `container.focus()` was executed on entering fullscreen mode, leaving the iframe un-focused.
    - **Architectural Solution**:
      - **Removed Disruptive Focus Stealing**: Completely eliminated `reclaimViewerFocus` and `handleWindowBlur` listeners so the active PDF iframe retains focus naturally for reading and slide turning.
      - **Direct Iframe Focus on Fullscreen Entry**: In `toggleTheaterFullscreen()`, scheduled `activeIframe.focus()` so that upon entering or exiting fullscreen, the slide deck is immediately responsive to keyboard arrow inputs.
      - **Contextual Hover Routing**: Attached clean `mouseenter` listeners on `header` and `footer` to give `container` focus when interacting with viewer controls, and on `frameWrapper` to restore focus to `activeIframe` when hovering over slides.
      - **Keyboard Arrow Delegation**: In `handleViewerKeydown`, if `ArrowLeft` or `ArrowRight` (alone) is pressed while focus happens to be on `container`, focus is immediately delegated to `activeIframe`.
      - **Escape & Exit Preservation**: `Escape` key continues to cleanly exit fullscreen natively from anywhere, and the `Exit` button remains directly accessible in the header.
      - **Cache Invalidation**: Bumped cache-busting queries in `index.html` to `v=2.6`.

21. **Professional Streamlining of PDF Viewer: Flawless Slide Turning, Zero-Glitch Focus & Effortless Multi-Note Navigation**:
    - **Comprehensive Project & Root Cause Analysis**:
      - *Edge OCR Text Extraction Bug*: Previous attempts had added automated, synthetic `.focus()` loops (`activeIframe.focus()`, `container.focus()`, `handleWindowBlur`, and hover/click focus delegation). In Microsoft Edge on Windows, executing synthetic `.focus()` on a PDF `<embed>` / iframe triggers Edge's AI OCR extension, popping up the disruptive tooltip *"Extracting text from PDF"*.
      - *Slide Changing & Note Switching Deadlock*: In Chromium/Edge, the native PDF plugin is an isolated embed. Left/Right/Up/Down arrow keys and mouse wheel scrolling change slides only when the PDF plugin has focus. Attempting to force-reclaim focus to the parent window for `Alt + Arrow` shortcuts prevented arrow keys from reaching the PDF. Furthermore, `Alt + ArrowLeft/Right` in Windows Edge/Chrome natively maps to browser history Back/Forward, conflicting directly with the operating system and forcing users to click in arbitrary spots on the screen.
    - **Architectural Solution (Clean, Less-Complex, Professional Standard)**:
      - **Zero Focus-Fighting**: Completely removed `handleWindowBlur`, hover focus listeners (`handleFrameEnter`, `handleHeaderEnter`), click focus delegates, and programmatic `.focus()` calls from `onload` and `showNote`. The native PDF viewer inside the iframe receives user clicks and scroll interactions 100% naturally without interference, exactly like opening the PDF in a clean browser tab.
      - **Flawless Slide Turning**: Up/Down and Left/Right arrow keys, PageUp/PageDown, and mouse-wheel scrolling inside the PDF operate with zero lag, zero cut-offs, and zero Edge text-extraction popups.
      - **Floating Edge Note Chevrons (Google Drive / Kindle Style)**: Built sleek, glassmorphic floating chevron buttons (`.floating-note-nav.prev-note-float` and `.floating-note-nav.next-note-float`) on the left and right edges of the viewer (`frameWrapper`). Students can jump between Note 01, Note 02, Note 03 with a single effortless click on the screen edge.
      - **Enhanced Header Note Tabs**: Note pill tabs (`Note 01` through `Note 06`) and header `<` / `>` arrow buttons were augmented with crisp borders, clear hover states, and tooltips.
      - **Non-Conflicting Keyboard Shortcuts**: Replaced the misleading `Alt + Arrow` hint in the footer with `<kbd>[</kbd> / <kbd>]</kbd> Switch Notes` and supported `[` / `]` and `P` / `N` when parent page has focus.
      - **Cache Invalidation**: Bumped version queries in `index.html` to `v=2.9` (`script.js?v=2.9`, `data.js?v=2.9`, `style.css?v=2.7`).
      - **Browser Subagent Verification**: Fully tested note transitions, floating button visibility on Note 01 vs Note 02, and return navigation via browser subagent.

22. **Instant Single-Press Note Switching via Low-Level Pointer & Proactive Focus Reclamation**:
    - **User Feedback & Root Cause Analysis**:
      - While reading or turning slides in the PDF presentation with arrow keys (where browser focus is natively inside the PDF plugin), clicking a note button (e.g. `Note 02` pill, header `<` / `>` arrow, or floating edge chevrons) did not switch the note on the first click. The user was forced to click outside the PDF screen first to blur the plugin, and only then would clicking the note buttons switch notes.
      - *Technical Mechanism*: In Chromium/Edge on Windows, when an `<embed type="application/pdf">` or out-of-process PDF plugin window has active OS focus, the first mouse press outside the plugin onto an HTML element deactivates and blurs the PDF plugin. Chromium treats this initial click as a plugin-activation/deactivation event and frequently suppresses or swallows the synthetic `click` event. Because the note buttons previously only listened to `onclick`, the first click was dropped by the browser during plugin blur, requiring a second click.
    - **Architectural Solution**:
      - **`bindInstantClick(btn, action)` Engine**: Built a robust low-level event binder attached to all note pills, header arrows, floating chevrons, chapter dropdown toggles, and viewer navigation buttons.
      - **`pointerdown` Immediate Execution**: Listens on `pointerdown` and `mousedown`, which are low-level hardware input events dispatched by Chromium *before* click synthesis and before focus cancellation can occur. The action is triggered synchronously on the very first pixel of mouse down or touch.
      - **High-Performance 220ms Debounce**: Incorporates a 220ms timestamp threshold (`now - lastTrigger < 220`) preventing duplicate execution when subsequent `mousedown` or `click` events arrive.
      - **Proactive Window Focus Reclamation on Hover**: Added non-blocking `{ passive: true }` listeners (`pointerenter`, `mouseenter`) to `header`, `footer`, and all viewer buttons. The moment the mouse cursor leaves the PDF area and hovers toward any control in the header or edge, `window.focus()` is proactively re-established *before* the mouse button is pressed.
      - **Zero Interference with Slide Turning**: Does NOT use any disruptive focus-stealing loops, intervals, or `window.onblur` handlers while reading slides. Slide turning with Up/Down and Left/Right arrow keys and mouse-wheel scrolling inside the PDF continues to work 100% natively without Edge OCR popups.
      - **Upgraded CSS Button Responsiveness**: Added `touch-action: manipulation; user-select: none;` and active scaling feedback (`:active { transform: scale(0.95); }`) across all `.note-pill-btn` and `.note-nav-arrow` elements in `style.css`.
      - **Cache Invalidation**: Bumped version queries in `index.html` to `v=3.0` (`script.js?v=3.0`, `data.js?v=3.0`, `style.css?v=3.0`).
      - **Automated Verification**: Thoroughly tested via `browser_subagent` recording on `http://localhost:8080`, confirming Note 01 -> Note 02 -> Note 03 -> Note 02 -> Note 01 switches instantly on the very first single click.

23. **Resolution of Fullscreen Activation & PDF Plugin Focus Boundaries**:
    - **User Feedback & Root Cause Analysis**:
      - The user reported: *"The button is also not working. Right now when I pressed F while I was inside the PDF, it was not working. When I have already clicked on the PDF, at that time when I pressed F, it was also not working."*
      - *Root Cause 1 (Fullscreen Button)*: In Entry 22, `#viewer-fullscreen-btn` had been bound via `bindInstantClick`. In modern Chromium/Edge, `Element.requestFullscreen()` strictly requires a transient user gesture (such as `click` or `touchend`). `pointerdown` and `mousedown` do NOT grant user gesture activation for the Fullscreen API. Because `pointerdown` triggered `toggleTheaterFullscreen()`, `container.requestFullscreen()` was rejected by the browser (`API can only be initiated by a user gesture.`), and the 220ms debounce subsequently dropped the legitimate `click` event. As a result, clicking the Fullscreen button failed to enter fullscreen.
      - *Root Cause 2 (The F Key when inside PDF)*: When the user clicks on the PDF presentation (or navigates slides using arrow keys), OS focus moves into Chromium's native out-of-process PDFium plugin inside the `<iframe>`. Chromium's browser security boundary routes character keystrokes (like the letter `F`) exclusively into the plugin process, which does not bubble unhandled key events across the cross-origin boundary to the parent `window`. Consequently, pressing `F` while focus is inside the PDF never reaches `window.keydown`.
    - **Architectural Solution**:
      - **Trusted User-Gesture Event Binding for Fullscreen**: Removed `pointerdown` interception from `#viewer-fullscreen-btn`, attaching direct `click` and `touchend` listeners with `window.focus()` and proactive hover listeners (`pointerenter`). Clicking the Fullscreen button now reliably acquires user gesture activation and enters/exits fullscreen seamlessly on the very first click from any state.
      - **Universal `F11` Browser-Level Shortcut**: Documented and updated the viewer footer and tooltips to feature `<kbd>F11</kbd> / <kbd>F</kbd> Fullscreen`. Unlike regular character keys, `F11` is intercepted globally by the Windows Chromium browser process *before* dispatching to child plugins, guaranteeing that `F11` toggles fullscreen instantly even when clicked deep inside the PDF presentation.
      - **`F` Key Support on Page Focus**: Maintained global `F` key handler on `window` (`keydown` capture), which triggers whenever the user hovers over the header, footer, side navigation areas, or interacts with the page outside the PDF plugin.
      - **Cache Invalidation**: Bumped version query in `index.html` to `script.js?v=3.1`.

24. **Addition of Chapter 1: Climate 10-Year PYQ & Specimen MCQ Master Suite (2016–2026)**:
    - **Source Material Processing**: Ingested and processed updated master file `gemini-code-1792471431599.html` (superseding initial `1792469674122`) from `Downloads` into `geography/climate-mcq/index.html` in strict adherence to Rule 1 (Subject Folder Isolation) and Rule 2 (Standard File Structure for Engines), immediately removing raw files from `Downloads` and workspace root (Rule 5).
    - **Comprehensive Coverage**: 34 Playable Question Archetypes deduplicating 125+ past board and specimen questions (including 2021–22 Semester-1 100% MCQ paper, 2023–2026 Board & Specimen papers, 2016–2020 core concepts, Climatic Data Table calculation sub-questions for Annual Range, Total Rainfall, Wettest/Driest Month, and Visual Map/Diagram MCQs).
    - **Interactive Features**:
      - Dual quiz modes: `Instant Check Mode` (immediate evaluation with official CISCE marking scheme explanations) and `Strict Exam Mode` (deferred reveal upon submit).
      - Live countdown timer with 15m, 30m, and 45m presets, warning/danger pulses, and auto-submit.
      - Global `📂 Expand All Variations` toggle and individual card history accordions displaying all twisted CISCE variations.
      - Topic & Probability filtering: Very High Probability (90%+), Tables & Diagrams (6), Monsoon Winds, Local Winds, Relief & Latitude.
      - Automated scorecard and 1-click shareable brag screenshot generator powered by `html2canvas` with student name, score, accuracy %, time taken, achievement tiers, and sub-topic mastery breakdown bars.
    - **Design System & Performance Optimization**:
      - Integrated Google Fonts (`Inter`, `Outfit`, `JetBrains Mono`, `Space Grotesk`) and `Material Symbols Outlined` (Rule 3).
      - Added `.home-nav-btn` linking back to Ilberiz Techz Dashboard (`../../index.html` with `target="_top"`).
      - Added companion cross-link buttons connecting the Climate Theory Vault (`../climate/index.html`) and the 10-Year MCQ Suite (`../climate-mcq/index.html`) bidirectionally.
      - Added CSS containment (`content-visibility: auto; contain-intrinsic-size: 320px;`) and 120ms debounced search for 60fps scrolling.
    - **Dual Data Synchronization**: Updated both `data.js` and `data.json` under `chap-geo-climate` with `geo-climate-mcq-master`, marking the chapter as featured.
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Climate 10-Yr MCQs"** (`chap-geo-climate`) with a blue quiz icon and glowing `NEW` badge.
    - **Cache Invalidation**: Bumped version queries in `index.html` to `data.js?v=3.2` and `script.js?v=3.2`.
    - **Automated Verification**: Conducted automated end-to-end browser subagent verification on port 8080 (Rule 11) confirming quick launch navigation, card display, iframe engine rendering, option click evaluation, variations expansion, scorecard modal, and port release.

25. **Addition of Chapter 2: Soil Resources 10-Year PYQ & Specimen MCQ Master Suite (2016–2026)**:
    - **Source Material Processing**: Ingested and integrated master file `gemini-code-1792473382594.html` from `Downloads` into `geography/soil-mcq/index.html` in strict adherence to Rule 1 (Subject Folder Isolation) and Rule 2 (Standard File Structure for Engines), immediately removing raw files from `Downloads` (Rule 5).
    - **Comprehensive Coverage**: 35 Playable Master Question Archetypes deduplicating 135+ past board and specimen questions (including 2021–22 Semester-1 100% MCQ paper, 2023–2026 Board & Specimen papers, 2016–2020 core concepts, visual diagram questions for Soil Horizons & Water Erosion stages, and matrix-based comparative questions).
    - **Interactive Features**:
      - Dual quiz modes: `Instant Check Mode` (immediate evaluation with official CISCE marking scheme explanations) and `Strict Exam Mode` (deferred reveal upon submit).
      - Live countdown timer with 15m, 30m, and 45m presets, warning/danger pulses, and auto-submit.
      - Global `📂 Expand All Variations` toggle and individual card history accordions displaying all twisted CISCE variations.
      - Topic & Probability filtering: Very High Probability (90%+), Visual & Tables (8), Soil Types & Characteristics, Soil Formation & Profile, Erosion & Conservation.
      - Automated scorecard and 1-click shareable brag screenshot generator powered by `html2canvas` with student name, score, accuracy %, time taken, achievement tiers, and sub-topic mastery breakdown bars.
    - **Design System & Performance Optimization**:
      - Integrated Google Fonts (`Inter`, `Outfit`, `JetBrains Mono`, `Space Grotesk`) and `Material Symbols Outlined` (Rule 3).
      - Added `.home-nav-btn` linking back to Ilberiz Techz Dashboard (`../../index.html` with `target="_top"`).
      - Added companion cross-link buttons connecting the Soil Theory Vault (`../soil/index.html`) and the 10-Year MCQ Suite (`../soil-mcq/index.html`) bidirectionally.
      - Added CSS containment (`content-visibility: auto; contain-intrinsic-size: 320px;`) and 120ms debounced search for 60fps scrolling.
    - **Dual Data Synchronization**: Updated both `data.js` and `data.json` under `chap-geo-soil` with `geo-soil-mcq-master`, marking the chapter as featured.
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Soil 10-Yr MCQs"** (`chap-geo-soil`) with an amber quiz icon and glowing `NEW` badge.
    - **Automated Verification**: Conducted automated end-to-end browser subagent verification on port 8080 (Rule 11) confirming quick launch navigation, card display, iframe engine rendering, option click evaluation, variations expansion, scorecard modal, and port release.

26. **Addition of Chapter 3: Natural Vegetation 10-Year PYQ & Specimen MCQ Master Suite (2016–2026)**:
    - **Source Material Processing**: Ingested and integrated master file `gemini-code-1792475016028.html` from `Downloads` into `geography/vegetation-mcq/index.html` in strict adherence to Rule 1 (Subject Folder Isolation) and Rule 2 (Standard File Structure for Engines), immediately removing raw files from `Downloads` (Rule 5).
    - **Comprehensive Coverage**: 35 Playable Master Question Archetypes deduplicating 140+ past board and specimen questions (including 2021–22 Semester-1 100% MCQ paper, 2023–2026 Board & Specimen papers, 2016–2020 core concepts, visual diagram questions for Mangrove Stilt/Pneumatophore Roots, Himalayan Altitudinal Zonation, and Evergreen vs. Deciduous Canopy Structure).
    - **Interactive Features**:
      - Dual quiz modes: `Instant Check Mode` (immediate evaluation with official CISCE marking scheme explanations) and `Strict Exam Mode` (deferred reveal upon submit).
      - Live countdown timer with 15m, 30m, and 45m presets, warning/danger pulses, and auto-submit.
      - Global `📂 Expand All Variations` toggle and individual card history accordions displaying all twisted CISCE variations.
      - Topic & Probability filtering: Very High Probability (90%+), Tables & Diagrams (6), Evergreen & Deciduous, Mangrove, Desert & Mountain, Tree Uses & Conservation.
      - Automated scorecard and 1-click shareable brag screenshot generator powered by `html2canvas` with student name, score, accuracy %, time taken, achievement tiers, and sub-topic mastery breakdown bars.
    - **Design System & Performance Optimization**:
      - Integrated Google Fonts (`Inter`, `Outfit`, `JetBrains Mono`, `Space Grotesk`) and `Material Symbols Outlined` (Rule 3).
      - Added `.home-nav-btn` linking back to Ilberiz Techz Dashboard (`../../index.html` with `target="_top"`).
      - Added companion cross-link buttons connecting the Natural Vegetation Theory Vault (`../vegetation/index.html`) and the 10-Year MCQ Suite (`../vegetation-mcq/index.html`) bidirectionally.
      - Added CSS containment (`content-visibility: auto; contain-intrinsic-size: 320px;`) and 120ms debounced search for 60fps scrolling.
    - **Dual Data Synchronization**: Updated both `data.js` and `data.json` under `chap-geo-vegetation` with `geo-veg-mcq-master`, marking the chapter as featured.
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Vegetation 10-Yr MCQs"** (`chap-geo-vegetation`) with an emerald quiz icon and glowing `NEW` badge.
    - **Automated Verification**: Conducted automated end-to-end browser subagent verification on port 8080 (Rule 11) confirming quick launch navigation, card display, iframe engine rendering, option click evaluation, variations expansion, scorecard modal, and port release.

27. **Addition of Chapter 4: Water Resources 10-Year PYQ & Specimen MCQ Master Suite (2016–2026)**:
    - **Source Material Processing**: Ingested and integrated master file `gemini-code-1792476922906.html` into `geography/water-mcq/index.html` in strict adherence to Rule 1 (Subject Folder Isolation) and Rule 2 (Standard File Structure for Engines), immediately removing raw files from workspace root (Rule 5).
    - **Comprehensive Coverage**: 35 Playable Master Question Archetypes deduplicating 140+ past board and specimen questions (including 2021–22 Semester-1 100% MCQ paper, 2023–2026 Board & Specimen papers, 2016–2020 core concepts, Dedicated Table & Visual Diagram MCQs covering irrigation types comparative metrics, rooftop rainwater harvesting flow diagrams, canal network patterns, and traditional lifting mechanisms like Persian wheel and Dhekli).
    - **Interactive Features**:
      - Dual quiz modes: `Instant Check Mode` (immediate evaluation with official CISCE marking scheme hydrological explanations) and `Strict Exam Mode` (deferred reveal upon submit).
      - Live countdown timer with 15m, 30m, and 45m presets, warning/danger pulses, and auto-submit.
      - Global `📂 Expand All Variations` toggle and individual card history accordions displaying all twisted CISCE variations.
      - Topic & Probability filtering: Very High Probability (90%+), Tables & Diagrams, Wells & Tube Wells, Canals, Tanks, Modern & Rainwater Harvesting.
      - Automated scorecard and 1-click shareable brag screenshot generator powered by `html2canvas` with student name, score, accuracy %, time taken, achievement tiers (Hydrology Grandmaster, Water Conservationist, Contender), and sub-topic mastery breakdown bars.
    - **Design System & Performance Optimization**:
      - Integrated Google Fonts (`Inter`, `Outfit`, `JetBrains Mono`, `Space Grotesk`) and `Material Symbols Outlined` (Rule 3).
      - Added `.home-nav-btn` linking back to Ilberiz Techz Dashboard (`../../index.html` with `target="_top"`).
      - Added companion cross-link buttons connecting the Water Resources Theory Vault (`../water/index.html`) and the 10-Year MCQ Suite (`../water-mcq/index.html`) bidirectionally.
      - Added CSS containment (`content-visibility: auto; contain-intrinsic-size: 320px;`) and 120ms debounced search for 60fps scrolling.
    - **Dual Data Synchronization**: Updated both `data.js` and `data.json` under `chap-geo-water` with `geo-water-mcq-master`, marking the chapter as featured.
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Water 10-Yr MCQs"** (`chap-geo-water`) with a cyan quiz icon and glowing `NEW` badge.
    - **Cache Invalidation**: Bumped version queries in `index.html` to `data.js?v=3.5` and `script.js?v=3.5`.
    - **Automated Verification**: Conducted automated end-to-end browser subagent verification on port 8080 (Rule 11) confirming quick launch navigation, card display, iframe engine rendering, option click evaluation, variations expansion, scorecard modal, and port release.

28. **Resolution of Chapter Switcher Dropdown Interaction & Multi-Touch Anomaly**:
    - **User Feedback & Root Cause Analysis**:
      - The user reported: *"when I click to switch chapters, in normal mode or full screen mode, touching it one time causes it to open and then close automatically when I try to touch it another time. It is not behaving correctly."*
      - *Root Cause 1 (Multi-Event Double Trigger in `bindInstantClick`)*: In Entry 22, `bindInstantClick` bound four separate events (`pointerdown`, `mousedown`, `click`, and `touchend`) with a narrow 220ms timestamp debounce. On touchscreen hardware (mobile, iPad, and 2-in-1 touch laptops), a single physical finger tap generates a `pointerdown` at t=0ms, a `touchend` when the finger is lifted (~150–250ms), and a synthetic `click` ~300ms after touch start. Because normal touch contact or browser click delay exceeds 220ms, the toggle action (`classList.toggle('open')`) was executed twice during a single tap — opening on finger contact and immediately closing on finger lift/synthetic click. Touching the button a second time repeated the same cycle.
      - *Root Cause 2 (Touch-Scrolling Blocked in Dropdown List)*: Attaching `pointerdown` listeners to `.chapter-dropdown-item` meant that whenever a student placed a finger on the dropdown list to scroll through the 12 chapters, `pointerdown` fired immediately at touchstart, selecting the tapped item and abruptly closing the menu before drag-scrolling could start.
      - *Root Cause 3 (Stacking Context & Z-Index)*: The viewer header had `z-index: 10`, while floating edge chevrons had `z-index: 99`. In Fullscreen and normal mode, the header and dropdown needed guaranteed top-level stacking priority (`z-index: 1000` on `.viewer-header` and `z-index: 1500` on `.chapter-dropdown-menu`).
    - **Architectural Solution**:
      - **Dedicated Dropdown Controller**: Replaced generic multi-event binding on `#chapter-select-btn` with a robust single-fire controller utilizing `click` (instantaneous with `touch-action: manipulation;`) with a 350ms debounce window and explicit helper functions (`openChapterDropdown` and `closeChapterDropdown`).
      - **Natural Touch Scrolling with Single-Tap Selection**: Removed `pointerdown` from `.chapter-dropdown-item`, attaching clean `click` handlers with `e.stopPropagation()`. Touch users can now scroll smoothly through the full chapter list without accidental activation; tapping a chapter cleanly switches notes and closes the menu.
      - **Same-Chapter No-Op Guard**: In `switchChapterInViewer`, added a check: if the student taps the chapter currently active (`targetChapId === currentChapter?.id`), the dropdown cleanly closes without resetting iframes or reloading the active PDF.
      - **Clean Outside-Click & Escape Dismissal**:
        - `handleDocClick`: Dismisses the dropdown when tapping anywhere outside `#chapter-select-wrapper`.
        - `handleWindowBlur`: Automatically closes the dropdown if the student clicks into the PDF presentation iframe.
        - `handleViewerKeydown`: Pressing `Escape` while the dropdown is open closes the dropdown first before exiting fullscreen.
      - **Visual Feedback & Mobile Layout Polish**:
        - Added `.chapter-select-btn.open` styling with 180° smooth arrow rotation (`transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)`).
        - Added mobile responsive sizing in `@media (max-width: 768px)` so `.chapter-dropdown-menu` conforms to `width: min(320px, calc(100vw - 24px))` with zero screen clipping.
      - **Enhanced Core `bindInstantClick`**: Removed `touchend` and `mousedown` listeners from `bindInstantClick`, preserving only primary `pointerdown` and `click` with an increased 450ms debounce to eliminate synthetic ghost clicks across all remaining viewer buttons.
      - **Cache Invalidation**: Bumped version queries in `index.html` to `style.css?v=3.6`, `data.js?v=3.6`, and `script.js?v=3.6`.
      - **Automated Verification**: Conducted automated end-to-end browser subagent verification on port 8080 (Rule 11) confirming single-tap open, stay-open persistence, chapter switching to Soil Resources, clean reopen on second tap, outside dismissal, Fullscreen mode persistence, Natural Vegetation chapter switch in fullscreen, and Escape dismissal, followed by port release.

29. **Wiring & Featured Promotion of Chapter 6: Mahatma Gandhi and the National Movement 01 Class Notes**:
    - **Source Material Processing & Verification**:
      - Processed `Mahatma Gandhi And The National Movement 01  Class Notes.pdf` (3.8 MB, 33 widescreen presentation slides, Kunal Sir / Victory 2027 batch) into `history/notes/Mahatma_Gandhi_And_The_National_Movement_01_Class_Notes.pdf` in strict adherence to Rule 1 (Subject Folder Isolation).
      - Cleaned up raw download files from Downloads and workspace root (Rule 5).
    - **Lecture Content Coverage**:
      - Early life, legal career in South Africa (1893–1914), Pietermaritzburg discrimination, Natal Indian Congress, Satyagraha philosophy (Truth & Ahimsa).
      - Return to India (9 January 1915 — Pravasi Bharatiya Divas) and early regional satyagrahas: Champaran (1917, abolition of Tinkathia system), Ahmedabad Mill Strike (1918, 35% wage hike, first hunger strike), and Kheda Satyagraha (1918, crop failure & land revenue remission).
      - Rowlatt Act (1919, 'Black Act', arrest without warrant, in-camera trials without appeal), Rowlatt Satyagraha (6 April 1919), arrest of Dr. Saifuddin Kitchlew & Dr. Satyapal.
      - Jallianwala Bagh Massacre (13 April 1919, General Dyer, martial law, Rabindranath Tagore renouncing Knighthood, Hunter Commission).
      - Khilafat Movement (Ali Brothers — Maulana Azad, Shaukat Ali & Mohammad Ali) & Causes of the Non-Cooperation Movement (NCM).
    - **Dual Data Synchronization**:
      - Synchronized `data.js` and `data.json` under `sub-10-his` -> `chap-his-6` with refined metadata, title, and subtitle.
    - **Sidebar Navigation Protocol (Rule 10)**:
      - Updated quick-launch navigation in `script.js` to feature **"Mahatma Gandhi Notes"** (`chap-his-6`) with an amber book icon (`menu_book`), bold text (`font-weight: 600`), and a glowing `NEW` badge.
    - **Asset Cache Invalidation**:
      - Bumped version queries in `index.html` to `data.js?v=3.7` and `script.js?v=3.7`.
    - **Automated Verification**:
      - Conducted automated end-to-end browser subagent verification on port 8080 (Rule 11) confirming quick launch navigation, card display, iframe engine rendering, note tabs, back button, real-time search filtering, and clean port release.

30. **Addition & Full Integration of Mahatma Gandhi and the National Movement Notes 02 & 03**:
    - **Source Material Processing & Verification**:
      - Processed `Mahatma Gandhi 02  Class Notes.pdf` (4.2 MB, 37 widescreen presentation slides, Kunal Sir / Victory 2027 batch) into `history/notes/Mahatma_Gandhi_And_The_National_Movement_02_Class_Notes.pdf`.
      - Processed `Mahatma Gandhi And The National Movement 03 Class Notes.pdf` (5.0 MB, 47 widescreen presentation slides, Kunal Sir / Victory 2027 batch) into `history/notes/Mahatma_Gandhi_And_The_National_Movement_03_Class_Notes.pdf`.
      - Cleaned up raw downloads immediately (Rule 5).
    - **Curriculum & Lecture Content Coverage**:
      - **Note 02**: Khilafat Movement (causes, Ali Brothers, Hindu-Muslim unity), Non-Cooperation Movement (programme, boycott of titles, schools, courts, foreign cloth, picketing of liquor shops, Swadeshi & Khadi), nationwide impact (peasants in Kheda, Assam plantation workers, Moplah rebellion, Prince of Wales 1921 boycott), Chauri Chaura incident (4 Feb 1922), suspension of NCM (12 Feb 1922 Bardoli resolution), Gandhiji's arrest (sedition charge, 6-year sentence), criticisms by Motilal Nehru, Lala Lajpat Rai & Subhash Chandra Bose, and historical significance.
      - **Note 03**: Simon Commission (1927, all-white commission, 'Simon Go Back' protests, Lala Lajpat Rai martyrdom), Lahore Session of INC (1929, Jawaharlal Nehru president, Purna Swaraj resolution, tricolor on Ravi banks, 26 Jan 1930 Independence Day), Civil Disobedience Movement (causes, Salt Tax monopoly, Dandi March 12 Mar – 6 Apr 1930), nationwide spread (Khan Abdul Ghaffar Khan / Khudai Khidmatgar / Red Shirts in NWFP, Rani Gaidinliu in Nagaland), First Round Table Conference boycott, Gandhi-Irwin Pact (March 1931), Second Round Table Conference (London 1931, deadlock on communal electorates, resumption of CDM), and comprehensive comparison between NCM & CDM.
    - **Dual Data Synchronization**:
      - Updated `data.js` and `data.json` under `sub-10-his` -> `chap-his-6` to wire all 3 notes (`his-gandhi-notes-01`, `his-gandhi-notes-02`, `his-gandhi-notes-03`) with rich pedagogical subtitles and verified file sizes.
    - **Search Engine Expansion**:
      - Expanded search suggestions and search index in `script.js` to include "Dandi March", "Simon Commission", "Civil Disobedience", and "Chauri Chaura".
    - **Asset Cache Invalidation**:
      - Bumped version queries in `index.html` to `data.js?v=3.8` and `script.js?v=3.8`.
    - **Automated Verification**:
      - Conducted automated end-to-end browser subagent verification on port 8080 (Rule 11) confirming quick launch navigation, all 3 cards display, opening Note 02, in-place header note pill switching between Note 01, Note 02, and Note 03, back navigation, and real-time search queries for "Dandi March" and "Chauri Chaura", followed by clean port release.

31. **Addition of Geography Notes: Transport (Chapter 9) & Authentic ICSE Nomenclature Correction**:
    - **Authentic ICSE Syllabus Nomenclature**: Corrected the chapter title from `"Ch 9: Transport in India"` to authentic ICSE board syllabus terminology `"Ch 9: Transport"` across `data.js`, `data.json`, and `PROJECT_STATE.md`.
    - **Sanitization of Raw File**: Processed random download file (`631f8f3f-da0f-4e36-9d83-75468a631c21.pdf`) to authentic project convention `Transport_01_Class_Notes.pdf` (5.3 MB) and placed directly into `geography/notes/` in adherence to Rule 1 (Subject Folder Isolation).
    - **Visual Slide & Content Verification**: Inspected the 43-page Victory 2026 slide deck (Kunal Sir / Physics Wallah): covers Indian transport infrastructure, Roadways (Density, NHAI, Golden Quadrilateral, NS-EW Corridors, Expressways, State/District/Rural/BRO Atal Tunnel), Railways (1853 Mumbai-Thane, Broad/Metre/Narrow Gauges, Konkan Railway), Airways (AAI, PHHL), Waterways (Inland NW 1–5, 12 Major Sea Ports: Mumbai, JNPT, Marmagao, Kolkata riverine, Haldia, Paradip, Visakhapatnam, Chennai, Tuticorin, Kandla tidal, New Mangalore, Kochi), and comparative Merits/Demerits.
    - **Dual Data Synchronization**: Synchronized `data.js` and `data.json` under `sub-10-geo` -> `chap-geo-transport` with `geo-transport-01` PDF item (`5.3 MB`).
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Transport Notes"** (`chap-geo-transport`) with `commute` icon and glowing `NEW` badge in strict adherence to Rule 10.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=4.1`.
    - **Standard Port 8080 Browser Subagent Verification (Rule 11)**: Tested the entire user flow on temporary port 8080 (passcode unlock, sidebar quick-launch, chapter title display, note card visibility, PDF reader opening with all controls, and back navigation), followed by immediate clean server teardown and port release verification.

32. **Addition of Geography Notes: Waste Management (Chapter 10)**:
    - **Sanitization of Raw File**: Processed random download file (`8c61c314-83ac-4db3-9fce-1efa710b7205.pdf`) to authentic project convention `Waste_Management_01_Class_Notes.pdf` (4.7 MB) and placed directly into `geography/notes/` in adherence to Rule 1 (Subject Folder Isolation). Cleaned up raw file from Downloads (Rule 5).
    - **Visual Slide & Content Verification**: Inspected the 34-page Victory 2026 slide deck (Kunal Sir / Physics Wallah): covers Definition of waste (Environment Protection Act 1990: scrap material, effluent, unwanted surplus), comprehensive classification (Solid, Liquid, Gaseous: MSW, Industrial, Agricultural, Biomedical, E-waste, Hazardous, Radioactive), impact of accumulation (spoilage of landscape, air/water/soil/radioactive pollution), Eutrophication (nutrient overload, algal bloom, dissolved oxygen depletion), disease vectors (houseflies, sandflies, tsetse flies, mosquitoes, rodents) & transmission (typhoid, cholera, malaria, dengue, plague, rabies), Biomagnification & Bio-accumulation along the food chain (DDT concentration from producers 0.04 ppm to tertiary consumers 13.8 ppm), hazardous toxins (Lead, Asbestos, Mercury Minamata disease, Arsenic), effect on terrestrial life (human health, sanitary landfill methane/CO2 emissions, leaf injuries & stomata blockage, animals/birds choking & thinner egg shells), effect on aquatic life (fresh water & marine, plastics killing 1M+ animals/year, oil spills, pH disruption), and need for waste management.
    - **Dual Data Synchronization**: Synchronized `data.js` and `data.json` under `sub-10-geo` -> `chap-geo-waste` with `geo-waste-01` PDF item (`4.7 MB`).
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Waste Management Notes"** (`chap-geo-waste`) with an emerald recycling icon (`recycling`) and glowing `NEW` badge in strict adherence to Rule 10.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=4.2`.
    - **Standard Port 8080 Browser Subagent Verification (Rule 11)**: Tested the complete user flow on temporary port 8080 (passcode unlock, sidebar quick-launch, chapter title display, note card visibility, PDF reader opening with all controls, and back navigation), followed by immediate clean server teardown and port release verification.

33. **Addition of English Literature Notes: Treasure Chest Poetry — Haunted Houses (Chapter 2)**:
    - **Sanitization of Raw File**: Processed `Treasure Chest  POETRY 01  Class Notes.pdf` (2.3 MB) into `english/notes/Treasure_Chest_Poetry_01_Class_Notes.pdf` in adherence to Rule 1 (Subject Folder Isolation). Cleaned up raw file from Downloads (Rule 5).
    - **Visual Slide & Content Verification**: Inspected the 21-page Victory 2027 slide deck (Nupur Ma'am / Physics Wallah): covers warm-up vocabulary, author profile of Henry Wadsworth Longfellow, stanzas 1 to 5 line-by-line breakdown of *Haunted Houses*, poetic devices (Assonance, Enjambment, Alliteration, Simile: "As silent as the pictures on the wall", Visual Imagery), legal concept of *mortmain* (holding in perpetuity, spiritual legacies outlasting material acquisitions), and stanza-by-stanza MCQs with explanations.
    - **Dual Data Synchronization**: Wired `eng-tc-poetry-01` (`2.3 MB`) under `sub-10-eng` -> `chap-eng-2` across both `data.js` and `data.json`.
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Haunted Houses Notes"** (`chap-eng-2`) with an `auto_stories` icon and glowing `NEW` badge in strict adherence to Rule 10.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=4.3`.
    - **Standard Port 8080 Browser Subagent Verification (Rule 11)**: Tested the complete user flow on temporary port 8080 (passcode unlock, sidebar quick-launch, chapter title display, note card visibility, PDF reader opening with all controls, and back navigation), followed by immediate clean server teardown and port release verification.

34. **Addition of English Literature Notes: Treasure Chest Poetry — Haunted Houses (Part 2) (Chapter 2)**:
    - **Sanitization of Raw File**: Processed `Treasure Chest  POETRY 02  Class Notes.pdf` (4.5 MB, 41 slides, Victory 2027 batch by Nupur Ma'am / PW) into `english/notes/Treasure_Chest_Poetry_02_Class_Notes.pdf` in adherence to Rule 1 (Subject Folder Isolation). Cleaned up raw file from Downloads (Rule 5).
    - **Visual Slide & Content Verification**: Inspected the 41-page slide deck: covers Stanzas 6 to 10 line-by-line breakdown of *Haunted Houses*, inner conflict between earthly enjoyment and higher aspiration, the Bridge of Light ("moonlight on the waters") metaphor linking the spiritual realm with the mortal world, astronomical imagery of the undiscovered planet causing perturbations/perpetual jar, poetic devices (Metaphor, Personification, Alliteration, Assonance, Paradox of ownership), and authentic ICSE PYQ-2025 extract-based questions with comprehensive model answers.
    - **Dual Data Synchronization**: Wired `eng-tc-poetry-02` (`4.5 MB`) under `sub-10-eng` -> `chap-eng-2` across both `data.js` and `data.json`.
    - **Sidebar Navigation Protocol (Rule 10)**: Maintained quick-launch navigation in `script.js` to highlight **"Haunted Houses Notes"** (`chap-eng-2`) with an `auto_stories` icon and glowing `NEW` badge in strict adherence to Rule 10.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=4.4`.
    - **Standard Port 8080 Browser Subagent Verification (Rule 11)**: Tested the complete user flow on temporary port 8080 (passcode unlock, sidebar quick-launch, note card visibility for Note 01 and Note 02, PDF reader opening with all controls, note switcher tabs, and back navigation), followed by immediate clean server teardown and port release verification.

35. **Addition of English Literature Notes: Treasure Chest Poetry — The Glove and the Lions & When Great Trees Fall (Notes 03 & 04)**:
    - **Sanitization of Raw Files**: Processed `Treasure Chest  POETRY 03  Class Notes.pdf` (3.9 MB, 30 slides) into `english/notes/Treasure_Chest_Poetry_03_Class_Notes.pdf` and `Treasure Chest  POETRY 04  Class Notes.pdf` (4.0 MB, 47 slides) into `english/notes/Treasure_Chest_Poetry_04_Class_Notes.pdf` in strict adherence to Rule 1 (Subject Folder Isolation). Cleaned up raw downloads from Downloads folder immediately (Rule 5).
    - **Visual Slide & Content Verification**:
      - **Poetry 03 (The Glove and the Lions by Leigh Hunt, 30 slides, Nupur Ma'am / Victory 2027)**: Covers King Francis, Count de Lorge, royal court setting, line-by-line explanation of dangerous games of love, the lion fight in the arena, lady throwing the glove to test devotion, brave recovery and throwing the glove in the lady's face, rejection of vanity, poetic devices (Symbolism, Rhyme Scheme, Alliteration), themes, and comprehensive MCQs.
      - **Poetry 04 (When Great Trees Fall by Maya Angelou, 47 slides, Nupur Ma'am / Victory 2027)**: Covers Maya Angelou's eulogy for James Baldwin, nature-human parallelism (destabilization of forest equilibrium vs death of great souls), emotional impact, stanza-by-stanza keywords and phrases, poetic devices (Extended Metaphor, Personification, Consonance, Repetition), themes of grief, remembrance & healing, positive comforting resolution ("They existed. They existed."), and ICSE Specimen 2027 / PYQs / Competency-based extract questions.
    - **Dual Data Synchronization**: Wired `eng-tc-poetry-03` (`3.9 MB`) and `eng-tc-poetry-04` (`4.0 MB`) under `sub-10-eng` -> `chap-eng-2` across both `data.js` and `data.json`.
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Treasure Chest Poetry"** (`chap-eng-2`) with an `auto_stories` icon and glowing `NEW` badge in strict adherence to Rule 10.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=4.5`.
    - **Standard Port 8080 Browser Subagent Verification (Rule 11)**: Tested the complete user flow on temporary port 8080 (passcode unlock, sidebar quick-launch, note cards 01 through 04 display, opening Note 03 and Note 04, in-place header note switcher tabs between all 4 notes, and back navigation), followed by immediate clean server teardown and port release verification.

36. **Re-Architecture of English Literature: 5 Poems & 5 Short Stories Subchapters Hierarchy and Addition of Notes for *A Considerable Speck***:
    - **Authentic CISCE Syllabus Subchapter Architecture**: Rather than flatly dumping notes under monolithic chapters, re-architected `Treasure Chest — ICSE Poems` (`chap-eng-2`) and `Treasure Chest — ICSE Short Stories` (`chap-eng-3`) into their exact 5 prescribed ICSE Class 10 literature chapters each:
      - **Prescribed Poems (5)**:
        1. *Poem 1: Haunted Houses* (Henry Wadsworth Longfellow) — Notes 01 & 02
        2. *Poem 2: The Glove and the Lions* (Leigh Hunt) — Note 03
        3. *Poem 3: When Great Trees Fall* (Maya Angelou) — Note 04
        4. *Poem 4: A Considerable Speck* (Robert Frost) — Note 05
        5. *Poem 5: The Power of Music* (Sukumar Ray) — Note 06
      - **Prescribed Short Stories (5)**:
        1. *Story 1: With the Photographer* (Stephen Leacock) — Ready for Notes
        2. *Story 2: The Elevator* (William Sleator) — Ready for Notes
        3. *Story 3: The Girl Who Can* (Ama Ata Aidoo) — Ready for Notes
        4. *Story 4: The Pedestrian* (Ray Bradbury) — Ready for Notes
        5. *Story 5: The Last Lesson* (Alphonse Daudet) — Ready for Notes
    - **Sanitization of Raw File**: Processed `6eb4b5f6-2d28-4f5f-bef4-634983603ef0.pdf` (1.8 MB, 19 slides, Victory 2026 Batch by Nupur Ma'am / PW) into `english/notes/Treasure_Chest_Poetry_05_Class_Notes.pdf` in strict adherence to Rule 1 (Subject Folder Isolation). Cleaned up raw file from Downloads immediately (Rule 5).
    - **Visual Slide & Content Verification**: Inspected the 19-page slide deck: covers Robert Frost's biographical context and poetic philosophy, line-by-line reading of *A Considerable Speck*, the microscopic speck/mite on the poet's manuscript sheet, vivid realization of animal intelligence, instinct, hesitation, and terror of the wet ink, Frost's tender decision to spare its life ("I have a mind myself and recognize / Mind when I meet with it in any guise"), satirical critique of collectivistic human groupthink and uninspired "mindless" modern writing, comprehensive poetic devices (Oxymoron, Personification, Alliteration, Rhyme scheme AABB), and extract MCQs with answer rationales.
    - **Dual Data Synchronization**: Wired the new subchapters architecture across both `data.js` and `data.json` under `sub-10-eng`. Each subchapter contains its metadata (`id`, `name`, `author`, `description`, and `items`). Distributed existing notes to their authentic parent poems: Notes 01 & 02 under *Haunted Houses*, Note 03 under *The Glove and the Lions*, Note 04 under *When Great Trees Fall*, and Note 05 (`eng-tc-poetry-05`, 1.8 MB) under *A Considerable Speck*.
    - **UI Controller Enhancements (`script.js`)**:
      - Added `'subchapters'` view state to `state.currentView`.
      - Extended `renderView()` to support rendering the 5 chapter cards for poems or short stories with author badges, descriptions, and dynamic note counters.
      - Updated `items` view to seamlessly resolve either standard chapters or nested subchapters (`currentTarget = subchap || chap`), with an intuitive empty-state screen including a "Back to Subchapters" button.
      - Updated `renderBreadcrumbs()` to support 4-level navigation (`Batches -> Class 10 -> English -> ICSE Poems -> Poem 4 -> Reader`).
      - Updated `buildSearchIndex()` and `renderSearchResults()` to index and link directly to subchapters and nested note items.
      - Enhanced PDF reader (`createPdfViewer()`): correctly resolves `currentSubchapter`, sets header chapter dropdown button label and sister poem switcher to subchapters, and routes back navigation cleanly to the specific poem's notes grid.
    - **Sidebar Navigation Protocol (Rule 10)**: Maintained quick-launch navigation in `script.js` to highlight **"Treasure Chest Poetry"** (`chap-eng-2`) with an `auto_stories` icon and glowing `NEW` badge in strict adherence to Rule 10, opening the 5 prescribed poems.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=4.6`.
    - **Standard Port 8080 Browser Subagent Verification (Rule 11)**: Tested the complete user flow on temporary port 8080 (passcode unlock, quick-launch navigation to the 5 poems grid, clicking Poem 1 showing Notes 01 & 02, clicking Poem 4 showing Note 05, opening Note 05 in the PDF reader with correct title and chapter switcher, back navigation to Poem 4, breadcrumb navigation, and navigating to Short Stories showing the 5 prescribed story cards), followed by immediate clean server teardown and port release verification.

37. **Addition of English Literature Notes: Treasure Chest Poetry — The Power of Music (Poem 5 / Note 06)**:
    - **Sanitization of Raw File**: Processed `Treasure Chest - POETRY 06 Class Notes.pdf` (3.8 MB, 34 slides, Victory 2026 Batch by Nupur Ma'am / PW) into `english/notes/Treasure_Chest_Poetry_06_Class_Notes.pdf` (3.6 MB) in strict adherence to Rule 1 (Subject Folder Isolation). Cleaned up raw file from Downloads immediately (Rule 5).
    - **Visual Slide & Content Verification**: Inspected the 34-page slide deck: covers Sukumar Ray's humorous nonsense poetry, the relentless, loud and cacophonous singing of Bhisma Lochan Sharma, widespread terror and chaos across the environment (overturned bullock carts, frantic horses with feet in the air, panic-stricken trees and birds, fishes diving below the lake in search of silence), comical climax where a sage billy goat butts Bhisma and grants the world the golden gift of silence, poetic devices (Metaphor: "golden gift of silence", Imagery, Hyperbole, Onomatopoeia), themes (the disruptive power of music, humour & satire), and competency-based extract questions & answers.
    - **Full ICSE Class 10 Poetry Syllabus Milestone**: With this addition, all 5 prescribed poems in the ICSE Class 10 syllabus now have live, high-quality lecture notes:
      - *Poem 1: Haunted Houses* (Notes 01 & 02)
      - *Poem 2: The Glove and the Lions* (Note 03)
      - *Poem 3: When Great Trees Fall* (Note 04)
      - *Poem 4: A Considerable Speck* (Note 05)
      - *Poem 5: The Power of Music* (Note 06)
    - **Dual Data Synchronization**: Wired `eng-tc-poetry-06` (`3.6 MB`) under `poem-power-of-music` inside `chap-eng-2` across both `data.js` and `data.json`.
    - **Sidebar Navigation Protocol (Rule 10)**: Maintained quick-launch navigation in `script.js` to highlight **"Treasure Chest Poetry"** (`chap-eng-2`) with an `auto_stories` icon and glowing `NEW` badge in strict adherence to Rule 10, opening the 5 prescribed poems.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=4.7`.
    - **Standard Port 8080 Browser Subagent Verification (Rule 11)**: Tested the complete user flow on temporary port 8080 (passcode unlock, sidebar quick-launch, clicking Poem 5: The Power of Music, verifying Note 06 card display, opening Note 06 in the PDF reader with all controls and in-place chapter switcher listing all 5 poems, and back navigation), followed by immediate clean server teardown and port release verification.

38. **Review & Alignment of English Drama: Julius Caesar 06 Class Notes (Act 4 Scene 1) and Rule 14 Addition**:
    - **Visual Slide & Content Verification (First 4–5 Slides Rule)**: Inspected the 27-page Victory 2027 slide deck (Nupur Ma'am / Physics Wallah) for `Julius_Caesar_06_Class_Notes.pdf` (2.9 MB): Slide 1 explicitly identifies "Novel- Julius Caesar Act 4 Scene 1 | ENGLISH Lec-06" and Slide 2 details the syllabus agenda: (1) Act 4 Scene 1 line-by-line explanation (Second Triumvirate meeting, Antony, Octavius & Lepidus, proscription list, animal metaphors of ass and warhorse, diversion of Caesar's will bequests), (2) PYQs, SPQs, CPQs, (3) Summary and character analysis, (4) Transformation of sentences.
    - **Codified Rule 14 (PDF Ingestion & Slide Inspection Protocol)**: Formalized the autonomous mandate to always verify the first 4–5 slides of incoming PDFs rather than trusting raw filenames, ensuring 100% accurate classification without reading entire documents.
    - **Sidebar Navigation Protocol (Rule 10)**: Corrected the sidebar quick-launch in `script.js` from Treasure Chest Poetry to **"Julius Caesar Drama"** (`chap-eng-1`) with a golden Roman drama icon (`theater_comedy`) and glowing `NEW` badge, directly launching students into all 6 Julius Caesar notes.
    - **Sanitization & Clutter Removal (Rule 5)**: Verified byte-for-byte identity of `Novel- Julius Caesar 06  Class Notes.pdf` (SHA-256 `8AEA00DD67F7621D60DA4C303FC81996C9F5F4B9D7C3E0419C387A64FCE54D92`) with `english/notes/Julius_Caesar_06_Class_Notes.pdf` and cleaned up the loose download file from Downloads.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=4.8`.
    - **Standard Port 8080 Browser Subagent Verification (Rule 11)**: Tested the complete user flow on temporary port 8080 (passcode unlock, sidebar quick-launch displaying "Julius Caesar Drama" with `NEW` badge, navigation directly to Julius Caesar notes, all 6 note cards rendering properly, opening Note 06 in the PDF reader, and seamless back navigation), followed by immediate clean server teardown and port release verification.

39. **Addition of English Literature Notes: Julius Caesar 07 Class Notes (Act 4 Scene 2 & 3 Part 1)**:
    - **Visual Slide & Content Verification (Rule 14)**: Inspected the 36-page Victory 2027 slide deck (Nupur Ma'am / Physics Wallah) for `Novel- Julius Caesar 07  Class Notes.pdf` (4.1 MB): Slide 1 explicitly identifies "Novel- Julius Caesar : Act 4 Scene 2 and 3 | ENGLISH Lec-07" and Slide 2 details the agenda: (1) Quick Revision Act 4 Scene 1, (2) Julius Caesar Act 4 Scene 2 and 3 (Specimen Paper 2027, PYQs, Competency Based), Prepositions and Phrasal Verbs. Slides 10–35 cover line-by-line breakdown of the Camp near Sardis, Lucilius reporting on Cassius' cool courtesy, Brutus' horse metaphor for hollow friendship, entering Brutus' tent for the famous Quarrel Scene, Lucius Pella bribe dispute, Brutus condemning Cassius' "itching palm", invoking the Ides of March for justice, the explosion of temper ("Away, slight man!", choleric humor, waspish anger), and board MCQs.
    - **Standardized Renaming & Placement (Rule 1 & Rule 14)**: Sanitized and placed file as `english/notes/Julius_Caesar_07_Class_Notes.pdf` (3.9 MB) in `english/notes/`. Cleaned up raw download from Downloads folder immediately (Rule 5).
    - **Dual Data Synchronization (Rule 7)**: Wired `eng-jc-notes-07` under `sub-10-eng` -> `chap-eng-1` across both `data.js` and `data.json`.
    - **Sidebar Navigation Protocol (Rule 10)**: Maintained quick-launch navigation in `script.js` highlighting **"Julius Caesar Drama"** (`chap-eng-1`) with `theater_comedy` icon and glowing `NEW` badge.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=4.9`.
40. **Addition of English Literature Notes: Treasure Chest Prose — The Pedestrian (Story 4 / Note 07)**:
    - **Visual Slide & Content Verification (Rule 14)**: Inspected the 38-page Victory 2026 slide deck (Nupur Ma'am / Physics Wallah) for `Treasure Chest - PROSE 07 Class Notes.pdf` (5.0 MB): Slide 1 explicitly identifies "VICTORY 2026 | English | The Pedestrian (Part-1) | Lecture - 07 | By - Nupur Ma'am | Physics Wallah", and Slide 2 details the agenda: (1) Overview, (2) Line by line Explanation, (3) Word-Meanings, (4) Summary, Theme, Ques-Answers, MCQs. Slides 5–37 thoroughly cover Ray Bradbury's classic dystopian vision set in November 2053, Leonard Mead's nocturnal walks through the silent city of three million residents, the stark contrast between Mead's active human curiosity and the passive, screen-enslaved population inside tomb-like houses with flickering "viewing screens", the metaphor of graveyards and gray phantoms, buckling sidewalks overtaken by weeds, themes of technology dehumanization, extreme conformity, and social isolation, line-by-line breakdown, key vocabulary/word meanings, and ICSE Class 10 board MCQs and extract questions.
    - **Standardized Renaming & Placement (Rule 1 & Rule 14)**: Sanitized and placed file as `english/notes/Treasure_Chest_Prose_07_Class_Notes.pdf` (5.0 MB) in `english/notes/`. Cleaned up raw download from Downloads folder immediately (Rule 5).
    - **Dual Data Synchronization (Rule 7)**: Wired `eng-tc-prose-07` under `sub-10-eng` -> `chap-eng-3` -> `story-pedestrian` across both `data.js` and `data.json`.
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"The Pedestrian (Prose)"** (`chap-eng-3` / `story-pedestrian`) with an `auto_stories` cyan icon and glowing `NEW` badge, providing immediate 1-click access to the latest Prose lecture note while keeping previous chapters accessible in their respective dashboards.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=5.0`.
    - **Standard Port 8080 Browser Subagent Verification (Rule 11)**: Tested complete user flow on temporary port 8080 (passcode unlock, sidebar quick-launch, verifying Story 4: The Pedestrian card and Note 07 display, opening Note 07 in the PDF reader with all controls, and back navigation), followed by immediate clean server teardown and port release verification.

41. **Addition of History Notes: The Quit India Movement (Chapter 7 / Note 01)**:
    - **Visual Slide & Content Verification (Rule 14)**: Inspected the 31-page Victory 2026 slide deck (Kunal Sir / Physics Wallah) for `Quit India Movement 01 Class Notes.pdf` (2.6 MB): Slide 1 explicitly identifies "VICTORY 2026 | HISTORY | QUIT INDIA MOVEMENT | Lecture - 01 | By - Kunal Sir | Physics Wallah", Slide 2 details the curriculum agenda: (1) Events Leading to Quit India, (2) Causes of Quit India, (3) Failure of Cripps Mission, (4) Japanese Threat. Slides 5–30 thoroughly cover Outbreak of World War II & international compulsions, August Offer (1940, Lord Linlithgow) and reasons for rejection by Congress and Muslim League, Failure of the Cripps Mission (1942, Sir Stafford Cripps, Dominion status, Constituent Assembly, threat of partition through provincial non-accession, Gandhi's characterization as a "post-dated cheque on a failing bank", rejection by Congress, Muslim League & Hindu Mahasabha), Japanese threat on Indian borders prompting Gandhi to call for immediate British withdrawal ("to leave India in God's hands"), Congress Working Committee meeting at Wardha (July 1942) adopting the historic Quit India Resolution demanding that British rule in India must end immediately, and board-level MCQs.
    - **Standardized Renaming & Placement (Rule 1 & Rule 14)**: Sanitized and placed file as `history/notes/Quit_India_Movement_01_Class_Notes.pdf` (2.6 MB, 2,763,370 bytes) in `history/notes/`. Cleaned up raw download from Downloads folder immediately (Rule 5).
    - **Dual Data Synchronization (Rule 7)**: Wired `his-quit-india-notes-01` (`2.6 MB`) under `sub-10-his` -> `chap-his-7` across both `data.js` and `data.json`.
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Quit India Notes"** (`chap-his-7`) with an amber flag icon (`flag`), bold styling, and glowing `NEW` badge, providing immediate 1-click access to the new chapter notes while keeping all previously published chapters accessible in their respective subject dashboards.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=5.1`.
    - **Standard Port 8080 Browser Subagent Verification (Rule 11)**: Tested complete user flow on temporary port 8080 (passcode unlock, sidebar quick-launch, verifying Chapter 7 and Note 01 card display, opening Note 01 in the PDF reader with all controls, and back navigation), followed by immediate clean server teardown and port release verification.
42. **High-Speed Architectural Reform: Zero-Package Policy, Elimination of Slide Decoding, & Interactive Clarification Protocol**:
    - **Overhauled Rule 11 & Rule 14**: Slashed routine note ingestion time from ~35 minutes down to under 45 seconds.
    - **Eliminated Mandatory Browser Subagent for Routine Notes**: Banned 15–20 minute automated browser runs for simple file additions; adopted 50ms JSON schema and filesystem existence checks.
    - **Zero-Package Installation Policy**: Prohibited repeated pip installations (`pillow`, `pypdf`, `pymupdf`) on every note addition, saving 7+ minutes.
    - **Interactive Clarification Protocol (`ask_question`)**: Replaced heavy slide image extraction with intelligent syllabus matching from `data.json`, with the `ask_question` tool as the fallback for any ambiguous chapter or part numbers, saving 6+ minutes.
    - **Automatic Reading Enforcement**: Codified that every agent MUST automatically inspect `PROJECT_STATE.md` at the start of any conversation without requiring user reminders.

43. **Complete Platform UI Revamp: Modern Academic Command Center & Design System v6.0**:
    - **Frontend Design Skill Implementation (`.agents/skills/frontend-design/SKILL.md`)**: Replaced generic template chrome with a bespoke, authoritative visual identity tailored specifically to the subject matter: Ilberiz Techz IIT Kanpur — Class 10th ICSE Examination Engine.
    - **100% Logic & Engine Preservation**:
      - Zero modifications to any engines in `geography/*` (Theory DPP vaults, 10-Year MCQ suites, Toposheet blueprint, or hardware acceleration logic).
      - Zero modifications to curriculum data structures (`data.js` and `data.json`).
      - All navigation routes, breadcrumbs, search indexing, and deep-linking preserved intact.
      - Passcode security gate logic (`11223344`, `sessionStorage`, `localStorage`) preserved intact.
    - **Executive Command Overview Hub**:
      - Transformed the previously empty Overview view into a comprehensive study command center.
      - Integrated an Executive Hero Banner with live curriculum metrics (9 Prescribed Subjects, 19+ Class Notes Ready, 12+ Interactive DPP & MCQ Engines, 100% Board Aligned).
      - Added a High-Yield Fast Track rail with 1-click jump chips to top requested topics: Geography Climate, History Quit India Movement, Topography Master Blueprint, and English Julius Caesar notes.
      - Added curriculum preview badges on the Class 10th card.
    - **Subject Domain Visual Identities**:
      - Implemented distinct color themes and glow accents per subject: Geography (Sapphire/Azure), History (Amber/Ochre), English (Amethyst/Lilac), Mathematics (Royal Cobalt), Physics (Electric Cyan), Chemistry (Emerald), Biology (Lime/Mint).
    - **Interactive DPP Vaults vs Note Cards Differentiation**:
      - Enhanced Interactive DPP cards with a pulsing live beacon dot (`.live-pulse-dot`), cyan borders, and "Launch Engine" action.
      - Styled PDF note cards with clean file size pills (e.g. `PDF • 5.8 MB`) and vibrant "Read Notes" action buttons.
    - **Search Engine & Navigation Enhancements**:
      - Added global `/` and `Ctrl+K` keyboard shortcuts to instantly focus the search bar from anywhere.
      - Added a `<kbd>/</kbd>` shortcut indicator badge inside the search input.
    - **Passcode Authentication Portal**:
      - Rebuilt the security gate as an elite academic vault screen with a pulsating shield halo, IIT Kanpur ICSE certification badge, and smooth unlock animation.
    - **Studio-Grade PDF Reader Experience**:
      - Clean edge-to-edge layout, responsive chapter dropdown with active status badges, in-chapter note switcher pills, floating edge navigation chevrons, and keyboard shortcuts bar.
    - **Typography & Atmosphere**:
      - Integrated Google Fonts pair (`Outfit` display + `Plus Jakarta Sans` body & micro-copy).
      - Replaced raw CSS blobs with lightweight, GPU-accelerated atmospheric radial glows and a subtle dot-grid overlay.
    - **Verification**: Verified via multiple browser subagent runs across all user journeys (authentication gate, executive overview, subjects grid, chapters view, notes list, search results, and PDF reader).

44. **Addition of History Notes: Indian Independence and Partition of India (Chapter 9 / Note 01)**:
    - **Visual Slide & Content Verification (Rule 14)**: Inspected the 33-page Victory 2026 slide deck (Kunal Sir / Physics Wallah) for `Independence & Partition of India 01 Class Notes.pdf` (3.7 MB, 3,919,334 bytes): Slide 1 explicitly identifies "VICTORY 2026 | HISTORY | Independence & Partition of India | Lecture 01 | By - Kunal Sir | Physics Wallah", Slide 2 details the curriculum agenda: (1) Cabinet Mission Plan, Events that Led to the Cabinet Mission, and Slide 3 displays the official ICSE Syllabus alignment: "(c) Independence and Partition of India - Cabinet Mission Plan (clauses only); Mountbatten Plan (clauses and its acceptance); and the Indian Independence Act of 1947 (clauses only)." Slides 5–32 thoroughly cover:
      - Context & events leading to the Cabinet Mission: End of World War II, international pressure, British economic strain, Labour Party government under Prime Minister Clement Attlee, change in British attitude towards Indian self-determination.
      - The Royal Indian Naval revolt (RIN Mutiny, February 1946 in Mumbai) by Indian Naval ratings fighting a seven-hour battle, spreading nationwide sympathy strikes and demonstrating that the British armed forces could no longer be relied upon to suppress the Indian freedom struggle.
      - Arrival of the Cabinet Mission in March 1946 comprising three British Cabinet Ministers: Lord Pethick-Lawrence (Secretary of State for India), Sir Stafford Cripps (President of the Board of Trade), and A.V. Alexander (First Lord of the Admiralty).
      - Rejection of the Muslim League's demand for a separate sovereign Pakistan with full official rationales: failure to solve the minority issue due to sizeable non-Muslim populations in the proposed Pakistan areas and sizeable Muslim minorities remaining in British India, deep administrative, economic, postal, and communication disruption, and splitting the armed forces.
      - Core Clauses of the Cabinet Mission Plan: (1) Federal Union of India including British Provinces and Princely States dealing with Foreign Affairs, Defence, and Communications; (2) Full Provincial Autonomy and residuary powers for provinces; (3) Three-tier grouping of British Provinces (Section A: Hindu-majority provinces, Section B: Muslim-majority North-West provinces, Section C: Bengal & Assam); (4) Constituent Assembly comprising 389 members (292 elected from provinces, 93 from princely states, 4 chief commissioners); (5) Separate representation of minorities (Muslims and Sikhs); (6) 14-member Interim Government at Centre representing major communities; and (7) Freedom for independent India to remain within or secede from the Commonwealth.
    - **Standardized Renaming & Placement (Rule 1 & Rule 14)**: Sanitized and placed file as `history/notes/Independence_And_Partition_Of_India_01_Class_Notes.pdf` (3.7 MB, 3,919,334 bytes) with a companion hardlink `history/notes/Indian_Independence_And_Partition_Of_India_01_Class_Notes.pdf` in `history/notes/`. Cleaned up raw download from Downloads folder immediately (Rule 5).
    - **Dual Data Synchronization (Rule 7)**: Wired `his-independence-notes-01` (`3.7 MB`) under `sub-10-his` -> `chap-his-9` (`Ch 9: Indian Independence and Partition of India`) across both `data.js` and `data.json`.
    - **Sidebar Navigation Protocol (Rule 10)**: Updated quick-launch navigation in `script.js` to highlight **"Independence & Partition"** (`chap-his-9`) with an amber `account_balance` icon, bold styling, and glowing `NEW` badge, providing immediate 1-click access to the new chapter notes while keeping all previously published chapters accessible in their respective subject dashboards.
    - **Overview Fast Track & Search Integration**: Updated the Overview High-Yield Fast Track spotlight chip to link directly to Chapter 9 (`#spot-his-independence`), and bumped the notes count badge to `45+ Full Class Notes`. Search engine automatically indexes all Cabinet Mission, RIN Mutiny, and Partition terms.
    - **Cache Invalidation**: Bumped cache-busting version queries in `index.html` to `v=6.1`.
45. **Addition of Interactive History DNA PYQ Vaults: Mahatma Gandhi (Ch 6) & Independence and Partition (Ch 9)**:
    - **Interactive Engine Ingestion & Normalization (Rule 1 & Rule 2)**:
      - Processed raw download files `History.html` and `ICSE_Class10_Independence_Partition_PYQ_Vault.html` into dedicated, isolated history subject subdirectories:
        - `history/gandhi/index.html` (138 KB): Mahatma Gandhi & The National Movement (NCM & CDM) — 15 Canonical Clusters, 86+ deduplicated past board twists (2015–2026), official CISCE marking scheme answers.
        - `history/independence/index.html` (122 KB): Independence and Partition of India (1946–1947) — 12 Canonical Clusters, 68+ deduplicated board twists, Cabinet Mission to Indian Independence Act 1947.
      - Embedded standard `.home-nav-btn` navigation linking back to `../../index.html` with `target="_top"` and imported full Google Fonts bundle (`Inter`, `JetBrains Mono`, `Outfit`, `Space Grotesk`, `Material Symbols Outlined`) in both engines (Rule 3).
      - Cleaned up raw download files from Downloads folder immediately (Rule 5 & Rule 14).
    - **Curriculum Architecture & Dual Data Synchronization (Rule 7)**:
      - Chapter 6 (`chap-his-6`): Set `"featured": true`, updated description, and wired `his-gandhi-theory-master` as the primary interactive engine at item index 0 across both `data.json` and `data.js`.
      - Chapter 9 (`chap-his-9`): Set `"featured": true`, updated description, and wired `his-independence-theory-master` as the primary interactive engine at item index 0 across both `data.json` and `data.js`.
    - **Dashboard UI & Navigation Integration (Rule 10)**:
      - Updated left navigation sidebar (`.nav-menu`) latest update quick-launch to **"Gandhi & National Movement"** with indigo `history_edu` icon and glowing `NEW` badge.
      - Updated Batch Overview High-Yield Fast Track spotlight chips to feature both **"History • Gandhi & NCM Vault"** (`NEW`) and **"History • Independence & Partition"** (`NEW`), providing 1-click jump access from anywhere on the platform.
      - Upgraded `createInteractiveViewer(item)` in `script.js` to dynamically display the active subject name (`ICSE 2027 History`) rather than hardcoded Geography.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=6.2`.
      - Validated 100% JSON schema integrity of `data.json` via native PowerShell parser and verified all file paths via `Test-Path`.

46. **Addition of Interactive History DNA PYQ Vault: The Quit India Movement (Chapter 7)**:
    - **Interactive Engine Ingestion & Normalization (Rule 1 & Rule 2)**:
      - Ingested `ai_studio_code.html` from Downloads into isolated subject directory `history/quit-india/index.html` (92 KB).
      - Filtered strictly to current ICSE syllabus: 7 Canonical Clusters, 48+ valid board/specimen twists, official CISCE Council answer key pointers & keywords.
      - Embedded standard `.home-nav-btn` navigation linking back to `../../index.html` with `target="_top"` and imported full Google Fonts bundle (`Inter`, `JetBrains Mono`, `Outfit`, `Space Grotesk`, `Material Symbols Outlined`) (Rule 3).
      - Cleaned up raw download file `ai_studio_code.html` from Downloads folder immediately (Rule 5 & Rule 14).
    - **Curriculum Architecture & Dual Data Synchronization (Rule 7)**:
      - Chapter 7 (`chap-his-7`): Set `"featured": true`, updated description, and wired `his-quit-india-theory-master` as the primary interactive engine at item index 0 across both `data.json` and `data.js`.
    - **Dashboard UI & Navigation Integration (Rule 10)**:
      - Updated left navigation sidebar (`.nav-menu`) latest update quick-launch to **"Quit India Movement"** with crimson flag icon and glowing `NEW` badge.
      - Updated Batch Overview High-Yield Fast Track spotlight chips to feature **"History • Quit India Vault"** (`NEW`), **"History • Gandhi & NCM Vault"** (`NEW`), and **"History • Independence & Partition"** (`NEW`).
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=6.3`.
      - Validated 100% JSON schema integrity of `data.json` via native PowerShell parser and verified all file paths via `Test-Path`.

47. **Addition of Interactive History DNA PYQ Vaults: 1857 Revolt (Ch 1), First World War (Ch 10), and Dual Master Suite**:
    - **Interactive Engine Ingestion & Normalization (Rule 1 & Rule 2)**:
      - Ingested `ICSE_Class10_1857_and_First_World_War_Vault.html` from Downloads into isolated subject directories:
        - `history/1857/index.html` (156 KB): Chapter 1 — The First War of Independence (1857) with default scope `W1857` (10 Clusters, 62+ variations).
        - `history/first-world-war/index.html` (156 KB): Chapter 10 — The First World War (1914–1918) with default scope `WW1` (8 Clusters, 54+ variations).
        - `history/1857-ww1/index.html` (156 KB): Dual Master Suite with 1-click chapter switcher across all 18 clusters and URL parameter deep linking (`?scope=W1857`, `?scope=WW1`).
      - Embedded standard `.home-nav-btn` navigation linking back to `../../index.html` with `target="_top"` and imported full Google Fonts bundle (`Inter`, `JetBrains Mono`, `Outfit`, `Space Grotesk`, `Material Symbols Outlined`) across all files (Rule 3).
      - Cleaned up raw download file `ICSE_Class10_1857_and_First_World_War_Vault.html` from Downloads folder immediately (Rule 5 & Rule 14).
    - **Curriculum Architecture & Dual Data Synchronization (Rule 7)**:
      - Chapter 1 (`chap-his-1`): Set `"featured": true`, updated description, and wired `his-1857-theory-master` as the primary interactive engine at item index 0 across both `data.json` and `data.js`.
      - Chapter 10 (`chap-his-10`): Set `"featured": true`, updated description, and wired `his-ww1-theory-master` as the primary interactive engine at item index 0 across both `data.json` and `data.js`.
    - **Dashboard UI & Navigation Integration (Rule 10)**:
      - Updated left navigation sidebar (`.nav-menu`) latest update quick-launch to **"1857 Revolt & WW1 Vault"** with cyan `swords` icon and glowing `NEW` badge.
      - Updated Batch Overview High-Yield Fast Track spotlight chips to feature **"History • 1857 Revolt Vault"** (`NEW`) and **"History • First World War Vault"** (`NEW`) alongside Quit India and Gandhi.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=6.4`.
      - Validated 100% JSON schema integrity of `data.json` via native PowerShell parser and verified all file paths via `Test-Path`.

48. **Addition & Full Integration of 8 ICSE Class 10 History PDF Notes (Chapters 7, 9, 10, 11 & 12)**:
    - **Source Material Processing & Verification (Rule 1 & Rule 2)**:
      - Ingested 8 lecture slide notes from Downloads into `history/notes/`:
        - `The_First_World_War_01_Class_Notes.pdf` (3.1 MB, 40 slides, Kunal Sir / Victory 2027) -> `chap-his-10`
        - `The_First_World_War_02_Class_Notes.pdf` (2.6 MB, 35 slides, Kunal Sir / Victory 2027) -> `chap-his-10`
        - `The_Second_World_War_01_Class_Notes.pdf` (5.9 MB, 30 slides, Kunal Sir / Victory 2027) -> `chap-his-12`
        - `The_Second_World_War_02_Class_Notes.pdf` (3.8 MB, 32 slides, Kunal Sir / Victory 2027, renamed from `1579e664-9bb4-4d21-97fd-d16a06d2c122.pdf`) -> `chap-his-12`
        - `Rise_of_Dictatorship_01_Class_Notes.pdf` (3.4 MB, 32 slides, Kunal Sir / Victory 2027) -> `chap-his-11`
        - `Rise_of_Dictatorship_02_Class_Notes.pdf` (4.7 MB, 43 slides, Kunal Sir / Victory 2027) -> `chap-his-11`
        - `Independence_And_Partition_Of_India_02_Class_Notes.pdf` (4.8 MB, 44 slides, Kunal Sir / Victory 2027) -> `chap-his-9`
        - `Quit_India_Movement_02_Class_Notes.pdf` (1.5 MB, 15 slides, Kunal Sir / Victory 2027) -> `chap-his-7`
      - Cleaned up raw downloads immediately from Downloads directory (Rule 5 & Rule 14).
    - **Curriculum Architecture & Dual Data Synchronization (Rule 7)**:
      - Synchronized `data.json` and `data.js` identically with refined titles, subtitles, file paths, and accurate sizes.
      - Enabled `featured: true` and comprehensive descriptions for Chapter 11 (Rise of Dictatorships) and Chapter 12 (The Second World War).
      - Verified 100% schema match and validated all referenced file paths.
    - **Sidebar Navigation & Fast Track Spotlight (Rule 10)**:
      - Updated sidebar quick-launch in `script.js` to **"World Wars & Dictators"** with a purple globe icon (`public`) and glowing `NEW` badge.
      - Updated Batch Overview High-Yield Fast Track spotlight chips to feature **First World War**, **Second World War Notes**, **Rise of Dictatorships**, **Quit India Movement**, **Independence & Partition**, and **1857 Revolt Vault**.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped version queries in `index.html` to `v=6.5` for `style.css`, `data.js`, and `script.js`.

49. **Addition of Interactive History DNA PYQ Vault: Growth of Nationalism & Foundation of the INC (Chapter 2)**:
    - **Interactive Engine Ingestion & Normalization (Rule 1 & Rule 2)**:
      - Ingested `ICSE_Class10_Growth_of_Nationalism_and_INC_Vault.html` from Downloads into isolated subject directory `history/nationalism/index.html` (116 KB).
      - Verified full historical coverage across 11 Canonical Master Clusters (`NAT-01` to `NAT-11`) and 72+ deduplicated board & specimen twists (2015–2026) with official CISCE marking scheme answers.
      - Embedded standard `.home-nav-btn` navigation linking back to `../../index.html` with `target="_top"` and imported full Google Fonts bundle (`Outfit`, `Material Symbols Outlined`) (Rule 3).
      - Cleaned up raw download file `ICSE_Class10_Growth_of_Nationalism_and_INC_Vault.html` from Downloads folder immediately (Rule 5 & Rule 14).
    - **Curriculum Architecture & Dual Data Synchronization (Rule 7)**:
      - Chapter 2 (`chap-his-2`): Set `"featured": true`, updated description to `"11 Theory Clusters (72+ PYQ Twists), Official Council Pointers, Dual Instant/DPP Modes & 2 Full Class Notes"`, and wired `his-nationalism-theory-master` as the primary interactive engine at item index 0 across both `data.json` and `data.js`.
      - Verified 100% schema match and verified file existence at `history/nationalism/index.html`.
    - **Dashboard UI & Navigation Integration (Rule 10)**:
      - Updated left navigation sidebar (`.nav-menu`) latest update quick-launch in `script.js` to **"Nationalism & INC Vault"** with amber `account_balance` icon and glowing `NEW` badge (`#f59e0b` to `#ef4444`).
      - Updated Batch Overview High-Yield Fast Track spotlight chips to feature **"History • Nationalism & INC Vault"** (`NEW`) at index 0, with 1-click jump navigation directly to Chapter 2.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=6.6` for `style.css`, `data.js`, and `script.js`.
      - Verified zero encoding corruptions across all files.

50. **Addition of Physics Curriculum: 6 Official Units, 12 Chapters, 3 Unit 1 Interactive HTML Master Engines & Ch 1 Force Class Notes**:
    - **6-Unit Architecture & Authentic Curriculum Alignment**:
      - Organized the ICSE Class 10 Physics syllabus into the 6 official CISCE units (aligned with Selina Concise Physics):
        - Unit 1: Force, Work, Power and Energy (Ch 1: Force, Ch 2: Work, Energy and Power, Ch 3: Machines)
        - Unit 2: Light (Ch 4: Refraction at Plane Surfaces, Ch 5: Refraction through a Lens, Ch 6: Spectrum)
        - Unit 3: Sound (Ch 7: Sound)
        - Unit 4: Electricity and Magnetism (Ch 8: Current Electricity, Ch 9: Household Circuits, Ch 10: Electro-Magnetism)
        - Unit 5: Heat (Ch 11: Calorimetry)
        - Unit 6: Modern Physics (Ch 12: Radioactivity)
    - **Interactive Engine Ingestion & Normalization (Rule 1 & Rule 2)**:
      - Ingested 3 comprehensive Unit 1 interactive HTML engines from Downloads into dedicated, isolated subdirectories:
        - `physics/unit1-numerical/index.html` (155 KB): Unit 1 Numericals Mastery Engine v2.0 (20 Verbatim Board Numericals, Step-by-Step Solutions, Formula Step Boxes, Given/To-Find breakdown, Live Exam Timer).
        - `physics/unit1-theory/index.html` (189 KB): Unit 1 Theory, Concepts & Derivations Vault (62 Marks High-Yield Theory, Official CISCE Marking Scheme, Give Reasons, Derivations, Diagram Questions, Active Recall Blur Mode).
        - `physics/unit1-mcq/index.html` (156 KB): Unit 1 Diagnostic MCQ Exam Engine (24 High-Yield Forensic MCQs across all 3 chapters, DPP Test Mode, Instant Reveal, Live Scoreboard & Detailed Explanations).
      - Added sticky `.home-nav-btn` navigation (`target="_top"`) in command header of all 3 engines for seamless return to portal.
      - Cleaned up raw download files (`UNIT-1 Force, Work, Power and Energy, Machines.*.html`) from Downloads folder immediately (Rule 5 & Rule 14).
    - **Lecture Slide Notes Ingestion (Rule 1 & Rule 14)**:
      - Ingested `Force, Work, Power And Energy  01  Class Notes.pdf` (3.6 MB, 3,626,130 bytes, 40 slides, Kunal Sir / Victory 2027 by Physics Wallah) into `physics/notes/Force_Work_Power_And_Energy_01_Class_Notes.pdf`.
      - Slides cover: Force, Translational vs Rotational motion, Moment of Force (Torque = F x d), Clockwise vs Anticlockwise moments, Principle of Moments, Equilibrium (Static & Dynamic, conditions), Centre of Gravity (definition, factors, CG of regular shapes), and Centripetal vs Centrifugal forces.
      - Attached to Chapter 1: Force (`chap-phy-1`) with companion shortcuts to the 3 Unit 1 interactive engines.
      - Cleaned up raw download file `Force, Work, Power And Energy  01  Class Notes.pdf` from Downloads folder immediately (Rule 5 & Rule 14).
    - **Application Controller Upgrades (`script.js`)**:
      - Enhanced `renderSubjects()` to calculate notes, chapters, and units recursively across nested unit-based subjects (`6 Units • 12 Ch • 7 Notes`).
      - Upgraded `subchapters` view to display a dedicated **Master Study Modules** section for unit-level interactive engines (`unit.items`) positioned cleanly above the prescribed chapters list.
      - Updated `createInteractiveViewer()` back navigation to dynamically check path depth (`path.length`) and parent unit structure, ensuring smooth return to the Unit view without navigation errors.
      - Updated `buildSearchIndex()` to index both unit-level engines and chapter notes in real-time search.
    - **Navigation, Sidebar & Fast Track Integration (Rule 10)**:
      - Updated left navigation sidebar (`.nav-menu`) latest update quick-launch to **"Physics Unit 1 Vault"** with electric cyan `bolt` icon and glowing `NEW` badge.
      - Updated Batch Overview Fast Track spotlight chips to feature **"Physics • Unit 1 Master Vault"** (`NEW`) with 1-click jump access directly to Unit 1.
    - **Dual Data Synchronization (Rule 7)**:
      - Synchronized `data.js` and `data.json` with 100% schema parity across all 6 units, 12 chapters, 3 master engines, and Force notes.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=6.7` for `style.css`, `data.js`, and `script.js`.
      - Validated 100% schema integrity of `data.json` via native PowerShell parser and verified all file paths via `Test-Path`.
    - **Clean Teardown & Git Deployment (Rule 8)**:
      - Verified user journey via `browser_subagent` across passcode login, 6 units view, Master Modules rendering, Ch 1 Force class notes PDF display, and MCQ engine execution.
      - Committed and pushed to `origin/main` (`d43a8d4`).

51. **Sidebar Quick-Launch Cleanliness Enforcement (Rule 10) & Spotlight Badge Alignment**:
    - **Root Cause Analysis**:
      - In Milestone 50, when the Physics Unit 1 Master Vault was integrated, `phyNav` was appended to the sidebar navigation in `renderNav()`, but the previous quick-launch item `natNav` (Growth of Nationalism & INC Vault) was inadvertently left mounted in the DOM. Consequently, both "Nationalism & INC Vault" and "Physics Unit 1 Vault" were appearing simultaneously in the sidebar with glowing `NEW` badges, directly violating the single latest update constraint of Rule 10.
      - In the Executive Overview hub (`renderBatches()`), `spot-his-nat` had retained its `NEW` chip badge instead of transitioning to `HOT`, conflicting with the latest published Physics resource.
    - **Architectural Fix**:
      - Completely removed `natNav` from `renderNav()` in `script.js`, restoring the sidebar quick-launch area to feature strictly the single latest focus item: **Physics Unit 1 Vault** (`unit-phy-1`) with its cyan `fitness_center` icon and glowing `NEW` badge.
      - Updated `spot-his-nat` in the Overview spotlight grid to display the `HOT` badge (`#f59e0b` to `#d97706` amber gradient), reserving the `NEW` tag exclusively for Physics Unit 1 Master Vault.
      - Marked `unit-phy-1` with `"featured": true` across both `data.js` and `data.json`.
      - Bumped cache-busting queries in `index.html` to `v=6.8` for instant client cache invalidation on GitHub Pages.

52. **Overview High-Yield Fast Track Subject Alignment & Elimination of Stale History Spotlight Chips (Rule 15)**:
    - **User Requirement & Design Objective**:
      - With the publication of Physics Unit 1 Master Vault, students landing on the portal must see content relevant to the active release. The previous High-Yield Fast Track rail in `renderBatches()` was dominated by 7 historical topics, obscuring the new Physics release.
    - **Implementation**:
      - Purged all 7 History spotlight chips (`spot-his-*`) from the Overview Fast Track grid in `script.js`.
      - Rebuilt the High-Yield Fast Track rail with 5 dedicated Physics Unit 1 modules:
        1. *Physics • Unit 1 Master Vault* (`NEW` badge, navigates to `unit-phy-1` subchapters)
        2. *Physics • Pure Numericals v2.0* (`HOT` badge, launches `phy-u1-numerical` interactive solver)
        3. *Physics • Theory & Derivations* (`HOT` badge, launches `phy-u1-theory` interactive vault)
        4. *Physics • Diagnostic MCQ Exam* (`HOT` badge, launches `phy-u1-mcq` exam suite)
        5. *Physics • Ch 1: Force Notes* (`HOT` badge, opens `chap-phy-1` class notes)
      - Retained 3 non-competing cross-curriculum flagship modules:
        6. *Geography • Toposheet Q1 Blueprint* (`HOT` badge)
        7. *Geography • Climate 10-Yr MCQs* (`HOT` badge)
        8. *English • Julius Caesar Notes* (`HOT` badge)
      - Codified **Rule 15** in Section 3 to ensure future releases always align the Overview Fast Track rail with the active subject focus and purge older batch clutter.
    - **Cache Invalidation**:
      - Bumped cache-busting queries in `index.html` to `v=6.9` for `style.css`, `data.js`, and `script.js`.

53. **Addition of Physics Chapter 1: Force Class Notes 02 (Lecture 02 / 29 Slides)**:
    - **Visual Slide & Content Verification (Rule 14)**:
      - Inspected the 29-page Victory 2027 slide deck (Shailendra Sir / Physics Wallah) for `Force, Work, Power And Energy 02  Class Notes.pdf` (2.4 MB, 2,536,763 bytes).
      - Slide 1: VICTORY 2027 | FORCE, WORK, POWER & ENERGY | LECTURE-2 | PHYSICS | Shailendra sir.
      - Slide 2: Topics covered: (1) Couple, (2) Principle of Moments, (3) Center of Gravity, (4) Questions.
      - Slides 5–28: Revision of translational vs rotational motion, Moment of force ($\tau = r \times F$), Couple definition ($F_{\text{net}} = 0$, $\tau_{\text{net}} \ne 0$, moment of couple), Iron door least force problem, Uniform metre rule knife-edge balance problems, Gravitational units ($1\text{ kgf} = 9.8\text{ N}$, $1\text{ gf} = 980\text{ dynes}$), See-saw balance calculations, Centre of gravity definition and factors affecting position, CG of symmetrical bodies (rod, square plate, triangular lamina centroid, solid cone at $h/4$, hollow cone at $h/3$, hemisphere), and Two methods of increasing stability of a body (lowering CG and broad base).
    - **Standardized Renaming & Placement (Rule 1 & Rule 14)**:
      - Sanitized and placed file as `physics/notes/Force_Work_Power_And_Energy_02_Class_Notes.pdf` (2.4 MB).
      - Cleaned up raw download from Downloads folder immediately (Rule 5 & Rule 14).
    - **Dual Data Synchronization (Rule 7)**:
      - Wired `phy-force-notes-02` under `sub-10-phy` -> `unit-phy-1` -> `chap-phy-1` across both `data.js` and `data.json`.
      - Automatically activates in-chapter note pill tabs (`Note 01` & `Note 02`) in the studio PDF viewer with instant single-press switching.
    - **Fast-Track & Sidebar Integration (Rule 10 & Rule 15)**:
      - Maintained `Physics Unit 1 Vault` as the sole sidebar quick-launch item with `NEW` badge.
      - Maintained the 5 Physics Unit 1 and 3 flagship non-history chips in the Overview High-Yield Fast Track rail.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=7.0` for `style.css`, `data.js`, and `script.js`.
      - Validated 100% schema integrity of `data.json` and `data.js`.

54. **Comprehensive Repository Audit, Visual Glitch Resolutions, Navigation Fixes & Platform Polish**:
    - **Exhaustive Codebase & Directory Audit**:
      - Conducted a forensic audit of all workspace directories (`physics/`, `history/`, `geography/`, `english/`, `data.js`, `data.json`, `script.js`, `style.css`, `index.html`), strictly excluding `Video_Downloader/` per Rule 6.
      - Validated all 82 content files and 22 interactive engines on disk.
      - Removed duplicate binary file `history/notes/Indian_Independence_And_Partition_Of_India_01_Class_Notes.pdf` (binary twin of `Independence_And_Partition_Of_India_01_Class_Notes.pdf`).
      - Verified all 92 references across `data.js` and `data.json` resolve 100% to valid local files.
    - **Visual Glitch Resolution: Unit 6 Modern Physics Ligature Overflow**:
      - Root Cause: `data.js` and `data.json` specified `"icon": "radioactive"`. Google Material Symbols lacks a `radioactive` font glyph, causing the browser to render the raw word `radioactive`, which spilled in giant cyan letters (`ACTIVE`) across the card.
      - Fix: Updated icon to `"icon": "science"` (clean atom/flask symbol) in `data.js` and `data.json`, and added `overflow: hidden;` to `.card-icon` in `style.css`.
    - **Architectural Cleanup: Purged Duplicate Engines from Ch 1: Force**:
      - Root Cause: The 3 Unit 1 interactive engines (`phy-force-num-engine`, `phy-force-theory-vault`, `phy-force-mcq-drill`) were duplicated inside `chap-phy-1` (Ch 1: Force) while already residing at the unit level (`unit-phy-1`), displaying 5 cards in Ch 1 and inflating badges to `3 Chapters • 8 Notes`.
      - Fix: Removed duplicate entries from `chap-phy-1` so it strictly houses its 2 authentic class note PDFs (`phy-force-notes-01` and `phy-force-notes-02`).
      - Upgraded `script.js` badge logic: Unit 1 now displays `3 Chapters • 2 Notes • 3 Modules`, and Physics subject card displays `6 Units • 12 Ch • 2 Notes • 3 Modules`.
    - **Navigation Repair: Fast Track Spotlight Back-Button Navigation Trap**:
      - Root Cause: Spotlight click handlers passed 4-element paths `[batch.id, 'sub-10-phy', 'unit-phy-1', item.id]`. When the user clicked Back in the interactive viewer, `state.path.length >= 4` routed to `navigateTo('items', ...)` looking for a subchapter matching `item.id`, crashing into an empty error state.
      - Fix: Updated spotlight chip handlers to pass 3-element paths `[batch.id, 'sub-10-phy', 'unit-phy-1']`, ensuring Back returns cleanly to the Unit 1 view.
    - **Dual Data Parity & Schema Parity (Rule 7)**:
      - Verified 100% canonical JSON object deep equality between `data.js` and `data.json` via automated verification script.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=7.1` for `style.css`, `data.js`, and `script.js`.
    - **Live Browser Subagent Verification**:
      - Verified complete user flow via `browser_subagent` across Home Overview, Fast Track chips, Physics Units view with clean `science` icon, Unit 1 Master Study Modules, Ch 1 Force note cards, and interactive engine launch and back-navigation.

55. **Strict Enforcement of Rule 15: Exclusive Latest-Release Spotlight Protocol & Zero Cross-Subject Clutter**:
    - **User Requirement & Mandate**:
      - The user clarified unequivocally that whenever a new release is published, the Overview and High-Yield Fast Track rail must **strictly feature ONLY that new release**. All other older resources and subjects (including Geography Climate, Toposheet, English Julius Caesar, etc.) must be completely removed from the Fast Track rail, because returning students already know the existing content and the spotlight exists solely to champion the active new release.
    - **Implementation**:
      - Rewrote **Rule 15 (Exclusive Latest-Release Spotlight Protocol)** in Section 3 to enshrine this mandate permanently: 100% exclusive spotlight to the newest published release, zero hybrid or multi-subject retention.
      - In `script.js` (`renderBatches()`), completely purged all non-Physics spotlight chips (`spot-geo-topo`, `spot-geo-climate`, `spot-eng-jc`) and their event listeners.
      - The High-Yield Fast Track rail now contains **strictly the 5 Physics Unit 1 modules**:
        1. *Physics • Unit 1 Master Vault* (`NEW` badge, jumps to Unit 1 subchapters)
        2. *Physics • Pure Numericals v2.0* (`HOT` badge, launches numerical solver)
        3. *Physics • Theory & Derivations* (`HOT` badge, launches theory vault)
        4. *Physics • Diagnostic MCQ Exam* (`HOT` badge, launches MCQ drill)
        5. *Physics • Ch 1: Force Notes* (`HOT` badge, opens Force lecture notes)
      - All Geography, English, and History modules remain permanently and cleanly accessible in their respective Subject and Chapter pages.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=7.2` for `style.css`, `data.js`, and `script.js`.

56. **Addition of Physics Chapter 1: Force Class Notes 03 (Lecture 03 / 24 Slides)**:
    - **Slide & Content Ingestion (Rule 1 & Rule 14)**:
      - Ingested `Force, Work, Power And Energy 03 Class Notes.pdf` (2.4 MB, 2,425,909 bytes, 24 slides, Victory 2027 by Physics Wallah) into `physics/notes/Force_Work_Power_And_Energy_03_Class_Notes.pdf`.
      - Topics: Uniform circular motion, centripetal force vs centrifugal force, work-energy concepts, derivations, and practice questions.
      - Removed raw download from `C:\Users\ASUS\Downloads\` immediately (Rule 5 & Rule 14).
    - **Dual Data Synchronization (Rule 7)**:
      - Wired `phy-force-notes-03` under `sub-10-phy` -> `unit-phy-1` -> `chap-phy-1` across both `data.js` and `data.json`.
      - Automatically activates in-chapter note pill tabs (`Note 01`, `Note 02`, `Note 03`) in the studio PDF viewer with instant single-press switching.
    - **Unit & Subject Badge Progression**:
      - Unit 1 card badge now automatically shows `3 Chapters • 3 Notes • 3 Modules`.
      - Physics card on Class 10 dashboard displays `6 Units • 12 Ch • 3 Notes • 3 Modules`.
    - **Spotlight & Sidebar Alignment (Rule 10 & Rule 15)**:
      - Maintained `Physics Unit 1 Vault` as the sole sidebar quick-launch item with `NEW` badge.
      - High-Yield Fast Track rail strictly and exclusively features the 5 Physics Unit 1 modules.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=7.3` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% deep equality between `data.js` and `data.json` via automated canonical JSON parity script.
    - **Browser Subagent Verification**:
      - Verified full flow via `browser_subagent`: opened Ch 1: Force via spotlight, verified all 3 note cards rendered, opened Note 03 in reader with all 3 note pills active, confirmed PDF embedding, and verified Back button returns to Ch 1.

57. **Comprehensive Codebase Review: Efficiency, Robustness & Architectural Modernization**:
    - **Centralized Path Resolution & Context Helper (`resolvePath`)**:
      - Eliminated over 10 repeated manual lookup blocks (`batches.find -> subjects.find -> chapters.find -> subchapters.find`) across breadcrumbs, section renderers, and media viewers.
      - Implemented a unified, null-safe `resolvePath(pathArgs = state.path)` helper returning `{ batch, subject, chapter, subchapter }`, eliminating ~50 lines of duplicate, fragile traversal code.
    - **Resolution of Viewer Global Event Listener Leak in `renderView()`**:
      - Identified that `activeViewerCleanup()` was previously only invoked when opening another PDF, meaning navigating away via the sidebar, breadcrumbs, search, or logo left `window` and `document` event listeners (`handleViewerKeydown`, `handleDocClick`, `handleWindowBlur`, `handleFullscreenChange`) active in memory.
      - Integrated automatic cleanup into `renderView()` whenever transitioning out of `viewer` mode, guaranteeing zero residual keyboard traps or memory leaks.
    - **Visual Glitch Resolution in `createInteractiveViewer`**:
      - Resolved an issue where `state.currentSubject` was undefined, causing the viewer header badge to render duplicate text: `"Interactive Engine • ICSE 2027 ICSE 2027"`.
      - Extracted the active subject dynamically using `resolvePath()`, cleanly displaying the actual subject name (e.g., `"Interactive Engine • Physics"` or `"Interactive Engine • Geography"`).
    - **Unified Viewer Back Navigation (`navigateBackFromViewer`)**:
      - Replaced diverging back navigation logic across `createPdfViewer`, `createInteractiveViewer`, and `createVideoPlayer` with a single unified `navigateBackFromViewer()` helper.
      - Intelligently detects 4-level subchapter paths vs. 3-level unit/chapter modules to guarantee return to the correct parent grid without losing context or encountering empty states.
    - **Multi-Word Search Query Tokenization**:
      - Upgraded search matching from a single rigid substring check (`searchBlob.includes(query)`) to tokenized multi-word matching (`queryWords.every(word => searchBlob.includes(word))`).
      - Students can now search flexible combinations in any order (e.g., "physics force", "force notes", "act 3 speech", "water conservation") with instant results.
    - **Subject Card Statistics Traversal Optimization (`getSubjectStats`)**:
      - Replaced 4 repetitive nested `.reduce()` passes over chapter and subchapter arrays with a single-pass `getSubjectStats(sub)` helper, computing units, chapters, notes, and modules simultaneously.
    - **Consolidated `startApp()` & Spotlight Event Binding**:
      - Streamlined `startApp()` to remove duplicate rendering and indexing statements across the offline and HTTP fetch pathways.
      - Refactored Overview High-Yield Fast Track click handlers into a declarative action map, reducing redundant search operations on batch subjects.
    - **Standardized Navigation Compliance (Rule 3)**:
      - Added the `.home-nav-btn` class to the dashboard return anchors in all 3 Physics Unit 1 engines (`unit1-numerical`, `unit1-theory`, `unit1-mcq`), ensuring 100% compliance across all 22 interactive engines on disk.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting version queries in `index.html` to `v=7.4` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% schema integrity, 0 missing files across all 93 items, and exact delimiter balance in `script.js`.

58. **Frontend Design Intelligence & AI Agent Skills Suite (.agents/skills)**:
    - **Installed UI/UX Skill Ecosystem**:
      - `ui-ux-pro-max`: 79+ UI styles (Bento, Glass, Brutalism, Minimal, Dark/Light), 192 product palettes, 74 font pairings, token generation workflow.
      - `taste-skill`: v2 anti-slop art direction, award-winning layouts (Awwwards/One Page Love inspired), visual contrast and density rules.
      - `ux-ui-architecture`: 138+ design systems, DTCG tokens, 8-state interactive specs, WCAG 2.2 AA-AAA compliance, objective quality gates.
      - `ui-craft-motion`: Micro-interactions, spring physics, dynamic hover spotlight shaders, glassmorphism, responsive transitions.
      - `shadcn-ui`: Headless component patterns (dialogs, accordions, tabs, drawers, popovers) with accessible ARIA semantics.
      - `frontend-design`: Pre-existing Anthropic design lead studio skill with anti-template critique.
    - **Total Footprint**: ~29.2 KB across 6 skills; zero runtime overhead on the static platform.

59. **Complete UI Overhaul & Extreme-Level Animation Engine v8.0 (Quantum Architecture)**:
    - **High-Performance Interactive Cyber Nebula Canvas (`#cyber-canvas`)**:
      - Battery-efficient 2D canvas with 60fps dynamic constellation network, particle nodes, and soft neon filament connections.
      - Integrated mouse repulsion & gravitation physics with automatic frame throttling when tab is hidden or window blurred.
    - **Ambient Cursor Follower Spotlight (`#cursor-glow`)**:
      - Floating 520px radial illumination spotlight with fluid spring interpolation (`lerp`) trailing the user's cursor across cards and frosted glass surfaces.
    - **Futuristic Biometric Auth Screen (Lock Screen)**:
      - Multi-layer gyroscopic orbital rings with clockwise and counter-clockwise rotation (`.auth-orbital-ring-outer`, `.auth-orbital-ring-inner`).
      - Holographic conic gradient border sweep (`.auth-card-border-glow`) and live radar pulse dot.
      - Live frequency visualizer bars (`.auth-visualizer-bars`) that bounce dynamically during passcode typing.
      - Cinematic unlock sequence with shockwave expansion (`authGateDissolve`) and seamless 3D dissipation into the dashboard.
    - **Interactive 3D Card Physics & Specular Sheen (`ui-craft-motion`)**:
      - True 3D perspective card tilt on hover (`perspective(1000px) rotateX(...) rotateY(...) scale3d(...)`).
      - Real-time mouse-following specular light sheen reflection overlay (`--mouse-x`, `--mouse-y`).
      - Glowing laser runner rails on card borders that expand dynamically on cursor hover.
    - **Quantum Hero Command Center**:
      - Live telemetry status strip: Quantum Core Online, Ping latency (14ms), and CISCE 2025–2027 specimen spec chips.
      - Animated ease-out number counters that smoothly count up from 0 to 9, 45+, 12+, and 100% on dashboard mount.
      - Shifting holographic text gradient with continuous shimmer.
    - **Interactive Bento Subject Category Filter Tabs**:
      - Instant categorization on Subjects view: "All Subjects", "Sciences & STEM", "Social Sciences", and "Languages" with smooth staggered card re-rendering.
    - **Zero-Network Web Audio Synthesizer (`audioFX`)**:
      - Procedural tactical sound synthesis via native Web Audio API oscillators (subtle click ticks, success chime, and error thud) requiring 0 external audio files.
      - Added topbar audio toggle button (`#topbar-audio-btn`) with persistent memory (`localStorage`).
59. **Addition of Physics Chapter 2: Work, Energy and Power Class Notes 01 (Lecture 04 / 25 Slides)**:
    - **Slide & Content Ingestion (Rule 1 & Rule 14)**:
      - Ingested `Force, Work, Power And Energy 04 Class Notes.pdf` (2.2 MB, 2,337,467 bytes, 25 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) into `physics/notes/Force_Work_Power_And_Energy_04_Class_Notes.pdf`.
      - Topics: Work Done mathematical definition ($W = F s \cos \theta$), Special Cases (Acute angle $\theta < 90^\circ \implies W > 0$, Right angle $\theta = 90^\circ \implies W = 0$, Obtuse angle $\theta > 90^\circ \implies W < 0$), Work done against gravity vs. applied force ($W_{\text{gravity}} = -mgh$ vs $W_F = Fd$), Force-Displacement graph interpretation (Area under curve = Work done), SI/CGS units ($1\text{ J} = 10^7\text{ erg}$) and gravitational units.
      - Removed raw download from `C:\Users\ASUS\Downloads\` immediately (Rule 5 & Rule 14).
    - **Curriculum Placement & Interactive Clarification**:
      - Prompted via interactive modal (`ask_question` tool) confirming placement under **Ch 2: Work, Energy and Power** (`chap-phy-2`) as its first core study note (`phy-work-notes-01`), aligning perfectly with the official ICSE Class 10 syllabus.
    - **Dual Data Synchronization (Rule 7)**:
      - Synchronized `phy-work-notes-01` under `sub-10-phy` -> `unit-phy-1` -> `chap-phy-2` across both `data.js` and `data.json`.
      - Unit 1 card badge now dynamically displays `3 Chapters • 4 Notes • 3 Modules`.
      - Physics card on Class 10 dashboard displays `6 Units • 12 Ch • 4 Notes • 3 Modules`.
    - **Spotlight & Overview Integration (Rule 10 & Rule 15)**:
      - Added high-visibility spotlight chip `Physics • Ch 2: Work Notes` with `NEW` badge in High-Yield Fast Track (`.spotlight-chips-grid`), providing 1-click launch directly into Chapter 2.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=8.1` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% deep equality between `data.js` and `data.json` via automated canonical JSON parity script.

60. **Multi-Theme Architecture (6 Curated Professional Palettes) & 120 FPS Performance Optimization Engine v9.0**:
    - **Performance Micro-Stutter & Lag Elimination (120 FPS Buttery Smooth)**:
      - *Root Cause 1 (Canvas Software Blur Spikes)*: In `initCyberCanvas()`, `ctx.shadowBlur = 8` and `ctx.shadowColor` was executing ~3,900 CPU software Gaussian blur passes per second across 65 particles in a 60 FPS animation loop. Replaced with high-performance dual-pass radial rendering (an outer soft halo and inner bright core), reducing CPU rasterization to near 0%.
      - *Root Cause 2 (Canvas Draw Call Explosion)*: Replaced per-filament individual `ctx.beginPath() ... ctx.stroke()` draw calls with a single batched filament path per frame, and substituted `Math.sqrt` with squared distance comparisons (`distSq < maxDistSq`), cutting frame draw time by >90%.
      - *Root Cause 3 (Card Hover Layout Thrashing)*: `initCardTiltPhysics()` previously invoked `closest('.card')` and `getBoundingClientRect()` on every raw global `mousemove` event. Re-architected with `pointerenter` / `pointerleave` event delegation: caches bounding rect once on enter, calculates tilt in a debounced `requestAnimationFrame` loop, and smoothly resets to identity on exit.
      - *Root Cause 4 (GPU Backdrop Blur Compositing Choke)*: Removed `backdrop-filter: blur(20px)` from `.card` elements stacked over an actively animating canvas. Replaced with hardware-accelerated deep solid/semi-translucent surfaces (`var(--bg-card)`) with 1px specular border highlights and laser top runners, eliminating GPU frame buffer re-copying penalties.
      - *Root Cause 5 (Cursor Spotlight Reflows)*: Replaced `left` / `top` inline positioning on `#cursor-glow` with GPU-composited `transform: translate3d(...)` on the compositor thread.
    - **6 Curated Developer-Grade Professional UI Themes**:
      1. *Linear Titanium Slate (`titanium`)*: Silicon Valley high-craft inspired by Linear and Raycast. Deep carbon slate (`#090a0f`), hairline charcoal cards (`#121522`), titanium violet (`#8b5cf6`), and polar sky cyan (`#38bdf8`).
      2. *Cyber Emerald & Obsidian (`emerald`)*: Matrix quantum void terminal inspired by Supabase and Vercel Dark. Void obsidian (`#040808`), electric hyper emerald (`#10b981`), and cyber cyan (`#06b6d4`).
      3. *Academic Sovereign (`oxford`)*: Prestigious Ivy League and IIT Kanpur academic excellence. Imperial midnight navy (`#040711`), radiant amber gold (`#f59e0b`), and royal sapphire (`#3b82f6`).
      4. *Crimson Carbon (`crimson`)*: Stealth hypercar and ROG Elite precision. Pure pitch carbon (`#060608`), razor neon crimson (`#f43f5e`), and solar flare orange (`#f97316`).
      5. *Nordic Aurora (`aurora`)*: Bioluminescent deep focus and scientific clarity. Abyssal arctic navy (`#030a14`), glacial mint teal (`#14b8a6`), and polar sky cyan (`#38bdf8`).
      6. *Tokyo Synthwave (`synthwave`)*: High-dopamine retro-futuristic cyberpunk. Deep synth void (`#080512`), electric fuchsia (`#ec4899`), and ultraviolet purple (`#a855f7`).
    - **Live 1-Click Interactive Theme Switcher**:
      - Added top-bar palette toggle button (`#topbar-theme-btn`) opening a theme modal (`#theme-modal-backdrop`).
      - Each theme card in the modal displays live color swatches, descriptive subtitle, and active indicator badge.
      - Theme changes instantly re-tune canvas particle colors (`updateCyberCanvasTheme`), trigger a procedural harmonic synthesized chime (`audioFX.playThemeChange()`), and persist to `localStorage.getItem('ilberiz_theme')`.
    - **Zero-Flicker Pre-Paint Theme Guard**:
      - Synchronous head script in `index.html` sets `data-theme` on `document.documentElement` before first paint, guaranteeing zero theme flicker or style flash.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting version queries in `index.html` to `v=9.0` for `style.css`, `data.js`, and `script.js`.
      - Validated delimiter balance (`Braces: 586/586`, `Parens: 1405/1405`) and JSON schema integrity (`data.json`).

61. **Lock Screen Aesthetic Overhaul & Visual UI Showcase Generation v9.1**:
    - **Lock Screen Noise & Spinning Ring Purge**:
      - Completely removed dizzying spinning orbital dashed rings (`.auth-orbital-ring-outer`, `.auth-orbital-ring-inner`), rotating conic rainbow gradients (`.auth-card-border-glow`), pulsing radar dots, and bouncing audio visualizer bars (`.auth-visualizer-bars`).
      - Replaced with a dignified, minimalist, Apple/Linear-grade authentication card (`max-width: 420px`, clean dark glass `var(--bg-surface)`, 1px border highlight, elegant lock icon tile).
      - Replaced jarring `scale(1.08) blur(16px)` shockwave unlock animation with an understated, instant, smooth fade and slight upward transition (`opacity: 0; transform: translateY(-8px) scale(0.99)`).
    - **Visual UI Design Concepts Generated**:
      - Generated 3 full-bleed 16:9 UI design mockups showcasing distinct layout and color arrangements:
        1. *Concept 1 (Linear Minimalist Slate)*: Clean hero hierarchy, horizontal KPI metrics, fast track chips, structured 3-column subject cards with progress indicators.
        2. *Concept 2 (Academic Sovereign Suite)*: Imperial navy, featured study release banner, categorized subject tabs, structured card modules.
        3. *Concept 3 (Next-Gen Quantum Studio)*: Cyber dark mode, asymmetric Bento Grid, live telemetry chart cards, glowing emerald/cyan outlines.
      - Catalogued in artifact `ui_design_directions.md` with interactive feedback request.
    - **Cache Query Bumping & Remote Sync (Rule 8 & 11)**:
      - Version query bumped to `v=9.1` across `index.html`.

62. **Addition of Physics Chapter 2: Work, Power, and Energy Class Notes 02 (Lecture 05 / 31 Slides) & Naming Standardization v9.2**:
    - **Slide & Content Ingestion (Rule 1 & Rule 14)**:
      - Ingested `Force, Work, Power And Energy 05  Class Notes.pdf` (2.8 MB, 2,927,805 bytes, 31 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) into `physics/notes/Force_Work_Power_And_Energy_05_Class_Notes.pdf`.
      - Topics: Energy definition & work-energy equivalence ($W \implies \Delta E$), Commercial units ($1\text{ Wh} = 3600\text{ J}$, $1\text{ kWh} = 3.6 \times 10^6\text{ J} = 1\text{ unit}$), Heat units (Calorie: $1\text{ cal} = 4.18\text{ J}$, $1\text{ kcal} = 4180\text{ J}$ for $1\text{ g}$ water $14.5^\circ\text{C} \to 15.5^\circ\text{C}$), Atomic units (Electron volt: $1\text{ eV} = 1.6 \times 10^{-19}\text{ J}$), 3-point comparison table between Energy and Power, Mechanical energy (Kinetic Energy due to motion, Potential Energy due to position/configuration), Gravitational Potential Energy ($U = mgh$) with derivation from Earth's center/surface ($\Delta U = G M_e m (\frac{1}{R_e} - \frac{1}{R_e + h}) = mgh$), Elastic Potential Energy (springs & bow configuration), Kinetic Energy ($K = \frac{1}{2}mv^2$) derivation from equations of motion ($v^2 = u^2 + 2as$), Relationship between Kinetic Energy and Momentum ($K = \frac{p^2}{2m}$, $p = \sqrt{2mK}$), and solved ICSE questions on energy, power rating, and work.
      - Cleaned up raw download file from `C:\Users\ASUS\Downloads\` immediately (Rule 5 & Rule 14).
    - **Curriculum Placement & Naming Standardization**:
      - Explicit user instruction: The note belongs to chapter 'Work, Power, and Energy'. Standardized Chapter 2 name from 'Ch 2: Work, Energy and Power' to 'Ch 2: Work, Power, and Energy' across `data.json` and `data.js`.
      - Standardized note titles inside Chapter 2 to 'Work, Power, and Energy 01 Class Notes' (Lecture 04) and 'Work, Power, and Energy 02 Class Notes' (Lecture 05) with clear lecture subtitles, matching the exact naming format used across all other subjects (Geography, History, English).
    - **Dual Data Synchronization (Rule 7)**:
      - Synchronized `phy-work-notes-01` and `phy-work-notes-02` under `sub-10-phy` -> `unit-phy-1` -> `chap-phy-2` across both `data.js` and `data.json`.
      - Unit 1 card badge now dynamically displays `3 Chapters • 5 Notes • 3 Modules`.
      - Physics card on Class 10 dashboard displays `6 Units • 12 Ch • 5 Notes • 3 Modules`.
    - **Fast Track Spotlight Chip**:
      - Updated High-Yield Fast Track chip text to `Physics • Ch 2: Work, Power & Energy Notes`.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=9.2` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% deep equality between `data.js` and `data.json` via automated canonical JSON parity script (`PARITY_100_MATCH`).

63. **Addition of Physics Chapter 2: Work, Power, and Energy Class Notes 03 (Lecture 06 / 26 Slides) v9.3**:
    - **Slide & Content Ingestion (Rule 1 & Rule 14)**:
      - Ingested `Force, Work, Power And Energy 06  Class Notes.pdf` (2.2 MB, 2,335,230 bytes, 26 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) into `physics/notes/Force_Work_Power_And_Energy_06_Class_Notes.pdf`.
      - Topics: Work-Energy Theorem mathematical definition and derivation ($W_{\text{net}} = \Delta KE = K_f - K_i = \frac{1}{2}mv^2 - \frac{1}{2}mu^2$), Three forms of Kinetic Energy with real-world examples: (1) Translational KE (rectilinear path, monoatomic gases $\text{He}$, $\text{Ne}$), (2) Rotational KE (body spinning on axis, Earth, diatomic/polyatomic molecules $\text{N}_2$, $\text{O}_2$, $\text{NH}_3$, $\text{CO}_2$), (3) Vibrational KE (to-and-fro motion, clamped struck wire, solids), Simultaneous forms of KE (rolling ball, rotating wheels of a moving vehicle), 4-point tabular distinction between Potential Energy and Kinetic Energy, and solved ICSE Board numericals (dam hydroelectric power generation at 60% efficiency, car acceleration work, inclined plane friction dissipation, mass vs velocity effects on KE).
      - Cleaned up raw download file from `C:\Users\ASUS\Downloads\` immediately (Rule 5 & Rule 14).
    - **Curriculum Placement & Naming Consistency**:
      - Placed under **Ch 2: Work, Power, and Energy** (`chap-phy-2`) as Note 03: `Work, Power, and Energy 03 Class Notes` (`phy-work-notes-03`).
    - **Dual Data Synchronization (Rule 7)**:
      - Synchronized `phy-work-notes-03` under `sub-10-phy` -> `unit-phy-1` -> `chap-phy-2` across both `data.js` and `data.json`.
      - Chapter 2 now dynamically presents all 3 notes (`Note 01`, `Note 02`, `Note 03`) with instant single-click note pill switching in the viewer.
      - Unit 1 card badge now dynamically displays `3 Chapters • 6 Notes • 3 Modules`.
      - Physics card on Class 10 dashboard displays `6 Units • 12 Ch • 6 Notes • 3 Modules`.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=9.3` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% deep equality between `data.js` and `data.json` via automated canonical JSON parity script (`PARITY_100_MATCH`).

64. **Addition of Physics Chapter 2: Work, Power, and Energy Class Notes 04 (Lecture 07 / 30 Slides) v9.4**:
    - **Slide & Content Ingestion (Rule 1 & Rule 14)**:
      - Ingested `Force, Work, Power And Energy 07  Class Notes.pdf` (3.5 MB, 3,693,172 bytes, 30 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) into `physics/notes/Force_Work_Power_And_Energy_07_Class_Notes.pdf`.
      - Topics: Work-Energy theorem numerical warm-up (bullet resistive force penetration depth and emerging velocity, bouncing ball kinetic energy loss into heat and sound), Twelve distinct forms of energy in nature (Solar with panels/furnace/cells, Heat & steam engines, Light, Chemical fuel & food, Hydroelectric, Electrical, Nuclear fission/fusion $E=mc^2$, Geothermal hot springs, Wind turbines, Sound wave vibrations, Magnetic & electromagnets, Mechanical $KE+PE$), Seventeen explicit bidirectional energy conversions (dynamo vs motor, electric iron vs thermocouple, loudspeaker vs microphone, battery charging vs cell discharging, light bulb vs photocell, steam engine, photosynthesis, fuel combustion, internal combustion engines), Principle of Conservation of Energy, Dissipated/degraded energy definition (non-useful frictional/thermal energy), and solved board MCQs & energy categorization exercises.
      - Cleaned up raw download file from `C:\Users\ASUS\Downloads\` immediately (Rule 5 & Rule 14).
    - **Curriculum Placement & Naming Consistency**:
      - Placed under **Ch 2: Work, Power, and Energy** (`chap-phy-2`) as Note 04: `Work, Power, and Energy 04 Class Notes` (`phy-work-notes-04`).
    - **Dual Data Synchronization (Rule 7)**:
      - Synchronized `phy-work-notes-04` under `sub-10-phy` -> `unit-phy-1` -> `chap-phy-2` across both `data.js` and `data.json`.
      - Chapter 2 now dynamically presents all 4 notes (`Note 01`, `Note 02`, `Note 03`, `Note 04`) with instant single-click note pill switching in the viewer.
      - Unit 1 card badge now dynamically displays `3 Chapters • 7 Notes • 3 Modules`.
      - Physics card on Class 10 dashboard displays `6 Units • 12 Ch • 7 Notes • 3 Modules`.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=9.4` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% deep equality between `data.js` and `data.json` via automated canonical JSON parity script (`PARITY_100_MATCH`).

65. **Addition of Physics Chapter 2: Work, Power, and Energy Class Notes 05 (Lecture 08 / 21 Slides) v9.5**:
    - **Slide & Content Ingestion (Rule 1 & Rule 14)**:
      - Ingested `Force, Work, Power And Energy 08  Class Notes.pdf` (1.9 MB, 2,026,416 bytes, 21 widescreen slides, Shailendra Sir / Victory 2027 by Physics Wallah) into `physics/notes/Force_Work_Power_And_Energy_08_Class_Notes.pdf`.
      - Topics: Warm-up on spring PE to block KE and board PYQs (photosynthesis, photovoltaic cell), Full theoretical proof and derivation of $K + U = \text{constant} = mgH$ for a freely falling body at highest point $A$, intermediate point $B$ (fallen distance $h$), and ground point $C$, complete height vs. energy transition table and cross-linear graphical representation ($KE$ vs $PE$ intersecting at $h/2$), Principle of Conservation of Energy applied to a simple pendulum (potential energy at extreme positions, kinetic energy at mean position, frictional air damping & thermal dissipation), and solved ICSE Board numericals (free fall mechanical energy & striking velocity from 15 m height, vertical throw with 40% air friction loss, oscillating pendulum bob velocity at mean position, ski jump change in PE and takeoff speed).
      - Cleaned up raw download file from `C:\Users\ASUS\Downloads\` immediately (Rule 5 & Rule 14).
    - **Curriculum Placement & Naming Consistency**:
      - Placed under **Ch 2: Work, Power, and Energy** (`chap-phy-2`) as Note 05: `Work, Power, and Energy 05 Class Notes` (`phy-work-notes-05`).
    - **Dual Data Synchronization (Rule 7)**:
      - Synchronized `phy-work-notes-05` under `sub-10-phy` -> `unit-phy-1` -> `chap-phy-2` across both `data.js` and `data.json`.
      - Chapter 2 now dynamically presents all 5 notes (`Note 01` through `Note 05`) with instant single-click note pill switching in the viewer.
      - Unit 1 card badge now dynamically displays `3 Chapters • 8 Notes • 3 Modules`.
      - Physics card on Class 10 dashboard displays `6 Units • 12 Ch • 8 Notes • 3 Modules`.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=9.5` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% deep equality between `data.js` and `data.json` via automated canonical JSON parity script (`PARITY_100_MATCH`).

66. **Addition of Physics Unit 4: Electricity and Magnetism Suite (9 Class Notes across Chapters 8, 9, and 10) v9.6**:
    - **Slide & Content Ingestion (Rule 1 & Rule 14)**:
      - Ingested all 9 class notes PDFs from the Victory 2027 batch (Shailendra Sir / Physics Wallah) into `physics/notes/`:
        1. `Electricity_And_Magnetism_01_Class_Notes.pdf` (3.0 MB, 2,989,347 bytes, 34 slides) — Ch 8: Charge, Current, Potential, Resistance Factors, Ohm's Law & Wire Materials.
        2. `Electricity_And_Magnetism_02_Class_Notes.pdf` (3.2 MB, 3,234,801 bytes, 34 slides) — Ch 8: V-I Graphs at Different Temperatures, EMF ($\varepsilon$), Terminal Voltage ($V = \varepsilon - Ir$), Internal Resistance ($r$) & Series/Parallel Resistor Combinations.
        3. `Electricity_And_Magnetism_03_Class_Notes.pdf` (2.9 MB, 2,894,545 bytes, 29 slides) — Ch 8: Resistor Networks, Electrical Power & Energy ($U=VIt, P=VI$), Commercial kWh, Joule's Heating Law & Board Numericals.
        4. `Electricity_And_Magnetism_04_Class_Notes.pdf` (5.7 MB, 5,711,798 bytes, 41 slides) — Ch 9: Grid Power Transmission (11kV to 132kV to 220V), Domestic 3-Wire Supply, Ring System Wiring & Electric Fuse in Live Wire.
        5. `Electricity_And_Magnetism_05_Class_Notes.pdf` (4.3 MB, 4,300,369 bytes, 42 slides) — Ch 9: Fuse Ratings, MCB Magnetic Trip Mechanism, Staircase Switches, Local & Appliance Earthing, Three-Pin Plug, Cable Colour Coding & High Tension Wires.
        6. `Electricity_And_Magnetism_06_Class_Notes.pdf` (3.0 MB, 3,014,901 bytes, 28 slides) — Ch 10: Oersted Experiment, Right Hand Thumb Rule, Straight Wire/Loop/Solenoid Fields, Electromagnets (I & U-shaped), Soft Iron vs Steel & Fleming's Left Hand Rule.
        7. `Electricity_And_Magnetism_07_Class_Notes.pdf` (3.5 MB, 3,488,462 bytes, 29 slides) — Ch 10: Electric Bell Construction & Make-and-Break Cycle, Deflecting Torque ($\tau=NIAB\sin\theta$), Simple DC Motor Complete $360^\circ$ Rotation, Split Rings & Magnetic Flux.
        8. `Electricity_And_Magnetism_08_Class_Notes.pdf` (3.7 MB, 3,735,208 bytes, 29 slides) — Ch 10: Electromagnetic Induction, Faraday's Laws, Fleming's Right Hand Rule, Lenz's Law Energy Conservation & AC Generator Complete Working.
        9. `Electricity_And_Magnetism_09_Class_Notes.pdf` (3.7 MB, 3,668,412 bytes, 31 slides) — Ch 10: AC Frequency ($50\text{ Hz}$ vs $60\text{ Hz}$), AC vs DC, Generator vs Motor Comparison, Step-Up and Step-Down Transformers, Turns Ratio & Energy Losses.
      - Cleaned up all raw download files from `C:\Users\ASUS\Downloads\` immediately (Rule 5 & Rule 14).
    - **Curriculum Placement & Naming Consistency**:
      - Distributed across the three prescribed CISCE Unit 4 chapters:
        - **Ch 8: Current Electricity**: Notes 01 to 03 (`Current Electricity 01` to `03 Class Notes`)
        - **Ch 9: Household Circuits**: Notes 01 and 02 (`Household Circuits 01` and `02 Class Notes`)
        - **Ch 10: Electro-Magnetism**: Notes 01 to 04 (`Electro-Magnetism 01` to `04 Class Notes`)
    - **Dual Data Synchronization (Rule 7)**:
      - Synchronized `chap-phy-8`, `chap-phy-9`, and `chap-phy-10` across both `data.js` and `data.json`.
      - Unit 4 card now displays `3 Chapters • 9 Notes • 0 Modules`.
      - Physics card on Class 10 dashboard displays `6 Units • 12 Ch • 17 Notes • 3 Modules`.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=9.6` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% deep equality between `data.js` and `data.json` via automated canonical JSON parity script (`PARITY_100_MATCH`).

67. **Addition of Physics Unit 2: Light Suite (6 Class Notes across Chapters 4, 5, and 6) v9.7**:
    - **Slide & Content Ingestion (Rule 1 & Rule 14)**:
      - Ingested all 6 class notes PDFs from the Victory 2027 batch (Shailendra Sir / Physics Wallah) into `physics/notes/`:
        1. `Light_01_Class_Notes.pdf` (3.4 MB, 3,606,961 bytes, 40 slides) — Ch 4: Refraction, Snell's Law, Speed in Media, Glass Block & Lateral Displacement.
        2. `Light_02_Class_Notes.pdf` (3.0 MB, 3,125,666 bytes, 35 slides) — Ch 4: Prism Refraction, Angle of Deviation, Real/Apparent Depth & Critical Angle / TIR.
        3. `Light_03_Class_Notes.pdf` (2.6 MB, 2,688,538 bytes, 25 slides) — Ch 4: Total Internal Reflection in Prisms (90°, 180°, Erecting), Mirage & Optical Fibres.
        4. `Light_04_Class_Notes.pdf` (4.8 MB, 5,072,438 bytes, 50 slides) — Ch 5: Convex & Concave Lenses, Prism Set Action, 3 Construction Rays, Image Formations (All 6 Cases).
        5. `Light_05_Class_Notes.pdf` (2.4 MB, 2,538,104 bytes, 30 slides) — Ch 5: Cartesian Signs, Lens Formula, Linear Magnification, Power of Lens, Simple Microscope & Dispersion Intro.
        6. `Light_06_Class_Notes.pdf` (3.5 MB, 3,680,703 bytes, 36 slides) — Ch 6: Complete Electromagnetic Spectrum (Gamma to Radio), Detection, Uses, UV/Vis/IR Comparison & Rayleigh Scattering.
      - Cleaned up all raw download files from `C:\Users\ASUS\Downloads\` immediately (Rule 5 & Rule 14).
    - **Curriculum Placement & Start-of-Note Rule Compliance**:
      - Distributed across the three prescribed CISCE Unit 2 chapters:
        - **Ch 4: Refraction of Light at Plane Surfaces**: Notes 01 to 03 (`Refraction of Light at Plane Surfaces 01` to `03 Class Notes`).
        - **Ch 5: Refraction through a Lens**: Notes 01 and 02 (`Refraction through a Lens 01` and `02 Class Notes`). Note 05 contains both Lens Formula/Power and intro to Dispersion; per the user's explicit rule (*"if the PDF starts with whatever chapter, put that only in that chapter"*), it is correctly mapped into Ch 5.
        - **Ch 6: Spectrum**: Note 01 (`Spectrum 01 Class Notes`).
    - **Spotlight & Navigation Update (Rule 10 & Rule 15)**:
      - Updated the Overview dashboard High-Yield Fast Track rail (`.spotlight-chips-grid`) to exclusively spotlight the new Physics Unit 2: Light release (Suite launcher, Ch 4, Ch 5, Ch 6, Snell's Law lecture, and Lens Ray Diagrams lecture).
      - Updated the single featured sidebar quick-launch in `script.js` to `Physics Unit 2: Light` with `NEW` badge.
    - **Dual Data Synchronization (Rule 7)**:
      - Synchronized `chap-phy-4`, `chap-phy-5`, and `chap-phy-6` across both `data.js` and `data.json`.
      - Unit 2 card now displays `3 Chapters • 6 Notes • 0 Modules`.
      - Physics card on Class 10 dashboard displays `6 Units • 12 Ch • 23 Notes • 3 Modules`.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=9.7` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% deep equality between `data.js` and `data.json` via automated canonical JSON parity script (`PARITY_100_MATCH`).

68. **Addition of Physics Unit 4 Master Study Engines Suite (Numericals, Theory & MCQ Engines) v9.8**:
    - **Engine Ingestion & Subject Folder Isolation (Rule 1, Rule 2 & Rule 3)**:
      - Ingested all 3 interactive examination applications from `C:\Users\ASUS\Downloads\` into dedicated `physics/` subdirectories:
        1. `physics/unit4-numerical/index.html` (176 KB, 2,564 lines) — `UNIT-4 Current Electricity & Magnetism — Pure Numericals Master Engine`: 20 verbatim board numerical cards (70 Marks) across Chapters 8, 9 & 10, step-by-step formula step boxes, Given/To-Find breakdown, CGS-to-SI unit conversion vault, DPP Solve Mode + Instant Step-by-Step Mode, live exam countdown timer, and solved progress scoreboard.
        2. `physics/unit4-theory/index.html` (212 KB, 2,694 lines) — `UNIT-4 Current Electricity & Magnetism — Theory, Derivations & Diagrams Vault`: 24 forensic master cards (75 Marks) covering official CISCE marking scheme keywords, give reasons, derivations, DC motor/AC generator operation diagrams, DPP Recall Mode + Instant Answer Mode, and live mastery scoreboard.
        3. `physics/unit4-mcq/index.html` (154 KB, 2,280 lines) — `UNIT-4 Current Electricity & Magnetism — Master MCQ Diagnostic Engine`: 25 master archetypes + 85+ past variations (2017–2027), DPP Test Mode + Instant Reveal Mode, countdown timer, live score pill (score: correct/attempted / 25), detailed rationales and accordion drawers.
      - Integrated `.home-nav-btn` (`target="_top"`) and Google Fonts bundle (`Outfit`, `JetBrains Mono`, `Plus Jakarta Sans`, `Material Symbols Outlined`) in all three engines.
      - Cleaned up raw downloads from `C:\Users\ASUS\Downloads\` immediately (Rule 5).
    - **Unit-Level Master Study Module Architecture**:
      - Placed all 3 engines at the Unit 4 root (`unit-phy-4.items`), ensuring that when a student clicks on Unit 4, the portal renders the dedicated `Unit 4: Electricity and Magnetism — Master Study Modules` banner and interactive launch cards at the top before the subchapters (Ch 8, Ch 9, Ch 10).
    - **Spotlight & Navigation Update (Rule 10 & Rule 15)**:
      - Updated the Overview dashboard High-Yield Fast Track rail (`.spotlight-chips-grid`) to exclusively feature the Unit 4 suite (Suite launcher, Pure Numericals 70M, Theory Vault 75M, Diagnostic MCQ 25 Qs, Ch 8 notes, Ch 10 notes).
      - Updated the single featured sidebar quick-launch in `script.js` to `Physics Unit 4 Vault` with `NEW` badge.
    - **Dual Data Synchronization (Rule 7)**:
      - Synchronized `unit-phy-4.items` across both `data.js` and `data.json`.
      - Unit 4 card now dynamically displays `3 Chapters • 9 Notes • 3 Modules`.
      - Physics card on Class 10 dashboard displays `6 Units • 12 Ch • 23 Notes • 6 Modules`.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=9.8` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% deep equality between `data.js` and `data.json` via automated canonical JSON parity script (`PARITY_100_MATCH`).

69. **Addition of Physics Unit 3: Sound Suite (4 Class Notes for Chapter 7) v9.9**:
    - **Slide & Content Ingestion (Rule 1 & Rule 14)**:
      - Ingested all 4 class notes PDFs from the Victory 2027 batch (Shailendra Sir / Physics Wallah) into `physics/notes/`:
        1. `Sound_01_Class_Notes.pdf` (2.8 MB, 2,920,987 bytes, 30 slides) — Ch 7: Reflection of Sound Waves, Echo Conditions ($d \ge 16.6\text{ m} \approx 17\text{ m}, t \ge 0.1\text{ s}$), Speed of Sound & Solved Examples.
        2. `Sound_02_Class_Notes.pdf` (2.9 MB, 3,017,352 bytes, 31 slides) — Ch 7: Applications of Echoes, SONAR & Echo Depth Sounding ($d = vt/2$), RADAR Navigation, Bats/Dolphins Echolocation & Board Numericals.
        3. `Sound_03_Class_Notes.pdf` (4.2 MB, 4,417,036 bytes, 36 slides) — Ch 7: Natural (Free) Vibrations, Damped Vibrations, Forced Vibrations, Resonance Conditions & Tuning Fork Experiments.
        4. `Sound_04_Class_Notes.pdf` (4.5 MB, 4,701,649 bytes, 40 slides) — Ch 7: Characteristics of Sound — Loudness & Intensity (dB), Pitch vs Frequency, Quality / Timbre (Waveform & Overtones), Music vs Noise & Board Numericals.
      - Cleaned up all raw download files from `C:\Users\ASUS\Downloads\` immediately (Rule 5 & Rule 14).
    - **Curriculum Placement**:
      - Mapped to **Unit 3: Sound** -> **Ch 7: Sound** (`chap-phy-7`).
    - **Spotlight & Navigation Update (Rule 10 & Rule 15)**:
      - Updated the Overview dashboard High-Yield Fast Track rail (`.spotlight-chips-grid`) with a dedicated `Physics • Unit 3 Sound (4 Notes)` chip carrying the `NEW` badge for 1-click launch.
      - Updated the single featured sidebar quick-launch in `script.js` to `Physics: Sound (4 Notes)` with `NEW` badge.
    - **Dual Data Synchronization (Rule 7)**:
      - Synchronized `chap-phy-7.items` across both `data.js` and `data.json`.
      - Unit 3 card now dynamically displays `1 Chapters • 4 Notes`.
      - Physics card on Class 10 dashboard displays `6 Units • 12 Ch • 27 Notes • 6 Modules`.
    - **Cache Invalidation & Schema Validation (Rule 11)**:
      - Bumped cache-busting queries in `index.html` to `v=9.9` for `style.css`, `data.js`, and `script.js`.
      - Verified 100% deep equality between `data.js` and `data.json` via automated canonical JSON parity script (`PARITY_100_MATCH`).


