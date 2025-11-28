# 🎬 CineMax Movie Booking - UI/UX Design System

> **Design Philosophy**: Clean, Modern, Cinema-Inspired, Dark Theme Excellence
> **Priority**: Clarity > Beauty, Function > Form, Simplicity > Complexity

---

## 🎨 COLOR PALETTE

### Background & Surfaces
```css
--bg-primary: #0F0F1A        /* Main background - Deep space blue-black */
--bg-secondary: #1A1A2E      /* Cards, sections - Elevated dark */
--bg-tertiary: #252539       /* Hover states, inputs - Lighter elevated */
--bg-overlay: rgba(0,0,0,0.8) /* Modal overlays */
```

### Text Colors
```css
--text-primary: #FFFFFF      /* Headings, primary text - Pure white */
--text-secondary: #A0A0B8    /* Body text, descriptions - Soft gray */
--text-muted: #6B6B85        /* Captions, meta info - Muted gray */
--text-disabled: #4A4A5E     /* Disabled states */
```

### Brand & Accent Colors
```css
--accent-primary: #E50914    /* CTA buttons, highlights - Netflix red */
--accent-hover: #F40612      /* Hover state for primary accent */
--accent-secondary: #FFB800  /* Ratings, badges - Golden yellow */
--accent-success: #00C853    /* Success states - Vibrant green */
--accent-info: #00B8D4       /* Info, links - Bright cyan */
```

### Borders & Dividers
```css
--border-default: #2A2A3E    /* Default borders - Subtle dark */
--border-light: rgba(255,255,255,0.1) /* Lighter borders */
--border-accent: rgba(229,9,20,0.3)   /* Accent borders */
```

### **STRICT RULES:**
- ❌ **NEVER** use: `shadow-*`, `gradient-*`, `glass-effect`, emoji in production UI
- ✅ **ALWAYS** use: Solid colors from palette, single border only
- ✅ Backgrounds: Only `bg-[primary/secondary/tertiary]`
- ✅ Text: Only `text-[primary/secondary/muted]`
- ✅ Accent: Only `accent-primary` for CTA, `accent-secondary` for ratings

---

## 📐 SPACING SYSTEM

### Base Unit: 4px
**ONLY use these predefined spacing values:**

```
xs:  4px  (1 unit)  - Tight spacing, icon-text gaps
sm:  8px  (2 units) - Small gaps, button padding-y
md:  12px (3 units) - Default gaps, input padding
lg:  16px (4 units) - Card padding, section gaps
xl:  24px (6 units) - Large section padding
2xl: 32px (8 units) - Page section spacing
3xl: 48px (12 units) - Hero section spacing
```

### Tailwind Classes (Use ONLY these)
```css
gap-1 (4px), gap-2 (8px), gap-3 (12px), gap-4 (16px), gap-6 (24px), gap-8 (32px)
p-2 (8px), p-3 (12px), p-4 (16px), p-6 (24px), p-8 (32px)
m-2 (8px), m-3 (12px), m-4 (16px), m-6 (24px), m-8 (32px)
```

### **STRICT RULES:**
- ❌ **NEVER** use: Arbitrary values `p-[17px]`, odd numbers
- ✅ **ALWAYS**: Stick to spacing scale above
- ✅ Sections: Minimum `py-12` (48px) vertical padding
- ✅ Containers: `px-4 sm:px-6 lg:px-8` for responsive horizontal padding

---

## 🔤 TYPOGRAPHY

### Font Families
```css
--font-heading: 'Montserrat Alternates', sans-serif  /* Weights: 600, 700 */
--font-body: 'Be Vietnam Pro', sans-serif            /* Weights: 400, 500, 600 */
--font-mono: 'JetBrains Mono', monospace             /* Code, technical text */
```

### Type Scale
```css
/* Headings - Montserrat Alternates, 600 weight */
h1: text-5xl (48px)  leading-tight  font-semibold  /* Page titles */
h2: text-4xl (36px)  leading-tight  font-semibold  /* Section titles */
h3: text-3xl (30px)  leading-snug   font-semibold  /* Subsection titles */
h4: text-2xl (24px)  leading-snug   font-semibold  /* Card titles */
h5: text-xl  (20px)  leading-normal font-semibold  /* Small headings */

/* Body Text - Be Vietnam Pro */
body-lg:   text-lg   (18px)  leading-relaxed  font-normal  /* Intros, highlights */
body:      text-base (16px)  leading-relaxed  font-normal  /* Default body */
body-sm:   text-sm   (14px)  leading-relaxed  font-normal  /* Captions, meta */
body-xs:   text-xs   (12px)  leading-normal   font-normal  /* Tiny labels */

/* Special */
label:     text-sm   (14px)  leading-normal   font-medium  /* Form labels */
button:    text-base (16px)  leading-none     font-medium  /* Button text */
```

### **STRICT RULES:**
- ❌ **NEVER** use: Font weights other than 400, 500, 600, 700
- ❌ **NEVER** use: Italic, underline (except links), all-caps (except small labels)
- ✅ **ALWAYS**: Headings = `text-[primary]`, Body = `text-[secondary]`
- ✅ Line height: `leading-tight` (headings), `leading-relaxed` (body)

### Import Fonts (Add to index.html or CSS)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@600;700&family=Be+Vietnam+Pro:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 🔲 BORDER RADIUS

### Predefined Values
```css
--radius-sm:   6px   /* rounded-md   - Inputs, tags */
--radius-md:   8px   /* rounded-lg   - Buttons, small cards */
--radius-lg:   12px  /* rounded-xl   - Cards, modals */
--radius-xl:   16px  /* rounded-2xl  - Hero cards, large sections */
--radius-full: 9999px /* rounded-full - Avatars, pills */
```

### Usage Guidelines
```
- Buttons: rounded-lg (8px)
- Input fields: rounded-md (6px)
- Cards: rounded-xl (12px)
- Movie posters: rounded-lg (8px)
- Avatar/Icons: rounded-full
- Pills/Badges: rounded-full
```

### **STRICT RULES:**
- ❌ **NEVER** use: Custom radius like `rounded-[10px]`
- ✅ **ALWAYS**: Use Tailwind classes: `rounded-[sm/md/lg/xl/2xl/full]`
- ✅ Consistency: Same component type = same radius always

---

## 🎯 COMPONENT PATTERNS

### 1. BUTTONS

#### Primary Button (CTA)
```jsx
<button className="
  bg-accent-primary hover:bg-accent-hover
  text-white text-base font-medium
  px-6 py-3 rounded-lg
  transition-colors duration-200
  border border-accent-primary
">
  Book Now
</button>
```

#### Secondary Button
```jsx
<button className="
  bg-transparent hover:bg-bg-tertiary
  text-text-primary text-base font-medium
  px-6 py-3 rounded-lg
  transition-colors duration-200
  border border-border-default
">
  Learn More
</button>
```

#### Icon Button
```jsx
<button className="
  w-10 h-10 flex items-center justify-center
  bg-transparent hover:bg-bg-tertiary
  text-text-secondary hover:text-text-primary
  rounded-lg transition-all duration-200
  border border-border-default
">
  <Icon className="w-5 h-5" />
</button>
```

**Rules:**
- Padding: `px-6 py-3` (medium), `px-8 py-4` (large)
- Icons: Lucide Icons, `w-5 h-5` or `w-6 h-6`
- Always include `border` for definition
- Transition: `duration-200` for all interactive states

### 2. CARDS

#### Movie Card
```jsx
<div className="
  bg-bg-secondary border border-border-default rounded-xl
  overflow-hidden hover:border-border-accent
  transition-all duration-200
">
  <div className="aspect-[2/3] overflow-hidden">
    <img className="w-full h-full object-cover" />
  </div>
  <div className="p-4">
    <h4 className="text-xl font-semibold text-text-primary mb-2">
      Movie Title
    </h4>
    <p className="text-sm text-text-secondary">
      Description
    </p>
  </div>
</div>
```

**Rules:**
- Background: `bg-bg-secondary`
- Border: `border border-border-default`, hover to `border-accent`
- Padding: `p-4` (small cards), `p-6` (large cards)
- No shadow, no gradient

### 3. INPUTS

#### Text Input
```jsx
<input className="
  w-full px-4 py-3 rounded-md
  bg-bg-tertiary text-text-primary
  border border-border-default
  focus:border-accent-primary focus:outline-none
  transition-colors duration-200
  text-base font-normal
" />
```

**Rules:**
- Height: `py-3` (48px total with border)
- Border: Always visible, focus state = `border-accent-primary`
- Background: `bg-bg-tertiary`
- Font: `text-base font-normal`

### 4. ICONS

**Source:** Lucide React ONLY
```jsx
import { Play, Star, Heart, Search, User } from 'lucide-react';

<Play className="w-5 h-5" strokeWidth={2} />  /* Small */
<Star className="w-6 h-6" strokeWidth={2} />  /* Medium */
```

**Rules:**
- Sizes: `w-4 h-4` (tiny), `w-5 h-5` (default), `w-6 h-6` (large)
- Style: Outline only, `strokeWidth={2}`
- Color: Inherit from parent text color
- ❌ **NEVER**: Filled icons, custom SVGs without reason

### 5. BADGES & PILLS

```jsx
/* Rating Badge */
<div className="
  inline-flex items-center gap-1 px-3 py-1 rounded-full
  bg-accent-secondary/10 border border-accent-secondary/30
  text-accent-secondary text-xs font-medium
">
  <Star className="w-3 h-3" />
  <span>8.5</span>
</div>

/* Status Pill */
<div className="
  inline-block px-3 py-1 rounded-full
  bg-accent-success/10 border border-accent-success/30
  text-accent-success text-xs font-medium
">
  Now Showing
</div>
```

**Rules:**
- Always `rounded-full`
- Padding: `px-3 py-1`
- Font: `text-xs font-medium`
- Background: Accent color with `/10` opacity
- Border: Accent color with `/30` opacity

---

## 📱 RESPONSIVE BREAKPOINTS

```css
sm: 640px   /* Mobile landscape, small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Container Pattern
```jsx
<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Grid Patterns
```jsx
/* Movie Grid */
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

/* 2-Column Layout */
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

**Rules:**
- Always mobile-first: Base styles, then `sm:`, `md:`, etc.
- Grid gaps: `gap-4` (small), `gap-6` (medium), `gap-8` (large)
- Max width: `max-w-[1400px]` for main containers

---

## 🎬 PAGE STRUCTURE PATTERNS

### 1. HERO SECTION
```jsx
<section className="relative min-h-[80vh] flex items-center py-16 overflow-hidden">
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="max-w-2xl">
      <h1 className="text-5xl sm:text-6xl font-semibold text-text-primary mb-4">
        Hero Title
      </h1>
      <p className="text-lg text-text-secondary mb-8">
        Hero description
      </p>
      <div className="flex gap-4">
        <button>Primary CTA</button>
        <button>Secondary CTA</button>
      </div>
    </div>
  </div>
</section>
```

### 2. CONTENT SECTION
```jsx
<section className="py-16">
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-8">
      <h2 className="text-4xl font-semibold text-text-primary mb-3">
        Section Title
      </h2>
      <p className="text-text-secondary">Section description</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Content */}
    </div>
  </div>
</section>
```

### 3. NAVBAR
```jsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border-default">
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo, Nav Links, Actions */}
    </div>
  </div>
</nav>
```

**Rules:**
- Section spacing: `py-12` (mobile), `py-16` (desktop)
- Section title: `mb-8` gap before content
- Always use container pattern with max-width

---

## 🎭 ANIMATION & TRANSITIONS

### Transition Durations (Use ONLY these)
```css
duration-150  /* Quick interactions: hover, focus */
duration-200  /* Default: buttons, cards, borders */
duration-300  /* Smooth: modals, dropdowns, slides */
```

### Framer Motion Patterns
```jsx
/* Fade In Up */
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
/>

/* Scale In */
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.2 }}
/>

/* Slide In (Modal) */
<motion.div
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 100 }}
  transition={{ duration: 0.3 }}
/>
```

**Rules:**
- ❌ **NEVER**: Animations longer than 300ms
- ❌ **NEVER**: Bounce, spring, elastic easing
- ✅ **ALWAYS**: Subtle, fast, purposeful
- ✅ Use `ease` or `ease-out` only

---

## 🚫 FORBIDDEN PATTERNS

### ❌ NEVER USE:
1. **Shadows**: `shadow-sm`, `shadow-lg`, `drop-shadow`, etc.
2. **Gradients**: `bg-gradient-to-r`, gradient text effects
3. **Glass/Blur Effects**: `backdrop-blur` (except navbar), `backdrop-filter`
4. **Emoji**: 🎬 🎥 ⭐ - Use Lucide icons instead
5. **Multiple Borders**: Only single `border` allowed
6. **Arbitrary Values**: `p-[17px]`, `text-[15px]` - Use scale
7. **Custom Colors**: Only use defined palette
8. **Font Weights**: Only 400, 500, 600, 700
9. **Opacity Variants**: Except for backgrounds (`/10`, `/20`) and borders (`/30`)

### ⚠️ USE SPARINGLY:
1. **Opacity**: Only for disabled states, overlays
2. **Transitions**: Only `duration-150/200/300`
3. **Transform**: Only for hover scale (`hover:scale-105`)

---

## 📋 CHECKLIST FOR EVERY COMPONENT

Before committing any UI component, verify:

- [ ] Uses only colors from defined palette
- [ ] Uses only spacing from spacing scale (4, 8, 12, 16, 24, 32, 48)
- [ ] Uses correct font family (Montserrat Alternates for headings, Be Vietnam Pro for body)
- [ ] Uses correct font weights (400, 500, 600 only)
- [ ] Uses correct border radius (rounded-md, rounded-lg, rounded-xl, rounded-full)
- [ ] Has proper border (`border border-border-default`)
- [ ] No shadows, no gradients, no glass effects
- [ ] Icons are from Lucide React, sizes w-5 or w-6
- [ ] Transitions are 150ms, 200ms, or 300ms only
- [ ] Responsive with mobile-first approach
- [ ] Hover/Focus states properly defined
- [ ] Text colors: primary for headings, secondary for body
- [ ] Background: bg-primary, bg-secondary, or bg-tertiary only

---

## 🎨 EXAMPLE COMPONENT IMPLEMENTATIONS

### Complete Movie Card
```jsx
<div className="
  group relative bg-bg-secondary border border-border-default rounded-xl 
  overflow-hidden transition-all duration-200 hover:border-accent-primary
">
  {/* Poster */}
  <div className="aspect-[2/3] overflow-hidden bg-bg-tertiary">
    <img 
      src={movie.poster} 
      alt={movie.title}
      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
    />
  </div>
  
  {/* Content */}
  <div className="p-4">
    {/* Title */}
    <h4 className="text-xl font-semibold text-text-primary mb-2 line-clamp-1">
      {movie.title}
    </h4>
    
    {/* Meta Info */}
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-accent-secondary" />
        <span className="text-sm font-medium text-accent-secondary">
          {movie.rating}
        </span>
      </div>
      <span className="text-sm text-text-muted">
        {movie.year}
      </span>
      <span className="inline-block px-2 py-0.5 rounded-full bg-accent-info/10 border border-accent-info/30 text-accent-info text-xs font-medium">
        {movie.genre}
      </span>
    </div>
    
    {/* Description */}
    <p className="text-sm text-text-secondary line-clamp-2 mb-4">
      {movie.description}
    </p>
    
    {/* CTA Button */}
    <button className="
      w-full bg-accent-primary hover:bg-accent-hover 
      text-white text-base font-medium px-4 py-2.5 rounded-lg 
      transition-colors duration-200 border border-accent-primary
    ">
      Book Now
    </button>
  </div>
</div>
```

### Search Bar
```jsx
<div className="relative max-w-xl mx-auto">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
  <input
    type="text"
    placeholder="Search movies..."
    className="
      w-full pl-12 pr-4 py-3 rounded-lg
      bg-bg-tertiary text-text-primary placeholder:text-text-muted
      border border-border-default focus:border-accent-primary
      transition-colors duration-200 outline-none
      text-base font-normal
    "
  />
</div>
```

### Loading Spinner
```jsx
<div className="flex items-center justify-center p-8">
  <div className="
    w-12 h-12 rounded-full border-4 border-border-default 
    border-t-accent-primary animate-spin
  " />
</div>
```

---

## 📚 QUICK REFERENCE SHEET

### Colors
- **BG**: `bg-bg-primary` (main), `bg-bg-secondary` (cards), `bg-bg-tertiary` (inputs)
- **Text**: `text-text-primary` (headings), `text-text-secondary` (body), `text-text-muted` (captions)
- **Accent**: `bg-accent-primary` (CTA), `text-accent-secondary` (ratings)
- **Border**: `border-border-default` (default), `border-accent-primary` (active)

### Spacing
- **Gaps**: `gap-2` (8px), `gap-4` (16px), `gap-6` (24px)
- **Padding**: `p-4` (16px), `p-6` (24px), `p-8` (32px)
- **Sections**: `py-12` (48px), `py-16` (64px)

### Typography
- **Headings**: `text-4xl font-semibold text-text-primary` (Montserrat Alternates)
- **Body**: `text-base text-text-secondary` (Be Vietnam Pro)
- **Small**: `text-sm text-text-muted`

### Components
- **Button**: `px-6 py-3 rounded-lg border bg-accent-primary text-white`
- **Card**: `bg-bg-secondary border border-border-default rounded-xl p-4`
- **Input**: `px-4 py-3 rounded-md bg-bg-tertiary border border-border-default`
- **Badge**: `px-3 py-1 rounded-full text-xs bg-accent/10 border border-accent/30`

### Icons
- **Size**: `w-5 h-5` (default), `w-6 h-6` (large)
- **Source**: Lucide React only
- **Style**: Outline, `strokeWidth={2}`

---

## 🔄 UPDATING THIS DOCUMENT

When creating new UI patterns that work well:
1. Take screenshot and analyze what works
2. Extract exact values (spacing, colors, sizes)
3. Add to relevant section with code example
4. Update checklist if new rule emerges
5. Remove outdated patterns that don't match new direction

**This is a living document - refine as the design evolves!**

---

**Last Updated**: November 28, 2025
**Version**: 1.0.0
**Maintained by**: Senior UI/UX Design Team
