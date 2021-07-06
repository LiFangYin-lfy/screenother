/**
 * 路由控制
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import ToolsUtils from '@/utils/ToolsUtils'

Vue.use(VueRouter)

// 组件
import Home from '@/views/Home.vue'
import Mzwh from '@/views/Mzwh.vue'
import Dasj from '@/views/Dasj.vue'
import Swybdp from '@/views/Swybdp.vue'
import Hjjc from '@/views/Hjjc.vue'
import Gzcy from '@/views/Gzcy.vue'
import Xtgl from '@/views/Xtgl.vue'

const router = new VueRouter({
  routes: [{
    path: '/',
    component: Home,
    meta: {
      name: 'home'
    }
  }, {
    path: '/mzwh',
    component: Mzwh,
    meta: {
      name: 'mzwh'
    }
  }, {
    path: '/dasj',
    component: Dasj,
    meta: {
      name: 'dasj'
    }
  }, {
    path: '/swybdp',
    component: Swybdp,
    meta: {
      name: 'swybdp'
    }
  }, {
    path: '/hjjc',
    component: Hjjc,
    meta: {
      name: 'hjjc'
    }
  }, {
    path: '/gzcy',
    component: Gzcy,
    meta: {
      name: 'gzcy'
    }
  }, {
    path: '/xtgl',
    component: Xtgl,
    meta: {
      name: 'xtgl'
    }
  }]
})

router.beforeEach((to, from, next) => {
  const t = setTimeout(() => {
    ToolsUtils.getGlobalVue().$emit('nav-change', {to, from})
    clearTimeout(t)
  }, 500)
  next()
})

export default router