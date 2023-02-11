import FavoriteRestaurantIdb from '../../data/favourite-restaurant-idb';

// import web components
import '../components/restaurant-card';

const FavoritePage = {
  async render() {
    return `
    <section id="restaurants">
      <div class="loader-container"><span class="loader"></span></div>
      <h1 class="favorite-title">Your Favorite Restaurant</h1>
      <div id="restaurants-container" class="restaurants-container favorite">
      </div>
    </section>
    `;
  },

  async afterRender() {
    const favorites = await FavoriteRestaurantIdb.getAllRestaurants();
    const listContainer = document.querySelector('#restaurants-container');
    if (favorites && favorites.length) {
      // if list existing then remove the loader element;
      const loaderContainer = document.querySelector('.loader-container');
      loaderContainer.remove();

      favorites.forEach((favorite) => {
        const data = JSON.stringify(favorite);

        // append child to the restaurantContainer element
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.setAttribute('restaurant', data);
        listContainer.appendChild(restaurantCard);

        restaurantCard.addEventListener('click', (event) => {
          event.preventDefault();
          window.location.href = `/#/detail/${favorite.id}`;
        });

        // for accessibility purpose
        restaurantCard.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            window.location.href = `/#/detail/${favorite.id}`;
          }
        });
      });
    }

    // scroll window to the top after render
    window.scrollTo(0, 0);
  },
};

export default FavoritePage;
