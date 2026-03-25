<template>
  <div class="app-layout">
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <nav class="navbar">
        <div class="nav-left">
          <h1 class="logo">OpenClaw Blog</h1>
        </div>
        <div class="nav-center">
          <ul class="nav-menu">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/articles">文章</router-link></li>
            <li><router-link to="/about">关于</router-link></li>
          </ul>
        </div>
        <div class="nav-right">
          <div v-if="!isLoggedIn" class="auth-buttons">
            <router-link to="/login" class="btn btn-outline">登录</router-link>
            <router-link to="/register" class="btn btn-primary">注册</router-link>
          </div>
          <div v-else class="user-info">
            <span class="username">{{ username }}</span>
            <button @click="logout" class="btn btn-outline">退出</button>
          </div>
        </div>
      </nav>
    </header>

    <!-- 主要内容区域 -->
    <main class="app-main">
      <router-view />
    </main>

    <!-- 底部 -->
    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2026 OpenClaw Blog. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 使用 Composition API
const router = useRouter();
const isLoggedIn = ref(false);
const username = ref('');

// 检查登录状态
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    isLoggedIn.value = true;
    // 实际项目中这里应该是从 token 解析出用户名或调用 API 获取用户信息
    username.value = localStorage.getItem('username') || '用户';
  }
});

// 退出登录
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  isLoggedIn.value = false;
  username.value = '';
  router.push('/login');
};
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏样式 */
.app-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left .logo {
  color: #409eff;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-center .nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-center .nav-menu a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

.nav-center .nav-menu a:hover,
.nav-center .nav-menu a.router-link-active {
  color: #409eff;
}

.nav-right .auth-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-right .user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  font-weight: bold;
}

/* 按钮样式 */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}

.btn-primary:hover {
  background-color: #66b1ff;
}

.btn-outline {
  border: 1px solid #dcdfe6;
  color: #606266;
}

.btn-outline:hover {
  background-color: #ecf5ff;
  color: #409eff;
}

/* 主要内容区域 */
.app-main {
  flex: 1;
  padding: 2rem;
  background-color: #f5f7fa;
}

/* 底部样式 */
.app-footer {
  background-color: #303133;
  color: #dcdfe6;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-content {
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}
</style>