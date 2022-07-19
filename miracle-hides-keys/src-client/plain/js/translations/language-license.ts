export enum LicenseLanguageKeys {
  LICENSES = 'licenses',
  LICENSES_FONTS = 'licensesFonts',
  LICENSES_NODE = 'licensesNode',
  NODE_DEPARTMENT = 'nodeDepartment',
  NODE_RELATED_TO = 'nodeRelatedTo',
  NODE_NAME = 'nodeName',
  NODE_LICENSE_PERIOD = 'nodeLicensePeriod',
  NODE_MATERIAL = 'nodeMaterial',
  NODE_LICENSE_TYPE = 'nodeLicenseType',
  NODE_LINK = 'nodeLink',
  NODE_REMOTE_VERSION = 'nodeRemoteVersion',
  NODE_INSTALLED_VERSION = 'nodeInstalledVersion',
  NODE_DEFINED_VERSION = 'nodeDefinedVersion',
  NODE_AUTHOR = 'nodeAuthor',
  FONT_FONT = 'fontFont',
  FONT_LICENSE = 'fontLicense',
  FONT_AUTHOR = 'fontAuthor',
  FONT_LINK = 'fontLink',
}

export interface LicenseLanguage {
  [LicenseLanguageKeys.LICENSES]: string;
  [LicenseLanguageKeys.LICENSES_FONTS]: string;
  [LicenseLanguageKeys.LICENSES_NODE]: string;
  [LicenseLanguageKeys.NODE_DEPARTMENT]: string;
  [LicenseLanguageKeys.NODE_RELATED_TO]: string;
  [LicenseLanguageKeys.NODE_NAME]: string;
  [LicenseLanguageKeys.NODE_LICENSE_PERIOD]: string;
  [LicenseLanguageKeys.NODE_MATERIAL]: string;
  [LicenseLanguageKeys.NODE_LICENSE_TYPE]: string;
  [LicenseLanguageKeys.NODE_LINK]: string;
  [LicenseLanguageKeys.NODE_REMOTE_VERSION]: string;
  [LicenseLanguageKeys.NODE_INSTALLED_VERSION]: string;
  [LicenseLanguageKeys.NODE_DEFINED_VERSION]: string;
  [LicenseLanguageKeys.NODE_AUTHOR]: string;
  [LicenseLanguageKeys.FONT_FONT]: string;
  [LicenseLanguageKeys.FONT_LICENSE]: string;
  [LicenseLanguageKeys.FONT_AUTHOR]: string;
  [LicenseLanguageKeys.FONT_LINK]: string;
}
