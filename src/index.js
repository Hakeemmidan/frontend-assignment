import React from 'react';
import ReactDOM from 'react-dom';
import { AppContextProvider } from './contexts/AppContext';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
