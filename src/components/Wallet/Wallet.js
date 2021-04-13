import s from './Wallet.module.css';
import React, { useRef, useState } from 'react';
import { useAsync, useAsyncFn, useAsyncRetry, useCopyToClipboard, useUpdate } from 'react-use';
import { useTONAccount } from '../../uax/hooks';
import Loader from '../Loader/Loader'


function Wallet({ address }) {
  const addressShort = !address ? "0:" : address.slice(0, 7) + '...' + address.slice(-4);
  const [, copyToClipboard] = useCopyToClipboard();
  const [w] = useTONAccount(address)
  const updateBalance = useUpdate()
  const balanceState = useAsync(async () => {
    const uax = (await w.runLocal("_balance")).decoded.output._balance
    const ton = (Number(await w.getBalance()) / 10 ** 9).toString().slice(0, 4)
    console.log('updated', address, { uax, ton })
    return { uax, ton }
  }, [])
  const balance = balanceState.value || { uax: "0", ton: "0" }

  function onMessage(msg) {
    console.log('onMessage', msg)
    updateBalance()
  }
  w.subscribeMessages("id,boc,code,data,created_at_string,msg_type,msg_type_name,status,status_name", onMessage)

  const toInput = useRef()
  const valueInput = useRef()

  async function send1(event) {
    console.log('1')
    console.log(await w.run("transferTokensExt", {
      to: toInput.current.value,
      val: Number(valueInput.current.value)
    }))
    console.log('2')
  }

  async function send2(event) {
    console.log('11')
    console.log(await w.run("transferTokensDirectly", {
      to: toInput.current.value,
      val: Number(valueInput.current.value)
    }))
    console.log('22')
  }

  return (
    <div className={s.wallet}>
      <h2 className="i-card"> Wallet</h2>
      <div className={s.balanceContainer}>
        <div className={s.balance}>
          <div className={s.info}>BALANCE</div>
          <p className={`${s.value} i-uax`}>{balance.uax}</p>
          <p className={`${s.value} i-gas`}>{balance.ton}</p>
        </div>
        <a className={`${s.yadd} i-copy`} onClick={() => copyToClipboard(address)}>
          {addressShort}
        </a>

      </div>
      <form className={s.block}>
        <label className="i-target">To</label>
        <input
          className={s.input}
          type="text"
          placeholder="0:..."
          ref={toInput}
        />
        <label className="i-card">Value</label>
        <input
          className={s.input}
          type="text"
          placeholder="123.45"
          ref={valueInput}
        />
        <button className={s.button} onClick={send1}>transferTokensExt</button>
        <button className={s.buttonLoading}><Loader /></button>
      </form>
    </div >
  );
}

export default Wallet;
