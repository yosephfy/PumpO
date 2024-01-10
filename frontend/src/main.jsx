import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SettingContextProvider } from "./context/SettingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SettingContextProvider>
        <App />
      </SettingContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
