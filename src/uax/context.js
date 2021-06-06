import { createContext } from 'react';
import { TonClient as ton_ } from '@tonclient/core';
import { libWeb, libWebSetup } from '@tonclient/lib-web';

import RootABI from './ton-abi/Root.abi.json'
import MediumABI from './ton-abi/Medium.abi.json'
import TokenWalletABI from './ton-abi/TokenWallet.abi.json'
import OwnerWalletABI from './ton-abi/OwnerWallet.abi.json'
import ENV from './Env.json'

import { wrapContract } from '.';
import { useAsync } from 'react-use';


const U1 = ENV.users[0].addr
const U2 = ENV.users[1].addr

const ROOT = ENV.contracts.Root
const MEDIUM = ENV.contracts.Medium

const UAXABI = {
  Root: RootABI,
  Medium: MediumABI,
  TokenWallet: TokenWalletABI,
  OwnerWallet: OwnerWalletABI
}

libWebSetup({
  binaryURL: process.env.PUBLIC_URL + "/tonclient.wasm",
})
ton_.useBinaryLibrary(libWeb);


export const TONUAXContext = createContext();
export const TONUAXContextProvider = props => {
  const ton = new ton_({
    network: {
      server_address: ENV.network
    }
  })
  const UAXSystem = {
    Root: wrapContract(ton, ROOT, UAXABI.Root),
    Medium: wrapContract(ton, MEDIUM, UAXABI.Medium)
  }

  const UAXOwners = useAsync(async () => {
    let owKeys = {
      1: ENV.owners[0].keys,
      2: ENV.owners[1].keys,
      3: ENV.owners[2].keys,
    }
    let owners = {}

    for (let [idx, keypair] of Object.entries(owKeys)) {
      let ownerAddr = ENV.owners[idx - 1].addr
      let ownerTWAddr = ENV.owners[idx - 1].wallet
      let contract = wrapContract(ton, ownerAddr, UAXABI.OwnerWallet, keypair)
      let wallet = wrapContract(ton, ownerTWAddr, UAXABI.TokenWallet, keypair)
      owners[idx] = { contract, wallet }
    }
    return owners
  }, [])

  function UAXUser(idx) {
    let addr, ukeys;
    if (idx == 1) {
      addr = U1
      ukeys = ENV.users[0].keys
    }
    else if (idx == 2) {
      addr = U2
      ukeys = ENV.users[0].keys
    }
    return wrapContract(ton, addr, UAXABI.TokenWallet, ukeys)
  }

  function UAXOwner({ idx, twAddr }) {
    let owners = UAXOwners.value

    if (UAXOwners.loading)
      return
    if (idx !== undefined)
      return owners[idx]
    if (twAddr !== undefined)
      for (let owner of Object.values(owners)) {
        if (owner.wallet.address === twAddr)
          return owner
      }
  }

  const UAXSystemMap = {
    ...Object.fromEntries(Object.entries(ENV.contracts).map(([name, addr]) => [addr, name])),
    ...Object.fromEntries(ENV.owners.map((o, i) => [o.addr, `o${i + 1}`])),
    ...Object.fromEntries(ENV.owners.map((o, i) => [o.wallet, `o${i + 1}w`]))
  }

  return (
    <TONUAXContext.Provider value={{ ton, UAXSystem, UAXOwners, UAXSystemMap, UAXOwner, UAXUser }}>
      {props.children}
    </TONUAXContext.Provider>
  );
};
