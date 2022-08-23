import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'
import '@/assets/css/reset.css'
import '@/assets/css/index.less'
import JsonViewer from 'vue-json-viewer'

Vue.use(JsonViewer)
Vue.use(ElementUI, { size: 'medium' })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
