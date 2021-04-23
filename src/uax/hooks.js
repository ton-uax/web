import { useContext, useEffect, useState } from 'react';

import { TONUAXContext } from './context'


export function useTON() {
  const { ton } = useContext(TONUAXContext)
  return ton
}

export function useUAXSystem() {
  const { UAXSystem } = useContext(TONUAXContext)
  return UAXSystem
}

export function useOwner(id = 1) {
  const { UAXOwner } = useContext(TONUAXContext)
  const [ownerId] = useState(id)
  const owner = UAXOwner(ownerId)

  useEffect(() => {
    return () => owner && owner.free()
  }, [owner, ownerId])

  return owner
}
