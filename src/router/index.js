import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/account/login'
import admin from '@/views/admin/index'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: 'admin'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/reg',
      component: () => import('@/views/account/reg')
    },
    {
      path: '/admin',
      component: admin,
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          component: () => import('@/views/admin/workbench/home')
        },
        {
          path: 'pageList',
          component: () => import('@/views/admin/postManage/pageList')
        },
        {
          path: 'post',
          component: () => import('@/views/admin/postManage/post')
        },
        {
          path: 'edit',
          component: () => import('@/views/admin/postManage/post')
        },
        {
          path: 'cate',
          component: () => import('@/views/admin/postManage/cateList')
        },
        {
          path: 'systemSetting',
          component: () => import('@/views/admin/systemManage/systemSetting')
        },
        {
          path: 'userSetting',
          component: () => import('@/views/admin/systemManage/userSetting')
        },
        {
          path: 'navigationList',
          component: () => import('@/views/admin/navigationManage/navigationList')
        },
        {
          path: 'navigationCate',
          component: () => import('@/views/admin/navigationManage/navigationCate')
        },
        {
          path: 'navigationEdit',
          component: () => import('@/views/admin/navigationManage/navigationEdit')
        },
        {
          path: 'sourceList',
          component: () => import('@/views/admin/sourceManage/sourceList')
        },
        {
          path: 'caiji',
          component: () => import('@/views/admin/caiji/caiji')
        },
        {
          path: 'caijiList',
          component: () => import('@/views/admin/caiji/caijiList')
        },
        {
          path: 'music',
          component: () => import('@/views/admin/musicManage/music')
        },
        {
          path: 'userManage',
          component: () => import('@/views/admin/userManage/userManage')
        },
        {
          path: 'roleManage',
          component: () => import('@/views/admin/roleManage/roleManage')
        },
        {
          path: 'fiction',
          component: () => import('@/views/admin/fiction/fiction')
        },
        {
          path: 'jsonviewer',
          component: () => import('@/views/admin/jsonviewer/jsonviewer')
        },
        {
          path: 'choujiang',
          component: () => import('@/views/admin/choujiang/choujiang')
        },
        {
          path: 'mail',
          component: () => import('@/views/admin/mail/mail')
        },
        {
          path: 'dianming',
          component: () => import('@/views/admin/dianming/dianming')
        },
        {
          path: 'img2base64',
          component: () => import('@/views/admin/img2base64/img2base64')
        },
        {
          path: 'compressJs',
          component: () => import('@/views/admin/compressJs/index')
        },
        {
          path: 'qrcode',
          component: () => import('@/views/admin/qrcode/index')
        },
        {
          path: 'comments',
          component: () => import('@/views/admin/commentManage/index')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
