import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './components/flex.css';
import './icons.css';
import s from './App.module.css';

import Header from './components/Header';

import Demo from './components/Demo';
import Demo1 from './components/Demo1';
import Demo2 from './components/Demo2';
import Aside from './components/Aside';


function App() {
  const [showMessage, setShowMessage] = useState(true);
  const [showSmallWal] = useState(true);

  return (
    <main className={s.wrapper}>
      <div className={s.page}>
        <Header title="UAX" />
        <div className={s.main}>
          <Aside></Aside>
          <div className={s.desk}>

            <Switch>
              <Route exact path="/">

              </Route>
              <Route path="/owner/1">
                <Demo1 kp={{
                  public: "10b2bf44efdb3c58d8083a39377f589e3c5f3bef5e1dc585bae4d1ef938d019a",
                  secret: "6fc4bb169efade17220e8ccc22017a69ad1f489918978272c446c0436e9b498f"
                }} />
              </Route>
              <Route path="/owner/2">
                <Demo1 kp={{
                  public: "d57d90cf28f00910f7a3689b12e0acd1ff92ad2558df8f06781c74f059df5c43",
                  secret: "70692987bac14f3b7b62d80d30597a34b18701fc3a3ef9d630e9f9009db84953"
                }} />
              </Route>
              {/* <Route path="/dev">
                <Demo2 />
              </Route> */}
            </Switch>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
