import s from './SmallWallet.module.css';
import loader from '../../img/cycle.png';
function SmallWallet({ address, uax, ton, active }) {
  console.log(Object.keys(s));
  const empty = !address;
  const walletLoading = <img className={s.loader} src={loader} width="20px" alt="loading" />;
  const walletInfo = (
    <div>
      <p>0:123...456</p>
      <p>$ 45</p>
      <p>1.234</p>
    </div>
  );

  return (
    <div
      className={
        active
          ? s['smallwallet-active']
          : empty
            ? s['smallwallet-empty']
            : s.smallwallet
      }
    >
      {empty ? walletLoading : walletInfo}
    </div>
  );
}

export default SmallWallet;
