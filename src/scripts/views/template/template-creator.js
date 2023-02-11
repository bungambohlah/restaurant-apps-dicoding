const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" type="button" role="button" id="likeButton">
    <i class="lni lni-heart" aria-hidden="true"></i>Favorite
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" type="button" role="button" id="likeButton">
    <i class="lni lni-heart-fill" aria-hidden="true"></i>Favorite
  </button>
`;

export { createLikeButtonTemplate, createLikedButtonTemplate };
