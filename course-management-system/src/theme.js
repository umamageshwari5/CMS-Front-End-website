// src/theme.js

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // A professional-looking blue
    },
    secondary: {
      main: "#f50057", // A contrasting pink for accents
    },
    background: {
      default: "#f4f6f8", // A light, clean background color
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // A slightly rounded button
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded card corners
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // Soft shadow for a modern look
        },
      },
    },
  },
});

export default theme;
