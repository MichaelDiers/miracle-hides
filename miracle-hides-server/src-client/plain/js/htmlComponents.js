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

  submit(value, type = 'submit') {
    return `<input type='${type}' value='${value}'/>`
  }
};
