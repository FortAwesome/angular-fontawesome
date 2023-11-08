import { browser, logging } from 'protractor';
import { appPage } from './app.page';

describe('Angular FontAwesome demo', () => {
  beforeEach(async () => {
    // TODO: Migrate off Protractor as wait for Angular does not seem to work in the standalone mode
    browser.waitForAngularEnabled(false);
    await appPage.navigateTo();
  });

  it('should render all icons', async () => {
    expect(await appPage.icons.count()).toBe(43);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({ level: logging.Level.SEVERE }));
  });
});
