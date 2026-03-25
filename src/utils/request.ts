import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: '/api', // 基础 URL：/api（通过 nginx 反代）
  timeout: 10000, // 请求超时：10000ms
});

// 请求拦截器：从 localStorage 获取 access_token，如存在则添加到 Authorization: Bearer {token} 请求头
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token'); // 使用 access_token 作为键名
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器：
// 401 状态码：清除 localStorage token，跳转到 /login
// 其他错误：console.error 并 reject
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    console.error('Response error:', error);
    if (error.response?.status === 401) {
      // token过期或其他认证错误，清除token并跳转到登录页
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default request;