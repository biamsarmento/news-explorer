import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Main from './components/Main';
import MyArticles from './components/MyArticles'
import Footer from "./components/Footer";
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import './index.css';
import api from './utils/api';
import api_news from "./utils/api_news";
import * as auth from './utils/auth';
import { getToken, setToken } from "./utils/token";
import CurrentUserContext from './contexts/CurrentUserContext';

function App() {

  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
  const [isRegistrationSuccessfulPopupOpen, setIsRegistrationSuccessfulPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [errorRegistration, setErrorRegistration] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isResult, setIsResult] = React.useState(null);
  const [isPreLoader, setIsPreLoader] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [userCards, setUserCards] = React.useState([]);
  const [userData, setUserData] = React.useState({ email: "", username: "" });
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
  
    (async () => {
      await api.getUserInfo()
        .then((data) => {
          setCurrentUser(data.data);
        })
        .catch((err) => {
          console.error("Erro ao obter User Info:", err);
        });
    })();

    (async () => {
      await api.getUserCards()
        .then((cards) => {
          setUserCards(cards.data);
        })
        .catch((err) => {
          console.error('Erro ao carregar os cartões:', err);
        });
    })();

    const token = getToken();
    if (!token) {
      return;
    } else if(token) {
      auth
        .retrieveEmail(token)
        .then((data) => {
          setUserData({email: data.data.email, username: data.data.username});
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
        })
    }
  }, []);

  // CARD

  const getUserArticles = () => {
    api.getUserCards()
      .then((cards) => {
        if(cards) {
          setUserCards(cards.data);
        } else {
          setUserCards([]);
        }
      })
      .catch((err) => {
        console.error('Erro ao carregar os cartões:', err);
      });
  };

  const handleSaveCard = (card) => {
    api.addCard(card)
      .then((newCard) => {
        api.getUserCards()
        .then((cards) => {
          setUserCards(cards.data);
        })
        .catch((err) => {
          console.error('Erro ao carregar os cartões:', err);
        });
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {

        getUserArticles();
      })
      .catch((error) => console.error(error));
  }


  // function handleAddPlaceSubmit(card) {
  //   api.addCard(card)
  //     .then((newCard) => {
  //       setCards([newCard.data, ...cards]);
  //     })
  //     .catch((err) => console.error(err));
  // }

  // function handleLoginClick() {
  //   setIsLoginPopupOpen(true);
  // }

  function handleRegisterClick() {
    setIsRegisterPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // function handleAddPlaceClick() {
  //   setAddPlacePopupOpen(true);
  // }

  // function handleEditAvatarClick() {
  //   setEditAvatarPopupOpen(true);
  // }

  // function handleDeleteCardClick() {
  //   setDeleteCardPopupOpen(true);
  // }

  // function handleCardClick(card) {
  //   setSelectedCard(card);
  // }

  function closeAllPopups() {
    setSelectedCard(null);
    setEditProfilePopupOpen(false);
    // setAddPlacePopupOpen(false);
    // setEditAvatarPopupOpen(false);
    // setDeleteCardPopupOpen(false);
    setIsLoginPopupOpen(false);
    setErrorRegistration(false);
    setIsRegisterPopupOpen(false);
    setIsRegistrationSuccessfulPopupOpen(false);
  }

  const handleSearch = (query) => {
    api_news.newsSearch(query)
      .then((data) => {
          if(data.articles.length > 0) {
            setIsResult(true);
            setIsPreLoader(false);
            setResults(data);
          } else if (data.articles.length === 0) {
            setIsResult(false);
            setIsPreLoader(false);
          }
      })
      .catch((error) => {
          console.error("Erro ao buscar notícias:", error);
      });
  }

  const handleRegistration = ({
    email,
    password,
    username,
  }) => {
    
    auth
      .register(email, password, username)
      .then(() => {
        setIsRegistrationSuccessful(true); 
        setIsRegistrationSuccessfulPopupOpen(true); 
      })
      .catch((error) => {
        setIsRegistrationSuccessful(false); 
        setErrorRegistration(true);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          setToken(data.token);
          auth 
            .retrieveEmail(data.token)
            .then(async (data) => {
              setUserData({email: data.data.email, username: data.data.username});
              setCurrentUser(data.data);
              getUserArticles();
              const redirectPath = location.state?.from?.pathname || "/";
              navigate(redirectPath);
            })
            .catch(console.error);
        }
      })
      .catch((error) => {
        setIsLoginPopupOpen(true); 
      });
  };

  return (
    <div className="page"> 
      <CurrentUserContext.Provider value={{currentUser, isLoggedIn, setIsLoggedIn, userData, userCards, setUserCards}}>
        <Routes>
          <Route
            path="/"
            element={
                <Main 
                // onLoginClick={handleLoginClick}
                onEditProfileClick={handleEditProfileClick}
                onRegisterClick={handleRegisterClick}
                // onAddPlaceClick={handleAddPlaceClick}
                // onEditAvatarClick={handleEditAvatarClick}
                // onDeleteCardClick={handleDeleteCardClick}
                isEditProfilePopupOpen={isEditProfilePopupOpen}
                isRegisterPopupOpen={isRegisterPopupOpen}
                isLoginPopupOpen={isLoginPopupOpen}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                // isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                // isDeleteCardPopupOpen={isDeleteCardPopupOpen}
                selectedCard={selectedCard}
                onClose={closeAllPopups}
                // onCardClick={handleCardClick}
                cards={cards}
                handleCardDelete={handleCardDelete}
                // onAddPlaceSubmit={handleAddPlaceSubmit}
                userData={userData}
                handleLogin={handleLogin}
                handleRegistration={handleRegistration}
                isRegistrationSuccessful={isRegistrationSuccessful}
                isRegistrationSuccessfulPopupOpen={isRegistrationSuccessfulPopupOpen}
                handleSearch={handleSearch}
                isResult={isResult}
                setIsResult={setIsResult}
                results={results}
                setResults={setResults}
                isPreLoader={isPreLoader}
                setIsPreLoader={setIsPreLoader}
                handleSaveCard={handleSaveCard}
                ></Main>
            }
          />
          <Route
            path="/my-articles"
            element={
              <>
                <ProtectedRoute>
                  <MyArticles handleCardDelete={handleCardDelete} getUserArticles={getUserArticles} ></MyArticles>
                </ProtectedRoute>
                <Footer></Footer>
              </>
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
