import s from './ColTitle.module.css';

function ColTitle({ title }) {
  return <div className={s.coltitle}>{title}</div>
};

export default ColTitle;
