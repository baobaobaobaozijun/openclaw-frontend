<template>
  <div class="articles-page">
    <h1 class="page-title">文章列表</h1>
    
    <div v-if="loading" class="loading-container">
      <div class="skeleton-card" v-for="n in 5" :key="'skeleton-' + n">
        <div class="skeleton-header"></div>
        <div class="skeleton-content">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
        <div class="skeleton-footer">
          <div class="skeleton-tag"></div>
          <div class="skeleton-meta"></div>
        </div>
      </div>
    </div>
    
    <div v-else-if="articles.length === 0" class="empty-state">
      <p>暂无文章</p>
    </div>
    
    <div v-else class="articles-grid">
      <div 
        v-for="article in articles" 
        :key="article.id"
        class="article-card"
        @click="goToArticle(article.id)"
      >
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-summary">{{ truncateSummary(article.summary || '', 150) }}</p>
        <div class="article-meta">
          <span class="article-author">作者: {{ article.author }}</span>
          <span class="article-date">{{ formatDate(article.publishTime) }}</span>
        </div>
        <div class="article-tags">
          <span 
            v-for="tag in article.categories || article.tags || []" 
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { articleApi } from '@/api/article'

const router = useRouter()
const articles = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await articleApi.getList()
    articles.value = response.data || response
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    articles.value = []
  } finally {
    loading.value = false
  }
})

const goToArticle = (id: string | number) => {
  router.push(`/article/${id}`)
}

const truncateSummary = (summary: string, maxLength: number) => {
  if (!summary) return ''
  return summary.length > maxLength ? summary.substring(0, maxLength) + '...' : summary
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.articles-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.loading-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skeleton-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-header {
  height: 24px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  margin-bottom: 15px;
  border-radius: 4px;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
}

.skeleton-line.short {
  width: 60%;
}

.skeleton-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.skeleton-tag {
  width: 60px;
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
}

.skeleton-meta {
  width: 120px;
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 1.2rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.article-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.article-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  border-color: #007bff;
}

.article-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #333;
  line-height: 1.4;
}

.article-summary {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
  margin: 0 0 15px 0;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.85rem;
  color: #888;
}

.article-author {
  font-weight: 500;
}

.article-date {
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .articles-page {
    padding: 15px;
  }
  
  .page-title {
    font-size: 1.6rem;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .article-card {
    padding: 15px;
  }
}
</style>