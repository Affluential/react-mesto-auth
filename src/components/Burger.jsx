import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Burger({ userEmail, setUserEmail, setLogged, burgerhidden }) {
  const history = useHistory();

  function signOut() {
    localStorage.removeItem('token');
    history.push('/sign-up');
    setLogged(false);
    setUserEmail('');
  }

  return (
    <div className={`burger_container ${burgerhidden ? 'burger__open' : ''}`}>
      <div className={`header__burger ${burgerhidden ? 'burger__open' : ''}`}>
        <div className='user-data'>{userEmail}</div>
        <Link onClick={signOut} to={'/main'} className='header__login'>
          Выйти
        </Link>
      </div>
    </div>
  );
}

export default Burger;
