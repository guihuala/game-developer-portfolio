import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
// Load foundations first so a cold load and hot updates use the same cascade.
import './index.css';
import './studio.css';
import './viewport.css';
import './collage.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
