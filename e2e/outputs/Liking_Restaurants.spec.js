const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#restaurants-container error-card[favoriteempty="true"]');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.amOnPage('/#/');

  I.waitForElement('#restaurants-container restaurant-card', 5);

  const firstRestaurant = locate(
    '#restaurants-container restaurant-card',
  ).first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  I.forceClick(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.forceClick('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('#restaurants-container restaurant-card', 3);
  const likedRestaurants = locate(
    '#restaurants-container restaurant-card',
  ).first();
  const likedRestaurantName = await I.grabTextFrom(likedRestaurants);

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario(
  'liking three restaurant and check favorite its same',
  async ({ I }) => {
    I.amOnPage('/#/');

    I.waitForElement('#restaurants-container restaurant-card', 5);

    const names = [];

    for (let i = 1; i <= 3; i++) {
      const selectedRestaurant = locate(
        '#restaurants-container restaurant-card',
      ).at(i);
      const selectedRestaurantName = await I.grabTextFrom(selectedRestaurant);
      names.push(selectedRestaurantName);

      I.forceClick(selectedRestaurant);

      I.waitForElement('#likeButton', 5);
      I.forceClick('#likeButton');
      I.amOnPage('/#/');
    }

    I.amOnPage('/#/favorite');
    I.waitForElement('#restaurants-container restaurant-card', 3);

    for (let i = 1; i <= 3; i++) {
      const likedRestaurants = locate(
        '#restaurants-container restaurant-card',
      ).at(i);
      const likedRestaurantName = await I.grabTextFrom(likedRestaurants);
      assert.strictEqual(names[i - 1], likedRestaurantName);
    }
  },
);
