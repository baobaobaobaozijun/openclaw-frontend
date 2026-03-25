<template>
  <div class="category-view">
    <div class="container">
      <div class="category-list">
        <h2>分类</h2>
        <ul class="categories">
          <li 
            v-for="category in categories" 
            :key="category.id"
            :class="{ active: selectedCategory?.id === category.id }"
            @click="selectCategory(category)"
          >
            {{ category.name }}
            <span class="article-count">({{ category.articleCount }})</span>
          </li>
        </ul>
      </div>
      
      <div class="articles-container">
        <h2>{{ selectedCategory ? selectedCategory.name : '请选择分类' }}</h2>
        <div v-if="articles.length > 0" class="articles-grid">
          <ArticleCard 
            v-for="article in articles" 
            :key="article.id"
            :article="article"
          />
        </div>
        <div v-else-if="loadingArticles" class="loading">
          加载中...
        </div>
        <div v-else class="no-articles">
          {{ selectedCategory ? '该分类下暂无文章' : '请选择一个分类查看文章' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ArticleCard from '@/components/ArticleCard.vue'

interface Category {
  id: number
  name: string
  articleCount: number
}

interface Article {
  id: number
  title: string
  summary: string
  createdAt: string
  author: string
  categoryId: number
  viewCount: number
  likeCount: number
}

const router = useRouter()
const categories = ref<Category[]>([])
const selectedCategory = ref<Category | null>(null)
const articles = ref<Article[]>([])
const loadingCategories = ref(true)
const loadingArticles = ref(false)

// 获取分类列表
const fetchCategories = async () => {
  try {
    loadingCategories.value = true
    const response = await fetch('/api/categories')
    if (response.ok) {
      categories.value = await response.json()
      // 默认选择第一个分类
      if (categories.value.length > 0 && !selectedCategory.value) {
        selectCategory(categories.value[0])
      }
    } else {
      console.error('获取分类列表失败:', response.status)
    }
  } catch (error) {
    console.error('获取分类列表出错:', error)
  } finally {
    loadingCategories.value = false
  }
}

// 获取分类下的文章
const fetchArticlesByCategory = async (categoryId: number) => {
  try {
    loadingArticles.value = true
    const response = await fetch(`/api/articles?categoryId=${categoryId}`)
    if (response.ok) {
      articles.value = await response.json()
    } else {
      console.error(`获取分类 ${categoryId} 的文章失败:`, response.status)
      articles.value = []
    }
  } catch (error) {
    console.error(`获取分类 ${categoryId} 的文章出错:`, error)
    articles.value = []
  } finally {
    loadingArticles.value = false
  }
}

// 选择分类
const selectCategory = (category: Category) => {
  selectedCategory.value = category
  fetchArticlesByCategory(category.id)
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.category-view {
  padding: 20px 0;
  min-height: calc(100vh - 120px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  padding: 0 20px;
}

.category-list {
  width: 250px;
  flex-shrink: 0;
}

.category-list h2 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.categories {
  list-style: none;
  padding: 0;
  margin: 0;
}

.categories li {
  padding: 12px 15px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 5px;
  transition: background-color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.categories li:hover {
  background-color: #f5f5f5;
}

.categories li.active {
  background-color: #409eff;
  color: white;
}

.article-count {
  font-size: 0.9rem;
  opacity: 0.8;
}

.categories li.active .article-count {
  color: rgba(255, 255, 255, 0.8);
}

.articles-container {
  flex: 1;
}

.articles-container h2 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.loading,
.no-articles {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .category-list {
    width: 100%;
  }
}
</style>