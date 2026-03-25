<template>
  <div class="article-edit-container">
    <h2>{{ isEditMode ? '编辑文章' : '创建文章' }}</h2>
    <el-form 
      ref="formRef"
      :model="form" 
      :rules="rules"
      label-width="100px"
      style="max-width: 800px;"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input 
          v-model="form.title" 
          placeholder="请输入文章标题"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="分类" prop="categoryId">
        <el-select 
          v-model="form.categoryId" 
          placeholder="请选择分类"
          style="width: 100%"
        >
          <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="15"
          placeholder="请输入文章内容"
          style="min-height: 400px;"
        />
      </el-form-item>

      <el-form-item label="摘要" prop="summary">
        <el-input
          v-model="form.summary"
          type="textarea"
          :rows="3"
          placeholder="请输入文章摘要，如果不填写将自动从内容中提取"
        />
      </el-form-item>

      <el-form-item>
        <el-button 
          type="primary" 
          @click="onSubmit('PUBLISHED')"
          :loading="publishLoading"
        >
          发布
        </el-button>
        <el-button 
          @click="onSubmit('DRAFT')"
          :loading="draftLoading"
        >
          保存草稿
        </el-button>
        <el-button @click="onCancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { articleApi } from '@/api/article'
import { categoryApi } from '@/api/category'

const router = useRouter()
const route = useRoute()

// 表单数据
const form = reactive({
  title: '',
  content: '',
  summary: '',
  categoryId: null as number | null,
})

// 表单验证规则
const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
}

const formRef = ref()
const categories = ref<{ id: number, name: string }[]>([])
const publishLoading = ref(false)
const draftLoading = ref(false)
const isEditMode = ref(false)

// 获取分类列表
const loadCategories = async () => {
  try {
    const response = await categoryApi.getList()
    categories.value = response.data || []
  } catch (error) {
    console.error('获取分类列表失败:', error)
    ElMessage.error('获取分类列表失败')
  }
}

// 提交表单
const onSubmit = async (status: 'PUBLISHED' | 'DRAFT') => {
  if (!formRef.value) return
  
  // 验证表单
  await formRef.value.validate((valid: boolean) => {
    if (!valid) {
      ElMessage.error('请完善必填信息')
      return
    }

    // 设置加载状态
    if (status === 'PUBLISHED') {
      publishLoading.value = true
    } else {
      draftLoading.value = true
    }

    // 准备提交数据
    const submitData = {
      title: form.title,
      content: form.content,
      summary: form.summary,
      categoryId: form.categoryId,
      status
    }

    // 调用API
    articleApi.create(submitData)
      .then(() => {
        ElMessage.success(status === 'PUBLISHED' ? '文章发布成功' : '草稿保存成功')
        // 跳转到文章列表页
        router.push('/articles')
      })
      .catch(error => {
        console.error('提交文章失败:', error)
        ElMessage.error(status === 'PUBLISHED' ? '文章发布失败' : '草稿保存失败')
      })
      .finally(() => {
        // 重置加载状态
        publishLoading.value = false
        draftLoading.value = false
      })
  })
}

// 取消
const onCancel = () => {
  router.go(-1) // 返回上一页
}

// 初始化
onMounted(() => {
  loadCategories()
})
</script>

<style scoped>
.article-edit-container {
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.article-edit-container h2 {
  margin-bottom: 20px;
  color: #303133;
}
</style>