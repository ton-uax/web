import s from './Mint.module.css';

function Mint() {
  return (
    <section className={s.card}>
      <h2 class="title i-mint">Mint</h2>
      <div class="block address">
        <div class="title">Recipient (hash)</div>
        <input
          type="text"
          placeholder="0:67f4bf95722e1bd6df845fca7991e5e7128ce4a6d25f6d4ef027d139a11a7964"
          spellcheck="false"
          //   onClick="this.select();"
        />
      </div>
      <div class="block gas">
        <div class="title i-gas">Value (gas)</div>
        <input type="text" placeholder="400" />
      </div>
      <div class="block uax">
        <div class="title i-uax">Value (uax)</div>
        <input type="text" placeholder="0" />
      </div>
      <div class="row">
        <div class="row">
          <button type="submit">Create</button>
        </div>
      </div>
    </section>
  );
}

export default Mint;
