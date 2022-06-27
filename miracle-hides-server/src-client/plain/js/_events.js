const addSubmitEvent = (formId, callback, messageAreaId, messages) => {
  const formElement = document.getElementById(formId);
  if (!formElement) {
    throw new Error(`element ${formId} not found`);
  }

  const messageAreaElement = document.getElementById(messageAreaId);
  if (!messageAreaElement) {
    throw new Error(`element ${messageAreaId} not found`);
  }

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    messageAreaElement.innerText = '';
    const process = (json) => {
      const message = messages[json.status];      
      if (message) {
        messageAreaElement.innerText = message;
      } else {
        console.warn(`missing message for status ${json.status}`)
      }

      if (json && json.success) {
        callback(json.content);
      }
    }

    ajax2(process, e.target);
  });
};
