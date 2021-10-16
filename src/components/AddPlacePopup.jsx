import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {
  const [inputValue, setInputValue] = useState({
    placeName: '',
    placeLink: '',
  });

  function handleChange(e) {
    const targetValue = e.target.value;
    const name = e.target.name;
    setInputValue({ ...inputValue, [name]: targetValue });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: inputValue.placeName,
      link: inputValue.placeLink,
    });
  }

  useEffect(() => {
    setInputValue({ placeName: '', placeLink: '' });
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='add'
      title='Новое Место'
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonValue='Сохранить'
      submitButtonWaitingValue='Сохранение...'
    >
      <fieldset className='popup__input'>
        <input
          type='text'
          name='placeName'
          required
          placeholder='Название'
          className='popup__input-item popup__input-item_change_value'
          id='sign-in-title'
          autoComplete='off'
          minLength='2'
          maxLength='30'
          onChange={handleChange}
          value={inputValue.placeName}
        />
        <span className='popup__input-error' id='sign-in-title-error'></span>
        <input
          type='url'
          name='placeLink'
          required
          placeholder='Ссылка на картинку'
          className='popup__input-item popup__input-item_change_image'
          autoComplete='off'
          onChange={handleChange}
          value={inputValue.placeLink}
        />
        <span className='popup__input-error'></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
