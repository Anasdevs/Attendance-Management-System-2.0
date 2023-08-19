import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../src/redux/index';
import App from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }, (error) => {
      console.log('Service Worker registration failed:', error);
    });
  });
}

window.addEventListener('online', () => {
    location.reload();
});