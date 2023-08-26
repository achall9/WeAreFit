import axios from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

let apiClient = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'device-type': Platform.OS,
    'app-version': '1.0.0',
    insurance: 'yes',
  },
});

apiClient.interceptors.request.use(async config => {
  const storedKey = await AsyncStorage.getItem('SESSION_KEY');
  if (storedKey && config.method?.toLowerCase() === 'post' && config.headers) {
    if (config.headers['Content-Type'] === 'application/json') {
      if (!config.data) {
        config.data = {};
      }
      config.data.session_key = storedKey;
    }
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      if (!config.data) {
        config.data = new FormData();
      }
      config.data.append('session_key', storedKey);
    }
  }
  return config;
});

export default apiClient;
