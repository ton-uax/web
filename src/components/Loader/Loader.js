import loader from '../../img/cycle.png';
import s from './Loader.module.css';

function Loader({ width = 20 }) {
  return <img className={s.loader} src={loader} width={width} alt="loader" />;
}

export default Loader;
