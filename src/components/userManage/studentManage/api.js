const file = "/student";
const api ={
    list:{//列表
        path: file + '/list',
        method:'get'
    },
    info:{//查看详情
        path: file + '/info',
        method:'get'
    },
    get:{//根据ID查看学生详情
        path: file + '/getMyInfo',
        method:'get'
    },
    getByAccount:{//根据账号查询学生详情
        path: file + '/getByAccount',
        method:'get'
    },
    modify:{//修改
        path: file + '/modify',
        method:'put'
    },
    add:{//添加
        path: file + '/add',
        method:'post'
    },
    import:{//导入
        path: file + '/import',
        method:'get'
    },
    addVip:{//上架
        path: file + '/addVip',
        method:'post'
    },
    enable:{//解冻冻结
        path: file + '/enable',
        method:'put'
    },
    addVip:{//升为会员
        path: file + '/addVip',
        method:'post'
    }
}
export default api;
