import BasePage from './pages/base-page';
import RsaPage from './pages/rsa.page';
import CustomEventRaise from './infrastructure/custom-event-raiser';

export default class App {
  private async setupAsync() : Promise<void> {
    const pagePromises = this.setupPages();
    await Promise.all(pagePromises);
  }

  private setupPages() : Promise<BasePage>[] {
    const promises : Promise<BasePage>[] = [];

    promises.push(new RsaPage().setupAsync());

    return promises;
  }

  async startAsync() : Promise<void> {
    await this.setupAsync();
    CustomEventRaise.raise(RsaPage.constructor.name);
  }
}