<template>
  <article class="article-card">
    <router-link :to="`/article/${article.id}`" class="link">
      <h3 class="title">{{ article.title }}</h3>
      <p class="summary">{{ article.summary || '暂无摘要' }}</p>
      <div class="meta">
        <span class="date">{{ formatDate(article.createdAt) }}</span>
        <span class="views">
          <el-icon><View /></el-icon>
          {{ article.viewCount }}
        </span>
      </div>
    </router-link>
  </article>
</template>

<script setup lang="ts">
import { View } from '@element-plus/icons-vue'
import type { Article } from '@/api/article'

defineProps<{
  article: Article
}>()

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.article-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease;
}

.article-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.title {
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 10px;
}

.summary {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  gap: 20px;
  color: #999;
  font-size: 0.875rem;
}

.views {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
