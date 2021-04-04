import s from './App.module.css';
import { Switch, Route } from 'react-router-dom';
import Col from './components/Col';
import Header from './components/Header';
import Stats from './components/Stats';
import AdminWallet from './components/AdminWallet';
import Wallet from './components/Wallet';
import ColTitle from './components/ColTitle';
import Matrix from './components/Matrix';
import SmallWallet from './components/SmallWallet';
import Demo1 from './components/Demo1/Demo1';


function App({ client }) {
  return (
    <main className={s.main}>
      <div className={s.desk}>
        <Header title="UAX" />

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
              {/* <Btn title="Update wallet 1" client={client} address={addr1} setBalance={setBalance} />
              <Btn title="Update wallet 2" client={client} address={addr2} setBalance={setBalance} /> */}
              {/* <Btn title="Speed up" />
              <Btn title="Speed down" />
              <Btn title="Clear desk" /> */}
            </AdminWallet>
          </aside>

          <div className={s.page}>

            <Switch>
              <Route exact path="/">

              </Route>
              <Route path="/demo1">
                <Demo1 client={client} />
              </Route>
              <Route path="/demo2">
                <Col>
                  <ColTitle title="Wallet"></ColTitle>
                  <Wallet client={client} address={"0:db750d25142152b6e8d740a63b9a1e4503072ab7a5c51c7ab014c7a366e1a148"} balance={{ ton: "2.34", uax: "123" }} />
                </Col>
                <Col>
                  <ColTitle title="Desk"></ColTitle>
                  <Matrix>

                    <SmallWallet address={"address"} uax={123} ton={456}>

                    </SmallWallet >
                    <SmallWallet address={"address"} uax={123} ton={456}>

                    </SmallWallet>
                    <SmallWallet address={"address"} uax={123} ton={456}>

                    </SmallWallet>
                    <SmallWallet address={"address"} uax={123} ton={456}>

                    </SmallWallet>
                    <SmallWallet address={"address"} uax={123} ton={456}>

                    </SmallWallet>
                  </Matrix>
                </Col>
                <Col>
                  <ColTitle title="Log"></ColTitle>
                </Col>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
