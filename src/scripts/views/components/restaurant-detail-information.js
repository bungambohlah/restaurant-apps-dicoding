/* eslint-disable no-useless-constructor */
// import star rating
import '@jchristou/star-rating-web-component';

// import star rating scss
import '@jchristou/star-rating-web-component/dist/StarRating.scss';

class RestaurantDetailInfo extends HTMLElement {
  // first, observe the attributes
  static get observedAttributes() {
    return ['detail'];
  }

  constructor() {
    // Always call super first in constructor
    super();
  }

  // lifecycle web components
  connectedCallback() {
    let detail = null;
    if (this.hasAttribute('detail')) detail = JSON.parse(this.detail);

    if (!detail) {
      this.innerHTML = ``;
    } else if (detail) {
      this.innerHTML = `<div class="restaurant-desc-section">
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
      </div>`;
    }
  }

  /**
   * @param {String} detail
   */
  set detail(detail) {
    this.setAttribute('detail', detail);
  }

  get detail() {
    return this.getAttribute('detail');
  }
}

window.customElements.define(
  'restaurant-detail-information',
  RestaurantDetailInfo,
);
