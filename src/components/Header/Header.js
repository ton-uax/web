import s from './Header.module.css';
import logo from '../../img/logo.svg';
import { Link } from 'react-router-dom';

function Header({ title }) {
  return (
    <header className={s.main}>
      <div className={s.logo}>
        <h1>
          <Link to="/dev" className={s.title}>
            {' '}
            <img className={s.logoImage} src={logo} alt="logo" width="30px" />
            {title}
          </Link>
        </h1>
      </div>
      <div className={s.menu}>
        
        <Link to="owner" className={s.link}>
          Owner UI Demo
        </Link>
        <Link to="dev" className={(s.link, s.active)}>
          Dev UI Demo
        </Link>
        <Link to="/" className={(s.act, s.link)}>
          Don't touch
        </Link>
      </div>
    </header>
  );
}

export default Header;
