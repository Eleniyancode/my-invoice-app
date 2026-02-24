import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AppProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ToastProvider } from "./context/ToastProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>,
);
