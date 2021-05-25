import { readPublic } from "."

const pendingStateID = 2
const eventTypes = {
  1: "mint",
  2: "burn",
  3: "withdraw",
  4: "setfee",
  5: "claimfee"
}


export async function lastProposalOnApproval(medium) {
  // console.log('update last proposal')
  medium.refresh()
  const current = await readPublic(medium, "_currentEvent")
  console.log(current)
  if (current.state != pendingStateID)
    return

  const proposals = await readPublic(medium, "_proposals")
  // let authorInfo = await readGetter(authorContract, "getInfo")
  // const authorAlias = `Owner ${authorInfo.id}`
  const proposal = proposals[current.id]
  console.log(proposal)
  const parsedProposal = {
    id: Number(proposal.id),
    type: eventTypes[proposal.eType],
    value: Number(proposal.value),

    created: new Date(proposal.createdAt * 1000),
    expire: new Date(proposal.validUntil * 1000),

    author: proposal.actor,
    hasSigs: Number(proposal.signsAt),
    reqSigs: Number(proposal.signsReq)
  }
  return parsedProposal
}
