import fb from '../images/fb.png';
import git from '../images/github.png';

function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="footer__copyright">
                <p className="footer__copyright-text">&#169; 2021 Supersite, desenvolvido pela News API</p>
            </div> 
            <div className="footer__info">
                <button className="footer__info_main">Início</button>
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