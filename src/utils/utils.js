import { config } from "./constants.js";
export const renderLoading = (isLoading, popupWindow) => {
  const popup = document.querySelector(popupWindow);
  const saveButton = popup.querySelector(config.formSaveButton);
  isLoading
    ? (saveButton.textContent = "Сохранение...")
    : (saveButton.textContent = "Сохранить");
};
