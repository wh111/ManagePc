const file = '/role';
const api = {
    allMenuTree:{//查询全部菜单树
        path:'/menu/allMenuTree',
        method:'get'
    },
    list:{//权限列表
        path: file + '/list',
        method: 'get'
    },
    get:{//查看
        path: file + '/get',
        method:'get'
    },
    add:{//新增
        path: file + '/add',
        method:'post'
    },
    modify:{   //修改
        path: file + '/modify',
        method:'put'
    },
    remove:{//删除
        path: file + '/remove',
        method:'delete'
    }
}

export default api