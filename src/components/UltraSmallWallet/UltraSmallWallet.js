import s from './UltraSmallWallet.module.css';

function UltraSmallWallet({ address, ton, uax, active = false }) {
  return (
    <div className={s.smallwallet}>
      <span className={s.status}></span>
      <p className="i-uax">{uax}</p>
      <div className={s.tooltipcontent}>
        <p className="i-link">{address}</p>
        <p className="i-uax">{uax}</p>
        <p className="i-gas">{ton}</p>
      </div>
    </div>
  );
}

export default UltraSmallWallet;
