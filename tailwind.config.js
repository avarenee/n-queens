module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    {
      pattern: /grid-cols-(1[0-2]|[1-9])/
    },
    {
      pattern: /grid-rows-(1[0-2]|[1-9])/
    },
  ]
};