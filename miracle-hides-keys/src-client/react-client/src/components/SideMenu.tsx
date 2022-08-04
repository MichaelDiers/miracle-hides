import { Component } from 'react';
import { CustomEventRaiser } from '../infrastructure/custom-event-handler';
import { CommonTranslation } from './Translations';

interface SideMenuProperties {
  common: CommonTranslation;
}

class SideMenu extends Component<SideMenuProperties> {
  render() {
    return (
      <div className="side-menu" id="sideMenuPage">
        <button
          className="button side-menu-theme"
          onClick={CustomEventRaiser.raiseToggleTheme}>
        </button>
        <button
          className="button side-menu-language"
          onClick={CustomEventRaiser.raiseToggleLanguage}>
            {this.props.common.language}
        </button>
      </div>
    );
  }
}

export default SideMenu;
