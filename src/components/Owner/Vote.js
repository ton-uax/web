import s from './Vote.module.css';
import Loader from '../Loader'

import { useState } from 'react';
import { useInterval, useAsync } from 'react-use';

import { useUAXSystem } from '../../uax/hooks';


function getTimeLeftString(t) {
  if (!t)
    return ""
  const now = new Date()
  const d = (t - now) / 1000;
  let days = Math.floor(d / (60 * 60 * 24));
  let hours = Math.floor((d % (60 * 60 * 24)) / (60 * 60)).toString().padStart(2, "0")
  let minutes = Math.floor((d % (60 * 60)) / (60)).toString().padStart(2, "0")
  let seconds = Math.floor((d % (60))).toString().padStart(2, "0")
  return `${days} days ${hours}:${minutes}:${seconds}`
}


function Vote({ owner, lastProposal }) {
  const eventTypesDisplay = {
    "mint": "mint",
    "burn": "burn",
    "withdraw": "withdraw",
    "setfee": "set transfer fee",
    "claimfee": "withdraw fee"
  }

  const UAXSystem = useUAXSystem()
  const proposal = lastProposal.value

  const address = proposal.author || ""
  const addressShort = address.slice(0, 5) + ' ... ' + address.slice(-3)

  const [expireIn, setExpireIn] = useState("")
  useInterval(() => setExpireIn(getTimeLeftString(proposal.expire)), 1000)

  useAsync(async () => {
    let medium = UAXSystem.Medium
    console.log('Owner.subscribe', new Date(), owner)
    return await owner.subscribe(
      "messages",
      {
        src: { eq: medium.address }, dst: { eq: owner.address },
        OR: {
          src: { eq: owner.address }, dst: { eq: medium.address }
        }
      },
      "id,boc,src,dst",
      async msg => {
        console.log('Owner.onMessage', new Date())
        let m = await ((msg.dst == medium.address) ? medium : owner).decodeMessage(msg.boc)
        console.log(msg.id.slice(0, 5), msg.src.slice(0, 5), '->', msg.dst.slice(0, 5), m.name, m.value)
        lastProposal.retry()
      })
  }, [owner])

  const [lastSeen, setLastSeen] = useState(null)
  const [resolution, setResolution] = useState(null)
  const [disableVoting, setDisableVoting] = useState(false)

  const btnApproveClassName = (resolution === "approve") ? s.buttonvoted : s.button
  const btnRejectClassName = (resolution === "reject") ? s.buttonvoted : s.button

  async function resolve(positive) {
    setDisableVoting(true)
    let res = positive ? "approve" : "reject"
    let result = await owner.run(res, { id: proposal.id })
    setResolution(res)
  }

  return (
    <div className={s.message}>
      <span>
        <b>{addressShort}</b> proposed to <b>{eventTypesDisplay[proposal.type]}</b>
        <span className="i-uax">{proposal.value}</span>
      </span>

      <span className="i-cycle i-rotate">Expire in {expireIn}</span>
      <span className="i-eye">Signed: {proposal.hasSigs}/{proposal.reqSigs}</span>

      <div
        className={`${btnApproveClassName} ${disableVoting ? s.buttondisabled : ""}`}
        onClick={async () => await resolve(true)}>{resolution === "approve" ? <Loader width={10} color={'#000000'} /> : 'APPROVE'}</div>
      <div
        className={`${btnRejectClassName} ${disableVoting ? s.buttondisabled : ""}`}
        onClick={async () => await resolve(false)}>REJECT</div>
    </div>)
}

export default Vote;
