import s from './Loader.module.css';

function Loader({ color, width = 20 }) {
  return <div className={`${s.loader} i-cycle i-rotate`} style={{ width, fontSize: width, color: color }} />
}

export default Loader;
