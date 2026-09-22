import axios from 'axios';


const API_BASE_URL = 'https://my-assignment-app.onrender.com'

const ApiServices = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default ApiServices;  