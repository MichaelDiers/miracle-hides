import BasePage from './base-page';
import HtmlComponents from './html-components';

export default class RsaPage extends BasePage {
  private readonly generateFormId = 'generate';

  private readonly keySizeId = 'keySize';

  setupEvents(element: HTMLElement) : void {
    element.querySelector(`#${this.generateFormId}`).addEventListener('submit', (e) => {
      e.preventDefault();

      const keySize = (document.getElementById(this.keySizeId) as HTMLSelectElement).value;
      console.log(keySize);
    });
  }

  setupHtml() : string {
    const { source } = this;

    return `
      ${HtmlComponents.h1({ source, value: 'headline' })}
      ${HtmlComponents.form({
    action: 'action',
    id: this.generateFormId,
    method: 'post',
    content: [
      HtmlComponents.select({
        id: this.keySizeId,
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
    id: 'privateKey', label: 'privateKey', placeholder: 'privateKeyPlaceholder', source,
  })}
      ${HtmlComponents.textarea({
    id: 'publicKey', label: 'publicKey', placeholder: 'publicKeyPlaceholder', source,
  })}
    `;
  }
}
