import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				accent: "var(--accent)",
			},

			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 0deg, var(--tw-gradient-stops))',
			},
			animation: {
				'gradient-x': 'gradient-x 13s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
				'gradient-y': 'gradient-y 13s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
				'gradient-xy': 'gradient-xy 13s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
				'gradient-wave ': 'gradient-wave 13s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
				fadeIn: "fadeIn 3s linear forwards",
				fadeOut: "fadeOut 3s linear forwards",
				squish: "squish 1.3s cubic-bezier(0.55, 0.055, 0.675, 1) infinite",
				orbit: "orbit 25s linear infinite",
				rainbow: "rainbow 6s linear infinite",
				shake: "shake 0.5s infinite",
				glitch: "glitch 1s infinite",
			},
			keyframes: {
				'gradient-x': {
					'0%, 100%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '50% 50%' },
				},
				'gradient-y': {
					'0%, 100%': { 'background-position': '50% 0%' },
					'50%': { 'background-position': '50% 50%' },
				},
				'gradient-xy': {
					'0%, 100%': { 'background-position': '0% 0%' },
					'50%': { 'background-position': '50% 50%' },
				},
				fadeIn: {
					"0%": { opacity: '0' },
					"100%": { opacity: '1' },
				},
				fadeOut: {
					"0%": { opacity: '1' },
					"100%": { opacity: '0' },
				},
				squish: {
					"0%, 100%": { transform: "scaleY(1) translateY(0)" },
					"50%": { transform: "scaleY(0.5) translateY(60%)" },
				},
				orbit: {
					"0%": { transform: "rotate(0deg) translateX(24rem) rotate(0deg)" },
					"100%": { transform: "rotate(360deg) translateX(24rem) rotate(-360deg)" },
				},
				rainbow: {
					"0%": { color: "red" },
					"14%": { color: "orange" },
					"28%": { color: "yellow" },
					"42%": { color: "lime" },
					"57%": { color: "cyan" },
					"71%": { color: "blue" },
					"85%": { color: "blueviolet" },
					"100%": { color: "magenta" },
				},
				shake: {
					"0%, 100%": { transform: "translate(0, 0)" },
					"10%": { transform: "translate(-10px, -10px)" },
					"20%": { transform: "translate(15px, 5px)" },
					"30%": { transform: "translate(-5px, 15px)" },
					"40%": { transform: "translate(10px, -15px)" },
					"50%": { transform: "translate(-15px, 10px)" },
					"60%": { transform: "translate(15px, -10px)" },
					"70%": { transform: "translate(-10px, 15px)" },
					"80%": { transform: "translate(10px, -5px)" },
					"90%": { transform: "translate(-5px, 10px)" },
				},
				glitch: {
					"0%, 100%": { transform: "translate(0, 0)" },
					"20%": { transform: "translate(var(--random-x), var(--random-y))" },
					"40%": { transform: "translate(var(--random-x), var(--random-y))" },
					"60%": { transform: "translate(var(--random-x), var(--random-y))" },
					"80%": { transform: "translate(var(--random-x), var(--random-y))" },
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
