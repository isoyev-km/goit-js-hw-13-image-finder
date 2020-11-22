'use strict';

import refs from './refs';
import service from './apiService';
import cardImage from '../templates/templatesImage.hbs';

refs.searchForm.addEventListener('submit', searchImageInputHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchImageInputHandler(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const input = form.elements.query;
  clearList();
  service.resetPage();
  service.searchQuerry = input.value;
  service.fetchArticles().then(hits => {
    const markup = buildListTemplate(hits);
    insertList(markup);
  });
  input.value = '';
}

function loadMoreBtnHandler() {
  service.fetchArticles().then(hits => {
    const markup = buildListTemplate(hits);
    insertList(markup);
    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
    });
  });
}

function insertList(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}

function buildListTemplate(items) {
  return cardImage(items);
}

function clearList() {
  refs.gallery.innerHTML = '';
}
