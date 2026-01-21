import test, { expect } from '@playwright/test';

const URL = '**/api/character**';

const mockCharacter = {
  info: { count: 1, pages: 1, next: null, prev: null },
  results: [
    {
      id: 1,
      name: 'Test Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth (C-137)',
        url: 'https://rickandmortyapi.com/api/location/1'
      },
      location: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3'
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z'
    }
  ]
};

test('Запрашиваем список персонажей', async ({ page }) => {
  await page.route(URL, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockCharacter)
    });
  });

  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Test Sanchez' })).toBeVisible();
});

test('Посещение страницы со списком персонажей', async ({ page }) => {
  await page.goto('/');
  await page.getByAltText('Rich Sanchez');
});

test('Проверяем что селектор Species содержит 8 элементов', async ({
  page
}) => {
  await page.goto('/');

  const selectorButton = page.getByRole('button', { name: 'Species' });
  await expect(selectorButton).toBeVisible();

  await selectorButton.click();

  const options = selectorButton.locator('..').locator('ul li');

  await expect(options).toHaveCount(8);
});

test('Имена персонажей совпадают с указанными', async ({ page }) => {
  await page.goto('/');

  expect(page.getByText('Rick Sanchez'));
  expect(page.getByText('Morty Smith'));
});

test('Делаем запрос со значением из инпута', async ({ page }) => {
  await page.route(URL, async (route) => {
    const url = route.request().url();

    if (url.includes('name=Test+Sanchez')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCharacter)
      });
    }
  });

  await page.goto('/');

  await page.getByPlaceholder('Filter by name...').fill('Test Sanchez');

  await expect(page.getByRole('link', { name: 'Test Sanchez' })).toBeVisible();
});
