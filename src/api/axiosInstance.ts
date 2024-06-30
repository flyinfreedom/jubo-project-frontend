import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';

const axiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = 'jubo-project';
    if (token) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        config.headers = { 'Authorization': `Bearer ${token}` } as AxiosRequestHeaders;
      }
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    if (error.response && error.response.status === 401) {
      alert('您的Token已過期，請重新登入');
      return;
    }

    if (error.response && error.response.status > 700 && error.response.status < 800) {
      alert(error.response.data!.message);
      return;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;