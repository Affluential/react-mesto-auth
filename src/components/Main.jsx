import { useContext } from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function Main({
  editProfile,
  addPlace,
  editAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const сurrentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${сurrentUser.avatar})` }}
          >
            <button
              className="profile__avatar-edit"
              onClick={editAvatar}
            ></button>
          </div>
          <div className="profile__column">
            <h1 className="profile__name">{сurrentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать профиль"
              onClick={editProfile}
            ></button>
            <p className="profile__status">{сurrentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить"
          onClick={addPlace}
        ></button>
      </section>
      <section className="wrapper-cards">
        <ul className="cards">
          {cards
            .slice()
            .reverse()
            .map((card) => (
              <Card
                card={card}
                onCardClick={onCardClick}
                key={card._id}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
