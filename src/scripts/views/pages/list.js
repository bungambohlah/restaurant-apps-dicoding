import RestaurantSource from '../../data/restaurant-source';

// import web components
import '../components/restaurant-card';

const NowPlaying = {
  async render() {
    return `
    <section id="hero" class="hero">
      <div class="hero-image">
        <span role="img" aria-label="Food Hero Background" />
      </div>
      <div class="hero-title">
        <div class="hero-title-text">
          <div class="hero-title-text-container">
            <h1 tabindex="0">
              The best restaurant on the market <br /><span tabindex="0">Hasty and Tasty!</span>
            </h1>
            <button type="button"
              class="inline-block px-7 py-3 mb-2 md:mb-0 mr-0 md:mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out page-scroll"
              role="button" onclick="window.location.href='/#restaurants'">
              Our Location
            </button>
          </div>
        </div>
      </div>
    </section>
    <section id="restaurants">
      <div id="restaurants-container" class="restaurants-container"></div>
    </section>
    <section id="services">
      <div class="services-container">
        <div class="services-title">
          <h2 tabindex="0">Our Services</h2>
        </div>
        <div class="services-items">
          <div class="services-item" tabindex="0">
            <div class="services-item-container">
              <div class="services-icon">
                <i class="lni lni-shopping-basket"></i>
              </div>
              <div class="services-description">
                <h3 tabindex="0">HIGH QUALITY INGREDIENTS</h3>
                <p tabindex="0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Unde perspiciatis dicta labore nulla beatae quaerat quia
                  incidunt laborum aspernatur...
                </p>
              </div>
            </div>
          </div>
          <div class="services-item" tabindex="0">
            <div class="services-item-container">
              <div class="services-icon">
                <i class="lni lni-restaurant"></i>
              </div>
              <div class="services-description">
                <h3 tabindex="0">VEGAN, ALKALINE AND GLUTEN FREE</h3>
                <p tabindex="0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Unde perspiciatis dicta labore nulla beatae quaerat quia
                  incidunt laborum aspernatur...
                </p>
              </div>
            </div>
          </div>
          <div class="services-item" tabindex="0">
            <div class="services-item-container">
              <div class="services-icon">
                <i class="lni lni-candy"></i>
              </div>
              <div class="services-description">
                <h3 tabindex="0">SWEETS, TREATS, SNACKS & DRINKS</h3>
                <p tabindex="0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Unde perspiciatis dicta labore nulla beatae quaerat quia
                  incidunt laborum aspernatur...
                </p>
              </div>
            </div>
          </div>
          <div class="services-item" tabindex="0">
            <div class="services-item-container">
              <div class="services-icon">
                <i class="lni lni-chef-hat"></i>
              </div>
              <div class="services-description">
                <h3 tabindex="0">Professional Chef</h3>
                <p tabindex="0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Unde perspiciatis dicta labore nulla beatae quaerat quia
                  incidunt laborum aspernatur...
                </p>
              </div>
            </div>
          </div>
          <div class="services-item" tabindex="0">
            <div class="services-item-container">
              <div class="services-icon">
                <i class="lni lni-service"></i>
              </div>
              <div class="services-description">
                <h3 tabindex="0">Best Waitress</h3>
                <p tabindex="0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Unde perspiciatis dicta labore nulla beatae quaerat quia
                  incidunt laborum aspernatur...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const lists = await RestaurantSource.list();
    const listContainer = document.querySelector('#restaurants-container');
    lists.forEach((list) => {
      const data = JSON.stringify(list);

      // append child to the restaurantContainer element
      const restaurantCard = document.createElement('restaurant-card');
      restaurantCard.setAttribute('restaurant', data);
      listContainer.appendChild(restaurantCard);
    });
  },
};

export default NowPlaying;
