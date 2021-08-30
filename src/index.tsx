import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from 'easy-peasy';
import userStore from './userStore/userStore';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={userStore}>
        <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
