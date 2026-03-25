<template>
  <div class="article-create-container">
    <h1>发布文章</h1>
    <form @submit.prevent="handleSubmit" class="article-form">
      <div class="form-group">
        <label for="title">标题 *</label>
        <input 
          id="title" 
          v-model="formData.title" 
          type="text" 
          placeholder="请输入文章标题"
          required
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label for="content">内容 *</label>
        <textarea 
          id="content" 
          v-model="formData.content" 
          placeholder="请输入文章内容"
          required
          rows="15"
          class="form-textarea"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="summary">摘要</label>
        <textarea 
          id="summary" 
          v-model="formData.summary" 
          placeholder="请输入文章摘要（可选）"
          rows="3"
          class="form-textarea"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="status">状态 *</label>
        <select 
          id="status" 
          v-model="formData.status" 
          class="form-select"
        >
          <option value="DRAFT">草稿</option>
          <option value="PUBLISHED">发布</option>
        </select>
      </div>
      
      <div class="form-actions">
        <button 
          type="submit" 
          :disabled="loading"
          class="btn-submit"
        >
          {{ loading ? '提交中...' : '发布文章' }}
        </button>
        <router-link to="/articles" class="btn-cancel">取消</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createArticle } from '@/api/article'

interface FormData {
  title: string
  content: string
  summary?: string
  status: 'DRAFT' | 'PUBLISHED'
}

const router = useRouter()
const loading = ref(false)
const formData = ref<FormData>({
  title: '',
  content: '',
  summary: '',
  status: 'DRAFT'
})

const handleSubmit = async () => {
  if (!formData.value.title.trim() || !formData.value.content.trim()) {
    alert('标题和内容不能为空')
    return
  }

  loading.value = true
  
  try {
    const response = await createArticle({
      title: formData.value.title,
      content: formData.value.content,
      summary: formData.value.summary || undefined,
      status: formData.value.status
    })
    
    if (response.code === 200) {
      // 发布成功后跳转到文章列表
      router.push('/articles')
    } else {
      alert(`发布失败: ${response.message || '未知错误'}`)
    }
  } catch (error) {
    console.error('发布文章出错:', error)
    alert('发布文章失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.article-create-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.article-create-container h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.article-form {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
}

.form-textarea:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

.btn-submit {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-submit:hover:not(:disabled) {
  background-color: #66b1ff;
}

.btn-submit:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.btn-cancel {
  padding: 10px 20px;
  background-color: #f4f4f5;
  color: #909399;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-cancel:hover {
  background-color: #ecf5ff;
  color: #409eff;
  border-color: #b3d8ff;
}
</style>