module.exports = {
  darkMode: 'class',
  content: ['./**/*.{jsx,tsx,mdx}'],
  theme: {
    extend: {},
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
  plugins: [require('@tailwindcss/forms')],
};
