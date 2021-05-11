pragma ton-solidity >= 0.36.0;

/* System-wide enums */
enum EventType { Undefined, Mint, Burn, Withdraw, SetTransferFee, ClaimTransferFee, Reserved, Last }
enum EventState { Undefined, Requested, OnApproval, Approved, Confirmed, Committed, Done, Failed, Expired, Rejected, Last }

struct Event {
    uint32 id;
    EventType eType;
    EventState state;
    uint32 createdAt;
}
