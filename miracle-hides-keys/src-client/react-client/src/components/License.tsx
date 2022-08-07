import { Component } from 'react';
import { CommonTranslation, LicenseTranslation } from './Translations';

interface LicenseProperties {
  common: CommonTranslation;
  translation: LicenseTranslation;
}

const fonts = [
  {
    font: 'Orbitron',
    license: 'Open Font License 1.1',
    author: 'Matt McInerney',
    link: 'https://fonts.google.com/specimen/Orbitron'
  },
  {
    font: 'Ubuntu Condensed',
    license: 'Ubuntu Font License 1.0',
    author: 'Dalton Maag',
    link: 'https://fonts.google.com/specimen/Ubuntu+Condensed'
  }
];

class License extends Component<LicenseProperties> {
  render() {
    return (
      <div>
        <h1>{this.props.common.licenses}</h1>
        <h2>{this.props.translation.licensesNode}</h2>
        <h1>{this.props.translation.licensesFonts}</h1>
        <div className="license-data license-data-fonts">
          <div className="mobile">
            {
              fonts.map(({ font, license, author, link }, i) => {
                return (
                  <div key={`mobile_${i}`}>
                    <div className="header header-mobile">{this.props.translation.fontFont}</div>
                    <div>{font}</div>
                    <div className="header header-mobile">{this.props.translation.fontLicense}</div>
                    <div>{license}</div>
                    <div className="header header-mobile">{this.props.translation.fontAuthor}</div>
                    <div>{author}</div>
                    <div className="header header-mobile">{this.props.translation.fontLink}</div>
                    <div>{link}</div>
                  </div>
                )
              })
            }            
          </div>
          <div className="desktop">
            <div className="header header-desktop">{this.props.translation.fontFont}</div>
            <div className="header header-desktop">{this.props.translation.fontLicense}</div>
            <div className="header header-desktop">{this.props.translation.fontAuthor}</div>
            <div className="header header-desktop">{this.props.translation.fontLink}</div>
            {
              fonts.map(({ font, license, author, link }, i) => {
                return [font, license, author, link].map((entry, j) => {
                  return (<div key={`dektop_${i}_${j}`}>{entry}</div>)
                });
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default License;
