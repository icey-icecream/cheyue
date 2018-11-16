// 入口文件
import Vue from 'vue'

// 关闭控制台输出
Vue.config.productionTip = false;

import Vuex from 'vuex'
Vue.use(Vuex)

// 引入axios
import axios from 'axios'
Vue.prototype.axios = axios


// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入APP根组件
import app from './App.vue'

// 引入bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// 引入jQuery
import $ from 'jquery'

// 导入自己的路由模块
import router from './router.js'

// 导入js组件
import common from './common.js'
Vue.prototype.common = common



// 引入elementUI
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

//router.push('login')
// 创建实例
var vm = new Vue({
    el: '#app',
    data: {},
    methods: {},
    render: c => c(app),
    router
})