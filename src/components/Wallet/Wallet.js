import s from './Wallet.module.css';
import React, { useRef, useState } from 'react';
import {
  useInterval,
  useAsyncFn,
  useAsyncRetry,
  useCopyToClipboard,
  useUpdate,
} from 'react-use';
import { useConsole, useTONAccount, useTON } from '../../uax/hooks';
import Loader from '../Loader/Loader';
import uax from '../../uax/demo';

function Wallet({ address }) {
  const addressShort = !address
    ? '0:'
    : address.slice(0, 7) + '...' + address.slice(-4);
  const [, copyToClipboard] = useCopyToClipboard();
  const [w] = useTONAccount(address);
  // const updateBalance = useUpdate()
  // const balanceState = useAsync(async () => {
  //   const uax = (await w.runLocal("_balance")).decoded.output._balance
  //   const ton = (Number(await w.getBalance()) / 10 ** 9).toString().slice(0, 4)
  //   console.log('updated', address, { uax, ton })
  //   return { uax, ton }
  // }, [])
  // const balance = balanceState.value || { uax: "0", ton: "0" }
  const [uaxBalance, setUAXBalance] = useState('0');
  const [tonBalance, setTONBalance] = useState('0');
  const ton = useTON();
  useInterval(() => {
    uax.getUAXBalance(ton, address).then(setUAXBalance);
    uax.getTONBalance(ton, address).then(setTONBalance);
  }, 1000);
  // function onMessage(msg) {
  //   console.log('onMessage', msg)
  //   updateBalance()
  // }
  // w.subscribeMessages("id,boc,code,data,created_at_string,msg_type,msg_type_name,status,status_name", onMessage)

  const toInput = useRef();
  const valueInput = useRef();

  async function send1(event) {
    console.log('send');
    console.log(
      await w.run('transferTokensExt', {
        to: toInput.current.value,
        val: Number(valueInput.current.value),
      }),
    );
    console.log('send end');
  }

  const Console = useConsole();
  async function proposeMint(event) {
    console.log('propose', address);
    console.log(
      await Console.run('propose', {
        addr: address,
        eType: 1,
        value: 15,
      }),
    );
    console.log('propose end');
  }

  async function approveMint(event) {
    console.log('approve');
    console.log(
      await Console.run('approve', {
        addr: address,
        eventID: 7,
      }),
    );
    console.log('propose end');
  }

  return (
    /*
    <div>
          <div className={s.balanceContainer}>
            <div className={s.balance}>
              <div className={s.info}>BALANCE</div>
              <p className={`${s.value} i-uax`}>{uaxBalance} uax</p>
              <p className={`${s.value} i-gas`}>{tonBalance} ton</p>
            </div>
            <a className={`${s.yadd} i-copy`}>0:db750...a148</a>
          </div>

          <form className={s.block}>
            <h3 className="i-card2">Send</h3>
            <label>To</label>
            <input className={s.input} type="text" placeholder="0:..." />
            <label>Value</label>
            <input className={s.input} type="text" placeholder="123.45" />
            <button className={s.buttonLoading}>
              <Loader />
            </button>
          </form>
        </div>
    */
    <div className={s.wallet}>
      
      <div className={s.balanceContainer}>
        <div className={s.balance}>
          <div className={s.info}>BALANCE</div>
          <p className={`${s.value} i-uax`}>{uaxBalance} uax</p>
          <p className={`${s.value} i-gas`}>{tonBalance} ton</p>
        </div>
        <a
          className={`${s.yadd} i-copy`}
          onClick={() => copyToClipboard(address)}
        >
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
          placeholder="UAX to send"
          ref={valueInput}
        />
        <button className={s.buttonLoading}>
          <Loader />
        </button>
      </form>
    </div>
  );
}

export default Wallet;
