import Vue from 'vue'
import Router from 'vue-router'

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
      component: () => import('@/views/account/login')
    },
    {
      path: '/reg',
      component: () => import('@/views/account/reg')
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/index'),
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
          component: () => import('@/views/admin/setting/systemSetting')
        },
        {
          path: 'userSetting',
          component: () => import('@/views/admin/setting/userSetting')
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
          component: () => import('@/views/admin/setting/sourceList')
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
          path: 'userManage',
          component: () => import('@/views/admin/userManage/userManage')
        },
        {
          path: 'roleManage',
          component: () => import('@/views/admin/userManage/roleManage')
        },
        {
          path: 'comments',
          component: () => import('@/views/admin/postManage/commentList')
        },
        {
          path: 'tools',
          component: () => import('@/views/admin/tools/index'),
          children: [
            {
              path: 'qrcode',
              component: () => import('@/views/admin/tools/qrcode/index')
            },
            {
              path: 'dianming',
              component: () => import('@/views/admin/tools/dianming/dianming')
            },
            {
              path: 'img2base64',
              component: () => import('@/views/admin/tools/img2base64/img2base64')
            },
            {
              path: 'compressJs',
              component: () => import('@/views/admin/tools/compressJs/index')
            },
            {
              path: 'fiction',
              component: () => import('@/views/admin/tools/fiction/fiction')
            },
            {
              path: 'jsonviewer',
              component: () => import('@/views/admin/tools/jsonviewer/jsonviewer')
            },
            {
              path: 'choujiang',
              component: () => import('@/views/admin/tools/choujiang/choujiang')
            },
            {
              path: 'music',
              component: () => import('@/views/admin/tools/musicManage/music')
            },
            {
              path: 'mail',
              component: () => import('@/views/admin/tools/mail/index')
            },
          ]
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
