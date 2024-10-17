import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store/store";
import { ThemeProvider, createTheme } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById("root"));

//overwriting the default font-family css
const THEME = createTheme({
  typography: {
    "fontFamily": `"Lexend Deca", sans-serif`,
    'fontWeightLight': 200,
  }
});

root.render(
  <ThemeProvider theme={THEME}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);