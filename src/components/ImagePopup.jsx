function ImagePopup({ isImageOpen, name, link, onClose }) {
  return (
    <div
      className={`popup popup_image_wrapper ${
        isImageOpen && "popup_is-opened"
      }`}
    >
      <div className="popup__wraper">
        <img className="popup__image" alt={name} src={link} />
        <p className="popup__text">{name}</p>
        <button
          type="reset"
          className="popup__close-button popup__close-button_image"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default ImagePopup;
