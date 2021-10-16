import { apiConfig } from './constants.js';
class Api {
  constructor(apiConfig) {
    this._url = apiConfig.baseUrl;
    this._headers = apiConfig.headers;
  }
  _obtainData(way, method) {
    return fetch(`${this._url}${way}`, method).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  getUserInfo() {
    return this._obtainData('/users/me', { headers: this._headers });
  }
  getInitialCards() {
    return this._obtainData('/cards', { headers: this._headers });
  }
  setUserInfo(userInfo) {
    return this._obtainData('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    });
  }
  addCard(newCard) {
    return this._obtainData('/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    });
  }
  deleteCard(cardId) {
    return this._obtainData(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }
  changeAvatar(avatarUrl) {
    return this._obtainData(`/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatarUrl),
    });
  }
  changeLikeCardStatus(cardId, isLiked) {
    return this._obtainData(`/cards/likes/${cardId}`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    });
  }
}
const api = new Api(apiConfig);
export default api;
