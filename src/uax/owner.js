import { system } from "./demo"
import MediumABI from '../ton-abi/Medium.abi.json';
import { Account } from "@tonclient/appkit";

const eventTypes = {
  1: "mint",
  2: "burn",
  3: "setfee",
  4: "claimfee"
}

const pendingStateID = 2

export async function fetchLastProposal(ownerAccount) {
  let owner = ownerAccount.value
  if (!owner)
    return
  const ton = owner.client
  const events = (await owner.runLocal("getEvents", {})).decoded.output["ss"]
  const pending = events.filter(e => e.state == pendingStateID)
  const lastPending = pending ? pending[pending.length - 1] : null

  if (!lastPending)
    return

  // fetch proposal details
  const Medium = new Account({ abi: MediumABI }, { client: ton, address: system["Medium"] })

  const proposals = (await Medium.runLocal("_proposals", {})).decoded.output["_proposals"]
  const actors = (await Medium.runLocal("_ledger", {})).decoded.output["_ledger"]

  const lastProposal = proposals[lastPending["id"]]
  return {
    id: Number(lastProposal["id"]),
    type: eventTypes[lastProposal["eType"]],
    value: Number(lastProposal["value"]),

    created: new Date(lastProposal["createdAt"] * 1000),
    expire: new Date(lastProposal["validUntil"] * 1000),

    author: actors[lastProposal["actor"]]["addr"],
    hasSigs: Number(lastProposal["signsAt"]),
    reqSigs: Number(lastProposal["signsReq"])
  }
}
