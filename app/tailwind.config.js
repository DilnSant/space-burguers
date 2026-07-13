/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep space surfaces (darkest -> most elevated)
        space: {
          950: '#080510', // page background (deep space)
          900: '#0d0819', // base
          850: '#140d22', // section
          800: '#1a1129', // card surface
          700: '#241733', // elevated / hover
          600: '#33234a', // border / outline
          500: '#4a3568', // muted outline
        },
        // Neon accents
        neon: {
          purple: '#b47cff',
          violet: '#8b5cf6',
          magenta: '#e0459a',
          pink: '#ff3d7f',
          red: '#ff4d5e',
          cyan: '#38e1ff',
          gold: '#ffcf5c',
        },
        star: '#f4f0ff', // primary text (starlight white)
        'star-dim': '#b9aecb', // secondary text
        'star-faint': '#7c7192', // tertiary / placeholder
        whatsapp: '#25d366',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },
      spacing: {
        xl: '32px',
        'container-padding': '20px',
        '2xl': '48px',
        base: '4px',
        gutter: '16px',
        sm: '12px',
        xs: '8px',
        lg: '24px',
        md: '16px',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      fontSize: {
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '16px', fontWeight: '500' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'price-display': ['22px', { lineHeight: '28px', fontWeight: '700' }],
        'label-lg': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
      },
      boxShadow: {
        nebula: '0 10px 40px -8px rgba(224, 69, 154, 0.5)',
        'nebula-lg': '0 12px 50px -6px rgba(224, 69, 154, 0.6)',
        'glow-purple': '0 0 24px -2px rgba(180, 124, 255, 0.55)',
        'glow-whatsapp': '0 8px 30px -4px rgba(37, 211, 102, 0.5)',
      },
      backgroundImage: {
        nebula: 'linear-gradient(100deg, #c026d3 0%, #e0225e 55%, #ff5147 100%)',
        'nebula-soft': 'linear-gradient(135deg, rgba(192,38,211,0.18), rgba(255,81,71,0.12))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
