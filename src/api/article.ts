import request from '@/utils/request'

export interface Article {
  id: number
  title: string
  slug?: string
  summary?: string
  content?: string
  htmlContent?: string
  authorId: number
  author?: string
  categoryId?: number
  category?: string
  viewCount: number
  likeCount: number
  commentCount: number
  status: number
  isTop: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
  tags?: string[]
}

export interface ArticleListParams {
  page?: number
  size?: number
  categoryId?: number
  tagId?: number
  keyword?: string
  status?: number
}

export interface PageResult<T> {
  records: T[]
  total: number
  page: number
  size: number
}

// 文章列表
export function getArticles(params?: ArticleListParams) {
  return request.get<PageResult<Article>>('/articles', { params })
}

// 文章详情
export function getArticle(id: number) {
  return request.get<Article>(`/articles/${id}`)
}

// 创建文章
export function createArticle(data: Partial<Article>) {
  return request.post<Article>('/articles', data)
}

// 更新文章
export function updateArticle(id: number, data: Partial<Article>) {
  return request.put<Article>(`/articles/${id}`, data)
}

// 删除文章
export function deleteArticle(id: number) {
  return request.delete(`/articles/${id}`)
}

// 分类列表
export function getCategories() {
  return request.get('/categories')
}

// 标签列表
export function getTags() {
  return request.get('/tags')
}
