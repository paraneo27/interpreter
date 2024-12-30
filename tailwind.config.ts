import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      animation: {
        dreamy: "dreamy 8s ease-in-out infinite",
        constellation: "constellation 6s ease-in-out infinite",
      },
      keyframes: {
        dreamy: {
          "0%, 100%": { transform: "translateY(0px)", opacity: 0.5 },
          "50%": { transform: "translateY(-15px)", opacity: 1 },
        },
        constellation: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};

export default config satisfies Config;
