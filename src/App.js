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
                <Demo />
              </Route>
              <Route path="/owner">
                <Demo1 />
              </Route>
              <Route path="/dev">
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
