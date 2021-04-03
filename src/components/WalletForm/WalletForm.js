import s from './WalletForm.module.css';
import uax from '../../uax/demo'
import React from 'react';

function WalletForm({ client, from, to, children }) {
  const toInput = React.createRef();
  const valueInput = React.createRef();

  async function onSubmit(event) {
    event.preventDefault();
    await uax.doTransfer(client, from, toInput.current.value, parseInt(valueInput.current.value))
  }


  return (
    <form className={s.block} onSubmit={onSubmit}>
      <label className={s.label}>Recipient</label>
      <input
        className={s.input}
        type="text"
        placeholder="0:..."
        defaultValue={to}
        ref={toInput}
      />
      <label className={s.label}>Value</label>
      <input
        className={s.input}
        type="text"
        placeholder="123.45"
        ref={valueInput}
      />
      {children}
      <button className={s.button} type="submit">
        Send
      </button>
    </form>
  );
}

export default WalletForm;
