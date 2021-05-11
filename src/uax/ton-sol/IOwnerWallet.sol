pragma ton-solidity >= 0.36.0;
import "IList.sol";

interface IOwnerWallet {
    /* Owners' callbacks - news from the field */
    function updateEventState(uint32 id, EventState state) external;

    function approve(uint32 id) external;
    function reject(uint32 id) external;
    function propose(EventType eType, uint32 value) external;
}
