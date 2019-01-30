/**
 * 用户中心
 * 作者:yc
 * 日期:2017/11/30 10:24
 */
import {utils} from "../libs/util";

const userCenter = {
    path: 'userCenter',
    name: 'userCenter',
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: resolve => {
        require.ensure([], () => {
            resolve(require('@/components/common/rightMain'));
        }, 'userCenter');
    },
    redirect: to => {
        return utils.pathPrefix + '/userCenter/studentManager'
    },
    children: [
        {
            //学生管理
            path: 'studentManager',
            name: 'studentManager',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/userManage/studentManage/studentManage_list.vue'));
                }, 'userCenter');
            }
        },
        {
            //教师管理
            path: 'teacherManager',
            name: 'teacherManager',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/userManage/teacherManage/teacherManage_list.vue'));
                }, 'userCenter');
            }
        },
        {
            //家长管理
            path: 'parentsManager',
            name: 'parentsManager',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/userManage/parentManage/parentManage_list.vue'));
                }, 'userCenter');
            }
        },
        {
            //管理员维护
            path: 'webManager',
            name: 'webManager',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/userManage/adminManage/adminManage_list.vue'));
                }, 'userCenter');
            }
        }
    ]
}

export default userCenter;
