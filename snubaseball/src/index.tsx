import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Provider } from "react-redux";

import "./index.css";
import App from "./containers/root/App";
import { AuthProvider } from "./containers/root/AuthProvider/AuthProvider";
import reportWebVitals from "./reportWebVitals";
import { store } from "@store/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://api.snubaseball.com";
}
axios.defaults.headers.common["Content-Type"] = "application/json";

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
