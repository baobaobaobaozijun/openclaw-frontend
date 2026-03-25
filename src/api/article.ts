import request from '@/utils/request'

// 文章相关接口（注意：baseURL 已包含 /api，这里不要再加 /api 前缀）
export function getArticleList(params?: { page?: number; size?: number; keyword?: string; categoryId?: number }) {
  return request.get('/articles', { params })
}

export function getArticle(id: number) {
  return request.get(`/articles/${id}`)
}

export function createArticle(data: { title: string; content: string; summary?: string; categoryId?: number | null; status: 'DRAFT' | 'PUBLISHED' }) {
  return request.post('/articles', data)
}

export function create(data: { title: string; content: string; summary?: string; categoryId?: number | null; status: 'DRAFT' | 'PUBLISHED' }) {
  return request.post('/articles', data)
}

export function updateArticle(id: number, data: { title?: string; content?: string; categoryId?: number | null }) {
  return request.put(`/articles/${id}`, data)
}

export function deleteArticle(id: number) {
  return request.delete(`/articles/${id}`)
}