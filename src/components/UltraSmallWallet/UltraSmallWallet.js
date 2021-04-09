import s from './UltraSmallWallet.module.css';

function UltraSmallWallet({ address, uax, ton }) {
  const info = (
    <div>
      <p className="i-link">{address}</p>
      <p className="i-uax">{uax}</p>
      <p className="i-gas">{ton}</p>
    </div>
  );
  return (
    <div className={s.smallwallet}>
      <span className={s.status}></span>
      <p className="i-uax">{uax}</p>
      <p data-tooltip="info" className={s.tooltip}></p>
    </div>
  );
}

export default UltraSmallWallet;
