import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './components/ToastProvider';
import { store } from './redux/store';
import { appRouter } from './routes/AppRouter';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={appRouter} />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
);
