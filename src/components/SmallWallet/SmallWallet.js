import s from './SmallWallet.module.css';
import loader from '../../img/cycle.png'
function SmallWallet({ address, uax, ton, active }) {
  console.log(Object.keys(s));
  const empty = !address
  const walletLoading = <img className={s.loader} src={loader} width="20px" />
  const walletInfo = <>
    <p>0:123...456</p>
    <p>$ 45</p>
    <p>1.234</p>
  </>

  return <div className={active ? s['smallwallet'] : empty ? s['smallwallet-empty'] : s.smallwallet}>
    {empty ? walletLoading : walletInfo}
  </div>
};

export default SmallWallet;
