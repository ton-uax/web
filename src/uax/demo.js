import { Account } from '@tonclient/appkit';
import TokenWalletABI from '../abi/TokenWallet.abi.json'
import ConsoleABI from '../abi/Console.abi.json'

const Console = {
  abi: ConsoleABI
}

const TokenWallet = {
  abi: TokenWalletABI
}

const makeWalletWrapper = (client, address) => new Account(TokenWallet, { address, client });

const doTransfer = async (client, from, to, value) => {
  const consoleAddr = "0:b22d597168df97e54bad718f942a1f0d5b2c768bcf81436ddacf531bf0597c63";
  let ConsoleAcc = new Account(Console, { address: consoleAddr, client });
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
