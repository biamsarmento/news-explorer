import React, { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import bookmark from '../images/bookmark.png';
import bookmark_black from '../images/bookmark_black.png';
import bookmark_blue from '../images/bookmark_blue.png';
import trash from '../images/trash.png';
import trash_black from '../images/trash_black.png';
import { useLocation } from "react-router-dom";

function Article(props) {
    const { isLoggedIn, userCards } = React.useContext(CurrentUserContext);
    const [clickedCardIndex, setClickedCardIndex] = useState(null);
    const [hoveredSaveButton, setHoveredSaveButton] = useState(null);
    const [hoveredTrashButton, setHoveredTrashButton] = useState(null);

    const location = useLocation();

    const renderSaveButton = (index) => {
        if (isLoggedIn) {
            if (location.pathname === '/my-articles') {
                return (
                    <>
                        {hoveredTrashButton === index && (
                            <button className="article__save-message">
                                Remove from saved
                            </button>
                        )}
                        <button
                            className="article__save-button"
                            onClick={() => props.handleCardDelete(userCards[index])}
                            style={{
                                backgroundImage: `url(${hoveredTrashButton === index ? trash_black : trash})`,
                            }}
                            onMouseEnter={() => setHoveredTrashButton(index)}
                            onMouseLeave={() => setHoveredTrashButton(null)}
                        ></button>
                    </>
                );
            } else {
                return (
                    <button
                        className="article__save-button"
                        onClick={() => handleSaveCard(index)}
                        style={{
                            backgroundImage: `url(${clickedCardIndex === index ? bookmark_blue : bookmark_black})`
                        }}
                    ></button>
                );
            }
        } else {
            return (
                <>
                    {hoveredSaveButton === index && (
                        <button className="article__save-message">
                            Sign in to save articles
                        </button>
                    )}
                    <button
                        className="article__save-button"
                        onClick={() => handleSaveButton(index)}
                        style={{
                            backgroundImage: `url(${hoveredSaveButton === index ? bookmark_black : bookmark})`
                        }}
                        onMouseEnter={() => setHoveredSaveButton(index)}
                        onMouseLeave={() => setHoveredSaveButton(null)}
                    ></button>
                </>
            );
        }
    };

    const handleSaveButton = (index) => {
        setClickedCardIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const handleSaveCard = (index) => {
        setClickedCardIndex(prevIndex => (prevIndex === index ? null : index));
        props.handleSaveCard(props.card);
    };

    return (
        <div className="article">
            {renderSaveButton(props.index)}
            <img className="article__image" src={props.image} alt="Article ilustration" />
            <div className="article__tag">
                <p className="article__tag-date">
                    {new Date(props.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric'
                    })}
                </p>
                <p className="article__tag-title">{props.title}</p>
                <p className="article__tag-description">{props.description}</p>
                <p className="article__tag-source">{props.source}</p>
            </div>
        </div>
    );
}

export default Article;
