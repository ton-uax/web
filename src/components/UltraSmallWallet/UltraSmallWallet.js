import SmallWallet from '../SmallWallet';
import s from './UltraSmallWallet.module.css';

function UltraSmallWallet({ address, ton, uax }) {
  return (
    <div className={s.smallwallet}>
      <span className={s.status}></span>
      <p className="i-uax">{uax}</p>
    </div>
  );
}

export default UltraSmallWallet;
