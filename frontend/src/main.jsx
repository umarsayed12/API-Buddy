import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { JwtProvider } from "./context/JWTContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <JwtProvider>
      <App />
    </JwtProvider>
  </StrictMode>
);
