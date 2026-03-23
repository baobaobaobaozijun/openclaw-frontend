<template>
  <div class="article-list">
    <h1>文章列表</h1>
    <div class="filters">
      <input v-model="keyword" placeholder="搜索文章..." @input="search" />
    </div>
    <div class="articles">
      <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
    </div>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="!loading && articles.length === 0" class="empty">暂无文章</div>
    <div class="pagination" v-if="total > size">
      <button :disabled="page <= 1" @click="changePage(page - 1)">上一页</button>
      <span>{{ page }} / {{ Math.ceil(total / size) }}</span>
      <button :disabled="page >= Math.ceil(total / size)" @click="changePage(page + 1)">下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { useArticleStore } from '@/stores/article'
import { storeToRefs } from 'pinia'

const store = useArticleStore()
const { articles, total, loading, page, size } = storeToRefs(store)
const keyword = ref('')

onMounted(() => { store.fetchArticles() })

const search = () => { store.fetchArticles({ keyword: keyword.value }) }
const changePage = (p: number) => { store.setPage(p); store.fetchArticles({ keyword: keyword.value }) }
</script>

<style scoped>
.article-list { max-width: 800px; margin: 0 auto; padding: 20px; }
.filters { margin-bottom: 20px; }
.filters input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; }
.articles { display: flex; flex-direction: column; gap: 16px; }
.loading, .empty { text-align: center; padding: 40px; color: #999; }
.pagination { display: flex; justify-content: center; align-items: center; gap: 16px; margin-top: 20px; }
.pagination button { padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; }
.pagination button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>