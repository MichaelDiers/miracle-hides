import BasePage from './base-page';
import {TRANSLATION_DESTINATION_TEXT_CONTENT} from '../translations/translation-constants';
import HtmlComponents from './html-components';

export default class RsaPage extends BasePage {
  setupHtml() : string {
    const source = this.source;
    
    return `
      ${HtmlComponents.h1(source, 'headline', TRANSLATION_DESTINATION_TEXT_CONTENT)}
    `;
  }
}
