---
name: Mindful Study Canvas
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#4b41e1'
  on-secondary: '#ffffff'
  secondary-container: '#645efb'
  on-secondary-container: '#fffbff'
  tertiary: '#006242'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Be Vietnam Pro
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system establishes a focused, calm, and approachable personal learning environment. Tailored for self-directed learners, students, and lifelong knowledge seekers, it removes cognitive clutter to foster sustained attention and clear prioritization. The aesthetic bridges warm minimalism with functional modern productivity: pristine contrast, soft atmospheric backdrops, and deliberate tactile affordances. Rather than overwhelming users with administrative metrics or gamified distractions, the UI prioritizes clarity, mental breathing room, and a sense of daily accomplishment.

## Colors
The palette leverages a crisp, scholarly blue as the primary anchor, balanced by a deep indigo for secondary emphasis and interactive hierarchy. Supporting tokens deliver explicit functional meaning without visual noise:

- **Primary (`#2563EB`)**: Applied to primary CTAs, active study timers, prominent navigation indicators, and focused selection borders.
- **Secondary (`#4F46E5`)**: Used for contextual tags, session milestones, and subtle accents in interactive controls.
- **Tertiary & Functional**:
  - Success / Completed (`#10B981`): Task completion checkmarks, streak indicators, and resolved states.
  - Warning / In-Progress (`#F59E0B`): Pending deadlines and items currently in progress.
  - Destructive / Overdue (`#EF4444`): Overdue items and urgent warnings.
- **Surfaces & Neutral Text**:
  - Main Canvas (`#F8FAFC`): A soft, low-glare slate canvas that minimizes eye fatigue during extended study sessions.
  - Recessed / Grouping Canvas (`#F1F5F9`): Used for side panels, search inputs, and inactive track backdrops.
  - Pure Surface (`#FFFFFF`): Elevated task cards, modal sheets, and floating toolbars.
  - Text Hierarchy: Primary title (`#0F172A`), body/subheadings (`#334155`), and supportive metadata/placeholders (`#64748B`).

## Typography
The system specifies **Be Vietnam Pro** across all typographic tiers to ensure native diacritical clarity for Vietnamese orthography alongside crisp English legibility. Generous line heights prevent tone mark collisions (dấu câu) on complex academic notes and task descriptions. 

Key headers utilize negative letter spacing for tighter grouping, while micro-labels and status badges feature slightly expanded tracking to maintain instant scanability across mixed alphabet contexts.

## Layout & Spacing
The layout relies on a centralized, distraction-free container system capped at a maximum width of 1140px on desktop screens, ensuring task lists remain comfortably within natural scanning angles. 

- **Desktop (1024px+)**: A 12-column grid featuring `gutter` of 1.5rem and outer `margin` of 2rem. Sidebar navigation or course filters occupy 3 columns, while the primary task orchestration panel occupies the remaining 9 columns.
- **Tablet (768px - 1023px)**: An 8-column layout with 1.25rem gutters; auxiliary subject tags fold into a horizontal-scrolling chip bar above the main list.
- **Mobile (< 768px)**: A 4-column flow with `gutter-mobile` (1rem) and `margin-mobile` (1rem), collapsing controls into fixed-bottom action sheets for rapid single-handed task creation.
- **Vertical Rhythm**: Built upon an 8pt base unit. Inner card items stack with `space-sm` (8px) or `space-md` (16px), while distinct subject clusters separate using `space-xl` (32px).

## Elevation & Depth
Visual hierarchy is articulated through atmospheric, diffused shadows and subtle surface contrasts, deliberately avoiding heavy skeuomorphism or harsh outlines:

- **Level 0 (Flat / Canvas)**: `#F8FAFC` base application plane with zero elevation.
- **Level 1 (Card / Resting)**: `#FFFFFF` surfaces paired with an ultra-soft ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)` plus a hairline border (`1px solid #E2E8F0`).
- **Level 2 (Hover / Active Drag)**: Lifted state for interactive task items: `0 8px 16px -4px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`, border shifting to `#CBD5E1`.
- **Level 3 (Overlays / Modals)**: Task detail panels and popovers: `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Focus Ring**: Clear, accessible indicator featuring `box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2)` accompanied by `#2563EB` solid border outline.

## Shapes
A rounded geometric profile communicates friendliness and low stress. Core cards, input groups, and surface containers utilize `rounded-xl` (1rem / 16px). Interactive controls, primary buttons, dropdown triggers, and modal sheets adopt `rounded-lg` (0.75rem / 12px) to retain structural alignment. Micro-indicators such as status badges, completion chips, and subject tags are rendered as full pills (`9999px`) to visually differentiate metadata from actionable blocks.

## Components

### Buttons
- **Primary**: Solid `#2563EB` background with `#FFFFFF` text. Hover transitions to `#1D4ED8` with a subtle Y-axis translate (-1px). Active state resolves to `#1E40AF`.
- **Secondary**: `#EEF2FF` fill with `#4F46E5` text. On hover: `#E0E7FF`.
- **Ghost / Tertiary**: Transparent fill, `#334155` text. Hover applies `#F1F5F9`.
- **Structure**: Height 40px (desktop), 44px (mobile), horizontal padding `1rem`, `label-lg` typography.

### Input Fields & Quick-Add Task Box
- Base state: `#FFFFFF` fill with `1px solid #E2E8F0` border, `rounded-lg`, typography in `body-md`.
- Focus state: Border transitions to `#2563EB` with an ambient `3px` focus ring in `rgba(37, 99, 235, 0.15)`.
- Quick-Add input pinned at the top of task sections: Features an inline subject tag picker, keyboard shortcut badge (`Enter`), and auto-expanding notes area.

### Checkboxes & Completion Affordances
- Large, tactile 20x20px interactive boundary with `rounded-md` corners (6px).
- Unchecked: `1.5px solid #CBD5E1` with `#FFFFFF` center.
- Hover: Border switches to `#2563EB`.
- Checked: Seamless animated transition to `#10B981` solid fill displaying a crisp white vector checkmark. Accompanied by strikethrough styling and `#94A3B8` color transition on the adjacent task label.

### Task Cards & Lists
- Grouped list rows separated by 8px vertical margins.
- Cards feature `#FFFFFF` background, `rounded-xl`, hairline `#E2E8F0` border, and Level 1 elevation.
- Left-side indicator: A 3px vertical accent ribbon indicates task subject or urgency (e.g., `#2563EB` for Mathematics, `#F59E0B` for pending assignment).
- Metadata layout: Horizontal cluster displaying subject pill, due date/time badge, and priority label.

### Status Chips & Badges
- **Pill Form factor**: Height 24px, padding 4px 10px, typography `label-md`.
- **Completed**: `#ECFDF5` background, `#047857` text.
- **In-Progress**: `#FEF3C7` background, `#B45309` text.
- **Overdue**: `#FEF2F2` background, `#B91C1C` text.
- **Subject Chips**: Tinted pastels matched to subjects (e.g., `#EFF6FF` background with `#1D4ED8` text).

### Pomodoro / Focus Timer Bar
- A dedicated study companion bar positioned above active tasks.
- Displays elapsed time in `headline-lg`, accompanied by a minimal pill-shaped progress track (`#E2E8F0` background with `#2563EB` animated fill) and soft play/pause controls.