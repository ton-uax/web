import s from './Demo2.module.css'
import React, { useState } from 'react';
import Wallet from '../Wallet';
import SmallWallet from '../SmallWallet';
import Log from '../Log';
import UltraSmallWallet from '../UltraSmallWallet';


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
    const wallets = Object.entries(allWallets).map(([addr, w]) => {
        console.log('####', addr, w)
        return <UltraSmallWallet
            address={addr}
            uax={w.balanceUAX}
            setSelected={setSelected}
            isSelected={selected === addr}
            key={addr}
        ></UltraSmallWallet>
    })
    console.log("selected", selected);
    const selectedWallet = (selected !== null) && <SmallWallet
        address={selected}
        ton={allWallets[selected].balanceTON}
        uax={allWallets[selected].balanceUAX}
    ></SmallWallet>
    console.log("---", selectedWallet)
    return (<>
        <section className="container">
            <h2 className="i-card"> Wallet</h2>
            <Wallet
                address={
                    '0:db750d25142152b6e8d740a63b9a1e4503072ab7a5c51c7ab014c7a366e1a148'
                }
                balance={{ ton: '2.34', uax: '123' }}
            />
        </section>

        <section className="container">
            <h2 className="i-matrix">Explore Wallets</h2>

            <div>
                {selectedWallet}
                <div className={s.matrix}>
                    {wallets}
                </div>
            </div>
        </section>
        <section className="container">
            <h2 className="i-message"> Log</h2>
            <Log />
        </section>
    </>
    )
};

export default Demo2;
