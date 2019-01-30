const file = "/product";
const api ={
    list:{//列表
        path: file + '/list',
        method:'get'
    },
    get:{//查看
        path: file + '/get',
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
    up:{//上架
        path: file + '/up?ids=',
        method:'put'
    },
    down:{//下架
        path: file + '/down?ids=',
        method:'put'
    },
    getTextbook:{
        path:'/textbook/version/all',
        method:'get'
    },
    statistics:{//评论统计
      path:'/comment/statistics',
      method:'get'
    },
    commentList:{//商品评论列表
      path:'/comment/list',
      method:'get'
    },
    audit:{//审核通过商品评论
      path:'/comment/audit',
      method:'put'
    },
    remove:{//删除评论
      path:'/comment/remove',
      method:'delete'
    }
}
export default api;
