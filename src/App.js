import './components/flex.css';
import './icons.css';
import s from './App.module.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Wallet from './components/Wallet';
import Demo1 from './components/Demo1';
import Aside from './components/Aside';
import Message from './components/Message';
import SmallWallet from './components/SmallWallet';
import React, { useState } from 'react';


function App() {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <main className={s.main}>

      <div className={s.desk}>

        <Header title="UAX" />
        <section className="row">
          <Aside></Aside>

          <div>
            <Message show={showMessage}></Message>
            <div className={s.page}>
              <Switch>

                <Route exact path="/">
                  <div className="row">

                    <h1 className="i-alert">Hello</h1>
                    <h2>Hello</h2>
                  </div>
                </Route>
                <Route path="/demo1">
                  <Demo1 />

                </Route>
                <Route path="/demo2">
                  <div className="col">
                    <h1 className="i-wallet">Wallet</h1>
                    <Wallet

                      address={"0:db750d25142152b6e8d740a63b9a1e4503072ab7a5c51c7ab014c7a366e1a148"}
                      balance={{ ton: "2.34", uax: "123" }}
                    />
                  </div>

                  <div className="col">
                    <h1 className="i-martix">Desk</h1>
                    <div className={s.matrix}>
                      <SmallWallet active={false} address="0:123..456" />
                      <SmallWallet active={true} address="0:123..456" />
                      <SmallWallet />
                    </div>
                  </div>
                  <div className="col">
                    <h1 className="i-alert">Log</h1>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                  </div>

                </Route>

              </Switch>
            </div>
          </div>
        </section>
      </div>
    </main >
  );
}

export default App;