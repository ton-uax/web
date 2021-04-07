import s from './Aside.module.css';


function StatsRow({ name, value }) {
  return (
    <div className={s.row}>
      <p className={s.name}>{name}</p>
      <span>{value}</span>
    </div>
  )
}

function Aside({ client }) {
  return (
    <aside className={(s.aside)}>
      {/* UAXTotal={123456}
        UserTotal={537}
        BaseFee={100}
        FeeTotal={2567}
        GiverTotal={2000000}
        Transactions={4221} */}
      <div className={s.stats}>
        <StatsRow name="UAXTotal" value={123456} />
        <StatsRow name="FeeTotal" value={2567} />
        <StatsRow name="UAXTotal" value={123456} />
        <StatsRow name="FeeTotal" value={2567} />
        <StatsRow name="UAXTotal" value={123456} />
        <StatsRow name="FeeTotal" value={2567} />
      </div>


    </aside>
  );
}

export default Aside;
