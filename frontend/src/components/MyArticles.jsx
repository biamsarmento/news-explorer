import React, { useContext, useEffect } from 'react';
import Card from './Card';
import Header from "./Header";
import CurrentUserContext from '../contexts/CurrentUserContext';
import nlp from 'compromise';

function MyArticles({getUserArticles, handleCardDelete}) {

    const {userCards, currentUser} = React.useContext(CurrentUserContext);

    const keywordsArray = userCards.map(card => {
        return card.source.name;
        // const doc = nlp(card.description);
        // // Extrai termos individuais e filtra apenas as palavras (não frases compostas)
        // const keywords = doc.terms().out('array').filter(word => word.length > 1); // Filtra palavras com mais de 1 caractere
        // return keywords.length > 0 ? keywords[0] : ""; 
    });
    
    const getArticles = () => {
        getUserArticles();
    };

    // React.useEffect(() => {
    //     (async () => {
    //         await api.getUserCards()
    //           .then((cards) => {
    //             setUserCards(cards.data);
    //           })
    //           .catch((err) => {
    //             console.error('Erro ao carregar os cartões:', err);
    //           });
    //       })();
    // });

    return (
        <>
        <section className="my-articles" id="my-articles">
            <Header></Header>
            <div className="my-articles__info">
                <p className="my-articles__info_page">Artigos salvos</p>
                <h1 className="my-articles__info_title">{currentUser.username}, você tem {userCards.length} artigos salvos</h1>
                <p className="my-articles__info_keywords">Por palavras-chave: {keywordsArray.slice(0, 3).join(", ")} e outras </p>
            </div>
            <div className="results_on">
                <div className="results__container">
                    <div className="results__cards">
                        {/* {getUserArticles()} */}

                        {userCards.map((card, index) => {
                            return (
                                <Card
                                    card={card}
                                    // handleSaveCard={props.handleSaveCard}
                                    handleCardDelete={handleCardDelete}
                                    index={index}
                                    image={card.urlToImage}
                                    date={card.publishedAt}
                                    title={card.title}
                                    description={card.description}
                                    source={card.source.name}
                                    // handleCardDelete={props.handleCardDelete}
                                    // onDeleteCardClick={props.onDeleteCardClick}
                                    // onCardDelete={props.onCardDelete}
                                    // onCardLike={props.onCardLike}
                                    // onCardClick={props.onCardClick}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default MyArticles;