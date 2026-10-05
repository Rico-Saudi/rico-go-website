import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is prerendered (see scripts/prerender.js); dev starts empty.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
