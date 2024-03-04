import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary?: PaletteColor;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
}