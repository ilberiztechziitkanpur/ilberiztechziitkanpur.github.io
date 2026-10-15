# PROJECT STATE & AGENT SYSTEM GUIDE

> **MANDATORY FOR ANTIGRAVITY AGENT**: Read this file at the start of every chat before modifying any files or folders in this repository. Maintain this document whenever adding, modifying, or reorganizing assets.

---

## 1. Project Overview & Repository Context
- **Workspace Root**: `c:\Users\ASUS\Downloads\ILBERIZ TECHZ IIT KANPUR`
- **Git Remote**: `origin/main` (`https://github.com/ilberiztechziitkanpur/ilberiztechziitkanpur.github.io.git`)
- **Platform**: Ilberiz Techz IIT Kanpur — Class 10th ICSE Study & Examination Engine
- **Live Deployment**: GitHub Pages (`https://ilberiztechziitkanpur.github.io/`)

---

## 2. Directory Structure & Rules

```
ILBERIZ TECHZ IIT KANPUR/
├── geography/                       # ALL Geography subject content lives here
│   ├── climate/                     # Chapter 1: Climate Theory Master DPP Vault
│   │   └── index.html               # 42 Most Expected Theory Qs, 175+ Variations, Timer & Data Tables
│   ├── notes/                       # All 17 ICSE Class 10 Geography PDF notes
│   │   ├── Climate_01_Class_Notes.pdf ... Climate_05_Class_Notes.pdf (5 files)
│   │   ├── Soil_Resources_01_Class_Notes.pdf ... Soil_Resources_03_Class_Notes.pdf (3 files)
│   │   ├── Natural_Vegetation_01_Class_Notes.pdf ... Natural_Vegetation_03_Class_Notes.pdf (3 files)
│   │   ├── Water_Resources_01_Class_Notes.pdf ... Water_Resources_02_Class_Notes.pdf (2 files)
│   │   ├── Mineral_Resources_01_Class_Notes.pdf ... Mineral_Resources_02_Class_Notes.pdf (2 files)
│   │   └── Conventional_Sources_Of_Energy_01_Class_Notes.pdf ... 02 (2 files)
│   ├── mcq/                         # 100 Most Expected High-Yield MCQ DPP & DNA Engine
│   │   └── index.html               # Main interactive MCQ web app (hardware accelerated)
│   └── toposheet/                   # Topography (Question 1) Master Blueprint & DNA Engine
│       └── index.html               # Main interactive Topo Exam & Blueprint web app
├── Video_Downloader/                # EXCLUDED / UNTOUCHED (Do NOT modify or commit)
├── data.js                          # Course hierarchy, chapters, and file pointers
├── data.json                        # JSON mirror of course hierarchy
├── index.html                       # Website homepage and app container
├── script.js                        # App controller: Navigation, search, breadcrumbs, viewer
├── style.css                        # Design system: Dark glassmorphism, responsive UI
└── PROJECT_STATE.md                 # This file (Persistent project state)
```

---

## 3. Strict Folder Organization Rules
1. **Geography Folder Isolation**: All Geography notes, MCQs, toposheets, maps, or interactive engines MUST reside strictly inside `geography/` and its dedicated subfolders (`climate/`, `notes/`, `mcq/`, `toposheet/`).
2. **No Empty Subject Folders**: Do NOT create directories for Mathematics, Physics, Chemistry, Biology, History, etc., until the user provides actual content/files for them. Currently, ONLY Geography has content.
3. **No Root Clutter**: Never leave raw download files (like `gemini-code-*.html`) in the root directory. Process them into their proper folder (`geography/...`) and remove the loose download file immediately.
4. **Leave Video Downloader Untouched**: The `Video_Downloader/` directory is for a completely different utility. Never modify, delete, or commit changes inside `Video_Downloader/`.

---

## 4. Current Content Inventory
### A. Geography Notes (17 PDFs in `geography/notes/`)
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

### B. Climate Theory Master DPP & Most Expected Questions Engine (`geography/climate/`)
- 42 Master High-Yield Theory Questions targeting 10/10 marks in Question 4 (Climate).
- 175+ Twisted Board Variations grouped under their core Council Marking Scheme answers.
- Dual Study Modes:
  1. 🎯 DPP Mode (Test): Collapsed answers, individual reveal toggles, self-evaluation (Mastered vs Revision).
  2. ⚡ Go-Through Mode: Instant reveal of all official CISCE answers & keywords for high-speed revision.
- Real-time Probability DNA Filtering (2027 Specimen, Highest Probability 6-10x, Alternate-Year, Safety Net).
- Format Filters: Give Geographical Reasons, Conceptual 2-Markers, Differentiate, Case-Based, Station Climatic Data Tables.
- Live Exam Countdown Timer (15, 30, 45, 60 mins presets) with warning/danger pulse indicators.
- Offline Single-File HTML Download feature for WhatsApp/mobile distribution.
- Persistent self-evaluation tracking via localStorage (`icse2027_climate_mastered`, `icse2027_climate_review`).

### C. Master 100 MCQ DPP & DNA Engine (`geography/mcq/`)
- 100 high-yield questions covering all 9 CISCE units.
- 8-Year Board Frequency Matrix (2018–2026).
- Practice & Timed DPP Exam modes with instant explanation drawers.
- 100-Question Palette Modal navigator for instant jumping.
- Hardware-accelerated CSS containment for 60fps lag-free scrolling.

### D. Topography Question 1 Master Blueprint & Exam Engine (`geography/toposheet/`)
- 50 exact questions across 5 sets for Survey of India Map Sheets G43S10 & G43S7.
- Live 15-Minute Target Timer (Board exam allocation) with countdown & drill modes.
- Automated evaluation with CISCE marking scheme answers.
- 4 Full Tabs:
  1. Interactive Exam & Question Sets (50 Qs)
  2. 8-Year CISCE DNA Frequency Matrix (2018–2026)
  3. Formula & Scale Calculation Master Cheat Sheet
  4. Survey Conventional Symbols & Color Codes Cheat Sheet
- CSS containment (`content-visibility: auto`) for zero lag.

---

## 5. Protocol for Future Chats
When the user presents a new file or request in future sessions:
1. **Analyze First**: Check what subject, topic, and file type is provided.
2. **Organize Positively**:
   - Place into `geography/notes/`, `geography/mcq/`, `geography/toposheet/`, or a new clean subfolder if a new subject arrives.
   - Clean up any raw download artifact files immediately.
3. **Wire Data**:
   - Update `data.js` and `data.json` with the exact path (`geography/...`).
   - If interactive or featured, add quick launch links in `script.js`.
4. **Test in Browser**: Verify navigation, search, and viewer rendering.
5. **Push to GitHub**:
   - Use `BypassSandbox: true` for `git push origin main` (required for network access).
6. **Update This Note**: Record changes in `PROJECT_STATE.md`.
