import React from 'react';
import Article from './Article';
import Header from "./Header";
import CurrentUserContext from '../contexts/CurrentUserContext';
import nlp from 'compromise';

function MyArticles({getUserArticles, handleCardDelete}) {

    const {userCards, currentUser} = React.useContext(CurrentUserContext);

    const keywordsArray = userCards.map(card => {
        const doc = nlp(card.description);
        const keywords = doc.terms().out('array').filter(word => word.length > 1); 
        return keywords.length > 0 ? keywords[0] : ""; 
    });
    
    const getArticles = () => {
        getUserArticles();
    };

    return (
        <>
        <section className="my-articles" id="my-articles">
            <Header></Header>
            <div className="my-articles__info">
                <p className="my-articles__info_page">Saved articles</p>
                <h1 className="my-articles__info_title">{currentUser.username}, you have {userCards.length} saved {userCards.length === 1 ? "article" : "articles"}</h1>
                <p className="my-articles__info_keywords">
                {keywordsArray.length > 0 ? `By keywords: ${keywordsArray.slice(0, 3).join(", ")}` : ""}
                {keywordsArray.length > 3 ? " and others" : ""}
                </p>
            </div>
            <div className="results_on">
                <div className="results__container">
                    <div className="results__cards">

                        {userCards.map((card, index) => {
                            return (
                                <Article
                                    card={card}
                                    handleCardDelete={handleCardDelete}
                                    index={index}
                                    image={card.urlToImage}
                                    date={card.publishedAt}
                                    title={card.title}
                                    description={card.description}
                                    source={card.source.name}
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