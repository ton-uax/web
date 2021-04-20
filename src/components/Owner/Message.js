import { Account } from '@tonclient/appkit';
import { useAsync, useAsyncFn, useInterval } from 'react-use';
import s from './Message.module.css';

import { addresses } from '../../uax/demo';
import { useTON } from '../../uax/hooks';

import MediumABI from '../../ton-abi/Medium.abi.json';
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
  // const left = leftSeconds
  return `${days} days ${hours}:${minutes}:${seconds}`
}

function Message({ account }) {
  const eventTypes = {
    1: "mint",
    2: "burn",
    3: "setfee",
    4: "claimfee"
  }
  const eventTypesDisplay = {
    "mint": "mint",
    "burn": "burn",
    "setfee": "set fee",
    "claimfee": "withdraw fee"
  }
  const approvalStateID = 2

  const ton = useTON()
  let [lastProposal, fetchLastProposal] = useAsyncFn(async () => {
    const events = (await account.runLocal("getEvents", {})).decoded.output["ss"]
    const pendingApproval = events.filter(e => e.state == approvalStateID)
    const latestPendingApproval = pendingApproval ? pendingApproval[pendingApproval.length - 1] : null
    if (latestPendingApproval) {
      const Medium = new Account({ abi: MediumABI }, { client: ton, address: addresses["Medium"] })
      const proposals = (await Medium.runLocal("_proposals", {})).decoded.output["_proposals"]
      const ledger = (await Medium.runLocal("_ledger", {})).decoded.output["_ledger"]
      const lastProposal = proposals[latestPendingApproval["id"]]
      return {
        id: Number(lastProposal["id"]),
        type: eventTypes[lastProposal["eType"]],
        created: new Date(lastProposal["createdAt"] * 1000),
        expire: new Date(lastProposal["validUntil"] * 1000),
        value: lastProposal["value"],
        author: ledger[lastProposal["actor"]]["addr"],
        hasSigs: lastProposal["signsAt"],
        reqSigs: lastProposal["signsReq"]
      }
    }
  }, [])
  useAsync(fetchLastProposal)
  useInterval(() => {
    account.refresh()
    fetchLastProposal()
  }, 1000)

  lastProposal = lastProposal.value

  const [voteInProcess, setVoteInProcess] = useState(false)

  async function vote(proposal, isApprove) {
    setVoteInProcess(true)
    await account.run(isApprove ? "approve" : "reject", { eventID: proposal.id })
  }

  return <>{
    lastProposal
      ?
      <div className={s.message}>
        <span className="i-alert">
          <b>{eventTypesDisplay[lastProposal.type]}</b> request from <b>{shortAddress(lastProposal.author)}</b>
        </span>
        <span className="i-uax">{lastProposal.value}</span>
        <span className="i-cycle">Expires in {getTimeLeftString(lastProposal.expire)}</span>
        <span className="i-eye">Signed: {lastProposal.hasSigs}/{lastProposal.reqSigs}</span>
        {!voteInProcess && <>
          <div className={s.button} onClick={() => vote(lastProposal, true)}>APPROVE</div>
          <div className={s.button} onClick={() => vote(lastProposal, false)}>REJECT</div>
        </>}
      </div>
      : ""
  }</>
}

export default Message;
