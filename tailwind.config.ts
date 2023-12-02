import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-banner": "#d9ddf6",
        "bg-main": "#fffefb",
        "btn-orange": "#ff9152",
        "txt-blue": "#141361",
      },
    },
  },
  plugins: [],
};
export default config;
