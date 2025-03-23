import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "./components/ui/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider defaultTheme="light">
      <App />
    </Provider>
  </React.StrictMode>
);
