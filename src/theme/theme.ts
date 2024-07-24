import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6D53F3",
      light: "#8a75f5",
      dark: "#4c3aaa",
    },
    secondary: {
      main: "#F58B00",
      contrastText: "#fff",
    },
    tertiary: {
      main: "#D6CCFE",
      light: "#ece9f7",
      dark: "#958eb1",
      contrastText: "#fff",
    },
    default: {
      main: "#484041",
      light: "#757171",
      dark: "#322c2d",
      contrastText: "#fff",
    },
    error: {
      main: "#ce3838",
    },
    background: {
      default: "#F5F5F5",
      paper: "#F7F5FF",
    },
    text: {
      secondary: "#6D53F3",
      primary: "#484041",
      tertiary: "#484041",
    },
    divider: "#D6CCFE",
    warning: {
      main: "#e87f30",
    },
    success: {
      main: "#248726",
      contrastText: "rgba(0,0,0,0.87)",
    },
    info: {
      main: "#6D53F3",
    },
  },
  typography: {
    fontFamily: ["Rubik", "Arial", "sans-serif"].join(","),
    h2: {
      fontWeight: "bolder",
    },
    h3: {
      fontWeight: "bolder",
    },
    h4: {
      fontWeight: "bolder",
    },
    h5: {
      fontSize: "1.7rem",
      fontWeight: "bolder",
    },
    h6: {
      fontSize: "1.3rem",
      fontWeight: "bolder",
    },
    subtitle1: {
      fontSize: "0.9rem",
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: "0.8rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.8rem",
    },
    body2: {
      fontSize: "0.7rem",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: "break-word",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#D6D6D6",
          borderWidth: 1,
          marginTop: 20,
          marginBottom: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D6CCFE",
            },
            "&:not(.Mui-error):hover fieldset": {
              borderColor: "#D6CCFE", 
            },
            backgroundColor: "white",
            borderRadius: 10,
          },
          "& .MuiOutlinedInput-input": {
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "#F7F5FF",
          "&::before": {
            border: "1px solid #6D53F3",
          },
        },
        tooltip: {
          backgroundColor: "#F7F5FF",
          border: "1px solid #6D53F3",
          color: "black",
          fontSize: "0.9rem",
          fontWeight: 600,
          borderRadius: 8,
          padding: "20px 20px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#6D53F3",
          backgroundColor: "#D6CCFE",
          border: "1px solid #6D53F3",
          borderRadius: 30,
          padding: "8px 2px",
          fontWeight: "bold",
          "&.MuiChip-root": {
            "&:hover": {
              backgroundColor: "#ece9f7",
            },
          },
        },
        deleteIcon: {
          color: "#6D53F3",
          "&:hover": {
            color: "#4c3aaa",
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          '&[class*="MuiOutlinedInput-root"]': {
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingLeft: "14px",
            paddingRight: "14px",
          },
          "& .MuiAutocomplete-input": {
            padding: "0px",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 5,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#ece9f7",
          },
        },
      },
    },
  },
});

export default theme;
