import React, { useState } from 'react';
import Wallet from '../Wallet';
import { get2Addresses } from '../../uax/demo';
import { useTON, useTONAccount } from '../../uax/hooks';


function Demo1() {
  const [addr1, addr2] = get2Addresses();

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
    <div className="flex">

      <Wallet
        address={addr1}
      />
      <Wallet
        address={addr2}
      />

    </div>
  );

}

export default Demo1;
