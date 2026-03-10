import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { logger } from "./utils/logger";
import { APP } from "./config/app";

logger.success(`${APP.name} initialized`);
logger.info('Open DevTools Console (F12) for interaction logs');
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        afterSignOutUrl={window.location.origin + window.location.pathname}
        appearance={{
          variables: {
            colorBackground: '#ffffff',
            colorInputBackground: '#f8fafc',
            colorInputText: '#0f172a',
            colorText: '#0f172a',
            colorTextSecondary: '#64748b',
            colorPrimary: '#e8590c',
            borderRadius: '0.5rem',
          },
        }}
      >
        <App />
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>
);
