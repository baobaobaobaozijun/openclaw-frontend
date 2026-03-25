<template>
  <div class="article-list-view">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="搜索文章..."
        class="search-input"
        @keyup.enter="performSearch"
      />
      <button @click="performSearch" class="search-btn">搜索</button>
    </div>

    <!-- 筛选器 -->
    <div class="filters">
      <div class="filter-group">
        <label>分类:</label>
        <select v-model="selectedCategory" @change="applyFilters">
          <option value="">全部</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>标签:</label>
        <select v-model="selectedTag" @change="applyFilters">
          <option value="">全部</option>
          <option v-for="tag in tags" :key="tag.id" :value="tag.id">
            {{ tag.name }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>排序:</label>
        <select v-model="sortBy" @change="applyFilters">
          <option value="publishedAt-desc">最新发布</option>
          <option value="publishedAt-asc">最早发布</option>
          <option value="viewCount-desc">最多浏览</option>
          <option value="likeCount-desc">最多点赞</option>
          <option value="commentCount-desc">最多评论</option>
        </select>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="articles-container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>
      
      <div v-else-if="filteredArticles.length === 0" class="no-results">
        <p>没有找到相关文章</p>
      </div>
      
      <div v-else class="articles-grid">
        <ArticleCard 
          v-for="article in paginatedArticles" 
          :key="article.id" 
          :article="article"
        />
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="pagination">
      <button 
        @click="currentPage = Math.max(1, currentPage - 1)" 
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        上一页
      </button>
      
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      
      <button 
        @click="currentPage = Math.min(totalPages, currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ArticleCard from '@/components/ArticleCard.vue';

// 定义数据类型
interface Author {
  id: number;
  username: string;
  avatar?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverImage?: string;
  author: Author;
  categories: Category[];
  tags: Tag[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isTop: boolean;
  isFeatured: boolean;
  publishedAt: string;
}

// 响应式数据
const articles = ref<Article[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedTag = ref('');
const sortBy = ref('publishedAt-desc');
const currentPage = ref(1);
const pageSize = ref(10);

// 模拟分类和标签数据
const categories = ref<Category[]>([
  { id: 1, name: '技术', slug: 'tech' },
  { id: 2, name: '生活', slug: 'life' },
  { id: 3, name: '旅行', slug: 'travel' },
  { id: 4, name: '美食', slug: 'food' }
]);

const tags = ref<Tag[]>([
  { id: 1, name: 'Vue.js', slug: 'vuejs', color: '#4fc08d' },
  { id: 2, name: '前端', slug: 'frontend', color: '#42b883' },
  { id: 3, name: 'JavaScript', slug: 'javascript', color: '#f7df1e' },
  { id: 4, name: 'TypeScript', slug: 'typescript', color: '#3178c6' },
  { id: 5, name: '后端', slug: 'backend', color: '#7947ea' }
]);

// 模拟加载文章数据
const loadArticles = async () => {
  loading.value = true;
  
  // 模拟 API 请求延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 生成模拟数据
  const mockArticles: Article[] = [];
  for (let i = 1; i <= 25; i++) {
    mockArticles.push({
      id: i,
      title: `文章标题 ${i}`,
      slug: `article-${i}`,
      summary: `这是第 ${i} 篇文章的摘要，简要介绍了文章的主要内容和要点。`,
      coverImage: i % 3 === 0 ? undefined : `https://picsum.photos/200/150?random=${i}`,
      author: {
        id: Math.floor(Math.random() * 5) + 1,
        username: `作者${String.fromCharCode(65 + (i % 5))}`,
        avatar: i % 4 === 0 ? undefined : `https://i.pravatar.cc/40?img=${i}`
      },
      categories: [categories.value[i % categories.value.length]],
      tags: [
        tags.value[i % tags.value.length],
        tags.value[(i + 1) % tags.value.length]
      ],
      viewCount: Math.floor(Math.random() * 10000),
      likeCount: Math.floor(Math.random() * 1000),
      commentCount: Math.floor(Math.random() * 100),
      isTop: i <= 3,
      isFeatured: i % 5 === 0,
      publishedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  articles.value = mockArticles;
  loading.value = false;
};

// 过滤后的文章列表
const filteredArticles = computed(() => {
  let result = [...articles.value];
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(article => 
      article.title.toLowerCase().includes(query) || 
      article.summary.toLowerCase().includes(query)
    );
  }
  
  // 分类过滤
  if (selectedCategory.value) {
    result = result.filter(article => 
      article.categories.some(cat => cat.id.toString() === selectedCategory.value)
    );
  }
  
  // 标签过滤
  if (selectedTag.value) {
    result = result.filter(article => 
      article.tags.some(tag => tag.id.toString() === selectedTag.value)
    );
  }
  
  // 排序
  const [field, order] = sortBy.value.split('-');
  result.sort((a, b) => {
    if (order === 'desc') {
      return (b as any)[field] - (a as any)[field];
    } else {
      return (a as any)[field] - (b as any)[field];
    }
  });
  
  return result;
});

// 分页计算
const totalPages = computed(() => Math.ceil(filteredArticles.value.length / pageSize.value));

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredArticles.value.slice(start, end);
});

// 方法
const performSearch = () => {
  currentPage.value = 1; // 搜索时回到第一页
};

const applyFilters = () => {
  currentPage.value = 1; // 应用筛选时回到第一页
};

// 组件挂载时加载数据
onMounted(() => {
  loadArticles();
});
</script>

<style scoped>
.article-list-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.search-btn {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #66b1ff;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

.filter-group select {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  outline: none;
  cursor: pointer;
}

.articles-container {
  min-height: 400px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.no-results {
  text-align: center;
  padding: 40px 0;
  color: #909399;
  font-size: 16px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f5f7fa;
  border-color: #c6e2ff;
  color: #66b1ff;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #606266;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-list-view {
    padding: 16px;
  }
  
  .search-bar {
    flex-direction: column;
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .filter-group label {
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>