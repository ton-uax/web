import s from './SmallWallet.module.css';
import Loader from '../Loader';

function SmallWallet({ address, uax, ton, active }) {
  const empty = !address;
  const walletLoading = <Loader />;
  const walletInfo = (
    <div>
      <p className="i-link">{address}</p>
      <p className="i-uax">{uax}</p>
      <p className="i-gas">{ton}</p>
    </div>
  );

  return (

    <div
      className={
        s.ultra

        // active
        //   ? s['smallwallet-active']
        //   : empty
        //   ? s['smallwallet-empty']
        //   : s.smallwallet
      }>
      {empty ? walletLoading : walletInfo}
    </div>

  );
}

export default SmallWallet;
