import s from './AdminBtn.module.css';

function Btn({ title, icon }) {
  // const [wallet]
  return (
    // onClick={deployWallet} >
    <button className={`${s.button} ${icon}`} type="button">
      {title}
    </button>
  );
}

export default Btn;
