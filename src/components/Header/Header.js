import s from './Header.module.css';
import logo from '../../img/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ title }) {
  const location = useLocation()

  return (
    <header className={s.main}>
      <div className={s.logo}>
        <h1>
          <Link to="/owner/1" className={s.title}>
            {' '}
            <img className={s.logoImage} src={logo} alt="logo" width="30px" />
            {title}
          </Link>
        </h1>
      </div>
      <div className={s.menu}>

        <Link to="/owner/1" className={location.pathname === "/owner/1" ? s.active : s.link}>
          Owner 1
        </Link>
        <Link to="/owner/2" className={location.pathname === "/owner/2" ? s.active : s.link}>
          Owner 2
        </Link>
        <Link to="/" className={location.pathname === "/" ? s.active : s.link}>
          Don't touch
        </Link>
      </div>
    </header>
  );
}

export default Header;
