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
        primaryHotefy: {
          lighter: "#DDD5EA",
          neutral: "#590BD8",
          darker: "#312A4F",
        },
        secondaryHotefy: {
          lighter: "#F5F5F5",
          neutral: "#BBBFBF",
          darker: "#717171",
        },
        text_dark: "333333",
      },
    },
  },
  plugins: [],
};
export default config;
