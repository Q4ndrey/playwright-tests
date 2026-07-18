import { test, expect } from '@playwright/test';

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
