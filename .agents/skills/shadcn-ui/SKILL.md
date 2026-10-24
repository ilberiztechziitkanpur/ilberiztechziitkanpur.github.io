---
name: shadcn-ui
description: "Component patterns, accessible headless primitives, and design engineering based on shadcn/ui. Use when building or restructuring interactive UI elements (modals, dialogs, accordions, dropdowns, tabs, toast notifications, badges, tooltips, sheets, command palettes) with accessible ARIA standards, modern Tailwind/CSS variables, and headless interaction logic."
---

# shadcn/ui Component Patterns & Architecture

Guidance for building accessible, modular, production-ready frontend components inspired by the official `shadcn/ui` architecture.

---

## 1. When to Use
Use this skill whenever you need to build or refactor interactive frontend components:
- Modals, Dialogs, and Confirmation popovers
- Accordions, Collapsible FAQs, and Multi-step Drawers
- Dropdown Menus, Context Menus, and Select pickers
- Segmented Tabs, Sliders, and Pill switchers
- Tooltips, Popovers, and Toast notifications
- Command palettes (`Cmd+K` style search drawers)

---

## 2. Headless Component Patterns & Accessibility
Rather than building fragile UI elements that break keyboard navigation, follow the Radix/shadcn headless patterns:

### Modals & Dialogs
- **Overlay**: Backdrop with `rgba(0,0,0,0.7)` and `backdrop-filter: blur(4px)`.
- **Keyboard Handling**:
  - Close automatically on `Escape` key press.
  - Focus trap: Tab cycles strictly within the modal content while open.
  - Return focus to the triggering button when closed.
- **ARIA**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="dialog-title"`, `aria-describedby="dialog-desc"`.

### Accordions & Drawers
- **Button Header**: `<button type="button" aria-expanded="false" aria-controls="panel-id">`.
- **Content Panel**: `<div id="panel-id" role="region" aria-labelledby="button-id">`.
- **Animation**: CSS Grid row expansion or smooth max-height transitions.

### Tabs & View Switchers
- **Tab List**: `<div role="tablist" aria-orientation="horizontal">`.
- **Individual Tab**: `<button role="tab" aria-selected="true" aria-controls="panel-1">`.
- **Keyboard Navigation**: Left/Right arrow keys navigate between tabs; Enter/Space activates.

---

## 3. Semantic CSS Variables (shadcn Theme Model)
Define component colors using semantic HSL or OKLCH tokens in CSS:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

[data-theme="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 48%;
}
```
