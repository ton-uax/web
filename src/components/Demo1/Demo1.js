import Owner from '../Owner';
import Wallet from '../Wallet';

import { useAsyncRetry } from 'react-use';

import { useOwnerAccount } from '../../uax/hooks';
import { fetchLastProposal } from '../../uax/owner';


function Demo1({ kp }) {
  const owner = useOwnerAccount(kp)
  const lastProposal = useAsyncRetry(async () => await fetchLastProposal(owner), [kp])

  return (
    <>
      <Owner.Message
        account={owner.value}
        proposal={lastProposal.value}
        updateProposal={lastProposal.retry}
      />
      <section>
        <h2>Owner {owner.loading ? "loading" : owner.value.address.slice(0, 5)}</h2>
        <div className="flex">
          <div className="container">
            <h3 className="i-card">Wallet</h3>
            {!owner.loading && <Wallet label="OWNER" account={owner.value} />}
          </div>
          <div className="container">
            <h3 className="i-uax">Manage Supply</h3>
            {!owner.loading && <Owner.SupplyManagement account={owner.value} />}
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
