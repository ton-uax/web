import s from './SmallWallet.module.css';


function SmallWallet({ address, balance }) {
  return (
    address &&
    <div className={s.ultra}>
      <div>
        <p className="i-link">{address}</p>
        <p className="i-uax">{balance.balanceUAX}</p>
        <p className="i-gas">{balance.balanceTON}</p>
      </div>
    </div>
  );
}

export default SmallWallet;
