---
name: ux-ui-architecture
description: "Senior UX/UI design architect and systems engineering skill. Integrates DTCG (Design Tokens Community Group) token hierarchies, 138+ recognized design systems (Apple HIG, Vercel, Linear, Stripe, Material Design 3, Tailwind/shadcn), 8-state component specs (default, hover, focus, active, disabled, loading, error, selected), WCAG 2.2 AA-AAA accessibility compliance audits, and objective quality gates (design-qa) that validate contrast, layout overflow, and responsive scaling."
---

# UX/UI Architecture & Design Systems Engineering

Transforms the agent into a senior design systems architect who enforces strict token-driven hierarchies, comprehensive component interactive states, and automated accessibility standards.

---

## 1. Design Token Architecture (DTCG Standard)
Always organize CSS variables and design tokens into a 3-tier hierarchy:

1. **Primitive Tokens (Raw Values)**:
   - Palette ramps: `--color-neutral-900: #0e1117;`, `--color-accent-500: #2563eb;`
   - Spacing scales: `--space-1: 4px;`, `--space-2: 8px;`, `--space-4: 16px;`, `--space-6: 24px;`
   - Radius: `--radius-sm: 6px;`, `--radius-md: 10px;`, `--radius-lg: 16px;`

2. **Semantic Tokens (Meaning & Purpose)**:
   - Backgrounds: `--bg-canvas`, `--bg-surface`, `--bg-elevated`, `--bg-subtle`
   - Borders: `--border-default`, `--border-hover`, `--border-focus`, `--border-active`
   - Text: `--text-primary`, `--text-secondary`, `--text-muted`, `--text-on-accent`
   - Status: `--status-success`, `--status-warning`, `--status-danger`, `--status-info`

3. **Component-Scoped Tokens**:
   - `--button-primary-bg`, `--input-focus-ring`, `--card-shadow-ambient`

---

## 2. The 8 Component Interactive States
Never design or implement a UI component with just default styling. Every interactive element (buttons, cards, inputs, selects, toggles) must declare specs for all relevant states:

1. **Default**: Baseline resting state with clear affordance and boundaries.
2. **Hover**: Smooth elevation shift, border illumination, or background tint change (150ms–200ms transition).
3. **Focus / Focus-Visible**: Prominent, high-contrast focus ring (min 2px–3px offset outline) for keyboard navigation. Never hide outline without replacing it.
4. **Active / Pressed**: Immediate tactile response (e.g., `transform: scale(0.98)` or deeper inset shadow).
5. **Disabled**: Reduced opacity (0.4–0.6), cursor set to `not-allowed`, pointer events disabled, distinct from resting state.
6. **Loading**: Integrated spinner or skeleton placeholder with aria-busy="true", keeping button dimensions stable to prevent layout shift.
7. **Error / Validation**: Red accent border (`--status-danger`), inline helper text with SVG icon, ARIA error association (`aria-invalid="true"`).
8. **Selected / Checked**: Distinct accent fill, checkmark or pill indicator, high-contrast active foreground.

---

## 3. Accessibility Standards (WCAG 2.2 AA–AAA)
- **Contrast Math**:
  - Normal text (< 18px / < 14px bold): Contrast ratio ≥ **4.5:1** against its background.
  - Large text (≥ 18px / ≥ 14px bold) & UI component borders/icons: Contrast ratio ≥ **3:1**.
- **Touch Target Floor**: Interactive targets must be at least **44 × 44 CSS pixels** on mobile touchscreens.
- **Keyboard Traversal**: Logical `tabindex` sequence, accessible escape key behavior on modals, focus traps inside active dialogs.
- **Screen Reader Clarity**: Non-decorative icons must feature `aria-label` or `<span class="sr-only">`. Decorative icons must carry `aria-hidden="true"`.

---

## 4. Objective Quality Gates (`design-qa`)
Before concluding any implementation:
- **Zero Horizontal Overflow**: Test viewports at 360px, 768px, 1024px, and 1440px. Ensure no horizontal scrollbars occur unexpectedly.
- **Content Scaling**: Verify text containers don't truncate or break when font size is zoomed by 150%.
- **Theme Resilience**: Check that text remains crisp and readable across both dark and light theme variations without invisible gray-on-dark traps.
