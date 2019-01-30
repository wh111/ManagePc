const file = "sysMsg";
const api = {
    list: {//列表
        path: file + '/list',
        method: 'get'
    },
    get: {//根据ID获取详情
        path: file + '/get',
        method: 'get'
    },
    edit: {//修改
        path: file + '/modify',
        method: 'put'
    },
    add: {//添加
        path: file + '/add',
        method: 'post'
    },
    remove: { // 删除
        path: file + '/remove',
        method: 'delete'
    }
}
export default api;