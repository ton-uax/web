import Owner from '../Owner';
import Wallet from '../Wallet';

import { useAsync, useAsyncRetry } from 'react-use';

import { useUAXSystem } from '../../uax/hooks';
import { lastProposalOnApproval } from '../../uax/proposal';
import { readGetter } from '../../uax';



function Demo1({ owner, tw, idx }) {
  const UAXSystem = useUAXSystem()
  
  const lastProposal = useAsyncRetry(async () => await lastProposalOnApproval(owner, UAXSystem), [owner])
  if (!owner)
    return <></>
  return (
    <>
      <Owner.Message
        account={owner}
        proposal={lastProposal.value}
        updateProposal={lastProposal.retry}
      />
      <section>
        <h2>Owner {owner.address.slice(0, 5)}</h2>
        <div className="flex">
          <div className="container">
            <h3 className="i-card">Wallet</h3>
            <Wallet label={`OWNER ${idx}`} account={tw} />
          </div>
          <div className="container">
            <h3 className="i-uax">Manage Supply</h3>
            <Owner.SupplyManagement account={owner} />
          </div>
          {/* <div className="container">
            <h3 className="i-proc">Global Settings</h3>
            {!owner.loading && <Owner.Config account={owner.value} />}
          </div> */}
        </div>
      </section>
    </>
  );
}

export default Demo1;
