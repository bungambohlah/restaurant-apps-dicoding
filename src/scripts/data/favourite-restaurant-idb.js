import { openDB } from 'idb';
import {
  DATABASE_NAME,
  DATABASE_VERSION,
  OBJECT_STORE_NAME,
} from '../globals/config';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    if (id) {
      return (await dbPromise).get(OBJECT_STORE_NAME, id);
    }

    return undefined;
  },
  async getAllRestaurants() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    if (restaurant && restaurant.id) {
      return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    }

    return undefined;
  },
  async deleteRestaurant(id) {
    if (id) {
      return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    }

    return undefined;
  },
};

export default FavoriteRestaurantIdb;
