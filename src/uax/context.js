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
import { readGetter, readPublic, wrapContract } from '.';
import { useAsync } from 'react-use';


const REPO = "0:18b1bf111050687482433565af5fe47febafe22132aa9fd27cdca8b8e0d75e9d"
const CONSOLE = "0:16aa946dfaa4bb991642e840754b754af8a5b07fe29d90579b48dcb09afa5453"
const EVENTLOG = "0:dc5a432c7173f1ee96429a806d33b550e3b8ac5159c90d90fc0e76c9c1af1238"
const ROOT = "0:510e83b7a659578f4b4c87289171d0fe16e8001930e44d4eca16d0520bd14cbe"
const MEDIUM = "0:9e1c4a632c058a9dadfc8d356a22aa246ffd267e80725e70e2be72e4098b0d39"
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
    EventLog: wrapContract(ton, EVENTLOG, UAXABI.EventLog),
    Root: wrapContract(ton, ROOT, UAXABI.Root),
    Medium: wrapContract(ton, MEDIUM, UAXABI.Medium)
  }

  function UAXUser(address, keys) {
    return wrapContract(ton, address, UAXABI.TokenWallet, keys)
  }

  const UAXOwners = useAsync(async () => {
    let walletsInfo = await readPublic(UAXSystem.Root, "_roster")
    let ownersInfo = {}
    for (let [addr, info] of Object.entries(walletsInfo)) {
      let i = Number(info["id"])
      if ([1, 2, 3].includes(i))
        ownersInfo[i] = {
          pubkey: info["key"].slice(2),
          address: addr
        }
    }
    let owners = {}
    let owKeys = { 1: o1, 2: o2, 3: o3 }
    for (let [idx, info] of Object.entries(ownersInfo)) {
      let ownerAddr = info.address
      let ownerKeys = owKeys[idx]
      let owner = wrapContract(ton, ownerAddr, UAXABI.OwnerWallet, ownerKeys)
      let ownerInfo = await readGetter(owner, 'getInfo')
      let tw = wrapContract(ton, ownerInfo.tokenWalletAddress, UAXABI.TokenWallet, ownerKeys)
      owners[idx] = {owner, tw}
    }
    return owners
  }, [])

  function UAXOwner(idx) {
    return !UAXOwners.loading && UAXOwners.value[idx]
  }
  return (
    <TONUAXContext.Provider value={{ ton, UAXSystem, UAXUser, UAXOwner }}>
      {props.children}
    </TONUAXContext.Provider>
  );
};
