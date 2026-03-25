<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <router-link to="/">
          <h2>Blog</h2>
        </router-link>
      </div>

      <!-- Desktop Navigation Links -->
      <ul class="navbar-nav" :class="{ 'show-mobile': mobileMenuOpen }">
        <li class="nav-item">
          <router-link to="/" class="nav-link">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/articles" class="nav-link">文章</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/categories" class="nav-link">分类</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">关于</router-link>
        </li>
      </ul>

      <!-- Right Side Content -->
      <div class="navbar-right">
        <template v-if="isLoggedIn">
          <!-- User Menu for logged-in users -->
          <div class="user-menu">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ username }}
                <el-icon><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goToProfile">个人资料</el-dropdown-item>
                  <el-dropdown-item @click="goToDashboard">仪表盘</el-dropdown-item>
                  <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
        <template v-else>
          <!-- Login/Register buttons for non-logged-in users -->
          <div class="auth-buttons">
            <el-button type="default" @click="goToLogin">登录</el-button>
            <el-button type="primary" @click="goToRegister">注册</el-button>
          </div>
        </template>
      </div>

      <!-- Mobile Menu Toggle -->
      <div class="mobile-toggle" @click="toggleMobileMenu">
        <el-icon v-if="!mobileMenuOpen"><menu /></el-icon>
        <el-icon v-else><close /></el-icon>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import { ArrowDown, Menu as IconMenu, Close } from '@element-plus/icons-vue'

// State
const mobileMenuOpen = ref(false)
const router = useRouter()

// Computed properties
const isLoggedIn = computed(() => {
  // Check if user is logged in (based on token or user info in store)
  return !!localStorage.getItem('token') // Example implementation
})
const username = computed(() => {
  // Return username if available
  return localStorage.getItem('username') || '用户' // Example implementation
})

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}

const goToProfile = () => {
  router.push('/profile')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const logout = () => {
  // Clear authentication data
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  // Redirect to home page
  router.push('/')
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height, 60px);
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-logo h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--color-primary, #409eff);
}

.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover,
.router-link-active {
  color: var(--color-primary, #409eff);
}

.navbar-right {
  display: flex;
  align-items: center;
}

.user-menu .el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.mobile-toggle {
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;
}

/* Mobile styles */
@media screen and (max-width: 768px) {
  .navbar-nav {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translateY(-150%);
    transition: transform 0.3s ease;
    z-index: 999;
  }

  .navbar-nav.show-mobile {
    transform: translateY(0);
  }

  .navbar-right {
    position: relative;
  }

  .mobile-toggle {
    display: block;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
  }

  .auth-buttons .el-button {
    width: 100%;
  }
}
</style>