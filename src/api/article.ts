import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器 - 添加认证 token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export interface Article {
  id: number
  title: string
  content: string
  summary: string
  authorId: number
  status: string
  accessLevel: number
  viewCount: number
  createdAt: string
  updatedAt: string
}

export const articleApi = {
  getList: (page = 1, size = 10) => 
    api.get<Article[]>(`/articles?page=${page}&size=${size}`),
  
  getById: (id: number) => 
    api.get<Article>(`/articles/${id}`),
  
  create: (data: Partial<Article>) => 
    api.post<Article>('/articles', data),
  
  update: (id: number, data: Partial<Article>) => 
    api.put<Article>(`/articles/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/articles/${id}`)
}
