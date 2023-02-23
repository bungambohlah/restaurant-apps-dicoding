/* eslint-disable no-useless-constructor */

// import scss
import '../../../styles/error.scss';

// import svg
import ErrorSvg from './error.svg';

class ErrorCard extends HTMLElement {
  // first, observe the attributes
  static get observedAttributes() {
    return ['favoriteempty'];
  }

  constructor() {
    // Always call super first in constructor
    super();
  }

  // lifecycle web components
  connectedCallback() {
    if (this.hasAttribute('favoriteempty')) {
      this.innerHTML = `<div class="main-error-page">
        <h1 class="error-title">
          Woops! <br>Your favorite card is still empty
        </h1>
      </div>`;
    } else {
      this.innerHTML = `<div class="main-error-page">
        ${ErrorSvg}
        <h1 class="error-title">
          Woops! <br>Something went wrong :(
        </h1>
        <button aria-label="back to home page" type="button" role="button" class="button-error" onclick="window.location.href='/#/'">
          Back to Home
        </button>
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

window.customElements.define('error-card', ErrorCard);
