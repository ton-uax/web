import s from './Header.module.css';
import logo from '../../img/logo.svg';
import {
  Link
} from "react-router-dom";


function Header({ title }) {
  return (
    <header className={s.main}>
      <div className={s.logo}>
        <h1>
          <Link to="/" className={s.title}>
            {' '}
            <img
              className={s.logoImage}
              src={logo}
              alt="logo"
              width="20px"
            />
            {title}
          </Link>
        </h1>
      </div>
      <div className={s.menu}>
        <Link to="/" className={(s.act, s.link)}>
          Home
        </Link>
        <Link to="/demo1" className={s.link}>
          Demo 1
        </Link>
        <Link to="/demo2" className={s.link}>
          Demo 2
        </Link>
      </div>
    </header>
  );
}

export default Header;
