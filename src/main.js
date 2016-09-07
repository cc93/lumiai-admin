/**
 * Created by congcong on 16/8/24.
 */
//devDependencies
var VueRouter = require('vue-router');
var Vuex = require('vuex');

//全局注入middlewares,pluggins(作用于为全局)
Vue.use(Vuex);
Vue.use(VueRouter);
//用于路由的components
var VHead = require('./components/VHead.vue');
var VFoot = require('./components/VFoot.vue');
var Comments = require('./components/Comments.vue');
var Users = require('./components/Users.vue');

//router
var router = new VueRouter({
    //linkActiveClass:'active'
});
router.map({
    '/comments': {
        component: Comments
    },
    '/users': {
        component: Users
    }
});
router.redirect({
    // 重定向任意未匹配路径到首页
    '*': '/comments'
});
router.beforeEach(function () {
    window.scrollTo(0, 0);
});

//根实例
var App = Vue.extend({
    components: {
        'vhead': VHead,
        'vfoot': VFoot
    }
});
//挂载根实例到body,且启动其下的路由(路由router实例相当于vue根实例的一个子组件,地位等同VHead)
router.start(App, 'body');
