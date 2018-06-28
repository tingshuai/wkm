import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import 'url-search-params-polyfill'//兼容formData数据格式转化
import Loading from './common/Loading.vue' //loading
import mesTable from './common/Table.vue' //表格组件
import toolbar from './common/toolbar.vue' //按钮组件
import pocHeader from './common/pocHeader.vue'
import page from './common/page.vue'
import Sidebar from './common/Sidebar.vue'
import mesSearch from './common/search.vue'
import mesToast from './common/Toast.vue'
import lookInfo from './common/lookInfo'
import breadcrumb from './common/breadcrumb.vue'
import './api/mock/mock'
import  './api/mock/xhMock'

Vue.config.productionTip = false

//element UI
Vue.use(Element);
//全局组件
Vue.component('mesTable', mesTable) //表格组件
Vue.component('toolbar', toolbar)
Vue.component('Loading', Loading)
Vue.component('pocHeader', pocHeader)
Vue.component('Page', page)
Vue.component('Sidebar', Sidebar);
Vue.component('mesSearch', mesSearch);
Vue.component('mesToast', mesToast);
Vue.component('lookInfo',lookInfo);
Vue.component('breadCrumb',breadcrumb);
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  }
})
// 路由守卫
router.beforeEach((to, from, next) => {
    //跳转
    next();
    //等待刷新
    store.commit('setIsLoading', true)
    //关闭
    setTimeout(() => {
      store.commit('setIsLoading', false)
    }, 1000)
})
