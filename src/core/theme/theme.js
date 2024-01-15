import { colors } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let MyTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF9900",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#FF9900",
      // main: colors.green[500],
      contrastText: "#FFF",
    },
  },
  typography: {
    h1: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 800,
    },
    h2: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 800,
    },
    h3: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 800,
    },
    h4: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 800,
    },
    h5: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 800,
    },
    h6: {
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 800,
    },
    subtitle1: {
      fontWeight: 600,
      fontFamily: "Work Sans, sans-serif",
    },
    subtitle2: {
      fontWeight: 600,
      fontFamily: "Work Sans, sans-serif",
    },
    body1: {
      fontFamily: "Work Sans, sans-serif",
    },
    body2: {
      fontFamily: "Work Sans, sans-serif",
    },
    caption: {
      fontFamily: "Work Sans, sans-serif",
    },
    button: {
      fontFamily: "Work Sans, sans-serif",
    },
  },
});

MyTheme = responsiveFontSizes(MyTheme);

export default MyTheme;
