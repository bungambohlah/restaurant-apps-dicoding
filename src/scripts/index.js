import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import "../styles/header.scss";
import "../styles/section.scss";

console.log("Hello Coders! :)");

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
