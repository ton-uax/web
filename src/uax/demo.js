import { Account } from '@tonclient/appkit';

import TokenWalletABI from '../ton-abi/TokenWallet.abi.json'
import ConsoleABI from '../ton-abi/Console.abi.json'
import MediumABI from '../ton-abi/Medium.abi.json'
import RootABI from '../ton-abi/Root.abi.json'
import RepoABI from '../ton-abi/Repo.abi.json'

const ownerPubKeys = [
  "0x10b2bf44efdb3c58d8083a39377f589e3c5f3bef5e1dc585bae4d1ef938d019a",
  "0xd57d90cf28f00910f7a3689b12e0acd1ff92ad2558df8f06781c74f059df5c43",
  "0xc5680b1e15c8ce3536098e294e8c2326049f92874e1ad7af6c1cc253f1b0cd5e"
]

export const system = {
  "Repo": "0:9b03a1205ab9fc793e60a2f784b5a8151d5bfd0b2b8bb1088e3eed88f753f68e",
  "Console": "0:10677a33d3a5edcb4b39a6beb43a124e73c62c70cbb99ed4f4e9d4b29c22f8be",
  "Root": "0:397b4df5409c29d1c5ccc00f94706b9f025054262a509c827a9b99c270b99128",
  "Medium": "0:f4e70848721e239245c6ab07bdae957021fa1a2ae421fdbc3f7e0467b5cec99e",
}

export const makeWalletWrapper = (client, address) => new Account({ abi: TokenWalletABI }, { address, client });

export async function getOwners(client) {
  let contr = new Account({ abi: RootABI }, { client, address: system["Root"] })
  let walletsInfo = (await contr.runLocal("_walletsInfo", {})).decoded.output["_walletsInfo"]
  let owners = {}
  for (let [addr, info] of Object.entries(walletsInfo))
    if (info["id"] < 10)
      owners[info["key"].slice(2)] = addr
  return owners
}

export async function getConfig(console) {
  const consoleResponse = (await console.runLocal('getConfig')).decoded.output
  return {
    initTON: consoleResponse.initialBalance / 10 ** 9,
    initUAX: consoleResponse.welcomeBonus,
    warnTON: +(consoleResponse.warnBalance / 10 ** 9).toFixed(2),
    transferFee: consoleResponse.transferFee,
  }
}
export async function getStats(root, medium) {
  const statsResponse = (await medium.runLocal('getStats')).decoded.output
  const rootBalance = Math.round(parseInt(await root.getBalance(), 16) / 10 ** 9)
  return {
    transfers: statsResponse.transfers,
    supply: statsResponse.supply,
    wallets: statsResponse.wallets,
    tons: rootBalance.toString(),
    transferFee: statsResponse.transferFee,
    accruedFee: statsResponse.accruedFee,
    claimedFee: statsResponse.totalFeeClaimed,
  }
}

const getUAXBalance = async (client, address) => {
  const wallet = makeWalletWrapper(client, address);
  const balanceResponse = await wallet.runLocal('_balance');
  return balanceResponse.decoded.output._balance;
}

const getTONBalance = async (client, address) => {
  const hexBalance = (await client.net.query_collection({
    collection: 'accounts',
    filter: {
      id: { eq: address },
    },
    result: 'balance',
  })).result[0].balance;
  const tonBalance = +(parseInt(hexBalance, 16) / 10 ** 9).toFixed(2);
  return tonBalance;
}


const uax = { getTONBalance, getUAXBalance, makeWalletWrapper, getStats, getConfig };

export default uax;

