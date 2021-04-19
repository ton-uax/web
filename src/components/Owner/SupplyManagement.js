import s from './Forms.module.css';
import Loader from '../Loader/Loader';
import { useRef, useState } from 'react';

function ProposeEventForm({ inputHint, buttonCaption, account, eType }) {
  const input = useRef()
  const [loading, setLoading] = useState(false)

  async function propose(event) {
    if (loading)
      return
    let value = Number(input.current.value)
    if ((!Number.isInteger(value)) || !(value > 0))
      return

    try {
      setLoading(true)
      let r = await account.run('propose', {
        eType: eType,
        value: value,
      })
      console.log(r)
      input.current.value = ''
    }
    catch (e) {
      console.error(e)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <form className={s.block}>
      {/* <label>{inputLabel}</label> */}
      <input
        className={s.input}
        type="text"
        placeholder={inputHint}
        ref={input}
      />
      <button className={loading ? s.buttonLoading : s.button} onClick={propose}>
        {loading ? <Loader /> : buttonCaption}
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
