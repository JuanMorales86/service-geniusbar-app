import { custom } from "astro:schema";
import { apply } from "node_modules/astro/dist/core/polyfill";
import defaultTheme from "tailwindcss/defaultTheme";
import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      mainbrand: {
        DEFAULT: "rgb(var(--accent))",
        light: "rgb(var(--accent-light))",
        dark: "var(--accent-dark)",
      },
      altbrand: {
        DEFAULT: "rgb(var(--accent))",
        light: "rgb(var(--accent-light))",
        dark: "var(--accent-dark)",
      },
      redCrayola: "#EF3054",
      accent: "rgb(136, 58, 234)",
      "accent-light": "rgb(224, 204, 250)",
      "accent-dark": "rgb(49, 10, 101)",
      "blk-gray-dark": "#13151a",
      "blk-gray-light": "#4b5563",
      dark: {
        bg: "#13151a",
        text: "#F9F9F9",
        input: "#4b5563",
      },
      light: {
        bg: "#F9F9F9",
        text: "#13151a",
        input: "#e5e7eb",
      },
      black: "#101010",
      blackep: "#13151a",
      blackEerie: "#191716",
      blackOlive: "#403D39",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        esp: "#D6D6D6",
        esp1: "#A9A9A9",
        esp2: "#9ca0a4",
        esp2Background: "#FEFEFF",
        esp3Botton: "#F5F5F7",
      },
      white: "#F9F9F9",
      whiteFloral: "#FFFCF2",
      blue: {
        200: "#9290C3",
        400: "#535C91",
        500: "#3b82f6",
        600: "#1B1A55",
        800: "#070F2B",
        esp: "#73b4eb",
        facebook: "#1877F2", // Color del ícono de Facebook
      },
      sky: {
        esp: "#1da1f2", //especial
        100: "#f0f9ff",
        200: "#e0f2fe",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
      },
      lime: {
        200: "#D4E567",
        400: "#B6CA38",
        500: "#84cc16",
        800: "#166534",
      },

      indigo: {
        900: "#312e81",
        800: "#3730a3",
        700: "#4338ca",
        600: "#4f46e5",
        500: "#6366f1",
        400: "#818cf8",
        300: "#a5b4fc",
        200: "#c7d2fe",
        100: "#e0e7ff",
      },
      pink: {
        instagram: "#E4405F", // Color del ícono de Instagram
        palePink: "#FADADD",
        hotPink: "#FF69B4",
        roseGold: "#B76E79",
      },

      purple: {
        light: "#B8A5FF",  // Light purple that pairs well with your sky colors
        medium: "#8B6DFF",  // Medium purple that bridges between your blues
        main: "#6B4EDB",  // Main purple that complements your blue-600
        darker: "#4A3A9C",  // Darker purple that works with your dark theme
        deeppurple: "#2D2463",  // Deep purple that pairs with your blackEerie
      },

      green: {
        whatsapp: "#25D366",
        forest: "#228B22",
        sage: "#98FB98",
        emerald: "#50C878",
        lime: "#32CD32",
        mint: "#98FF98",
        olive: "#808000",
        seafoam: "#98FF98",
        jade: "#00A86B",
        kelly: "#4CBB17",
        hunter: "#355E3B",
        spring: "#00FF7F",
        pine: "#01796F",
        shamrock: "#45CEA2",
        moss: "#8A9A5B",
      },
    },
    scale: {
      custom: "1.0",
      custom2: "1.025",
      custom3: "1.2",
      custom4: "1.5",
      custom5: "0.9",
      custom6: "1",
      custom7: "0.85",
      custom105: "1.05",
      custom050: "0.5",
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat Variable", ...defaultTheme.fontFamily.sans], //Es un array que especifica las fuentes que deseas utilizar para la familia sans-serif.
        display: ["Space Grotesk Variable, sans-serif"],
        aux: ["Roboto, sans-serif"],
        apple: ["SF Pro Display"],
        montserrat: ["var(--font-montserrat)"],
      },
      screens: {
        custom: "970px", //Punto de quiebre personal
        print: { raw: "print" },
      },

      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(15rem, 1fr))",
      },

      animation: {
        "spin-fast": "spin 2s cubic-bezier(0.0,0.0,1.0,1.0) infinite", //este cubic-bezier en esta animacion  es igual a decir linear
        "spin-slow": "spin 12s cubic-bezier(0.0,0.0,1.0,1.0) infinite",
        "spin-reverse": "spinreverse 0.5s linear 1 forwards",
        "spin-scale": "spinscale 12s ease-in-out infinite",
        "spin-whastapp": "spinwithpause 80s linear infinite",
		    "pulse-whatsapp": "pulsewithpause 5s ease-in-out infinite",
        "scroll-left": "scrollleft 60s linear infinite ",
        "scroll-right": "scrollright 60s linear infinite  ",
        appear: "appear 1s forwards",
        bounce: "bounce 5s ease-in-out infinite",
        "gradient-sweep": "gradientSweep2 8s ease-in-out infinite",
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
        appear: {
          "0%": {
            opacity: 0,
            transform: "scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },

        gradientSweep2: {
          "0%": {
            backgroundPosition: "0% 0%",
          },
          " 25%": {
            backgroundPosition: "0% 25%",
          },
          " 50%": {
            backgroundPosition: "0% 50%",
          },
          " 75%": {
            backgroundPosition: "0% 75%",
          },
          "100%": {
            backgroundPosition: "0% 100%",
          },
        },
        spinreverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        spinscale: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        spinwithpause: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "66.66%": { transform: "rotate(360deg)" },
        },
        pulsewithpause: {
          '0%, 66.66%, 100%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '33.33%': {
            transform: 'scale(1.1)',
            opacity: '0.8'
          },
          
		},
        scrollleft: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-50%)'
          }
        },
        scrollright: {
          '0%': {
            transform: 'translateX(-50%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        appear: {
          from: {
            opacity: 0,
            transform: "scale(0.5)",
          },
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      dropShadow: {
        custom: "10px 10px 16px #0b0b0b",
        "custom-blue": "10px 10px 5px rgba(0, 0, 0, 0.5)",
      },
      fontSize: {
        customtext: "clamp(1.25rem, 4vw, 4rem)",
        customtext2: "bold max(36px, 4vw) / min(48px, 5vw) font-sans",
      },
      backgroundImage: {
        "imagen-p": "url('https://i.imgur.com/4Dfhwxq.jpg')",
        "custom-gradientwithimage":
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://i.imgur.com/5qgZu04.jpg')",
        "custom-atention-guys-img": "url('https://i.imgur.com/IBgQmhD.png')",
        "texturized-bg-blue":
          "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23f9f7fc' fill-opacity='0.95' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E')",
        "arrow-right":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='white'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none' /%3E%3Cpath d='M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z' /%3E%3C/svg%3E\")",
        "arrow-left":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none' /%3E%3Cpath d='M20 15h-8v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1z' /%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        sweep: "100% 200%",
      },
    },
  },

  plugins: [
    require("daisyui", "tailwind-scrollbar-hide"),

    function ({ addComponents, addUtilities }) {
      addUtilities({
        ".animation-timeline-scroll": {
          "animation-timeline": "scroll()",
        },
        ".animation-timeline-view": {
          "animation-timeline": "view()",
        },
        "animation-range-cover-40": {
          "animation-range": "0% cover 40%",
        },
      });

      addComponents({
        ".btn-custom": {
          "@apply flex-row justify-center text-white dark:text-black text-lg bg-dark-bg dark:bg-light-bg hover:bg-sky-700 focus:ring-4 w-full focus:outline-none rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:text-white hover:bg-white hover:text-black dark:hover:bg-dark-bg dark:hover:text-white hover:shadow-lg transition-all duration-200 ease-in-out gap-x-2 opacity-90 hover:opacity-100 hover:scale-custom7 cursor-pointer font-apple font-bold focus:ring-gray-esp/50 dark:focus:ring-gray-esp/55":
            {},
        },
        ".btn-custom-hero": {
          "@apply flex-row justify-center text-gray-700 dark:text-black bg-dark-bg dark:bg-light-bg inline-flex items-center hover:bg-white hover:text-black hover:scale-custom5 dark:hover:bg-dark-bg dark:hover:text-white text-white font-bold py-3 px-6 rounded-lg text-lg transition-all ease-in-out duration-300 rounded-lg shadow-lg font-apple font-bold w-auto py-3 px-6 ring-2 ring-white/50 dark:ring-white dark:hover:ring-sky-700 focus:ring-4":
            {},
        },

        ".btn-custom-orders": {
          "@apply flex-row justify-center text-mainbrand-light dark:text-mainbrand-dark text-lg bg-mainbrand-dark dark:bg-mainbrand-light hover:bg-sky-700 focus:ring-4 w-full focus:outline-none rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:text-white hover:bg-white hover:text-black dark:hover:bg-dark-bg dark:hover:text-white hover:shadow-lg transition-all duration-200 ease-in-out gap-x-2 opacity-90 hover:opacity-100 hover:scale-custom7 cursor-pointer font-apple font-bold focus:ring-gray-esp/50 dark:focus:ring-gray-esp/55":
            {},
        },

        ".btn-pagination": {
          "@apply flex-row justify-center text-black dark:text-black text-lg bg-dark-bg dark:bg-light-bg hover:bg-dark-bg focus:ring-4 focus:outline-none rounded-lg px-2 py-2 text-center inline-flex items-center disabled:bg-gray-300 disabled:bg-opacity-95 dark:focus:text-white hover:shadow-lg transition-all duration-200 ease-in-out gap-x-4 opacity-90 hover:opacity-100 hover:scale-custom5 cursor-pointer font-apple font-bold focus:ring-gray-esp/50 dark:focus:ring-gray-esp/55":
            {},
        },

        ".form-inputbox": {
          "@apply mt-1 block w-full h-[25px] pr-3 pl-3 bg-light-input text-light-text placeholder-gray-400 dark:text-dark-text dark:bg-dark-input rounded-md shadow-md text-base font-medium border-gray-300 dark:border dark:border-black shadow-sm placeholder focus:outline-none  focus:border-sky-200 focus:ring-1 focus:ring-sky-200 focus:ring-opacity-50 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 invalid:border-redCrayola invalid:text-redCrayola focus:invalid:border-sky-200 focus:invalid:ring-sky-200 transition-all duration-300 ease-in-out":
            {},
        },

        ".textarea-custom": {
          "@apply mt-1 block w-full h-[150px] bg-light-input dark:bg-dark-input text-base font-medium textarea-md text-light-text dark:text-dark-text rounded-md shadow-sm dark:border dark:border-black":
            {},
        },
        ".select-custom": {
          "@apply mt-1 block w-full bg-light-input dark:bg-dark-input text-base font-medium text-light-text dark:text-dark-text rounded-md shadow-sm dark:border dark:border-black overflow-y-auto p-2 min-h-40":
            {},
        },

        ".labelinput-custom": {
          "@apply block mb-2 text-mainbrand-light dark:text-mainbrand-light font-bold text-lg":
            {},
        },
        ".select-input": {
          "@apply w-full bg-gray-esp2 dark:bg-gray-esp2 text-mainbrand-dark dark:text-mainbrand-dark text-base font-medium text-center rounded-md h-[25px] dark:border dark:border-black":
            {},
        },

        ".container-create-multi-select": {
          "@apply relative space-y-2 transition-all duration-500 hover:transform hover:scale-custom105 ease-in-out max-h-[300px] z-10":
            {},
        },
        ".container-create-multi-select.open": {
          "@apply h-auto": {},
        },
        ".custom-multi-select": {
          "@apply w-full transition-all duration-300 ease-in-out bg-light-input dark:bg-dark-input text-base font-medium text-light-text dark:text-dark-text rounded-md shadow-lg dark:border dark:border-black p-3 mt-1 hover:shadow-xl":
            {},
        },
        ".custom-multi-select.open": {
          "@apply pb-6 rounded-b-none border-none": {},
        },
        ".select-header": {
          "@apply p-2.5 dark:border dark:border-white border-black rounded-md cursor-pointer":
            {},
        },
        ".options-container": {
          "@apply absolute top-full left-0 right-0 border-t-0 h-auto max-h-[200px] shadow-xl overflow-y-auto bg-light-input dark:bg-dark-input text-sm z-20 rounded-b-lg":
            {},
        },
        ".option": {
          "@apply p-3 cursor-pointer hover:bg-sky-400 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg":
            {},
        },
        ".imagen-p": {
          "@apply w-full h-[400px] object-contain bg-no-repeat bg-cover bg-center":
            {},
        },
        ".sectionquest": {
          "@apply bg-auto bg-cover bg-no-repeat": {},
        },
        ".atention-guys": {
          "@apply bg-auto bg-center bg-no-repeat w-[90dvw] h-[55dvh]": {},
        },
        ".order-container": {
          "@apply min-h-screen flex flex-col justify-center items-center": {},
        },
        ".titles-styles": {
          "@apply font-apple text-3xl w-full text-center font-bold text-white mb-4":
            {},
        },
        ".order-ul-styles": {
          "@apply flex flex-row flex-wrap gap-6": {},
        },
        ".order-list-item": {
          "@apply border-4 border-white p-4 mb-2 rounded-md shadow-md text-white [&>p]:justify-between [&>p]:items-center [&>p]:py-1 [&>p]:border-b [&>p]:border-white/20 [&>p>spam]:font-bold [&>p]:font-apple [&>p]:overflow-hidden [&>p]:truncate [&>p>span]:truncate bg-gray-esp2Background/20":
            {},
        },
        ".order-list-item-detailed": {
          "@apply p-4 mb-2 rounded-md shadow-md text-white [&>p]:justify-between [&>p]:items-center [&>p]:py-1 [&>p]:border-b [&>p]:border-white/20 [&>p>spam]:font-bold [&>p]:font-aux [&>p]:overflow-hidden [&>p]:truncate [&>p>span]:truncate  transition-all duration-500 ease-in-out overflow-hidden":
            {},
          "&.expanded": {
            "@apply max-h-[1000px] opacity-100 transform scale-custom visible":
              {},
          },
          "&.collapsed": {
            "@apply max-h-0 opacity-0 scale-custom5 invisible": {},
          },

          "&:not(.details-hidden)": {
            "@apply h-auto opacity-100 transform scale-custom": {},
          },
        },
        ".order-card": {
          "@apply p-4 m-2 rounded-md shadow-md text-white w-[380px] min-h-[200px] bg-gray-esp2Background/20":
            {},
        },
        ".order-editing-card-group": {
          "@apply flex flex-col gap-4 mt-4 h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transform scale-custom5 group-hover:scale-custom transition-all ease-in-out duration-300":
            {},
        },
        ".order-buttons-group": {
          "@apply flex flex-col gap-4 items-center justify-center": {},
        },

        ".order-pagination-component": {
          "@apply mt-auto pt-8 mb-0": {},
        },
        ".order-status-info": {
          "@apply flex flex-col gap-1 items-center justify-center": {},
        },
        ".form-inputbox optgroup": {
          "@apply transition-all duration-300 ease-in-out": {},
          "&.not(:hover)": {
            "@apply opacity-0 h-auto pointer-events-none": {},
          },
          "&.hover": {
            "@apply opacity-100 pointer-events-auto": {},
          },
        },
      });
    },
  ],
};

/**'.container-create-multi-select': {
					'@apply relative space-y-2 transition-all duration-300 hover:transform hover:scale-custom2 ease-in-out overflow-y-auto' : {}
				},
				'.container-create-multi-select.open': {
					'@apply h-auto': {},
				},
				'.custom-multi-select': {
					'@apply w-full transition-all duration-300 ease-in-out bg-light-input dark:bg-dark-input text-base font-medium text-light-text dark:text-dark-text rounded-md shadow-sm dark:border dark:border-black p-2 mt-1': {},
				},
				'.custom-multi-select.open': {
					'@apply pb-6 rounded-b-none border-none': {},
				},
				'.select-header': {
					'@apply p-2.5 dark:border dark:border-white border-black rounded-md cursor-pointer' : {},
				},
				'.options-container': {
					'@apply absolute top-full left-0 right-0 border-t-0 h-auto shadow-lg overflow-y-auto bg-light-input dark:bg-dark-input text-sm z-20' : {},
				},
				'.option':{
					'@apply p-2.5 cursor-pointer hover:bg-sky-400': {},	
				}, */
