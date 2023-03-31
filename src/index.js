import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import './sass/styles.css';
import createContent from './murkap';
import galleryСleaning from './murkapCleaner';
//================================================================

//================================================================
const refs = {
  formImages: document.querySelector('.search-form'),
  Gallery: document.querySelector('.gallery'),
  formInput: document.querySelector('form>input'),
  loadMoreBtn: document.querySelector('.load-more'),
};
//================================================================
refs.formImages.addEventListener('submit', onSubmitForm);
refs.loadMoreBtn.addEventListener('click', onSubmitForm);
//================================================================
let page = 1;
const limit = 40;
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = 'key=34734183-f822af85241d99cf90dda111a';
const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: page,
  per_page: limit,
});
async function onSubmitForm(e) {
  e.preventDefault();
  const searchQuery = refs.formInput.value.trim();

  try {
    const response = await axios.get(
      `${BASE_URL}/?${API_KEY}&q=${searchQuery}&${searchParams}`
    );
    console.log(response);
    const numberOfImages = response.data.totalHits;
    const valueQuery = response.data.hits;
    const totalPages = Math.ceil(numberOfImages - limit * page);
    //================================================================
    if (valueQuery.length === 0 || searchQuery === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (e.type === 'submit') {
      galleryСleaning();

      refs.loadMoreBtn.classList.remove('load-more');

      page += 1;

      Notiflix.Notify.success(`Hooray! We found ${numberOfImages} images.`);

      createContent(valueQuery);
      gallery.refresh();
    } else if (totalPages <= 0) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );

      refs.loadMoreBtn.classList.add('load-more');
    } else {
      createContent(valueQuery);
      gallery.refresh();

      page += 1;
    }
  } catch (error) {
    console.log(error);
  }
}

const gallery = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
  showCounter: false,
  maxZoom: 10,
  disableScroll: true,
  nav: true,
});

gallery.on('show.simplelightbox');
