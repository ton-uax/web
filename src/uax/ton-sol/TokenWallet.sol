pragma ton-solidity >= 0.36.0;
import "ITokenWallet.sol";
import "IRoot.sol";
import "IMedium.sol";
import "Base.sol";

contract TokenWallet is Base, ITokenWallet {

    uint32 _balance = 0; // UAX
    uint32 _accountsPayable;
    uint32 _accountsReceivable;
    uint32 _actualBalance;

    modifier some(uint32 val) {
        if (_clients[msg.sender] == 0) {
            _error(_clients[msg.sender], UNAUTHORIZED_CONTRACT_ACCESS); // 122 Unauthorized attempt to access the contract
            require(msg.pubkey() == tvm.pubkey(), REQUIRES_OWNER_SIGNATURE); // 119 Requires owner's signature to operate
        }
        if (val <= _balance + _transferFee)
            _error(_clients[msg.sender], INSUFFICIENT_BALANCE); // 215 Not enough funds to perform transfer

        tvm.accept();
        _;
    }

    modifier signedSolvent(uint32 val) {
        require(msg.pubkey() == tvm.pubkey(), REQUIRES_OWNER_SIGNATURE); // 119 Requires owner's signature to operate
        require(val <= _balance + _transferFee, INSUFFICIENT_BALANCE); // 215 Not enough funds to perform transfer
        tvm.accept();
        _;
    }

    modifier trade {
        if (msg.sender != _medium) {
            _error(_clients[msg.sender], ILLEGAL_TRANSFER_ATTEMPT); // 205 Not authorized to initiate transfers
        }
        _;
    }

    function _logError(uint16 errorCode) private view {
        if (_logLevel & LOG_ERRORS > 0)
            IEventLog(_eventLog).logError{value: LOG}(_clients[msg.sender], errorCode);
    }

    constructor(uint16 id) public accept {
        _initialize(id);
    }

    function _initialize(uint16 id) private {
        _id = id;
        address root = msg.sender;
        _root = root;
        _clients[root] = ROOT_ID;
        IRoot(root).onTokenWalletDeploy{value: PROCESS}(id, tvm.pubkey(), uint64(address(this).balance));
    }

    function adopt(uint16 id) external {
        _initialize(id);
    }

    function collect(uint32 val) external override trade {
        _accountsPayable -= val;
        _actualBalance -= val;
    }

    function incur(uint32 val) external override {
        _accountsReceivable += val;
        _balance += val;
    }

    function abort(uint32 val) external override trade {
        _accountsPayable -= val;
        _balance += val;
    }

    function withdraw(uint32 val) external override trade {
        _accountsReceivable -= val;
        _balance -= val;
    }

    function pay(uint32 val) external override trade {
        _accountsReceivable -= val;
        _actualBalance += val;
    }

    function debit(uint32 val) external override trade {
        if (val > _actualBalance) {
            _error(_id, WALLET_BALANCE_OVERRUN); //216 Not enough funds to complete transfer
            _actualBalance = 0;
        } else {
            _actualBalance -= val;
            _balance -= val;
        }
    }

    function credit(uint32 val) external override trade {
        _actualBalance += val;
        _balance += val;
    }

    function _transferTokens(address to, uint32 val) private view {
        IMedium(_medium).requestTransfer{value: PROCESS}(to, val);
        _checkTonBalance();
    }

    function _accrueExpenses(uint32 val) private {
        uint32 total = val + _transferFee;
        _accountsPayable += total;
        _balance -= total;
        _checkTonBalance();
    }

    function transferTokens(address to, uint32 val) external view override some(val) {
        _transferTokens(to, val);
    }

    function transferTokensExt(address to, uint32 val) external view signedSolvent(val) {
        _transferTokens(to, val);
    }

    function _instantTransfer(address to, uint32 val) private {
        _accrueExpenses(val);
        ITokenWallet(to).incur{value: PROCESS}(val);
        IMedium(_medium).processTransfer{value: PROCESS}(to, val);
    }

    function instantTransfer(address to, uint32 val) external override some(val) {
        _instantTransfer(to, val);
    }

    function instantTransferExt(address to, uint32 val) external signedSolvent(val) {
        _instantTransfer(to, val);
    }

    function _donate(uint32 val) private view {
        IMedium(_medium).accrue{value: PROCESS}(val);
    }

    function donate(uint32 val) external view override some(val) {
        _donate(val);
    }

    function donateExt(uint32 val) external view signedSolvent(val) {
        _donate(val);
    }

    function getFinances() external view returns (uint32 id, uint32 balance, uint32 accountsPayable, uint32 accountsReceivable, uint32 actualBalance) {
        id = _id;
        balance = _balance;
        accountsPayable = _accountsPayable;
        accountsReceivable = _accountsReceivable;
        actualBalance = _actualBalance;
    }
}
