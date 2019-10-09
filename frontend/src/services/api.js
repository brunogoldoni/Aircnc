import axios from 'axios';

const api = axios.create({
  // change ip address according your office
  baseURL: 'http://localhost:3333',
});

export default api;