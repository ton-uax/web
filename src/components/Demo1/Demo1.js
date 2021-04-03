import React, { useEffect, useState } from 'react';
import Col from '../Col';
import Wallet from '../Wallet';
import uax from '../../uax/demo';

function Demo1({ client }) {
  const addr1 = "0:db750d25142152b6e8d740a63b9a1e4503072ab7a5c51c7ab014c7a366e1a148";
  const addr2 = "0:26675a7185708c1e277c224f3afc70aff040484d372bbeeac455d99fdfc6a201";
  const [init, setInit] = useState(false);
  const [balances, setBalances] = useState({});

  useEffect(() => {

    async function initBalances() {
      const [balance1, balance2] = await Promise.all([
        uax.getBalance(client, addr1),
        uax.getBalance(client, addr2)
      ]);
      setBalances({
        ...balances,
        [addr1]: {
          ...balances[addr1],
          uax: balance1.uax,
          ton: balance1.ton
        },
        [addr2]: {
          ...balances[addr2],
          uax: balance2.uax,
          ton: balance2.ton
        }
      });
      setInit(true);
    }

    async function subscribe() {
      const subscriptionID = (
        await client.net.subscribe_collection({
          collection: 'accounts',
          filter: { id: { in: [addr1, addr2] } },
          result: 'id,balance'
        },
          async (d) => {
            const addressUpdated = d.result.id;
            const uaxBalance = await uax.getUAXBalance(client, addressUpdated);
            const tonBalance = (parseInt(d.result.balance) / 10 ** 9).toString();
            setBalances({
              ...balances,
              [addressUpdated]: {
                ...balances[addressUpdated],
                uax: uaxBalance,
                ton: tonBalance
              },
            })
          })
      ).handle;

      async function unsubscribe() {
        await client.net.unsubscribe({ handle: subscriptionID });
      }
      return () => unsubscribe();
    }

    if (!init) {
      initBalances();
      return subscribe();
    }
  });

  return (
    <>
      <Col>
        <Wallet client={client} address={addr1} balance={balances[addr1]} />
      </Col>
      <Col>
        <Wallet client={client} address={addr2} balance={balances[addr2]} />
      </Col>
    </>
  )
};

export default Demo1;
