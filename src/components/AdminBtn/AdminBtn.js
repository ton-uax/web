import s from './AdminBtn.module.css';
import TokenWalletABI from '../../abi/TokenWallet.abi.json';
import { Account } from '@tonclient/core';

const addr = '0:911d8d474b584cb4a3eb21a02c70cd2172054e2455d2472a7151b7986ffbe0d6';
const TokenWallet = {
  abi: TokenWalletABI
}

function Btn({ title, client, setBalance }) {

  async function updateWallet() {
    const wallet = new Account(TokenWallet, { address: addr, client });
    const balanceResponse = await wallet.runLocal('_balance');
    const balance = balanceResponse.decoded.output._balance;
    const balanceCrystalHex = (await client.net.query_collection({
      collection: 'accounts',
      filter: {
        id: { eq: addr },
      },
      result: 'balance',
    })).result[0].balance;

    const balanceCrystal = parseInt(balanceCrystalHex, 16) / 10 ** 9;

    console.log(balance);
    console.log(balanceCrystal);
    setBalance({ uax: balance, gas: balanceCrystal.toString() })
  }
  return (
    <button className={s.button} type="button" onClick={updateWallet}>
      {title}
    </button>
  );
}

export default Btn;
