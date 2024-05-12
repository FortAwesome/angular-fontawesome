import { $, $$, browser } from 'protractor';

export class AppPage {
  readonly icons = $$('svg');
  readonly styles = $$('style');

  readonly appRoot = $('app-root');

  async navigateTo() {
    await browser.get(browser.baseUrl);
  }
}

export const appPage = new AppPage();
