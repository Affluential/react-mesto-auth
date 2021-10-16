import { useState, useContext, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [inputValue, setInputValue] = useState({
    name: '',
    status: '',
  });
  //////
  const nameInputValue = useRef('');

  //////
  function handleImputChange(e) {
    const targetValue = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: targetValue });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: inputValue.name,
      about: inputValue.status,
    });
  }

  useEffect(() => {
    setInputValue({
      name: currentUser.name,
      status: currentUser.about,
    });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='profile'
      title='Редактировать профиль'
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonValue='Сохранить'
      submitButtonWaitingValue='Сохранение...'
    >
      <fieldset className='popup__input'>
        <input
          ref={nameInputValue}
          type='text'
          name='name'
          value={inputValue.name || ''}
          required
          onChange={handleImputChange}
          placeholder='Ваше имя'
          className='popup__input-item popup__input-item_change_name'
          id='sign-in-name'
          autoComplete='off'
          minLength='2'
          maxLength='40'
        />
        <span className='popup__input-error' id='sign-in-name-error'></span>
        <input
          type='text'
          name='status'
          value={inputValue.status || ''}
          required
          onChange={handleImputChange}
          placeholder='Ваше занятие'
          className='popup__input-item popup__input-item_change_status'
          id='sign-in-status'
          autoComplete='off'
          minLength='2'
          maxLength='200'
        />
        <span className='popup__input-error' id='sign-in-status-error'></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
