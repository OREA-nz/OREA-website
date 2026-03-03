/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        orea: {
          cream:     '#F9F6F1',   // Cream White -- primary background
          dark:      '#4A3F35',   // Espresso Brown -- primary text, headings
          champagne: '#D4C4A8',   // Warm Beige -- accent borders, CTA outlines
          gold:      '#C5B8A0',   // Muted Champagne -- decorative accents, ornamental
          'gold-a':  '#8B7D65',   // Accessible gold for small text (4.5:1 vs cream)
          taupe:     '#7D6B5C',   // Cocoa Taupe -- secondary text (large text only)
          sand:      '#E2D8CB',   // Warm Sand -- subtle borders, form accents, secondary backgrounds
          linen:     '#E8DFD3',   // Soft Sand -- borders, dividers, card backgrounds
          earth:     '#9B8877',   // Mocha Brown -- tertiary text, hover states
          oatmeal:   '#D9CFC1',   // Latte Beige -- secondary borders, input bg
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'display':  ['clamp(2.25rem, 5vw + 1rem, 5rem)',        { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'h1':       ['clamp(1.875rem, 3vw + 1rem, 3.75rem)',    { lineHeight: '1.15', letterSpacing: '0' }],
        'h2':       ['clamp(1.5rem, 2.5vw + 0.75rem, 3rem)',    { lineHeight: '1.2',  letterSpacing: '0' }],
        'h3':       ['clamp(1.25rem, 2vw + 0.5rem, 1.875rem)',  { lineHeight: '1.3',  letterSpacing: '0.01em' }],
        'h4':       ['clamp(1rem, 1vw + 0.5rem, 1.25rem)',      { lineHeight: '1.4',  letterSpacing: '0.02em' }],
        'body-lg':  ['clamp(1rem, 0.5vw + 0.875rem, 1.125rem)', { lineHeight: '1.7',  letterSpacing: '0.01em' }],
        'body':     ['clamp(0.875rem, 0.25vw + 0.8125rem, 1rem)',{ lineHeight: '1.7',  letterSpacing: '0.015em' }],
        'body-sm':  ['clamp(0.75rem, 0.2vw + 0.7rem, 0.875rem)',{ lineHeight: '1.6',  letterSpacing: '0.02em' }],
        'caption':  ['clamp(0.625rem, 0.15vw + 0.6rem, 0.75rem)',{ lineHeight: '1.5', letterSpacing: '0.08em' }],
        'micro':    ['clamp(0.5rem, 0.1vw + 0.475rem, 0.625rem)',{ lineHeight: '1.4', letterSpacing: '0.1em' }],
      },
      spacing: {
        'section-sm': 'clamp(3rem, 4vw, 4rem)',
        'section':    'clamp(4rem, 6vw, 6rem)',
        'section-lg': 'clamp(5rem, 8vw, 8rem)',
        'section-xl': 'clamp(6rem, 10vw, 10rem)',
      },
      maxWidth: {
        'content':   '48rem',
        'container': '72rem',
        'wide':      '100rem',
      },
    },
  },
  plugins: [],
}
