/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#4f46e5',
            hover: '#4338ca',
          },
          destructive: {
            DEFAULT: '#ef4444',
            hover: '#dc2626',
          },
        },
      },
    },
    plugins: [],
  }