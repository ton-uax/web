import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { TonClient as ton } from "@tonclient/core";
import { libWeb, libWebSetup } from "@tonclient/lib-web";


libWebSetup({
  binaryURL: process.env.PUBLIC_URL + "/tonclient.wasm",
})
ton.useBinaryLibrary(libWeb);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
