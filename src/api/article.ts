import { request } from '@/utils/request'

/**
 * 文章相关 API 接口
 */

// 定义文章类型
export interface Article {
  id: number
  title: string
  slug: string
  summary: string
  coverImage?: string
  author: {
    id: number
    username: string
    avatar?: string
  }
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags: Array<{
    id: number
    name: string
    slug: string
    color: string
  }>
  viewCount: number
  likeCount: number
  commentCount: number
  isTop: boolean
  isFeatured: boolean
  publishedAt: string
  createdAt: string
}

export interface ArticleDetail extends Article {
  content: string
  contentHtml: string
  updatedAt?: string
}

export interface Pagination {
  page: number
  size: number
  total: number
  totalPages: number
}

export interface ArticleListResponse {
  list: Article[]
  pagination: Pagination
}

// 获取文章列表
export const getArticles = (params?: {
  page?: number
  size?: number
  categoryId?: number
  tagId?: number
  keyword?: string
  sortBy?: string
  sortOrder?: string
}) => {
  return request.get<ArticleListResponse>('/articles', params)
}

// 获取文章详情 (通过ID)
export const getArticleById = (id: number) => {
  return request.get<ArticleDetail>(`/articles/${id}`)
}

// 获取文章详情 (通过Slug)
export const getArticleBySlug = (slug: string) => {
  return request.get<ArticleDetail>(`/articles/slug/${slug}`)
}

// Aliases for backward compatibility
export const getArticle = getArticleById
export const createArticle = (data: { title: string; content: string; summary?: string }) => {
  return request.post('/articles', data)
}
export const updateArticle = (id: number, data: { title?: string; content?: string; summary?: string }) => {
  return request.put(/articles/+id, data)
}

// Additional types for store compatibility
export interface ArticleListParams {
  page?: number
  size?: number
  categoryId?: number
  tagId?: number
  keyword?: string
}

export interface PageResult<T> {
  records: T[]
  total: number
  pages: number
  current: number
}
