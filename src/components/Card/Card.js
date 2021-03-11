import s from './Card.module.css';

function Card({ title, label, buttonText }) {
  return (
    <section className={s.card}>
      <h2 class="title i-card">{title}</h2>
      <div class="block address">
        <div class="title i-target">Recipient (hash)</div>
        <input
          type="text"
          placeholder="0:67f4bf95722e1bd6df845fca7991e5e7128ce4a6d25f6d4ef027d139a11a7964"
          spellcheck="false"
          // onClick="this.select();"
        />
      </div>
      <div class="block value">
        <div class="title i-card">{label}</div>
        <input type="text" placeholder="1,000" />
      </div>
      <div class="row">
        <button type="submit">{buttonText}</button>
      </div>
    </section>
  );
}

export default Card;
