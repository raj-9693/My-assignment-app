import axios from 'axios';

// Read API URL from environment variable
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ;

const ApiServices = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default ApiServices;  