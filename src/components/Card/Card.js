import s from './Card.module.css';
import uax from '../../uax/demo'

function Card({ title, label, buttonText, client, from, to, value, setBalance, children }) {

  async function demoTransfer(event) {
    event.preventDefault();

    const wallet = uax.makeWalletWrapper(client, from);
    let res = await wallet.run("transferTokens", { to: to, val: value });
    console.log(res);
    let balanceFrom = await uax.getBalance(client, from)
    let balanceTo = await uax.getBalance(client, to);
    await setBalance(from, balanceFrom);
    await setBalance(to, balanceTo);
  }

  return (
    <section className={s.card}>
      <h2 className={s.title}>{title}</h2>
      <form className={s.block}>
        <label className={s.label}>Recipient (hash)</label>
        <input
          className={s.input}
          type="text"
          placeholder="Enter recipient address"
          defaultValue={to}
        />
        <label className={s.label}>{label}</label>
        <input className={s.input} type="text" placeholder="1,000" />
        {children}
        <button className={s.button} type="submit" onClick={demoTransfer}>
          {buttonText}
        </button>
      </form>
    </section>
  );
}

export default Card;
