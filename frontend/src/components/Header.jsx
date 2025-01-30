import { useNavigate, useLocation } from "react-router-dom";
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import { removeToken } from '../utils/token';
import signout_black from '../images/logout_black.png';
import signout_white from '../images/logout_white.png';

function Header(props) {

    const { isLoggedIn, setIsLoggedIn, userData } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const location = useLocation();

    function signOut() {
        removeToken();
        navigate("/signin");
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
            return (
                <>
                <button className='nav__inicio nav__black' onClick={() => navigate('/')}>Início</button>
                <button className='nav__my-articles nav__marcador_black nav__black'>Artigos Salvos</button>
                <button className="nav__signout_black">
                    <p className='nav__user_black'>Elise</p>
                    <img
                        src={signout_black}
                        alt="signout sign"
                        className="nav__signout-sign"
                    /> 
                </button>
                </>
            );
        } else if(isLoggedIn) {
            return (
                <>
                <button className='nav__inicio nav__marcador' onClick={() => navigate('/')} >Início</button>
                <button className='nav__my-articles' onClick={() => navigate('/my-articles')}>Artigos Salvos</button>
                <button className="nav__signout">
                    <p className='nav__user'>Elise</p>
                    <img
                        src={signout_white}
                        alt="signout sign"
                        className="nav__signout-sign"
                    /> 
                </button>
                </>
            );
        } else {
            return (
                <>
                <button className='nav__inicio nav__marcador' >Início</button>
                <button className="nav__signin" onClick={props.onEditProfileClick}>Entrar</button>
                </>
            );
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