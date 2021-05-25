import s from './Wallet.module.css';
import Loader from '../Loader/Loader';
import { useRef, useState } from 'react';
import {
  useAsync,
  useAsyncFn,
  useCopyToClipboard,
} from 'react-use';

import uax from '../../uax';


function WalletAddress({ address, children }) {
  const [, copyToClipboard] = useCopyToClipboard()
  return <div className={`${s.yadd} i-copy`} onClick={() => copyToClipboard(address)}>{children}</div>
}


function Wallet({ label, account }) {
  const [uaxBalance, setUAXBalance] = useState('')
  const [tonBalance, setTONBalance] = useState('')


  useAsync(async () => {
    // console.log('Wallet.subscribe', Date.now())
    uax.getUAXBalance(account).then(setUAXBalance);
    uax.getTONBalance(account).then(setTONBalance);
    return await account.subscribeMessages("id,boc", msg => {
      account.refresh()
      console.log('Wallet.onMessage', Date.now(), address, msg)
      uax.getUAXBalance(account).then(setUAXBalance);
      uax.getTONBalance(account).then(setTONBalance);
    })
  }, [account])

  const toInput = useRef();
  const valueInput = useRef();
  const [sendResult, send] = useAsyncFn(async (e) => {
    e.preventDefault()
    try {
      let to = toInput.current.value
      let val = Number(valueInput.current.value)
      if (!to.match(/^0:[a-fA-F0-9]{64}$/) || !Number.isInteger(val) || !(val > 0))
        return

      let tx = await account.run('transferTokensExt', { to: to, val: val })

      console.log(`Transaction Sent (${account.address}) to=${to} val=${val}`, tx)
      toInput.current.value = ''
      valueInput.current.value = ''
      return tx
    }
    catch (err) {
      console.error(err)
    }
  }, [account])

  const address = account.address
  const addressShort = address.slice(0, 11) + ' ... ' + address.slice(-9)

  const loadingBtn = <button className={s.buttonLoading}><Loader /></button>
  const sendBtn = <button className={s.button} onClick={send}>Send</button>

  return <>
    <h3 className="i-card">Wallet</h3>
    <div className={s.spacer}></div>
    <div className={s.wallet}>
      <p className={s.info}>{label}</p>
      <div className={s.value}>
        <p className={`i-uax`}>{uaxBalance}</p>
        <p className={`i-gas`}>{tonBalance}</p>
      </div>
    </div>
    <WalletAddress address={address}>{addressShort}</WalletAddress>
    <h3 className="i-path">Transfer</h3>
    <form className={s.block}>
      {/* <label className="i-target">To</label> */}
      <input
        className={s.input}
        type="text"
        placeholder="Address (0:...)"
        ref={toInput}
      />
      {/* <label className="i-card">Amount</label> */}
      <input
        className={s.input}
        type="text"
        placeholder="Amount"
        ref={valueInput}
      />
      {sendResult.loading ? loadingBtn : sendBtn}
    </form>
  </>
}

export default Wallet;
