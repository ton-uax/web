import s from './Wallet.module.css';

function Wallet({ uax, gas, address }) {
  return (
    <section>
      <h2 className={s.title}>Wallet</h2>
      <div className={s.wallet}>
        <div className={s.ballance}>
          <div className={s.info}>BALLANCE</div>
          <p className={s.value}>{uax}</p>
          <p className={s.value}>{gas}</p>
        </div>
        <a href="copy">
          <div className={s.yadd}>Copy your address: {address}</div>
        </a>
      </div>
    </section>
  );
}

export default Wallet;
