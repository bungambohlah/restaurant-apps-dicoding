// import star rating
import "@jchristou/star-rating-web-component";

// import star rating scss
import "@jchristou/star-rating-web-component/dist/StarRating.scss";

class RestaurantCard extends HTMLElement {
  // first, observe the attributes
  static get observedAttributes() {
    return ["restaurant"];
  }

  constructor() {
    // Always call super first in constructor
    super();
  }

  // lifecycle web components
  connectedCallback() {
    let data = null;
    if (this.hasAttribute("restaurant")) data = JSON.parse(this.restaurant);

    if (!data) {
      this.innerHTML = ``;
    } else if (data) {
      this.innerHTML = `<div class="restaurants-card">
              <a>
                <img src="${data.pictureId}" alt="${data.name} picture" />
              </a>
              <div class="restaurant-card-body">
                <a>
                  <h1>${data.name}</h1>
                </a>
              </div>
              <div class="restaurant-card-footer">
                <p>${data.city}</p>
                <p><star-rating value="${data.rating}" class="container-small"></star-rating></p>
              </div>
            </div>`;
    }
  }

  disconnectedCallback() {}

  attributeChangedCallback() {}

  /**
   * @param {String} restaurant
   */
  set restaurant(restaurant) {
    this.setAttribute("restaurant", restaurant);
  }

  get restaurant() {
    return this.getAttribute("restaurant");
  }
}

window.customElements.define("restaurant-card", RestaurantCard);
