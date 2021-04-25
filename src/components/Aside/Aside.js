import s from './Aside.module.css';
import Btn from '../AdminBtn';

import { useContext, useState } from 'react';
import { useInterval } from 'react-use';

import uax from '../../uax';
import { TONUAXContext } from '../../uax/context';


function StatsRow({ name, value, icon, children, child }) {
  return <>
    <div className={s.statrow}>
      <p className={child ? s.childstatname : s.statname}>{name}</p>
      <span>{value}</span><span className={`${icon} ${s.unit}`}></span>
    </div>
    {children}
  </>
}

function Aside() {
  const [stats, setStats] = useState({
    supply: "",
    supplyBreakdown: {
      twTotal: "",
      owTotal: "",
      feeTotal: "",
      unallocated: "",
    },
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
        <StatsRow name="Wallets" value={stats.wallets} />
        <StatsRow name="Transfers" value={stats.transfers} />
        <br />

        <StatsRow name="Supply" value={stats.supply} icon="i-uax">
          <StatsRow child name="Unallocated" value={stats.supplyBreakdown.unallocated} />
          <StatsRow child name="OwnerWallets" value={stats.supplyBreakdown.owTotal} />
          <StatsRow child name="UserWallets" value={stats.supplyBreakdown.twTotal} />

          <StatsRow child name="CollectedFees" value={stats.supplyBreakdown.feeTotal} />

        </StatsRow>
        <br />



        <StatsRow name="ClaimedFee" value={stats.claimedFee} icon="i-uax" />
        <StatsRow name="RemainingGas" value={stats.tons} icon="i-gas" />
      </div>
      <div className={s.stats}>
        <h2>Settings</h2>
        <StatsRow name="TransferFee" value={config.transferFee} icon="i-uax" />
        <StatsRow name="InitialBalance" value={config.initUAX} icon="i-uax" />
        <StatsRow name="InitialGas" value={config.initTON} icon="i-gas" />
        <StatsRow name="GasReplenishThreshold" value={config.warnTON} icon="i-gas" />
      </div>
      <div>
        <h2>Dev</h2>
        <Btn caption="Create wallet" />
      </div>

    </aside>
  );
}

export default Aside;
