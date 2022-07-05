import { TRANSLATION_VALUE_NAME } from '../translations/translation-constants';

export default class HtmlComponents {
  static h1(source: string, value: string, destination: string) : string {
    return HtmlComponents.tag('h1', source, value, destination);
  }

  static tag(tagName: string, source: string, value: string, destination: string) : string {
    return `<${tagName} ${TRANSLATION_VALUE_NAME}='${source}.${value}.${destination}'></${tagName}>`;
  }
}