import { useState } from 'react';
import { useInterval } from 'react-use';
import uax from '../../uax/demo';
import { useConsole, useMedium, useRoot } from '../../uax/hooks';
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
  const medium = useMedium()
  const root = useRoot()
  const console = useConsole()
  const [stats, setStats] = useState({
    supply: "",
    wallets: "",
    transfers: "",
    accruedFee: "",
    claimedFee: "",
    tons: ""
  })
  const [config, setConfig] = useState({
    initTON: "",
    initUAX: "",
    warnTON: "",
    transferFee: "",
  })
  useInterval(() => {
    medium.refresh()
    console.refresh()
    uax.getStats(root, medium).then(setStats)
    uax.getConfig(console).then(setConfig)
  }, 1000)
  return (
    <aside className={s.aside}>
      <div className={s.stats}>
        <h2>Statistics</h2>
        <StatsRow name="Supply" value={stats.supply} />
        <StatsRow name="Wallets" value={stats.wallets} />
        <StatsRow name="Transfers" value={stats.transfers} />
        <StatsRow name="AccruedFee" value={stats.accruedFee} />
        <StatsRow name="ClaimedFee" value={stats.claimedFee} />
        <StatsRow name="RemainingTONs" value={stats.tons} />
      </div>
      <div className={s.stats}>
        <h2>Config</h2>
        <StatsRow name="InitialUAX" value={config.initUAX} />
        <StatsRow name="InitialTON" value={config.initTON} />
        <StatsRow name="WarnTON" value={config.warnTON} />
        <StatsRow name="TransferFee" value={config.transferFee} />
      </div>
      {/* <div>
        <h2>Dev</h2>
        <Btn title="Create wallet" icon="i-bot" onClick={deployWallet} />
        <Btn title="Clear desk" icon="i-bot" onClick={clearDesk} />
      </div> */}

    </aside>
  );
}

export default Aside;
