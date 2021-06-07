import { useEffect, useState } from 'react';

import s from './Vote.module.css';
import Loader from '../Loader'

function getTimeLeftString(t) {
  if (!t)
    return ""
  const now = new Date()
  const d = (t - now) / 1000;
  if (d < 0) return ''
  let days = Math.floor(d / (60 * 60 * 24));
  let hours = Math.floor((d % (60 * 60 * 24)) / (60 * 60)).toString().padStart(2, "0")
  let minutes = Math.floor((d % (60 * 60)) / (60)).toString().padStart(2, "0")
  let seconds = Math.floor((d % (60))).toString().padStart(2, "0")

  return `${days} days ${hours}:${minutes}:${seconds}`
}


function Vote({ owner, proposal, refresh, ownerAlreadyVoted }) {
  const [timeLeft, setTimeLeft] = useState(proposal.expire)
  const [time, setTime] = useState(getTimeLeftString(timeLeft))
  const [resolution, setResolution] = useState(null)
  const [disableVoting, setDisableVoting] = useState(ownerAlreadyVoted)

  const eventTypesDisplay = {
    "mint": "mint",
    "burn": "burn",
    "withdraw": "withdraw",
    "setfee": "set transfer fee",
    "claimfee": "withdraw fee"
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeftString(timeLeft))
      setTimeLeft(timeLeft - 1000)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) return null

  const authorAlias = `Owner ${proposal.author}`

  // const expireIn = getTimeLeftString(proposal.expire)
  // useInterval(() => refresh, 1000)

  const btnApproveClassName = (resolution === "approve") ? s.buttonvoted : s.button
  const btnRejectClassName = (resolution === "reject") ? s.buttonvoted : s.button

  async function resolve(positive) {
    setDisableVoting(true)
    let res = positive ? "approve" : "reject"
    setResolution(res)
    await owner.run(res, { id: proposal.id })
  }

  return (
    <div className={s.message}>
      <span>
        <b>{authorAlias}</b> proposed to <b>{eventTypesDisplay[proposal.type]}</b>
        <span className="i-uax">{proposal.value}</span>
      </span>

      <span className="i-cycle i-rotate">Expire in {time}</span>
      <span className="i-eye">Signed: {proposal.hasSigs}/{proposal.reqSigs}</span>

      <div
        className={`${btnApproveClassName} ${disableVoting ? s.buttondisabled : ""}`}
        onClick={() => resolve(true)}>{resolution === "approve" ? <Loader width={10} /> : 'APPROVE'}</div>
      <div
        className={`${btnRejectClassName} ${disableVoting ? s.buttondisabled : ""}`}
        onClick={() => resolve(false)}>{resolution === "reject" ? <Loader width={10} /> : 'REJECT'}</div>
    </div>)
}

export default Vote;
