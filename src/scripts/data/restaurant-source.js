import { DETAIL, LIST } from '../globals/api-endpoint';

class RestaurantSource {
  static async list() {
    const response = await fetch(LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }
}

export default RestaurantSource;
