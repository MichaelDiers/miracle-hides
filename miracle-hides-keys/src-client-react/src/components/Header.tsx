import { ChangeEvent, Component } from 'react';
import { Link } from 'react-router-dom';
import Css from '../css';
import { CommonTranslation, HeaderTranslation } from './Translations';

const linkData = [
  {
    className: 'asymmetric-color',
    to: '/asymmetric',
    id: 'asymmetricAlgorithmsLink',
    label: 'asymmetricAlgorithms',        
  },
  {
    className: 'symmetric-color',
    to: '/symmetric',
    id: 'symmetricAlgorithmsLink',
    label: 'symmetricAlgorithms',
  },
];

interface HeaderProperties {
  common: CommonTranslation;
  translation: HeaderTranslation;
  isNavbarOpen: boolean;
  toggleNavbarOpen: (isOpen: boolean) => void;
}

class Header extends Component<HeaderProperties> {
  constructor(props: HeaderProperties) {
    super(props);

    this.linkClicked = this.linkClicked.bind(this);
  }

  render() {
    return (
      <header className={this.props.isNavbarOpen ? Css.NAVBAR_ACTIVE : ''}>
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
            checked={this.props.isNavbarOpen}
            onChange={(event: ChangeEvent<HTMLInputElement>) => this.props.toggleNavbarOpen(event.target.checked)}
          ></input>
          <div className="icon-font content-menu"></div>
          <div className="icon-font content-close"></div>
        </div>
        <nav className="navbar">
          <ul>
            {
              linkData.map(({ className, id, label, to }, i) => {
                return (
                  <li className={className} key={i}>
                    <Link
                      className='menu-link underline'
                      id={id}
                      to={to}
                      onClick={this.linkClicked}
                    >
                      {this.props.translation[label]}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </header>
    );
  }

  private linkClicked() {
    this.props.toggleNavbarOpen(false);
  }
}

export default Header;
