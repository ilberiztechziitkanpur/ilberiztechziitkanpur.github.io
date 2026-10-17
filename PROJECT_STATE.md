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
│       ├── The_First_War_Of_Independence_02_Class_Notes.pdf (4.0 MB) — Events & consequences
│       ├── The_First_War_Of_Independence_03_Class_Notes.pdf (4.2 MB) — Consequences & revision
│       ├── Growth_Of_Nationalism_01_Class_Notes.pdf (3.3 MB) — Factors & Lord Lytton's repressive policies
│       ├── Growth_Of_Nationalism_02_Class_Notes.pdf (3.6 MB) — Reformers, Press & INC foundation
│       ├── First_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf (3.3 MB) — Early Nationalists & Naoroji
│       ├── First_Phase_Of_The_Indian_National_Movement_02_Class_Notes.pdf (2.6 MB) — Gokhale & Banerjea
│       └── Second_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf (2.6 MB) — Assertive Nationalism, Curzon & Partition of Bengal
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
10. **Sidebar & Landing View Cleanliness Protocol (MANDATORY)**: The left navigation sidebar (`.nav-menu`) must NEVER accumulate past chapter buttons or older DPP engines into a massive scrolling list. Only **Overview**, curriculum batch links, and the **single latest update** (e.g. newly published chapter notes or active focus module) with a `NEW` badge are displayed in the sidebar quick-launch area. All previously published chapters, notes, and engines remain permanently accessible through their respective Subject and Chapter dashboard pages with all their original tags and badges. This ensures the dashboard on laptops and mobile devices remains uncluttered, elegant, and immediately signals to returning students what has just been updated.

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

### J. History Notes (8 PDFs in `history/notes/` across 4 Active Chapters)
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
- **Chapter 4: Second Phase of the Indian National Movement (Assertive Nationalism) (1 Note)**:
  - `Second_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf` (2.6 MB) — Assertive Nationalism: Causes for rise, repressive policies of Lord Curzon (Calcutta Corporation Act 1899, Official Secrets Act 1904, Indian Universities Act 1904), Partition of Bengal (1905 — pretext vs real motives), anti-partition agitation, Swadeshi & Boycott movements, assertive methods, and contributions of Lal-Bal-Pal (Bal Gangadhar Tilak, Bipin Chandra Pal, Lala Lajpat Rai).

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
6. **History & Civics (`sub-10-his`) — 20 Chapters**:
   - *History*:
     - Ch 1: The First War of Independence (1857) [3 Class Notes PDFs Live]
     - Ch 2: Growth of Nationalism [2 Class Notes PDFs Live]
     - Ch 3: First Phase of the Indian National Movement (1885–1907) [2 Class Notes PDFs Live]
     - Ch 4: Second Phase of the Indian National Movement (Assertive Nationalism) [1 Class Notes PDF Live]
     - Ch 5: The Muslim League & Lucknow Pact
     - Ch 6: Mahatma Gandhi & National Movement (1919–1934)
     - Ch 7: The Quit India Movement
     - Ch 8: Forward Bloc and the INA
     - Ch 9: Independence & Partition of India
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
   - *Fix*: Removed older accumulated quick-launch shortcuts from the main sidebar. Replaced them with a single clean, high-priority featured button for the newest published content: **"Second Phase Notes"** (`chap-his-4`) with a `NEW` badge. All previous engines and notes remain 100% active and accessible with their full metadata and badges under their respective Subject (`geography/`, `history/`) and Chapter pages.
7. **Addition of Chapter 3: First Phase of the Indian National Movement (1885–1907)**:
   - Added `First_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf` (3.3 MB) covering Early Nationalists (Moderates), beliefs, demands, methods (3 P's), achievements, criticisms, and Dadabhai Naoroji.
   - Added `First_Phase_Of_The_Indian_National_Movement_02_Class_Notes.pdf` (2.6 MB) covering Gopal Krishna Gokhale and Surendranath Banerjea.
   - Refined Chapter 2 (`Growth of Nationalism`) to cleanly focus on factors promoting nationalism and INC foundation, and properly renumbered subsequent History syllabus chapters (Ch 4 to Ch 15).
8. **Addition of Chapter 4: Second Phase of the Indian National Movement (Assertive Nationalism)**:
   - Added `Second_Phase_Of_The_Indian_National_Movement_01_Class_Notes.pdf` (2.6 MB) covering Assertive Nationalism, causes for its rise, Lord Curzon's repressive policies, Partition of Bengal (1905), Swadeshi & Boycott movements, Lal-Bal-Pal, and assertive methods.
   - Synchronized `data.js` and `data.json` under `sub-10-his` -> `chap-his-4`.
   - Updated quick-launch navigation in `script.js` to highlight "Second Phase Notes" with a glowing `NEW` badge.
   - Updated search suggestion placeholder to include "Second Phase" and "Assertive".


