import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favourite-restaurant-idb';

beforeEach(async () => {
  document.body.innerHTML = `<div id="likeButtonContainer"></div>`;

  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    restaurant: {
      id: 1,
      name: 'test',
      pictureId: '3',
      city: 'test',
      rating: '4.5',
    },
  });
});

afterEach(async () => {
  // remove liked restaurant from idb
  await FavoriteRestaurantIdb.deleteRestaurant(1);
});

describe('A Integration Test for like and unlike the restaurant', () => {
  it('should show the like button when the restaurant has not been liked before', async () => {
    expect(
      document.querySelector('[aria-label="like this restaurant"]'),
    ).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    expect(
      document.querySelector('[aria-label="unlike this restaurant"]'),
    ).toBeFalsy();
  });
});

describe('Liking a Restaurant', () => {
  it('should be able to like the restaurant', async () => {
    // trigger click with dispatchEvent
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // get idb from liked restaurant
    const { id } = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(id).toEqual(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    // add liked restaurant to the idb
    await FavoriteRestaurantIdb.putRestaurant({
      id: 1,
      name: 'test',
      pictureId: '3',
      city: 'test',
      rating: '4.5',
    });

    // trigger click with dispatchEvent
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // get all restaurants and check only 1 data stored to the idb
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantId1 = restaurants.filter((x) => x.id === 1);
    expect(restaurantId1).toHaveSize(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {},
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});

describe('Unliking a Restaurant', () => {
  beforeEach(async () => {
    await FavoriteRestaurantIdb.putRestaurant({
      id: 1,
      name: 'test',
      pictureId: '3',
      city: 'test',
      rating: '4.5',
    });
  });

  it('should display unlike button when the restaurant has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
        name: 'test',
        pictureId: '3',
        city: 'test',
        rating: '4.5',
      },
    });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]'),
    ).toBeTruthy();
  });

  it('should not display like button when the restaurant has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
        name: 'test',
        pictureId: '3',
        city: 'test',
        rating: '4.5',
      },
    });

    expect(
      document.querySelector('[aria-label="like this restaurant"]'),
    ).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
        name: 'test',
        pictureId: '3',
        city: 'test',
        rating: '4.5',
      },
    });

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
        name: 'test',
        pictureId: '3',
        city: 'test',
        rating: '4.5',
      },
    });

    // remove restaurant from favorite list first
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    // simulate to unlike restaurant
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
