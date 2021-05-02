import s from './AdminBtn.module.css';

function Btn({ caption }) {
  // const [wallet]
  const loading = true;
  const icon = "i-bot"
  return (
    // onClick={deployWallet} >
    <button className={`${s.button} ${icon} ${loading ? "i-rotate" : ""}`} type="button">
      {caption}
    </button>
  );
}

export default Btn;
