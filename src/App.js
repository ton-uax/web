import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './components/flex.css';
import './icons.css';
import s from './App.module.css';

import Header from './components/Header';
import Wallet from './components/Wallet';
import Demo1 from './components/Demo1';
import Aside from './components/Aside';
import Message from './components/Message';
import SmallWallet from './components/SmallWallet';
import Log from './components/Log';
import UltraSmallWallet from './components/UltraSmallWallet';

import Home from './components/Home';

function App() {

  const [showMessage, setShowMessage] = useState(true);

  return (
    <main className={s.wrapper}>
      <div className={s.page}>
        <Header title="UAX" />
        <div className={s.main}>
          <Aside></Aside>
          <div className={s.desk}>
            <Message show={showMessage}></Message>
            <Switch>
              <Route exact path="/">
                <div>
                  <h2 className="i-alert">Hello</h2>
                  <h2>Hello</h2>
                </div>
                {/* <Home></Home> */}
              </Route>
              <Route path="/demo1">
                <Demo1 />
              </Route>
              <Route path="/demo2">
                <section className="container">
                  <Wallet
                    address={
                      '0:db750d25142152b6e8d740a63b9a1e4503072ab7a5c51c7ab014c7a366e1a148'
                    }
                    balance={{ ton: '2.34', uax: '123' }}
                  />
                </section>

                <section className="container">
                  <h2 className="i-matrix"> Desk</h2>
                  <div className={s.matrix}>
                    <SmallWallet active={false} address="123..456" />
                    <SmallWallet active={false} address="123..456" />
                    <SmallWallet active={false} address="123..456" />
                    <SmallWallet active={false} address="123..456" />
                    <SmallWallet active={false} address="123..456" />
                    <SmallWallet active={false} address="123..456" />
                    <SmallWallet active={false} address="123..456" />
                    <SmallWallet active={false} address="123..456" />
                    <SmallWallet active={true} address="123..456" />
                 

                    {/* <UltraSmallWallet
                      address="235...763"
                      ton="357"
                      uax="25"
                    ></UltraSmallWallet>
                    <UltraSmallWallet uax="34"></UltraSmallWallet>
                    <UltraSmallWallet uax="345"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="65"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet
                      address="235...763"
                      ton="357"
                      uax="34"
                    ></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet> */}
                    {/* <UltraSmallWallet uax="137"></UltraSmallWallet> */}
                    {/* <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet uax="137"></UltraSmallWallet>
                    <UltraSmallWallet uax="25"></UltraSmallWallet>
                    <UltraSmallWallet */}
                      {/* address="235...763"
                      ton="357"
                      uax="137"
                    ></UltraSmallWallet> */}
                  </div>
                </section>
                <section className="container">
                  <h2 className="i-message"> Log</h2>
                  <Log />
                </section>
              </Route>
            </Switch>
          </div>

        </div>
      </div>
    </main >
  );
}

export default App;
