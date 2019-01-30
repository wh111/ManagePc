/**
 * 报表中心
 * 作者:yc
 * 日期:2017/11/30 10:51
 */
import {utils} from "../libs/util";

const reportCenter = {
    path: 'reportCenter',
    name: 'reportCenter',
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: resolve => {
        require.ensure([], () => {
            resolve(require('@/components/common/rightMain'));
        }, 'userCenter');
    },
    redirect: to => {
        return utils.pathPrefix + '/reportCenter/recharge'
    },
    children: [
        {
            //充值记录
            path: 'recharge',
            name: 'recharge',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/reportFormCenter/recharge_form.vue'));
                }, 'reportCenter');
            }
        },
        {
            //销售总览
            path: 'salesOverview',
            name: 'salesOverview',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/reportFormCenter/sale_form.vue'));
                }, 'reportCenter');
            }
        },
        {
            //活跃统计
            path: 'activeStatistical',
            name: 'activeStatistical',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/reportFormCenter/active_form.vue'));
                }, 'reportCenter');
            }
        },
        {
            //做题量统计
            path: 'doExerciseStatistics',
            name: 'doExerciseStatistics',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/reportFormCenter/assignment_form.vue'));
                }, 'reportCenter');
            }
        },
        {
            //布置作业统计
            path: 'assignmentStatistics',
            name: 'assignmentStatistics',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/reportFormCenter/testType_form.vue'));
                }, 'reportCenter');
            }
        }
    ]
}

export default reportCenter;
