import { Account } from '@tonclient/appkit';

import TokenWalletABI from '../ton-abi/TokenWallet.abi.json'
import ConsoleABI from '../ton-abi/Console.abi.json'
import MediumABI from '../ton-abi/Medium.abi.json'
import RootABI from '../ton-abi/Root.abi.json'
import RepoABI from '../ton-abi/Repo.abi.json'

const UAXCodeHashes = [
  "aaf0d9290df6c1f3aa630a37f3d69a716b35f9bbafe9e06b14d824e82effe5fd"
];
const eventlogAddr = "0:582560651aa223db4b6031f69b50c375b7c05cad816c6a16d7b47da0ac383369";
const repoAddr = "0:90339a44a8700fc6c9516aa05f1b98942cc86fe6eafdf7aa1610504430939712";


const ownerPubKeys = [
  "0x1466d9488f4fb2d76d1a13dddb7e80ba3256acc94b567c174845b3704a907ce2",
  "0x544627298804466cd05fa82b6f06be94b931c3ebba0ed9d21bd1d2ec56630ef8",
  "0x592151b11fa6125e3ec20dc5f673cacc429c7e1867da45db08a39cd917a167f3"
]

export const addresses = {
  "Medium": "0:0e8bd76eeecd77d9870a13b7c93618b1477d7a0b9dd018599ddf0e810469f0bf",
  "Root": "0:79c86fb401d74706321b6328866723cbe154689927de0eb9a14d2ccc8fb9aa8d",
  "Console": "0:d6bad31b76a3de3af8290efabb2aa7fa7f3953fa7ec7a63174f5a0b18ab5e8eb"
}


export async function getUAXWallets(client) {
  const result = (await client.net.query_collection({
    collection: "accounts",
    filter: {
      code_hash: { in: UAXCodeHashes }
    },
    result: "id"
  })).result
  return result
}

const TokenWallet = { abi: TokenWalletABI }
const Repo = { abi: RepoABI }

export const makeWalletWrapper = (client, address) => new Account(TokenWallet, { address, client });
export const makeRepoWrapper = (client) => new Account(Repo, { address: repoAddr, client });

export async function getOwners(root) {
  let walletsInfo = (await root.runLocal("_walletsInfo", {})).decoded.output["_walletsInfo"]
  let owners = {}
  for (let [addr, info] of Object.entries(walletsInfo))
  if (info["id"] < 10)
    owners[info["key"]] = addr
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

const getBalance = async (client, address) => {
  return {
    uax: await getUAXBalance(client, address),
    ton: await getTONBalance(client, address)
  }
}

const uax = { getBalance, getTONBalance, getUAXBalance, makeWalletWrapper, getStats, getConfig };

export default uax;
