const file = '/outofQuestion';
const api = {
	list: {//列表
		path: file + '/list',
		method: 'get'
	},
	get: {//查看
		path: file + '/info?questionId=',
		method: 'get'
	},
	enable: {//冻结  解冻
		path: file + '/enable',
		method: 'put'
	},
    replyWrong: {//错题反馈
      path: file + '/replyWrong',
    method: 'post'
    },
    reply: {//超纲反馈
        path: file + '/reply',
        method: 'post'
    }
}
export default api
