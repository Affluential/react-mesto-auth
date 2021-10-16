import React, { useState } from 'react';
import * as mainAuth from '../components/mainAuth';
import { useHistory } from 'react-router-dom';

function Login({ hendleLogin, openPopupError }) {
  const [dataLogin, setDataLogin] = useState({
    password: '',
    email: '',
  });

  const history = useHistory();

  function hendleChange(e) {
    const { name, value } = e.target;
    setDataLogin({ ...dataLogin, [name]: value });
  }

  function hendleSubmit(e) {
    e.preventDefault();
    mainAuth
      .login(dataLogin.password, dataLogin.email)
      .then((data) => {
        if (data.token) {
          hendleLogin();
          setDataLogin({ password: '', email: '' });
          history.push('/main');
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
          noValidate
        >
          <div>
            <h2 className='register__title'>Вход</h2>
            <input
              onChange={hendleChange}
              className='register__input'
              type='email'
              name='email'
              placeholder='Email'
              autoComplete='on'
              required
            ></input>
            <input
              onChange={hendleChange}
              className='register__input'
              type='password'
              name='password'
              placeholder='Пароль'
              autoComplete='off'
              required
            ></input>
          </div>
          <div className='register_type_button-container'>
            <button type='submit' className='button button_type_register'>
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
