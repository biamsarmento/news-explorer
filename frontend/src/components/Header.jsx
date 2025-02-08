// import { useNavigate, useLocation } from "react-router-dom";
// import CurrentUserContext from '../contexts/CurrentUserContext';
// import { useContext } from 'react';
// import { removeToken } from '../utils/token';
// import signout_black from '../images/logout_black.png';
// import signout_white from '../images/logout_white.png';
// import menu_mobile from '../images/menu_mobile.png';
// import menu_mobile_black from '../images/menu_mobile_black.png';

// function Header(props) {

//     const { isLoggedIn, setIsLoggedIn, currentUser, setUserCards } = useContext(CurrentUserContext);
//     const navigate = useNavigate();
//     const location = useLocation();

//     function signOut() {
//         removeToken();
//         setUserCards([]);
//         navigate("/");
//         setIsLoggedIn(false);
//     } 

//     const handleVerticalMenu = () => {

//     }

//     const renderLogo = () => {
//         if (location.pathname === '/my-articles') {
//             return (
//                 <>
//                 <button className='header__logo nav__black'>News Explorer</button>
//                 </>
//             );
//         } else {
//             return (
//                 <>
//                 <button className='header__logo'>News Explorer</button>
//                 </>
//             );
//         } 
//     };

//     const renderNav = () => {        
//         if (location.pathname === '/my-articles') {
//             if (window.innerWidth < 680) {
//                 return (
//                     <>
//                     <button className='nav__my-articles nav__my-articles_mobile'
//                     style={{
//                         backgroundImage:  `url(${menu_mobile_black})`
//                       }}
//                     >
//                     onClick={handleVerticalMenu}
//                     </button>
//                     </>
//                 );
//             } else {
//                 return (
//                     <>
//                     <button className='nav__inicio nav__black' onClick={() => navigate('/')}>Home</button>
//                     <button className='nav__my-articles nav__marcador_black nav__black'>Saved Articles</button>
//                     <button 
//                     className="nav__signout_black"
//                     onClick={signOut}
//                     >
//                         <p className='nav__user_black'>{currentUser.username}</p>
//                         <img
//                             src={signout_black}
//                             alt="signout sign"
//                             className="nav__signout-sign"
//                         /> 
//                     </button>
//                     </>
//                 );
//             }
//         } else if(isLoggedIn) {
//             if (window.innerWidth < 680) {
//                 return (
//                     <>
//                     <button 
//                     className='nav__my-articles nav__my-articles_mobile'
//                     style={{
//                       backgroundImage: `url(${menu_mobile})`
//                     }}
//                     >
//                     </button>
//                     </>
//                 );
//             } else {

//                 return (
//                     <>
//                     <button className='nav__inicio nav__marcador' onClick={() => navigate('/')} >Home</button>
//                     <button className='nav__my-articles' onClick={() => navigate('/my-articles')}>Saved Articles</button>
//                     <button 
//                     className="nav__signout"
//                     onClick={signOut}
//                     >
//                         <p className='nav__user'>{currentUser.username}</p>
//                         <img
//                             src={signout_white}
//                             alt="signout sign"
//                             className="nav__signout-sign"
//                         /> 
//                     </button>
//                     </>
//                 );
//             }
//         } else {
//             if (window.innerWidth < 680) {
//                 return (
//                     <>
//                     <button 
//                     className='nav__my-articles nav__my-articles_mobile'
//                     style={{
//                       backgroundImage: `url(${menu_mobile})`
//                     }}
//                     >
//                     </button>
//                     </>
//                 );
//             } else {
//                 return (
//                     <>
//                     <button className='nav__inicio nav__marcador' >Home</button>
//                     <button className="nav__signin" onClick={props.onEditProfileClick}>Sign in</button>
//                     </>
//                 );
//             }    
//         }
//     };


//     return (
//         <header className="header">
//             <div className="header__content">
//                 {renderLogo()}
//                 <nav className="nav">
//                     {renderNav()}
//                 </nav>
//             </div>
//             <div className="header__line"></div>
//         </header>
//     )
// }

// export default Header;


import { useNavigate, useLocation } from "react-router-dom";
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext, useState } from 'react';
import { removeToken } from '../utils/token';
import signout_black from '../images/logout_black.png';
import signout_white from '../images/logout_white.png';
import menu_mobile from '../images/menu_mobile.png';
import menu_mobile_black from '../images/menu_mobile_black.png';

function Header(props) {

    const { isLoggedIn, setIsLoggedIn, currentUser, setUserCards } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar menu

    function signOut() {
        removeToken();
        setUserCards([]);
        navigate("/");
        setIsLoggedIn(false);
    } 

    const handleVerticalMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Alterna entre abrir e fechar
    }

    const renderLogo = () => {
        return (
            <button className={`header__logo ${location.pathname === '/my-articles' ? 'nav__black' : ''}`}>
                News Explorer
            </button>
        );
    };

    const renderNav = () => {        
        if (location.pathname === '/my-articles') {
            if (window.innerWidth < 680) {
                return (
                    <>
                        <button 
                            className='nav__my-articles nav__my-articles_mobile'
                            style={{ backgroundImage: `url(${menu_mobile_black})` }}
                            onClick={handleVerticalMenu}
                        />
                    </>
                );
            } else {
                return (
                    <>
                        <button className='nav__inicio nav__black' onClick={() => navigate('/')}>Home</button>
                        <button className='nav__my-articles nav__marcador_black nav__black'>Saved Articles</button>
                        <button className="nav__signout_black" onClick={signOut}>
                            <p className='nav__user_black'>{currentUser.username}</p>
                            <img src={signout_black} alt="signout sign" className="nav__signout-sign" />
                        </button>
                    </>
                );
            }
        } else if (isLoggedIn) {
            if (window.innerWidth < 680) {
                return (
                    <>
                        <button 
                            className='nav__my-articles nav__my-articles_mobile'
                            style={{ backgroundImage: `url(${menu_mobile})` }}
                            onClick={handleVerticalMenu}
                        />
                    </>
                );
            } else {
                return (
                    <>
                        <button className='nav__inicio nav__marcador' onClick={() => navigate('/')}>Home</button>
                        <button className='nav__my-articles' onClick={() => navigate('/my-articles')}>Saved Articles</button>
                        <button className="nav__signout" onClick={signOut}>
                            <p className='nav__user'>{currentUser.username}</p>
                            <img src={signout_white} alt="signout sign" className="nav__signout-sign" />
                        </button>
                    </>
                );
            }
        } else {
            if (window.innerWidth < 680) {
                return (
                    <>
                        <button 
                            className='nav__my-articles nav__my-articles_mobile'
                            style={{ backgroundImage: `url(${menu_mobile})` }}
                            onClick={handleVerticalMenu}
                        />
                    </>
                );
            } else {
                return (
                    <>
                        <button className='nav__inicio nav__marcador'>Home</button>
                        <button className="nav__signin" onClick={props.onEditProfileClick}>Sign in</button>
                    </>
                );
            }    
        }
    };

    return (
        <>
            <header className="header">
                <div className="header__content">
                    {renderLogo()}
                    <nav className="nav">
                        {renderNav()}
                    </nav>
                </div>
                <div className="header__line"></div>
            </header>
            {isMenuOpen && (
                <div className="vertical-menu">
                    <div className="vertical-menu__items">
                        <div className="vertical-menu__items_nav">
                            <button 
                            className='nav__my-articles nav__my-articles_mobile vertical-menu__items_mobile-btn'
                            style={{ backgroundImage: `url(${menu_mobile})` }}
                            onClick={handleVerticalMenu}
                            />
                            <button className={`header__logo`}>
                                News Explorer
                            </button>
                        </div> 
                    <button className='nav__inicio vertical-menu__items_home' onClick={() => navigate('/')}>Home</button>
                        {isLoggedIn && (
                            <>
                                <button className='nav__my-articles vertical-menu__items_my-articles' onClick={() => navigate('/my-articles')}>Saved Articles</button>
                                <button className="nav__signout vertical-menu__items_signout" onClick={signOut}>
                                    <p className='nav__user'>{currentUser.username}</p>
                                    <img src={signout_white} alt="signout sign" className="nav__signout-sign" />
                                </button>
                            </>
                        )}
                        {!isLoggedIn && (
                            <button className="nav__signin vertocal-menu__items_signin" onClick={props.onEditProfileClick}>Sign in</button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
