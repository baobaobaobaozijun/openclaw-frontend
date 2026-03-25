<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">注册</h2>
      <form @submit.prevent="handleRegister" class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">用户名</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-input"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">密码</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-input"
            placeholder="请输入密码"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword" class="form-label">确认密码</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="form-input"
            placeholder="请再次输入密码"
            required
          />
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button
          type="submit"
          class="login-button"
          :disabled="loading"
          :class="{ 'button-loading': loading }"
        >
          <span v-if="loading">注册中...</span>
          <span v-else>注册</span>
        </button>
      </form>
      <div class="login-footer">
        <router-link to="/login" class="link">已有账号？立即登录</router-link>
      </div>
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
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  // 清除之前的错误信息
  errorMessage.value = ''
  
  // 检查密码一致性
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }

  // 检查密码长度
  if (password.value.length < 6) {
    errorMessage.value = '密码长度不能少于6位'
    return
  }

  loading.value = true
  
  try {
    await authApi.register({ username: username.value, email: '', password: password.value })
    // 注册成功后跳转到登录页面
    router.push('/login')
  } catch (error: any) {
    console.error('Registration failed:', error)
    // 显示错误信息
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = '注册失败，请稍后重试'
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
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 30px;
}

.login-title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.error-message {
  color: #f56c6c;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover:not(:disabled) {
  background-color: #66b1ff;
}

.login-button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.button-loading {
  position: relative;
}

.login-footer {
  margin-top: 20px;
  text-align: center;
}

.link {
  color: #409eff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>