import s from './Log.module.css';

function Log() {
  return (
    <div className={s.history}>
      <div className={s.send}>
        <span>user-user</span>
        <span>₴5 324..FD5 ➜ 5A2..821</span>
      </div>
      <div className={s.fee}>
        <span>new fee dest</span>
        <span>324..FD5 ➜ 044..EE2</span>
      </div>
      <div className={s.fee}>
        <span>new fee val</span>
        <span>₴2</span>
      </div>
      <div className={s.mint}>
        <span>mint</span>
        <span>₴2 ⚡️30</span>
        <span>AAA..00E ➜ ADE..12D</span>
      </div>
      <div className={s.sign}>
        <span>sign</span>
        <span>0BB</span>
      </div>
      <div className={s.hold}>
        <span>user-user</span>
        <span>* 19:03:24</span>
      </div>
    </div>
  );
}

export default Log;
