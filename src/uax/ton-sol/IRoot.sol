pragma ton-solidity >= 0.36.0;
import "IList.sol";
import "IRepo.sol";

interface IRoot {
    function onDeploy(uint16 id) external;

    function deployTokenWallets(uint16 k) external;
    function deployTokenWalletsWithKeys(uint[] keys) external returns (uint16[] ids, address[] addrs);
    function deployOwners() external;

    function onTokenWalletDeploy(uint16 id, uint k, uint64 val) external;

    function updateRefillConfig(uint64 initialBalance, uint64 warnBalance, uint64 refillValue, uint32 updateTimeout) external;
    function setEnv(address console, address eventLog, address root, address medium, address dashboard, uint16 logLevel) external;
    function updateWalletsEnv() external;
    function updateSystemEnv() external;
    function registerOwners() external;
    function updateTonBalance(uint16 id, uint64 tonBalance) external;
}
