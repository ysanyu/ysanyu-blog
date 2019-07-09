import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/base.less'
import './assets/icon/iconfont.css'
import animate from 'animate.css'
import 'vant/lib/index.css'
import { Dialog, Toast } from 'vant'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
Vue.use(animate)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(mavonEditor)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data () {
    return {
      codeStyle: 'atelier-lakeside-light'
    }
  },
  render: h => h(App)
})
