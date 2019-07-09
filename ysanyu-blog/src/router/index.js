import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const _importView = file => () => import('@/pages/' + file)

Vue.use(Router)

const childRouter = [
  {
    path: 'login',
    name: 'Login',
    component: _importView('Login')
  },
  {
    path: 'wechat',
    name: 'Wechat',
    component: _importView('Wechat')
  },
  {
    path: 'article',
    name: 'Article',
    component: _importView('Article')
  },
  {
    path: 'history',
    name: 'History',
    component: _importView('History')
  },
  {
    path: 'author',
    name: 'Author',
    component: _importView('Author')
  }
]

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: _importView('Home'),
      redirect: '/article',
      children: childRouter
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/admin/Admin'),
      redirect: '/admin/AllArticle',
      children: [
        {
          path: 'allArticle',
          name: 'AllArticle',
          component: () => import('@/admin/AllArticle')
        },
        {
          path: 'writeBlog',
          name: 'WriteBlog',
          component: () => import('@/admin/WriteBlog')
        },
        {
          path: 'author',
          name: 'author',
          component: () => import('@/admin/AuthorWrite')
        },
        {
          path: 'newPassword',
          name: 'NewPassword',
          component: () => import('@/admin/NewPassword')
        }
      ]
    },
    {
      path: '/blog',
      name: 'Blog',
      component: _importView('Blog')
    },
    // 统一跳转
    {
      path: '/*',
      redirect: '/article'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isLogin = store.getters.checkLogin
  if (isLogin) {
    // 如果用户信息存在则往下执行。
    if (from.path === '/admin' && to.path === '/login') {
      next('/article')
    } else {
      next()
    }
  } else {
    // 如果用户token不存在则跳转到login页面
    if (to.matched[0].path === '/admin') {
      next('/article')
    } else {
      next()
    }
  }
})

export default router
