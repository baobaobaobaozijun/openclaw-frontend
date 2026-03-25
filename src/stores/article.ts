import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getArticles, getArticleById, type Article, type ArticleListResponse } from '@/api/article'

export const useArticleStore = defineStore('article', () => {
  const articles = ref<Article[]>([])
  const currentArticle = ref<Article | null>(null)
  const total = ref(0)
  const loading = ref(false)
  const page = ref(1)
  const size = ref(10)

  async function fetchArticles(params?: {
    page?: number
    size?: number
    categoryId?: number
    keyword?: string
  }) {
    loading.value = true
    try {
      const res = await getArticles({
        page: page.value,
        size: size.value,
        ...params
      })
      const data = res.data as unknown as ArticleListResponse
      articles.value = data.list || []
      total.value = data.pagination?.total || 0
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchArticle(id: number) {
    loading.value = true
    try {
      const res = await getArticleById(id)
      currentArticle.value = res.data as unknown as Article
    } catch (error) {
      console.error('Failed to fetch article:', error)
    } finally {
      loading.value = false
    }
  }

  function setPage(p: number) {
    page.value = p
  }

  return {
    articles,
    currentArticle,
    total,
    loading,
    page,
    size,
    fetchArticles,
    fetchArticle,
    setPage
  }
})
