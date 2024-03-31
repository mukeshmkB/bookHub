import {FaInstagram, FaGoogle, FaYoutube, FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icon-container">
      <FaGoogle size={22} style={{marginLeft: '20px'}} />
      <FaTwitter size={22} style={{marginLeft: '20px'}} />
      <FaInstagram size={22} style={{marginLeft: '20px'}} />
      <FaYoutube size={22} style={{marginLeft: '20px'}} />
    </div>
    <p className="contact">Contact Us</p>
  </div>
)
export default Footer
