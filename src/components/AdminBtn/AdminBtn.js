import s from './AdminBtn.module.css';

function Btn({ title, client }) {

  async function createWallet() {
    console.log(client);
    console.log(await client.net
      .query_collection({
        collection: 'accounts',
        filter: {
          id: { eq: '0:7521327f18e2696a4a97d556361d0e5025472a00d9c4d3573508f508f2bff152' },
        },
        result: 'balance',
      }));
  }
  return (
    <button className={s.button} type="button" onClick={createWallet}>
      {title}
    </button>
  );
}

export default Btn;
