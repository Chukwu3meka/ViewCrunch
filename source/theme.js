import { createTheme } from "@mui/material/styles";

const muiTheme = (theme) => {
  console.log({ theme }, "SAdfdsfasfdsfdsd");

  const color = theme === "light" ? "#424242" : "#fffffa";
  const background = theme === "light" ? "#fffffa" : "#14141e";

  return createTheme({
    typography: {
      fontFamily: "'Playfair Display', serif",
      allVariants: {
        color,
      },
    },

    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            color,
            padding: 5,
            boxSizing: "border-box",
            cursor: "pointer",
            background,
          },
        },
      },
    },

    palette: {
      type: theme,
      primary: {
        main: "#e2ad26",
      },
      secondary: {
        main: "#1197c0",
      },
      // background: {
      //   // default: theme === "light" ? "#fffffa" : "#14141e",
      //   default: "#E71A1A",
      // },
      spacing: 24,
    },
  });
};

export default muiTheme;
