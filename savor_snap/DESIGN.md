---
name: Savor & Snap
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5b403f'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#8f6f6e'
  outline-variant: '#e4bebc'
  surface-tint: '#bb162c'
  primary: '#b7122a'
  on-primary: '#ffffff'
  primary-container: '#db313f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b1'
  secondary: '#7c5800'
  on-secondary: '#ffffff'
  secondary-container: '#feb700'
  on-secondary-container: '#6b4b00'
  tertiary: '#994100'
  on-tertiary: '#ffffff'
  tertiary-container: '#c05400'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#ffba20'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#783200'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  price-display:
    fontFamily: Montserrat
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  container-padding: 20px
  gutter: 16px
---

## Brand & Style
The brand personality is energetic, appetizing, and approachable, designed to trigger immediate hunger and ease of use in a fast-paced dining environment. The target audience includes urban foodies and quick-service diners who value quality and visual appeal. 

The design style is **Corporate Modern with a Tactile twist**. It utilizes clean, high-contrast layouts to ensure menu items are the hero, while employing soft shadows and significant roundedness to create a friendly, "squishy" physical quality. The interface should feel as satisfying to interact with as the food is to eat.

## Colors
The palette is rooted in the "ketchup and mustard" theory of appetizing design. **Primary Red (#E23744)** is used for critical actions, branding, and price highlights to stimulate appetite and urgency. **Secondary Yellow (#FFB800)** serves as a warm accent for ratings, badges, and special offers. **Tertiary Orange (#F97316)** provides a bridge for secondary navigational elements. 

The background remains a crisp, clean **Light Neutral (#F8F8F8)** to ensure that high-quality food photography pops without visual competition. Surface colors for cards and containers use pure white (#FFFFFF) to create subtle depth against the off-white background.

## Typography
The system uses a pairing of **Montserrat** for headlines and **Be Vietnam Pro** for body text. Montserrat’s geometric, bold weights provide a modern, authoritative look for item names and categories. Be Vietnam Pro offers a friendly, contemporary feel that remains highly legible even at small sizes for ingredient lists and nutritional info.

Heavy weights (Bold/ExtraBold) are reserved for item titles and pricing to create a clear visual hierarchy. Line heights are generous to prevent the menu from feeling cluttered, maintaining an airy, upscale snack-bar vibe.

## Layout & Spacing
The layout is **Mobile-First and Fluid**, utilizing a 4-column grid for mobile and a 12-column grid for desktop. On mobile, the primary layout pattern is a single-column vertical feed of large "Hero Cards" or a two-column "Grid View" for sides and drinks.

Spacing follows an 8pt rhythm to maintain consistency. Large internal margins (20px) within cards prevent content from feeling cramped against the highly rounded corners. Between sections, 48px (2xl) of whitespace is used to clearly delineate between "Burgers," "Sides," and "Beverages."

## Elevation & Depth
Depth is created through **Ambient Shadows** and tonal stacking. Surfaces never use harsh borders; instead, they rely on soft, diffused shadows (Blur: 20px, Y: 10px, Opacity: 6% Black) to lift "Product Cards" off the neutral background. 

High-priority elements, like the "Floating Cart" or "Add to Order" buttons, use a more pronounced shadow to indicate interactivity. A subtle backdrop blur (Glassmorphism) is applied to the navigation bar to maintain context of the food images as the user scrolls.

## Shapes
The design system embraces a **2XL Rounded** aesthetic. Main product cards, image containers, and primary buttons use a 1.5rem (24px) corner radius to evoke a soft, friendly, and modern feeling. 

Small interactive elements like quantity toggles and chips use a "Pill" shape (Full rounding) to distinguish them from structural cards. This extreme roundedness reflects the organic shapes of the food itself (buns, patties) and removes any "industrial" coldness from the digital interface.

## Components
- **Product Cards:** Featuring a top-heavy layout with a large aspect-ratio (4:3) image, followed by the item name in Montserrat Bold and a small description. The price is anchored to the bottom-right in Red.
- **Primary Buttons:** High-saturation Red (#E23744) with white text, using 24px rounded corners. They include a subtle "press" animation that scales the button down slightly (0.98x).
- **Category Chips:** Pill-shaped, using a light grey fill when inactive and a Primary Red fill with white text when active. 
- **Quantity Selector:** A compact, rounded container with "-" and "+" icons flanking the current number, using the Secondary Yellow for the icons to make them easily discoverable.
- **Modifier Lists:** Checkboxes and radio buttons for toppings are styled as large, tappable "tile" components rather than tiny icons, ensuring ease of use on mobile screens.
- **Nutritional Badges:** Small, rounded tags (e.g., "Vegan," "Spicy") using low-saturation versions of the accent colors to inform without distracting from the main item.