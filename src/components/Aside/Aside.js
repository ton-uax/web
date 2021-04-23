import s from './Aside.module.css';
import Btn from '../AdminBtn';

import { useContext, useState } from 'react';
import { useInterval } from 'react-use';

import uax from '../../uax';
import { TONUAXContext } from '../../uax/context';


function StatsRow({ name, value, unit }) {
  return (
    <div className={s.statrow}>
      <p className={s.statname}>{name}</p>
      <span>{value}</span><span className={s.unit}>{unit}</span>
    </div>
  );
}

function Aside() {
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
  const { UAXSystem } = useContext(TONUAXContext)


  useInterval(() => {
    UAXSystem.Root.refresh()
    UAXSystem.Medium.refresh()
    UAXSystem.Console.refresh()
    uax.getStats(UAXSystem.Root, UAXSystem.Medium).then(setStats)
    uax.getConfig(UAXSystem.Console).then(setConfig)
  }, 1000)

  return (
    <aside className={s.aside}>
      <div className={s.stats}>
        <h2>Statistics</h2>
        <StatsRow name="Supply" value={stats.supply} unit="uax" />
        <StatsRow name="Wallets" value={stats.wallets} />
        <StatsRow name="Transfers" value={stats.transfers} />
        <br />
        <StatsRow name="AccruedFee" value={stats.accruedFee} unit="uax" />
        <StatsRow name="ClaimedFee" value={stats.claimedFee} unit="uax" />
        <StatsRow name="RemainingGas" value={stats.tons} unit="ton" />
      </div>
      <div className={s.stats}>
        <h2>Settings</h2>
        <StatsRow name="TransferFee" value={config.transferFee} unit="uax" />
        <StatsRow name="InitialBalance" value={config.initUAX} unit="uax" />
        <StatsRow name="InitialGas" value={config.initTON} unit="ton" />
        <StatsRow name="GasReplenishThreshold" value={config.warnTON} unit="ton" />
      </div>
      <div>
        <h2>Dev</h2>
        <Btn title="Create wallet" icon="i-bot" />
      </div>

    </aside>
  );
}

export default Aside;
