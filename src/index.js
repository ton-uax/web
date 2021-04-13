import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { TONContextProvider } from './uax/context';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TONContextProvider><App /></TONContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
