import { Account } from '@tonclient/appkit';
import { signerKeys } from '@tonclient/core';


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

const getUAXBalance = async user => (await user.runLocal('_balance')).decoded.output._balance

const getTONBalance = async user => {
  const hexBalance = (await user.getBalance());
  return +(parseInt(hexBalance, 16) / 10 ** 9).toFixed(2);
}


const uax = { getStats, getConfig, getUAXBalance, getTONBalance };

export default uax;

