<template>
    <div class="moudle-wrap modal clearfix" id="content" ref="content">
        <h2 style="margin:10px 0;">积分明细</h2>
        <el-form :rules="rules" ref="searchObj" :model="searchObj" class="search-from" :inline="true">
          <el-form-item label="用户昵称：" prop="nickname" style="margin-left: 13px">
                <el-input size="small" v-model="searchObj.nickname" placeholder="输入用户昵称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" class="search-btn" @click="searchEvent">搜索</el-button>
            </el-form-item>
        </el-form>
        <div id="myTable" ref="myTable">
            <el-table align="center" :context="self" :height="dynamicHt" :data="tableData" tooltip-effect="dark"
                      style="width: 100%">
              <el-table-column prop="index" label="序号" width="70px" align="center"
                               show-overflow-tooltip></el-table-column>
                <el-table-column label="昵称" prop="nickname" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.nickname || '-' }}
                    </template>
                </el-table-column>
                <el-table-column label="当前积分" align="center" prop="integral" show-overflow-tooltip></el-table-column>
                <el-table-column label="消费积分" align="center" prop="spend" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button size="small" class="tableMakeItem" @click="show(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 10px 50px 10px 0;">
                <div style="float: right;">
                    <el-pagination
                            @size-change="changePageSize"
                            @current-change="changePage"
                            :current-page.sync="myPages.currentPage"
                            :page-size="myPages.pageSize"
                            layout="total,prev, pager, next, jumper"
                            :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from './api';
    import {list as rules} from './rules';
    import show from './integral_detail'

    let Util = null;
    export default {
        data() {
            return {
                rules,
                //* 表格 *//
                self: this,
                totalCount: 0,
                // loading: false,
                dynamicHt: 0, // 表格高度
                operailityData: {},
                tableData: [],
                searchObj:{
                    userName:''
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            //初始化函数
            init() {
                Util = this.$util;
                this.myPages = Util.pageInitPrams;
                this.queryQptions = {
                    url: api.list.path,
                    params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize}
                }
                this.setTableData()
            },
            /*
            * 设置表格数据
            * @param isLoading Boolean 是否加载
            */
            setTableData(isLoading) {
                Object.assign(this.queryQptions.params, this.searchObj);
                this.ajax({
                    ajaxSuccess: 'listDataSuccess',
                    ajaxParams: this.queryQptions
                }, isLoading)
            },
            // 数据请求成功回调
            listDataSuccess(res, m, loading) {
                this.totalCount = res.data.totalCount || 0;
              this.tableData = this.addIndex(res.data.dataList || [])
            },
            //设置表格及分页的位置
            setTableDynHeight() {
                let content = this.$refs.content.parentNode.parentNode.offsetHeight;
                let myTable = this.$refs.myTable.offsetTop;
                let paginationHt = 130;
                this.dynamicHt = content - myTable - paginationHt;
            },
            /*
            * 监听子组件通讯的方法
            * 作用:根据不同的参数关闭对应的模态
            * @param targer string example:"add"、"edit"
            * */
            cancel(targer) {
                this[targer + 'Modal'] = false;
            },
            /*
            * 监听子组件通讯的方法
            * 作用:ajax请求成功回调,该监听方法在libs/util 中的混合模式下定义回调
            * @param targer string example:"add"、"edit"
            * @param targer string 提示返回的ajax回调返回的信息改信息在对应的子组件中定义
            * 例如:errorTitle、errorTitle
            *addMessTitle:{
            *    type:'add',
            *    successTitle:'添加成功!',
            *    errorTitle:'添加失败!',
            *    ajaxSuccess:'ajaxSuccess',
            *    ajaxError:'ajaxError',
            *    ajaxParams:{
            *      url:'/role/add',
            *      method:'post'
            *    }
            *    }
            * @param udata boolean 默认false  是否不需要刷新当前表格数据
            * */
            subCallback(target, title, updata) {
                this.cancel(target);
                if (title) {
                    this.successMess(title);
                }
                if (!updata) {
                    this.setTableData();
                }
            },
            /*
            * 打开指定的模态窗体
            * @param options string 当前指定的模态:"add"、"edit"
            * */
            openModel(options) {
                this[options + 'Modal'] = true;
            },
            //查看详情
            show(item) {
                Util.dialog({
                    title: '查看积分详情',
                    width: '1000px',
                    content: {id: 'showId', title: '查看积分详情'},
                    component: show,
                    data: {operailityData: item},
                    close: () => {
                    },
                    confirm: (result) => {
                    }
                })
            },
          //搜索查询
          searchEvent() {
            let isSubmit = this.handleSubmit('searchObj');
            if (isSubmit) {
              this.setTableData()
            }
          },
          /*
         * 列表查询方法
         * @param string 查询from的id
         * */
          handleSubmit(name) {
            let flag = false
            this.$refs[name].validate((valid) => {
              if (valid) {
                flag = true;
              } else {
                this.errorMess('表单验证失败!');
              }
            })
            return flag
          },
        },
        mounted() {
            //页面dom稳定后调用
            this.$nextTick(function () {
                //初始表格高度及分页位置
                this.setTableDynHeight();
                //为窗体绑定改变大小事件
                let Event = Util.events;
                Event.addHandler(window, "resize", this.setTableDynHeight);
            })
        },
        components: {
            show
        }
    }
</script>
