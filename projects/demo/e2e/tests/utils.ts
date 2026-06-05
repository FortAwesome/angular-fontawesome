import * as puppeteer from 'puppeteer';

const baseUrl = process.env['baseUrl'] ?? 'http://localhost:4200/';
let browser: puppeteer.Browser;
let page: puppeteer.Page;

export function setupBrowserHooks(path = ''): void {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: process.env['CI'] ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
    });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${baseUrl}${path}`);
  });

  afterEach(async () => {
    await page?.close();
  });

  afterAll(async () => {
    await browser?.close();
  });
}

export function getBrowserState(): {
  browser: puppeteer.Browser;
  page: puppeteer.Page;
  baseUrl: string;
} {
  if (!browser) {
    throw new Error('No browser state found! Ensure `setupBrowserHooks()` is called.');
  }
  return {
    browser,
    page,
    baseUrl,
  };
}
