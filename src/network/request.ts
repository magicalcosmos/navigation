import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://localhost:9093/api/v1';
} else {
  axios.defaults.baseURL = 'http://10.88.223.155:9093/api/v1';
}

Vue.use(VueAxios, axios);

/**
 * 请求拦截器
 */
Vue.axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.debug('======Rquest Paramas======');
    console.debug(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
Vue.axios.interceptors.response.use(
  (response: AxiosResponse) => {
    console.debug('======Response Results======');
    console.debug(response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
