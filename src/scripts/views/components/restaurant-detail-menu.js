/* eslint-disable no-useless-constructor */

class RestaurantDetailMenu extends HTMLElement {
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
      this.innerHTML = `<div class="detail-restaurant-menu-container">
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

window.customElements.define('restaurant-detail-menu', RestaurantDetailMenu);
