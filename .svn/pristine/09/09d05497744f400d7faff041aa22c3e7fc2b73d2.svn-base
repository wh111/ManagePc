/**
 * 商品管理
 * 作者:yc
 * 日期:2017/11/30 10:29
 */
import {utils} from "../libs/util";

const goodsManagement = {
    path: 'goodsManagement',
    name: 'goodsManagement',
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: resolve => {
        require.ensure([], () => {
            resolve(require('@/components/common/rightMain'));
        }, 'userCenter');
    },
    redirect: to => {
        return utils.pathPrefix + '/goodsManagement/productList'
    },
    children: [
        {
            //商品列表
            path: 'productList',
            name: 'productList',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/goodsManagement/goodsManage/goodsList.vue'));
                }, 'goodsManagement');
            }
        },
        {
            //积分商品
            path: 'pointReward',
            name: 'pointReward',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/goodsManagement/integralManage/integral_list.vue'));
                }, 'goodsManagement');
            }
        }
    ]
}

export default goodsManagement;
