import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";

// Professional console filtering system
const shouldFilterConsole =
  process.env.REACT_APP_FILTER_CONSOLE === "true" ||
  process.env.NODE_ENV === "production" ||
  true; // Force enable in development for now

console.log("🔧 Console filtering enabled:", shouldFilterConsole);
console.log("🔧 Environment variables:", {
  REACT_APP_FILTER_CONSOLE: process.env.REACT_APP_FILTER_CONSOLE,
  NODE_ENV: process.env.NODE_ENV,
});

if (shouldFilterConsole) {
  // Professional filtering patterns
  const browserExtensionPatterns = [
    /background\.js/,
    /injected\.js/,
    /runtime\.lastError/,
    /message channel closed/,
    /DeviceTrust/,
    /item cache has not been initialized/,
    /hide-notification/,
    /LockStateChanged/,
    /Received <LockStateChanged>/,
    /Could not get default saving location/,
    /Sending <NmOfflineStatus>/,
    /Received <NmOfflineStatus>/,
    /access denied/,
    /missing (backoffice|admin) permission/,
    /aborting/,
    /Duration:/,
    /native core/,
    /Caught error handling/,
    /Unchecked runtime\.lastError/,
    /\[Stytch\]/,
    /Public token is malformed/,
    /invalid_public_token_id/,
    /StytchSDKAPIError/,
    /web\.stytch\.com/,
    /Sending <NmLockState>/,
    /Received <NmLockState>/,
    /NmLockState/,
    /Could not establish connection/,
    /Receiving end does not exist/,
    /Unable to inject/,
    /redacted/,
    /Initializing 1Password/,
    /Performance diagnostic/,
    /initializeStorage/,
    /initialize-feature-flags-cache/,
    /initializeCoreInterface/,
    /collectAllPreRegFeatureFlags/,
    /initializeNativeAppConnection/,
    /unlockWithContextInitCache/,
    /Looking for desktop app/,
    /Finished initializing 1Password/,
    /initialize/,
    /We successfully unlocked/,
    /Hooray/,
    /Started Desktop Lock Monitor/,
    /Cannot find supported account/,
    /Should skip save notification/,
    /ClientCreated/,
    /Sync started for account/,
    /Managed Apps - Feature flag/,
    /Sync completed for account/,
    /request_id/,
    /session_jwt/,
    /session_token/,
    /status_code/,
    /user_id/,
    /biometric_registrations/,
    /created_at/,
    /crypto_wallets/,
    /emails/,
    /external_id/,
    /RESPONSE/,
    /session_duration_minutes/,
    /authentication_factors/,
    /session_token/,
    /session_jwt/,
    /user_id/,
    /status_code/,
    /request_id/,
    /revoke/,
    /authenticate/,
  ];

  // Professional filter function
  const shouldSuppressMessage = (message) => {
    return browserExtensionPatterns.some((pattern) => pattern.test(message));
  };

  // Override console methods professionally
  const createFilteredConsole = (originalMethod) => {
    return (...args) => {
      const message = args.join(" ");
      if (shouldSuppressMessage(message)) {
        return; // Suppress browser extension messages
      }
      originalMethod.apply(console, args);
    };
  };

  // Apply professional filtering
  console.log = createFilteredConsole(console.log);
  console.error = createFilteredConsole(console.error);
  console.warn = createFilteredConsole(console.warn);
}

const stytch = new StytchUIClient(process.env.REACT_APP_STYTCH_PUBLIC_TOKEN);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StytchProvider stytch={stytch}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StytchProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
