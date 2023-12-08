/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'brand-red': '#ff4c43',
      'brand-blue': '#02819e',
      'brand-brown': '#38342a',
      'brand-green': '#023020',
      'brand-green1': '#018900',
      'brand-yellow': '#ffba49',
      'brand-white': '#ffffff',
      'brand-dark-1': '#2b2b2b',
      'brand-gold': '#c79436',

      // Tailwind CSS gray colors
      'gray-100': '#f7fafc',
      'gray-200': '#edf2f7',
      'gray-300': '#e2e8f0',
      'gray-400': '#cbd5e0',
      'gray-500': '#a0aec0',
      'gray-600': '#718096',
      'gray-700': '#4a5568',
      'gray-800': '#2d3748',
      'gray-900': '#1a202c',
      // Tailwind CSS indigo colors
      'indigo-100': '#ebf4ff',
      'indigo-200': '#c3dafe',
      'indigo-300': '#a3bffa',
      'indigo-400': '#7f9cf5',
      'indigo-500': '#667eea',
      'indigo-600': '#5a67d8',
      'indigo-700': '#4c51bf',
      'indigo-800': '#434190',
      'indigo-900': '#3c366b',
      // Red
      'red-100': '#fff5f5',
      'red-200': '#fed7d7',
      'red-300': '#feb2b2',
      'red-400': '#fc8181',
      'red-500': '#f56565',
      'red-600': '#e53e3e',
      'red-700': '#c53030',
      'red-800': '#9b2c2c',
      'red-900': '#742a2a',
      // GREEN
      'green-100': '#f0fff4',
      'green-200': '#c6f6d5',
      'green-300': '#9ae6b4',
      'green-400': '#68d391',
      'green-500': '#48bb78',
      'green-600': '#38a169',
      'green-700': '#2f855a',
      'green-800': '#276749',
      'green-900': '#22543d',
      // BLUE
      'blue-100': '#ebf8ff',
      'blue-200': '#bee3f8',
      'blue-300': '#90cdf4',
      'blue-400': '#63b3ed',
      'blue-500': '#4299e1',
      'blue-600': '#3182ce',
      'blue-700': '#2b6cb0',
      'blue-800': '#2c5282',
      'blue-900': '#2a4365',
    },
    screens: {
      xm: '500px',
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }
      mdxl: '901px',
      lg: '1050px',
      // => @media (min-width: 1024px) { ... }

      xl: '1286px',
      // => @media (min-width: 1280px) { ... }
      '1xl': '1361px',
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      max_Xll: { max: '1360px' },
      max_xl: { max: '1286px' },
      max_xml: { max: '1270px' },
      // => @media (max-width: 1279px) { ... }
      max_x: { max: '1150px' },
      max_lg: { max: '1050px' },
      // => @media (max-width: 1050px) { ... }
      max_md2: { max: '900px' },
      max_md: { max: '767px' },
      // => @media (max-width: 767px) { ... }
      max_sm: { max: '640px' },
      max_sm8: { max: '825px' },
      // => @media (max-width: 639px) { ... }
      max_smm1: { max: '565px' },
      max_smm: { max: '500px' },
      // => @media (max-width:500px) { ... }
    },
  },
  plugins: [],
}
