import { useContext, useEffect } from 'react';
import { useAsync } from 'react-use';

import { signerKeys } from '@tonclient/core';
import { Account } from '@tonclient/appkit';

import OwnerWalletABI from '../ton-abi/OwnerWallet.abi.json';
import { getOwners } from './demo';

import { TONContext } from './context'


export function useTON() {
  const { client, dengine } = useContext(TONContext)
  return client
}


export function useOwnerAccount(kp_or_phrase) {
  const ton = useTON()
  const account = useAsync(async () => {
    let kp;
    if (typeof kp_or_phrase === String)
      kp = await ton.crypto.mnemonic_derive_sign_keys({ kp_or_phrase })
    else
      kp = kp_or_phrase
    let owners = await getOwners(ton)
    console.log(kp, owners)
    console.log("--owners-", owners)
    return new Account(
      { abi: OwnerWalletABI },
      {
        address: owners[kp.public], client: ton, signer: signerKeys(kp)
      }
    )
  }, [kp_or_phrase])

  useEffect(() => {
    if ((!account.loading) && (!account.value))
      return () => account.value.free()
  }, [kp_or_phrase])

  return account
}
