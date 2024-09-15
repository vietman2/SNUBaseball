/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import "./index.css";
import App from "./pages/root/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://api.snubaseball.com";
} else {
  axios.defaults.baseURL = "http://localhost:8000";
}
axios.interceptors.request.use(function (config: any) {
  return config;
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
