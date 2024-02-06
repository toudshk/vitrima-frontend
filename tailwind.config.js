const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const primary = "#000";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    colors: {
      primary,
      white: "#fff",
      red: "#E94040",
      blue: {
        300: "#E7F0FF",
        500: "#1C60C5",
        800: "#113E81",
      },
      gray: {
        300: "#EAEAEA",
        450: "#c5c5c5",
        400: "#ABABAB",
		500: "#9A9A9A",
        600: "#5F5F5F",
        700: "#303030",
      }, 
	  transparent: colors.transparent,
    },
	extend: {
		animation: {
			fade: 'fade .5s ease-in-out',
			scaleIn: 'scaleIn .35s ease-in-out',
		},
	}
  },
  plugins: [
		
		plugin(({ addComponents, theme, addUtilities }) => {
			addComponents({

				'.air-block': {
					borderRadius: theme('borderRadius.layout'),
					backgroundColor: theme('colors.gray.950'),
					color: theme('colors.white'),
					boxShadow: theme('boxShadow.lg'),
				},
			}),
				addUtilities({
					'.text-shadow': {
						textShadow: '1px 1px rgba(0, 0, 0, 0.4)',
					},

					'.outline-border-none': {
						outline: 'none',
						border: 'none',
					},

					'.flex-center-between': {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					},

					'.image-like-bg': {
						objectPosition: 'center',
						objectFit: 'cover',
						pointerEvents: 'none',
					},
				})
		}),
	],
};
export default config;
