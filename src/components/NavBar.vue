<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- 左侧：博客名称 -->
      <div class="navbar-brand">
        <router-link to="/" class="navbar-logo">包子铺</router-link>
      </div>
      
      <!-- 中间：导航链接 -->
      <div class="navbar-nav">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/articles" class="nav-link">文章</router-link>
      </div>
      
      <!-- 右侧：登录/注册或用户信息 -->
      <div class="navbar-user">
        <template v-if="isLoggedIn">
          <span class="username">{{ username }}</span>
          <button @click="logout" class="logout-btn">退出</button>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link login-link">登录</router-link>
          <router-link to="/register" class="nav-link register-link">注册</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 检查登录状态
const isLoggedIn = computed(() => {
  return localStorage.getItem('access_token') !== null
})

// 获取用户名（如果有的话）
const username = computed(() => {
  const token = localStorage.getItem('access_token')
  if (token) {
    try {
      // 如果是 JWT token，可以解析获取用户名
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.username || '用户'
    } catch (e) {
      // 如果不是 JWT 格式，返回默认用户名或从其他地方获取
      return '用户'
    }
  }
  return '用户'
})

// 退出登录
const logout = () => {
  localStorage.removeItem('access_token')
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-logo {
  color: inherit;
  text-decoration: none;
}

.navbar-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: #f0f0f0;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  margin-right: 1rem;
}

.logout-btn {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #f0f0f0;
}

.login-link,
.register-link {
  background-color: #007bff;
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.login-link:hover {
  background-color: #0056b3;
}

.register-link {
  background-color: #28a745;
}

.register-link:hover {
  background-color: #218838;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .navbar-nav {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .navbar-nav .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .navbar-user {
    order: 2;
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .navbar-brand {
    order: 1;
    text-align: center;
  }
}
</style>