<template>
  <div class="home">
    <h1>OpenClaw Frontend</h1>
    <p>Vue 3 + TypeScript + Vite</p>
    <div class="status">
      <h2>系统状态</h2>
      <ul>
        <li>✅ Vue 3 已初始化</li>
        <li>✅ TypeScript 已配置</li>
        <li>✅ Vue Router 已配置</li>
        <li>✅ Pinia 状态管理已配置</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home View Component
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

h1 {
  color: #42b983;
  margin-bottom: 10px;
  font-size: 2rem;
}

p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.2rem;
}

.status {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.status h2 {
  margin-bottom: 15px;
  color: #333;
  font-size: 1.5rem;
}

.status ul {
  list-style: none;
  padding: 0;
}

.status li {
  padding: 12px 0;
  color: #555;
  border-bottom: 1px solid #e0e0e0;
}

.status li:last-child {
  border-bottom: none;
}

/* 手机端适配 */
@media (max-width: 375px) {
  .home {
    padding: 20px 15px;
  }
  
  h1 {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 20px;
  }
  
  .status {
    padding: 15px;
  }
  
  .status h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .status li {
    padding: 10px 0;
    font-size: 0.9rem;
  }
}

/* 平板端适配 */
@media (min-width: 376px) and (max-width: 768px) {
  .home {
    padding: 30px 20px;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  p {
    font-size: 1.1rem;
  }
  
  .status {
    padding: 18px;
  }
  
  .status h2 {
    font-size: 1.4rem;
  }
  
  .status li {
    padding: 11px 0;
  }
}

/* 桌面端适配 */
@media (min-width: 769px) and (max-width: 1024px) {
  .home {
    padding: 35px 25px;
  }
  
  h1 {
    font-size: 1.9rem;
  }
  
  .status {
    padding: 19px;
  }
  
  .status h2 {
    font-size: 1.45rem;
  }
  
  .status li {
    padding: 11px 0;
  }
}

/* 大屏幕桌面 */
@media (min-width: 1025px) {
  .home {
    padding: 40px 20px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .status h2 {
    font-size: 1.5rem;
  }
}
</style>