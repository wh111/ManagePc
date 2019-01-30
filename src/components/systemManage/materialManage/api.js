const file = '/textbook';
const api = {
    add:{//添加教材内容
        path: file + '/add',
        method:'post'
    },
    list:{//列表
      path: file + '/list',
      method:'get'
    },
    get:{//查看
        path:file +'/get?id=',
        method:'get'
    },
    modify:{//修改
        path:file + '/modify',
        method:'put'
    },
    remove:{//删除
        path:file + '/remove',
        method:'delete'
    },
    versionRemove:{//删除教材版本
        path:file + '/version/remove',
        method:'delete'
    },
    queryKnowledgeList:{//根据教材信息查询知识点
        path: '/textbookContent/queryKnowledgeList',
        method:'get'
    },
    queryChapterList:{//根据教材信息查询章节
        path:'/textbookContent/queryChapterList',
        method:'get'
    },
    textbookContent:{//树形结构
        path:'/textbookContent/tree',
        method:'get'
    },
    versionall:{//全部教材版本
        path: file +'/version/all',
        method:'get'
    },
    versionadd:{//添加教材版本
        path:file +'/version/add',
        method:'post'
    }
}
export default api
