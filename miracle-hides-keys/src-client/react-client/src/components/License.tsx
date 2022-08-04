import { Component } from 'react';
import { CustomEventRaiser } from '../custom-event-handler';

class License extends Component {
  componentDidMount() {
    CustomEventRaiser.raiseShowHeader();
  }

  render() {
    return (
      <div>
        <h1 translationvalue="licensePage.licenses.textContent">Lizenzen</h1>
        <h2 translationvalue="licensePage.licensesNode.textContent">Bibliotheken</h2>
        <h1 translationvalue="licensePage.licensesFonts.textContent">Schriftarten</h1>
        <div className="license-data license-data-fonts">
          <div className="mobile">
            <div>
              <div className="header header-mobile" translationvalue="licensePage.fontFont.textContent">Schrift</div>
              <div>Orbitron</div>
              <div className="header header-mobile" translationvalue="licensePage.fontLicense.textContent">Lizenz</div>
              <div>Open Font License 1.1</div>
              <div className="header header-mobile" translationvalue="licensePage.fontAuthor.textContent">Autor</div>
              <div>Matt McInerney</div>
              <div className="header header-mobile" translationvalue="licensePage.fontLink.textContent">Link</div>
              <div>https://fonts.google.com/specimen/Orbitron</div>
            </div>
          <div>
          <div className="header header-mobile" translationvalue="licensePage.fontFont.textContent">Schrift</div>
          <div>Ubuntu Condensed</div>
            <div className="header header-mobile" translationvalue="licensePage.fontLicense.textContent">Lizenz</div>
            <div>Ubuntu Font License 1.0</div>
            <div className="header header-mobile" translationvalue="licensePage.fontAuthor.textContent">Autor</div>
            <div>Dalton Maag</div>
            <div className="header header-mobile" translationvalue="licensePage.fontLink.textContent">Link</div>
            <div>https://fonts.google.com/specimen/Ubuntu+Condensed</div>
          </div>
        </div>
        <div className="desktop">
          <div className="header header-desktop" translationvalue="licensePage.fontFont.textContent">Schrift</div>
          <div className="header header-desktop" translationvalue="licensePage.fontLicense.textContent">Lizenz</div>
          <div className="header header-desktop" translationvalue="licensePage.fontAuthor.textContent">Autor</div>
          <div className="header header-desktop" translationvalue="licensePage.fontLink.textContent">Link</div>
          <div>Orbitron</div>
          <div>Open Font License 1.1</div>
          <div>Matt McInerney</div>
          <div>https://fonts.google.com/specimen/Orbitron</div>
          <div>Ubuntu Condensed</div>
          <div>Ubuntu Font License 1.0</div>
          <div>Dalton Maag</div>
          <div>https://fonts.google.com/specimen/Ubuntu+Condensed</div>
        </div>
      </div>
      </div>
    );
  }
}

export default License;
