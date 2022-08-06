import { Component } from 'react';
import { Link } from 'react-router-dom';
import { CommonTranslation, HeaderTranslation } from './Translations';

interface HeaderProperties {
  common: CommonTranslation;
  translation: HeaderTranslation;
}

class Header extends Component<HeaderProperties> {
  render() {
    return (
      <header id="headerPage">
        <Link className="logo underline" to="/">
          <span>mhk</span>
          <span>eys</span>
        </Link>
        <h1>{this.props.common.miracleHidesKeys}</h1>
        <div className="mobile-menu-symbol">
          <input
            id="menuSymbolTrigger"
            name="menuSymbolTrigger"
            type="checkbox"
          ></input>
          <div className="icon-font content-menu"></div>
          <div className="icon-font content-close"></div>
        </div>
        <nav className="navbar">
          <ul>
            <li className="asymmetric-color">
              <Link 
                to='/asymmetric'
                id="asymmetricAlgorithmsLink"
                className="menu-link underline">
                  {this.props.translation.asymmetricAlgorithms}
              </Link>              
            </li>
            <li className="symmetric-color">
              <Link
                id="symmetricAlgorithmsLink"
                className="menu-link underline"
                to="/symmetric">
                  {this.props.translation.symmetricAlgorithms}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
