import { createContext } from 'react';
import { TonClient as ton_ } from '@tonclient/core';
import { libWeb, libWebSetup } from '@tonclient/lib-web';

import o1 from './ton-keys/ow1.keys.json'
import o2 from './ton-keys/ow2.keys.json'
import o3 from './ton-keys/ow3.keys.json'
import RepoABI from './ton-abi/Repo.abi.json'
import ConsoleABI from './ton-abi/Console.abi.json'
import EventLogABI from './ton-abi/EventLog.abi.json'
import RootABI from './ton-abi/Root.abi.json'
import MediumABI from './ton-abi/Medium.abi.json'
import TokenWalletABI from './ton-abi/TokenWallet.abi.json'
import OwnerWalletABI from './ton-abi/OwnerWallet.abi.json'
import { wrapContract } from '.';
import { useAsync } from 'react-use';


const REPO = "0:18b1bf111050687482433565af5fe47febafe22132aa9fd27cdca8b8e0d75e9d"
const CONSOLE = "0:07576fc6a5d791433a0dc5d64336f7a9cf760aaf090e1912ecb0c54107da8aa4"
const EVENTLOG = "0:648d4ed0ab09b14a6b991822e0c5be320d6e2cc83de410897b9771a9e677a77b"
const ROOT = "0:70915263028d7617f3478236bf245524391706976cca95553afb0367ac071e6f"
const MEDIUM = "0:d667a0ba8e7fc8aab15995ba882b6b43b8a1b927b91a834d0163e78f9c1d402d"
const UAXABI = {
  Repo: RepoABI,
  Console: ConsoleABI,
  EventLog: EventLogABI,
  Root: RootABI,
  Medium: MediumABI,
  TokenWallet: TokenWalletABI,
  OwnerWallet: OwnerWalletABI
}

libWebSetup({
  debugLog: console.log,
  binaryURL: process.env.PUBLIC_URL + "/tonclient.wasm",
})
ton_.useBinaryLibrary(libWeb);


export const TONUAXContext = createContext();
export const TONUAXContextProvider = props => {
  const ton = new ton_({
    network: {
      server_address: 'net.ton.dev'
    }
  })
  const UAXSystem = {
    Repo: wrapContract(ton, REPO, UAXABI.Repo),
    Console: wrapContract(ton, CONSOLE, UAXABI.Console),
    Root: wrapContract(ton, ROOT, UAXABI.Root),
    Medium: wrapContract(ton, MEDIUM, UAXABI.Medium)
  }

  function UAXUser(address, keys) {
    return wrapContract(ton, address, UAXABI.TokenWallet, keys)
  }

  const UAXOwners = useAsync(async () => {
    let walletsInfo = (await UAXSystem.Root.runLocal("_walletsInfo", {})).decoded.output["_walletsInfo"]
    let owners = {}
    for (let [addr, info] of Object.entries(walletsInfo)) {
      let i = Number(info["id"])
      if ([1, 2, 3].includes(i))
        owners[i] = {
          pubkey: info["key"].slice(2),
          address: addr
        }
    }
    return owners
  }, [])

  function UAXOwner(idx) {
    let owKeys = { 1: o1, 2: o2, 3: o3 }
    return !UAXOwners.loading && wrapContract(
      ton, 
      UAXOwners.value[idx].address, UAXABI.OwnerWallet, 
      owKeys[idx])
  }
  return (
    <TONUAXContext.Provider value={{ ton, UAXSystem, UAXUser, UAXOwner }}>
      {props.children}
    </TONUAXContext.Provider>
  );
};
