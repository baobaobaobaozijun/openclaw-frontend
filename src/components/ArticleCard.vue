<template>
  <article class="article-card" @click="goToArticle">
    <div class="article-image" v-if="article.coverImage">
      <img :src="article.coverImage" :alt="article.title" @error="handleImageError" />
      <div class="image-overlay">
        <span class="reading-time">{{ calculateReadingTime() }} min read</span>
      </div>
    </div>
    <div class="article-content">
      <div class="article-meta">
        <span class="category-tag" @click.stop="filterByCategory">{{ article.category }}</span>
        <span class="article-date">{{ formatDate(article.createdAt) }}</span>
      </div>
      <h3 class="article-title">
        <router-link :to="`/articles/${article.id}`">{{ article.title }}</router-link>
      </h3>
      <p class="article-summary">{{ article.summary }}</p>
      <div class="article-author" v-if="article.author">
        <span class="author-name">{{ article.author.name }}</span>
      </div>
      <div class="article-stats">
        <span class="stat-item">
          <i class="icon-eye"></i>{{ formatCount(article.viewCount) }}
        </span>
        <span class="stat-item">
          <i class="icon-message"></i>{{ formatCount(article.commentCount) }}
        </span>
        <span class="stat-item">
          <i class="icon-heart"></i>{{ formatCount(article.likeCount) }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { useRouter } from 'vue-router';

interface Author {
  id: number;
  name: string;
}

interface Article {
  id: number;
  title: string;
  summary: string;
  coverImage?: string;
  category: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  wordCount?: number;
  author?: Author;
}

const props = withDefaults(defineProps<{
  article: Article;
}>(), {
  article: () => ({
    id: 0,
    title: '',
    summary: '',
    coverImage: undefined,
    category: '默认分类',
    createdAt: new Date().toISOString(),
    viewCount: 0,
    commentCount: 0,
    likeCount: 0,
    wordCount: 1000
  })
});

const router = useRouter();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays}天前`;
  if (now.getFullYear() === date.getFullYear()) {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric'
    });
  }
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const calculateReadingTime = () => {
  const wordsPerMinute = 200;
  const wordCount = props.article.wordCount || 1000;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
};

const formatCount = (count: number) => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/images/default-cover.jpg'; // 默认封面图
};

const goToArticle = () => {
  router.push(`/articles/${props.article.id}`);
};

const filterByCategory = () => {
  // 可以在这里实现按分类筛选的功能
  console.log(`Filter by category: ${props.article.category}`);
};
</script>

<style scoped>
.article-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.article-image {
  height: 180px;
  overflow: hidden;
  position: relative;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
  padding: 1rem;
  font-size: 0.8rem;
}

.reading-time {
  float: right;
  background: rgba(255,255,255,0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

.article-content {
  padding: 1.5rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #909399;
}

.category-tag {
  background: #ecf5ff;
  color: #409eff;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category-tag:hover {
  background: #409eff;
  color: white;
}

.article-date {
  color: #909399;
}

.article-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-title a {
  text-decoration: none;
  color: #303133;
  transition: color 0.3s;
}

.article-title a:hover {
  color: #409eff;
}

.article-summary {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-author {
  margin-bottom: 1rem;
}

.author-name {
  color: #909399;
  font-size: 0.875rem;
  font-weight: 500;
}

.article-stats {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ebeef5;
  padding-top: 1rem;
  color: #909399;
  font-size: 0.875rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.icon-eye::before {
  content: "👁️";
}

.icon-message::before {
  content: "💬";
}

.icon-heart::before {
  content: "❤️";
}
</style>