import { Component } from 'react';
import { CommonTranslation, LicenseTranslation } from './Translations';
import REPORT from './license-report';

interface LicenseProperties {
  common: CommonTranslation;
  translation: LicenseTranslation;
}

class License extends Component<LicenseProperties> {
  render() {
    return (
      <div id="licensePage">
        <h1>{this.props.common.licenses}</h1>
        <h2>{this.props.translation.licensesNode}</h2>
        <div className="license-data license-data-node">
          <div className="mobile">
            {
              REPORT.node.map(({
                name,
                link,
                licenseType,
                licensePeriod,
                remoteVersion,
                installedVersion,
                definedVersion,
                author,
                department,
                relatedTo,
                material,
              }, i) => {
                return (
                  <div key={`mobile_${i}`}>
                    <div className="header header-mobile">{this.props.translation.nodeName}</div>
                    <div>{name}</div>
                    <div className="header header-mobile">{this.props.translation.nodeLink}</div>
                    <div>{link}</div>
                    <div className="header header-mobile">{this.props.translation.nodeLicenseType}</div>
                    <div>{licenseType}</div>
                    <div className="header header-mobile">{this.props.translation.nodeLicensePeriod}</div>
                    <div>{licensePeriod}</div>
                    <div className="header header-mobile">{this.props.translation.nodeRemoteVersion}</div>
                    <div>{remoteVersion}</div>
                    <div className="header header-mobile">{this.props.translation.nodeInstalledVersion}</div>
                    <div>{installedVersion}</div>
                    <div className="header header-mobile">{this.props.translation.nodeDefinedVersion}</div>
                    <div>{definedVersion}</div>
                    <div className="header header-mobile">{this.props.translation.nodeAuthor}</div>
                    <div>{author}</div>
                    <div className="header header-mobile">{this.props.translation.nodeDepartment}</div>
                    <div>{department}</div>
                    <div className="header header-mobile">{this.props.translation.nodeRelatedTo}</div>
                    <div>{relatedTo}</div>
                    <div className="header header-mobile">{this.props.translation.nodeMaterial}</div>
                    <div>{material}</div>
                  </div>
                )
              })
            }            
          </div>
          <div className="desktop">
            <div className="header header-desktop">{this.props.translation.nodeName}</div>
            <div className="header header-desktop">{this.props.translation.nodeLink}</div>
            <div className="header header-desktop">{this.props.translation.nodeLicenseType}</div>
            <div className="header header-desktop">{this.props.translation.nodeLicensePeriod}</div>
            <div className="header header-desktop">{this.props.translation.nodeRemoteVersion}</div>
            <div className="header header-desktop">{this.props.translation.nodeInstalledVersion}</div>
            <div className="header header-desktop">{this.props.translation.nodeDefinedVersion}</div>
            <div className="header header-desktop">{this.props.translation.nodeAuthor}</div>
            <div className="header header-desktop">{this.props.translation.nodeDepartment}</div>
            <div className="header header-desktop">{this.props.translation.nodeRelatedTo}</div>
            <div className="header header-desktop">{this.props.translation.nodeMaterial}</div>
            {
              REPORT.node.map(({
                name,
                link,
                licenseType,
                licensePeriod,
                remoteVersion,
                installedVersion,
                definedVersion,
                author,
                department,
                relatedTo,
                material, 
              }, i) => {
                return [
                  name,
                  link,
                  licenseType,
                  licensePeriod,
                  remoteVersion,
                  installedVersion,
                  definedVersion,
                  author,
                  department,
                  relatedTo,
                  material,
                ].map((entry, j) => {
                  return (<div key={`dektop_${i}_${j}`}>{entry}</div>)
                });
              })
            }
          </div>
        </div>

        <h2>{this.props.translation.licensesFonts}</h2>
        <div className="license-data license-data-fonts">
          <div className="mobile">
            {
              REPORT.fonts.map(({ font, license, author, link }, i) => {
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
              REPORT.fonts.map(({ font, license, author, link }, i) => {
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
