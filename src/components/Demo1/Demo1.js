import Owner from '../Owner';
import Wallet from '../Wallet';

import { useOwner, useUAXSystem } from '../../uax/hooks';
import { useAsync, useAsyncFn, useAsyncRetry, useInterval } from 'react-use';

import { lastProposalOnApproval } from '../../uax/proposal';
import { useCallback } from 'react';

function useX(contract, proposal, medium, updateProposal) {

  useAsync(async () => {
    console.log('Owner.subscribe', (new Date()).toLocaleString(), contract.address)
    // if (!proposal.value)
    //   updateProposal()
    return await contract.subscribe(
      "messages",
      {
        src: { eq: medium.address }, dst: { eq: contract.address },
        OR: {
          src: { eq: contract.address }, dst: { eq: medium.address }
        }
      },
      "id,created_at,boc,src,dst", async msg => {
        console.log('Owner.onMessage', (new Date()).toLocaleString())
        let m = await ((msg.dst == medium.address) ? medium : contract).decodeMessage(msg.boc)
        console.log((msg.dst == medium.address) ? 'medium' : 'owner', '->', msg.dst.slice(0, 5), m.name, m.value)
        if (m.name == 'updateEventState')
          updateProposal()
      })
  }, [proposal.value?.id, proposal.value?.hasSigs, contract, medium])

}

function Demo1({ idx }) {
  const [contract, wallet] = useOwner({ idx })
  const UAXSystem = useUAXSystem()
  const medium = UAXSystem.Medium

  const proposal = useAsyncRetry(async () => await lastProposalOnApproval(medium), [])

  console.log(`render demo for o${idx}. contract: ${contract?.address} tw: ${wallet?.address}`)
  const isMyProposal = proposal.value?.author === idx
  const alreadyVoted = proposal.value?.ownersVoted.includes(idx)
  const showProposalPopup = !proposal.loading && proposal.value && !isMyProposal && proposal.value.expire > new Date()

  const updateProposal = useCallback(proposal.retry, [proposal])
  // useInterval(useCallback(() => updateProposal, [proposal]), 1000)

  useX(contract, proposal, medium, updateProposal)

  return <>
    {
      showProposalPopup &&
      <Owner.Vote owner={contract} proposal={proposal.value} refresh={updateProposal} ownerAlreadyVoted={alreadyVoted} />
    }
    {
      contract && wallet &&
      <section>
        <h2>Owner {idx}</h2>
        <div className="flex">

          <div className="container">
            <Owner.Propose owner={contract} wallet={wallet} />
          </div>

          <div className="container">
            <Wallet label={`OWNER ${idx}`} account={wallet} />
          </div>

        </div>
      </section>
    }
  </>
}

export default Demo1;
