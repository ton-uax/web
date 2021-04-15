import React, { useState } from 'react';
import Owner from '../Owner';
import Wallet from '../Wallet';
import { get2OwnerAddresses } from '../../uax/demo';
import { useTON, useTONAccount } from '../../uax/hooks';

function Demo1() {
  const [addr1, addr2] = get2OwnerAddresses();

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
  // const [w1] = useTONAccount(addr1)
  // const [w2] = useTONAccount(addr2)
  // const balance1 = useAsync(async () => (await w1.runLocal('_balance')).decoded.output._balance, [w1])
  // const balance11 = useAsync(async () => await w1.getBalance(), [w1])
  // console.log(balance1)
  // console.log(balance11)

  return (
    <>
      <section className="container">
        <h2 className="i-card">Wallet</h2>
        <Wallet address={addr1} />
      </section>
      <section className="container">
        <h2 className="i-uax">Manage Supply</h2>
        <Owner.SupplyManagement address={addr1} />
      </section>
      <section className="container">
        <h2 className="i-proc">Global Settings</h2>
        <Owner.Config address={addr1} />
      </section>
    </>
  );
}

export default Demo1;
