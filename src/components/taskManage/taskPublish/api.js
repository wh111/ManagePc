const file = '/gamesAnswer';
const api = {
    add: {//添加教材内容
        path: file + '/add',
        method: 'post'
    },
    list: {//列表
        path: file + '/list',
        method: 'get'
    },
    get: {//查看
        path: file + '/get?id=',
        method: 'get'
    },
    audit: {//审核
        path: file + '/audit',
        method: 'put'
    },
    ranking: {
        path: file + '/ranking?id=',
        method: 'get'
    },
    getSeason: { // 获取赛季
        path: '/games/season/queryAll',
        method: 'get'
    }
}
export default api
