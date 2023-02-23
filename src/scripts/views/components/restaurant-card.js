/* eslint-disable no-useless-constructor */
// import star rating
import '@jchristou/star-rating-web-component';

// import star rating scss
import '@jchristou/star-rating-web-component/dist/StarRating.scss';

// import base image url
import { BASE_IMAGE_URL, BASE_MEDIUM_IMAGE_URL } from '../../globals/config';

class RestaurantCard extends HTMLElement {
  // first, observe the attributes
  static get observedAttributes() {
    return ['restaurant'];
  }

  constructor() {
    // Always call super first in constructor
    super();
  }

  // lifecycle web components
  connectedCallback() {
    let data = null;
    if (this.hasAttribute('restaurant')) data = JSON.parse(this.restaurant);

    if (!data) {
      this.innerHTML = ``;
    } else if (data) {
      this.innerHTML = `<div class="restaurants-card" tabindex="0">
              <picture>
                <source media="(max-width: 800px)" data-srcset="${BASE_IMAGE_URL}/${data.pictureId}" />
                <img tabindex="0" class="lazyload" data-src="${BASE_MEDIUM_IMAGE_URL}/${data.pictureId}" alt="${data.name}"  />
              </picture>
              <h1 tabindex="0" class="restaurant-card-body">${data.name}</h1>
              <div class="restaurant-card-footer">
                <p tabindex="0">${data.city}</p>
                <p tabindex="0"><star-rating value="${data.rating}" class="container-small"></star-rating></p>
              </div>
            </div>`;
    }
  }

  /**
   * @param {String} restaurant
   */
  set restaurant(restaurant) {
    this.setAttribute('restaurant', restaurant);
  }

  get restaurant() {
    return this.getAttribute('restaurant');
  }
}

window.customElements.define('restaurant-card', RestaurantCard);
