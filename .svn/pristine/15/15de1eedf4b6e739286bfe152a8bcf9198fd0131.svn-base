/**
 * 题库中心
 * 作者:yc
 * 日期:2017/11/30 10:24
 */
import {utils} from "../libs/util";

const trainningCenter = {
    path: 'trainningCenter',
    name: 'trainningCenter',
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: resolve => {
        require.ensure([], () => {
            resolve(require('@/components/common/rightMain'));
        }, 'userCenter');
    },
    redirect: to => {
        return utils.pathPrefix + '/trainningCenter/questionManagement'
    },
    children: [
        {
            //试题管理
            path: 'questionManagement',
            name: 'questionManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/questionsCenter/questionsManagement/questionsManagement_list.vue'));
                }, 'trainningCenter');
            }
        },
        {
            //试卷管理
            path: 'papersManagement',
            name: 'papersManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/questionsCenter/testPaperManagement/testPaperManagement_list.vue'));
                }, 'trainningCenter');
            }
        },
        {
            //测评管理
            path: 'testingManagement',
            name: 'testingManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/questionsCenter/evaluationManagement/evaluationManagement_list.vue'));
                }, 'trainningCenter');
            }
        },
        {
            //错题反馈
            path: 'wrongFeedback',
            name: 'wrongFeedback',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/questionsCenter/errorFeedback/errorFeedback_list.vue'));
                }, 'trainningCenter');
            }
        },
        {
            //超纲反馈
            path: 'superFeedback',
            name: 'superFeedback',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/questionsCenter/superclassFeedback/superclassFeedback_list.vue'));
                }, 'trainningCenter');
            }
        }
    ]
}

export default trainningCenter;
