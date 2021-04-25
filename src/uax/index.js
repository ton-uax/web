import { Account } from '@tonclient/appkit';
import { signerKeys } from '@tonclient/core';


export async function readGetter(contract, name, params = {}) {
  return (await contract.runLocal(name, params)).decoded.output
}

export async function readPublic(contract, name) {
  return (await contract.runLocal(name, {})).decoded.output[name]
}

export function wrapContract(ton, address, abi, keys) {
  return new Account(
    { abi },
    {
      address, client: ton,
      signer: keys ? signerKeys(keys) : null
    }
  )
}

export async function getConfig(console) {
  const consoleResponse = await readGetter(console, 'getConfig')
  return {
    initTON: consoleResponse.initialBalance / 10 ** 9,
    initUAX: consoleResponse.welcomeBonus,
    warnTON: +(consoleResponse.warnBalance / 10 ** 9).toFixed(2),
    transferFee: consoleResponse.transferFee,
  }
}

export async function getStats(root, medium) {
  const statsResponse = await readGetter(medium, 'getStats')
  const supplyResponse = await readGetter(medium, 'supplyImproved')
  const rootBalance = Math.round(parseInt(await root.getBalance(), 16) / 10 ** 9)
  return {
    transfers: statsResponse.transfers,
    supply: statsResponse.supply,
    supplyBreakdown: supplyResponse,
    wallets: statsResponse.wallets,
    tons: rootBalance.toString(),
    transferFee: statsResponse.transferFee,
    accruedFee: statsResponse.accruedFee,
    claimedFee: statsResponse.totalFeeClaimed,
  }
}

const getUAXBalance = async user => {
  const balance = await readGetter(user, 'getFinances')
  console.log(balance);
  return balance.balance
}

const getTONBalance = async user => {
  const hexBalance = (await user.getBalance());
  return +(parseInt(hexBalance, 16) / 10 ** 9).toFixed(2);
}


const uax = { getStats, getConfig, getUAXBalance, getTONBalance };

export default uax;

