import s from './Aside.module.css'
import Btn from '../AdminBtn'
import Loader from '../Loader'

import { useContext, useState } from 'react'
import { useInterval } from 'react-use'

import uax from '../../uax'
import { TONUAXContext } from '../../uax/context'


function StatsRow({ name, value, icon, children, child }) {
  const loading = value === null
  const classValue = `${s.value} ${loading ? `i-cycle i-rotate ${s.valueLoading}` : ""}`
  return <>
    <div className={s.statrow}>
      <p className={child ? s.childstatname : s.statname}>{name}</p>
      <div className={`${icon} ${s.unit}`} />
      <span className={classValue}>{!loading && value}</span>
    </div>
    {children}
  </>
}

function Aside() {
  const [stats, setStats] = useState({
    supply: null,
    supplyBreakdown: {
      twTotal: null,
      owTotal: null,
      feeTotal: null,
      unallocated: null,
    },
    wallets: null,
    transfers: null,
    transferFee: null,
    accruedFee: null,
    claimedFee: null,
    tons: null,
  })
  // const [config, setConfig] = useState({
  //   initTON: "",
  //   initUAX: "",
  //   warnTON: "",
  //   transferFee: "",
  // })
  const { UAXSystem } = useContext(TONUAXContext)


  useInterval(() => {
    UAXSystem.Root.refresh()
    UAXSystem.Medium.refresh()
    uax.getStats(UAXSystem.Root, UAXSystem.Medium).then(setStats)
  }, 1000)

  return (
    <aside className={s.aside}>
      <div className={s.stats}>
        <h2>Statistics</h2>
        <StatsRow name="Wallets" value={stats.wallets} />
        <StatsRow name="Transfers" value={stats.transfers} />
        <StatsRow name="TransferFee" value={stats.transferFee} icon="i-uax" />
        <br />

        <StatsRow name="Supply" value={stats.supply} icon="i-uax">
          <StatsRow child name="Reserve" value={stats.supplyBreakdown.unallocated} />
          <StatsRow child name="Circulating" value={stats.supplyBreakdown.twTotal} />
          <StatsRow child name="CollectedFees" value={stats.supplyBreakdown.feeTotal} />
        </StatsRow>
        <br />

        <StatsRow name="ClaimedFee" value={stats.claimedFee} icon="i-uax" />
        <StatsRow name="RemainingGas" value={stats.tons} icon="i-gas" />
      </div>
      {/* <div className={s.stats}>
        <h2>Settings</h2>
        <StatsRow name="TransferFee" value={config.transferFee} icon="i-uax" />
        <StatsRow name="InitialBalance" value={config.initUAX} icon="i-uax" />
        <StatsRow name="InitialGas" value={config.initTON} icon="i-gas" />
        <StatsRow name="GasReplenishThreshold" value={config.warnTON} icon="i-gas" />
      </div> */}
      {/* <div>
        <h2>Dev</h2>
        <Btn caption="Create wallet" />
      </div> */}

    </aside>
  );
}

export default Aside;
