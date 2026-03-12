<template>
  <div class="article-list">
    <h2 class="title">最新文章</h2>

    <div v-if="loading" class="loading">
      <el-skeleton :rows="5" animated />
    </div>

    <div v-else-if="error" class="error">
      <el-result icon="error" title="加载失败" :sub-title="error">
        <template #extra>
          <el-button type="primary" @click="loadArticles">重试</el-button>
        </template>
      </el-result>
    </div>

    <div v-else-if="articles.length > 0">
      <ArticleCard 
        v-for="article in articles" 
        :key="article.id"
        :article="article"
      />
      
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </div>

    <div v-else class="empty">
      <el-empty description="暂无文章" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { articleApi, type Article } from '@/api/article'
import ArticleCard from './ArticleCard.vue'

const articles = ref<Article[]>([])
const loading = ref(true)
const error = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const loadArticles = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await articleApi.getList(currentPage.value, pageSize.value)
    articles.value = response.data
    total.value = response.data.length
  } catch (e: any) {
    error.value = e.message || '加载文章失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  loadArticles()
}

onMounted(() => {
  loadArticles()
})
</script>

<style scoped>
.article-list {
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.loading, .error, .empty {
  padding: 40px 0;
}

.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
