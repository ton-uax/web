pragma ton-solidity >= 0.36.0;
import "Base.sol";
import "IOwnerWallet.sol";
import "IMedium.sol";

contract OwnerWallet is Base, IOwnerWallet {

    modifier some {
        if (_clients[msg.sender] == 0) {
            _error(_clients[msg.sender], UNAUTHORIZED_CONTRACT_ACCESS); // 122 Unauthorized attempt to access the contract
            require(msg.pubkey() == tvm.pubkey(), REQUIRES_OWNER_SIGNATURE);  // 119 Requires owner's signature to operate
        }
        tvm.accept();
        _;
    }

    mapping (uint32 => EventState) public _events;
    uint _key;
    uint16 _tokenWalletId;
    address _tokenWalletAddress;

    constructor(uint16 id, uint key) public accept {
        _initialize(id, key);
    }

    function _initialize(uint16 id, uint key) private {
        _id = id;
        _key = key;
        address root = msg.sender;
        _root = root;
        _clients[root] = ROOT_ID;
        IRoot(root).onTokenWalletDeploy{value: PROCESS}(id, tvm.pubkey(), uint64(address(this).balance));
    }

    function adopt(uint16 id, uint key) external {
        _initialize(id, key);
    }

    /* Collective Decision making */

    function approve(uint32 id) external override some {
        IMedium(_medium).approve{value: PROCESS}(id);
    }

    function reject(uint32 id) external override some {
        IMedium(_medium).reject{value: PROCESS}(id);
    }

    function propose(EventType eType, uint32 value) external override some {
        IMedium(_medium).propose{value: PROCESS}(eType, value);
    }

    function updateEventState(uint32 id, EventState state) external override {
        if (msg.sender == _medium)
            _events[id] = state;
    }

    function updateTokenWallet(uint16 id, address addr) external {
        if (msg.sender == _root) {
            _tokenWalletId = id;
            _tokenWalletAddress = addr;
        }
    }

    function getInfo() external view returns (uint16 id, uint key, uint16 tokenWalletId, address tokenWalletAddress) {
        id = _id;
        key = _key;
        tokenWalletId = _tokenWalletId;
        tokenWalletAddress = _tokenWalletAddress;
    }
}
