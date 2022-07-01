class HtmlComponents {
  static displayNameInput({
    id = 'displayName',
    translationTag = BaseTranslator.keys.displayName,
    translationPlaceholderTag = BaseTranslator.keys.displayName,
    addLabel = true,
    maxLength = 50,
    minLength = 3,
    name = id,
    required = true,
    type = 'text',
    value = '',
  } = {}) {
    return HtmlComponents.input({
      addLabel,
      id,
      maxLength,
      minLength,
      name,
      translationTag,
      translationPlaceholderTag,
      required,
      type,
      value,
    });
  }

  static emailInput(options = {}) {
    const {
      addLabel = true,
      id = 'email',
      maxLength = 50,
      minLength = 5,
      name = id,
      translationTag = BaseTranslator.keys.email,
      translationPlaceholderTag = BaseTranslator.keys.emailPlaceholder,
      required = true,
      type = 'email',
      value = '',
    } = options;
    return HtmlComponents.input({
      addLabel,
      id,
      maxLength,
      minLength,
      name,
      translationTag,
      translationPlaceholderTag,
      required,
      type,
      value,
    });
  }

  static form(options = {}) {
    const {
      id,
      action,
      method,
      content,
    } = options;

    const idAttribute = id ? `id=${id}` : '';
    const elements = (content && content.join) ? content.join('') : '';
    return `
      <form action='${action}' method='${method}' ${idAttribute}>
        ${elements}
      </form>
    `;
  }

  static headline(options = {}) {
    const { translationTag } = options;
    return `<h1 ${BaseTranslator.translationTag}='${translationTag}'></h1>`;
  }

  static input(options = {}) {
    const {
      addLabel = false,
      id,
      maxLength = 0,
      minLength = 0,
      name,
      required = false,
      translationPlaceholderTag,
      translationTag,
      type,
      value = '',
    } = options;

    let label = '';
    if (addLabel) {
      label = `
        <label
          for='${id}'
          ${BaseTranslator.translationTag}='${translationTag}'
        ></label>`
    }

    return `
      ${label}
      <input
        type='${type}'
        ${id ? `id='${id}'` : ''}
        ${name ? `name='${name}'` : ''}        
        ${maxLength > 0 ? `maxlength='${maxLength}'` : ''}
        ${minLength > 0 ? `minlength='${minLength}'` : ''}
        ${required ? 'required' : ''}
        ${translationPlaceholderTag ? `${BaseTranslator.translationPlaceholderTag}='${translationPlaceholderTag}'` : ''}
        ${(type === 'submit' && translationTag) ? `${BaseTranslator.translationValueTag}='${translationTag}'` : ''}
        ${value ? `value='${value}'` : ''}
      ></input>
    `;
  }

  static invitationCodeInput({
    id = 'invitationCode',
    translationTag = BaseTranslator.keys.invitationCode,
    translationPlaceholderTag = BaseTranslator.keys.guidPlaceholder,
    addLabel = true,
    maxLength = 36,
    minLength = 36,
    name = id,
    required = true,
    type = 'text',
    value = '',
  } = {}) {
    return HtmlComponents.input({
      addLabel,
      id,
      maxLength,
      minLength,
      name,
      translationTag,
      translationPlaceholderTag,
      required,
      type,
      value,
    });
  }

  static linkButton({
    id = '',
    link = 'link',
    translationTag,
    cssClass = 'linkButton',
    event = '',
    previous = '',
    next = '',
  } = {}) {
    return `
      <a
        ${cssClass ? `class='${cssClass}'` : ''}
        href='${link}'
        ${BaseTranslator.translationTag}='${translationTag}'
        ${id ? `id='${id}'` : ''}
        ${event ? `event='${event}'` : ''}
        ${previous ? `previous='${previous}'` : ''}
        ${next ? `next='${next}'` : ''}
      ></a>`
  }

  static passwordInput({
    addLabel = true,
    id = 'password',
    maxLength = 50,
    minLength = 8,
    name = id,
    translationTag = BaseTranslator.keys.password,
    translationPlaceholderTag = BaseTranslator.keys.passwordPlaceholder,
    required = true,
    type = 'password',
    value = '',
  } = {}) {
    return HtmlComponents.input({
      addLabel,
      id,
      maxLength,
      minLength,
      name,
      translationTag,
      translationPlaceholderTag,
      required,
      type,
      value,
    });
  }

  static select({
    id,
    name = id,
    content = [],
    translationTag,
  }) {
    return `
      <label
        ${id ? `for='${id}'` : ''}
        ${translationTag ? `${BaseTranslator.translationTag}='${translationTag}'` : ''}
      ></label>
      <select
        ${id ? `id='${id}'` : ''}
        ${name ? `name='${name}'` : ''}
      >
        ${content.join('')}
      </select>
    `;
  }

  static selectOption({ value, translationTag, isSelected = false, displayValue }) {
    return `
      <option
        ${value ? `value='${value}'` : ''}
        ${translationTag ? `${BaseTranslator.translationTag}='${translationTag}'` : ''}
        ${isSelected ? ' selected ' : ''}
      >
        ${displayValue ? displayValue : ''}
      </option>
    `
  }

  static submitInput(options = {}) {
    const {
      addLabel = false,
      id = '',
      maxLength = 0,
      minLength = 0,
      name = '',
      translationTag = BaseTranslator.keys.submit,
      translationPlaceholderTag = '',
      required = false,
      type = 'submit',
      value = '',
    } = options;
    return HtmlComponents.input({
      addLabel,
      id,
      maxLength,
      minLength,
      name,
      translationTag,
      translationPlaceholderTag,
      required,
      type,
      value,
    });
  }

  static text({ id = '', value = '', translationTag = '', cssClass = 'info-text' } = {}) {
    return `
      <div
        ${id ? `id='${id}'` : ''}
        ${translationTag ? `${BaseTranslator.translationTag}='${translationTag}'` : ''}
        ${cssClass ? `class='${cssClass}'` : ''}
      >${value || ''}
      </div>
    `;
  }

  static textarea({ id, name = id, cols, rows, translationTag, translationTagPlaceholder }) {
    return `
      <label
        ${id ? `for='${id}'` : ''}
        ${translationTag ? `${BaseTranslator.translationTag}='${translationTag}'` : ''}
      ></label>
      <textarea
        ${name ? `name='${name}'` : ''}
        ${id ? `id='${id}'` : ''}
        ${cols ? `cols='${cols}'` : ''}
        ${rows ? `rows='${rows}'` : ''}
        ${translationTagPlaceholder ? `${BaseTranslator.translationPlaceholderTag}='${translationTagPlaceholder}'` : ''}
        ></textarea>
    `;
  }
  
  static workflow({
    pages = [],
    cssClass = 'hide',
  }) {
    
    return pages.map((page, index) => {
      return `<div
        id='page_${index}'
        class='${(cssClass && index !== 0) ? cssClass : ''} page'
      >
        ${page}
      </div>`
    }).join('');
  }
}
