import 'modern-normalize/modern-normalize.css';
import './components/flex.css';
import './icons.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { TONUAXContextProvider } from './uax/context';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TONUAXContextProvider>
        <App />
      </TONUAXContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
