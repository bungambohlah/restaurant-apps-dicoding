import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';

// import scss only for detail
import '../../../styles/detail.scss';
import { BASE_LARGE_IMAGE_URL } from '../../globals/config';

// import star rating
import '@jchristou/star-rating-web-component';

// import star rating scss
import '@jchristou/star-rating-web-component/dist/StarRating.scss';

const NowPlaying = {
  async render() {
    return `
      <section id="detail-restaurant"></section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await RestaurantSource.detailRestaurant(url.id);
    const detailContainer = document.querySelector('#detail-restaurant');
    detailContainer.innerHTML = `
    <div class="detail-restaurant-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${BASE_LARGE_IMAGE_URL}/${detail.pictureId});">
      <h1 tabindex="0">${detail.name}</h1>
    </div>
    <div class="detail-restaurant-description">
      <div class="restaurant-desc-section">
        <h2 tabindex="0">Our Information</h2>
        <div class="restaurant-desc-section-info">
          <div class="restaurant-desc-section-item">
            <p tabindex="0">${detail.description}</p>
          </div>
          <div class="restaurant-desc-section-item">
            <div class="restaurant-desc-section-info-container">
              <h3 tabindex="0">GET IN TOUCH</h3>
              <div>
                <div class="restaurant-desc-section-info-item">
                  <div class="restaurant-desc-section-info-item-icon">
                    <i class="lni lni-map-marker"></i>
                  </div>
                  <p tabindex="0">${detail.address}, ${detail.city}</p>
                </div>
                <div class="restaurant-desc-section-info-item">
                  <div class="restaurant-desc-section-info-item-icon">
                    <i class="lni lni-users"></i>
                  </div>
                  <p tabindex="0"><star-rating value="${
                    detail.rating
                  }" class="container-small"></star-rating></p>
                </div>
                <div class="restaurant-desc-section-info-item">
                  <div class="restaurant-desc-section-info-item-icon">
                    <i class="lni lni-restaurant"></i>
                  </div>
                  <p tabindex="0">${detail.categories
                    .map(({ name }) => name)
                    .join(', ')} Restaurants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-restaurant-menu">
      <div class="detail-restaurant-menu-container">
        <h2 tabindex="0">Our Menus</h2>
        <h3 tabindex="0">Food Menus</h3>
        <div class="detail-restaurant-menu-content">
          ${detail.menus.foods
            .map(
              ({
                name,
              }) => `<div class="detail-restaurant-menu-content-container">
            <div class="detail-restaurant-menu-content-container-root">
              <div class="detail-restaurant-menu-content-icon"><i class="lni lni-dinner"></i></div>
              <div>
                <h4 class="menu-title" tabindex="0">${name}</h3>
              </div>
            </div>
          </div>`,
            )
            .join('')}
        </div>
        <h3 tabindex="0">Drink Menus</h3>
        <div class="detail-restaurant-menu-content">
          ${detail.menus.drinks
            .map(
              ({
                name,
              }) => `<div class="detail-restaurant-menu-content-container">
              <div class="detail-restaurant-menu-content-container-root">
                <div class="detail-restaurant-menu-content-icon"><i class="lni lni-juice"></i></div>
                <div>
                  <h4 class="menu-title" tabindex="0">${name}</h3>
                </div>
              </div>
            </div>`,
            )
            .join('')}
        </div>
      </div>
    </div>
    <div class="detail-reviews">
      <div class="detail-reviews-title-container">
        <h2 tabindex="0">Our Testimonials</h3>
      </div>

      <div class="detail-reviews-container">
        ${detail.customerReviews
          .map(
            ({ name, review }) => `<div class="detail-reviews-root">
          <div class="detail-reviews-root-img">
            <img src="/images/reviews/user.jpg" />
          </div>
          <p class="detail-reviews-root-content" tabindex="0">
            "${review}."
          </p>
          <p class="detail-reviews-root-name" tabindex="0">- ${name}</p>
        </div>`,
          )
          .join('')}
      </div>
    </div>
    `;
    console.log('detail', detail);
  },
};

export default NowPlaying;
