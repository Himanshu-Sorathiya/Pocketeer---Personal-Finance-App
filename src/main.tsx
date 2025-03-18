import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import "react-day-picker/style.css";

import "./styles/index.css";

import App from "./App.tsx";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
