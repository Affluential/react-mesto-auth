function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  submitButtonValue,
  submitButtonWaitingValue,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_is-opened"}`}>
      <form
        className={`popup__container popup__container_type_${name}`}
        action="#"
        name="popupForm"
        onSubmit={onSubmit}
      >
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className="popup__save-button" value="Сохранить">
          {isLoading ? submitButtonWaitingValue : submitButtonValue}
        </button>
        <button
          onClick={onClose}
          type="reset"
          className="popup__close-button"
          aria-label="Закрыть"
        ></button>
      </form>
    </div>
  );
}
export default PopupWithForm;
