import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Card from './Card';
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";
import CurrentUserContext from '../contexts/CurrentUserContext';


function MyArticles({getUserArticles}) {

    const {userCards} = React.useContext(CurrentUserContext);

    // const [data, setData] = useState({
    //     email: "",
    //     password: "",
    // });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     handleLogin(data);
    // };

    const getArticles = () => {
        getUserArticles();
    };

    return (
        <>
        <section className="my-articles" id="my-articles">
            <Header></Header>
            <div className="my-articles__info">
                <p className="my-articles__info_page">Artigos salvos</p>
                <h1 className="my-articles__info_title">Elise, você tem 5 artigos salvos</h1>
                <p className="my-articles__info_keywords">Por palavras chaves:...</p>
            </div>
            <div className="results_on">
                <div className="results__container">
                    <div className="results__cards">
                        {getUserArticles()}

                        {userCards.map((card, index) => {
                            return (
                                <Card
                                    card={card}
                                    // handleSaveCard={props.handleSaveCard}
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