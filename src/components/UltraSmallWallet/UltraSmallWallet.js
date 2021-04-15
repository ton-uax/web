import SmallWallet from '../SmallWallet';
import s from './UltraSmallWallet.module.css';

function UltraSmallWallet({ address, uax, setSelected, isSelected }) {
  console.log(address, uax)
  function onClick(e) {
    setSelected(address)
  }
  const className = isSelected ? s['smallwallet-active'] : s.smallwallet
  return (
    <div className={className} onClick={onClick}>
      <span className={s.status}></span>
      <p className="i-uax">{uax}</p>
    </div>
  );
}

export default UltraSmallWallet;
