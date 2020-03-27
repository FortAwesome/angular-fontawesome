import { browser, logging } from 'protractor';
import { appPage } from './app.page';

describe('Angular FontAwesome demo', () => {
  beforeEach(async () => {
    await appPage.navigateTo();
  });

  it('should render all icons', async () => {
    expect(await appPage.icons.count()).toBe(28);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({ level: logging.Level.SEVERE }));
  });
});
