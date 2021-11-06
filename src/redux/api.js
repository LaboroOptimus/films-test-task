import axios from 'axios';

export const getAllFilmsAPI = async () => {
    return axios.get('https://yts.mx/api/v2/list_movies.json')
  }