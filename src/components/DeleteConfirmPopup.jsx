import PopupWithForm from "./PopupWithForm";
function DeleteConfirmPopup({ isOpen, onClose, onConfurm, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfurm();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="delete-confirm"
      title="Вы Уверены?"
      isLoading={isLoading}
      submitButtonValue="Да"
      submitButtonWaitingValue="Удаление..."
    />
  );
}

export default DeleteConfirmPopup;
