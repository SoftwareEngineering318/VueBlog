import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'  //导入element-ui
import axios from "axios"  //导入axios
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import "./axios"

Vue.use(Element)
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
