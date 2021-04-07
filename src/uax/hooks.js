import { useState, useEffect } from 'react';
import { getUAXWallets, makeConsoleWrapper, makeWalletWrapper } from './demo';
import { TonClient as ton } from '@tonclient/core'

export function useTON() {
    console.log('hook use TON')
    const [tonclient, setClient] = useState(null)

    useEffect(() => {
        if (!tonclient) {
            const client = new ton({
                network: {
                    server_address: 'net.ton.dev'
                }
            });
            setClient(client)
        }
    }, [tonclient, setClient])

    return tonclient
}

export function useUAXAddresses(client) {

    console.log('hook use addresses', client)
    const [addrs, setAddrs] = useState([]);

    useEffect(() => {
        getUAXWallets(client).then(result => {
            if (!client)
                setAddrs([])
            else
                setAddrs(result.map(item => item.id));
        });
    }, [client]);

    return addrs;
}

export function useWallet(client, address) {
    console.log('hook use wallet', client, address)
    const [wallet, setWallet] = useState(null)
    useEffect(() => {
        setWallet(makeWalletWrapper(client, address))
    }, [client])
    return wallet
}

export function useConsole(client) {
    const [console, setConsole] = useState(null)
    useEffect(() => {
        setConsole(makeConsoleWrapper(client))
    }, [client])
    return console
}
