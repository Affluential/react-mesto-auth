import React from 'react';

function DonePopup({ doneRegMessage, onClose, closeOver }) {
  return (
    <div onClick={closeOver} className={`error-popup popup ${doneRegMessage && 'popup_is-opened'}`}>
      <ul className='error-popup__lists'>
        <li className='done-popup__images'></li>
        <li className='error-popup__title'>Вы успешно зарегистрировались!</li>
        <button onClick={onClose} className='popup__close-button' type='button'></button>
      </ul>
    </div>
  );
}

export default DonePopup;
