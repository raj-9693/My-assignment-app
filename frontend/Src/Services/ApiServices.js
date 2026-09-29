import axios from 'axios';

// Read API URL from environment variable (fallback for safety)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ;

const ApiServices = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default ApiServices;  

ApiServices.interceptors.request.use((config) => {
  console.log('REQUEST URL:', (config.baseURL || '') + (config.url || ''));
  return config;
});