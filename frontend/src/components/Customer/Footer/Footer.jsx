import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.scss';

function Footer(props) {
  const location = useLocation();
  const arrayNoneFooter = ['/search', '/login', '/register', '/profile', '/checkout'];
  const isNone = arrayNoneFooter.includes(location.pathname);

  return (
    <div className={`footer ${isNone && 'd-none'}`}>
        <div className='boder'></div>
      <footer className="footer bg-white text-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5>Contact</h5>
              <p>Email: contact@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              <div className="social-media mb-3">
                <h5>Social Media</h5>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="#">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center py-3">
          <p>&copy; 2023 PetShop.VN.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
