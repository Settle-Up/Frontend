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
      main: "#484041",
      light: "#757171",
      dark: "#322c2d",
      contrastText: "#fff",
    },
    tertiary: {
      main: "#D6CCFE",
      light: "#ece9f7",
      dark: "#958eb1",
      contrastText: "#fff",
    },
    black: {
      main: "#000000",
      light: "#333333",
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
    h5: {
      fontSize: "1.7rem",
      fontWeight: "bolder",
    },
    h6: {
      fontSize: "1.5rem",
      fontWeight: "bolder",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: "0.9rem",
      fontWeight: 600,
    },
  },
  components: {
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
            "&:hover fieldset": {
              borderColor: "#6D53F3",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6D53F3",
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
          width: "300px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#6D53F3",
          backgroundColor: "#ece9f7",
          border: "1px solid #6D53F3",
          borderRadius: 30,
          padding: "8px 2px",
          fontWeight: "bold",
          // "&:hover": {
          //   backgroundColor: "#D6CCFE",
          // },
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
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          // backgroundColor: "#F7F5FF",
          // color: "#8a75f5",
          // borderRadius: 10,
          // border: "1px solid #6D53F3",
          // textAlign: "center",
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
  },
});

export default theme;
