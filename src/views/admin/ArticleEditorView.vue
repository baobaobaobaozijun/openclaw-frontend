<template>
  <div class="editor-container">
    <h1>{{ isEdit ? '编辑文章' : '创建文章' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>标题</label>
        <input v-model="form.title" placeholder="请输入文章标题" required />
      </div>
      <div class="form-group">
        <label>分类</label>
        <select v-model="form.categoryId">
          <option :value="null">请选择分类</option>
        </select>
      </div>
      <div class="editor-wrapper">
        <div class="editor-input">
          <label>Markdown 内容</label>
          <textarea v-model="form.content" placeholder="请输入 Markdown 内容..." rows="20"></textarea>
        </div>
        <div class="editor-preview">
          <label>预览</label>
          <div class="preview-content" v-html="previewHtml"></div>
        </div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" @click="$router.back()">取消</button>
        <button type="submit" :disabled="loading" class="btn btn-primary">
          {{ loading ? '保存中...' : '保存' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createArticle, updateArticle, getArticle } from '@/api/article'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const isEdit = computed(() => !!route.params.id)

const form = reactive({ title: '', content: '', categoryId: null as number | null })

const previewHtml = computed(() => {
  return form.content
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
})

onMounted(async () => {
  if (isEdit.value) {
    const res = await getArticle(Number(route.params.id))
    if (res.data) {
      form.title = res.data.title
      form.content = res.data.content || ''
      form.categoryId = res.data.categoryId || null
    }
  }
})

const handleSubmit = async () => {
  loading.value = true
  try {
    if (isEdit.value) {
      await updateArticle(Number(route.params.id), form)
    } else {
      await createArticle(form)
    }
    router.push('/articles')
  } catch (e) {
    alert('保存失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.editor-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
.form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; }
.editor-wrapper { display: flex; gap: 16px; margin-bottom: 16px; }
.editor-input, .editor-preview { flex: 1; }
.editor-input textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-family: monospace; font-size: 14px; resize: vertical; }
.preview-content { border: 1px solid #ddd; border-radius: 4px; padding: 12px; min-height: 400px; line-height: 1.8; overflow-y: auto; }
.form-actions { display: flex; gap: 12px; justify-content: flex-end; }
.btn { padding: 10px 24px; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; }
.btn-primary { background: #007bff; color: #fff; }
.btn-secondary { background: #6c757d; color: #fff; }
.btn:disabled { opacity: 0.6; }
@media (max-width: 768px) { .editor-wrapper { flex-direction: column; } }
</style>