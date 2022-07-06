import { TRANSLATION_VALUE_NAME, TRANSLATION_DESTINATION_PLACEHOLDER, TRANSLATION_DESTINATION_TEXT_CONTENT } from '../translations/translation-constants';

export default class HtmlComponents {
  static form({ action = '', content = [], method = '', id = '' } : { action?: string, content?: string[], method?: string, id?: string } = {}) : string {
    return `
      <form
        ${HtmlComponents.add('action', action)}
        ${HtmlComponents.add('method', method)}
        ${HtmlComponents.add('id', id)}        
      >
        ${content.join('')}
      </form>
    `;
  }

  static h1({ source = '', value = '' } : { source?: string, value?: string } = {}) : string {
    return HtmlComponents.tag({
      tagName: 'h1',
      source,
      value,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });
  }

  public static inputText({ id = '', label = '', name = id, placeholder = '', source = '' } : { id?: string, name?: string, label?: string, placeholder?: string, source?: string }) : string {
    return HtmlComponents.input({ id, label, name, placeholder, source, type: 'text' });
  }

  private static add(attributeName: string, attributeValue: string) : string {
    return attributeValue ? ` ${attributeName}='${attributeValue}'` : ''
  }

  private static input({ id = '', label = '', name = id, placeholder ='', source ='', type } : { id: string, label: string, name: string, placeholder?: string, source?: string, type: string }) : string {
    return `
      ${HtmlComponents.label({ label, source, id })}
      <input
        ${HtmlComponents.add('id', id)}
        ${HtmlComponents.add('name', name)}
        ${HtmlComponents.translationValue({ source, value: placeholder, destination: TRANSLATION_DESTINATION_PLACEHOLDER })}
        type='${type}'
      ></input>
    `;
  }

  private static label({ label = '', source = '', id = '' } : { label?: string, source?: string, id?: string} = {}) {
    if (!label) {
      return '';
    }

    return `
      <label
        ${HtmlComponents.add('for', id)}
        ${HtmlComponents.translationValue({ source, value: label, destination: TRANSLATION_DESTINATION_TEXT_CONTENT })}
      ></label>
    `;
  }

  private static tag({ tagName, source, value, destination } : { tagName: string, source: string, value: string, destination: string }) : string {
    return `<${tagName} ${TRANSLATION_VALUE_NAME}='${source}.${value}.${destination}'></${tagName}>`;
  }

  private static translationValue({ source = '', value = '', destination = ''} : { source?: string, value?: string, destination?: string } = {}) {
    if (!value) {
      return '';
    }

    return HtmlComponents.add(TRANSLATION_VALUE_NAME, `${source}.${value}.${destination}`);
  }
}