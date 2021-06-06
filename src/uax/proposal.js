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
  console.log('---')
  medium.refresh()
  const current = await readPublic(medium, "_currentEvent")
  if (current.state != pendingStateID)
    return

  const proposals = await readPublic(medium, "_proposals")

  const proposal = proposals[current.id]
  console.log('raw proposal', proposal)
  let owners = [0, 1, 2]
  let ownersVoted = []
  for (let idx of owners) {
    let mask = 1 << idx
    let voted = proposal.signsMask & mask
    if (voted)
      ownersVoted.push(idx + 1)
  }
  const parsedProposal = {
    id: Number(proposal.id),
    type: eventTypes[proposal.eType],
    value: Number(proposal.value),

    created: new Date(proposal.createdAt * 1000),
    expire: new Date(proposal.expireAt * 1000),

    author: proposal.actor - 10000 + 1,

    ownersVoted: ownersVoted,
    hasSigs: Number(proposal.signsAt),
    reqSigs: Number(proposal.signsReq)
  }
  console.log('parsed proposal', parsedProposal)
  return parsedProposal
}
