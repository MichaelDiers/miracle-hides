import { LicenseLanguageKeys } from '../src-client/plain/js/translations/language-license';
import HtmlComponents from '../src-client/plain/js/pages/html-components';

const json = process.argv[2];
const data = require(json);

const source = 'licensePage';
const html = data.map(({
  department,
  relatedTo,
  name,
  licensePeriod,
  material,
  licenseType,
  link,
  remoteVersion,
  installedVersion,
  definedVersion,
  author,
}) => {
  return [
    department,
    relatedTo,
    name,
    licensePeriod,
    material,
    licenseType,
    link,
    remoteVersion,
    installedVersion,
    definedVersion,
    author
  ].map((text) => HtmlComponents.div({ content: [text] })).join('');
}).join('');

const header = [
  LicenseLanguageKeys.NODE_DEPARTMENT,    
    LicenseLanguageKeys.NODE_RELATED_TO,
    LicenseLanguageKeys.NODE_NAME,
    LicenseLanguageKeys.NODE_LICENSE_PERIOD,
    LicenseLanguageKeys.NODE_MATERIAL,
    LicenseLanguageKeys.NODE_LICENSE_TYPE,
    LicenseLanguageKeys.NODE_LINK,
    LicenseLanguageKeys.NODE_REMOTE_VERSION,
    LicenseLanguageKeys.NODE_INSTALLED_VERSION,
    LicenseLanguageKeys.NODE_DEFINED_VERSION,
    LicenseLanguageKeys.NODE_AUTHOR,
].map((text) => HtmlComponents.div({ source, text, css: ['header'] })).join('');

const licenseDataNode = `export const LICENSE_DATA_NODE = '<div class="license-data license-data-node">${header}${html}</div>';`;

const fonts = [
  [
    'Orbitron',
    'Open Font License 1.1',
    'Matt McInerney',
    'https://fonts.google.com/specimen/Orbitron'
  ],
  [
    'Ubuntu Condensed',
    'Ubuntu Font License 1.0',
    'Dalton Maag',
    'https://fonts.google.com/specimen/Ubuntu+Condensed'
  ]
].map((element) => element.map((elem) => `<div>${elem}</div>`).join('')).join('');

const fontsHeader = [
  LicenseLanguageKeys.FONT_FONT,
  LicenseLanguageKeys.FONT_LICENSE,
  LicenseLanguageKeys.FONT_AUTHOR,
  LicenseLanguageKeys.FONT_LINK
].map((text) => HtmlComponents.div({ source, text, css: ['header']})).join('');
const licenseDataFonts = `export const LICENSE_DATA_FONTS = '<div class="license-data license-data-fonts">${fontsHeader}${fonts}</div>';`;

[licenseDataFonts, licenseDataNode].forEach((data) => {
  console.log(data.replace(/[\r\n]/ig, '')
    .replace(/[ ]{2,}/ig, ' ')
    .replace(/ ?> ?/ig, '>')
    .replace(/ </ig, '<')
    .replace(/'header'/ig, '"header"')
    .replace(/='/ig, '="')
    .replace(/'>/ig, '">'));
});
