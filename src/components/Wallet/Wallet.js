import s from './Wallet.module.css';
import WalletForm from '../WalletForm';

function Wallet({ client, address, balance, defaultTo, className = '' }) {
  const addressShort = address.slice(0, 7) + '...' + address.slice(-4, 0);

  return (
    <div className={s.wallet}>
      <div className={s.balanceContainer}>
        <div className={s.balance}>
          <div className={s.info}>BALANCE</div>
          <p className={s.value}>{balance ? balance.uax : '-'}</p>
          <p className={s.value}>{balance ? balance.ton : '-'}</p>
        </div>
        <a href="copy">
          <div className={s.yadd}>Copy your address: {addressShort}</div>
        </a>
      </div>
      <WalletForm client={client} from={address} to={defaultTo}></WalletForm>
    </div>
  );
}

export default Wallet;
