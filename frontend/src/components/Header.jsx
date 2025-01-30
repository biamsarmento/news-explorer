import logo from '../images/Vector.svg';
import { useNavigate, useLocation } from "react-router-dom";
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import { removeToken } from '../utils/token';

function Header() {

    const { setIsLoggedIn, userData } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const location = useLocation();

    function signOut() {
        removeToken();
        navigate("/signin");
        setIsLoggedIn(false);
    } 

    const renderNav = () => {        
        if (location.pathname === '/my-articles') {
            return (
                <>
                <button className='nav__inicio'>Início</button>
                <button className='nav__my-articles nav__marcador'>Artigos Salvos</button>
                </>
            );
        } else {
            return (
                <>
                <button className='nav__inicio nav__marcador'>Início</button>
                </>
            );
        } 
    };


    return (
        <header className="header">
            <div className="header__content">
                <button className='header__logo'>News Explorer</button>
                <nav className="nav">
                    {renderNav()}
                    <button className="nav__signin">Entrar</button>
                    {/* <a className="nav__logo-link" href="#">
                    <img
                        src={logo}
                        alt="Logo Around The US"
                        className="nav__logo"
                    /> 
                    </a>
                    {renderNav()} */}
                </nav>
            </div>
            <div className="header__line"></div>
        </header>
    )
}

export default Header;