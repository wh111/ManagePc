<!--
****--@file     getTeacherReply
****--@date     2018/1/5 11:45
****--@author   wh
****--@describe   解答详情模态框
-->
<template>
    <div>
        <div id="myTable" ref="myTable">
            <el-table align="center" :context="self" :data="tableData" tooltip-effect="dark"
                      style="width: 100%">
                <el-table-column label="提问人" align="center" prop="questionerName" width="120"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="问题" align="center" prop="title" width="120"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="提问时间" align="center" prop="createTime" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.createTime | formatDate('yyyy-MM-dd HH:mm')}}
                    </template>
                </el-table-column>
                <el-table-column label="解答时间" align="center" prop="replyTime" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.replyTime | formatDate('yyyy-MM-dd HH:mm')}}
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" prop="isAdopt" show-overflow-tooltip></el-table-column>
                <el-table-column label="解答数" align="center" prop="replyNum" show-overflow-tooltip></el-table-column>
                <el-table-column label="采纳数" align="center" prop="adoptNum" show-overflow-tooltip></el-table-column>
            </el-table>
            <div style="margin: 10px 50px 10px 0;">
                <div style="float: right;">
                    <el-pagination
                      @size-change="changePageSize2"
                      @current-change="changePage2"
                      :current-page.sync="myPages2.currentPage"
                      :page-size="myPages2.pageSize"
                      layout="total,prev, pager, next, jumper"
                      :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    import api from './api'

    let Util = null
    export default {
        props: ['id'],
        data() {
            return {
                myPages2: {},
                self: '',
                dynamicHt: 400,
                tableData: [],
                totalCount: 0,
                formValidate: {
                    teacherId: this.id
                },

            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util
                this.myPages2 = Util._.defaultsDeep({}, Util.pageInitPrams)
                this.myPages2.currentPage = 1
                console.log(1)

                this.myPages = Util.pageInitPrams
                this.queryQptions = {
                    url: api.getByTeacher.path,
                    params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize}
                }
                this.setTableData()
            },
            changePageSize2 (n) {
//            let pageSize = this.queryQptions.params && (this.queryQptions.params.pageSize = n) || (this.queryQptions.pageSize = n)
//            pageSize = n
            },
            changePage2 (n) {
                console.log(n, 169)
                this.queryQptions.params.curPage = n
                this.setTableData()
            },
            setTableData(isLoading) {
                this.queryQptions.params = Object.assign(this.queryQptions.params, this.formValidate)
                this.ajax({
                    ajaxSuccess: 'listDataSuccess',
                    ajaxParams: this.queryQptions
                }, isLoading)
                console.log(0)
            },
            listDataSuccess(res, m, loading) {
                this.totalCount = res.data.totalCount || 0,
                    this.tableData = this.addIndex(res.data.dataList || [])
                this.tableData.map(function (item) {
                    if (item.isAdopt == '0') {
                        item.isAdopt = '未解答'
                    } else if (item.isAdopt == '1') {
                        item.isAdopt = '已解答'
                    }
                    return item
                })
            }
        },
        created() {
            this.init()
        },
        mounted() {
            this.init()
            console.log(123)
        },
        components: {}
    }

</script>
<style lang="scss">

</style>