import {
  TRANSLATION_VALUE_NAME,
  TRANSLATION_DESTINATION_PLACEHOLDER,
  TRANSLATION_DESTINATION_TEXT_CONTENT,
  TRANSLATION_DESTINATION_VALUE,
} from '../translations/translation-constants';

export default class HtmlComponents {
  static anchor({
    id = '',
    href = '',
    source = '',
    label = '',
    content = [],
    css = [],
  } : {
    id?: string,
    href?: string,
    source?: string,
    label?: string,
    content?: string[],
    css?: string[],
  }) {
    return `
      <a
        ${HtmlComponents.add('id', id)}
        ${HtmlComponents.add('href', href)}
        ${HtmlComponents.translationValue({ source, value: label, destination: TRANSLATION_DESTINATION_TEXT_CONTENT })}
        ${HtmlComponents.add('class', css.join(' '))}
      >
        ${content.join('')}
      </a>
    `;
  }

  static div({
    id = '',
    css = [],
    content = [],
  } : {
    id?: string,
    css?: string[],
    content?: string[],
  } = {}) : string {
    return HtmlComponents.component({ tag: 'div', id, content, css });
  }

  static form({
    action = '',
    content = [],
    method = '',
    id = '',
  } : {
    action?: string,
    content?: string[],
    method?: string,
    id?: string,
  } = {}) : string {
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

  static h1({
    source = '',
    value = '',
  } : {
    source?: string,
    value?: string,
  } = {}) : string {
    return HtmlComponents.tag({
      tagName: 'h1',
      source,
      value,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });
  }

  static inputHidden({
    id = '',
    name = id,
    value = '',
  } : {
    id?: string,
    name?: string,
    value?: string,
  }) : string {
    return this.input({
      id, name, type: 'hidden', value,
    });
  }

  static inputNumber({
    id = '',
    label = '',
    name = id,
    placeholder = '',
    source = '',
    min = '',
    max = '',
    value = '',
  } : {
    id?: string,
    name?: string,
    label?: string,
    placeholder?: string,
    source?: string,
    min?: string,
    max?: string,
    value?: string,
  }) : string {
    return HtmlComponents.input({
      id, label, name, placeholder, source, type: 'number', min, max, value,
    });
  }

  static inputText({
    id = '',
    label = '',
    name = id,
    placeholder = '',
    source = '',
  } : {
    id?: string,
    name?: string,
    label?: string,
    placeholder?: string,
    source?: string,
  }) : string {
    return HtmlComponents.input({
      id, label, name, placeholder, source, type: 'text',
    });
  }

  static list({
    id = '',
    ordered = true,
    items = [],
  } : {
    id?: string,
    ordered?: boolean,
    items?,
  }) {
    return `
      <${ordered ? 'ol' : 'ul'} ${id ? ` id='${id}'` : ''}>
        ${items.join('')}
      </${ordered ? 'ol' : 'ul'}>
    `;
  }

  static listItem({
    source = '',
    label = '',
    content = '',
  } : {
    source?: string,
    label?: string,
    content?: string,
  }) {
    return `
      <li
        ${HtmlComponents.translationValue({
    source,
    value: label,
    destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
  })}>
        ${content}
      </li>`;
  }

  static listOrdered({
    id = '',
    items = [],
  } : {
    id?: string,
    items?,
  }) {
    return HtmlComponents.list({ id, ordered: true, items });
  }

  static listUnordered({
    id = '',
    items = [],
  } : {
    id?: string,
    items?,
  }) {
    return HtmlComponents.list({ id, ordered: false, items });
  }

  static select({
    id = '',
    label = '',
    name = id,
    placeholder = '',
    source = '',
    options = [],
  } : {
    id?: string,
    name?: string,
    label?: string,
    placeholder?: string,
    source?: string,
    options?: string[],
  }) : string {
    return `
      ${HtmlComponents.label({ label, source, id })}
      <select
        ${HtmlComponents.add('id', id)}
        ${HtmlComponents.add('name', name)}
        ${HtmlComponents.translationValue({ source, value: placeholder, destination: TRANSLATION_DESTINATION_PLACEHOLDER })}
      >
        ${options.join('')}
      </select>
    `;
  }

  static selectOption(value: string, label: string, source: string) : string {
    return `
      <option
        value='${value}'
        ${HtmlComponents.translationValue({ source, value: label, destination: TRANSLATION_DESTINATION_TEXT_CONTENT })}
      ></option>
    `;
  }

  static span({
    id = '',
    css = [],
    content = '',
  } : {
    id?: string,
    css?: string[],
    content?: string,
  }) {
    return HtmlComponents.component({ tag: 'span', id, css, content: [content]});
  }

  static submit({
    label = '',
    source = '',
    type = 'submit',
  } : {
    label?: string,
    source?: string,
    type?: string,
  } = {}) : string {
    return `
      <input
        type='${type}'
        ${HtmlComponents.translationValue({ source, value: label, destination: TRANSLATION_DESTINATION_VALUE })}
      ></input>
    `;
  }

  static textarea({
    id = '',
    label = '',
    name = id,
    placeholder = '',
    source = '',
    rows = '5',
  } : {
    id?: string,
    name?: string,
    label?: string,
    placeholder?: string,
    source?: string,
    rows?: string,
  }) : string {
    return `
      ${HtmlComponents.label({ label, source, id })}
      <textarea
        ${HtmlComponents.add('id', id)}
        ${HtmlComponents.add('name', name)}
        ${HtmlComponents.add('rows', rows)}
        ${HtmlComponents.translationValue({ source, value: placeholder, destination: TRANSLATION_DESTINATION_PLACEHOLDER })}
      ></textarea>
    `;
  }

  private static add(attributeName: string, attributeValue: string) : string {
    return attributeValue ? ` ${attributeName}='${attributeValue}'` : '';
  }

  private static component({
    tag,
    id = '',
    css = [],
    content = [],
  } : {
    tag: string,
    id?: string,
    css?: string[],
    content?: string[],
  }) {
    return `
      <${tag}
        ${HtmlComponents.add('id', id)}
        ${HtmlComponents.add('class', css.join(' '))}
      >
        ${content.join('')}
      </${tag}>
    `;
  }

  private static input({
    id = '',
    label = '',
    name = id,
    placeholder = '',
    source = '',
    type,
    value = '',
    min = '',
    max = '',
  } : {
    id: string,
    label?: string,
    name: string,
    placeholder?: string,
    source?: string,
    type: string,
    value?: string,
    min?: string,
    max?: string,
  }) : string {
    return `
      ${HtmlComponents.label({ label, source, id })}
      <input
        ${HtmlComponents.add('id', id)}
        ${HtmlComponents.add('name', name)}
        ${HtmlComponents.add('value', value)}
        ${HtmlComponents.add('min', min)}
        ${HtmlComponents.add('max', max)}
        ${HtmlComponents.translationValue({
    source,
    value: placeholder,
    destination: TRANSLATION_DESTINATION_PLACEHOLDER,
  })}
        type='${type}'
      ></input>
    `;
  }

  private static label({
    label = '',
    source = '',
    id = '',
  } : {
    label?: string,
    source?: string,
    id?: string,
  } = {}) : string {
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

  private static tag({
    tagName,
    source,
    value,
    destination,
  } : {
    tagName: string,
    source: string,
    value: string,
    destination: string,
  }) : string {
    return `<${tagName} ${TRANSLATION_VALUE_NAME}='${source}.${value}.${destination}'></${tagName}>`;
  }

  private static translationValue({
    source = '',
    value = '',
    destination = '',
  } : {
    source?: string,
    value?: string,
    destination?: string,
  } = {}) :string {
    if (!value) {
      return '';
    }

    return HtmlComponents.add(TRANSLATION_VALUE_NAME, `${source}.${value}.${destination}`);
  }
}
