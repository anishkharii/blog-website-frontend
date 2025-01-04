import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NotificationProvider } from "./Contexts/NotificationContext";
import { ThemeProvider } from "./Contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>

    <NotificationProvider>
      <App />
    </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
