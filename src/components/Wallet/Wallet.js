import WalletForm from '../WalletForm';
import s from './Wallet.module.css';

function Wallet({ client, address, balance }) {
  const addressShort = address.slice(0, 7) + "..." + address.slice(-4, 0)

  return (

    <div className={s.wallet}>
      <div className={s.ballance}>
        <div className={s.info}>BALANCE</div>
        <p className={s.value}>{balance ? balance.uax : "-"}</p>
        <p className={s.value}>{balance ? balance.ton : "-"}</p>
      </div>
      <a href="copy">
        <div className={s.yadd}>Copy your address: {addressShort}</div>
      </a>
      <WalletForm
        client={client} from={address}>
      </WalletForm>
    </div>
  );


}

export default Wallet;
