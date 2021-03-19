import s from './AdminBtn.module.css';
import uax from '../../uax/demo'

function Btn({ title, client, address, setBalance }) {
  return (
    <button className={s.button} type="button" onClick={
      () => uax.getBalance(client, address).then(
        (balance) => setBalance(address, balance))
    }>
      {title}
    </button>
  );
}

export default Btn;
