import Ajax from '../infrastructure/ajax';
import BasePage from './base-page';
import HtmlComponents from './html-components';

const PRIVATE_KEY_ID : string = 'privateKey';

const PUBLIC_KEY_ID : string = 'publicKey';

const GENERATE_FORM_ID : string = 'generateForm';

const KEY_SIZE_ID : string = 'keySize';

const KEY_TYPE_ID: string = 'type';

export default class RsaPage extends BasePage {
  setupEvents(element: HTMLElement) : void {
    element.querySelector(`#${GENERATE_FORM_ID}`).addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById(PRIVATE_KEY_ID).textContent = '';
      document.getElementById(PUBLIC_KEY_ID).textContent = '';           

      Ajax.sendFormAsync({ formElement: e.target as HTMLFormElement })
        .then(({ data, success }) => {
          if (!success || !data) {
            // todo
          } else {
            document.getElementById(PRIVATE_KEY_ID).textContent = data['privateKey'];
            document.getElementById(PUBLIC_KEY_ID).textContent = data['publicKey'];            
          }
        })
        .catch((x) => console.log('error', x));        
    });
  }

  setupHtml() : string {
    const { source } = this;

    return `
      ${HtmlComponents.h1({ source, value: 'headline' })}
      ${HtmlComponents.form({
    action: '/keys',
    id: GENERATE_FORM_ID,
    method: 'post',
    content: [
      HtmlComponents.inputHidden({ id: KEY_TYPE_ID, value: 'RSA' }),
      HtmlComponents.select({
        id: KEY_SIZE_ID,
        label: 'keySize',
        placeholder: 'keySize',
        source,
        options: [
          HtmlComponents.selectOption('1024', 'keySize1024', source),
          HtmlComponents.selectOption('2048', 'keySize2048', source),
          HtmlComponents.selectOption('4096', 'keySize4096', source),
        ],
      }),
      HtmlComponents.submit({
        label: 'submit',
        source,
      }),
    ],
  })}
      ${HtmlComponents.textarea({
    id: PRIVATE_KEY_ID,
    label: 'privateKey',
    placeholder: 'privateKeyPlaceholder',
    source,
    rows: '15',
  })}
      ${HtmlComponents.textarea({
    id: PUBLIC_KEY_ID,
    label: 'publicKey',
    placeholder: 'publicKeyPlaceholder',
    source,
    rows: '6',
  })}
    `;
  }
}
