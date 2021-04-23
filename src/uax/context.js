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


const REPO = "0:8312a1f596e285fb80cbd08c410af0c2465892ccce0ce6a12e7ba5d057183779"
const CONSOLE = "0:4fe9be1570b7e0764733f4218992d5e06ee28697f3bde10ff8868fdea3fdce41"
const EVENTLOG = "0:3b5022764811c6690d5c3f15c8e154f323801250b6796945970b48781e14280e"
const ROOT = "0:8b21e53606bf72c274977cd636072ef1e0b41d5ae70dbe095fde762186f234e6"
const MEDIUM = "0:4159f834e839d6e333ad3d15b0fc71972d1e22bc024ac817bbfa36952318d4c1"
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
