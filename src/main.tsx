import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";import { logger } from "./utils/logger";

logger.success('Apache Spark Learning App Initialized');
logger.info('Welcome to Learn Spark! Open DevTools Console (F12) to see logs');
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
