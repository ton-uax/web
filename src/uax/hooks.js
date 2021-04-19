import { useContext, useEffect } from 'react';
import { useAsync } from 'react-use';

import { signerKeys } from '@tonclient/core';
import { Account } from '@tonclient/appkit';

import OwnerWalletABI from '../ton-abi/OwnerWallet.abi.json';
import RootABI from '../ton-abi/Root.abi.json';
import { addresses, getOwners } from './demo';

import { TONContext } from './context'


export function useTON() {
  const { client, dengine } = useContext(TONContext)
  return client
}


export function useOwnerAccount(phrase) {
  const ton = useTON()

  const account = useAsync(async () => {
    const kp = await ton.crypto.mnemonic_derive_sign_keys({ phrase })
    const Root = new Account(
      { abi: RootABI }, 
      { address: addresses["Root"], client: ton })

    let owners = await getOwners(Root)
    console.log(owners)
    return new Account(
      { abi: OwnerWalletABI },
      {
        address: owners[`0x${kp.public}`], client: ton, signer: signerKeys(kp)
      }
    )
  }, [ton])

  useEffect(() => {
    return () => {
      if (account.value)
        account.value.free()
    }
  }, [account])

  return account
}
