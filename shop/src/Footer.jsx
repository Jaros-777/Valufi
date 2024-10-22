import Logo from "./NavBar/Assets/VALUFI.png"
import FacebookLogo from "./Assets/icon-facebook.png"
import InstagramLogo from "./Assets/icon-instagram.png"
import "./Footer.scss"

function Footer(){

    return(
        <>
            <div id="footer-container">
                <div id="footer-left">
                    <div id="shop-name">
                    <img src={Logo} alt="Logo" />
                    <p>Valufi</p>
                    </div>
                    <div id="media">
                        <img src={FacebookLogo} alt="FacebookLogo" />
                        <img src={InstagramLogo} alt="InstagramLogo" />
                    </div>
                    
                </div>
                <div id="footer-right">
                    <p>Contact</p>
                    <p>+48 123 456 789</p>
                    <p>yourEmail@mail.com</p>
                </div>
            </div>
        </>
    )
}

export default Footer