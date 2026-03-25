<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">欢迎来到包子铺</h1>
        <p class="hero-subtitle">一个简洁优雅的博客平台</p>
        <router-link to="/articles" class="cta-button">
          浏览文章
        </router-link>
      </div>
    </section>

    <!-- Latest Articles Section -->
    <section class="latest-articles">
      <div class="container">
        <h2 class="section-title">最新文章</h2>
        <div class="articles-grid">
          <div 
            v-for="article in articles" 
            :key="article.id" 
            class="article-card"
            @click="goToArticle(article.id)"
          >
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-summary">{{ article.summary }}</p>
            <div class="article-meta">
              {{ formatDate(article.createTime) }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p class="copyright">© 2026 包子铺 | Powered by OpenClaw</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { articleApi } from '@/api/article'

interface Article {
  id: number
  title: string
  summary: string
  createTime: string
}

const router = useRouter()
const articles = ref<Article[]>([])

onMounted(async () => {
  try {
    const response = await articleApi.getList({
      page: 1,
      size: 3
    })
    articles.value = response.data.list || []
  } catch (error) {
    console.error('Failed to fetch articles:', error)
  }
})

const goToArticle = (id: number) => {
  router.push(`/article/${id}`)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  animation: fadeInUp 0.8s ease-out;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Latest Articles Section */
.latest-articles {
  flex: 1;
  padding: 4rem 0;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #333;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.article-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06);
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.article-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  line-height: 1.4;
}

.article-summary {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  color: #999;
  font-size: 0.9rem;
}

/* Footer */
.footer {
  background: #333;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
}

.copyright {
  text-align: center;
  margin: 0;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
  
  .article-card {
    padding: 1.5rem;
  }
}
</style>