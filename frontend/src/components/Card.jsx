import React, { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import bookmark from '../images/bookmark.png';
import bookmark_black from '../images/bookmark_black.png';
import bookmark_blue from '../images/bookmark_blue.png';

function Card(props) {
    const { isLoggedIn } = React.useContext(CurrentUserContext);
    const [clickedCardIndex, setClickedCardIndex] = useState(null); 

    // Função para renderizar o botão de salvar
    const renderSaveButton = (index) => {
        if (isLoggedIn) {
            // Se o usuário estiver logado, renderiza o botão com a imagem condicional
            return (
                <button
                    className="card__save-button"
                    onClick={() => handleSaveCard(index)}
                    style={{
                        backgroundImage: `url(${clickedCardIndex === index ? bookmark_blue : bookmark_black})`
                    }}
                ></button>
            );
        } else {
            // Se não estiver logado, renderiza a mensagem de login
            return (
                <>
                    {clickedCardIndex === index && (
                        <button className="card__save-message">
                            Faça login para salvar
                        </button>
                    )}
                    <button
                        className="card__save-button"
                        onClick={() => handleSaveButton(index)}
                        style={{
                            backgroundImage: `url(${bookmark})`
                        }}
                    ></button>
                </>
            );
        }
    };

    // Função para lidar com o clique do botão quando não está logado
    const handleSaveButton = (index) => {
        setClickedCardIndex(prevIndex => (prevIndex === index ? null : index));
    };

    // Função para lidar com o clique do botão quando o usuário está logado
    const handleSaveCard = (index) => {
        console.log("Card: ", props.card);
        setClickedCardIndex(prevIndex => (prevIndex === index ? null : index));
        props.handleSaveCard(props.card);
    };

    return (
        <div className="card">
            {renderSaveButton(props.index)}
            <img className="card__image" src={props.image} alt="Imagem do cartão" />
            <div className="card__tag">
                <p className="card__tag-date">
                    {new Date(props.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    })}
                </p>
                <p className="card__tag-title">{props.title}</p>
                <p className="card__tag-description">{props.description}</p>
                <p className="card__tag-source">{props.source}</p>
            </div>
        </div>
    );
}

export default Card;
