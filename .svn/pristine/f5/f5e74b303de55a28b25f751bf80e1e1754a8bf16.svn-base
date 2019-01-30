/**
 * 订单中心
 * 作者:yc
 * 日期:2017/11/30 10:31
 */
import {utils} from "../libs/util";

const orderCenter = {
    path: 'orderCenter',
    name: 'orderCenter',
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: resolve => {
        require.ensure([], () => {
            resolve(require('@/components/common/rightMain'));
        }, 'userCenter');
    },
    redirect: to => {
        return utils.pathPrefix + '/orderCenter/goodsOrder'
    },
    children: [
        {
            //商品订单
            path: 'goodsOrder',
            name: 'goodsOrder',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/orderCenter/orderManage/orderManage_list.vue'));
                }, 'orderCenter');
            }
        },
        {
            //积分订单
            path: 'pointOrder',
            name: 'pointOrder',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/orderCenter/exchangeGoods/exchangeGoods_list.vue'));
                }, 'orderCenter');
            }
        }
    ]
}

export default orderCenter;
