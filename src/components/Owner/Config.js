import s from './Forms.module.css';
// import Loader from '../Loader/Loader';


function Config() {
  return (
    <div>
      <form className={s.block}>
        {/* <h3 className="i-proc">Config</h3> */}
        <label>InitialUAX</label>
        <input
          className={s.input}
          type="text"
          placeholder="new users UAX balance"
          defaultValue="50"
        />
        <label>InitialTON</label>
        <input
          className={s.input}
          type="text"
          placeholder="new users TON balance"
          defaultValue="2"
        />
        <label>ThresholdTON</label>
        <input
          className={s.input}
          type="text"
          placeholder="min TON balance"
          defaultValue="1.5"
        />
        
      </form>
    </div>
  );
}

export default Config;
