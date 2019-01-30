<template>
    <div class="cggg-content">
        <img v-if="formValidate.icon" :src=" resourceHttp + formValidate.icon" alt="" width="260" height="300">
        <el-form ref="formValidate" :model="formValidate" label-width="120px">
            <el-form-item label="商品标题：">
                {{formValidate.title}}
            </el-form-item>
            <el-form-item label="商品副标题：">
                {{formValidate.subtitle}}
            </el-form-item>
            <el-form-item label="出版社：">
                {{formValidate.press}}
            </el-form-item>
            <el-form-item label="商品编号：">
                {{formValidate.no}}
            </el-form-item>
            <el-form-item label="价格：">
                {{formValidate.currentPrice}}
            </el-form-item>
            <el-form-item label="销量：">
                {{formValidate.sales}}套
            </el-form-item>
            <!--<el-form-item label="评价：">-->
            <!--{{formValidate.subtitle}}-->
            <!--</el-form-item>-->
            <el-form-item label="规格：">
                {{formValidate.spec}}
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                border
                height="200"
                show-summary
                style="width: 100%; margin-top: 20px">
            <el-table-column
                    prop="name"
                    label="评价">
            </el-table-column>
            <el-table-column
                    prop="lastWeek"
                    label="最近一周"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="lastMonth"
                    label="最近一月">
            </el-table-column>
            <el-table-column
                    prop="lastSixMonth"
                    label="最近6个月">
            </el-table-column>
            <el-table-column
                    prop="sixMonthAgo"
                    label="六个月之前">
            </el-table-column>
        </el-table>
        <p class="table-title">商品评论列表</p>
        <el-table
                :data="CommentData"
                style="width: 100%">
            <el-table-column
                    prop="createTime"
                    label="日期"
                    width="180">
                <template slot-scope="scope">
                    {{scope.row.createTime | formatDate('yyyy-MM-dd HH:mm') }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="result"
                    label="评价结果"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    {{ scope.row.comment }}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="210">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    let Util = null
    import api from './api'

    export default {
        props: ['operailityData'],
        data() {
            return {
                resourceHttp: '',
                formValidate: this.operailityData,
                tableData: [],
                CommentData: []
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Util = this.$util;
                this.resourceHttp = this.$store.getters['app/envs']('resourceHttp');
                this.tableData = [];
                this.ajax({
                    ajaxSuccess: this.getStatisticsList,
                    ajaxParams: {
                        url: api.statistics.path + '?types=1&productId=' + this.operailityData.id,
                        method: api.statistics.method
                    }
                })
                this.ajax({
                    ajaxSuccess: this.getCommentList,
                    ajaxParams: {
                        url: api.commentList.path + '?types=1&productId=' + this.operailityData.id,
                        method: api.commentList.method
                    }
                })
            },
            getStatisticsList(res) {
                if(res.data instanceof Object) {
                    console.log(res.data)
                    this.tableData.push(res.data.positive)
                    this.tableData[0].name = '好评';
                    this.tableData.push(res.data.moderate)
                    this.tableData[1].name = '中评';
                    this.tableData.push(res.data.negative)
                    this.tableData[2].name = '差评';
                    console.log(this.tableData)
                }
            },
            getCommentList(res) {
                this.CommentData = res.data.dataList
            },
            pass(item) {
                Util.todoConfirm({
                    title: '确定通过该评论吗？',
                    content: {id: 'todoId', title: '通过'},
                    data: {
                        data: {id: Util.getStrByArr([item], 'id'), types: '0'},
                        api: api.audit,
                        msg: '通过'
                    },
                    close: () => {//关闭后触发
                        this.init()
                    },
                    confirm: (result) => {
                    }
                })
            },
            remove(item) {
                Util.todoConfirm({
                    title: '确定删除该评论吗？',
                    content: {id: 'todoId', title: '删除'},
                    data: {
                        data: {id: Util.getStrByArr([item], 'id'), types: '1'},
                        api: api.remove,
                        msg: '删除'
                    },
                    close: () => {//关闭后触发
                        this.init()
                    },
                    confirm: (result) => {
                    }
                })
            }
        },
    }
</script>
<style lang="scss">
    .cggg-content {
        .table-title {
            text-align: center;
            line-height: 40px;
            font-size: 20px;
            margin-top: 20px;
        }
        img {
            position: absolute;
            right: 28px;
            top: 64px;
        }
    }

</style>
