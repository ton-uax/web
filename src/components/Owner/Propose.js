import s from './ProposeForms.module.css';
import Loader from '../Loader';

import { useRef } from 'react';
import { useAsyncFn } from 'react-use';


function PositiveIntValueForm({
  account, method, argName, otherArgs = {},
  inputHint = "Positive integer value",
  buttonCaption = "Send Message"
}) {
  const input = useRef()

  const [sendResult, send] = useAsyncFn(async (e) => {
    e.preventDefault()
    try {
      let value = Number(input.current.value)
      if (!Number.isInteger(value) || (value <= 0))
        return

      let tx = await account.run(method, { [argName]: value, ...otherArgs })

      input.current.value = ''
      console.log(`Proposal Sent (${account.address}) params=${JSON.stringify(otherArgs)} value=${value}`, tx)
      return tx
    }
    catch (err) {
      console.error(err)
    }
  }, [account, method, argName, otherArgs])

  const loadingBtn = <button className={s.buttonLoading}><Loader /></button>
  const proposeBtn = <button className={s.button} onClick={send}>{buttonCaption}</button>
  return <form className={s.block}>
    <input
      className={s.input}
      type="text"
      placeholder={inputHint}
      ref={input}
    />
    {sendResult.loading ? loadingBtn : proposeBtn}
  </form>
}


function Propose({ owner, wallet }) {
  const votingFormsParams = { argName: "value", method: "propose", account: owner }
  const formProps = {
    mint: {
      otherArgs: { eType: 1 },
      inputHint: "Mint to Reserve",
      buttonCaption: "Mint",
      ...votingFormsParams
    },
    burn: {
      otherArgs: { eType: 2 },
      inputHint: "Burn from Reserve",
      buttonCaption: "Burn",
      ...votingFormsParams
    },
    lock: {
      account: wallet,
      method: "donateExt",
      argName: "val",

      inputHint: "Lock to Reserve",
      buttonCaption: "Lock",
    },
    pull: {
      otherArgs: { eType: 3 },
      inputHint: "Unlock from Reserve",
      buttonCaption: "Unlock",
      ...votingFormsParams
    },
    updfee: {
      otherArgs: { eType: 4 },
      inputHint: "Update Fee",
      buttonCaption: "Update Fee",
      ...votingFormsParams
    },
    harvest: {
      otherArgs: { eType: 5 },
      inputHint: "Harvest Fee",
      buttonCaption: "Harvest Fee",
      ...votingFormsParams
    }
  }
  function proposeEventForm(eTypeStr) {
    const props = formProps[eTypeStr]
    return props && <PositiveIntValueForm {...props} />
  }

  return <>
    <h3 className="i-chem">UAX Reserve Operations</h3>
    <div>
      <div className={`flex ${s.twoforms}`}>
        {proposeEventForm("mint")} {proposeEventForm("burn")}
      </div>
      <div className={`flex ${s.twoforms}`}>
        {proposeEventForm("lock")} {proposeEventForm("pull")}
      </div>
    </div>

    <h3 className="i-fee">UAX Fee Operations</h3>
    <div className="flex">
      {proposeEventForm("updfee")} {proposeEventForm("harvest")}
    </div>
  </>;
}

export default Propose;
