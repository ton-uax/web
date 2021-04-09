import s from './AdminBtn.module.css';

function Btn({ title }) {
  return (
    <button className={`${s.button} i-bot`} type="button">
      {title}
    </button>
  );
}

export default Btn;
