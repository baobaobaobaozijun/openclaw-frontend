import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'vue-router';

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 如果是401未授权，则跳转到登录页
      const router = useRouter();
      router.push('/login');
      localStorage.removeItem('token');
      // 可以在这里显示提示信息
      alert('登录已过期，请重新登录');
    }
    
    // 统一错误处理
    console.error('响应错误:', error);
    return Promise.reject(error);
  }
);

export default request;