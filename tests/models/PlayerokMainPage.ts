import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  hasText?: any;
  name?: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class PlayerokMainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('banner').getByRole('link').filter({ hasText: /^$/ }),
        hasText: /^$/,
        text: '',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('banner').locator('label'),
        text: '',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Итоги' }),
        name: 'Итоги',
        text: 'Итоги',
        attribute: {
          type: 'href',
          value: '/happy-birthday-giveaway',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Продать' }),
        name: 'Продать',
        text: 'Продать',
        attribute: {
          type: 'href',
          value: '/seller',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Чаты' }),
        name: 'Чаты',
        text: 'Чаты',
        attribute: {
          type: 'href',
          value: '/profile/auth',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Профиль' }),
        name: 'Профиль',
        text: 'Профиль',
        attribute: {
          type: 'href',
          value: '/profile/auth',
        },
      },
    ];
  }
  async openPlayerokMainPage() {
    await this.page.goto('https://playerok.com/');
  }
  async checkElementsVisibility() {
    for (const { locator, hasText, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${hasText || name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }
  async checkElementsText() {
    for (const { locator, hasText, name, text } of this.elements) {
      if (text) {
        await test.step(`Проверка текста элемента ${hasText || name}`, async () => {
          await expect.soft(locator(this.page)).toContainText(text);
        });
      }
    }
  }
  async checkElementsHrefAttributes() {
    for (const { locator, hasText, name, attribute } of this.elements) {
      if (attribute && attribute.type === 'href') {
        await test.step(`Проверка атрибута href элемента ${hasText || name}`, async () => {
          await expect.soft(locator(this.page)).toHaveAttribute('href', attribute.value);
        });
      }
    }
  }
}
