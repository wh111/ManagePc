const file = "student/integral";
const api = {
    list: {//列表
        path: file + '/list',
        method: 'get'
    },
    get: {//明细/历史记录
        path: file + '/historyRecord',
        method: 'get'
    }
}
export default api;