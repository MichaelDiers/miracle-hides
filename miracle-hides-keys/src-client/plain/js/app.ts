import BasePage from './pages/base-page';
import AsymmetricPage from './pages/asymmetric.page';
import CustomEventRaise from './infrastructure/custom-event-raiser';
import Translator from './translations/translator';
import DeLanguage from './translations/de-language';
import Logger from './infrastructure/logger';
import SymmetricPage from './pages/symmetric.page';
import HeaderPage from './pages/header.page';
import FooterPage from './pages/footer.page';

export default class App {
  private readonly translator : Translator = new Translator(new DeLanguage(this.logger));

  constructor(
    private readonly logger: Logger,
  ) {
  }

  async startAsync() : Promise<void> {
    await this.setupAsync();
    CustomEventRaise.raise(AsymmetricPage.name);
    CustomEventRaise.raise(HeaderPage.name);
    CustomEventRaise.raise(FooterPage.name);
  }

  private async setupAsync() : Promise<void> {
    const pagePromises = this.setupPages();
    await Promise.all(pagePromises);
  }

  private setupPages() : Promise<BasePage>[] {
    const promises : Promise<BasePage>[] = [];

    promises.push(
      new AsymmetricPage(this.translator, this.logger).setupAsync(),
      new SymmetricPage(this.translator, this.logger).setupAsync(),
      new HeaderPage(this.translator, this.logger).setupAsync(),
      new FooterPage(this.translator, this.logger).setupAsync(),
    );

    return promises;
  }
}
