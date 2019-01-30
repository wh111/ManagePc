<template>
    <div class="iid_content">
        <!--审核信息-->
        <el-row>
            <el-col class="lose-margin2" style="text-align: center;margin-top:20px">
                <span class="table-headline ">积分明细</span>
            </el-col>
        </el-row>
        <el-table :data="showData" border style="width: 100%" :maxHeight="dynamicHt">
            <el-table-column prop="times" label="日期" align="center">
                <template slot-scope="scope">
                    {{ scope.row.times | formatDate('yyyy-MM-dd') }}
                </template>
            </el-table-column>
            <el-table-column prop="points" label="积分纪录" align="center">
                <template slot-scope="scope">
                    {{ scope.row.types ? '+' : '-' }}{{ scope.row.points }}
                </template>
            </el-table-column>
            <el-table-column prop="integral" label="余额" align="center"></el-table-column>
            <el-table-column prop="remark" label="途径"></el-table-column>
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
</template>
<script>
    import api from './api';

    let Util = null;
    export default {
        props: ['value'],
        data() {
            return {
                self: this,
                totalCount: 0,
                // loading: false,
                dynamicHt: 400, // 表格高度
                showData: []
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Util = this.$util;
                this.myPages = Util.pageInitPrams;
                this.queryQptions = {
                    url: api.get.path,
                    params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize, userId: this.value.operailityData.id}
                }
                this.setTableData()
            },
            /*
            * 设置表格数据
            * @param isLoading Boolean 是否加载
            */
            setTableData(isLoading) {
                this.ajax({
                    ajaxSuccess: 'listDataSuccess',
                    ajaxParams: this.queryQptions
                }, isLoading)
            },
            // 数据请求成功回调
            listDataSuccess(res, m, loading) {
                this.totalCount = res.data.totalCount || 0;
                if (res.data.dataList instanceof Array) {
                    this.showData = res.data.dataList;
                }
            }
        }
    }

</script>
<style lang="scss">
    .iid_content {
        position: relative;
        padding-bottom: 30px;
        .el-form {
            width: 500px;
        }
        .head-box {
            width: 170px;
            height: 190px;
            position: absolute;
            right: 100px;
            top: 0px;
        }
    }

</style>
