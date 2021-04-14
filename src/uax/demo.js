import { Account } from '@tonclient/appkit';
import TokenWalletABI from '../abi/TokenWallet.abi.json'
import ConsoleABI from '../abi/Console.abi.json'
import MediumABI from '../abi/Medium.abi.json'
import RootABI from '../abi/Root.abi.json'
import RepoABI from '../abi/Repo.abi.json'

const UAXCodeHashes = [
  "aaf0d9290df6c1f3aa630a37f3d69a716b35f9bbafe9e06b14d824e82effe5fd"
];
const consoleAddr = "0:fdaa7e29dd74559be50f0a55027edcb2157f68bf8a986b55e21e2e6e30b08758";
const eventlogAddr = "0:582560651aa223db4b6031f69b50c375b7c05cad816c6a16d7b47da0ac383369";
const mediumAddr = "0:866dc8aa64e4840c3a4ff051b6fd02b7d9d40b0178b715a14ea6f374fa5a3326";
const repoAddr = "0:90339a44a8700fc6c9516aa05f1b98942cc86fe6eafdf7aa1610504430939712";
const rootAddr = "0:2e81cc106ee7d08d73394cc647289f625afe6b4bce543644852dc6c467344894"


const owner1 = "0:09959787ce76badf2fc440487490f1dff3ca0baa3d72451a98095c1fe56c3736";
const owner2 = "0:092e2efabd144113cb194f6396ccc63906a92dcce90c9e6a3f9d4d7085b22a9e";

export function get2OwnerAddresses() {
  return [owner1, owner2];
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

const Console = { abi: ConsoleABI }
const Medium = { abi: MediumABI }
const TokenWallet = { abi: TokenWalletABI }
const Repo = { abi: RepoABI }
const Root = { abi: RootABI }

export const makeWalletWrapper = (client, address) => new Account(TokenWallet, { address, client });
export const makeConsoleWrapper = (client) => new Account(Console, { address: consoleAddr, client });
export const makeMediumWrapper = (client) => new Account(Medium, { address: mediumAddr, client });
export const makeRepoWrapper = (client) => new Account(Repo, { address: repoAddr, client });
export const makeRootWrapper = (client) => new Account(Root, { address: rootAddr, client });

const doTransfer = async (client, from, to, value) => {
  let ConsoleAcc = makeConsoleWrapper(client)
  return await ConsoleAcc.run("doTransfer", {
    to: to,
    from: from,
    val: value
  })
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
export async function updateStatsForever(client, onStatsUpdate) {
  const medium = makeMediumWrapper(client)
  const root = makeRootWrapper(client)
  const currentStats = await getStats(root, medium)
  onStatsUpdate(currentStats)
  await medium.subscribeMessages('id', async (msg) => {
    onStatsUpdate(await getStats(root, medium))
  })
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

const uax = { getBalance, getTONBalance, getUAXBalance, makeWalletWrapper, updateStatsForever, getStats, getConfig, doTransfer };

export default uax;
