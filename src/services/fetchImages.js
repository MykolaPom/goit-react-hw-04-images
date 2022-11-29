import axios from 'axios';

const KEY = '30170241-ccfc8795875186e6274d3b8c3';

const searchParams = new URLSearchParams({
  key: KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export const fetchImages = async (query, currentPage) => {
  searchParams.set('q', query);
  searchParams.set('page', currentPage);
  return await axios.get(`https://pixabay.com/api/?${searchParams}`);
};
