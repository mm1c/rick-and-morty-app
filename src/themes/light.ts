import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    // fontFamily: "Roboto Mono, monospace",
    fontSize: 14,
    // fontWeightLight: 300,
    // fontWeightRegular: 400,
    // fontWeightMedium: 500,
  },
  palette: {
    background: {
      default: "#fff",
    },
    text: {
      primary: "#000",
    },
  },
});

export default theme;