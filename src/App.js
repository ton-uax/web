import s from './App.module.css';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Dev from './components/Dev';
import Demo from './components/Demo';
import Demo1 from './components/Demo1';
import Aside from './components/Aside';


function App() {
  return (
    <main className={s.wrapper}>
      <div className={s.page}>
        <Header />
        <div className={s.main}>
          <Aside></Aside>
          <div className={s.desk}>

            <Switch>
              <Route exact path="/">
                Hello world
              </Route>
              <Route exact path="/user">
                <Demo />
              </Route>
              <Route exact path="/owner/1">
                <Demo1 idx={1} />
              </Route>
              <Route exact path="/owner/2">
                <Demo1 idx={2} />
              </Route>
              <Route exact path="/owner/3">
                <Demo1 idx={3} />
              </Route>
              <Route exact path="/dev">
                <Dev />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
