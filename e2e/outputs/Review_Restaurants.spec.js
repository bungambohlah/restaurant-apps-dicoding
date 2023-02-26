const assert = require('assert');

Feature('Review Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/');
});

Scenario('showing review in the first detail restaurant', ({ I }) => {
  I.waitForElement('#restaurants-container restaurant-card', 5);

  const firstRestaurant = locate(
    '#restaurants-container restaurant-card',
  ).first();

  I.forceClick(firstRestaurant);

  I.waitForElement(
    '#detail-restaurant .detail-reviews restaurant-detail-testimonial .detail-reviews-container .detail-reviews-root',
    5,
  );
});

Scenario('not showing review if detail restaurant is not found', ({ I }) => {
  I.amOnPage('/#/detail/not-found');

  I.waitForElement('#detail-restaurant error-card', 5);
});

Scenario(
  'submit new review to the selected detail restaurant',
  async ({ I }) => {
    I.waitForElement('#restaurants-container restaurant-card', 5);

    const firstRestaurant = locate(
      '#restaurants-container restaurant-card',
    ).first();

    I.forceClick(firstRestaurant);

    I.waitForElement(
      '#detail-restaurant .detail-reviews restaurant-detail-testimonial .detail-reviews-container .detail-reviews-root',
      5,
    );

    I.fillField('name', 'test e2e');
    I.fillField('review', 'test e2e long description');
    I.click('Submit');

    I.waitForElement(
      '#detail-restaurant .detail-reviews restaurant-detail-testimonial .detail-reviews-container .detail-reviews-root',
      5,
    );

    const currentFilledName = locate(
      '#detail-restaurant .detail-reviews restaurant-detail-testimonial .detail-reviews-container .detail-reviews-root .detail-reviews-root-name',
    ).last();
    const currentFilledContent = locate(
      '#detail-restaurant .detail-reviews restaurant-detail-testimonial .detail-reviews-container .detail-reviews-root .detail-reviews-root-content',
    ).last();

    const currentFilledNameText = await I.grabTextFrom(currentFilledName);
    const currentFilledContentText = await I.grabTextFrom(currentFilledContent);

    assert.strictEqual('- test e2e', currentFilledNameText);
    assert.strictEqual(
      '"test e2e long description."',
      currentFilledContentText,
    );
  },
);
