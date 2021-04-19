import s from './Forms.module.css';
import Loader from '../Loader/Loader';
import { useRef, useState } from 'react';

function ProposeEventForm({inputLabel, buttonCaption, account, eType}) {
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
      <label>{inputLabel}</label>
        <input
          className={s.input}
          type="text"
          placeholder="123"
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
        inputLabel="Mint"
        buttonCaption="Propose Mint" 
        account={account}
        eType={1}
      />
      <ProposeEventForm 
        inputLabel="Burn"
        buttonCaption="Propose Burn" 
        account={account}
        eType={2}
      />
      <ProposeEventForm 
        inputLabel="Claim Fee"
        buttonCaption="Propose Claim Fee" 
        account={account}
        eType={4}
      />
      
    </div>
  );
}

export default SupplyManagement;
