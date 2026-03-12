<template>
  <div class="article-detail">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="article" class="content">
      <h1 class="title">{{ article.title }}</h1>
      <div class="meta">
        <span>发布时间：{{ formatDate(article.createdAt) }}</span>
        <span>阅读量：{{ article.viewCount }}</span>
      </div>
      <div class="article-content" v-html="article.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { articleApi, type Article } from '@/api/article'

const route = useRoute()
const article = ref<Article | null>(null)
const loading = ref(true)
const error = ref('')

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

const loadArticle = async () => {
  loading.value = true
  try {
    const id = Number(route.params.id)
    const response = await articleApi.getById(id)
    article.value = response.data
  } catch (e) {
    error.value = '加载文章失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.meta {
  color: #666;
  margin-bottom: 2rem;
  display: flex;
  gap: 20px;
}

.article-content {
  line-height: 1.8;
}
</style>
