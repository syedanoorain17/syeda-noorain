/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./stitch_specforge_course_management_system/**/*.{html,js}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#5a031d",
        "primary-container": "#781d32",
        "on-primary": "#ffffff",
        "on-primary-container": "#ff879a",
        "primary-fixed": "#ffd9dd",
        "primary-fixed-dim": "#ffb2bb",
        "on-primary-fixed": "#400012",
        "on-primary-fixed-variant": "#812438",
        "inverse-primary": "#ffb2bb",

        "secondary": "#a6364d",
        "secondary-container": "#fe798f",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#740c2a",
        "secondary-fixed": "#ffd9dd",
        "secondary-fixed-dim": "#ffb2bb",
        "on-secondary-fixed": "#400012",
        "on-secondary-fixed-variant": "#861d37",

        "tertiary": "#2e292b",
        "tertiary-container": "#443f41",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#b2aaac",
        "tertiary-fixed": "#eae0e2",
        "tertiary-fixed-dim": "#cdc4c6",
        "on-tertiary-fixed": "#1f1a1c",
        "on-tertiary-fixed-variant": "#4b4547",

        "surface": "#FAF8F5",
        "surface-bright": "#f8f9ff",
        "surface-dim": "#d6dae4",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#F5F2EB",
        "surface-container": "#eaeef8",
        "surface-container-high": "#e4e8f2",
        "surface-container-highest": "#dee2ec",
        "surface-variant": "#dee2ec",
        "surface-tint": "#a03c4f",

        "on-surface": "#171c23",
        "on-surface-variant": "#554244",
        "inverse-surface": "#2c3138",
        "inverse-on-surface": "#edf1fb",

        "background": "#FAF8F5",
        "on-background": "#171c23",

        "outline": "#887173",
        "outline-variant": "#dbc0c2",

        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "sm": "0.125rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        "headline-xl": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "headline-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-lg": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "code-tabular": ["JetBrains Mono", "monospace"]
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        "margin": "1rem",
        "margin-desktop": "2rem",
        "gutter": "1.25rem",
        "gutter-desktop": "1.5rem"
      }
    }
  },
  plugins: []
};
