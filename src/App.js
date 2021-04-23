import s from './App.module.css';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';

import Demo1 from './components/Demo1';
import Aside from './components/Aside';
import { useOwner } from './uax/hooks';
// import Demo2 from './components/Demo2/Demo2';


function App() {
  const owner1 = useOwner(1)
  const owner2 = useOwner(2)
  const owner3 = useOwner(3)
  return (
    <main className={s.wrapper}>
      <div className={s.page}>
        <Header />
        <div className={s.main}>
          <Aside></Aside>
          <div className={s.desk}>

            <Switch>
              <Route exact path="/">

              </Route>

              <Route exact path="/owner/1">
                <Demo1 owner={owner1} />
              </Route>
              <Route exact path="/owner/2">
                <Demo1 owner={owner2} />
              </Route>
              <Route exact path="/owner/3">
                <Demo1 owner={owner3} />
              </Route>
              <Route path="/dev">
                {/* <Demo2></Demo2> */}
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
