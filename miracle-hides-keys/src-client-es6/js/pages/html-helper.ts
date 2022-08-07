import { TRANSLATION_VALUE_NAME } from '../translations/translation-constants';

export default class HtmlHelper {
  static addTranslationValue({
    id,
    element,
    source,
    value,
    destination,
  } : {
    id?: string,
    element?: HTMLElement,
    source: string,
    value:string,
    destination:string,
  }) : void {
    const root : HTMLElement = element || document.getElementById(id);
    if (!root) {
      throw new Error('no element is set or an invalid id');
    }

    root.setAttribute(TRANSLATION_VALUE_NAME, `${source}.${value}.${destination}`);
  }
}
