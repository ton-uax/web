import s from './Col.module.css';

function Col({ children }) {
  return <div className={s.col}>
    {children}
  </div>
};

export default Col;
