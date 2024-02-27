import type { Config } from "tailwindcss";

const colors = {
  'main-purple': '#635FC7',
  'main-purple-hover': '#A8A4FF',
  'black': '#000112',
  'white': '#fff',
  'red': '#EA5555',
  'red-hover': '#FF9898',
  'medium-grey': '#828FA3',
  'dark-grey': '#2B2C37',
  'very-dark-grey': '#20212C',
  'light-grey': '#F4F7FD',
  'line-dark': '#3E3F4E',
  'line-light': '#E4EBFA'
}

const themeColors = {
  primary: colors['main-purple'],
  secondary: colors['medium-grey'],
  danger: colors['red'],
  light: colors['white'],
  dark: colors['dark-grey']
}

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
        'heading-color': colors['black'], 
        'heading-on-dark-color': colors['white'], 

        'primary-color': themeColors['primary'],
        'secondary-color': themeColors['secondary'],
        'danger-color': themeColors['danger'],
        'light-color': themeColors['light'],
        'dark-color': themeColors['dark']
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
        'light-grey': colors['light-grey'],
        'very-dark-grey': colors['very-dark-grey'],
        'medium-grey': colors['medium-grey'],
        'light-medium-grey': colors['line-light'],
        'dark-grey': colors['dark-grey'],
        'primary-button-hover-color': colors['main-purple-hover'],

        'primary-color': themeColors['primary'],
        'secondary-color': themeColors['secondary'],
        'danger-color': themeColors['danger'],
        'light-color': themeColors['light'],
        'dark-color': themeColors['dark']

      },
      borderColor: {
        'input-default-color': 'rgba(130, 143, 163, 0.25)',
        'line-color': colors['line-light'],
        'line-dark-color': colors['line-dark'],

        'primary-color': themeColors['primary'],
        'secondary-color': themeColors['secondary'],
        'danger-color': themeColors['danger'],
        'light-color': themeColors['light'],
        'dark-color': themeColors['dark']
      },
      boxShadowColor: {
        'light-medium-grey': colors['line-light'],
        'medium-grey': colors['medium-grey'],
        'very-dark-grey': colors['very-dark-grey'],
      }

    },
  },
  plugins: [],
};
export default config;
