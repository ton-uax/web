import s from './Wallet.module.css';

function Wallet({ address, balance }) {

  const addressShort = address.slice(0, 7) + "..." + address.slice(-4, 0)
  return (
    <section>
      <h2 className={s.title}>Wallet</h2>
      <div className={s.wallet}>
        <div className={s.ballance}>
          <div className={s.info}>BALANCE</div>
          <p className={s.value}>{balance.uax}</p>
          <p className={s.value}>{balance.gas}</p>
        </div>
        <a href="copy">
          <div className={s.yadd}>Copy your address: {addressShort}</div>
        </a>
      </div>
    </section>
  );
}

export default Wallet;
