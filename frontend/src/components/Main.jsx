import PopupWithForm from './PopupWithForm';
import RegisterPopup from './RegisterPopup';
import SearchBar from './SearchBar';
import React from 'react';
import EditProfile from './EditProfile';
import InfoTooltip from './InfoTooltip';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Footer from './Footer';
import avatar from '../images/author_avatar.png';

function Main(props) {

    const {currentUser} = React.useContext(CurrentUserContext);

    const handleSuccessfulRegistration = () => {
        if(props.isRegistrationSuccessful) {
            console.log("Registration Successful!");
            return (
            <InfoTooltip 
            isRegistrationSuccesssul={props.isRegistrationSuccessful} 
            isRegistrationSuccessfulPopupOpen={props.isRegistrationSuccessfulPopupOpen} 
            navigate={props.onEditProfileClick}
            onClose={props.onClose}></InfoTooltip>
            )
        }
    }

    return ( 
        <>
        <main className="content">
            <Header onEditProfileClick={props.onEditProfileClick} onRegisterClick={props.onRegisterClick} onloginClick={props.onLoginClick}></Header>
            <section className='search' id='search'>
                <div className="search__texts">
                    <h1 className="search__title">O que está <br /> acontecendo no mundo?</h1>
                    <p className="search__subtitle">Encontre as últimas notícias sobre qualquer tema e salve elas em sua conta pessoal</p>
                </div>
                <SearchBar></SearchBar>
            </section>
            <section className="author">
                <div className="author__content">
                    <img src={avatar} alt="" className="author__avatar" />
                    <div className="author__info">
                        <h2 className="author__info_title">Sobre o autor</h2>
                        <p className="author__info_text1">Esse bloco descreve o autor do projeto. Aqui você deve indicar seu nome, o que você faz e quais tecnologias de desenvolvedor você conhece.</p>
                        <p className="author__info_text2">Você também pode falar sobre sua experiência com o Practicum, o que aprendeu lá e como pode ajudar clientes em potencial.</p>
                    </div>
                </div>
            </section>
            {/* <PopupWithForm title="Entrar" name="login-popup" link="Increva-se" isOpen={props.isLoginPopupOpen} onClose={props.onClose}>
                <Login onClose={props.onClose}></Login>
            </PopupWithForm>  */}
            <PopupWithForm title="Entrar" name="profile-popup" navigate={props.onRegisterClick} link="Increva-se" isOpen={props.isEditProfilePopupOpen} onClose={props.onClose}>
                <EditProfile handleLogin={props.handleLogin} isOpen={props.isEditProfilePopupOpen} onClose={props.onClose}></EditProfile>
            </PopupWithForm> 
            <PopupWithForm title="Inscrever-se" name="register-popup" navigate={props.onEditProfileClick} link="Entre" isOpen={props.isRegisterPopupOpen} onClose={props.onClose}>
                <RegisterPopup isRegistrationSuccessfulPopupOpen={props.isRegistrationSuccessfulPopupOpen} isRegistrationSuccessful={props.isRegistrationSuccessful} handleRegistration={props.handleRegistration} isOpen={props.isRegisterPopupOpen} onClose={props.onClose}></RegisterPopup>
            </PopupWithForm>
            {handleSuccessfulRegistration()}
            {/* <PopupWithForm title="Entrar" name="profile-popup" link="Entre" isOpen={props.isEditProfilePopupOpen} onClose={props.onClose}>
                <EditProfile onClose={props.onClose}></EditProfile>
            </PopupWithForm>  */}
            {/* <PopupWithForm title="Editar Perfil" name="profile-popup" isOpen={props.isEditProfilePopupOpen} onClose={props.onClose}>
                <EditProfile onClose={props.onClose}></EditProfile>
            </PopupWithForm> 
            <PopupWithForm title="Novo Local" name="new-card-popup" isOpen={props.isAddPlacePopupOpen} onClose={props.onClose}>
                <NewCard onClose={props.onClose} onAddPlaceSubmit={props.onAddPlaceSubmit}></NewCard>
            </PopupWithForm> 
            <PopupWithForm title="Tem certeza?" name="delete-popup" isOpen={props.isDeleteCardPopupOpen} onClose={props.onClose}>
                <button type="submit" className="form__submit-button">Sim</button>
            </PopupWithForm>
            <PopupWithForm title="Alterar a foto do perfil" name="edit-profile-pic-popup" isOpen={props.isEditAvatarPopupOpen} onClose={props.onClose}>
                <EditAvatar onClose={props.onClose}></EditAvatar>
            </PopupWithForm>
            <ImagePopup card={props.selectedCard} onClose={props.onClose}></ImagePopup> */}
            {/* <section className="profile" id="profile">
                <button className="profile__avatar_button" onClick={props.onEditAvatarClick}>
                    <img src={editSign} alt="Edit Sign" className="profile__avatar_edit"></img>
                    <img
                    src={currentUser.avatar}
                    alt="Avatar"
                    className="profile__avatar"
                    ></img>
                </button>
                <div className="profile__info">
                    <h1 className="profile__info-title">{currentUser.name}</h1>
                    <button className="profile__info-edit-button" onClick={props.onEditProfileClick}></button>
                    <p className="profile__info-activity">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlaceClick}></button>
            </section> */}
            {/* <section className="elements" id="elements">
            {props.cards.map((card) => {
                return (
                    <Card
                        key={card._id}
                        card={card}
                        onDeleteCardClick={props.onDeleteCardClick}
                        onCardDelete={props.onCardDelete}
                        onCardLike={props.onCardLike}
                        onCardClick={props.onCardClick}
                    />
                );
            })}
            </section> */}
        </main>
        <Footer/>
        </>
    )
}

export default Main;