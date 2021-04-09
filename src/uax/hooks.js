import { useState, useContext } from 'react';
import { useAsync } from 'react-use';
import { getUAXWallets, makeConsoleWrapper, makeWalletWrapper } from './demo';
import { TONContext } from './context'


export function useTON() {
  console.log('hook useTON');
  const ton = useContext(TONContext)
  return ton
}

export function useUAXAddresses() {
  console.log('hook use addresses')
  const client = useTON()
  const addrs = useAsync(async () => {
    const addresses = await getUAXWallets(client)
    return addresses.map(item => item.id)
  }, [client])
  if (addrs.loading)
    return []
  return addrs.value;
}

export function useTONAccount(address) {
  console.log('hook use wallet', address)
  const ton = useTON()
  const [account, setAccount] = useState(makeWalletWrapper(ton, address))
  return [account, setAccount]
}

export function useConsole() {
  const client = useTON()
  const [console,] = useState(makeConsoleWrapper(client))
  return console
}
