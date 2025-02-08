import React, { useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import SignupPopup from './SignupPopup';
import SearchBar from './SearchBar';
import Article from './Article';
import SigninPopup from './SigninPopup';
import InfoTooltip from './InfoTooltip';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Footer from './Footer';
import avatar from '../images/Me.jpeg';
import not_found from '../images/not-found_v1.png';

function Main(props) {
    const { currentUser } = useContext(CurrentUserContext);
    
    const [visibleResults, setVisibleResults] = useState(3);

    const handleShowMore = () => {
        setVisibleResults(prev => prev + 3);
    };

    const preLoader = () => {
        if (props.isPreLoader) {
            return (
                <section className="results_on">
                    <div className="results__container">
                        <div className="results__preloader">
                            <i className="circle-preloader"></i>
                            <p className="results__preloader_text">Looking for articles...</p>
                        </div>
                    </div>
                </section>
            );
        }
        props.setIsPreLoader(false);
    };

    const resultsRenderer = () => {
        if (props.isResult) {
            return (
                <section className="results_on">
                    <div className="results__container">
                        <div className="results__cards">
                            <h2 className="results__cards_title">Results</h2>

                            {/* Renderiza apenas os resultados visíveis */}
                            {props.results.articles.slice(0, visibleResults).map((card, index) => (
                                <Article
                                    key={index}
                                    card={card}
                                    handleSaveCard={props.handleSaveCard}
                                    image={card.urlToImage}
                                    date={card.publishedAt}
                                    title={card.title}
                                    description={card.description}
                                    source={card.source.name}
                                    onDeleteCardClick={props.onDeleteCardClick}
                                    handleCardDelete={props.handleCardDelete}
                                    onCardLike={props.onCardLike}
                                    onCardClick={props.onCardClick}
                                />
                            ))}
                        </div>

                        {/* Mostrar o botão apenas se houver mais resultados a serem carregados */}
                        {visibleResults < props.results.articles.length && (
                            <button className="results__cards_button" onClick={handleShowMore}>
                                Show more
                            </button>
                        )}
                    </div>
                </section>
            );
        } else if (props.isResult === false) {
            return (
                <section className="results_on">
                    <div className="results__container">
                        <div className="results__not-found">
                            <img className='results__not-found_image' src={not_found} alt="Ícone de não encontrado" />
                            <h2 className="results__not-found_title">Not found</h2>
                            <p className="results__not-found_subtitle">
                                We're sorry, but nothing matches your <br /> search topic
                            </p>
                        </div>
                    </div>
                </section>
            );
        } else {
            props.setIsResult(null);
            return null;
        }
    };

    const handleSuccessfulRegistration = () => {
        if (props.isRegistrationSuccessful) {
            return (
                <InfoTooltip 
                    isRegistrationSuccesssul={props.isRegistrationSuccessful} 
                    isRegistrationSuccessfulPopupOpen={props.isRegistrationSuccessfulPopupOpen} 
                    navigate={props.onEditProfileClick}
                    onClose={props.onClose}
                />
            );
        }
    };

    return ( 
        <>
            <main className="content">
                <section className='search' id='search'>
                    <Header 
                        onEditProfileClick={props.onEditProfileClick} 
                        onRegisterClick={props.onRegisterClick} 
                        onLoginClick={props.onLoginClick}
                    />
                    <div className="search__container">
                        <div className="search__texts">
                            <h1 className="search__title">What's <br /> happening in the world?</h1>
                            <p className="search__subtitle">
                                Find the latest news on any topic and save it to your personal account
                            </p>
                        </div>
                        <SearchBar 
                            setIsResult={props.setIsResult} 
                            setIsPreLoader={props.setIsPreLoader} 
                            handleSearch={props.handleSearch}
                        />
                    </div>
                </section>
                {preLoader()}
                {resultsRenderer()}
                
                <section className="author">
                    <div className="author__content">
                        <img src={avatar} alt="author's image" className="author__avatar" />
                        <div className="author__info">
                            <h2 className="author__info_title">About the author</h2>
                            <p className="author__info_text1">
                                Hi there! My name is Beatriz and i love being a fullstack developer! 
                                I love it because it allows me to be creative, and I know that if I can imagine something, I can build it.
                                I built this website to demonstrate a bit of my potential :)
                            </p>
                            <p className="author__info_text2">
                            I love helping people achieve their dreams, and I truly enjoy assisting them in bringing to life something they once could only see in their imagination.
                            It's priceless to witness an idea that existed only in someone's mind come to life!
                            I would love to help YOU achieve YOUR dreams! Are you ready?
                            </p>
                        </div>
                    </div>
                </section>

                <PopupWithForm title="Sign in" name="signin-popup" navigate={props.onRegisterClick} link="Sign up" 
                    isOpen={props.isEditProfilePopupOpen} onClose={props.onClose}>
                    <SigninPopup handleLogin={props.handleLogin} isOpen={props.isEditProfilePopupOpen} onClose={props.onClose} />
                </PopupWithForm>

                <PopupWithForm title="Sign up" name="signup-popup" navigate={props.onEditProfileClick} link="Sign in" 
                    isOpen={props.isRegisterPopupOpen} onClose={props.onClose}>
                    <SignupPopup 
                        isRegistrationSuccessfulPopupOpen={props.isRegistrationSuccessfulPopupOpen} 
                        isRegistrationSuccessful={props.isRegistrationSuccessful} 
                        handleRegistration={props.handleRegistration} 
                        isOpen={props.isRegisterPopupOpen} 
                        onClose={props.onClose}
                    />
                </PopupWithForm>

                {handleSuccessfulRegistration()}
            </main>
            <Footer />
        </>
    );
}

export default Main;
