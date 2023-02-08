import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';

// import scss only for detail
import '../../../styles/detail.scss';
import { BASE_LARGE_IMAGE_URL } from '../../globals/config';

const NowPlaying = {
  async render() {
    return `
    <section id="detail-restaurant">
      <div class="detail-restaurant-hero">
        <h1>Melting Pot</h1>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await RestaurantSource.detailRestaurant(url.id);
    const detailContainer = document.querySelector('#detail-restaurant');
    detailContainer.innerHTML = `
    <div class="detail-restaurant-hero" style="background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${BASE_LARGE_IMAGE_URL}/${detail.pictureId});">
      <h1>${detail.name}</h1>
    </div>`;
    console.log('detail', detail);
  },
};

export default NowPlaying;
