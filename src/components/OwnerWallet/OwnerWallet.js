import s from './OwnerWallet.module.css';
import Loader from '../Loader/Loader';

function OwnerWallet({ uaxBalance, tonBalance }) {
  return (
    <div className={s.wallet}>
      <h2 className="i-card">Owner Wallet</h2>
      <div className={s.options}>
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

        <form className={s.block}>
          <h3 className="i-star">Mint</h3>
          <label>Value</label>
          <input className={s.input} type="text" placeholder="353" />
          <button className={s.button}>
            Mint
            {/* <Loader /> */}
          </button>
        </form>
        <form className={s.block}>
          <h3 className="i-unview">Burn</h3>
          <label>Value</label>
          <input className={s.input} type="text" placeholder="353" />
          <button className={s.button}>
            Burn
            {/* <Loader /> */}
          </button>
        </form>
        <form className={s.block}>
          <h3 className="i-bal">Claim Fee</h3>
          <label>Value</label>
          <input className={s.input} type="text" placeholder="353" />
          <button className={s.button}>
            Claim Fee
            {/* <Loader /> */}
          </button>
        </form>
        <form className={s.block}>
          <h3 className="i-proc">Config</h3>
          <label>InitialUAX</label>
          <input
            className={s.input}
            type="text"
            placeholder="353"
            defaultValue="50"
          />{' '}
          <label>InitialTON</label>
          <input
            className={s.input}
            type="text"
            placeholder="353"
            defaultValue="2"
          />{' '}
          <label>ThresholdTON</label>
          <input
            className={s.input}
            type="text"
            placeholder="353"
            defaultValue="1.5"
          />{' '}
          <label>TransferFeeUAX</label>
          <input
            className={s.input}
            type="text"
            placeholder="353"
            defaultValue="1"
          />
          <button className={s.button}>
            Save
            {/* <Loader /> */}
          </button>
        </form>
        {/*changeConfig
      (select (configName), configValue) */}
      </div>
    </div>
  );
}

export default OwnerWallet;
