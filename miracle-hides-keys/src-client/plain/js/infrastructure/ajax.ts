import AjaxResponse from './ajax-response';

const BACKGROUND_PROCESS_RUNNING_NAME = 'background-process-active';

export default class Ajax {
  static sendAsync({
    action,
    method,
    data = {},
    token = '',
  }: {
    action: string,
    method: string,
    data?: object,
    token?: string,
  }) : Promise<AjaxResponse> {
    Ajax.startProcess();
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      // eslint-disable-next-line consistent-return
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          const responseData = Ajax.parseResponse(this.responseText, this.responseType);
          const response = new AjaxResponse(this.status, responseData);
          Ajax.endProcess();
          return response.success ? resolve(response) : reject(response);
        }
      };

      xhttp.open(method, action, true);
      if (token) {
        xhttp.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      if (!data) {
        xhttp.send();
      } else {
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(data));
      }
    });
  }

  private static parseResponse(text: string, type: string) : object {
    if (!text) {
      return {};
    }

    if (!type || type === 'json') {
      try {
        return JSON.parse(text);
      } catch {
        // not in json format
      }
    }

    return {};
  }

  static sendFormAsync({
    formElement,
  }: {
    formElement: HTMLFormElement,
  }) : Promise<AjaxResponse> {
    const { method } = formElement;
    const { action } = formElement;
    const data = {};
    formElement.querySelectorAll('input[type=hidden], input[type=password], input[type=text], select').forEach((element) => {
      const select = element as HTMLSelectElement;
      if (select) {
        data[select.name] = select.value;
      } else {
        const input = element as HTMLInputElement;
        data[input.name] = input.value;
      }
    });

    return Ajax.sendAsync({ action, method, data });
  }

  private static endProcess() : void {
    const main = document.querySelector('main');
    const count = main.getAttribute(BACKGROUND_PROCESS_RUNNING_NAME);
    if (count) {
      const newCount = Math.max(0, parseInt(count, 10) - 1);
      if (newCount === 0) {
        main.classList.remove(BACKGROUND_PROCESS_RUNNING_NAME);
        document.body.removeEventListener('keydown', Ajax.handleTabs);
      }

      main.setAttribute(BACKGROUND_PROCESS_RUNNING_NAME, `${newCount}`);
    }
  }

  private static startProcess() : void {
    const main = document.querySelector('main');
    const count = main.getAttribute(BACKGROUND_PROCESS_RUNNING_NAME);
    const newCount = count ? parseInt(count, 10) + 1 : 1;
    if (newCount === 1) {
      document.body.addEventListener('keydown', Ajax.handleTabs);
    }

    main.setAttribute(BACKGROUND_PROCESS_RUNNING_NAME, `${newCount}`);
    main.classList.add(BACKGROUND_PROCESS_RUNNING_NAME);
  }

  private static handleTabs(event: KeyboardEvent) : void {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  }
}
