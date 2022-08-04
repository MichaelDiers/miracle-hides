import { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer id="footerPage">
        <Link
          className="footer-link"
          view="licensePage"
          to="/licenses"
          translationvalue="commonLanguageSource.licenses.textContent">
            Lizenzen
        </Link>
      </footer>
    );
  }
};

export default Footer;