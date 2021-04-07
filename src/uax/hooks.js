import { useState, useEffect } from 'react';
import { getUAXWallets, makeConsoleWrapper, makeWalletWrapper } from './demo';
import { TonClient as ton } from '@tonclient/core'
import { useAsync } from 'react-use';

export function useTON() {

  const [tonclient,] = useState(new ton({
    network: {
      server_address: 'net.ton.dev'
    }
  }))

  useEffect(() => {
    console.log('hook useEffect (useTON)', tonclient)

    return () => {
      console.log('unmount.', tonclient)
      if (!tonclient)
        console.log('there is no ton')
      else {
        console.log('close ton')
        tonclient.close()
      }
    }
  }, [tonclient])

  return tonclient
}

export function useUAXAddresses() {
  console.log('hook use addresses')
  const client = useTON()
  const addrs = useAsync(async () => {
    const addresses = await getUAXWallets(client)
    console.log(addresses)
    return addresses.map(item => item.id)
  }, [client])
  return addrs;
}

export function useWallet(address) {
  console.log('hook use wallet', address)
  const client = useTON()
  const [wallet, setWallet] = useState(makeWalletWrapper(client, address))
  return [wallet, setWallet]
}

export function useConsole() {
  const client = useTON()
  const [console,] = useState(makeConsoleWrapper(client))
  return console
}
