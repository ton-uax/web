import s from './App.module.css';
import Header from './components/Header';
import Stats from './components/Stats';
import AdminWallet from './components/AdminWallet';
import Btn from './components/AdminBtn';
import Wallet from './components/Wallet';
import Card from './components/Card/Card';
import Mint from './components/Mint';
import React, { useState } from 'react';

function App({ client }) {
  const [balance, setBalance] = useState({ uax: "-", gas: "-" });

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
              <Btn title="Update wallet" client={client} setBalance={setBalance} />
              {/* <Btn title="Speed up" />
              <Btn title="Speed down" />
              <Btn title="Clear desk" /> */}
            </AdminWallet>
          </aside>
          <div className={s.page}>
            <div className={s.wallet}>
              <Wallet uax={balance.uax} gas={balance.gas} address="0:911d8d4...b7986ffbe0d6" />
              <Card title="Transfer" label="Value (uax)" buttonText="Send" />
            </div>
            <div className={s.wallet}>
              <Mint />
            </div>
            <div className={s.wallet}>
              <Card title="Fee (change)" label="Fee" buttonText="Change" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
