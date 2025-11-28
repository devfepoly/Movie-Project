# 🚀 Quick Start Guide - Continue Redesigning Pages

## Đã hoàn thành (Completed ✅)

1. ✅ **UI_RULES.md** - Design system hoàn chỉnh
2. ✅ **index.css** - Global styles theo design system mới
3. ✅ **Navbar Component** - Clean, modern, no shadows/gradients
4. ✅ **Movie Card Component** - Border-based design, clean hover

---

## Cách áp dụng cho các trang còn lại

### Bước 1: Chuẩn bị
Mở file `UI_RULES.md` để tham khảo trong khi code.

### Bước 2: Prompt cho AI

Copy prompt này và thay `[TÊN_TRANG]` bằng trang cần redesign:

```
Bạn là Senior UI/UX Designer. Code UI phải sạch, tối giản. Tuân thủ 100% các Rules trong file UI_RULES.md:

**RULES BẮT BUỘC:**

COLOR PALETTE:
- Background: bg-primary (#0F0F1A), bg-secondary (#1A1A2E), bg-tertiary (#252539)
- Text: text-primary (#FFFFFF), text-secondary (#A0A0B8), text-muted (#6B6B85)
- Accent: accent-primary (#E50914 - Netflix red), accent-secondary (#FFB800 - Golden)
- Border: border-default (#2A2A3E)

CẤM TUYỆT ĐỐI:
❌ shadow-*, gradient-*, glass-effect
❌ backdrop-blur (trừ navbar)
❌ emoji (🎬⭐❤️...)
❌ Multiple borders
❌ Opacity variants (trừ /10, /20, /30)

BẮT BUỘC DÙNG:
✅ Border luôn luôn: border border-border-default
✅ Icons: Lucide React, w-5 h-5 hoặc w-6 h-6, strokeWidth={2}
✅ Transition: duration-150, duration-200, hoặc duration-300
✅ Spacing: 4px grid (gap-2/4/6, p-3/4/6, py-12/16)

TYPOGRAPHY:
- Heading: Montserrat Alternates, font-semibold (600), text-[4xl/3xl/2xl/xl]
- Body: Be Vietnam Pro, font-normal/medium (400/500), text-[base/sm]
- Color: Heading = text-text-primary, Body = text-text-secondary

COMPONENTS:
- Button Primary: px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white rounded-lg border border-accent-primary
- Button Secondary: px-6 py-3 bg-transparent hover:bg-bg-tertiary text-text-primary rounded-lg border border-border-default
- Card: bg-bg-secondary border border-border-default rounded-xl p-4 hover:border-accent-primary
- Input: px-4 py-3 bg-bg-tertiary border border-border-default rounded-md focus:border-accent-primary

BORDER RADIUS:
- Button: rounded-lg (8px)
- Card: rounded-xl (12px)
- Input: rounded-md (6px)
- Badge/Pill: rounded-full

---

Code lại component [TÊN_TRANG] theo đúng rules trên. 
- Đọc code cũ, giữ lại logic
- Redesign UI hoàn toàn theo rules
- Clean, modern, cinema dark theme
- Không dùng shadow, gradient, glass effect
```

### Bước 3: Các trang cần redesign

#### 1. Home Page
**File**: `src/pages/HomeTemplate/Home/index.jsx`
**Thay đổi chính**:
- Remove animated particles
- Remove gradient text effects
- Replace glass-effect buttons
- Clean hero section
- Update CTA buttons theo pattern
- Stats section: no gradients

#### 2. ListMovie Page
**File**: `src/pages/HomeTemplate/ListMovie/index.jsx`
**Thay đổi chính**:
- Remove Sparkles icon/effects
- Clean search bar
- Update filter buttons
- Loading state: simple spinner
- Grid spacing: gap-4

#### 3. MovieDetail Page
**File**: `src/pages/HomeTemplate/MovieDetail/index.jsx`
**Thay đổi chính**:
- Clean hero background
- Remove shadows from info cards
- Update showtime section
- Trailer modal: clean design

**Subcomponents** (4 files):
- `components/MovieHero.jsx`
- `components/MovieInfo.jsx`
- `components/ShowtimeSection.jsx`
- `components/TrailerModal.jsx`

#### 4. Footer
**File**: `src/pages/HomeTemplate/_components/Footer/index.jsx`
**Thay đổi chính**:
- Remove gradient borders
- Clean logo effect
- Simple hover states
- Border-top only

#### 5. Admin Dashboard
**File**: `src/pages/AdminTemplate/Dashboard/index.jsx`
**Thay đổi chính**:
- Dark theme (not white)
- Border-based cards
- Replace emoji with Lucide icons
- Clean stat cards

---

## Checklist sau khi code xong mỗi component

- [ ] Không có shadow-*, gradient-*, glass-effect
- [ ] Có border border-border-default ở tất cả cards/inputs/buttons
- [ ] Icons từ Lucide, size w-5/w-6, strokeWidth={2}
- [ ] Colors đúng palette (bg-primary/secondary/tertiary, text-primary/secondary/muted)
- [ ] Spacing đúng 4px grid (p-3/4/6, gap-2/4/6)
- [ ] Font đúng: Montserrat Alternates (heading) + Be Vietnam Pro (body)
- [ ] Border radius đúng: rounded-md/lg/xl/full
- [ ] Transition: duration-150/200/300
- [ ] Responsive: mobile-first

---

## Ví dụ Migration

### TRƯỚC (❌ Sai):
```jsx
<div className="bg-gradient-to-r from-pink-500 to-purple-600 shadow-2xl backdrop-blur-md rounded-3xl p-8">
  <h2 className="text-5xl font-bold gradient-text">
    🎬 Featured Movies
  </h2>
  <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg">
    Click Me
  </button>
</div>
```

### SAU (✅ Đúng):
```jsx
<div className="bg-bg-secondary border border-border-default rounded-xl p-6">
  <h2 className="text-4xl font-semibold text-text-primary">
    Featured Movies
  </h2>
  <button className="px-6 py-3 bg-accent-primary hover:bg-accent-hover text-white rounded-lg border border-accent-primary transition-colors duration-200">
    <Film className="w-5 h-5" strokeWidth={2} />
    Click Me
  </button>
</div>
```

---

## Tips

1. **Làm từng component một**: Đừng rush, focus vào quality
2. **Test responsive**: Check mobile, tablet, desktop
3. **Hover states quan trọng**: Luôn có hover:border-accent-primary hoặc hover:bg-bg-tertiary
4. **Consistency is key**: Mỗi button/card/input phải giống nhau
5. **Reference completed work**: Xem Navbar và Movie card đã làm

---

## Khi gặp vấn đề

- **Component trông flat quá?** → Add hover states và border colors
- **Thiếu visual hierarchy?** → Check font sizes và colors (primary/secondary/muted)
- **Spacing lạ?** → Stick to 4px grid (4, 8, 12, 16, 24, 32, 48)
- **Colors không match?** → Double check với palette trong UI_RULES.md

---

## Update UI_RULES.md

Nếu bạn tìm ra pattern mới hoạt động tốt:
1. Screenshot
2. Extract exact values
3. Add vào UI_RULES.md với code example
4. Share với team

---

**Happy Coding! 🚀**

Theo workflow này, bạn sẽ có một design system nhất quán, clean, và maintainable!
