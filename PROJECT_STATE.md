# PROJECT STATE & AGENT SYSTEM GUIDE

> 🚨 **MANDATORY AUTONOMOUS RULE FOR ALL AI AGENTS**:
> 1. **Read this file at the start of EVERY chat** before inspecting or modifying any files in this repository.
> 2. **AUTOMATICALLY UPDATE THIS FILE**: Whenever you add, modify, or reorganize any files, chapters, or interactive engines in this repository, you **MUST automatically update this file (`PROJECT_STATE.md`)** before concluding your turn without needing the user to ask or remind you. Keep this guide as the live single source of truth.

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
│   ├── soil/                        # Chapter 2: Soil Resources Theory Master DPP Vault
│   │   └── index.html               # 46 Most Expected Theory Qs, 180+ Variations, 60s Matrix, Blur Mode
│   ├── vegetation/                  # Chapter 3: Natural Vegetation Theory Master DPP Vault
│   │   └── index.html               # 46 Most Expected Theory Qs, 185+ Variations, Dual-Tab Drawer, Blur Mode
│   ├── water/                       # Chapter 4: Water Resources Theory Master DPP Vault
│   │   └── index.html               # 48 Most Expected Theory Qs, 190+ Variations, Dual-Tab Drawer, Blur Mode
│   ├── transport/                   # Chapter 5: Transport Network Theory Master DPP Vault
│   │   └── index.html               # 48 Most Expected Theory Qs, 190+ Variations, Dual-Tab Drawer, Blur Mode
│   ├── waste/                       # Chapter 9: Waste Management Theory Master DPP Vault
│   │   └── index.html               # 50 Most Expected Theory Qs, 200+ Variations, Methods & 3Rs Drawer, Blur Mode
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
├── history/                         # ALL History subject content lives strictly here
│   └── notes/                       # ICSE Class 10 History PDF notes
│       ├── The_First_War_Of_Independence_01_Class_Notes.pdf (5.8 MB) — Causes & factors
│       └── The_First_War_Of_Independence_02_Class_Notes.pdf (4.0 MB) — Events & consequences
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

1. **Subject Folder Isolation**: All Geography notes, MCQs, toposheets, maps, or chapter-specific interactive theory vaults MUST reside strictly inside `geography/` and its dedicated subfolders (`climate/`, `soil/`, `vegetation/`, `water/`, `transport/`, `waste/`, `notes/`, `mcq/`, `toposheet/`, etc.). All History notes and content MUST reside strictly inside `history/` (e.g. `history/notes/`). Never place loose subject files in the repository root.
2. **Standard File Structure for Engines**: Each interactive chapter vault is named `index.html` inside its respective folder (e.g. `geography/<topic>/index.html`) so it can be served as a clean standalone web app or embedded smoothly inside the main dashboard iframe.
3. **Always Include Navigation & Fonts**: Every chapter engine `index.html` MUST include:
   - Google Fonts (`Inter`, `Outfit`, `JetBrains Mono`) and `Material Symbols Outlined`.
   - The `.home-nav-btn` linking back to `../../index.html` with `target="_top"` so students can easily return to the dashboard.
4. **No Empty Subject Folders**: Do NOT create empty directories for Mathematics, Physics, Chemistry, Biology, etc., until the user provides actual files for them. Active content folders currently exist for Geography (`geography/`) and History (`history/notes/`). Full authentic ICSE Class 10 chapter syllabi for all 9 subjects are mapped in `data.js` and `data.json`.
5. **No Root Clutter**: Never leave raw download files (like `gemini-code-*.html` or `temp_*.html`) in the root directory. Process them into their proper folder (`geography/...`, `history/...`) and remove the loose download file immediately.
6. **Leave Video Downloader Untouched**: The `Video_Downloader/` directory is for a completely different utility. Never modify, delete, or commit changes inside `Video_Downloader/`.
7. **Always Synchronize `data.js` and `data.json`**: When adding a new item or chapter, update both files in parallel. `data.js` attaches to `window.COURSE_DATA` for offline `file://` usage, while `data.json` is for standard HTTP fetching.
8. **Git Push Protocol**: Always commit changes and use `BypassSandbox: true` for `git push origin main` because sandbox restricts network access.
9. **Sidebar Navigation Stability**: Keep `.nav-menu` with `overflow-x: hidden !important;`, `overscroll-behavior: contain;`, and `padding-bottom: 24px;`. Prevent any hover `translateX` on `.nav-item` / `.nav-item-featured` that triggers horizontal scrollbars or boundary oscillation loops. Both `.logo-area` and `.sidebar-footer` must have `flex-shrink: 0;`.

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

### C. Chapter 2: Soil Resources Theory Master DPP Vault (`geography/soil/index.html`)
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

### D. Chapter 3: Natural Vegetation Theory Master DPP Vault (`geography/vegetation/index.html`)
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

### E. Chapter 4: Water Resources Theory Master DPP Vault (`geography/water/index.html`)
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

### F. Chapter 5: Transport Network Theory Master DPP Vault (`geography/transport/index.html`)
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

### G. Chapter 9: Waste Management Theory Master DPP Vault (`geography/waste/index.html`)
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

### H. Master 100 MCQ DPP & DNA Diagnostic Engine (`geography/mcq/index.html`)
- 100 high-yield questions covering all 9 CISCE units.
- 8-Year Board Frequency Matrix (2018–2026).
- Practice & Timed DPP Exam modes with instant explanation drawers.
- 100-Question Palette Modal navigator for instant jumping.
- Hardware-accelerated CSS containment for 60fps lag-free scrolling.

### I. Topography Question 1 Master Blueprint & Exam Engine (`geography/toposheet/index.html`)
- 50 exact questions across 5 sets for Survey of India Map Sheets G43S10 & G43S7.
- Live 15-Minute Target Timer (Board exam allocation) with countdown & drill modes.
- Automated evaluation with CISCE marking scheme answers.
- 4 Full Tabs:
  1. Interactive Exam & Question Sets (50 Qs)
  2. 8-Year CISCE DNA Frequency Matrix (2018–2026)
  3. Formula & Scale Calculation Master Cheat Sheet
  4. Survey Conventional Symbols & Color Codes Cheat Sheet
- CSS containment (`content-visibility: auto`) for zero lag.

### J. History Notes (2 PDFs in `history/notes/`)
- **`The_First_War_Of_Independence_01_Class_Notes.pdf` (5.8 MB)**:
  - Political, socio-religious, economic & military causes of 1857 Revolt.
  - Doctrine of Lapse, annexation of Awadh, disrespect to Bahadur Shah Zafar.
  - Interference with customs (General Service Enlistment Act, Religious Disabilities Act, taxation on temples/mosques).
  - Economic exploitation, drain of wealth, ruin of handicrafts.
  - Military grievances & Immediate cause: Introduction of the Enfield rifle greased cartridge.
- **`The_First_War_Of_Independence_02_Class_Notes.pdf` (4.0 MB)**:
  - Major storm centres & suppression (Meerut, Delhi, Kanpur, Lucknow, Jhansi).
  - Results and consequences: Government of India Act 1858 (transfer of rule from British East India Company to the Crown).
  - Queen Victoria's Proclamation of 1858 (pledge of religious non-interference and equal treatment).
  - Military reorganization (ratio of European to Indian troops increased, artillery placed exclusively in British hands).
  - Policy of Divide and Rule, financial burden, and rise of Indian nationalism.

### K. Authentic ICSE Class 10 Curriculum Alignment (All 9 Subjects)
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
2. **Physics (`sub-10-phy`) — 11 Chapters**:
   - Ch 1: Force, Work, Power and Energy
   - Ch 2: Simple Machines (Levers & Pulleys)
   - Ch 3: Refraction of Light at Plane Surfaces (TIR & Critical Angle)
   - Ch 4: Refraction through a Lens
   - Ch 5: Spectrum & Electromagnetic Waves
   - Ch 6: Sound (Echoes & Resonance)
   - Ch 7: Current Electricity (Ohm's Law & Internal Resistance)
   - Ch 8: Electrical Power & Household Circuits (Ring System & 3-pin plug)
   - Ch 9: Electro-Magnetism
   - Ch 10: Calorimetry
   - Ch 11: Radioactivity & Nuclear Energy
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
   - 17 Complete Class Notes PDFs (Climate, Soil, Vegetation, Water, Minerals, Energy)
   - Agriculture & Manufacturing Industries MCQ DPPs
6. **History & Civics (`sub-10-his`) — 19 Chapters**:
   - *History*:
     - Ch 1: The First War of Independence (1857) [2 Class Notes PDFs Live]
     - Ch 2: Growth of Nationalism & Early Nationalists
     - Ch 3: Assertive Nationalism & Partition of Bengal
     - Ch 4: The Muslim League & Lucknow Pact
     - Ch 5: Mahatma Gandhi & National Movement (1919–1934)
     - Ch 6: The Quit India Movement
     - Ch 7: Forward Bloc and the INA
     - Ch 8: Independence & Partition of India
     - Ch 9: The First World War (1914–1918)
     - Ch 10: Rise of Dictatorships (Fascism & Nazism)
     - Ch 11: The Second World War (1939–1945)
     - Ch 12: United Nations Organization
     - Ch 13: Major Agencies of the United Nations
     - Ch 14: The Non-Aligned Movement (NAM)
   - *Civics*:
     - Civics Ch 1: The Union Parliament
     - Civics Ch 2: The Executive — President & Vice-President
     - Civics Ch 3: The Prime Minister & Council of Ministers
     - Civics Ch 4: The Supreme Court
     - Civics Ch 5: The High Courts & Subordinate Courts
7. **English (`sub-10-eng`) — 4 Chapters**:
   - Ch 1: Drama — Julius Caesar (Acts III, IV, V)
   - Ch 2: Treasure Chest — ICSE Poems
   - Ch 3: Treasure Chest — ICSE Short Stories
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
5. **Test in Browser**: Launch `browser_subagent` to verify navigation, modes, timer, and drawer rendering.
6. **Commit & Push to GitHub**:
   - Run `git add` and `git commit`.
   - Run `git push origin main` with `BypassSandbox: true`.
7. **Update This File**: Always record the changes, new question counts, and features in this document (`PROJECT_STATE.md`) automatically before finishing your turn.
