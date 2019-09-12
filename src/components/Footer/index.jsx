import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="site-footer">
          <div className="container">
            <div className="row gap-y align-items-center">
              <div className="col-12 col-lg-6 offset-lg-3">
                <ul className="nav nav-primary nav-hero">
                  <li className="nav-item">
                    <Link className="nav-link" to='/'>Bloggel</Link>
                  </li>
                </ul>
                <div className="d-flex align-items-center justify-content-center">
                    <o className="footer-p ">A site for insightful thoughts</o>
                </div>
              </div>
            </div>
          </div>
        </footer>
      );
}

export default Footer;