import 'regenerator-runtime'; /* for async await transpile */

// import web components
import './restaurant-card';

// import css / scss
import '../styles/main.scss';
import '../styles/header.scss';
import '../styles/section.scss';
import '../styles/lineicons.scss';

// import dummy data
import DummyData from '../DATA.json';

// import to register service worker
import swRegister from './utils/sw-register';

// add classname when on scroll
window.onscroll = function windowOnScroll() {
  const headerNavbar = document.querySelector('.navbar');
  // add offset to 8px
  const sticky = headerNavbar.offsetTop + 8;

  if (window.pageYOffset > sticky) {
    headerNavbar.classList.add('sticky');
  } else {
    headerNavbar.classList.remove('sticky');
  }
};

// toggle side menu in the mobile devices
const allElms = document.querySelector('body');
const menu = document.querySelector('.side-menu');
const drawer = document.querySelector('.menu-item');
allElms.addEventListener('click', (event) => {
  event.stopPropagation();
  if (drawer.classList.contains('open-menu-item')) {
    drawer.classList.toggle('open-menu-item');
  }
});
menu.addEventListener('click', (event) => {
  event.stopPropagation();
  drawer.classList.toggle('open-menu-item');
});

// update year
const yearCopy = document.getElementById('yearCopy');
if (yearCopy) {
  yearCopy.textContent = new Date().getFullYear();
}

// create restaurantcard webcomponent by dummy data
const restaurantsContainer = document.querySelector('.restaurants-container');
if (
  restaurantsContainer &&
  DummyData.restaurants &&
  DummyData.restaurants.length
) {
  for (let idx = 0; idx < DummyData.restaurants.length; idx += 1) {
    const restaurant = DummyData.restaurants[idx];

    if (restaurant) {
      const data = JSON.stringify(restaurant);

      // append child to the restaurantContainer element
      const restaurantCard = document.createElement('restaurant-card');
      restaurantCard.setAttribute('restaurant', data);
      restaurantsContainer.appendChild(restaurantCard);
    }
  }
}

window.addEventListener('load', () => {
  swRegister();
});
