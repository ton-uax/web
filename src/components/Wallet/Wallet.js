import s from './Wallet.module.css';
import WalletForm from '../WalletForm';

function Wallet({ client, address, balance, defaultTo, className = '' }) {
  const addressShort = address.slice(0, 7) + '...' + address.slice(-4, 0);

  return (
    <div className={s.wallet}>
      <h2 className="i-card"> Wallet</h2>
      <div className={s.balanceContainer}>
        <div className={s.balance}>
          <div className={s.info}>BALANCE</div>
          <p className={`${s.value} i-uax`}>{balance ? balance.uax : '-'}</p>
          <p className={`${s.value} i-gas`}>{balance ? balance.ton : '-'}</p>
        </div>
        <a className={`${s.yadd} i-copy`} href="copy"><span>{addressShort}</span></a>
      </div>
      <WalletForm client={client} from={address} to={defaultTo}></WalletForm>
    </div>
  );
}

export default Wallet;
