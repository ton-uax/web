import s from './Message.module.css';
import { useInterval } from 'react-use';
import { useState } from 'react';


function shortAddress(address) {
  return !address
    ? '-'
    : address.slice(0, 10) + '...' + address.slice(-10)
}

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
  // console.log("PROPOSAL", proposal)
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

  const [showVotingBtns, setShowVotingBtns] = useState(proposal.hasSigs !== proposal.reqSigs)
  const [resolution, setResolution] = useState(null)

  const approveBtnClassName = (resolution === "approve") ? s.buttonvoted : s.button
  const rejectBtnClassName = (resolution === "reject") ? s.buttonvoted : s.button

  return (
    <div className={s.message}>
      <span className="i-alert">
        <b>{shortAddress(proposal.author)}</b> proposed to <b>{eventTypesDisplay[proposal.type]}</b>
      </span>
      <span className="i-uax">{proposal.value}</span>
      <span className="i-cycle">Expire in {getTimeLeftString(proposal.expire)}</span>
      <span className="i-eye">Signed: {proposal.hasSigs}/{proposal.reqSigs}</span>
      {
        showVotingBtns &&
        <>
          <div
            className={approveBtnClassName}
            onClick={resolution ? null : async () => {
              setResolution("approve")
              await account.run("approve", { eventID: proposal.id })
            }}>
            APPROVE
          </div>
          <div
            className={rejectBtnClassName}
            onClick={resolution ? null : async () => {
              setResolution("reject")
              await account.run("reject", { eventID: proposal.id })
            }}>
            REJECT
          </div>
        </>
      }
    </div>)
}

export default Message;
