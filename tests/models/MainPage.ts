import test, { expect, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'MCP', exact: true }),
        name: 'MCP link',
        text: 'MCP',
        attribute: {
          type: 'href',
          value: '/mcp/introduction',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'CLI', exact: true }),
        name: 'CLI link',
        text: 'CLI',
        attribute: {
          type: 'href',
          value: '/agent-cli/introduction',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'API link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js button',
        text: 'Node.js',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
        name: 'GitHub repository link',
        attribute: {
          type: 'href',
          value: 'https://github.com/microsoft/playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
        name: 'Discord server link',
        attribute: {
          type: 'href',
          value: 'https://aka.ms/playwright/discord',
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('button', { name: 'Switch between dark and light' }),
        name: 'Switch theme button',
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Control+k)' }),
        name: 'Search button',
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started link',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }
  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }
  async checkElementsVisibility() {
    for (const { locator, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }
  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(`Проверка текста элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toContainText(text);
        });
      }
    }
  }
  async checkElementsHrefAttributes() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute && attribute.type === 'href') {
        await test.step(`Проверка атрибута href элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toHaveAttribute('href', attribute.value);
        });
      }
    }
  }
  async clickSwitchLightModeIcon() {
    await this.page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await this.page.getByRole('button', { name: 'Switch between dark and light' }).click();
  }
  async checkDataThemeAttributeValue() {
    await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme', 'dark');
  }
  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }
  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }
  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot(`pageWithLightMode.png`);
  }
  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot(`pageWithDarkMode.png`);
  }
}
