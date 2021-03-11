import s from './Stats.module.css';

function Stats({
  UAXTotal,
  UserTotal,
  BaseFee,
  FeeTotal,
  GiverTotal,
  Transactions,
}) {
  return (
    <section className={s.stats}>
      <h2 className="title">Statistics</h2>
      <div className={s.row}>
        <p className={s.name}>UAXTotal</p>
        <span>{UAXTotal}</span>
      </div>
      <div className={s.row}>
        <p className={s.name}>UserTotal</p>
        <span>{UserTotal}</span>
      </div>
      <div className={s.row}>
        <p className={s.name}>BaseFee</p>
        <span>{BaseFee}</span>
      </div>
      <div className={s.row}>
        <p className={s.name}>FeeTotal</p>
        <span>{FeeTotal}</span>
      </div>
      <div className={s.row}>
        <p className={s.name}>GiverTotal</p>
        <span>{GiverTotal}</span>
      </div>
      <div className={s.row}>
        <p className={s.name}>Transactions</p>
        <span>{Transactions}</span>
      </div>
    </section>
  );
}

export default Stats;
