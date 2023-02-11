const DrawerInitiator = {
  init({ button, drawer, content }) {
    // menu item element
    const menuItem = document.querySelector('.menu-item');

    button.addEventListener('click', (event) => {
      this.toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this.closeDrawer(event, drawer);
    });

    menuItem.addEventListener('click', (event) => {
      this.closeDrawer(event, drawer);
    });
  },

  toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open-menu-item');
  },

  closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open-menu-item');
  },
};

export default DrawerInitiator;
