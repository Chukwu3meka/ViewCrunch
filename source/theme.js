import { createTheme } from "@mui/material/styles";

const muiTheme = (theme) => {
  const color = theme === "light" ? "#424242" : "#fffffa";
  const background = theme === "light" ? "#fffffa" : "#14141e";

  return createTheme({
    typography: {
      fontFamily: "'Playfair Display', serif",
      allVariants: {
        color,
      },
    },

    palette: {
      primary: {
        main: "#e2ad26",
      },
      secondary: {
        main: "#1197c0",
      },
      info: {
        main: theme === "light" ? "#424242" : "#fffffa",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            color,
            padding: 5,
            boxSizing: "border-box",
            // cursor: "pointer",
            background,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color,
          },
        },
      },
    },
  });
};

export default muiTheme;
