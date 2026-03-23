<template>
  <div class="article-card" @click="goToDetail">
    <div class="article-card__header">
      <span v-if="article.category" class="article-card__category">{{ article.category }}</span>
      <span class="article-card__date">{{ formatDate(article.createdAt) }}</span>
    </div>
    <h3 class="article-card__title">{{ article.title }}</h3>
    <p class="article-card__summary">{{ article.summary }}</p>
    <div class="article-card__footer">
      <span class="article-card__author">{{ article.author }}</span>
      <div class="article-card__stats">
        <span>👁 {{ article.viewCount || 0 }}</span>
        <span>👍 {{ article.likeCount || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Article {
  id: number
  title: string
  summary: string
  author: string
  category?: string
  createdAt: string
  viewCount?: number
  likeCount?: number
}

const props = defineProps<{
  article: Article
}>()

const router = useRouter()

const goToDetail = () => {
  router.push(`/articles/${props.article.id}`)
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.article-card {
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.article-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.article-card__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: #999;
}

.article-card__category {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
}

.article-card__title {
  margin: 0 0 8px;
  font-size: 18px;
  line-height: 1.4;
}

.article-card__summary {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.article-card__footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.article-card__stats span {
  margin-left: 12px;
}

@media (max-width: 576px) {
  .article-card__title {
    font-size: 16px;
  }
}
</style>
