import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import store from './store'

import '@/common/lib-flexible/flexible.js'

import * as echarts from 'echarts'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import mousewheel from './directive/mousewheel'
import inertiaDrag from './directive/inertia-drag'
import drag from './directive/drag'

import VueScroll from 'vuescroll'

Vue.config.productionTip = false

mousewheel.install(Vue)
inertiaDrag.install(Vue)
drag.install(Vue)

Vue.prototype.$echarts = echarts
Vue.use(ElementUI, {
  size: 'mini'
})
Vue.use(VueScroll, {
  ops: {
    bar: {
      background: '#ccc',
      /*keepShow: true*/
    },
    scrollPanel: {
      scrollingX: false
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')