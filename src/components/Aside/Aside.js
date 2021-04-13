import { useState } from 'react';
import { useAsync } from 'react-use';
import uax from '../../uax/demo';
import s from './Aside.module.css';

function StatsRow({ name, value }) {
  return (
    <div className={s.statrow}>
      <p className={s.statname}>{name}</p>
      <span>{value}</span>
    </div>
  )
}

function Aside() {
  const [stats, setStats] = useState({
    supply: "",
    wallets: "",
    transfers: "",
    currentFee: "",
    collectedFees: "",
    gasRemaining: ""
  })
  // const subscriptionHandle = useAsync(uax.subscribeStats(setStats))
  return (
    <aside className={(s.aside)}>
      <div>
        <StatsRow name="Supply" value={stats.supply} />
        <StatsRow name="Wallets" value={stats.wallets} />
        <StatsRow name="Transfers" value={stats.transfers} />
        <StatsRow name="CurrentFee" value={1} />
        <StatsRow name="CollectedFees" value={stats.collectedFees} />
        <StatsRow name="GasRemaining" value={stats.gasRemaining} />
      </div>
    </aside>
  );
}

export default Aside;
