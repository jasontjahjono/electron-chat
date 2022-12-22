import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("chatApp")).render(<App />);
