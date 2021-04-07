import { Account } from '@tonclient/appkit';
import TokenWalletABI from '../abi/TokenWallet.abi.json'
import ConsoleABI from '../abi/Console.abi.json'

const UAXCodeHashes = [
  "aaf0d9290df6c1f3aa630a37f3d69a716b35f9bbafe9e06b14d824e82effe5fd"
];
const consoleAddr = "0:b22d597168df97e54bad718f942a1f0d5b2c768bcf81436ddacf531bf0597c63";
const addr1 = "0:db750d25142152b6e8d740a63b9a1e4503072ab7a5c51c7ab014c7a366e1a148";
const addr2 = "0:26675a7185708c1e277c224f3afc70aff040484d372bbeeac455d99fdfc6a201";

export function get2Addresses() {
  return [addr1, addr2];
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

const Console = {
  abi: ConsoleABI
}

const TokenWallet = {
  abi: TokenWalletABI
}

export const makeWalletWrapper = (client, address) => new Account(TokenWallet, { address, client });
export const makeConsoleWrapper = (client) => new Account(Console, { address: consoleAddr, client });

const doTransfer = async (client, from, to, value) => {
  let ConsoleAcc = makeConsoleWrapper(client)
  return await ConsoleAcc.run("doTransfer", {
    to: to,
    from: from,
    val: value
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
  const tonBalance = parseInt(hexBalance, 16) / 10 ** 9;
  return tonBalance.toString();
}

const getBalance = async (client, address) => {
  return {
    uax: await getUAXBalance(client, address),
    ton: await getTONBalance(client, address)
  }
}

const uax = { getBalance, getTONBalance, getUAXBalance, makeWalletWrapper, doTransfer };

export default uax;
