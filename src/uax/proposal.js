import { readGetter, readPublic } from "."

const pendingStateID = 2
const eventTypes = {
  1: "mint",
  2: "burn",
  3: "setfee",
  4: "claimfee"
}


export async function lastProposalOnApproval(owner, UAXSystem) {
  const pending = (await readGetter(owner, "eventsByState", { state: pendingStateID }))["ss"]
  if (pending.length === 0) return

  const lastPending = pending[pending.length - 1]
  // fetch proposal details
  const proposals = await readPublic(UAXSystem.Medium, "_proposals")
  const ledger = await readPublic(UAXSystem.Medium, "_ledger")

  const proposal = proposals[lastPending["id"]]
  const parsedProposal = {
    id: Number(proposal["id"]),
    type: eventTypes[proposal["eType"]],
    value: Number(proposal["value"]),

    created: new Date(proposal["createdAt"] * 1000),
    expire: new Date(proposal["validUntil"] * 1000),

    author: ledger[proposal["actor"]]["addr"],
    hasSigs: Number(proposal["signsAt"]),
    reqSigs: Number(proposal["signsReq"])
  }
  return parsedProposal
}
