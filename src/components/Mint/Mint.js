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
          placeholder="0:911d8d474b584cb4a3eb21a02c70cd2172054e2455d2472a7151b7986ffbe0d6"
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
