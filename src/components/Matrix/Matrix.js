import s from './Matrix.module.css';

function Matrix({ children }) {
  return (
    <div className={s.matrix}>
      {children}
    </div>
  );
}

export default Matrix;
