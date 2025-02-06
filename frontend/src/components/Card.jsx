// import React from "react";
// import CurrentUserContext from "../contexts/CurrentUserContext";
// import bookmark from '../images/bookmark.png';
// import bookmark_black from '../images/bookmark_black.png';

// function Card(props) {

//     const {isLoggedIn} = React.useContext(CurrentUserContext);

    
//     // const isOwn = props.card.owner === currentUser._id;
    
//     // const cardDeleteButtonClassName = (
    
//     // `${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
//     // );

    
//     // const isLiked = props.card.likes.some(i => i === currentUser._id);
    
//     // const cardLikeButtonClassName = (
//     //     `${isLiked ? 'card__tag-like card__tag-like_liked' : 'card__tag-like'}`
//     // );

//     const renderSaveMessage = () => {
//         return (
//             <button className="card__save-message">
//                 Faça login para salvar
//             </button> 
//         )
//     };

//     const renderSaveButton = () => {
//         if(isLoggedIn) {
//             console.log("Logado");
//             return (
//                 <>
//                     <button className="card__save-button" onClick={handleSaveButton}>
//                         <img className="card__save-button_image" src={bookmark} alt="marcador de página" />
//                     </button>
//                 </>
//             )
//         } else {
//             console.log("Não está logado");
//             return (
//                 <>
//                     {/* <button className="card__save-message">
//                         Faça login para salvar
//                     </button> */}
//                     {!isLoggedIn && (<button className="card__save-message">
//                 Faça login para salvar
//             </button> )}
//                     <button className="card__save-button" onClick={renderSaveMessage}>
//                         <img className="card__save-button_image" src={bookmark} alt="marcador de página" />
//                     </button>
//                 </>
//             )
//         }
//     };

//     const handleSaveButton = () => {
//         console.log("Salvar notícia!");
//     };

//     function handleDeleteClick() {
//         props.onCardDelete(props.card);
//     }

//     function handleLikeClick() {
//         props.onCardLike(props.card);
//     }

//     function handleClick() {
//         props.onCardClick(props.card);
//     }
    
//     // return (
//     //     <div className="card" key={props.card._id}>
//     //         <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
//     //         <button className="card__image-link" onClick={handleClick}>
//     //             <img className="card__image" src={props.card.link} alt={props.card.name}/>
//     //         </button>
//     //         <div className="card__tag">
//     //             <p className="card__tag-title">{props.card.name}</p>
//     //             <div className="card__tag-likes">
//     //                 <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
//     //                 <p className="card__tag-like-count">{props.card.likes.length}</p>
//     //             </div>
//     //         </div>
//     //     </div>
//     // )


//     return (
//         <div className="card">
//             {/* <button className="card__save-message">
//                 Faça login para salvar
//             </button>
//             <button className="card__save-button" onClick={renderSaveButton}>
//                 <img className="card__save-button_image" src={bookmark} alt="marcador de página" />
//             </button> */}
//             {renderSaveButton()}
//             {/* <div className="card__tag-likes">
//                 <button className="card__tag-like" onClick={handleLikeClick}></button>
//                 <p className="card__tag-like-count">1</p>
//             </div> */}
//             <img className="card__image" src={props.image} alt="Imagem do cartão"/>
//             <div className="card__tag">
//                 {/* <p className="card__tag-date">{props.date}</p> */}
//                 <p className="card__tag-date">
//                     {new Date(props.date).toLocaleDateString('pt-BR', {
//                         day: '2-digit',
//                         month: 'long',
//                         year: 'numeric'
//                     })}
//                 </p>
//                 <p className="card__tag-title">{props.title}</p>
//                 <p className="card__tag-description">{props.description}</p>
//                 <p className="card__tag-source">{props.source}</p>
//             </div>
//         </div>
//     )
// }

// export default Card;






import React, { useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import bookmark from '../images/bookmark.png';
import bookmark_black from '../images/bookmark_black.png';

function Card(props) {
    const { isLoggedIn } = React.useContext(CurrentUserContext);
    const [clickedCardIndex, setClickedCardIndex] = useState(null); 

    const renderSaveButton = (index) => {
        if (isLoggedIn) {
            return (
                <button className="card__save-button" onClick={handleSaveButton}>
                    {/* <img className="card__save-button_image" src={bookmark} alt="marcador de página" /> */}
                </button>
            );
        } else {
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
                    >
                        {/* <img className="card__save-button_image" src={bookmark} alt="marcador de página" /> */}
                    </button>
                </>
            );
        }
    };

    const handleSaveButton = (index) => {
        setClickedCardIndex(prevIndex => (prevIndex === index ? null : index));
    };

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleClick() {
        props.onCardClick(props.card);
    }

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
