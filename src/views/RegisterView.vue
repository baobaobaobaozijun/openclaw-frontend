<template>
  <div class="register-container">
    <div class="register-form">
      <h2>用户注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            id="username" 
            v-model="registerForm.username" 
            type="text" 
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input 
            id="email" 
            v-model="registerForm.email" 
            type="email" 
            placeholder="请输入邮箱"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            id="password" 
            v-model="registerForm.password" 
            type="password" 
            placeholder="请输入密码"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input 
            id="confirmPassword" 
            v-model="registerForm.confirmPassword" 
            type="password" 
            placeholder="请再次输入密码"
            required
          />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <div class="form-actions">
          <button type="submit" :disabled="loading" class="btn btn-primary">
            <span v-if="loading">注册中...</span>
            <span v-else>注册</span>
          </button>
        </div>
        <div class="form-footer">
          <p>已有账号？<router-link to="/login">立即登录</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 邮箱格式验证
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleRegister = async () => {
  // 清除之前的错误信息
  errorMessage.value = ''
  
  // 表单验证
  if (!registerForm.username.trim()) {
    errorMessage.value = '用户名不能为空'
    return
  }
  
  if (!isValidEmail(registerForm.email)) {
    errorMessage.value = '邮箱格式不正确'
    return
  }
  
  if (!registerForm.password.trim()) {
    errorMessage.value = '密码不能为空'
    return
  }
  
  if (registerForm.password !== registerForm.confirmPassword) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }
  
  if (registerForm.password.length < 6) {
    errorMessage.value = '密码长度至少为6位'
    return
  }
  
  loading.value = true
  
  try {
    // 调用后端注册接口
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password
      })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      // 注册成功，跳转到登录页
      alert('注册成功，请登录')
      router.push('/login')
    } else {
      // 注册失败，显示错误信息
      errorMessage.value = data.message || '注册失败，请重试'
    }
  } catch (error) {
    console.error('注册失败:', error)
    errorMessage.value = '网络错误，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.register-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.register-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  text-align: center;
  padding: 0.5rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.form-actions {
  margin: 1.5rem 0;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #28a745;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #218838;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-footer {
  text-align: center;
  margin-top: 1rem;
}

.form-footer a {
  color: #007bff;
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}
</style>