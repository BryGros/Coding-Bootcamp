import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Declaritive way to set this up -- tells react when you make changes to the URL, I want you to respond is a specific way*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
