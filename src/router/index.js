import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */'@/views/account/login')
    },
    {
      path: '/reg',
      component: () => import(/* webpackChunkName: "reg" */'@/views/account/reg')
    },
    {
      path: '/regActive',
      component: () => import(/* webpackChunkName: "regActive" */'@/views/account/regActive')
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "admin" */'@/views/index'),
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          component: () => import(/* webpackChunkName: "home" */'@/views/workbench/home')
        },
        {
          path: 'pageList',
          component: () => import(/* webpackChunkName: "pageList" */'@/views/postManage/pageList')
        },
        {
          path: 'post',
          component: () => import(/* webpackChunkName: "post" */'@/views/postManage/post')
        },
        {
          path: 'edit',
          component: () => import(/* webpackChunkName: "post" */'@/views/postManage/post')
        },
        {
          path: 'cateList',
          component: () => import(/* webpackChunkName: "cateList" */'@/views/postManage/cateList')
        },
        {
          path: 'topic',
          component: () => import(/* webpackChunkName: "topic" */'@/views/postManage/topic')
        },
        {
          path: 'topicManage',
          component: () => import(/* webpackChunkName: "cateList" */'@/views/postManage/topicManage')
        },
        {
          path: 'systemSetting',
          component: () => import(/* webpackChunkName: "systemSetting" */'@/views/setting/systemSetting')
        },
        {
          path: 'mail',
          component: () => import(/* webpackChunkName: "mail" */'@/views/setting/sendMail')
        },
        {
          path: 'recycle',
          component: () => import(/* webpackChunkName: "recycle" */'@/views/setting/recyclePost')
        },
        {
          path: 'userSetting',
          component: () => import(/* webpackChunkName: "userSetting" */'@/views/setting/userSetting')
        },
        {
          path: 'deploy',
          component: () => import(/* webpackChunkName: "deploy" */'@/views/setting/deploy')
        },
        {
          path: 'navigationList',
          component: () => import(/* webpackChunkName: "navigationList" */'@/views/navigationManage/navigationList')
        },
        {
          path: 'navigationCate',
          component: () => import(/* webpackChunkName: "navigationCate" */'@/views/navigationManage/navigationCate')
        },
        {
          path: 'navigationEdit',
          component: () => import(/* webpackChunkName: "navigationEdit" */'@/views/navigationManage/navigationEdit')
        },
        {
          path: 'sourceList',
          component: () => import(/* webpackChunkName: "sourceList" */'@/views/setting/sourceList')
        },
        {
          path: 'caiji',
          component: () => import(/* webpackChunkName: "caiji" */'@/views/caiji/caiji')
        },
        {
          path: 'caijiList',
          component: () => import(/* webpackChunkName: "caijiList" */'@/views/caiji/caijiList')
        },
        {
          path: 'tbkType',
          component: () => import(/* webpackChunkName: "caijiList" */'@/views/caiji/tbkCate')
        },
        {
          path: 'userManage',
          component: () => import(/* webpackChunkName: "userManage" */'@/views/userManage/userManage')
        },
        {
          path: 'roleManage',
          component: () => import(/* webpackChunkName: "roleManage" */'@/views/userManage/roleManage')
        },
        {
          path: 'menuManage',
          component: () => import(/* webpackChunkName: "roleManage" */'@/views/userManage/menuManage')
        },
        {
          path: 'commentList',
          component: () => import(/* webpackChunkName: "comments" */'@/views/postManage/commentList')
        },
        {
          path: 'tools',
          component: () => import(/* webpackChunkName: "tools" */'@/views/tools/index'),
          children: [
            {
              path: 'qrcode',
              component: () => import(/* webpackChunkName: "qrcode" */'@/views/tools/qrcode/index')
            },
            {
              path: 'dianming',
              component: () => import(/* webpackChunkName: "dianming" */'@/views/tools/dianming/dianming')
            },
            {
              path: 'img2base64',
              component: () => import(/* webpackChunkName: "img2base64" */'@/views/tools/img2base64/img2base64')
            },
            {
              path: 'jsonviewer',
              component: () => import(/* webpackChunkName: "jsonviewer" */'@/views/tools/jsonviewer/jsonviewer')
            },
            {
              path: 'choujiang',
              component: () => import(/* webpackChunkName: "choujiang" */'@/views/tools/choujiang/choujiang')
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
