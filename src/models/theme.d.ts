import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary?: PaletteColor;
    default?: PaletteColor;
    text: {
      tertiary?: string;
    };
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    default?: PaletteColorOptions;
    text?: TypeText;
  }

  interface TypeText {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  }
}
