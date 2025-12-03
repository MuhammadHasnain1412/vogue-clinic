import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  fontFamily: "Poppins, sans-serif",

  colors: {
    primary: [
      "#e6f0dc",
      "#cddfb9",
      "#b5ce96",
      "#9ccf73",
      "#84be50",
      "#6d9b46",
      "#557633",
      "#3c4b22", // main color
      "#2f391a",
      "#1f2611",
    ],
    gold: [
      "#fff9e6",
      "#ffefb3",
      "#ffe480",
      "#ffda4d",
      "#ffd01a",
      "#e6b700",
      "#b38f00",
      "#806700",
      "#4d3f00",
      "#1a1600",
    ],
    beige: [
      "#f5f5dc",
      "#eee8d5",
      "#e6dfc5",
      "#dcd2b0",
      "#d1c7a0",
      "#c6bb90",
      "#bab07f",
      "#afa673",
      "#a49763",
      "#988c53",
    ],
    white: [
      "#ffffff",
      "#fefefe",
      "#fcfcfc",
      "#fafafa",
      "#f8f8f8",
      "#f5f5f5",
      "#f2f2f2",
      "#f0f0f0",
      "#ededed",
      "#ebebeb",
    ],
    black: [
      "#171717",
      "#2a2a2a",
      "#3c3c3c",
      "#4e4e4e",
      "#606060",
      "#727272",
      "#848484",
      "#969696",
      "#a8a8a8",
      "#bababa",
    ],
  },

  primaryColor: "primary", // use #3c4b22
  primaryShade: 7,          // corresponds to #3c4b22 in the array

  defaultRadius: "md",

  headings: {
    fontFamily: "Poppins, sans-serif",
    sizes: {
      h1: { fontSize: '42', fontWeight: '600' },
      h2: { fontSize: '34', fontWeight: "600" },
      h3: { fontSize: '28', fontWeight: '500' },
    },
  },
};
