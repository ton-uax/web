import s from './WalletForm.module.css';
import uax from '../../uax/demo';
import React from 'react';
import Loader from '../Loader';

function WalletForm({ client, from, to, children }) {
  const toInput = React.createRef();
  const valueInput = React.createRef();

  async function onSubmit(event) {
    event.preventDefault();
    await uax.doTransfer(
      client,
      from,
      toInput.current.value,
      parseInt(valueInput.current.value),
    );
  }

  return (
    <form className={s.block} onSubmit={onSubmit}>
      <label className="i-target">Recipient</label>
      <input
        className={s.input}
        type="text"
        placeholder="0:..."
        defaultValue={to}
        ref={toInput}
      />
      <label className="i-card">Value</label>
      <input
        className={s.input}
        type="text"
        placeholder="123.45"
        ref={valueInput}
      />
      {children}
      <button className={s.button} type="submit">
        Send
        {/* <Loader /> */}
      </button>
    </form>
  );
}

export default WalletForm;
