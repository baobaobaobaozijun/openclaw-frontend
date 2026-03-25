<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <p class="error-message">页面未找到</p>
      <router-link to="/" class="home-button">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.not-found-content {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 6rem;
  margin: 0;
  color: #333;
  line-height: 1;
}

.error-message {
  font-size: 1.5rem;
  color: #666;
  margin: 1rem 0;
}

.home-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #409eff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.home-button:hover {
  background-color: #66b1ff;
}
</style>