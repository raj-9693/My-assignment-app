import axios from 'axios';


const API_BASE_URL = 'http://192.168.31.86:5000'

const ApiServices = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default ApiServices;  