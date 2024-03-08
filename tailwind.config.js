module.exports = {
  darkMode: 'class',
  content: ['./**/*.{jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        'sm': '512px', //default '640px'
        '2xl': '1980px' //default '1536px'
      },
      keyframes: {
        ripple: {
          '0%': { width: '0px', height: '0px', opacity: 0.5 },
          '100%': { width: '500px', height: '500px', opacity: 0 }
        },
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '75%': { transform: 'translateX(-2px)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        ripple: 'ripple 1s linear infinite',
        shake: 'shake 0.5s ease-in-out'
      }
    }
  },
  safelist: [
    { pattern: /^col-span-[1-9]$/ },
    { pattern: /^col-span-1[0-2]$/ },
    { pattern: /^col-start-[1-9]$/ },
    { pattern: /^col-start-1[0-2]$/ },
    // {
    //   pattern: /^col-span-[2-4]$/,
    //   variants: ['md'],
    // },
  ],
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.grid-responsive': {
          '@apply grid grid-cols-12': {},
        },
        '.cols-responsive': {
          '@apply col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 2xl:col-span-1': {},
        },
      });
    },
    require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};
