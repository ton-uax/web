import s from './Home.module.css';
import qr from '../../img/qr.png';


function Home() {
  return (
    <div className={s.homepage}>
      <div className={s.pic}></div>
      <div className={s.autorisation}>
        <h2 className="i-login2">UAX Login</h2>
        <form className={s.block}>
          <label className={s.label}>Login</label>
          <input
            className={s.input}
            type="text"
            placeholder="Flash Flashnson"
          />
          <label className={s.label}>Password</label>
          <input
            className={s.input}
            type="text"
            placeholder="enter your password"
          />
          <button className={s.button} type="submit">
            Log in
          </button>
        </form>
        <span>or</span>
        <p>Scan for login</p>
        <img src={qr} alt="Scan for login"></img>
      </div>
    </div>
  );
}

export default Home;
