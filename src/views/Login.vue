<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">用户登录</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="username" class="input-label">用户名</label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            placeholder="请输入用户名"
            class="input-field"
            required
          />
        </div>
        
        <div class="input-group">
          <label for="password" class="input-label">密码</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="请输入密码"
            class="input-field"
            required
          />
        </div>
        
        <button 
          type="submit" 
          class="login-button"
          :disabled="loading"
        >
          <span v-if="loading">登录中...</span>
          <span v-else>登录</span>
        </button>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/auth'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = '请输入用户名和密码'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await authApi.login(username.value, password.value)
    const token = response.data.token
    
    // 存储token到localStorage
    localStorage.setItem('access_token', token)
    
    // 跳转到首页
    router.push('/')
  } catch (error: any) {
    console.error('登录失败:', error)
    
    // 显示错误信息
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = '登录失败，请检查用户名和密码'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 1rem;
}

.login-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 1rem;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.3s;
}

.login-button:hover:not(:disabled) {
  background-color: #66b1ff;
}

.login-button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fde2e2;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
}
</style>
