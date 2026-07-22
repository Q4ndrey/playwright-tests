import { test, expect } from '../fixtures/playerokMainPage';
import { PlayerokMainPage } from '../models/PlayerokMainPage';

test.describe('тесты главной страницы Playerok', () => {
  test('Проверка отображения элементов навигации хедера', async ({ playerokMainPage }) => {
    await playerokMainPage.checkElementsVisibility();
  });

  test('Проверка названия элементов навигации хедера', async ({ playerokMainPage }) => {
    await playerokMainPage.checkElementsText();
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ playerokMainPage }) => {
    await playerokMainPage.checkElementsHrefAttributes();
  });
});
