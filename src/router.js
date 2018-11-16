import VueRouter from 'vue-router'

// 导入组件
import login from './components/index/login.vue'
import forget from './components/index/forget.vue'
import phone from './components/index/phone.vue'
import register from './components/index/register.vue'
import Authentication from './components/home/Authentication.vue'
import myprogram from './components/home/Myprogram.vue'
import sendprogram from './components/home/Sendprogram.vue'
import buildAlbum from './components/home/BuildAlbum.vue'
import haveprogram from './components/home/Haveprogram.vue'
import havealbum from './components/home/HaveAlbum.vue'
import editprogram from './components/home/EditProgram.vue'
import agreement from './components/home/Agreement.vue'
import editalbum from './components/home/editalbum.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: '/', redirect:'/login' },
    { path: '/login', component: login },
    { path: '/phone', component: phone },
    { path: '/forget', component: forget },
    { path: '/register', component: register },
    { path: '/authentication', component: Authentication,meta:{keepAlive: true}},
    { path: '/myprogram', component: myprogram },
    { path: '/sendprogram', component: sendprogram },
    { path: '/buildAlbum', component: buildAlbum },
    { path: '/haveprogram', component: haveprogram},
    { path: '/havealbum', component: havealbum },
    { path: '/editprogram',name:"editProgram", component: editprogram },
    { path: '/editalbum',name:"editAlbum", component: editalbum},
    { path: '/agreement', component: agreement } 
  ]
})

// 把路由对象暴露出去
export default router