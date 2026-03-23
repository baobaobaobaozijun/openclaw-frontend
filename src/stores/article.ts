import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getArticles, getArticle, type Article, type ArticleListParams, type PageResult } from '@/api/article'

export const useArticleStore = defineStore('article', () => {
  const articles = ref<Article[]>([])
  const currentArticle = ref<Article | null>(null)
  const total = ref(0)
  const loading = ref(false)
  const page = ref(1)
  const size = ref(10)

  async function fetchArticles(params?: ArticleListParams) {
    loading.value = true
    try {
      const res = await getArticles({
        page: page.value,
        size: size.value,
        ...params
      })
      articles.value = res.data.records
      total.value = res.data.total
    } catch (error) {
      console.error('获取文章列表失败:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchArticle(id: number) {
    loading.value = true
    try {
      const res = await getArticle(id)
      currentArticle.value = res.data
    } catch (error) {
      console.error('获取文章详情失败:', error)
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
