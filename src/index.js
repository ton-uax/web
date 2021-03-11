import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { TonClient as ton } from "@tonclient/core";
import { libWeb, libWebSetup } from "@tonclient/lib-web";


libWebSetup({
  binaryURL: "/tonclient.wasm",
})
ton.useBinaryLibrary(libWeb);

const client = new ton({
  network: {
    server_address: 'net.ton.dev'
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App client={client} />
  </React.StrictMode>,
  document.getElementById('root'),
);
