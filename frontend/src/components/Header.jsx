import { useNavigate, useLocation } from "react-router-dom";
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import { removeToken } from '../utils/token';
import signout_black from '../images/logout_black.png';
import signout_white from '../images/logout_white.png';
import menu_mobile from '../images/menu_mobile.png';
import menu_mobile_black from '../images/menu_mobile_black.png';

function Header(props) {

    const { isLoggedIn, setIsLoggedIn, currentUser, setUserCards } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const location = useLocation();

    function signOut() {
        removeToken();
        setUserCards([]);
        navigate("/");
        setIsLoggedIn(false);
    } 

    const renderLogo = () => {
        if (location.pathname === '/my-articles') {
            return (
                <>
                <button className='header__logo nav__black'>News Explorer</button>
                </>
            );
        } else {
            return (
                <>
                <button className='header__logo'>News Explorer</button>
                </>
            );
        } 
    };

    const renderNav = () => {        
        if (location.pathname === '/my-articles') {
            if (window.innerWidth < 680) {
                return (
                    <>
                    <button className='nav__my-articles nav__my-articles_mobile'
                    style={{
                        backgroundImage:  `url(${menu_mobile_black})`
                      }}
                    >
                        {/* <img src={menu_mobile_black} alt="menu simbolo" /> */}
                    </button>
                    </>
                );
            } else {
                return (
                    <>
                    <button className='nav__inicio nav__black' onClick={() => navigate('/')}>Home</button>
                    <button className='nav__my-articles nav__marcador_black nav__black'>Saved Articles</button>
                    <button 
                    className="nav__signout_black"
                    onClick={signOut}
                    >
                        <p className='nav__user_black'>{currentUser.username}</p>
                        <img
                            src={signout_black}
                            alt="signout sign"
                            className="nav__signout-sign"
                        /> 
                    </button>
                    </>
                );
            }
        } else if(isLoggedIn) {
            if (window.innerWidth < 680) {
                return (
                    <>
                    <button 
                    className='nav__my-articles nav__my-articles_mobile'
                    style={{
                      backgroundImage: `url(${menu_mobile})`
                    }}
                    >
                    </button>
                    </>
                );
            } else {

                return (
                    <>
                    <button className='nav__inicio nav__marcador' onClick={() => navigate('/')} >Home</button>
                    <button className='nav__my-articles' onClick={() => navigate('/my-articles')}>Saved Articles</button>
                    <button 
                    className="nav__signout"
                    onClick={signOut}
                    >
                        <p className='nav__user'>{currentUser.username}</p>
                        <img
                            src={signout_white}
                            alt="signout sign"
                            className="nav__signout-sign"
                        /> 
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
                    style={{
                      backgroundImage: `url(${menu_mobile})`
                    }}
                    >
                    </button>
                    </>
                );
            } else {
                return (
                    <>
                    <button className='nav__inicio nav__marcador' >Home</button>
                    <button className="nav__signin" onClick={props.onEditProfileClick}>Sign in</button>
                    </>
                );
            }    
        }
    };


    return (
        <header className="header">
            <div className="header__content">
                {renderLogo()}
                <nav className="nav">
                    {renderNav()}
                </nav>
            </div>
            <div className="header__line"></div>
        </header>
    )
}

export default Header;