import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-indigo-400',
    'bg-fuchsia-400',
    'bg-blue-400',
    'bg-yellow-400',
    'bg-green-400',
    'bg-red-400',
    'bg-lime-400',
    'bg-violet-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-vyan-400',
    'bg-teal-400',
    'bg-emerald-400',
    'bg-amber-400',
    'bg-orange-400',
    'bg-zinc-400',
    'bg-neutral-400',
    'bg-ston-400e'
  ],
  theme: {
    extend: {
      colors: {
        'primary-heading-color': '#000112', 
        'primary-dark-heading-color': '#FFFFFF', 
        'primary-paragraph-color': '#2B2C37',
        'secondary-color': '#828FA3', 
        'accent-color': '#635FC7',
        'alert-color': '#EA5555'
      },
      fontSize: {
        'heading-xl': [
          '24px', 
          {
            lineHeight: '30px',
            fontWeight: 'bold'
          }
        ],
        'heading-lg': [
          '18px', 
          {
            lineHeight: '23px',
            fontWeight: 'bold'
          }
        ],
        'heading-medium': [
          '15px', 
          {
            lineHeight: '19px',
            fontWeight: 'bold'
          }
        ],
        'heading-sm': [
          '12px', 
          {
            lineHeight: '15px',
            letterSpacing: '2.4px',
            fontWeight: 'bold'
          }
        ],
        'paragraph-medium':  [
          '13px', 
          {
            lineHeight: '23px',
            fontWeight: 500
          }
        ],
        'paragraph-xs':  [
          '12px', 
          {
            lineHeight: '15px',
            fontWeight: 'bold'
          }
        ],

      },
      backgroundColor: {
        'light-grey': '#F4F7FD',
        'very-dark-grey': '#20212C',
        'medium-grey': '#828FA3',
        'light-medium-grey': '#E4EBFA',
        'dark-grey': '#2B2C37',
        'main-purple': '#635FC7',
        'secondary-purple': '#A8A4FF',
        'primary-button-color': '#635FC7',
        'primary-button-hover-color': '#A8A4FF',
        'secondary-button-color': 'rgba(99, 95, 199,0.1)',
        'secondary-button-hover-color': 'rgba(99, 95, 199,0.25)',
        'secondary-dark-button-color': '#FFF',
        'secondary-dark-button-hover-color': '#FFF',
        'alert-button-color': '#EA5555',
        'alert-button-hover-color': '#FF9898'

      },
      borderColor: {
        'input-default-color': 'rgba(130, 143, 163,0.25)',
        'input-alert-color': '#EA5555',
        'input-active-color': '#635FC7',
        'line-color': '#E4EBFA',
        'line-dark-color': '#3E3F4E'
      },
      boxShadowColor: {
        'light-medium-grey': '#E4EBFA',
        'medium-grey': '#828FA3',
        'very-dark-grey': '#20212C',

      }

    },
  },
  plugins: [],
};
export default config;
