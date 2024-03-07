import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary?: PaletteColor;
    black?: PaletteColor;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    black?: PaletteColor;
  }
}
