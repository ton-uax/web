import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './components/flex.css';
import './icons.css';
import s from './App.module.css';

import Header from './components/Header';

import Demo1 from './components/Demo1';
import Demo2 from './components/Demo2';
import Aside from './components/Aside';
import Message from './components/Message';


import Home from './components/Home';

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
                <Demo2 />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
