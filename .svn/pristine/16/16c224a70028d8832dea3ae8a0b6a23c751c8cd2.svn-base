/**
 * 系统管理
 * 作者:yc
 * 日期:2017/11/30 10:44
 */
import {utils} from "../libs/util";

const systemManagement = {
    path: 'systemManagement',
    name: 'systemManagement',
    meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: resolve => {
        require.ensure([], () => {
            resolve(require('@/components/common/rightMain'));
        }, 'userCenter');
    },
    redirect: to => {
        return utils.pathPrefix + '/systemManagement/teamManagement'
    },
    children: [
        {
            //班组管理
            path: 'teamManagement',
            name: 'teamManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/teamManage/team_list.vue'));
                }, 'systemManagement');
            }
        },
        {
            //机构管理
            path: 'institutionManagement',
            name: 'institutionManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/mechanismManage/mechanism_list.vue'));
                }, 'systemManagement');
            }
        },
        {
            //权限管理
            path: 'roleManagement',
            name: 'roleManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/powerManage/power_list.vue'));
                }, 'systemManagement');
            }
        },
        {
            //教材管理
            path: 'textbookManagement',
            name: 'textbookManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/materialManage/material_list.vue'));
                }, 'systemManagement');
            }
        },
        {
            //题型管理
            path: 'questionTypesManagement',
            name: 'questionTypesManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/questionsTypeManage/questionsType_list.vue'));
                }, 'systemManagement');
            }
        },
        {
            //知识体系管理
            path: 'knowledgeManagement',
            name: 'knowledgeManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/knowledgeSystemManage/knowledgeSystem_list.vue'));
                }, 'systemManagement');
            }
        },
        {
            //档案管理
            path: 'archivesManagement',
            name: 'archivesManagement',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/archivesManage/archives_list.vue'));
                }, 'systemManagement');
            }
        },
        {
            //系统消息
            path: 'systemMessages',
            name: 'systemMessages',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/message/message_list.vue'));
                }, 'systemManagement');
            }
        },
        {
            //提现申请
            path: 'applicationForWithdrawal',
            name: 'applicationForWithdrawal',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/withdrawalsManage/withdrawals_list.vue'));
                }, 'systemManagement');
            }
        },
        {
            //用户反馈
            path: 'userFeedback',
            name: 'userFeedback',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/feedbackManage/feedback_list.vue'));
                }, 'systemManagement');
            }
        },
        {
            //系统设置
            path: 'systemConfig',
            name: 'systemConfig',
            component: resolve => {
                require.ensure([], () => {
                    resolve(require('../components/systemManage/systemConfig/systemConfig_list.vue'));
                }, 'systemManagement');
            }
        }
    ]
}

export default systemManagement;
