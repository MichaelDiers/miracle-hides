import { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component<{ className: string }> {
  

  render() {
    return (
      <header id="headerPage" className={this.props.className}>
        <Link className="logo underline" to="/">
          <span>mhk</span>
          <span>eys</span>
        </Link>
        <h1 translationvalue="headerPage.menuHeadline.textContent">Miracle Hides Keys</h1>
        <div className="mobile-menu-symbol">
          <input id="menuSymbolTrigger" name="menuSymbolTrigger" type="checkbox"></input>
          <div className="icon-font content-menu"></div>
          <div className="icon-font content-close"></div>
        </div>
        <nav className="navbar">
          <ul>
            <li className="asymmetric-color">
              <Link 
                to='/asymmetric'
                id="asymmetricAlgorithmsLink"
                className="menu-link underline"
                translationvalue="headerPage.asymmetricAlgorithms.textContent">
                  asymmetrische Algorithmen
              </Link>              
            </li>
            <li className="symmetric-color">
              <Link
                id="symmetricAlgorithmsLink"
                className="menu-link underline"
                to="/symmetric"
                translationvalue="headerPage.symmetricAlgorithms.textContent">
                  symmetrische Algorithmen
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
