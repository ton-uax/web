import Owner from '../Owner';
import Wallet from '../Wallet';

import { useOwner, useCurrentProposal } from '../../uax/hooks';


function Demo1({ idx }) {
  const [contract, wallet] = useOwner(idx)
  const proposal = useCurrentProposal()

  console.log(`render demo for o${idx}. contract: ${contract?.address} tw: ${wallet?.address}`)

  const isMyProposal = proposal.value?.author === wallet?.address
  const showProposalPopup = !proposal.loading && proposal.value && !isMyProposal

  return <>
    {
      showProposalPopup &&
      <Owner.Vote owner={contract} wallet={wallet} lastProposal={proposal} />
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
