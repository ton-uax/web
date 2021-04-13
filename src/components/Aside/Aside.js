import { useState } from 'react';
import { useAsync } from 'react-use';
import uax from '../../uax/demo';
import { useTON } from '../../uax/hooks';
import Btn from '../AdminBtn';
import s from './Aside.module.css';

function StatsRow({ name, value }) {
  return (
    <div className={s.statrow}>
      <p className={s.statname}>{name}</p>
      <span>{value}</span>
    </div>
  );
}

function Aside() {
  const ton = useTON()
  const [stats, setStats] = useState({
    supply: "",
    wallets: "",
    transfers: "",
    transferFee: "",
    accruedFee: "",
    claimedFee: "",
    tons: ""
  })
  const c = useAsync(() => uax.updateStatsForever(ton, setStats))
  return (
    <aside className={s.aside}>
      <div className={s.stats}>
        <h2>Statistics</h2>
        <StatsRow name="Supply" value={stats.supply} />
        <StatsRow name="Wallets" value={stats.wallets} />
        <StatsRow name="Transfers" value={stats.transfers} />
        <StatsRow name="CurrentFee" value={stats.transferFee} />
        <StatsRow name="AccruedFee" value={stats.accruedFee} />
        <StatsRow name="ClaimedFee" value={stats.claimedFee} />
        <StatsRow name="RemainingTONs" value={stats.tons} />
      </div>
      <section>
        <div>
          <h2>Admin</h2>
          <Btn title="Create 5 wallets" icon="i-bot" />
          <Btn title="Speed up" icon="i-bot-rotate" />
          <Btn title="Speed down" icon="i-bot" />
          <Btn title="Clear desk" icon="i-bot" />
        </div>
      </section>

    </aside>
  );
}

export default Aside;
