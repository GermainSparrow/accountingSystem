import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
//redux-toolkit
import { Provider } from "react-redux";
import store from "../src/store";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
