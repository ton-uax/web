import s from './AdminBtn.module.css';

function Btn({ title, icon }) {
  return (
    <button className={`${s.button} ${icon}`} type="button">
      {title}
    </button>
  );
}

export default Btn;
