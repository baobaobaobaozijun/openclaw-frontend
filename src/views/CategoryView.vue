<template>
  <div class="category-view">
    <h1 class="title">分类：{{ route.params.slug }}</h1>
    <p>分类页面开发中...</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.category-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>
