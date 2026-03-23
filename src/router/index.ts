import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/RegisterView.vue') },
  { path: '/articles', name: 'ArticleList', component: () => import('../views/ArticleListView.vue') },
  { path: '/articles/:id', name: 'ArticleDetail', component: () => import('../views/ArticleDetailView.vue') },
  { path: '/admin/editor', name: 'ArticleCreate', component: () => import('../views/admin/ArticleEditorView.vue'), meta: { requiresAuth: true } },
  { path: '/admin/editor/:id', name: 'ArticleEdit', component: () => import('../views/admin/ArticleEditorView.vue'), meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router