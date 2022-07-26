import { LicenseLanguageKeys } from '../src-client/plain/js/translations/language-license';
import HtmlComponents from '../src-client/plain/js/pages/html-components';

const json = process.argv[2];
const nodeData = require(json);

const keys = {
  name: 'name',
  link: 'link',
  licenseType: 'licenseType',
  licensePeriod: 'licensePeriod',
  remoteVersion: 'remoteVersion',
  installedVersion: 'installedVersion',
  definedVersion: 'definedVersion',
  author: 'author',
  department: 'department',
  relatedTo: 'relatedTo',  
  material: 'material'
};

const headerMap = {
  [keys.department]: LicenseLanguageKeys.NODE_DEPARTMENT,
  [keys.relatedTo]: LicenseLanguageKeys.NODE_RELATED_TO,
  [keys.name]: LicenseLanguageKeys.NODE_NAME,
  [keys.licensePeriod]: LicenseLanguageKeys.NODE_LICENSE_PERIOD,
  [keys.material]: LicenseLanguageKeys.NODE_MATERIAL,
  [keys.licenseType]: LicenseLanguageKeys.NODE_LICENSE_TYPE,
  [keys.link]: LicenseLanguageKeys.NODE_LINK,
  [keys.remoteVersion]: LicenseLanguageKeys.NODE_REMOTE_VERSION,
  [keys.installedVersion]: LicenseLanguageKeys.NODE_INSTALLED_VERSION,
  [keys.definedVersion]: LicenseLanguageKeys.NODE_DEFINED_VERSION,
  [keys.author]: LicenseLanguageKeys.NODE_AUTHOR,
};

const source = 'licensePage';
const nodeHtmlDesktop = [];
const nodeHtmlMobile = [];

nodeData.forEach((entry, index) => {
  const mobile = [];
  const desktop = [[], []];
  const cssMobile = ['header', 'header-mobile'];
  const cssDesktop = ['header', 'header-desktop'];

  Object.keys(keys).forEach((key) => {
    mobile.push(HtmlComponents.div({ css: cssMobile, source, text: headerMap[keys[key]] }));
    mobile.push(HtmlComponents.div({ content: [entry[keys[key]]] }));
    if (index === 0) {
      desktop[0].push(HtmlComponents.div({ css: cssDesktop, source, text: headerMap[keys[key]] }));
    }

    desktop[1].push(HtmlComponents.div({ content: [entry[keys[key]]] }));
  });

  nodeHtmlDesktop.push(desktop[0].join(''));
  nodeHtmlDesktop.push(desktop[1].join(''));
  nodeHtmlMobile.push(`<div>${mobile.join('')}</div>`)
});

const licenseDataNode = `export const LICENSE_DATA_NODE = "<div class='license-data license-data-node'><div class='mobile'>${nodeHtmlMobile.join('')}</div><div class='desktop'>${nodeHtmlDesktop.join('')}</div></div>";`;

const fontsHeader = [
  LicenseLanguageKeys.FONT_FONT,
  LicenseLanguageKeys.FONT_LICENSE,
  LicenseLanguageKeys.FONT_AUTHOR,
  LicenseLanguageKeys.FONT_LINK
];

const fontsHtmlDesktop = [];
const fontsHtmlMobile = [];

[
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
].forEach((element, i) => {
  const mobile = [];
  const desktop = [[], []];

  const cssMobile = ['header', 'header-mobile'];
  const cssDesktop = ['header', 'header-desktop'];

  element.forEach((elem, j) => {
    mobile.push(HtmlComponents.div({ css: cssMobile, source, text: fontsHeader[j] }));
    mobile.push(HtmlComponents.div({ content: [elem] }));
    if (i === 0) {
      desktop[0].push(HtmlComponents.div({ css: cssDesktop, source, text: fontsHeader[j] }));
    }

    desktop[1].push(HtmlComponents.div({ content: [elem] }));
  });

  fontsHtmlDesktop.push(desktop[0].join(''));
  fontsHtmlDesktop.push(desktop[1].join(''));
  fontsHtmlMobile.push(`<div>${mobile.join('')}</div>`)
});

const licenseDataFonts = `export const LICENSE_DATA_FONTS = "<div class='license-data license-data-fonts'><div class='mobile'>${fontsHtmlMobile.join('')}</div><div class='desktop'>${fontsHtmlDesktop.join('')}</div></div>";`;

[licenseDataFonts, licenseDataNode].forEach((data) => {
  console.log(data.replace(/'/ig, '\\\'').replace(/"/ig, '\''));
});
