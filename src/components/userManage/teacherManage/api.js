const file = '/teacher';
const api = {
    list: {//列表
        path: file + '/list',
        method: 'get'
    },
    get: {//查看老师详情
        path: file + '/get',
        method: 'get'
    },
    getByAccount: {//根据账号查询老师详情
        path: file + '/getByAccount',
        method: 'get'
    },
    modify: {//修改
        path: file + '/modify',
        method: 'post',
    },
    add: {//添加
        path: file + '/add',
        method: 'post'
    },
    import: {//导入
        path: file + '/import',
        method: 'get'
    },
    enable: {//解冻冻结
        path: file + '/enable',
        method: 'put'
    },
    audit: {
        path: file + '/audit',
        method: 'put'
    },
    organization: {
        path: "organization/all",
        method: 'get'
    },
    queryTextbookVersion: {
        path: '/query-textbookVersion-by-subject',
        method: 'get',
    }
}
export default api;
