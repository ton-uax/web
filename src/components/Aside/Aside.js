import s from './Aside.module.css';
import Btn from '../AdminBtn';

import { useCallback, useState } from 'react';
import { useInterval } from 'react-use';

import { Account } from '@tonclient/appkit';

import uax, { system } from '../../uax/demo';
import { useTON } from '../../uax/hooks';

import MediumABI from '../../ton-abi/Medium.abi.json';
import RootABI from '../../ton-abi/Root.abi.json';
import ConsoleABI from '../../ton-abi/Console.abi.json';


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
  const ton = useTON()

  const Medium = new Account({ abi: MediumABI }, { client: ton, address: system["Medium"] })
  const Root = new Account({ abi: RootABI }, { client: ton, address: system["Root"] })
  const Console = new Account({ abi: ConsoleABI }, { client: ton, address: system["Console"] })

  useInterval(useCallback(() => {
    Root.refresh()
    Medium.refresh()
    Console.refresh()
    uax.getStats(Root, Medium).then(setStats)
    uax.getConfig(Console).then(setConfig)
  }, [ton, setStats, setConfig]), 1000)

  return (
    <aside className={s.aside}>
      <div className={s.stats}>
        <h2>Statistics</h2>
        <StatsRow name="Supply" value={stats.supply} unit="uax" />
        <StatsRow name="Wallets" value={stats.wallets} />
        <StatsRow name="Transfers" value={stats.transfers} />
        <br />
        <StatsRow name="TransferFee" value={config.transferFee} unit="uax" />
        <StatsRow name="AccruedFee" value={stats.accruedFee} unit="uax" />
        <StatsRow name="ClaimedFee" value={stats.claimedFee} unit="uax" />
        <StatsRow name="RemainingGas" value={stats.tons} unit="ton" />
      </div>
      <div className={s.stats}>
        <h2>Config</h2>
        <StatsRow name="InitialBalance" value={config.initUAX} unit="uax" />
        <StatsRow name="InitialGas" value={config.initTON} unit="ton" />
        <StatsRow name="GasReplenishThreshold" value={config.warnTON} unit="ton" />
      </div>
      {/* <div>
        <h2>Dev</h2>
        <Btn title="Create wallet" icon="i-bot" />
      </div> */}

    </aside>
  );
}

export default Aside;
