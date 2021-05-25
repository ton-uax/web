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
import { readPublic, wrapContract } from '.';
import { useAsync } from 'react-use';


const U1 = "0:bf64ae636b3812c43610b19c41d12769167eb60c2af809655df6b385ef991780"
const U2 = "0:678d101d27680ad065892a7e2198bcd58dbafcadb534a1bf534c13576cebda2e"

const REPO = "0:6819b3c7bb378e466425a96fbcff9edddb6e4dd97ac936ac5319f5c7a7128af8"
const CONSOLE = "0:633b1caabb44409329ae0f75df5b4985d34e68503f9f1c3263151bab48392fb3"
const EVENTLOG = "0:78c2387f3c0175496d8712c76a8a66f05b0a4e418741fc9584e612a00979d703"
const ROOT = "0:2769a6f4092a0813fb41e793b1e10a8f585ab6291d32db86eef166c54dea0ede"
const MEDIUM = "0:c6b8a5b5dc01450f74149d627e41e97eae77fad76030db6f4bb62ec8894d22c8"
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
