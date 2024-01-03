import axios from 'axios';

export default class PixabayApiService {
  async getPixabayData(value, page) {
    try {
      const API_KEY = '40638542-671402e9a996bdf1173ac4708';
      const BASE_URL = 'https://pixabay.com/api/?';
      const PER_PAGE = 12;

      const url = `${BASE_URL}q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
