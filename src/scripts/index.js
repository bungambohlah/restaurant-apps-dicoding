import 'regenerator-runtime'; /* for async await transpile */

// import lazysizes for lazyload responsive image
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// import css / scss
import '../styles/main.scss';
import '../styles/header.scss';
import '../styles/section.scss';
import '../styles/lineicons.scss';

// import to register service worker
import swRegister from './utils/sw-register';
import App from './views/app';

const content = document.querySelector('#maincontent');
const button = document.querySelector('.side-menu');
const drawer = document.querySelector('.menu-item');
const app = new App({ button, drawer, content });

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();

  // update year
  const yearCopy = document.getElementById('yearCopy');
  if (yearCopy) {
    yearCopy.textContent = new Date().getFullYear();
  }
});

// add classname when on scroll
window.onscroll = function windowOnScroll() {
  const headerNavbar = document.querySelector('.navbar');

  if (headerNavbar) {
    // add offset to 8px
    const sticky = headerNavbar.offsetTop + 8;

    if (window.pageYOffset > sticky) {
      headerNavbar.classList.add('sticky');
    } else {
      headerNavbar.classList.remove('sticky');
    }
  }
};
