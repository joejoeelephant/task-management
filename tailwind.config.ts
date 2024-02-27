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
        'primary-dark-heading-color': colors['white'], 
        'primary-paragraph-color': colors['dark-grey'],
        'accent-color': themeColors['primary'],
        'alert-color': themeColors['danger'],

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
        'alert-button-hover-color': '#FF9898',

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
