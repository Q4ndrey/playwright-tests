import { test, expect } from '@playwright/test';
import { elements } from './mainPage.spec';

test.describe('тесты главной страницы Playerok', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playerok.com/');
  });
  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    await expect
      .soft(page.getByRole('banner').getByRole('link').filter({ hasText: /^$/ }))
      .toBeVisible();
    await expect.soft(page.getByRole('switch')).toBeVisible();
    await expect.soft(page.getByRole('banner').locator('label')).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Призы' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Продать' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Чаты' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Профиль' })).toBeVisible();
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    await expect
      .soft(page.getByRole('banner').getByRole('link').filter({ hasText: /^$/ }))
      .toContainText('');
    await expect.soft(page.getByRole('switch')).toContainText('');
    await expect.soft(page.getByRole('banner').locator('label')).toContainText('');
    await expect.soft(page.getByRole('link', { name: 'Призы' })).toContainText('Призы');
    await expect.soft(page.getByRole('link', { name: 'Продать' })).toContainText('Продать');
    await expect.soft(page.getByRole('link', { name: 'Чаты' })).toContainText('Чаты');
    await expect.soft(page.getByRole('link', { name: 'Профиль' })).toContainText('Профиль');
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    await expect
      .soft(page.getByRole('banner').getByRole('link').filter({ hasText: /^$/ }))
      .toHaveAttribute('href', '/');
    await expect
      .soft(page.getByRole('link', { name: 'Призы' }))
      .toHaveAttribute('href', '/happy-birthday-giveaway');
    await expect
      .soft(page.getByRole('link', { name: 'Продать' }))
      .toHaveAttribute('href', '/seller');
    await expect
      .soft(page.getByRole('link', { name: 'Чаты' }))
      .toHaveAttribute('href', '/profile/auth');
    await expect
      .soft(page.getByRole('link', { name: 'Профиль' }))
      .toHaveAttribute('href', '/profile/auth');
  });
});
test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator }) => {
      test.step('Проверка отображения элемента Playwright logo', async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });

    test('Проверка названия элементов навигации хедера', async ({ page }) => {
      await expect
        .soft(page.getByRole('link', { name: 'Playwright logo Playwright' }))
        .toContainText('Playwright');
      await expect.soft(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
      await expect.soft(page.getByRole('link', { name: 'MCP', exact: true })).toContainText('MCP');
      await expect.soft(page.getByRole('link', { name: 'CLI', exact: true })).toContainText('CLI');
      await expect.soft(page.getByRole('link', { name: 'API' })).toContainText('API');
      await expect.soft(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
    });

    test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
      await expect
        .soft(page.getByRole('link', { name: 'Playwright logo Playwright' }))
        .toHaveAttribute('href', '/');
      await expect
        .soft(page.getByRole('link', { name: 'Docs' }))
        .toHaveAttribute('href', '/docs/intro');
      await expect
        .soft(page.getByRole('link', { name: 'MCP', exact: true }))
        .toHaveAttribute('href', '/mcp/introduction');
      await expect
        .soft(page.getByRole('link', { name: 'CLI', exact: true }))
        .toHaveAttribute('href', '/agent-cli/introduction');
      await expect
        .soft(page.getByRole('link', { name: 'API' }))
        .toHaveAttribute('href', '/docs/api/class-playwright');
      await expect
        .soft(page.getByRole('link', { name: 'GitHub repository' }))
        .toHaveAttribute('href', 'https://github.com/microsoft/playwright');
      await expect
        .soft(page.getByRole('link', { name: 'Discord server' }))
        .toHaveAttribute('href', 'https://aka.ms/playwright/discord');
    });

    test('Проверка переключения светлого режима', async ({ page }) => {
      await page.getByRole('button', { name: 'Switch between dark and light' }).click();
      await page.getByRole('button', { name: 'Switch between dark and light' }).click();
      await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    });

    test('Проверка заголовка страницы', async ({ page }) => {
      await expect
        .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
        .toBeVisible();
      await expect
        .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
        .toContainText(
          'Playwright enables reliable web automation for testing, scripting, and AI agents.',
        );
    });

    test('Проверка кнопки "Get started"', async ({ page }) => {
      await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
      await expect
        .soft(page.getByRole('link', { name: 'Get started' }))
        .toContainText('Get started');
      await expect
        .soft(page.getByRole('link', { name: 'Get started' }))
        .toHaveAttribute('href', '/docs/intro');
    });
  });
});
