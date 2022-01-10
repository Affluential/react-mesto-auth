import React, { useState } from 'react';
import logo from './../images/logo.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Api from '../utils/Api';

function Header({ userEmail, setLogged, setUserEmail, setBurgerHidden }) {
  const location = useLocation();
  const history = useHistory();
  const currentPath = location.pathname;
  const [toggle, setToggle] = useState(true);

  function signOut() {
    Api.logout();
    history.push('/sign-up');
    setLogged(false);
    setUserEmail('');
  }

  function toggleBurger() {
    const currentState = toggle;
    setToggle(!currentState);
    setBurgerHidden(currentState);
    console.log(toggle);
  }

  return (
    <header className='header'>
      <img src={logo} alt='логотип' className='logo' />
      <Link className={currentPath.search('/sign-in') ? 'hidden' : 'header__login'} to={'/sign-up'}>
        Регистрация
      </Link>
      <Link className={currentPath.search('/sign-up') ? 'hidden' : 'header__login'} to={'/sign-in'}>
        Войти
      </Link>
      <div className={currentPath.search('/main') ? 'hidden' : 'header__exit'}>
        <p className='user-data'>{userEmail}</p>
        <Link onClick={signOut} to={'/main'} className='header__login'>
          Выйти
        </Link>
      </div>
      <div className={currentPath.search('/main') ? 'hidden' : 'burger__open'}>
        <div
          onClick={toggleBurger}
          className={`header__burger-menu ${toggle ? '' : 'active'}`}
        ></div>
      </div>
    </header>
  );
}

export default Header;
