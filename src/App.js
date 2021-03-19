import s from './App.module.css';
import Header from './components/Header';
import Stats from './components/Stats';
import AdminWallet from './components/AdminWallet';
import Btn from './components/AdminBtn';
import Wallet from './components/Wallet';
import Card from './components/Card';
import React, { useState } from 'react';

function App({ client }) {

  const addr1 = "0:911d8d474b584cb4a3eb21a02c70cd2172054e2455d2472a7151b7986ffbe0d6";
  const addr2 = "0:c892a0387f157153cea7d7b244c6c54ded126ade017bd2c4feb0d3044a643b52";
  const [state, setState] = useState({
    [addr1]: { address: addr1, uax: '-', gas: '-' },
    [addr2]: { address: addr2, uax: '-', gas: '-' }
  });
  const setBalance = (address, balancePart) => {
    console.log(balancePart);
    setState({
      ...state,
      [address]: {
        ...state[address],
        uax: balancePart.uax,
        gas: balancePart.gas
      }
    });
  }

  return (
    <main className={s.main}>
      <div className={s.desk}>
        <Header title="Dashboard" />
        <div className={s.flex}>
          <aside className={s.aside}>
            <Stats
              UAXTotal="8,000,000"
              UserTotal="537"
              BaseFee="12"
              FeeTotal="23,889"
              GiverTotal="2,000,000"
              Transactions="4,221"
            />
            <AdminWallet>
              <Btn title="Update wallet 1" client={client} address={addr1} setBalance={setBalance} />
              <Btn title="Update wallet 2" client={client} address={addr2} setBalance={setBalance} />
              {/* <Btn title="Speed up" />
              <Btn title="Speed down" />
              <Btn title="Clear desk" /> */}
            </AdminWallet>
          </aside>
          <div className={s.page}>
            <div className={s.wallet}>
              <Wallet address={addr1} balance={state[addr1]} />
              <Card title="Transfer" label="Value (uax)" buttonText="Send"
                client={client} from={addr1} to={addr2} value={1} setBalance={setBalance} />
            </div>
            <div className={s.wallet}>
              <Wallet address={addr2} balance={state[addr2]} />
              <Card title="Transfer" label="Value (uax)" buttonText="Send"
                client={client} from={addr2} to={addr1} value={1} setBalance={setBalance} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
