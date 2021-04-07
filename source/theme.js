import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const colorPry = (theme) => (theme === "light" ? "#fffffa" : "#14141e"),
  colorSec = (theme) => (theme === "light" ? "#797991" : "#ceced8"),
  // colorDim = (theme) => (theme === "light" ? "#e1e1f3" : "#2a2a31"),
  colorDim = (theme) => (theme === "light" ? "#a0a0a0" : "#646464"),
  textPry = (theme) => (theme === "light" ? "#14141e" : "#fffffa"),
  textSec = (theme) => (theme === "light" ? "#8b8b96" : "#9191a1"),
  textDim = (theme) => (theme === "light" ? "#cacad6" : "#2a2a31");

// Create a theme instance.
const muiTheme = (theme) => {
  return createMuiTheme({
    palette: {
      primary: {
        main: "#c28c17",
      },
      secondary: {
        main: "#1197c0",
        // contrastText: "#fff",
      },
      // success: {
      //   main: green.A400,
      // },
      type: theme,
      // grey: {
      //   main: colorPry(theme),
      // },
      // error: {
      //   main: red.A400,
      // },
      background: {
        default: colorPry(theme),
      },
      // text: {
      //   primary: textPry(theme),
      //   secondary: textSec(theme),
      //   // disabled: theme === "light" ? "#2a2a31" : "#f00",
      //   // disabled: theme === "light" ? "#2a2a31" : "#e1e1f3",
      //   // hint: theme === "light" ? "#2a2a31"  : "#e1e1f3",
      // },
      spacing: 24,
    },
  });
};

const globalTheme = (mode) => {
  const theme = muiTheme(mode);
  return createMuiTheme(
    {
      overrides: {
        // MuiOutlinedInput: {
        //   notchedOutline: {
        //     borderColor: textDim(mode),
        //   },
        // },
        MuiPaper: {
          root: {
            padding: 5,
            boxSizing: "border-box",
            cursor: "pointer",
            // backgroundColor: colorPry(mode),
            // color: textPry(mode),
          },
        },
        // MuiTable: {
        //   root: {
        //     minWidth: 300,
        //   },
        // },
        // MuiTableCell: {
        //   head: {
        //     backgroundColor: theme.palette.common.black,
        //     color: theme.palette.common.white,
        //   },
        //   body: {
        //     fontSize: 14,
        //   },
        // },
        // MuiTableRow: {
        //   root: {
        //     "&:nth-of-type(odd)": {
        //       backgroundColor: theme.palette.action.hover,
        //     },
        //   },
        // },
        MuiGrid: {
          root: {
            alignContent: "center",
            justifyContent: "center",
            // textAlign: "center",
          },
        },
        // MuiIconButton: {
        // root: {
        //   color: colorSec(mode),
        // },
        // colorInherit
        // colorPrimary: {
        //   backgroundColor: "#8e6",
        //   color: "#9a6",
        // },
        // },
        // MuiButton: {
        //   root: {
        //     "&$disabled": {
        //       color: colorDim(mode),
        //     },
        //   },
        // },
        // MuiTypography: {
        //   root: {
        //     color: textPry(mode),
        //   },
        //   colorTextSecondary: {
        //     color: textSec(mode),
        //   },
        // },
      },
    },
    theme
  );
};

export default globalTheme;
