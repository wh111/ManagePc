/**
 * 积分管理
 * 作者:yc
 * 日期:2017/11/30 10:34
 */
import {utils} from "../libs/util";

const pointManagement = {
    path: 'pointManagement',
    name: 'pointManagement',
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: resolve => {
        require.ensure([], () => {
            resolve(require('@/components/common/rightMain'));
        }, 'userCenter');
    },
    redirect: to => {
        return utils.pathPrefix + '/pointManagement/personManagement'
    },
    children: [
        {
            //个人积分
            path: 'personManagement',
            name: 'personManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/integralManage/integral_list.vue'));
                }, 'pointManagement');
            }
        }
    ]
}

export default pointManagement;
