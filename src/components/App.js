import { useState, useEffect } from 'react';
import api from '../utils/Api.js';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.jsx';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ErrorPopup from './ErrorPopup.jsx';
import DonePopup from './DonePopup.jsx';
import Burger from './Burger.jsx';
import * as mainAuth from '../components/mainAuth.jsx';

function App() {
  const [isEditProfilePopupOpen, changeProfilePopupOpen] = useState(false);
  function onEditProfile() {
    changeProfilePopupOpen(true);
  }
  const [isAddPlacePopupOpen, changePlacePopupOpen] = useState(false);
  function onAddPlace() {
    changePlacePopupOpen(true);
  }
  const [isEditAvatarPopupOpen, changeAvatarPopupOpen] = useState(false);
  function onEditAvatar() {
    changeAvatarPopupOpen(true);
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(false);
  const [doneRegMessage, setDoneMessage] = useState(false);
  const [userEmail, setUserEmail] = useState([]);
  const [burgerhidden, setBurgerHidden] = useState('');

  const [isDeletePopupOpen, changeDeletePopupOpen] = useState(false);
  const [isLoading, changeIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardForDelete, setCardForDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    name: '',
    link: '',
  });
  ///
  const history = useHistory();
  function hendleLogin() {
    setLoggedIn(true);
  }
  function openPopupError() {
    setRegisterMessage(true);
  }
  function openPopupDone() {
    setDoneMessage(true);
  }
  ///
  function handleAddCard(newCard) {
    changeIsLoading(true);
    api
      .addCard(newCard)
      .then((cardInfo) => {
        setCards([...cards, cardInfo]);
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      })
      .finally(() => {
        closeAllPopups();
        changeIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    changeIsLoading(true);
    api
      .changeAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      })
      .finally(() => {
        closeAllPopups();
        changeIsLoading(false);
      });
  }

  function handleUpdateUser(userInfo) {
    changeIsLoading(true);
    api
      .setUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      })
      .finally(() => {
        closeAllPopups();
        changeIsLoading(false);
      });
  }

  function handleCardClick(card) {
    const cardName = card.name;
    const cardLink = card.link;
    setSelectedCard({
      isImageOpen: true,
      name: cardName,
      link: cardLink,
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      });
  }

  function handleCardDelete(card) {
    changeDeletePopupOpen(true);
    setCardForDelete(card);
  }

  function handleConfurm() {
    changeIsLoading(true);
    api
      .deleteCard(cardForDelete._id)
      .then(() => {
        const newCards = cards.filter((i) => i._id !== cardForDelete._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      })
      .finally(() => {
        closeAllPopups();
        changeIsLoading(false);
      });
  }

  useEffect(() => {
    const closeESC = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeESC);
    return () => {
      document.removeEventListener('keydown', closeESC);
    };
  }, []);

  function escClose(event) {
    if (event.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }
  function closeAllPopups() {
    changeProfilePopupOpen(false);
    changePlacePopupOpen(false);
    changeAvatarPopupOpen(false);
    changeDeletePopupOpen(false);
    setRegisterMessage(false);
    setDoneMessage(false);
    setSelectedCard({
      isImageOpen: false,
      name: '',
      link: '',
    });
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      });
  }, []);

  useEffect(() => {
    mainAuth
      .getContent()
      .then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          history.push('/main');
          hendleLogin();
        }
      })
      .catch((err) => console.log(err));
    /*  if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        mainAuth
          .getContent(token)
          .then((res) => {
            if (res) {
              setUserEmail(res.data.email);
              history.push('/main');
              hendleLogin();
            }
          })
          .catch((err) => console.log(err));
      }
    } */
  }, [loggedIn, history]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Burger
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          setLogged={setLoggedIn}
          burgerhidden={burgerhidden}
        />
        <Header
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          setLogged={setLoggedIn}
          setBurgerHidden={setBurgerHidden}
        />
        <Switch>
          <ProtectedRoute
            exact
            path='/main'
            loggedIn={loggedIn}
            component={Main}
            editProfile={onEditProfile}
            addPlace={onAddPlace}
            editAvatar={onEditAvatar}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path='/sign-in'>
            <Login hendleLogin={hendleLogin} openPopupError={openPopupError} />
          </Route>
          <Route path='/sign-up'>
            <Register openPopupDone={openPopupDone} openPopupError={openPopupError} />
          </Route>
          <Route>{loggedIn ? <Redirect to='/main' /> : <Redirect to='/sign-in' />}</Route>
        </Switch>
        <Footer />
        <ImagePopup
          isImageOpen={selectedCard.isImageOpen}
          name={selectedCard.name}
          link={selectedCard.link}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <DeleteConfirmPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onConfurm={handleConfurm}
          isLoading={isLoading}
        />
        <ErrorPopup
          closeOver={escClose}
          onClose={closeAllPopups}
          registerMessage={registerMessage}
        />
        <DonePopup closeOver={escClose} onClose={closeAllPopups} doneRegMessage={doneRegMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
