import { Component } from 'react';
import { CustomEventRaiser } from '../custom-event-handler';

class SideMenu extends Component {
  render() {
    return (
      <div className="side-menu" id="sideMenuPage">
        <button className="button side-menu-theme" onClick={CustomEventRaiser.raiseToggleTheme}></button>
        <button className="button side-menu-language" translationvalue="sideMenuPage.en.textContent">English</button>
      </div>
    );
  }
}

export default SideMenu;
