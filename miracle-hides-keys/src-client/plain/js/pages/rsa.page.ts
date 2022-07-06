import BasePage from './base-page';
import HtmlComponents from './html-components';

export default class RsaPage extends BasePage {
  setupHtml() : string {
    const {source} = this;
    
    return `
      ${HtmlComponents.h1({ source, value: 'headline' })}
      ${HtmlComponents.form({
        action: 'action',        
        id: 'form',
        method: 'post',
        content: [
          HtmlComponents.inputText({
            id: 'key',
            label: 'keySize',
            name: 'keySize',
            placeholder: 'keySize',
            source,            
          }),
        ],
      })}
    `;
  }


  
}
