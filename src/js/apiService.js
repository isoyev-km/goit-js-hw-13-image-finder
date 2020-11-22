'use strict';

const base = 'https://pixabay.com/api/';

export default {
  page: 1,
  query: '',
  async fetchArticles(query) {
    const keyApi = '19212950-91413c5e6645ffb1afc0eb782';
    const reqParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${keyApi}`;
    const res = await fetch(base + reqParams);
    const parseRes = await res.json();
    this.incrementPage();
    return parseRes.hits;
  },

  get searchQuerry() {
    return this.query;
  },

  set searchQuerry(string) {
    this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
