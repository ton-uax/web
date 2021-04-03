import s from './SmallWallet.module.css';

function SmallWallet({ address, uax, ton }) {
  return <div className={s.smallwallet}>
    <p>{address}</p>
    <p>{uax}</p>
    <p>{ton}</p>
  </div>
};

export default SmallWallet;
