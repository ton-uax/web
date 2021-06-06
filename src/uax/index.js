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

export async function getStats(root, medium) {
  const statsResponse = await readGetter(medium, 'getStats')
  const supplyResponse = await readGetter(medium, 'supplyImproved')
  const rootBalance = await getTONBalance(root)
  const totalSupply = Object.values(supplyResponse).reduce((a, b) => Number(a) + Number(b))
  return {
    wallets: statsResponse.wallets,
    transfers: statsResponse.transfers,
    transferFee: statsResponse.transferFee,

    supply: totalSupply,
    supplyBreakdown: supplyResponse,
    claimedFee: statsResponse.totalFeeClaimed,

    accruedFee: statsResponse.accruedFee,
    tons: rootBalance.toString(),
  }
}

export const getUAXBalance = async contract => {
  const balance = await readGetter(contract, 'getFinances')
  return balance.balance
}

export const getTONBalance = async contract => {
  const hexBalance = (await contract.getBalance());
  return +(parseInt(hexBalance, 16) / 10 ** 9).toFixed(2);
}


const uax = { getStats, getUAXBalance, getTONBalance };

export default uax;

