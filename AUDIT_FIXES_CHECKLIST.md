# UI/UX Audit Fixes - Verification Checklist

## Quick Test Guide

### ✅ Form Input States
- [ ] Click on form inputs - golden focus ring appears
- [ ] Type invalid email - red border shows (if validation added)
- [ ] Disable button in DevTools - button appears grayed out
- [ ] Tab through form - focus ring visible on every element
- [ ] Try to submit empty form - error message appears with red background
- [ ] Submit with valid data - success message appears with checkmark

### ✅ Button States
- [ ] Hover on buttons - color changes to gold
- [ ] Click buttons - slight scale down effect
- [ ] Tab to buttons - visible focus ring
- [ ] Disabled button - grayed out with no-cursor

### ✅ Hero Section Layout
- [ ] Desktop (1280px+) - Hero displays properly with good spacing
- [ ] Tablet (768px-1024px) - Layout adapts cleanly
- [ ] Mobile (< 768px) - Portrait image and text stack vertically
- [ ] Very small (< 480px) - Reduced padding, readable text
- [ ] Resize browser - No layout thrashing or weird jumps

### ✅ Form Submission Flow
- [ ] Visit /contact page
- [ ] Fill out all fields
- [ ] Click Submit button - changes to "Sending…"
- [ ] Wait 1.5 seconds - success message appears
- [ ] See checkmark "✓ Message sent successfully!"
- [ ] Form clears automatically
- [ ] Try submitting without filling fields - error message appears

### ✅ LayeredStack (Pillar Cards)
- [ ] Desktop (1024px+) - Cards stack on mouse over
- [ ] Desktop - Cards spread/rotate when hovering
- [ ] Tablet (768px) - Cards visible, interactive
- [ ] Mobile - Cards display in grid
- [ ] Resize from mobile to desktop - cards animate to stacked position

### ✅ Navigation
- [ ] Scroll down - nav background becomes frosted/blurred
- [ ] Scroll back up - nav background is transparent
- [ ] Click hamburger on mobile - menu slides out
- [ ] Click menu item - menu closes automatically
- [ ] All nav links are clickable and navigate correctly

### ✅ Responsive Breakpoints
Test at these exact widths:
- [ ] 320px (small phone)
- [ ] 480px (phone)
- [ ] 640px (tablet portrait)
- [ ] 768px (tablet)
- [ ] 1024px (desktop)
- [ ] 1280px+ (large desktop)

### ✅ Accessibility (Keyboard)
- [ ] Tab through entire page - focus ring visible on all interactive elements
- [ ] Enter on buttons - action executes
- [ ] Space on buttons - action executes
- [ ] Arrow keys in modals (if added) - navigation works

### ✅ Color Contrast
Test with WebAIM: https://webaim.org/resources/contrastchecker/

Check these combinations:
- [ ] Text on white background - passes WCAG AA (4.5:1)
- [ ] Links on white - passes WCAG AA
- [ ] Form labels - passes WCAG AA
- [ ] Placeholder text - passes WCAG AA (now at 55% opacity)

### ✅ Form Validation
- [ ] Empty name field - shows error when submitting
- [ ] Invalid email - shows error (add pattern validation)
- [ ] Missing message - shows error
- [ ] All fields valid - success message shows

---

## Browser DevTools Checks

### Console
- [ ] No errors in console
- [ ] No warnings about deprecated APIs
- [ ] No console.warn about accessibility

### Lighthouse Audit
```
npm run build
# Then audit with Lighthouse in Chrome DevTools
```

Target scores:
- [ ] Performance: >85
- [ ] Accessibility: >90
- [ ] Best Practices: >90
- [ ] SEO: >90

### Mobile DevTools
- [ ] Responsive design mode shows correct layouts at all breakpoints
- [ ] Touch emulation works (if testing mobile interactions)
- [ ] No horizontal scrolling at any width
- [ ] Text is readable without zoom

---

## Design Tokens Verification

### Colors
```bash
# Check that these are being used instead of hardcoded values
grep -r "var(--color-" app/ components/
grep -r "var(--gold)" app/ components/
grep -r "var(--space-" app/ components/
```

Should find many matches. If you see hardcoded colors like `#111` or `#2c2c2c`, consider updating to use tokens.

### Spacing
Check that arbitrary margins/padding are replaced:
```bash
grep -rE "margin:|padding:" app/ components/ | grep -v "var(--"
```

Should be minimal matches. Most spacing should use `var(--space-*)`.

---

## Performance Tests

### Image Loading
- [ ] Hero portrait loads without external API delay
- [ ] Contact avatar loads quickly
- [ ] No placeholder images visible for >1 second
- [ ] Images scale responsively (no oversized downloads)

### Animation Performance
- [ ] Form message slide-in is smooth (60fps)
- [ ] Button press animation is responsive
- [ ] Hero section fade-up is smooth
- [ ] No jank when scrolling with animations

### Bundle Size
```bash
npm run build
# Check .next/static for reasonable bundle sizes
```

---

## Remaining Work (Phase 3)

### Before Going Live:
- [ ] Replace Figma API image URLs with local images
- [ ] Add proper alt text to all images
- [ ] Implement error boundaries for resilience
- [ ] Add empty state components
- [ ] Complete API endpoint for form submission
- [ ] Add keyboard arrow navigation to card stacks

### Nice-to-Have:
- [ ] Dark mode support (prefers-color-scheme)
- [ ] Print stylesheet
- [ ] Advanced image optimization
- [ ] Progressive enhancement

---

## Testing Devices

If possible, test on:
- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] iPad/Tablet (Safari, Chrome)
- [ ] iPhone/Android phone
- [ ] Screen reader (NVDA on Windows, VoiceOver on Mac)

---

**Last Updated:** 2026-03-25
**Status:** Ready for testing
