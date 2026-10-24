---
name: ui-ux-pro-max
description: "UI/UX design intelligence for web, mobile, and desktop. Use when designing, building, reviewing, or fixing interfaces, including pages, components, design systems, accessibility, interaction, responsive layout, typography, color, and stack-specific UI implementation. Provides 79+ searchable UI styles (Glassmorphism, Neumorphism, Bento Grid, Brutalism, Minimalist, Swiss, Cyberpunk, Dark/Light modes), 192 product color palettes, 74 font pairings with Google Fonts, 119 UX guidelines, and tech stack design system blueprints."
---

# UI/UX Pro Max - Design Intelligence

UI/UX design intelligence toolkit for crafting distinctive, production-grade interfaces across web and mobile.

## When to Apply
Use this skill whenever a task involves **visual design decisions, UI layout structure, typography, color harmony, or component architecture**:
- Designing new pages, dashboards, landing pages, or feature modules
- Choosing color palettes, font pairings, contrast ratios, and spacing tokens
- Selecting an intentional design archetype (e.g., Glassmorphism, Bento Grid, Brutalism, Minimalist, Dark Mode)
- Reviewing UI for UX anti-patterns, accessibility (WCAG 2.2 AA), and responsiveness
- Improving perceived visual quality and making the interface feel premium and bespoke

Skip for pure backend algorithms, non-visual scripts, or database queries.

---

## 1. The Design-System-First Workflow
Before jumping into raw HTML/CSS code, establish the visual blueprint:
1. **Identify the Product Domain**: (e.g., Education, Exam Engine, Fintech, Developer Tools, Luxury).
2. **Select Design Style & Dial**:
   - **Bento Grid**: Structured modular layout with varying card aspect ratios, subtle borders, high information density.
   - **Glassmorphism**: Translucent frosted backgrounds (`backdrop-filter: blur(16px)`), delicate 1px border highlights (`rgba(255, 255, 255, 0.12)`), deep multi-layer ambient shadows.
   - **Clean Minimalist**: Generous whitespace, razor-sharp typographic hierarchy, high-contrast monochrome with one surgical accent color.
   - **Swiss / International Typographic**: Heavy sans-serif display typography, mathematical grid alignments, asymmetric tension.
   - **Neo-Brutalism / High Contrast**: Bold solid borders (2px–3px black), hard geometric drop shadows (`box-shadow: 4px 4px 0px #000`), vibrant pop accents.
   - **Cyberpunk / Dark Tech**: Deep dark background (`#0a0b10`), neon cyan/violet/emerald glowing accents, subtle grid lines, monospace data labels.
3. **Define Token System**:
   - **Color Palette**: 1 base dark/light, 1-2 surface tones, 1 primary brand accent, 1 secondary accent, functional colors (success, error, warning).
   - **Typography**: 1 display/headline font + 1 highly readable body font (with Google Fonts `@import`).
   - **Spacing & Radius**: Consistent scale (4px, 8px, 12px, 16px, 24px, 32px) and cohesive border-radius tokens.

---

## 2. Priority Checklist & Anti-Patterns

| Priority | Category | Key Checks (Must Have) | Anti-Patterns (Never Do) |
| :--- | :--- | :--- | :--- |
| **1. Accessibility** | WCAG 2.2 AA | Text contrast ≥ 4.5:1 (3:1 for large text). Visible keyboard focus rings (`:focus-visible`). | Removing focus rings (`outline: none` without replacement). Gray-on-gray low contrast text. |
| **2. Typography** | Font Hierarchy | Body text ≥ 15px–16px, `line-height: 1.5–1.6`. Max line length 65–80ch. Distinct display vs body font. | Text < 12px. Unstyled default browser fonts. More than 2 font families. Centered body text over 3 lines. |
| **3. Color** | Cohesive Palette | Semantic color tokens (primary, surface, border, text-muted). Proper dark/light elevation. | Random hex codes scattered across CSS. Generic "AI-purple" gradient washes everywhere. |
| **4. Layout & Rhythm** | Responsive Scale | Mobile-first breakpoints. Fluid grid/flexbox. Generous breathing room. Zero horizontal overflow. | Fixed pixel container widths. Hardcoded element heights that clip text. Crowded touch targets (<44px). |
| **5. Interaction** | Micro-Feedback | Hover, active, and focus transitions (150ms–250ms `cubic-bezier`). Accessible button feedback. | Instant 0ms state jumps. Hover effects that shift neighboring layout geometry. |
| **6. Visual Depth** | Layering & Shadows | Layered elevation (ambient blur + key light shadow). Subtle borders for surface separation. | Heavy muddy black shadows (`rgba(0,0,0,0.5)`). Clashing border styles. |

---

## 3. Curated Typography Pairings
When applying Google Fonts:
- **Modern Tech / Clean**: `Outfit` (Headings) + `Inter` (Body)
- **Editorial / Academic**: `Playfair Display` or `Cinzel` (Headings) + `Plus Jakarta Sans` or `Lora` (Body)
- **High-End SaaS / Precision**: `Cabinet Grotesk` or `Syne` (Headings) + `Geist` or `Inter` (Body)
- **Developer / Terminal**: `JetBrains Mono` or `Space Grotesk` (Headings) + `Fira Code` / `Inter` (Body)

---

## 4. Execution Guidance for Code Generation
- Ensure all interactive elements have hover and focus states with smooth transitions.
- Use CSS custom properties (`--primary`, `--surface-1`, `--surface-2`, `--border-subtle`, `--text-main`, `--text-muted`) for instantaneous theming.
- Add micro-delight: subtle border glow on active inputs, scale bounce on primary buttons (`transform: scale(0.98)` on active), smooth dialog/modal backdrops.
