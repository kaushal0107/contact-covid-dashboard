import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient'; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
