import Owner from '../Owner';
import Wallet from '../Wallet';

import { useOwner, useUAXSystem } from '../../uax/hooks';
import { useAsync, useAsyncRetry } from 'react-use';

import { lastProposalOnApproval } from '../../uax/proposal';
import { readGetter } from '../../uax';
import { useEffect } from 'react';

function useX(contract, proposal, medium) {

  useAsync(async () => {
    console.log('Owner.subscribe', new Date(), contract)
    return await contract.subscribe(
      "messages",
      {
        src: { eq: medium.address }, dst: { eq: contract.address },
        OR: {
          src: { eq: contract.address }, dst: { eq: medium.address }
        }
      },
      "id,boc,src,dst", async msg => {
        console.log('Owner.onMessage', new Date())
        let m = await ((msg.dst == medium.address) ? medium : contract).decodeMessage(msg.boc)
        console.log((msg.dst == medium.address) ? 'medium' : 'owner', '->', msg.dst.slice(0, 5), m.name, m.value)
        proposal.retry()
      })
  }, [proposal.value, contract, medium])

}

function Demo1({ idx }) {
  const [contract, wallet] = useOwner({ idx })
  const walletEnv = useAsync(async () => wallet && readGetter(wallet, 'getEnv'), [wallet])
  const UAXSystem = useUAXSystem()
  const proposal = useAsyncRetry(async () => await lastProposalOnApproval(UAXSystem.Medium), [])
  let medium = UAXSystem.Medium

  console.log(`render demo for o${idx}. contract: ${contract?.address} tw: ${wallet?.address}`)
  const isMyProposal = proposal.value?.author === walletEnv.value?.id
  const showProposalPopup = !proposal.loading && proposal.value && !isMyProposal && proposal.value.expire > new Date()

  useX(contract, proposal, medium)

  return <>
    {
      showProposalPopup &&
      <Owner.Vote owner={contract} proposal={proposal.value} refresh={proposal.retry} />
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
