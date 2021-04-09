import AdminWallet from '../AdminWallet';
import Btn from '../AdminBtn';
import s from './Aside.module.css';

function StatsRow({ name, value }) {
  return (
    <div className={s.row}>
      <p className={s.name}>{name}</p>
      <span>{value}</span>
    </div>
  );
}

function Aside({ client }) {
  return (
    <aside className={s.aside}>
      {/* UAXTotal={123456}
        UserTotal={537}
        BaseFee={100}
        FeeTotal={2567}
        GiverTotal={2000000}
        Transactions={4221} */}
      <div className={s.stats}>
        <h2>Statistics</h2>
        <StatsRow name="UAXTotal" value={123456} />
        <StatsRow name="FeeTotal" value={2567} />
        <StatsRow name="UAXTotal" value={123456} />
        <StatsRow name="FeeTotal" value={2567} />
        <StatsRow name="UAXTotal" value={123456} />
        <StatsRow name="FeeTotal" value={2567} />
      </div>
      <AdminWallet>
        <Btn title="Create 5 wallets" />
        <Btn title="Speed up" />
        <Btn title="Speed down" />
        <Btn title="Clear desk" />
      </AdminWallet>
    </aside>
  );
}

export default Aside;
