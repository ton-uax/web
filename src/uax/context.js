import { createContext } from 'react';
import { TonClient as ton_ } from '@tonclient/core';
import { libWeb, libWebSetup } from '@tonclient/lib-web';

import o1 from './ton-keys/o1.keys.json'
import o2 from './ton-keys/o2.keys.json'
import o3 from './ton-keys/o3.keys.json'
import RepoABI from './ton-abi/Repo.abi.json'
import RootABI from './ton-abi/Root.abi.json'
import MediumABI from './ton-abi/Medium.abi.json'
import ConsoleABI from './ton-abi/Console.abi.json'
import TokenWalletABI from './ton-abi/TokenWallet.abi.json'
import OwnerWalletABI from './ton-abi/OwnerWallet.abi.json'
import { wrapContract } from '.';
import { useAsync } from 'react-use';


const REPO = "0:9b03a1205ab9fc793e60a2f784b5a8151d5bfd0b2b8bb1088e3eed88f753f68e"
const CONSOLE = "0:10677a33d3a5edcb4b39a6beb43a124e73c62c70cbb99ed4f4e9d4b29c22f8be"
const ROOT = "0:397b4df5409c29d1c5ccc00f94706b9f025054262a509c827a9b99c270b99128"
const MEDIUM = "0:f4e70848721e239245c6ab07bdae957021fa1a2ae421fdbc3f7e0467b5cec99e"
const UAXABI = {
  Repo: RepoABI,
  Root: RootABI,
  Medium: MediumABI,
  Console: ConsoleABI,
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
