import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4001/api/v1';

export const get = (url) => axios.get(url);

export const post = (url, data) => axios.post(url, data);
