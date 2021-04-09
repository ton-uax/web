import '../flex.css';
import React, { useEffect, useState } from 'react';
import Wallet from '../Wallet';
import uax, { get2Addresses } from '../../uax/demo';
import {
  useConsole,
  useUAXAddresses,
  useWallet,
  useTON,
} from '../../uax/hooks';
import { TonClient as ton } from '@tonclient/core';

function Demo1() {
  const [addr1, addr2] = get2Addresses();

  // const [init, setInit] = useState(false);
  const [balances, setBalances] = useState({});
  const client = useTON();
  // useEffect(() => {
  //   console.log('hook balances',)
  //   async function initBalances() {
  //     const [balance1, balance2] = await Promise.all([
  //       uax.getBalance(client, addr1),
  //       uax.getBalance(client, addr2)
  //     ]);
  //     setBalances({
  //       ...balances,
  //       [addr1]: {
  //         ...balances[addr1],
  //         uax: balance1.uax,
  //         ton: balance1.ton
  //       },
  //       [addr2]: {
  //         ...balances[addr2],
  //         uax: balance2.uax,
  //         ton: balance2.ton
  //       }
  //     });
  //     setInit(true);
  //   }

  //   async function subscribe() {
  //     const subscriptionID = (
  //       await client.net.subscribe_collection({
  //         collection: 'accounts',
  //         filter: { id: { in: [addr1, addr2] } },
  //         result: 'id,balance'
  //       },
  //         async (d) => {
  //           const addressUpdated = d.result.id;
  //           const uaxBalance = await uax.getUAXBalance(client, addressUpdated);
  //           const tonBalance = (parseInt(d.result.balance) / 10 ** 9).toString();
  //           setBalances({
  //             ...balances,
  //             [addressUpdated]: {
  //               ...balances[addressUpdated],
  //               uax: uaxBalance,
  //               ton: tonBalance
  //             },
  //           })
  //         })
  //     ).handle;

  //     async function unsubscribe() {
  //       await client.net.unsubscribe({ handle: subscriptionID });
  //     }
  //     return () => unsubscribe();
  //   }

  //   if (!init) {
  //     initBalances();
  //     return subscribe();
  //   }
  // });
  const addrs = useUAXAddresses(client)
  // const consoleWrapper = useConsole(client)
  // const wallet1 = useWallet(client, addr1)
  // const wallet2 = useWallet(client, addr2)
  // console.log(wallet1)

  return (
    <div className="flex">
      {/* <div className="row"> */}
      <Wallet
        client={client}
        address={addr1}
        balance={balances[addr1]}
        defaultTo={addr2}
      />
      <Wallet
        client={client}
        address={addr2}
        balance={balances[addr2]}
        defaultTo={addr1}
      />
      {/* <Wallet client={client} address={addr2} balance={balances[addr2]} defaultTo={addr1} /> */}
    </div>
  );

  {
    /* {addrs.map(a => <div key={a}>{a}</div>)} */
  }
  // </div>
}

export default Demo1;
