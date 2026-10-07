import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastProvider, ToastViewport } from '@lib';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <ToastViewport />
    </ToastProvider>
  </StrictMode>,
);
