import { Account } from '@tonclient/core';
import TokenWalletABI from '../abi/TokenWallet.abi.json'

const TokenWallet = {
    abi: TokenWalletABI
}

const makeWalletWrapper = (client, address) => new Account(TokenWallet, { address, client });

const getBalance = async (client, address) => {
    const wallet = makeWalletWrapper(client, address);

    const balanceResponse = await wallet.runLocal('_balance');
    const balanceUAX = balanceResponse.decoded.output._balance;

    const balanceCrystalHex = (await client.net.query_collection({
        collection: 'accounts',
        filter: {
            id: { eq: address },
        },
        result: 'balance',
    })).result[0].balance;
    const balanceCrystal = parseInt(balanceCrystalHex, 16) / 10 ** 9;

    return { uax: balanceUAX, gas: balanceCrystal.toString() }
}

const uax = { getBalance, makeWalletWrapper };

export default uax;