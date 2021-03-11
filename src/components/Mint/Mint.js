import s from './Mint.module.css';

function Mint() {
  return (
    <section className={s.card}>
      <h2 className={s.title}>Mint</h2>
      <form className={s.block}>
        <label className={s.label}>Recipient (hash)</label>
        <input
          className={s.input}
          type="text"
          placeholder="0:67f4bf95722e1bd6df845fca7991e5e7128ce4a6d25f6d4ef027d139a11a7964"
          // onClick="this.select();"
        />
        <label className={s.label}>Value (gas)</label>
        <input className={s.input} type="text" placeholder="1,000" />
        <label className={s.label}>Value (uax)</label>
        <input className={s.input} type="text" placeholder="0" />
        <button className={s.button} type="submit">
          Create
        </button>
      </form>
    </section>
  );
}

export default Mint;
