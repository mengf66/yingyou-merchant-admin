import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// Element UI 样式由 styles/jin-theme.scss 按朱红主色重新编译，不再引入默认蓝色主题
import locale from 'element-ui/lib/locale/lang/zh-CN' // Element 组件使用中文

import VueAxios from 'vue-axios'
import Axios from 'axios'
import api from './config/api'


import '@/styles/index.scss' // global css
import '@/styles/jin-theme.scss' // 应游晋游主题（朱红主色、宣纸底、黛青侧栏）

import App from './App'
import store from './store'
import router from './router'

// import '@/icons' // icon
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// ElementUI 使用中文语言包（分页、日期选择器、弹窗按钮等显示中文）
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(VueAxios, Axios);

Vue.config.productionTip = false

// rootUrl 改成同源相对地址 '/admin/' 后，少数页面仍用 root + 'xxx' 拼出完整路径，
// axios 会把 baseURL 再拼一次变成 /admin/admin/xxx；这里对已带前缀的请求跳过 baseURL。
Axios.interceptors.request.use(config => {
  if (config.url && config.url.indexOf(api.rootUrl) === 0) {
    config.baseURL = '';
  }
  return config;
});

router.beforeEach((to, from, next) => {

  let token = localStorage.getItem('token') || '';

  //配置接口信息
  // Axios.defaults.baseURL = 'http://www.地址.com:8360/admin/';
  Axios.defaults.baseURL = api.rootUrl;
  Axios.defaults.headers.common['X-Hioshop-Token'] = token;

  if (!token && to.name !== 'login') {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
