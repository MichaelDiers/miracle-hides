import { Component } from 'react';
import { CommonTranslation } from './Translations';

interface SideMenuProperties {
  common: CommonTranslation;
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

class SideMenu extends Component<SideMenuProperties> {
  render() {
    return (
      <div className="side-menu" id="sideMenuPage">
        <button
          className="button side-menu-theme"
          onClick={this.props.toggleTheme}>
        </button>
        <button
          className="button side-menu-language"
          onClick={this.props.toggleLanguage}>
            {this.props.common.language}
        </button>
      </div>
    );
  }
}

export default SideMenu;
