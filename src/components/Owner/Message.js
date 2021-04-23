import s from './Message.module.css';
import { useInterval } from 'react-use';
import { useState } from 'react';


function getTimeLeftString(t) {
  const now = new Date()
  const d = (t - now) / 1000;
  let days = Math.floor(d / (60 * 60 * 24));
  let hours = Math.floor((d % (60 * 60 * 24)) / (60 * 60)).toString().padStart(2, "0")
  let minutes = Math.floor((d % (60 * 60)) / (60)).toString().padStart(2, "0")
  let seconds = Math.floor((d % (60))).toString().padStart(2, "0")
  return `${days} days ${hours}:${minutes}:${seconds}`
}

function Message({ account, proposal, updateProposal }) {
  const address = proposal?.author || ""
  const addressShort = address.slice(0, 5) + ' ... ' + address.slice(-3)
  const eventTypesDisplay = {
    "mint": "mint",
    "burn": "burn",
    "setfee": "set transfer fee",
    "claimfee": "withdraw fee"
  }

  useInterval(() => {
    account.refresh()
    updateProposal()
  }, 1000)

  const [resolution, setResolution] = useState(null)
  const [last, setLast] = useState(null)

  if (last && proposal && last !== proposal.id) {
    setResolution(null)
  }
  const btnClassName = (resolution === null) ? s.button : s.buttonvoted

  async function resolve(positive) {
    let res = positive ? "approve" : "reject"
    setResolution(res)
    let result = await account.run(res, { eventID: proposal.id })
    console.log(result)
    setLast(proposal.id)
  }
  return !proposal || (proposal.author === account.address) ? <></> : (
    <div className={s.message}>
      <span className="i-alert">
        <b>{addressShort}</b> proposed to <b>{eventTypesDisplay[proposal.type]}</b>
      </span>
      <span className="i-uax">{proposal.value}</span>
      <span className="i-cycle">Expire in {getTimeLeftString(proposal.expire)}</span>
      <span className="i-eye">Signed: {proposal.hasSigs}/{proposal.reqSigs}</span>

      {(resolution !== "reject") && <div
        className={btnClassName}
        onClick={async () => await resolve(true)}>APPROVE</div>}
      {(resolution !== "approve") && <div
        className={btnClassName}
        onClick={async () => await resolve(false)}>REJECT</div>}
    </div>)
}

export default Message;
