import {
  createTheme,
  CSSVariablesResolver,
  MantineProvider,
  rem,
} from '@mantine/core';


export const theme = createTheme({
  /** Put your mantine theme override here */

  colors: {

    /* 
      richBlack: #0D1B2A
      oxfordBlue: #1B263B;
      yinmnBlue: #415A77;
      silverLakeBlue: #778DA9;
      platinum: #E0E1DD; 
    */

    dark: [
      "#b6bbbf",
      "#9ea4aa",
      "#868d95",
      "#6e767f",
      "#565f6a",
      "#3d4955",
      "#25323f",
      "#0D1B2A",
      "#070e15",
      "#030508"
    ],
    richBlack: [
      "#b6bbbf",
      "#9ea4aa",
      "#868d95",
      "#6e767f",
      "#565f6a",
      "#3d4955",
      "#25323f",
      "#0D1B2A",
      "#070e15",
      "#030508"
    ],
    oxfordBlue: [
      "#bbbec4",
      "#a4a8b1",
      "#8d939d",
      "#767d89",
      "#5f6776",
      "#495162",
      "#323c4f",
      "#1b263b",
      "#182235",
      "#161e2f"
    ],
    yinmnBlue: [
      "#c6ced6",
      "#b3bdc9",
      "#a0adbb",
      "#8d9cad",
      "#7a8ca0",
      "#677b92",
      "#546b85",
      "#415a77",
      "#3b516b",
      "#34485f"
    ],
    silverLakeBlue: [
      "#d6dde5",
      "#c9d1dd",
      "#bbc6d4",
      "#adbbcb",
      "#a0afc3",
      "#92a4ba",
      "#8598b2",
      "#778DA9",
      "#6b7f98",
      "#5f7187",
    ],
    platinum: [
      "#f6f6f5",
      "#f3f3f1",
      "#f0f0ee",
      "#ecedeb",
      "#e9eae7",
      "#e6e7e4",
      "#e3e4e0",
      "#E0E1DD",
      "#cacbc7",
      "#b3b4b1",
    ]
  },
  white: 'platinum',
  primaryColor: 'oxfordBlue'
});


export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    
  },
  dark: {
    // https://mantine.dev/styles/css-variables-list/
    //'--mantine-primary-color-filled': theme.colors.silverLakeBlue[7],
  },
});