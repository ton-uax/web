import s from './Wallet.module.css';
import Loader from '../Loader/Loader';
import { useRef, useState } from 'react';
import {
  useAsync,
  useCopyToClipboard,
} from 'react-use';

import { useTON } from '../../uax/hooks';
import uax from '../../uax/demo';


function Wallet({ label, account }) {
  const toInput = useRef();
  const valueInput = useRef();
  const address = account.address
  const addressShort = !address
    ? '-'
    : address.slice(0, 10) + '...' + address.slice(-10)

  const [uaxBalance, setUAXBalance] = useState('')
  const [tonBalance, setTONBalance] = useState('')
  const [loading, setLoading] = useState(false)

  const [, copyToClipboard] = useCopyToClipboard()

  const ton = useTON()
  useAsync(async () => {
    console.log('Wallet.subscribe', Date.now())
    uax.getUAXBalance(ton, address).then(setUAXBalance);
    uax.getTONBalance(ton, address).then(setTONBalance);
    return await account.subscribeMessages("id", msg => {
      console.log('Wallet.onMessage', Date.now(), address, msg)
      uax.getUAXBalance(ton, address).then(setUAXBalance);
      uax.getTONBalance(ton, address).then(setTONBalance);
    })
  }, [account])

  async function transfer(event) {
    if (loading)
      return
    let to = toInput.current.value
    let val = Number(valueInput.current.value)
    if (!to.match(/^0:[a-fA-F0-9]{64}$/) || !Number.isInteger(val) || !(val > 0))
      return

    try {
      setLoading(true)
      let r = await account.run('transferTokensExt', {
        to: to,
        val: val,
      })
      console.log(r)
      toInput.current.value = ''
      valueInput.current.value = ''
    }
    catch (e) {
      console.error(e)
    }
    finally {
      setLoading(false)
    }


  }

  return (
    <div className={s.wallet}>
      <div className={s.balanceContainer}>
        <div className={s.balance}>
          <div className={s.info}>{label}</div>
          <p className={`${s.value} i-uax`}>{uaxBalance} uax</p>
          <p className={`${s.value} i-gas`}>{tonBalance} ton</p>
        </div>
        <a
          className={`${s.yadd} i-copy`}
          onClick={() => copyToClipboard(address)}>
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
        <label className="i-card">Amount</label>
        <input
          className={s.input}
          type="text"
          placeholder="123"
          ref={valueInput}
        />
        <button className={loading ? s.buttonLoading : s.button} onClick={transfer}>
          {loading ? <Loader /> : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Wallet;
