import { browser, logging } from 'protractor';
import { appPage } from './app.page';

describe('Angular FontAwesome demo', () => {
  beforeEach(async () => {
    // TODO: Migrate off Protractor as wait for Angular does not seem to work in the standalone mode
    browser.waitForAngularEnabled(false);
    await appPage.navigateTo();
    await browser.sleep(1000);
  });

  it('should render all icons', async () => {
    expect(await appPage.icons.count()).toBe(47);
  });

  it('should only add styles once', async () => {
    const styles: string[] = await appPage.styles.map((style) => style!.getAttribute('innerHTML'));
    const fontAwesomeStyles = styles.filter((style) => style.includes('.svg-inline--fa'));

    expect(fontAwesomeStyles.length).toBe(1);
  });

  it('should include styles in the server-side-rendered page', async () => {
    const context = await appPage.appRoot.getAttribute('ng-server-context');
    if (context !== 'ssg') {
      // Skip the test if the page is not server-side rendered.
      console.warn('Skipping test as the page is not server-side rendered.');
      return;
    }

    const render1 = await fetch(browser.baseUrl);
    const text1 = await render1.text();
    expect(text1).toContain('.svg-inline--fa');

    // Repeated second time to make sure that second render also includes the styles.
    // To achieve it we use WeakSet instead of a simple global variable.
    const render2 = await fetch(browser.baseUrl);
    const text2 = await render2.text();
    expect(text2).toContain('.svg-inline--fa');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({ level: logging.Level.SEVERE }));
  });
});
