import {
  TRANSLATION_VALUE_NAME,
  TRANSLATION_DESTINATION_PLACEHOLDER,
  TRANSLATION_DESTINATION_TEXT_CONTENT,
  TRANSLATION_DESTINATION_VALUE,
} from '../translations/translation-constants';
import Css from './css';

export default class HtmlComponents {
  static anchor({
    id = '',
    href = '',
    source = '',
    label = '',
    content = [],
    css = [],
  }: {
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

  static button({
    css = ['button'],
    id = '',
    source = '',
    text = '',
  }: {
    css?: string[],
    id?: string,
    source?: string,
    text?: string,
  }): string {
    return HtmlComponents.component({
      tag: 'button',
      id,
      css,
      source,
      text,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });
  }

  static div({
    id = '',
    css = [],
    content = [],
    source = '',
    text = '',
  }: {
    id?: string,
    css?: string[],
    content?: string[],
    source?: string,
    text?: string,
  } = {}): string {
    return HtmlComponents.component({
      tag: 'div',
      id,
      content,
      css,
      source,
      text,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });
  }

  static form({
    action = '',
    content = [],
    method = '',
    id = '',
  }: {
    action?: string,
    content?: string[],
    method?: string,
    id?: string,
  } = {}): string {
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
  }: {
    source?: string,
    value?: string,
  } = {}): string {
    return HtmlComponents.tag({
      tagName: 'h1',
      source,
      value,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });
  }

  static h2({
    source = '',
    value = '',
  }: {
    source?: string,
    value?: string,
  } = {}): string {
    return HtmlComponents.tag({
      tagName: 'h2',
      source,
      value,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });
  }

  static inputHidden({
    id = '',
    name = id,
    value = '',
  }: {
    id?: string,
    name?: string,
    value?: string,
  }): string {
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
  }: {
    id?: string,
    name?: string,
    label?: string,
    placeholder?: string,
    source?: string,
    min?: string,
    max?: string,
    value?: string,
  }): string {
    return HtmlComponents.input({
      id,
      label,
      name,
      placeholder,
      source,
      type: 'text',
      min,
      max,
      value,
      pattern: '[0-9]*',
      inputMode: 'numeric',
    });
  }

  static inputText({
    id = '',
    label = '',
    name = id,
    placeholder = '',
    source = '',
  }: {
    id?: string,
    name?: string,
    label?: string,
    placeholder?: string,
    source?: string,
  }): string {
    return HtmlComponents.input({
      id, label, name, placeholder, source, type: 'text',
    });
  }

  static list({
    id = '',
    ordered = true,
    items = [],
  }: {
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
    css = [],
    source = '',
    label = '',
    content = '',
  }: {
    css?: string[],
    source?: string,
    label?: string,
    content?: string,
  }) {
    return HtmlComponents.component({
      tag: 'li',
      css,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
      source,
      text: label,
      content: [content],
    });
  }

  static listOrdered({
    id = '',
    items = [],
  }: {
    id?: string,
    items?,
  }) {
    return HtmlComponents.list({ id, ordered: true, items });
  }

  static listUnordered({
    id = '',
    items = [],
  }: {
    id?: string,
    items?,
  }) {
    return HtmlComponents.list({ id, ordered: false, items });
  }

  static navbar({
    css = [],
    id = '',
    content = [],
  }: {
    css?: string[],
    id?: string,
    content?: string[],
  }): string {
    return HtmlComponents.component({
      tag: 'navbar',
      id,
      css,
      content,
    });
  }

  static p({
    css = [],
    id = '',
    source = '',
    text = '',
  }: {
    css?: string[],
    id?: string,
    source?: string,
    text?: string,
  }): string {
    return HtmlComponents.component({
      tag: 'p',
      id,
      css,
      source,
      text,
      destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
    });
  }

  static radio({
    id,
    label,
    name = id,
    source,
    options = [],
  }: {
    id: string,
    label: string,
    name?: string,
    source: string,
    options: { isChecked?: boolean, source: string, text: string, value: string }[],
  }): string {
    return [
      HtmlComponents.label({ label, source, id }),
      HtmlComponents.div({
        id,
        css: [`grid-${options.length * 2}-1-mc`],
        content: options.map((option, i) => [
          HtmlComponents.input({
            id: `${id}_${i}`, name, type: 'radio', value: option.value, isChecked: option.isChecked,
          }),
          HtmlComponents.label({ id: `${id}_${i}`, source: option.source, label: option.text }),
        ].join('')),
      }),
    ].join('');
  }

  static select({
    id = '',
    label = '',
    name = id,
    placeholder = '',
    source = '',
    options = [],
  }: {
    id?: string,
    name?: string,
    label?: string,
    placeholder?: string,
    source?: string,
    options?: string[],
  }): string {
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

  static selectOption(value: string, label: string, source: string): string {
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
  }: {
    id?: string,
    css?: string[],
    content?: string,
  }) {
    return HtmlComponents.component({
      tag: 'span', id, css, content: [content],
    });
  }

  static submit({
    label = '',
    source = '',
    type = 'submit',
  }: {
    label?: string,
    source?: string,
    type?: string,
  } = {}): string {
    return `
      <input
        type='${type}'
        ${HtmlComponents.translationValue({ source, value: label, destination: TRANSLATION_DESTINATION_VALUE })}
      ></input>
    `;
  }

  static textarea({
    id = '',
    labelText = '',
    labelSource = '',
    name = id,
    placeholderText = '',
    placeholderSource = '',
    textareaText = '',
    textareaSource = '',
    rows = '5',

  }: {
    id?: string,
    name?: string,
    labelText?: string,
    labelSource?: string,
    placeholderText?: string,
    placeholderSource?: string,
    textareaText?: string,
    textareaSource?: string,
    rows?: string,
  }): string {
    return [
      HtmlComponents.label({ label: labelText, source: labelSource, id }),
      HtmlComponents.div({
        css: [Css.TEXTAREA_CONTAINER],
        content: [
          HtmlComponents.div(),
          HtmlComponents.component({
            tag: 'textarea',
            id,
            name,
            rows,
            translationValue: HtmlComponents.translationValues(
              {
                source: placeholderSource,
                value: placeholderText,
                destination: TRANSLATION_DESTINATION_PLACEHOLDER,
              },
              {
                source: textareaSource,
                value: textareaText,
                destination: TRANSLATION_DESTINATION_TEXT_CONTENT,
              },
            ),
          }),
        ],
      }),
    ].join('');
  }

  private static add(attributeName: string, attributeValue: string): string {
    return attributeValue ? ` ${attributeName}='${attributeValue}'` : '';
  }

  private static component({
    tag,
    id = '',
    css = [],
    content = [],
    source = '',
    text = '',
    destination = '',
    name = '',
    rows = '',
    translationValue = '',
  }: {
    tag: string,
    id?: string,
    css?: string[],
    content?: string[],
    source?: string,
    text?: string,
    destination?: string,
    name?: string,
    rows?: string,
    translationValue?: string,
  }) {
    return [
      `<${tag}`,
      HtmlComponents.add('id', id),
      HtmlComponents.add('name', name),
      HtmlComponents.add('rows', rows),
      HtmlComponents.add('class', css.join(' ')),
      translationValue ? ` ${translationValue}` : HtmlComponents.translationValue({ source, value: text, destination }),
      '>',
      content.join(''),
      `</${tag}>`,
    ].join('');
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
    isChecked = undefined,
    inputMode = '',
    pattern = '',
  }: {
    id: string,
    label?: string,
    name: string,
    placeholder?: string,
    source?: string,
    type: string,
    value?: string,
    min?: string,
    max?: string,
    isChecked?: boolean,
    inputMode?: string,
    pattern?: string,
  }): string {
    return [
      HtmlComponents.label({ label, source, id }),
      '<input',
      [
        HtmlComponents.add('id', id),
        HtmlComponents.add('name', name),
        HtmlComponents.add('value', value),
        HtmlComponents.add('min', min),
        HtmlComponents.add('max', max),
        HtmlComponents.add('checked', (isChecked || isChecked === false) ? `${isChecked}` : ''),
        HtmlComponents.add('inputMode', inputMode),
        HtmlComponents.add('pattern', pattern),
        HtmlComponents.translationValue({
          source,
          value: placeholder,
          destination: TRANSLATION_DESTINATION_PLACEHOLDER,
        }),
        HtmlComponents.add('type', type),
      ].join(''),
      '></input>',
    ].join('');
  }

  private static label({
    label = '',
    source = '',
    id = '',
  }: {
    label?: string,
    source?: string,
    id?: string,
  } = {}): string {
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
  }: {
    tagName: string,
    source: string,
    value: string,
    destination: string,
  }): string {
    return `<${tagName} ${TRANSLATION_VALUE_NAME}='${source}.${value}.${destination}'></${tagName}>`;
  }

  private static translationValues(...args : {
    source?: string,
    value?: string,
    destination?: string,
  }[]) : string {
    const translationValue = args
      .filter(({ source, value, destination }) => source && value && destination)
      .map(({ source, value, destination }) => `${source}.${value}.${destination}`)
      .join(',');
    return HtmlComponents.add(TRANSLATION_VALUE_NAME, translationValue);
  }

  private static translationValue({
    source = '',
    value = '',
    destination = '',
  }: {
    source?: string,
    value?: string,
    destination?: string,
  } = {}): string {
    if (!value) {
      return '';
    }

    return HtmlComponents.add(TRANSLATION_VALUE_NAME, `${source}.${value}.${destination}`);
  }
}
