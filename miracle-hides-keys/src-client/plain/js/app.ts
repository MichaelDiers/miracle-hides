import BasePage from './pages/base-page';
import AsymmetricPage from './pages/asymmetric.page';
import CustomEventRaise from './infrastructure/custom-event-raiser';
import Translator from './translations/translator';
import DeLanguage from './translations/de-language';

export default class App {
  private readonly translator : Translator = new Translator(new DeLanguage());

  async startAsync() : Promise<void> {
    await this.setupAsync();
    CustomEventRaise.raise(AsymmetricPage.constructor.name);
  }

  private async setupAsync() : Promise<void> {
    const pagePromises = this.setupPages();
    await Promise.all(pagePromises);
  }

  private setupPages() : Promise<BasePage>[] {
    const promises : Promise<BasePage>[] = [];

    promises.push(new AsymmetricPage(this.translator).setupAsync());

    return promises;
  }
}