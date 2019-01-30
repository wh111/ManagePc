/**
 * 任务管理
 * 作者:yc
 * 日期:2017/11/30 10:41
 */
import {utils} from "../libs/util";

const taskManagement = {
  path: 'taskManagement',
  name: 'taskManagement',
  meta: {
    requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
  },
  component: resolve => {
    require.ensure([], () => {
      resolve(require('@/components/common/rightMain'));
    }, 'userCenter');
  },
  redirect: to => {
    return utils.pathPrefix + '/taskManagement/taskAnnouncement'
  },
  children: [
    {
      //刷题大赛
      path: 'stds',
      name: 'stds',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../components/taskManage/taskPublish/taskPublish.vue'));
        }, 'taskManagement');
      }
    },
    {
      //众包组题
      path: 'zbzt',
      name: 'zbzt',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../components/taskManage/Congregation/Congregation_list.vue'));
        }, 'taskManagement');
      }
    },
    {
      //题集投稿
      path: 'jttg',
      name: 'jttg',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../components/taskManage/topicCollection/topicCollection_list.vue'));
        }, 'taskManagement');
      }
    },
    {
      //名师解题
      path: 'teacherProblemSolving',
      name: 'teacherProblemSolving',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../components/taskManage/teachersSoleProblems/teachersSoleProblems_list.vue'));
        }, 'taskManagement');
      }
    }
  ]
}

export default taskManagement;
