/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".navbar-item": {
          "@apply flex items-center space-x-2 hover:text-indigo-600 cursor-pointer transition duration-200 ease-in-out hover:scale-110":
            {},
        },
        ".profile-row" : {
          "@apply py-2 px-2 flex items-center justify-center text-center":{},
        }
      });
    },
  ],
};
