/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-constructor */
import Snackbar from 'node-snackbar/dist/snackbar.min';
// import snackbar
import 'node-snackbar/dist/snackbar.min.css';

import { BASE_URL } from '../../globals/config';

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
          <h2 tabindex="0">Our Testimonials</h2>
        </div>

        <div class="detail-reviews-container">
          ${detail.customerReviews
            .map(
              ({ name, review }) => `<div class="detail-reviews-root">
            <div class="detail-reviews-root-img">
            <picture>
              <source media="(max-width: 800px)" srcset="/images/reviews/user-small.jpg" />
              <img src="/images/reviews/user-large.jpg" width="400" height="400" title="review from ${name}" alt="review from ${name}" />
            </picture>
            </div>
            <p class="detail-reviews-root-content" tabindex="0">
              "${review}."
            </p>
            <p class="detail-reviews-root-name" tabindex="0">- ${name}</p>
          </div>`,
            )
            .join('')}
        </div>

        <div class="detail-reviews-title-container review-form">
          <h3 tabindex="0">Add your Review</h3>
          <form method="POST" action="${BASE_URL}/review" id="form-review">
            <input type="hidden" name="id" value="${detail.id}" />
            <div class="review-form-full">
              <input type="text" placeholder="Name" id="name" name="name" class="form-input" 
              required data-error="Please enter your name">
            </div>
            <div class="review-form-full">
              <textarea class="form-input" id="review" name="review" placeholder="Enter your review" rows="5" data-error="Write your review" required></textarea>
            </div>
            <div class="review-form-full">
              <input type="submit" role="button" value="Submit" class="review-form-submit" />
            </div>
          </form>
        </div>
        `;

      const formReview = this.querySelector('#form-review');
      formReview.addEventListener(
        'submit',
        (e) => {
          e.preventDefault();
          const form = e.target;
          const formData = new FormData(form);
          const formDataObj = Object.fromEntries(formData);

          if (formDataObj && formDataObj.id) {
            const body = new URLSearchParams(formData);

            fetch(form.getAttribute('action'), {
              method: 'post',
              body,
            })
              .then((response) => {
                Snackbar.show({
                  pos: 'bottom-right',
                  text: 'Already submit your review.',
                  actionText: 'Thanks',
                  actionTextColor: '#0081b4',
                });
                return response.json();
              })
              .then((data) => {
                const customerReviews = data.customerReviews || null;
                if (customerReviews) {
                  this.setAttribute(
                    'detail',
                    JSON.stringify({ ...detail, customerReviews }),
                  );
                  this.connectedCallback();
                }
              })
              .catch(() => {
                Snackbar.show({
                  pos: 'bottom-right',
                  text: 'Something went wrong, please try again.',
                  actionText: 'Dismiss',
                });
              });
          } else {
            Snackbar.show({
              pos: 'bottom-right',
              text: 'Something went wrong, please try again.',
              actionText: 'Dismiss',
            });
          }
        },
        true,
      );
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
