import s from './Forms.module.css';
import Loader from '../Loader/Loader';
import { useRef } from 'react';
import { useAsyncFn } from 'react-use';

function ProposeEventForm({ inputHint, buttonCaption, account, eType }) {
  const input = useRef()
  const [proposeTx, propose] = useAsyncFn(async () => {
    try {
      let value = Number(input.current.value)
      if ((Number.isInteger(value)) && (value > 0)) {
        let tx = await account.run('propose', {
          eType: eType,
          value: value,
        })
        input.current.value = ''
        console.log(`Proposal Sent (${account.address}) eType=${eType} value=${value}`, tx)
        return tx
      }
    }
    catch (err) {
      console.error(err)
    }
  }, [account])

  return (
    <form className={s.block}>
      {/* <label>{inputLabel}</label> */}
      <input
        className={s.input}
        type="text"
        placeholder={inputHint}
        ref={input}
      />
      <button className={proposeTx.loading ? s.buttonLoading : s.button} onClick={propose}>
        {proposeTx.loading ? <Loader /> : buttonCaption}
      </button>
    </form>
  )
}


function SupplyManagement({ account }) {
  return (
    <div>
      <ProposeEventForm
        inputHint="Mint UAX"
        buttonCaption="Mint"
        account={account}
        eType={1}
      />
      <ProposeEventForm
        inputHint="Burn UAX"
        buttonCaption="Burn"
        account={account}
        eType={2}
      />
      <ProposeEventForm
        inputHint="Set Transfer Fee"
        buttonCaption="Set Fee"
        account={account}
        eType={3}
      />
      <ProposeEventForm
        inputHint="Withdraw Transfer Fee"
        buttonCaption="Withdraw Fee"
        account={account}
        eType={4}
      />

    </div>
  );
}

export default SupplyManagement;
