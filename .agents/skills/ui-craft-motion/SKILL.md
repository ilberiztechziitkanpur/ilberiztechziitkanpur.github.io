---
name: ui-craft-motion
description: "High-craft UI engineering, micro-interactions, and motion physics inspired by ibelick (Julien Thibeaut). Use when designing or enhancing interfaces with modern tactile feedback, spring animations, dynamic border gradients, glass and blur shaders, interactive hover card physics, smooth accordions/drawers, and responsive micro-delight moments."
---

# UI Craft & Motion Engineering

A specialized skill for infusing modern web interfaces with fluid physics, tactile micro-interactions, and high-end visual shaders.

---

## 1. Principles of Modern Motion & Physics

1. **Natural Spring Easing Over Linear Changes**:
   - Never use `transition: all 0.5s linear` — it feels robotic and clunky.
   - Use standard spring-feel cubic beziers:
     - Snappy enter: `cubic-bezier(0.16, 1, 0.3, 1)`
     - Smooth out: `cubic-bezier(0.7, 0, 0.84, 0)`
     - Bouncy tactile press: `cubic-bezier(0.34, 1.56, 0.64, 1)`
   - Keep interactive durations tight: **120ms to 240ms** for hover and clicks; **250ms to 400ms** for modals and drawers.

2. **Respect Reduced Motion**:
   Always respect user accessibility preferences:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

---

## 2. Craft Visual Effects & Shaders

### 1. Modern Glassmorphic Backdrop
```css
.craft-glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

### 2. Glowing Gradient Border & Spotlight Hover
Give interactive cards a subtle dynamic boundary:
```css
.craft-card {
  position: relative;
  background: #111318;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.craft-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
}
```

### 3. Tactile Button Click (Micro-Bounce)
```css
.craft-button {
  transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.15s ease;
}
.craft-button:active {
  transform: scale(0.96);
}
```

---

## 3. High-Craft Layout Elements
- **Seamless Accordions & Drawers**: Animate using `grid-template-rows: 0fr` to `grid-template-rows: 1fr` with `overflow: hidden` for buttery smooth transitions without fixed heights.
- **Ambient Light Accents**: Place soft blurred radial glows (`filter: blur(80px)`) behind key focal points (such as high-yield timers or active exam headers) to draw natural eye focus.
- **Subtle Number / Timer Animations**: Use tabular figures (`font-variant-numeric: tabular-nums;`) so countdown digits don't jitter horizontally.
