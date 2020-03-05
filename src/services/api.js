import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5656',
});

export default api;
