import "regenerator-runtime"; /* for async await transpile */

// import web components
import "../scripts/restaurant-card";

// import css / scss
import "../styles/main.scss";
import "../styles/header.scss";
import "../styles/section.scss";
import "../styles/lineicons.scss";

// import dummy data
import DummyData from "../DATA.json";

// add classname when on scroll
window.onscroll = function () {
  const headerNavbar = document.querySelector(".navbar");
  // add offset to 8px
  const sticky = headerNavbar.offsetTop + 8;

  if (window.pageYOffset > sticky) {
    headerNavbar.classList.add("sticky");
  } else {
    headerNavbar.classList.remove("sticky");
  }
};

// toggle side menu in the mobile devices
const allElms = document.querySelector("body");
const menu = document.querySelector(".side-menu");
const drawer = document.querySelector(".menu-item");
allElms.addEventListener("click", function (event) {
  event.stopPropagation();
  if (drawer.classList.contains("open-menu-item"))
    drawer.classList.toggle("open-menu-item");
});
menu.addEventListener("click", function (event) {
  event.stopPropagation();
  drawer.classList.toggle("open-menu-item");
});

// update year
const yearCopy = document.getElementById("yearCopy");
if (yearCopy) {
  yearCopy.textContent = new Date().getFullYear();
}

// create restaurantcard webcomponent by dummy data
const restaurantsContainer = document.querySelector(".restaurants-container");
console.log("restaurantsContainer", restaurantsContainer);
console.log("DummyData", DummyData);
if (
  restaurantsContainer &&
  DummyData.restaurants &&
  DummyData.restaurants.length
) {
  for (let idx = 0; idx < DummyData.restaurants.length; idx++) {
    const restaurant = DummyData.restaurants[idx];

    if (restaurant) {
      const data = JSON.stringify(restaurant);

      // append child to the restaurantContainer element
      const restaurantCard = document.createElement("restaurant-card");
      restaurantCard.setAttribute("restaurant", data);
      restaurantsContainer.appendChild(restaurantCard);
    }
  }
}
