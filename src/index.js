import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./views/LineEditing";
import App from "./testCode/squareDrawing"
import './index.css'
import {ThemeProvider, createTheme, StyledEngineProvider} from '@mui/material'

let theme = createTheme()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </ThemeProvider>
);
