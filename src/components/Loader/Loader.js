import loader from '../../img/cycle.png';
import s from './Loader.module.css';

function Loader({ width }) {
  return <img className={s.loader} src={loader} width="20" alt="loader" />;
}

export default Loader;
