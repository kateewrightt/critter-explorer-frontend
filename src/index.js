import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { Global, css } from "@emotion/react";
import reportWebVitals from "./reportWebVitals";

import BackgroundImg from "./assets/background.jpg";

const GlobalStyle = () => (
  <Global
    styles={css`
      body {
        background-image: url(${BackgroundImg});
      }
    `}
  />
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
