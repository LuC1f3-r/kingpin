export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html,css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'circular-web': ['circular-web', 'sans-serif'],
        'general': ['general', 'sans-serif'],
        'robert-medium': ['robert-medium', 'sans-serif'],
        'robert': ['robert-regular', 'sans-serif'],
        'zentry': ['zentry-regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
