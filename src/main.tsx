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
          baseTheme: undefined,
          variables: { colorBackground: '#0f172a', colorInputBackground: '#1e293b', colorInputText: '#f1f5f9', colorText: '#e2e8f0', colorTextSecondary: '#94a3b8', borderRadius: '0.5rem' },
        }}
      >
        <App />
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>
);
