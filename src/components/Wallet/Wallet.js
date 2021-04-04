import WalletForm from '../WalletForm';
import Col from '../Col';
import s from './Wallet.module.css';

function Wallet({ client, address, balance, defaultTo }) {
  const addressShort = address.slice(0, 7) + "..." + address.slice(-4, 0)

  return (
    <Col>
    <div className={s.wallet}>
      <div className={s.balance}>
        <div className={s.info}>BALANCE</div>
        <p className={s.value}>{balance ? balance.uax : "-"}</p>
        <p className={s.value}>{balance ? balance.ton : "-"}</p>
      </div>
      <a href="copy">
        <div className={s.yadd}>Copy your address: {addressShort}</div>
      </a>
      <WalletForm
        client={client} from={address} to={defaultTo}>
      </WalletForm>
    </div>
    </Col>
  );


}

export default Wallet;
