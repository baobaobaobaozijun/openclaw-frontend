<template>
  <div class="login-container">
    <div class="login-form">
      <h2>用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="phone">手机号</label>
          <input id="phone" v-model="form.phone" type="tel" placeholder="请输入11位手机号" maxlength="11" required />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input id="password" v-model="form.password" type="password" placeholder="请输入密码" required />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <div class="form-actions">
          <button type="submit" :disabled="loading" class="btn btn-primary">
            <span v-if="loading">登录中...</span>
            <span v-else>登录</span>
          </button>
        </div>
        <div class="form-footer">
          <p>还没有账号？<router-link to="/register">立即注册</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const error = ref('')

const form = reactive({ phone: '', password: '' })

const handleLogin = async () => {
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    error.value = '请输入正确的11位手机号'
    return
  }
  loading.value = true
  error.value = ''
  try {
    const res = await authApi.login(form.phone, form.password)
    authStore.login(res.token)
    router.push('/')
  } catch (e: any) {
    error.value = e.response?.data?.message || '登录失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f5f5f5; }
.login-form { width: 100%; max-width: 400px; padding: 2rem; background: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,.1); }
.login-form h2 { text-align: center; margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: .5rem; font-weight: 500; }
.form-group input { width: 100%; padding: .75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; }
.form-group input:focus { outline: none; border-color: #007bff; }
.error { color: #e74c3c; font-size: .9rem; margin: .5rem 0; }
.form-actions { margin: 1.5rem 0; }
.btn { width: 100%; padding: .75rem; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; }
.btn-primary { background: #007bff; color: #fff; }
.btn-primary:hover:not(:disabled) { background: #0056b3; }
.btn:disabled { opacity: .6; }
.form-footer { text-align: center; }
.form-footer a { color: #007bff; text-decoration: none; }
</style>
