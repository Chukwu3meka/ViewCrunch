import { createTheme } from "@material-ui/core/styles";

const muiTheme = (theme) => {
  return createTheme({
    typography: {
      fontFamily: "Amiri, serif",
    },
    palette: {
      type: theme,
      primary: {
        main: "#e2ad26",
      },
      secondary: {
        main: "#1197c0",
      },
      background: {
        default: theme === "light" ? "#fffffa" : "#14141e",
      },
      spacing: 24,
    },
  });
};

const globalTheme = (mode) => {
  const theme = muiTheme(mode);
  return createTheme(
    {
      overrides: {
        MuiPaper: {
          root: {
            padding: 5,
            boxSizing: "border-box",
            cursor: "pointer",
          },
        },
        MuiGrid: {
          root: {
            alignContent: "center",
            justifyContent: "center",
          },
        },
      },
    },
    theme
  );
};

export default globalTheme;
