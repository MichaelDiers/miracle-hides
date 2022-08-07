import { Component } from 'react';
import { Link } from 'react-router-dom';
import { CommonTranslation } from './Translations';

interface FooterProperties {
  common: CommonTranslation;
}

class Footer extends Component<FooterProperties> {
  render() {
    return (
      <footer>
        <Link
          className="footer-link underline"
          to="/licenses">
            {this.props.common.licenses}
        </Link>
      </footer>
    );
  }
};

export default Footer;
