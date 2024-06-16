import React from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logoImage from '../Logo/postnord.png';
import paypal from '../Logo/paypal.png';

const social = [
  {
    icon: <FacebookIcon style={{ fontSize: '64px' }} />,
    href: "#"
  },
  {
    icon: <InstagramIcon style={{ fontSize: '64px' }} />,
    href: "#"
  },
  {
    icon: <WhatsAppIcon style={{ fontSize: '64px' }} />,
    href: "#"
  },
  {
    icon: <YouTubeIcon style={{ fontSize: '64px' }} />,
    href: "#"
  },
];

const Footer = () => {
  const navigate = useNavigate();  // Updated hook

  const generalInfoRoute = "/About"; 

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <footer>
      <div id="footer-items">
        <div className="footer-item">
          <h4>Contact us</h4>
          <ul>
            <li>
              Phone: +46 72 84 29 733
            </li>
            <li>
              Address: Ankdammsgatan 38, Stockholm, SE
            </li>
            <li><a href="#" onClick={() => handleNavigation("/Contact")}>Contact</a></li>
          </ul>
        </div>

        <div className="footer-item-socialmedia">
          <h4>Social media</h4>
          {social.map((s, i) => (
            <a href={s.href} key={s.href + i} target="_blank" rel="noopener noreferrer">
              {s.icon}
            </a>
          ))}
        </div>

        <div className="footer-item">
          <h4>General information</h4>
          <ul>
            <li><a href="#" onClick={() => handleNavigation(generalInfoRoute)}>Shipping</a></li>
            <li><a href="#" onClick={() => handleNavigation("/About")}>Returns</a></li>
            <li><a href="#" onClick={() => handleNavigation("/About")}>Payment system</a></li>
          </ul>
        </div>

        <div className="footer-item">
          {/* <h4>Payment and Delivery Services</h4> */}
          <img src={paypal} alt="PayPal" style={{ width: '90px', height: 'auto', marginBottom: '10px' }} />
          <img src={logoImage} alt="PostNord" style={{ width: '110px', height: 'auto', marginBottom: '10px' }} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;