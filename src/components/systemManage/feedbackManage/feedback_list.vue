<template>
    <div class="moudle-wrap modal clearfix" id="content" ref="content">
        <el-col>
            <el-form :inline="true" ref="searchObj" v-model="searchObj">
                <el-row class="search-from">
                  <el-form-item label="日期：" style="margin-left: 13px">
                        <date-group :dateGroup="{text:'',startDate:searchObj.startTime,endDate:searchObj.endTime}">
                            <el-date-picker name="start" v-model="searchObj.startTime" :editable="false" type="date"
                                            placeholder="选择日期" :picker-options="pickerOptions0"
                                            @change="handleStartTime"></el-date-picker>
                            <span>-</span>
                            <el-date-picker name="end" v-model="searchObj.endTime" :editable="false" type="date"
                                            placeholder="选择日期" :picker-options="pickerOptions0"
                                            @change="handleEndTime"></el-date-picker>
                        </date-group>
                    </el-form-item>
                    <el-form-item>
                      <el-input placeholder="输入反馈内容关键字查询" v-model="searchObj.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button size="small" class="search-btn" @click="searchEvent">搜索</el-button>
                    </el-form-item>
                </el-row>
              <!--<el-col style="margin-bottom:20px">-->
              <!---->
              <!--</el-col>-->
            </el-form>

            <div id="myTable" ref="myTable">
                <el-table sortable="custom" align="center" :context="self" :height="dynamicHt" :data="tableData"
                          tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="50"></el-table-column>
                  <el-table-column align="center" prop="index" label="序号" width="70px"
                                   show-overflow-tooltip></el-table-column>
                    <el-table-column prop="userName" label="反馈人" width="100px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="createTime" label="反馈时间" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | formatDate('yyyy-MM-dd') }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="content" label="反馈内容" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="240">
                        <template slot-scope="scope">
                          <el-button size="small" class="tableMakeItem" @click="show(scope.row)">查看</el-button>
                          <el-button size="small" class="tableMakeItem" @click="feedback(scope.row)"
                                       :disabled="scope.row.status!==0">反馈
                            </el-button>
                          <el-button size="small" class="tableMakeItem" @click="remove(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin: 10px 50px 10px 0;">
                  <el-button size="small" class="deleteButton" @click="remove('')">批量删除</el-button>
                    <div style="float: right;">
                        <el-pagination @size-change="changePageSize" @current-change="changePage"
                                       :current-page.sync="myPages.currentPage" :page-size="myPages.pageSize"
                                       layout="total,prev, pager, next, jumper" :total="totalCount">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </el-col>

    </div>
</template>
<script>
    import api from './api';
    import show from './feedback_show';
    import feedback from './feedback_to';

    let Util = null;
    export default {
        data() {
            return {
                deleteUrl: api.remove,
                //* 表格 *//
                self: this,
                totalCount: 0,
                loading: false,
                dynamicHt: 0, // 表格高度
                checkedPower: [],
                multipleSelection: [],
                operailityData: {},
                tableData: [],
                searchObj: {
                    startTime: '',
                    endTime: '',
                    content: '',
                    status: '',
                    userType: '',
                },
                pickerOptions0: {
                    disabledDate (time) {
                        return time.getTime() > Date.now() - 8.64e6
                    },
                },
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
                    params: {
                        curPage: 1,
                        pageSize: Util.pageInitPrams.pageSize
                    }
                }
                this.setTableData()
            },
            handleStartTime () {
                this.searchObj.startTime = new Date(this.searchObj.startTime).getTime()
                console.log(this.searchObj)
                if (this.searchObj.endTime) {
                    if (this.searchObj.startTime > this.searchObj.endTime) {
                        this.searchObj.startTime = ''
                        this.$message({
                            message: '开始时间不大于结束时间',
                            type: 'warning',
                        })
                    }
                }

            },
            handleEndTime () {
                this.searchObj.endTime = new Date(this.searchObj.endTime).getTime()
                console.log(this.searchObj)
                if (this.searchObj.startTime) {
                    if (this.searchObj.startTime > this.searchObj.endTime) {
                        this.searchObj.endTime = ''
                        this.$message({
                            message: '开始时间不大于结束时间',
                            type: 'warning',
                        })
                    }
                }
            },
            /************************** 表格 ************************/
            /*
             * 设置表格数据
             * @param isLoading Boolean 是否加载
             */
            setTableData(isLoading) {
                Object.assign(this.queryQptions.params, this.searchObj);
                let params = this.queryQptions.params;
                this.ajax({
                    ajaxSuccess: 'listDataSuccess',
                    ajaxParams: this.queryQptions
                }, isLoading)
            },
            // 数据请求成功回调
            listDataSuccess(res, m, loading) {
                this.totalCount = res.data.totalCount || 0;
                this.tableData = this.addIndex(res.data.dataList || []);
            },
            //查看
            show(item) {
                Util.dialog({
                    title: '查看反馈',
                    width: '800px',
                    content: {id: 'showId', title: '查看反馈'},
                    component: show,
                    data: {operailityData: item},
                    close: () => {
                    },
                    confirm: (result) => {
                    }
                })
            },
            //反馈
            feedback(item) {
                Util.dialog({
                    title: '反馈回复',
                    width: '800px',
                    content: {id: 'feedbackId', title: '反馈回复'},
                    component: feedback,
                    data: {operailityData: item},
                    close: () => {
                    },
                    confirm: (result) => {
                    }
                })
            },

          //搜索查询
          searchEvent() {
              this.setTableData()
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
            //批量删除
            remove(item) {
                if (!(item || this.isSelected())) {
                    return false
                }
                Util.todoConfirm({
                    title: '确定删除用户反馈吗？',
                    content: {id: 'todoId', title: '删除用户反馈'},
                    data: {
                        data: {ids: Util.getStrByArr(item ? [item] : this.multipleSelection, 'id')},
                        api: api.remove,
                        msg: '删除'
                    },
                    close: () => {//关闭后触发
                        this.subCallback()
                    },
                    confirm: (result) => {
                    }
                })
            },
            /*
             * checkbox 选择后触发事件
             * @param val Array 存在所有的选择每一个行数据
             */
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //设置表格及分页的位置
            setTableDynHeight() {
                let content = this.$refs.content;
                let parHt = content.parentNode.offsetHeight;
                let myTable = this.$refs.myTable;
                let paginationHt = 102;
                this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
                // this.$refs.myTable.style.height = this.dynamicHt + 'px';
                // this.$refs.menu.style.height = myTable.parentNode.offsetHeight + 'px';
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
                target && this.cancel(target);
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
            /*
            * 列表数据只能选择一个
            * @param isOnly true  是否只选择一个
            */
            isSelected(isOnly) {
                let len = this.multipleSelection.length;
                let flag = true;
                if (len == 0) {
                    this.showMess("请选择数据!");
                    flag = false;
                }
                if (len > 1 && isOnly) {
                    this.showMess("只能选择一条数据!")
                    flag = false;
                }
                return flag;
            }
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
            show,
            feedback
        }
    }

</script>

<!--<style lang="scss">-->
<!--.sff_tip {-->
<!--margin-left: 20px;-->
<!--i {-->
<!--background: #e0b9b6;-->
<!--border-radius: 50%;-->
<!--display: inline-block;-->
<!--width: 18px;-->
<!--height: 18px;-->
<!--color: #000000;-->
<!--text-align: center;-->
<!--font-weight: 600;-->
<!--margin-right: 5px;-->
<!--}-->
<!--}-->
<!--</style>-->
