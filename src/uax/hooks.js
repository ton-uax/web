import { useContext, useEffect } from 'react';

import { TONUAXContext } from './context'


export function useTON() {
  const { ton } = useContext(TONUAXContext)
  return ton
}

export function useUAXSystem() {
  const { UAXSystem } = useContext(TONUAXContext)
  return UAXSystem
}

export function useOwner({ idx, twAddr }) {
  const { UAXOwner } = useContext(TONUAXContext)
  const owner = UAXOwner({ idx, twAddr })
  // console.log('###', owner, idx, twAddr)
  useEffect(() => {
    return () => {
      if (owner) {
        owner.contract.free()
        owner.wallet.free()
      }
    }
  }, [owner])

  return [owner?.contract, owner?.wallet]
}

export function useUser(idx) {
  const { UAXUser } = useContext(TONUAXContext)
  const user = UAXUser(idx)
  useEffect(() => {
    return () => {
      if (user) {
        user.free()
      }
    }
  }, [user])
  return user
}


