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
  return (
    <aside className={(s.aside)}>
      <div>
        <StatsRow name="Supply" value={123456} />
        <StatsRow name="Users" value={2567} />
        <StatsRow name="Transfers" value={2567} />
        <StatsRow name="CurrentFee" value={123456} />
        <StatsRow name="CollectedFees" value={2567} />
        <StatsRow name="GasLeft" value={123456} />
      </div>
    </aside>
  );
}

export default Aside;
