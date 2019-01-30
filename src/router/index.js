import Vue from 'vue'
import Router from 'vue-router'
import {utils} from "../libs/util"

Vue.use(Router)

// 登陆
import login from '../components/login'
// 首页
import manage from '../components/index'

// 用户中心
import userCenter from './userCenter'
// 题库中心
import trainningCenter from './trainningCenter'
// 商品管理
import goodsManagement from './goodsManagement'
// 订单中心
import orderCenter from './orderCenter'
// 积分管理
import pointManagement from './pointManagement'
// 任务管理
import taskManagement from './taskManagement'
// 系统管理
import systemManagement from './systemManagement'
// 报表中心
import reportCenter from './reportCenter'
let base = utils.base
let routes = [
    //系统打的默认首页
    {path: utils.pathPrefix + '.html', redirect: utils.pathPrefix},
    {
        path: base+'/login',
        name: 'login',
        meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: login
    },
    {
        path: base+utils.pathPrefix,
        name: 'manage',
        component: manage,
        children: [
            userCenter,// 用户中心
            trainningCenter,// 题库中心
            goodsManagement,// 商品管理
            orderCenter,// 订单中心
            pointManagement,// 积分管理
            taskManagement, // 任务管理
            systemManagement, // 系统管理
            reportCenter // 报表中心
        ]
    },
    {path: '*', redirect: base+'/login'}
];

export default new Router({
    mode: 'history',
    routes
})
