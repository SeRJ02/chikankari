import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { validateEnvironmentVariables } from './utils/constants';

// Validate environment variables on app startup
validateEnvironmentVariables();

const root = createRoot(document.getElementById('root')!);

// The Sanity Studio is served at /studio and lazy-loaded so it never
// weighs down the main storefront bundle.
if (window.location.pathname.startsWith('/studio')) {
  const StudioPage = lazy(() => import('./StudioPage'));
  root.render(
    <Suspense
      fallback={
        <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
          Loading Studio…
        </div>
      }
    >
      <StudioPage />
    </Suspense>
  );
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
