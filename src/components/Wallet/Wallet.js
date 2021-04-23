import s from './Wallet.module.css';
import Loader from '../Loader/Loader';
import { useRef, useState } from 'react';
import {
  useAsync,
  useAsyncFn,
  useCopyToClipboard,
} from 'react-use';

import uax from '../../uax';


function Wallet({ label, account }) {
  const toInput = useRef();
  const valueInput = useRef();
  const address = account.address
  const addressShort = address.slice(0, 5) + ' ... ' + address.slice(-3)

  const [uaxBalance, setUAXBalance] = useState('')
  const [tonBalance, setTONBalance] = useState('')
  const [, copyToClipboard] = useCopyToClipboard()

  useAsync(async () => {
    console.log('Wallet.subscribe', Date.now())
    uax.getUAXBalance(account).then(setUAXBalance);
    uax.getTONBalance(account).then(setTONBalance);
    return await account.subscribeMessages("id", msg => {
      console.log('Wallet.onMessage', Date.now(), address, msg)
      uax.getUAXBalance(account).then(setUAXBalance);
      uax.getTONBalance(account).then(setTONBalance);
      return true
    })
  }, [account])

  const [sendTx, send] = useAsyncFn(async () => {
    try {
      let to = toInput.current.value
      let val = Number(valueInput.current.value)
      if (!to.match(/^0:[a-fA-F0-9]{64}$/) || !Number.isInteger(val) || !(val > 0))
        return
      let tx = await account.run('transferTokensExt', {
        to: to,
        val: val,
      })
      console.log(`Transaction Sent (${account.address}) to=${to} val=${val}`, tx)
      toInput.current.value = ''
      valueInput.current.value = ''
      return tx
    }
    catch (err) {
      console.error(err)
    }
  }, [account, toInput, valueInput])

  return (
    <div className={s.wallet}>
      <div className={s.balanceContainer}>
        <p
          className={`${s.yadd} i-copy`}
          onClick={() => copyToClipboard(address)}>
          {addressShort}
        </p>
        <div className={s.balance}>
          <div className={s.info}>{label}</div>
          <p className={`${s.value} i-uax`}>{uaxBalance} uax</p>
          <p className={`${s.value} i-gas`}>{tonBalance} ton</p>
        </div>

      </div>
      <form className={s.block}>
        <label className="i-target">To</label>
        <input
          className={s.input}
          type="text"
          placeholder="0:..."
          ref={toInput}
        />
        <label className="i-card">Amount</label>
        <input
          className={s.input}
          type="text"
          placeholder="123"
          ref={valueInput}
        />
        <button className={sendTx.loading ? s.buttonLoading : s.button} onClick={send}>
          {sendTx.loading ? <Loader /> : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Wallet;
