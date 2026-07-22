import { test as base } from '@playwright/test';
import { PlayerokMainPage } from '../models/PlayerokMainPage';

// Declare the types of your fixtures.
type MyFixtures = {
  playerokMainPage: PlayerokMainPage;
};

// Extend base test by providing "playerokMainPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  playerokMainPage: async ({ page }, use) => {
    // Set up the fixture.
    const playerokMainPage = new PlayerokMainPage(page);
    await playerokMainPage.openPlayerokMainPage();

    // Use the fixture value in the test.
    await use(playerokMainPage);
  },
});
export { expect } from '@playwright/test';
