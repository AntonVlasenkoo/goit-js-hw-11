const refs = {
  Gallery: document.querySelector('.gallery'),
};

export default function createContent(valueQuery) {
  const generateContent = valueQuery.map(value => createMurkap(value));
  refs.Gallery.insertAdjacentHTML('beforeend', generateContent.join(''));
}

function createMurkap(data) {
  return `<div class="photo-card">
   <a href="${data.largeImageURL}"><img  class ="image" src="${data.webformatURL}" alt="${data.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes ${data.likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${data.views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${data.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${data.downloads}</b>
      </p>
      </div>
      </div>`;
}
