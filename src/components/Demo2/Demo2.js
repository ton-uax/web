import s from './Demo2.module.css'
import { useState } from 'react';
import SmallWallet from '../SmallWallet';
import UltraSmallWallet from '../UltraSmallWallet';
import Log from '../Log';


function Demo2({ }) {
  const allWallets = {
    "0:123...456": {
      balanceUAX: 2500,
      balanceTON: 1.23,
    },
    "0:234...456": {
      balanceUAX: 26,
      balanceTON: 1.24,
    },
    "0:345...456": {
      balanceUAX: 27,
      balanceTON: 1.25,
    },
    "1": {
      balanceUAX: 2500,
      balanceTON: 1.23,
    },
    "2": {
      balanceUAX: 26,
      balanceTON: 1.24,
    },
    "3": {
      balanceUAX: 27,
      balanceTON: 1.25,
    },
    "4": {
      balanceUAX: 2500,
      balanceTON: 1.23,
    },
    "5": {
      balanceUAX: 26,
      balanceTON: 1.24,
    },
    "fvxfv6": {
      balanceUAX: 27,
      balanceTON: 1.25,
    }
  }

  const [selected, setSelected] = useState(null)
  const wallets = Object.entries(allWallets)
  
  return <>
    <section>
      <h2>Dev UI</h2>
      <div className="flex">
        <div className="container">
          <h3 className="i-matrix">Explore Wallets</h3>

          <div>
            {<SmallWallet address={selected} balance={allWallets[selected]} />}
            <div className={s.matrix}>
              {
                wallets.map(([addr, w]) =>
                  <UltraSmallWallet
                    key={addr}
                    address={addr} 
                    uax={w.balanceUAX}
                    isSelected={selected === addr} 
                    setSelected={setSelected}
                  />)
              }
            </div>
          </div>
        </div>
        <div className="container">
          <h3 className="i-message">Log</h3>
          <Log />
        </div>
      </div>
    </section>
  </>
};

export default Demo2;
