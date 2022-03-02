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
      component: () => import(/* webpackChunkName: "login" */'@/views/account/login')
    },
    {
      path: '/reg',
      component: () => import(/* webpackChunkName: "reg" */'@/views/account/reg')
    },
    {
      path: '/admin',
      component: () => import(/* webpackChunkName: "admin" */'@/views/admin/index'),
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          component: () => import(/* webpackChunkName: "home" */'@/views/admin/workbench/home')
        },
        {
          path: 'pageList',
          component: () => import(/* webpackChunkName: "pageList" */'@/views/admin/postManage/pageList')
        },
        {
          path: 'post',
          component: () => import(/* webpackChunkName: "post" */'@/views/admin/postManage/post')
        },
        {
          path: 'edit',
          component: () => import(/* webpackChunkName: "post" */'@/views/admin/postManage/post')
        },
        {
          path: 'cateList',
          component: () => import(/* webpackChunkName: "cateList" */'@/views/admin/postManage/cateList')
        },
        {
          path: 'topic',
          component: () => import(/* webpackChunkName: "cateList" */'@/views/admin/postManage/topic')
        },
        {
          path: 'topicManage',
          component: () => import(/* webpackChunkName: "cateList" */'@/views/admin/postManage/topicManage')
        },
        {
          path: 'systemSetting',
          component: () => import(/* webpackChunkName: "systemSetting" */'@/views/admin/setting/systemSetting')
        },
        {
          path: 'userSetting',
          component: () => import(/* webpackChunkName: "userSetting" */'@/views/admin/setting/userSetting')
        },
        {
          path: 'deploy',
          component: () => import(/* webpackChunkName: "compressJs" */'@/views/admin/setting/deploy/index')
        },
        {
          path: 'navigationList',
          component: () => import(/* webpackChunkName: "navigationList" */'@/views/admin/navigationManage/navigationList')
        },
        {
          path: 'navigationCate',
          component: () => import(/* webpackChunkName: "navigationCate" */'@/views/admin/navigationManage/navigationCate')
        },
        {
          path: 'navigationEdit',
          component: () => import(/* webpackChunkName: "navigationEdit" */'@/views/admin/navigationManage/navigationEdit')
        },
        {
          path: 'sourceList',
          component: () => import(/* webpackChunkName: "sourceList" */'@/views/admin/setting/sourceList')
        },
        {
          path: 'caiji',
          component: () => import(/* webpackChunkName: "caiji" */'@/views/admin/caiji/caiji')
        },
        {
          path: 'caijiList',
          component: () => import(/* webpackChunkName: "caijiList" */'@/views/admin/caiji/caijiList')
        },
        {
          path: 'userManage',
          component: () => import(/* webpackChunkName: "userManage" */'@/views/admin/userManage/userManage')
        },
        {
          path: 'roleManage',
          component: () => import(/* webpackChunkName: "roleManage" */'@/views/admin/userManage/roleManage')
        },
        {
          path: 'commentList',
          component: () => import(/* webpackChunkName: "comments" */'@/views/admin/postManage/commentList')
        },
        {
          path: 'tools',
          component: () => import(/* webpackChunkName: "tools" */'@/views/admin/tools/index'),
          children: [
            {
              path: 'qrcode',
              component: () => import(/* webpackChunkName: "qrcode" */'@/views/admin/tools/qrcode/index')
            },
            {
              path: 'dianming',
              component: () => import(/* webpackChunkName: "dianming" */'@/views/admin/tools/dianming/dianming')
            },
            {
              path: 'img2base64',
              component: () => import(/* webpackChunkName: "img2base64" */'@/views/admin/tools/img2base64/img2base64')
            },
            {
              path: 'jsonviewer',
              component: () => import(/* webpackChunkName: "jsonviewer" */'@/views/admin/tools/jsonviewer/jsonviewer')
            },
            {
              path: 'choujiang',
              component: () => import(/* webpackChunkName: "choujiang" */'@/views/admin/tools/choujiang/choujiang')
            },
            {
              path: 'music',
              component: () => import(/* webpackChunkName: "music" */'@/views/admin/tools/musicManage/music')
            },
            {
              path: 'mail',
              component: () => import(/* webpackChunkName: "mail" */'@/views/admin/tools/mail/index')
            },
            {
              path: 'cssFormat',
              component: () => import(/* webpackChunkName: "cssFormat" */'@/views/admin/tools/cssFormat/index')
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
