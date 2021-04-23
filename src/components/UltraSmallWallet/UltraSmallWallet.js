// import SmallWallet from '../SmallWallet';
import s from './UltraSmallWallet.module.css';

function UltraSmallWallet({ address, uax, setSelected, isSelected }) {
  console.log(address, uax)
  const className = isSelected ? s['smallwallet-active'] : s.smallwallet
  return (
    <div className={className} onClick={() => setSelected(address)}>
      <span className={s.status}></span>
      <p className="i-uax">{uax}</p>
    </div>
  );
}

export default UltraSmallWallet;
