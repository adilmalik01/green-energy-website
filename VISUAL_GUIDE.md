# 🎨 Green Energy Pakistan - Visual Design Guide

## Color Palette

### Primary Colors
- **Solar Green** - `#66a31f` / `hsl(84, 66%, 42%)`
  - Used for: Main buttons, primary accents, headings
  - Purpose: Brand identity, call-to-action

- **Teal Green** - `#1d9d46` / `hsl(117, 55%, 45%)`
  - Used for: Secondary accents, hover states
  - Purpose: Complementary solar energy feel

### Neutral Colors
- **Background** - `#fafbf7` / Off-white
  - Used for: Page backgrounds, card backgrounds
  - Purpose: Premium, clean aesthetic

- **Foreground** - `#0f2810` / Dark green
  - Used for: Text, headings
  - Purpose: High contrast, readability

- **Muted** - `#7a8671` / Gray-green
  - Used for: Secondary text, placeholders
  - Purpose: Visual hierarchy

- **Border** - `#e5e6e0` / Light gray
  - Used for: Dividers, input borders
  - Purpose: Visual separation

### Accent Colors
- **Destructive** - `#ef4444` (Red)
  - Used for: Errors, warnings
  - Purpose: Attention, safety

---

## Typography System

### Font Families
- **Headings & Body:** Geist (Variable font)
- **Monospace:** Geist Mono (for code)

### Font Sizes & Weights

#### Headings
```
heading-xl   = 3rem → 5rem (mobile to desktop)
              Font weight: 700 (bold)
              Line height: 1.2 (tight)

heading-lg   = 2rem → 3rem
              Font weight: 700
              Line height: 1.2

heading-md   = 1.25rem → 2rem
              Font weight: 600 (semibold)
              Line height: 1.2

body-lg      = 1rem → 1.25rem
              Font weight: 400 (normal)
              Line height: 1.625 (relaxed)

body-base    = 1rem → 1.125rem
              Font weight: 400
              Line height: 1.625
```

### Text Utilities
- `.text-balance` - Optimal line breaking
- `.text-pretty` - Enhanced readability
- `leading-relaxed` - Better line height

---

## Spacing System

### Section Padding
```
.section-padding = 
  Mobile:  px-4 py-16 (64px vertical)
  Tablet:  px-8 py-24 (96px vertical)
  Desktop: px-12 py-32 (128px vertical)
```

### Container
```
.container-wide =
  Full width responsive
  Horizontal padding adjusts by screen
  Max-width: 7xl (80rem)
```

### Gap Utilities
```
gap-4  = 1rem (16px)
gap-6  = 1.5rem (24px)
gap-8  = 2rem (32px)
```

---

## Component Styling

### Buttons

#### Primary Button (`.btn-primary`)
```
Background: Solar Green
Color: White
Padding: px-6 py-3
Rounded: lg (0.5rem)
Font: Semibold
Hover: Darker green, scale up
Transition: All 200ms
```

#### Outline Button (`.btn-outline`)
```
Border: 2px Solar Green
Color: Solar Green
Padding: px-6 py-3
Rounded: lg
Font: Semibold
Hover: Filled with green
Transition: All 200ms
```

### Cards (`.card-elevated`)
```
Background: White
Shadow: sm (light shadow)
Hover: Shadow md (enhanced shadow)
Rounded: lg
Transition: Shadow 300ms
```

---

## Responsive Design

### Breakpoints
```
Mobile:  < 640px   (default)
Tablet:  640px+    (md prefix)
Desktop: 1024px+   (lg prefix)
Wide:    1280px+   (xl prefix)
```

### Layout Strategy
- **Mobile First:** Design for mobile, then enhance
- **Grid/Flex:** Use flexbox for most layouts
- **Padding:** Responsive container padding
- **Typography:** Scales with screen size

---

## Animation System

### Entrance Animations
```
fadeInUp = {
  hidden: { opacity: 0, y: 20px }
  visible: { opacity: 1, y: 0 }
  transition: default (0.4s)
}
```

### Stagger Pattern
```
staggerContainer = {
  hidden: opacity 0
  visible: stagger children by 0.1s
}
```

### Hover Effects
```
card: shadow sm → md (on hover)
button: scale 1 → 1.05 (on hover)
button: scale 1 → 0.95 (on tap)
```

---

## Hero Carousel

### Layout
```
Full-width, full-height (100vh)
Centered content overlay
Dark overlay (black 40%)
Gradient background
Animated background element
```

### Navigation
```
Left/Right Arrows:
  Size: 24-32px
  Position: Sides, middle
  Background: White 20% opacity
  Hover: White 40% opacity

Dot Indicators:
  Position: Bottom center
  Active: 8px × 3px (wider)
  Inactive: 3px × 3px
  Gap: 0.75rem
```

### Slide Content
```
Max-width: 3xl
Text alignment: Center
Heading: 6rem → 8rem (scales)
Subheading: lg → 2xl
CTA Buttons: 2 side-by-side
Spacing: 1.5rem gap between elements
```

---

## Products Grid

### Layout
```
Mobile:  1 column
Tablet:  2 columns (grid-cols-2)
Desktop: 3 columns (grid-cols-3)
Gap: 2rem (32px)
```

### Product Card
```
Image:    Top section
Name:     Heading lg
Series:   Small badge (primary/20 background)
Desc:     Body text (muted)
Features: Bullet list
Link:     "View Details" button
```

### Series Filter
```
Pills (rounded-full) format
Active: Primary background, white text
Inactive: Card background, border
Hover: Primary border, primary/5 bg
Gap: 0.75rem
```

---

## Contact Form

### Field Styling
```
Border: 1px border-border
Rounded: lg
Padding: px-4 py-3
Background: background
Color: foreground
Focus: ring-2 ring-primary
Placeholder: text-muted-foreground

Focus state:
  outline: none
  ring-2 ring-primary
  ring-offset: 2px
```

### Layout
```
Mobile:  Full width, stacked
Desktop: 2 columns (name/email)
Gap: 1rem
```

---

## Call-to-Action (CTA)

### Strip Section
```
Background: Primary (Solar Green)
Color: Primary-foreground (White)
Padding: py-16 md:py-24 lg:py-32
```

### CTA Buttons
```
Primary CTA: Solid green, white text
Secondary CTA: Outlined, white border
Size: Large (px-8 py-3)
Font: Bold, uppercase tracking

Hover effects:
  Scale: 1 → 1.05
  Shadow: Enhanced
  Duration: 300ms
```

---

## Footer

### Layout
```
Background: Card background
Border-top: 1px border-border
Multiple columns (responsive)
Gap: 2rem between sections
```

### Content Sections
```
1. About - Company info + logo
2. Links - Navigation links
3. Services - What we offer
4. Contact - Social + WhatsApp
```

---

## Mobile Considerations

### Touch Targets
- Minimum 44x44px for buttons
- 48px preferred for CTA buttons
- Adequate padding around clickables

### Text Sizing
- Minimum 16px base font
- Headings scale down proportionally
- Good contrast ratios maintained

### Images
- Responsive sizing (100vw width)
- Proper aspect ratios
- Lazy loading enabled

### Navigation
- Mobile menu available
- Large touch targets
- Clear hierarchy

---

## Theme Variables (CSS Custom Properties)

Located in `/app/globals.css`:

```css
:root {
  /* Colors (HSL format) */
  --primary: 84 66% 42%;              /* Solar Green */
  --secondary: 117 55% 45%;           /* Teal */
  --background: 0 0% 99%;             /* Off-white */
  --foreground: 120 15% 18%;          /* Dark green */
  
  /* Spacing */
  --radius: 0.5rem;                   /* Border radius */
  
  /* Other tokens */
  --muted: 0 0% 90%;
  --border: 0 0% 92%;
  --input: 0 0% 95%;
}
```

---

## Accessibility Features

- **Color Contrast:** WCAG AA compliant (4.5:1 minimum)
- **Focus States:** Visible ring on all interactive elements
- **ARIA Labels:** All buttons have descriptive labels
- **Semantic HTML:** Proper heading hierarchy
- **Screen Readers:** Form labels properly associated
- **Keyboard Navigation:** All interactive elements accessible via keyboard

---

## Performance Optimizations

- **Images:** Optimized from Unsplash
- **Fonts:** System fonts for fast loading
- **CSS:** Utility-first, no unused CSS
- **JS:** Minimal dependencies, code splitting
- **Animations:** GPU-accelerated transforms

---

## Dark Mode (Future Enhancement)

The system is designed to support dark mode:

```css
.dark {
  --primary: 84 66% 50%;
  --background: 120 15% 12%;
  --foreground: 0 0% 95%;
  /* ... other dark mode colors ... */
}
```

---

## Design Principles

1. **Clean & Minimal** - Not cluttered, purposeful spacing
2. **Professional** - Enterprise-grade aesthetics
3. **Accessible** - WCAG compliant, inclusive design
4. **Performance** - Fast loading, smooth animations
5. **Responsive** - Works on all devices
6. **Consistent** - Uniform design system
7. **Solar-Focused** - Green tones throughout
8. **CTA-Driven** - Clear action paths

---

*This visual guide ensures consistent design implementation across the Green Energy Pakistan platform.*
