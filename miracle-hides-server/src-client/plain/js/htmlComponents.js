class HtmlComponents {

  defaultPage(header, errorId, method, action, formId, ...inner) {
    return `
      <h1>${header}</h1>
      <div id='${errorId}'/>
      <form method='${method}' action='${action}' id='${formId}'>
        ${inner.join('')}
      </form>
    `;
  }

  email(id = 'email', name = id, required = true) {
    const requiredTag = required ? ' required ' : '';
    return `
      <label for='${id}'>email</label>
      <input type='email' id='${id}' name='${name}' maxlength='50' placeholder='name@example.com' ${requiredTag}>
    `;
  }

  form(formId, action, method, ...content) {
    return `
      <form id='${formId}' action='${action}' method='${method}'>
        ${content.join('')}
      </form>
    `;
  }

  headline(text) {
    return `<h1>${text}</h1>`;
  }

  messageArea(id) {
    return `<div id='${id}'></div>`
  }

  submit(value, type = 'submit') {
    return `<input type='${type}' value='${value}'/>`
  }
};
