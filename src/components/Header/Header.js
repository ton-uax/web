import s from './Header.module.css';
import logo from '../../img/logo.svg';
import { Link, NavLink } from 'react-router-dom';

function Header() {

  return (
    <header className={s.main}>
      <div className={s.logo}>
        <h1>
          <Link to="/" className={s.title}>
            <img className={s.logoImage} src={logo} alt="logo" width="30px" />
            UAX
          </Link>
        </h1>
      </div>
      <div className={s.menu}>

        <NavLink to="/user" className={s.link} activeClassName={s.active}>
          User-User
        </NavLink>
        <NavLink to="/owner/1" className={s.link} activeClassName={s.active}>
          Owner 1
        </NavLink>
        <NavLink to="/owner/2" className={s.link} activeClassName={s.active}>
          Owner 2
        </NavLink>
        <NavLink to="/owner/3" className={s.link} activeClassName={s.active}>
          Owner 3
        </NavLink>
        <NavLink to="/dev" className={s.link} activeClassName={s.active}>
          Don't touch
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
