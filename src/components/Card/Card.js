import s from './Card.module.css';

function Card({ title, label, buttonText, children }) {
  return (
    <section className={s.card}>
      <h2 className={s.title}>{title}</h2>
      <form className={s.block}>
        <label className={s.label}>Recipient (hash)</label>
        <input
          className={s.input}
          type="text"
          placeholder="0:911d8d474b584cb4a3eb21a02c70cd2172054e2455d2472a7151b7986ffbe0d6"
        // onClick="this.select();"
        />
        <label className={s.label}>{label}</label>
        <input className={s.input} type="text" placeholder="1,000" />
        {children}
        <button className={s.button} type="submit">
          {buttonText}
        </button>
      </form>
    </section>
  );
}

export default Card;
