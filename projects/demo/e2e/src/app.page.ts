import { $$, browser } from 'protractor';

export class AppPage {
  readonly icons = $$('svg');

  async navigateTo() {
    await browser.get(browser.baseUrl);
  }
}

export const appPage = new AppPage();
