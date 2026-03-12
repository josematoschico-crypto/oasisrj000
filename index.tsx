
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import './src/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registro do Service Worker para carregamento instantâneo (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registrado com sucesso:', registration.scope);
    }).catch(err => {
      console.log('Falha ao registrar SW:', err);
    });
  });
}
