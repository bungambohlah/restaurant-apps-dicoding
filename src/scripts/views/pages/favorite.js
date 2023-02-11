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
    const listContainer = document.querySelector('#restaurants-container');

    try {
      const favorites = await FavoriteRestaurantIdb.getAllRestaurants();

      if (favorites && favorites.length) {
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
      } else if (!favorites || (favorites && !favorites.length)) {
        listContainer.setAttribute(
          'style',
          'grid-template-columns: repeat(1, minmax(0, 1fr)); margin-top: -3rem',
        );
        listContainer.innerHTML = '<error-card favoriteempty="true" />';
      }
    } catch (error) {
      listContainer.setAttribute(
        'style',
        'grid-template-columns: repeat(1, minmax(0, 1fr)); margin-top: -3rem',
      );
      listContainer.innerHTML = '<error-card />';
    } finally {
      // if list existing then remove the loader element;
      const loaderContainer = document.querySelector('.loader-container');
      loaderContainer.remove();

      // scroll window to the top after render
      window.scrollTo(0, 0);
    }
  },
};

export default FavoritePage;
