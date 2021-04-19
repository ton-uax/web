import Owner from '../Owner';
import Wallet from '../Wallet';

import { useOwnerAccount } from '../../uax/hooks';



function Demo1() {
  const k1 = "torch chimney grab behave dust effort grape guard same nation lesson dutch"
  const k2 = "merit have confirm very south nature mechanic slim list space dinner latin"
  const o1 = useOwnerAccount(k1)
  const o2 = useOwnerAccount(k2)

  return (
    <>
      {!o2.loading && <Owner.Message account={o2.value} />}
      <section>
        <h2>Owner UI</h2>
        <div className="flex">
          <div className="container">
            <h3 className="i-card">Wallet</h3>
            {!o1.loading && <Wallet label="OWNER" account={o1.value} />}
          </div>
          <div className="container">
            <h3 className="i-uax">Manage Supply</h3>
            {!o1.loading && <Owner.SupplyManagement account={o1.value} />}
          </div>
          {/* <div className="container">
            <h3 className="i-proc">Global Settings</h3>
            {!o1.loading && <Owner.Config account={o1.value} />}
          </div> */}
        </div>
      </section>
    </>
  );
}

export default Demo1;
