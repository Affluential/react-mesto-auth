import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputValue = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputValue.current.value,
    });
  }

  useEffect(() => {
    inputValue.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name='avatar'
      title='Обновить аватар'
      isLoading={isLoading}
      submitButtonValue='Сохранить'
      submitButtonWaitingValue='Сохранение...'
    >
      <fieldset className='popup__input'>
        <input
          type='url'
          name='avatarUrl'
          required
          placeholder='Ссылка на аватар'
          className='popup__input-item popup__input-item_change_image'
          id='sign-in-url'
          autoComplete='off'
          ref={inputValue}
        />
        <span className='popup__input-error' id='sign-in-url-error'></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
