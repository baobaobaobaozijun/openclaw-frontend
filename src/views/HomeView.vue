<template>
  <div class="home">
    <header class="header">
      <h1 class="logo">包子铺博客</h1>
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/category/tech">技术</router-link>
        <router-link to="/category/life">生活</router-link>
      </nav>
    </header>

    <main class="container">
      <div class="content">
        <ArticleList />
      </div>

      <aside class="sidebar">
        <div class="widget">
          <h3>热门文章</h3>
          <p>开发中...</p>
        </div>
        <div class="widget">
          <h3>标签云</h3>
          <p>开发中...</p>
        </div>
      </aside>
    </main>

    <footer class="footer">
      <p>&copy; 2026 包子铺博客. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ArticleList from '@/components/article/ArticleList.vue'
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #42b983;
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav a {
  color: white;
  text-decoration: none;
}

.nav a:hover {
  text-decoration: underline;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  flex: 1;
}

.content {
  min-width: 0;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.widget {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

.widget h3 {
  margin-bottom: 10px;
  color: #333;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}
</style>
