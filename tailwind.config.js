module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "Marron-F": "linear-gradient(to bottom, #000 7.6%, #09195a 100%)",
        },
        fontSize: {
          base: "1rem",
          lg: "1.25rem",
          xl: "1.5625rem",
          "2xl": "1.875rem",
          "3xl": "2.1875rem",
          "4xl": "5rem",
        },
        fontFamily: {
          Orbitron: "Orbitron",
        },
        boxShadow: {
          EFFET: "0px 0px 10px 0px rgba(255,255,255,0.75)",
        },
        borderRadius: {
          none: "0",
          xs: "0.25rem",
          sm: "1.25rem",
          default: "1.875rem",
          lg: "2rem",
          xl: "2.1875rem",
          full: "9999px",
        },
      },
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          '.gradient-marron-f': {
            background: 'linear-gradient(to bottom, #000 7.6%, #09195a 100%)',
          },
        };
    
        addUtilities(newUtilities, ['responsive', 'hover']);
      },
    ],
  };


  