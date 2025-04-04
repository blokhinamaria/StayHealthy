import React from 'react';
import './Footer.css';



const Footer = () => {

    const handleLink = () => {
        window.alert('The page is not available yet. Check back soon!');

    }
    return (
        <footer className="footer">
            <div className='footer-content'>
                <div className='footer-container'>
                    <h3>StayHealthy Inc.</h3>
                    <p className='medium-body'>Bringing healthcare closer to communities</p>
                </div>
                <div className="footer-links">
                        <a className='footer-link' onClick={handleLink}>About Us</a>
                        <a className='footer-link' onClick={handleLink}>Services</a>
                        <a className='footer-link' onClick={handleLink}>FAQ</a>
                        <a className='footer-link' onClick={handleLink}>Contact Us</a>
                        <a className='footer-link' onClick={handleLink}>Privacy Policy</a>
                        <a className='footer-link' onClick={handleLink}>Terms of Service</a>
                </div>
                <div className='footer-container'>
                        <h4>Follow Us</h4>
                        <div>
                        <img className='social-icon' src='./assets/socials/Facebook.png'/>
                        <img className='social-icon' src='./assets/socials/Instagram.png'/>
                        <img className='social-icon' src='./assets/socials/LinkedIn.png'/>
                        <img className='social-icon' src='./assets/socials/X.png'/>
                        </div>
                </div>
            </div>
                <div>
                    <p className='medium-body'>&copy; 2025 StayHealthy. All rights reserved.</p>
                </div>
            
        </footer>
    );
};

export default Footer;
