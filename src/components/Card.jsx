import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_clicked"
  }`;

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card" id={card._id}>
      <button
        type="button"
        className="card__delete"
        aria-label="Удалить"
        style={{ display: `${isOwn && `block`}` }}
        onClick={handleDeleteClick}
      ></button>
      <div
        className="card__image"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      ></div>
      <div className="card__column">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Понравилось"
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
export default Card;
