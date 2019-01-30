const file = '/guardian';
const api = {
	add: {//添加
		path: file + '/addStudent',
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
  getByAccount:{//根据账号查询学生详情
	  path: '/student/getByAccount?account=',
    method:'get'
  },
	modify: {//修改
		path: file + '/modify',
		method: 'put'
	},
  unparent: {//解除关系
		path: file + '/unparent',
		method: 'delete'
	},
  enable:{//  解冻／冻结
	  path: file + '/enable',
    method:'put'
  }
}
export default api
