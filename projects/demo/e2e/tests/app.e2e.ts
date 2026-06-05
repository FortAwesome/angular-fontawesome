import { getBrowserState, setupBrowserHooks } from './utils';

describe('App test', function () {
  setupBrowserHooks();

  it('should render all icons', async () => {
    const { page } = getBrowserState();

    const svgs = await page.$$('svg');

    expect(svgs.length).toBe(47);
  });

  it('should only add styles once', async () => {
    const { page } = getBrowserState();

    const stylesContent = await page.$$eval('style', (styles) => styles.map((s) => s.innerHTML));
    const fontAwesomeStyles = stylesContent.filter((style) => style.includes('.svg-inline--fa'));

    expect(fontAwesomeStyles.length).toBe(1);
  });

  it('should include styles in the server-side-rendered page', async () => {
    const { page, baseUrl } = getBrowserState();

    const context = await page.$eval('app-root', (el) => el.getAttribute('ng-server-context'));
    if (context !== 'ssg') {
      pending('Skipping test as the page is not server-side rendered.');
      return;
    }

    const render1 = await fetch(baseUrl);
    const text1 = await render1.text();
    expect(text1).toContain('.svg-inline--fa');

    // Repeated second time to make sure that second render also includes the styles.
    // To achieve it we use WeakSet instead of a simple global variable.
    const render2 = await fetch(baseUrl);
    const text2 = await render2.text();
    expect(text2).toContain('.svg-inline--fa');
  });
});
