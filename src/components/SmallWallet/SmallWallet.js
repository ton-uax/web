import s from './SmallWallet.module.css';
import Loader from '../Loader';

function SmallWallet({ address, uax, ton, active }) {
  console.log(Object.keys(s));
  const empty = !address;
  const walletLoading = <Loader />;
  const walletInfo = (
    <div>
      <p className="i-link">123...456</p>
      <p className="i-uax">45</p>
      <p className="i-gas">1.234</p>
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
      <span className={s.status}></span>
      {empty ? walletLoading : walletInfo}
    </div>
  );
}

export default SmallWallet;
