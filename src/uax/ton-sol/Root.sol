pragma ton-solidity >= 0.36.0;
import "Console.sol";
import "EventLog.sol";
import "Medium.sol";
import "Dashboard.sol";
import "IRoot.sol";
import "OwnerWallet.sol";
import "TokenWallet.sol";

contract Root is Base, IRoot {

    modifier adm {
        if (msg.sender != _console) {
            _error(_clients[msg.sender], ROOT_ACCESS_DENIED); // 118 Unauthorized attempt to configure the contract
        }
        tvm.accept();
        _;
    }

    uint8 _ver = 3;
    uint16 _counter = _ver * 10;

    mapping (uint8 => CTImage) public _images;
    mapping (uint8 => address) public _deployed;

    struct OwnerInfo {
        uint16 clientId;
        uint16 tokenWalletId;
        address addr;
        address tokenWalletAddr;
        uint32 createdAt;
    }
    mapping (uint8 => OwnerInfo) public _owners;

    address _repo;

    constructor() public accept {
        _repo = msg.sender;
        IRepo(_repo).onDeploy{value: REIMBURSE}(ROOT_ID);
    }

    function _spawn(uint8 n) private returns (address) {
        TvmCell c = tvm.insertPubkey(_images[n].si, _counter++);
        address addr;
        uint64 val = uint64(1e9) * _images[n].initialBalance;
        if (n == 1)
            addr = new Console {stateInit:c, value:val}();
        else if (n == 2)
            addr = new EventLog {stateInit:c, value:val}();
        else if (n == 4)
            addr = new Medium {stateInit:c, value:val}();
        else if (n == 5)
            addr = new Dashboard {stateInit:c, value:val}();
        return addr;
    }

    /* Runners */
    function deploySystem() external {
        address console = _spawn(1);
        address eventLog = _spawn(2);
        address root = address(this);
        address medium = _spawn(4);
        address dashboard = _spawn(5);
        uint16 logLevel = DEFAULT_LOG_LEVEL;
        _deployed[1] = console;
        _deployed[2] = eventLog;
        _deployed[3] = root;
        _deployed[4] = medium;
        _deployed[5] = dashboard;

        _setEnv(console, eventLog, root, medium, dashboard, logLevel);
        Base(console).initMember{value: PROCESS}(CONSOLE_ID, console, eventLog, root, medium, dashboard, logLevel);
        Base(eventLog).initMember{value: PROCESS}(EVENT_LOG_ID, console, eventLog, root, medium, dashboard, logLevel);
        Base(medium).initMember{value: PROCESS}(MEDIUM_ID, console, eventLog, root, medium, dashboard, logLevel);
        Base(dashboard).initMember{value: PROCESS}(DASHBOARD_ID, console, eventLog, root, medium, dashboard, logLevel);
    }

    function deployUser() external pure {
        this.deployOwners{value: REIMBURSE}();
    }

    function onDeploy(uint16 id) external override {
        if (id == CONSOLE_ID) {
            address from = msg.sender;
            _deployed[1] = from;
        }
    }

    /* Callbacks */
    function updateImage(uint8 index, CTImage image) external accept {
        _images[index] = image;
    }

    struct WalletInfo {
        uint16 id;
        uint64 tonBalance;
        uint key;
        uint32 createdAt;
        uint32 updatedAt;
    }
    mapping (address => WalletInfo) public _roster;

    uint8 _ownerIndex = 0;
    uint16 _ownerCounter = OWNER_BASE_ID;
    uint16 _walletCounter = TOKEN_BASE_ID;

    uint64 constant DEFAULT_INITIAL_BALANCE     = 2 ton;
    uint64 constant DEFAULT_REFILL_VALUE        = 5 ton;
    uint32 constant DEFAULT_UPDATE_TIMEOUT      = 30; // seconds

    uint64 _initialBalance  = DEFAULT_INITIAL_BALANCE;
    uint64 _refillValue     = DEFAULT_REFILL_VALUE;
    uint32 _updateTimeout   = DEFAULT_UPDATE_TIMEOUT;

    uint[] _ownerKeys;

    function _logDeployEvent(uint16 id, EventState estate) private view {
        if (_logLevel & LOG_DEPLOYS > 0)
            IEventLog(_eventLog).logDeploy{value: LOG}(id, estate);
    }

    function _deployTokenWallet(uint key) private returns (uint16 id, address addr) {
        TvmCell signed = tvm.insertPubkey(_images[7].si, key);
        id = _walletCounter;
        addr = address(tvm.hash(signed));
        if (_roster.exists(addr))
            _error(_roster[addr].id, TOKEN_WALLET_EXISTS);
        else {
            uint64 val = uint64(1e9) * _images[7].initialBalance;
            addr = new TokenWallet {stateInit:signed, value:val}(id);
            _roster[addr] = WalletInfo(id, val, key, uint32(now), uint32(now));
            _logDeployEvent(id, EventState.Requested);
            _walletCounter++;
        }
    }

    function deployOwners() external override {
        for (uint key: _ownerKeys) {
            uint16 ownerId = _ownerCounter;
            TvmCell signed = tvm.insertPubkey(_images[6].si, key);
            address ownerAddr = address(tvm.hash(signed));

            if (_roster.exists(ownerAddr))
                _error(_roster[ownerAddr].id, OWNER_WALLET_EXISTS);

            uint64 val = uint64(1e9) * _images[6].initialBalance;
            ownerAddr = new OwnerWallet {stateInit:signed, value:val}(ownerId, key);
            _roster[ownerAddr] = WalletInfo(ownerId, val, key, uint32(now), uint32(now));
            (uint16 walletId, address walletAddr) = _deployTokenWallet(key);
            _owners[_ownerIndex] = OwnerInfo(ownerId, walletId, ownerAddr, walletAddr, uint32(now));
            Medium(_medium).registerOwner{value: PROCESS}(_ownerIndex, ownerId, ownerAddr, walletId, walletAddr);
            OwnerWallet(ownerAddr).updateTokenWallet{value: PROCESS}(walletId, walletAddr);
            _logDeployEvent(ownerId, EventState.Requested);

            _ownerIndex++;
            _ownerCounter++;
        }
    }

    function deployTokenWallets(uint16 n) external override adm {
        uint16 counter = _walletCounter;
        for (uint16 i = counter; i < counter + n; i++) {
            _deployTokenWallet(uint(i));
        }
    }

    function deployTokenWalletsWithKeys(uint[] keys) external override adm returns (uint16[] ids, address[] addrs) {
        for (uint key: keys) {
            (uint16 id, address addr) = _deployTokenWallet(key);
            ids.push(id);
            addrs.push(addr);
        }
    }

    function onTokenWalletDeploy(uint16 id, uint k, uint64 balance) external override {
        address from = msg.sender;
        WalletInfo wi = _roster[from];

        if (wi.id != id)
            _error(id, WALLET_ID_POST_DEPLOY_MISMATCH); // 211 Wallet ID supplied on deploy does not match the original ID
        else if (wi.key != k)
            _error(id, WALLET_KEY_POST_DEPLOY_MISMATCH); // 212 Wallet key supplied on deploy does not match the original key
        else if (wi.createdAt > uint32(now))
            _error(id, WALLET_CREATION_TIME_MISMATCH); // 213 Wallet creation time is in the future

        _logDeployEvent(id, EventState.Confirmed);

        Base(from).initMember{value: COMPUTE}(id, _console, _eventLog, _root, _medium, _dashboard, _logLevel);

        if (wi.id >= TOKEN_BASE_ID)
            IMedium(_medium).registerTokenWallet{value: COMPUTE}(id, from);

        _roster[from].tonBalance = balance;
        _roster[from].updatedAt = uint32(now);
    }

    function updateTonBalance(uint16 id, uint64 tonBalance) external override {
        address from = msg.sender;
        // identify the sender
        // log the event
        uint32 delta = uint32(now) - _roster[from].updatedAt;
        if (delta < _updateTimeout) {
            _error(id, BALANCE_UPDATE_TIMEOUT); // 402 Balance update has been requested recently
        } else {
            if (tonBalance < _warnBalance) {
                msg.sender.transfer(_refillValue, false, 1);
            }
            _roster[from].tonBalance = tonBalance;
            _roster[from].updatedAt = uint32(now);
        }
    }

    function setEnv(address console, address eventLog, address root, address medium, address dashboard, uint16 logLevel) external override accept {
        _setEnv(console, eventLog, root, medium, dashboard, logLevel);
        Base(console).updateEnv{value: COMPUTE}(console, eventLog, root, medium, dashboard, logLevel);
        Base(eventLog).updateEnv{value: COMPUTE}(console, eventLog, root, medium, dashboard, logLevel);
        Base(medium).updateEnv{value: COMPUTE}(console, eventLog, root, medium, dashboard, logLevel);
        Base(dashboard).updateEnv{value: COMPUTE}(console, eventLog, root, medium, dashboard, logLevel);
        this.updateWalletsEnv{value: REIMBURSE}();
    }

    function updateWalletsEnv() external override adm {
        for ((address addr, ): _roster) {
            Base(addr).updateEnv{value: COMPUTE}(_console, _eventLog, _root, _medium, _dashboard, _logLevel);
        }
    }

    function updateSystemEnv() external override adm {
        for ((address addr, WalletInfo wi): _roster) {
            Base(addr).updateEnv{value: COMPUTE}(_console, _eventLog, _root, _medium, _dashboard, _logLevel);
            EventLog(_eventLog).meet{value: PROCESS}(wi.id, addr);
            Medium(_medium).registerTokenWallet{value: PROCESS}(wi.id, addr);
        }
    }

    function registerOwners() external override adm {
        for ((uint8 id, OwnerInfo oi): _owners) {
            Medium(_medium).registerOwner{value: PROCESS}(id, oi.clientId, oi.addr, oi.tokenWalletId, oi.tokenWalletAddr);
            OwnerWallet(oi.addr).updateEnv{value: PROCESS}(_console, _eventLog, _root, _medium, _dashboard, _logLevel);
            TokenWallet(oi.tokenWalletAddr).updateEnv{value: PROCESS}(_console, _eventLog, _root, _medium, _dashboard, _logLevel);
        }
    }

    function updateSystemImage(CTImage console, CTImage eventLog, CTImage root, CTImage medium, CTImage dashboard) external {
        _images[1] = console;
        _images[2] = eventLog;
        _images[3] = root;
        _images[4] = medium;
        _images[5] = dashboard;
        this.deploySystem{value: REIMBURSE}();
    }

    function updateUserImage(CTImage owner, CTImage token, uint[] ownerKeys) external {
        _images[6] = owner;
        _images[7] = token;
        _ownerKeys = ownerKeys;
        this.deployOwners{value: REIMBURSE}();
    }

    function updateRefillConfig(uint64 initialBalance, uint64 warnBalance, uint64 refillValue, uint32 updateTimeout) external override {
        _initialBalance = initialBalance;
        _warnBalance = warnBalance;
        _refillValue = refillValue;
        _updateTimeout = updateTimeout;
    }
}
