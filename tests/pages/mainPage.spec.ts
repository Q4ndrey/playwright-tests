import { test, expect } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });
  test('Проверка отображения элементов навигации хедера', async () => {
    await mainPage.checkElementsVisibility();
  });

  test('Проверка названия элементов навигации хедера', async () => {
    await mainPage.checkElementsText();
  });

  test('Проверка атрибутов href элементов навигации хедера', async () => {
    await mainPage.checkElementsHrefAttributes();
  });

  test('Проверка переключения светлого режима', async () => {
    await test.step(`Нажатие на иконку переключения лайт мода`, async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step(`Проверка смены значения атрибута`, async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test(`Проверка стилей со светлой темой`, async () => {
    await test.step(`Установка светлой темы`, async () => {});
    await mainPage.setLightMode();
    await test.step(`Скриншотная проверка с активной светлой темой`, async () => {});
    await mainPage.checkLayoutWithLightMode();
  });

  test(`Проверка стилей с тёмной темой`, async () => {
    await test.step(`Установка тёмной темы`, async () => {});
    await mainPage.setDarkMode();
    await test.step(`Скриншотная проверка с активной тёмной темой`, async () => {});
    await mainPage.checkLayoutWithDarkMode();
  });
});
