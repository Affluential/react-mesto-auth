import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as mainAuth from '../components/mainAuth';

function Register({ openPopupDone, openPopupError }) {
  const [dataUser, setDataUser] = useState({
    password: '',
    email: '',
  });
  const history = useHistory();

  function hendleChange(e) {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  }

  function hendleSubmit(e) {
    e.preventDefault();
    mainAuth
      .register(dataUser.password, dataUser.email)
      .then((res) => {
        console.log(res);
        if (res) {
          openPopupDone();
          history.push('/sign-in');
        } else {
          openPopupError();
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='register'>
      <div className='register__container'>
        <form
          onSubmit={hendleSubmit}
          action='#'
          id='form_reset'
          className='register__form'
          name
          noValidate
        >
          <div>
            <h2 className='register__title'>Регистрация</h2>
            <input
              onChange={hendleChange}
              className='register__input'
              type='email'
              name='email'
              placeholder='Email'
              value={dataUser.email}
            ></input>
            <input
              onChange={hendleChange}
              className='register__input'
              type='password'
              name='password'
              placeholder='Пароль'
              value={dataUser.password}
            ></input>
          </div>
          <div className='register_type_button-container'>
            <button className=' button button_type_register'>Зарегистрироваться</button>
            <Link to={'/sign-in'} className='register__login'>
              Уже зарегистрированы? Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
