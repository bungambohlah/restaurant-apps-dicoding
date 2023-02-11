/* eslint-disable no-useless-constructor */

class RestaurantDetailTesti extends HTMLElement {
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
      this.innerHTML = `<div class="detail-reviews-title-container">
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
  'restaurant-detail-testimonial',
  RestaurantDetailTesti,
);
