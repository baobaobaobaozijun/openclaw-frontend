<template>
  <div class="article-detail" v-if="article">
    <div class="article-header">
      <h1>{{ article.title }}</h1>
      <div class="article-meta">
        <span>{{ article.author }}</span>
        <span>{{ formatDate(article.createdAt) }}</span>
        <span>👁 {{ article.viewCount }}</span>
      </div>
      <div class="article-tags" v-if="article.tags?.length">
        <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
    <div class="article-content" v-html="renderedContent"></div>
    <div class="article-footer">
      <router-link to="/articles" class="back-btn">← 返回列表</router-link>
    </div>
  </div>
  <div v-else-if="loading" class="loading">加载中...</div>
  <div v-else class="not-found">文章不存在</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/stores/article'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useArticleStore()
const { currentArticle: article, loading } = storeToRefs(store)

const renderedContent = computed(() => {
  if (!article.value?.htmlContent && article.value?.content) {
    return article.value.content
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>')
  }
  return article.value?.htmlContent || ''
})

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('zh-CN')

onMounted(() => {
  const id = Number(route.params.id)
  if (id) store.fetchArticle(id)
})
</script>

<style scoped>
.article-detail { max-width: 800px; margin: 0 auto; padding: 20px; }
.article-header { margin-bottom: 24px; border-bottom: 1px solid #eee; padding-bottom: 16px; }
.article-header h1 { font-size: 28px; margin: 0 0 12px; }
.article-meta { color: #999; font-size: 14px; display: flex; gap: 16px; margin-bottom: 8px; }
.tag { background: #f0f0f0; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-right: 8px; }
.article-content { line-height: 1.8; font-size: 16px; }
.article-content :deep(h1) { font-size: 24px; margin: 24px 0 12px; }
.article-content :deep(h2) { font-size: 20px; margin: 20px 0 10px; }
.article-content :deep(code) { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 14px; }
.article-footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
.back-btn { color: #007bff; text-decoration: none; }
.loading, .not-found { text-align: center; padding: 60px; color: #999; }
@media (max-width: 576px) { .article-header h1 { font-size: 22px; } }
</style>