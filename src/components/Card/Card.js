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
          placeholder="0:67f4bf95722e1bd6df845fca7991e5e7128ce4a6d25f6d4ef027d139a11a7964"
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
