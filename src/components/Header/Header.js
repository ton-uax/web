import s from './Header.module.css';
import logo from '../../img/logo.svg';

function Header({ title }) {
  return (
    <header className={s.main}>
      <div className={s.logo}>
        <h1>
          <a className={s.title} href="uax">
            {' '}
            <img
              className={s.logoImage}
              src={logo}
              width="20px"
              height="20px"
              alt="logo"
            />
            {title}
          </a>
        </h1>
      </div>
      <div className={s.menu}>
        <a className={(s.act, s.link)} href="uax">
          Home
        </a>
        <a className={s.link} href="./demo">
          Demo
        </a>
        <a className={s.link} href="./demo">
          Map
        </a>
        <a className={s.link} href="./demo">
          Help
        </a>
        <a className={s.link} href="./demo">
          Contact
        </a>
      </div>
    </header>
  );
}

export default Header;
