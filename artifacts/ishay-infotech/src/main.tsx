import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Apply theme before render to prevent flash
const savedTheme = localStorage.getItem("ishay-theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(<App />);
