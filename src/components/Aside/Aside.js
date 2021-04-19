import s from './Aside.module.css';
import Btn from '../AdminBtn';

import { useState } from 'react';
import { useAsync } from 'react-use';

import { Account } from '@tonclient/appkit';

import uax, {addresses} from '../../uax/demo';
import { useTON } from '../../uax/hooks';
import MediumABI from '../../ton-abi/Medium.abi.json';
import RootABI from '../../ton-abi/Root.abi.json';
import ConsoleABI from '../../ton-abi/Console.abi.json';


function StatsRow({ name, value }) {
  return (
    <div className={s.statrow}>
      <p className={s.statname}>{name}</p>
      <span>{value}</span>
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

  useAsync(async () => {
    const Medium = new Account({ abi: MediumABI }, { client: ton, address: addresses["Medium"] })
    const Root = new Account({ abi: RootABI }, { client: ton, address: addresses["Root"] })
    const Console = new Account({ abi: ConsoleABI }, { client: ton, address: addresses["Console"] })
    
    uax.getStats(Root, Medium).then(setStats)
    uax.getConfig(Console).then(setConfig)

    console.log('Medium.subscribe', Date.now())
    await Medium.subscribeMessages('id', msg => {
      console.log('Medium.onMessage', Date.now(), msg)
      uax.getStats(Root, Medium).then(setStats)
    })
    console.log('Console.subscribe', Date.now())
    await Console.subscribeMessages('id', msg => {
      console.log('Console.onMessage', Date.now(), msg)
      uax.getConfig(Console).then(setConfig)
    })
  }, [ton, setStats, setConfig])

  return (
    <aside className={s.aside}>
      <div className={s.stats}>
        <h2>Statistics</h2>
        <StatsRow name="Supply" value={stats.supply} />
        <StatsRow name="Wallets" value={stats.wallets} />
        <StatsRow name="Transfers" value={stats.transfers} />
        <StatsRow name="AccruedFeeUAX" value={stats.accruedFee} />
        <StatsRow name="ClaimedFeeUAX" value={stats.claimedFee} />
        <StatsRow name="RemainingTONs" value={stats.tons} />
      </div>
      <div className={s.stats}>
        <h2>Config</h2>
        <StatsRow name="InitialUAX" value={config.initUAX} />
        <StatsRow name="InitialTON" value={config.initTON} />
        <StatsRow name="ThresholdTON" value={config.warnTON} />
        <StatsRow name="TransferFeeUAX" value={config.transferFee} />
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
