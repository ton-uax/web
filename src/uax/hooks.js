import { useContext, useEffect, useState } from 'react';
import { useAsyncRetry } from 'react-use';

import { TONUAXContext } from './context'
import { lastProposalOnApproval } from './proposal'


export function useTON() {
  const { ton } = useContext(TONUAXContext)
  return ton
}

export function useUAXSystem() {
  const { UAXSystem } = useContext(TONUAXContext)
  return UAXSystem
}

export function useOwner(idx) {
  const { UAXOwner } = useContext(TONUAXContext)
  const owner = UAXOwner({ idx })

  useEffect(() => {
    return () => {
      if (!owner)
        return
      // console.log('free', owner)
      owner.contract.free()
      owner.wallet.free()
    }
  }, [owner])

  return [owner?.contract, owner?.wallet]
}


export function useCurrentProposal() {
  const UAXSystem = useUAXSystem()
  const proposal = useAsyncRetry(async () => await lastProposalOnApproval(UAXSystem.Medium), [])
  return proposal
}
