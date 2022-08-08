import Logger from '../infrastructure/logger';
import { LicenseLanguageKeys } from '../translations/language-license';
import Translator from '../translations/translator';
import BasePage from './base-page';
import HtmlComponents from './html-components';
import PageEvents from './page-events';
import REPORT from './license-report';
import Css from './css';

export default class LicensePage extends BasePage {
  constructor(
    translator: Translator,
    logger: Logger,
  ) {
    super(
      translator,
      logger,
      PageEvents.LICENSE_PAGE,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected get displayInRegion(): string {
    return 'main';
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  protected setupEvents(element: HTMLElement): void {
    // implements abstract method of base class
  }

  // eslint-disable-next-line class-methods-use-this
  protected setupHtml(): string {
    return HtmlComponents.div({
      content: [
        HtmlComponents.h1({
          source: PageEvents.LICENSE_PAGE,
          value: LicenseLanguageKeys.LICENSES,
        }),
        HtmlComponents.h2({
          source: PageEvents.LICENSE_PAGE,
          value: LicenseLanguageKeys.LICENSES_NODE,
        }),
        HtmlComponents.div({
          css: [Css.LICENSE_DATA, Css.LICENSE_DATA_NODE],
          content: [
            HtmlComponents.div({
              css: [Css.MOBILE],
              content: REPORT.node.map(({
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
              }) => HtmlComponents.div({
                content: [
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_NAME,
                  }),
                  HtmlComponents.div({ content: [name] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_LINK,
                  }),
                  HtmlComponents.div({ content: [link] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_LICENSE_TYPE,
                  }),
                  HtmlComponents.div({ content: [licenseType] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_LICENSE_PERIOD,
                  }),
                  HtmlComponents.div({ content: [licensePeriod] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_REMOTE_VERSION,
                  }),
                  HtmlComponents.div({ content: [remoteVersion] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_INSTALLED_VERSION,
                  }),
                  HtmlComponents.div({ content: [installedVersion] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_DEFINED_VERSION,
                  }),
                  HtmlComponents.div({ content: [definedVersion] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_AUTHOR,
                  }),
                  HtmlComponents.div({ content: [author] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_DEPARTMENT,
                  }),
                  HtmlComponents.div({ content: [department] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_RELATED_TO,
                  }),
                  HtmlComponents.div({ content: [relatedTo] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.NODE_MATERIAL,
                  }),
                  HtmlComponents.div({ content: [material] }),
                ],
              })),
            }),
            HtmlComponents.div({
              css: [Css.DESKTOP],
              content: [
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_NAME,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_LINK,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_LICENSE_TYPE,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_LICENSE_PERIOD,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_REMOTE_VERSION,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_INSTALLED_VERSION,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_DEFINED_VERSION,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_AUTHOR,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_DEPARTMENT,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_RELATED_TO,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.NODE_MATERIAL,
                }),
                ...REPORT.node.map(({
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
                }) => [
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
                ].map(
                  (value) => HtmlComponents.div({ content: [value] }),
                )).flat(),
              ],
            }),
          ],
        }),
        HtmlComponents.h1({
          source: PageEvents.LICENSE_PAGE,
          value: LicenseLanguageKeys.LICENSES_FONTS,
        }),
        HtmlComponents.div({
          css: [Css.LICENSE_DATA, Css.LICENSE_DATA_FONTS],
          content: [
            HtmlComponents.div({
              css: [Css.MOBILE],
              content: REPORT.fonts.map(({
                font, license, author, link,
              }) => HtmlComponents.div({
                content: [
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.FONT_FONT,
                  }),
                  HtmlComponents.div({ content: [font] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.FONT_LICENSE,
                  }),
                  HtmlComponents.div({ content: [license] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.FONT_AUTHOR,
                  }),
                  HtmlComponents.div({ content: [author] }),
                  HtmlComponents.div({
                    css: [Css.HEADER, Css.HEADER_MOBILE],
                    source: PageEvents.LICENSE_PAGE,
                    text: LicenseLanguageKeys.FONT_LINK,
                  }),
                  HtmlComponents.div({ content: [link] }),
                ],
              })),
            }),
            HtmlComponents.div({
              css: [Css.DESKTOP],
              content: [
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.FONT_FONT,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.FONT_LICENSE,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.FONT_AUTHOR,
                }),
                HtmlComponents.div({
                  css: [Css.HEADER, Css.HEADER_DESKTOP],
                  source: PageEvents.LICENSE_PAGE,
                  text: LicenseLanguageKeys.FONT_LINK,
                }),
                ...REPORT.fonts.map(({
                  font,
                  license,
                  author,
                  link,
                }) => [font, license, author, link].map(
                  (value) => HtmlComponents.div({ content: [value] }),
                )).flat(),
              ],
            }),
          ],
        }),
      ],
    });
  }
}
