import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue'), meta: { title: '首页' } },
  { path: '/login', name: 'Login', component: () => import('@/views/Login.vue'), meta: { title: '登录' } },
  { path: '/register', name: 'Register', component: () => import('@/views/Register.vue'), meta: { title: '注册' } },
  { path: '/articles', name: 'ArticleList', component: () => import('@/views/Articles.vue'), meta: { title: '文章列表' } },
  { path: '/article/:id', name: 'ArticleDetail', component: () => import('@/views/ArticleDetail.vue'), meta: { title: '文章详情' }, props: true },
  { path: '/article/new', name: 'ArticleCreate', component: () => import('@/views/ArticleEdit.vue'), meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue'), meta: { title: '页面未找到' } }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const title = (to.meta.title as string) || 'OpenClaw Blog'
  document.title = title
  
  const token = localStorage.getItem('token')
  
  // 检查是否需要认证
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } 
  // 已登录用户访问登录或注册页面，重定向到首页
  else if (token && (to.path === '/login' || to.path === '/register')) {
    next('/')
  }
  // 其他情况正常通行
  else {
    next()
  }
})

export default router