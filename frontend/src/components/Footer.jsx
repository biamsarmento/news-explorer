import fb from '../images/fb.png';
import git from '../images/github.png';
import { useNavigate } from 'react-router-dom';

function Footer() {

    const navigate = useNavigate();

    return (
        <footer className="footer" id="footer">
            <div className="footer__copyright">
                <p className="footer__copyright-text">&#169; 2021 Supersite, developed by News API</p>
            </div> 
            <div className="footer__info">
                <button onClick={() => navigate('/')}  className="footer__info_main">Home</button>
                <p className="footer__info_triple">TipleTen</p>
                <div className="footer__info_socials">
                    <img src={git} alt="logo github" />
                    <img src={fb} alt="logo fb" />
                </div>
            </div> 
        </footer>
    )
}

export default Footer;