import { createContext } from 'react';
import { TonClient as ton_ } from '@tonclient/core';
import { libWeb, libWebSetup } from '@tonclient/lib-web';

import o1 from './ton-keys/o1.keys.json'
import o2 from './ton-keys/o2.keys.json'
import o3 from './ton-keys/o3.keys.json'
import u1 from './ton-keys/u1.keys.json'
import u2 from './ton-keys/u2.keys.json'
import RepoABI from './ton-abi/Repo.abi.json'
import ConsoleABI from './ton-abi/Console.abi.json'
import EventLogABI from './ton-abi/EventLog.abi.json'
import RootABI from './ton-abi/Root.abi.json'
import MediumABI from './ton-abi/Medium.abi.json'
import TokenWalletABI from './ton-abi/TokenWallet.abi.json'
import OwnerWalletABI from './ton-abi/OwnerWallet.abi.json'
import { readGetter, readPublic, wrapContract } from '.';
import { useAsync } from 'react-use';


const U1 = "0:b449971e781ee433710f7b48f97497aa23295ea7083b3262fd8e723950ee7db9"
const U2 = "0:6358601ca6a2ea48577937391dbb40b3460a31a8d4fcb59c6a8d0f30a02ef9fd"

const REPO = "0:2dce986fa32a257d86c239e222dda010389a33e1d2f46cf0bbf5f5be511cf697"
const CONSOLE = "0:67454881a9e79aa0743b6c8b1e6df9ac00c93469e0c70495d51795e95879d28b"
const EVENTLOG = "0:c8aa23e3510265d2a22da266f2037a58e12a16eb475340688451b989f8d1a451"
const ROOT = "0:70c0587c9b91be890bd5dab54ace8c2b5baacd6aa07e3032b77ce402a27515b6"
const MEDIUM = "0:8d1ff4d8f66661f05a01434d91ed04eaceda5483cc42711ad095cbdfe4ff5a6a"
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

  const UAXOwners = useAsync(async () => {
    let owKeys = { 1: o1, 2: o2, 3: o3 }
    let ownersInfo = await readPublic(UAXSystem.Root, "_owners")
    let owners = {}

    for (let ownerInfo of Object.values(ownersInfo)) {
      let idx = ownerInfo.clientId
      let ownerAddr = ownerInfo.addr
      let ownerTWAddr = ownerInfo.tokenWalletAddr
      let ownerKeys = owKeys[idx]
      let contract = wrapContract(ton, ownerAddr, UAXABI.OwnerWallet, ownerKeys)
      let wallet = wrapContract(ton, ownerTWAddr, UAXABI.TokenWallet, ownerKeys)
      owners[idx] = { contract, wallet }
    }
    return owners
  }, [])

  function UAXUser(idx) {
    let addr, ukeys;
    if (idx == 1) {
      addr = U1
      ukeys = u1
    }
    else if (idx == 2) {
      addr = U2
      ukeys = u2
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
  return (
    <TONUAXContext.Provider value={{ ton, UAXSystem, UAXOwners, UAXOwner, UAXUser }}>
      {props.children}
    </TONUAXContext.Provider>
  );
};
