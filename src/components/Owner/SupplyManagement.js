import s from './Forms.module.css';
import Loader from '../Loader/Loader';


function SupplyManagement() {
  return (
    <div>
      <form className={s.block}>
        <h3 className="i-star">Mint</h3>
        <label>Value</label>
        <input
          className={s.input}
          type="text"
          placeholder="123"
        />
        <button className={s.button}>
          Value
            {/* <Loader /> */}
        </button>
      </form>
      <form className={s.block}>
        <h3 className="i-unview">Burn</h3>
        <label>Value</label>
        <input
          className={s.input}
          type="text"
          placeholder="123"
        />
        <button className={s.button}>
          Burn
            {/* <Loader /> */}
        </button>
      </form>
      <form className={s.block}>
        <h3 className="i-bal">Claim Fee</h3>
        <label>Value</label>
        <input
          className={s.input}
          type="text"
          placeholder="123"
        />
        <button className={s.button}>
          Claim Fee
            {/* <Loader /> */}
        </button>
      </form>
    </div>
  );
}

export default SupplyManagement;
