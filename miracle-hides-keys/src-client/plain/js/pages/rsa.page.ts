import BasePage from './base-page';
import HtmlComponents from './html-components';

export default class RsaPage extends BasePage {
  setupHtml() : string {
    const { source } = this;

    return `
      ${HtmlComponents.h1({ source, value: 'headline' })}
      ${HtmlComponents.form({
    action: 'action',
    id: 'form',
    method: 'post',
    content: [
      HtmlComponents.select({
        id: 'keySize',
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
