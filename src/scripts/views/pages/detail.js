import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';

// import scss only for detail
import '../../../styles/detail.scss';
import { BASE_LARGE_IMAGE_URL } from '../../globals/config';

// import web components
import '../components/restaurant-detail-information';
import '../components/restaurant-detail-menu';
import '../components/restaurant-detail-testimonial';
import '../components/error-card';

// import templates
import { createLikeButtonTemplate } from '../template/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const DetailPage = {
  async render() {
    return `
      <section id="detail-restaurant">
        <div class="loader-container"><span class="loader"></span></div>
      </section>
    `;
  },

  async afterRender() {
    const detailContainer = document.querySelector('#detail-restaurant');

    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const detail = await RestaurantSource.detailRestaurant(url.id);

      if (detail) {
        const detailString = JSON.stringify(detail);

        detailContainer.innerHTML = `
        <div class="detail-restaurant-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
        url(${BASE_LARGE_IMAGE_URL}/${detail.pictureId});">
          <h1 tabindex="0">${detail.name}</h1>
          <div id="likeButtonContainer"></div>
        </div>
        <div class="detail-restaurant-description"></div>
        <div class="detail-restaurant-menu"></div>
        <div class="detail-reviews"></div>
        `;

        // add favorite button
        LikeButtonInitiator.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          restaurant: {
            id: detail.id,
            name: detail.name,
            pictureId: detail.pictureId,
            city: detail.city,
            rating: detail.rating,
          },
        });

        const likeButtonContainer = document.querySelector(
          '#likeButtonContainer',
        );
        likeButtonContainer.innerHTML = createLikeButtonTemplate();

        // add detail information
        const detailRestaurantDesc = detailContainer.querySelector(
          '.detail-restaurant-description',
        );
        const restaurantDetailInfo = document.createElement(
          'restaurant-detail-information',
        );
        restaurantDetailInfo.setAttribute('detail', detailString);
        detailRestaurantDesc.appendChild(restaurantDetailInfo);

        // add detail menu
        const detailRestaurantMenu = detailContainer.querySelector(
          '.detail-restaurant-menu',
        );
        const restaurantDetailMenu = document.createElement(
          'restaurant-detail-menu',
        );
        restaurantDetailMenu.setAttribute('detail', detailString);
        detailRestaurantMenu.appendChild(restaurantDetailMenu);

        // add detail testimonial
        const detailRestaurantTesti =
          detailContainer.querySelector('.detail-reviews');
        const restaurantDetailTesti = document.createElement(
          'restaurant-detail-testimonial',
        );
        restaurantDetailTesti.setAttribute('detail', detailString);
        detailRestaurantTesti.appendChild(restaurantDetailTesti);
      } else if (!detail) {
        detailContainer.innerHTML = '<error-card />';
      }
    } catch (error) {
      detailContainer.innerHTML = '<error-card />';
    } finally {
      // scroll window to the top after render
      window.scrollTo(0, 0);
    }
  },
};

export default DetailPage;
