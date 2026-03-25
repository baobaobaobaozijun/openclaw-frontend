<template>
  <div class="article-detail">
    <div v-if="loading" class="loading">
      <p>加载中...</p>
    </div>
    <div v-else-if="!article" class="not-found">
      <h1>404 - 文章不存在</h1>
      <p>您访问的文章可能已被删除或不存在。</p>
      <button @click="goBack" class="back-button">返回文章列表</button>
    </div>
    <div v-else class="article-content">
      <header class="article-header">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <span class="author">作者：{{ article.author }}</span>
          <span class="publish-time">{{ formatDate(article.publishTime) }}</span>
          <div v-if="article.tags && article.tags.length > 0" class="tags">
            <span 
              v-for="tag in article.tags" 
              :key="tag" 
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </header>
      
      <main class="content-body" v-html="article.content"></main>
      
      <footer class="article-footer">
        <button @click="goBack" class="back-button">返回文章列表</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articleApi } from '@/api/article'

const route = useRoute()
const router = useRouter()

const article = ref(null)
const loading = ref(true)

const goBack = () => {
  router.push('/articles')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  try {
    const id = route.params.id
    const response = await articleApi.getById(id)
    article.value = response.data
  } catch (error) {
    console.error('获取文章详情失败:', error)
    article.value = null
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.loading,
.not-found {
  text-align: center;
  padding: 40px 20px;
}

.not-found h1 {
  color: #333;
  margin-bottom: 10px;
}

.article-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 30px;
}

.article-header h1 {
  font-size: 2.2rem;
  line-height: 1.3;
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  background-color: #f0f2f5;
  color: #4a5568;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.content-body {
  line-height: 1.8;
  color: #333;
  font-size: 1.1rem;
}

.content-body :deep(h1),
.content-body :deep(h2),
.content-body :deep(h3),
.content-body :deep(h4),
.content-body :deep(h5),
.content-body :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 1em;
}

.content-body :deep(p) {
  margin-bottom: 1.2em;
}

.content-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.content-body :deep(a) {
  color: #3498db;
  text-decoration: none;
}

.content-body :deep(a:hover) {
  text-decoration: underline;
}

.content-body :deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 16px;
  margin: 16px 0;
  color: #666;
}

.content-body :deep(code) {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.content-body :deep(pre) {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
}

.article-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
}

.back-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #2980b9;
}
</style>