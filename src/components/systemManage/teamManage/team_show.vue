<template>
    <el-row>
        <el-form label-width="110px">
            <el-form-item label="群组名称：" prop="title">
                {{ showData.title }}
            </el-form-item>
            <el-form-item label="创建人：">
                {{ showData.managerName }}
            </el-form-item>
            <el-form-item label="群简介：">
                <div v-html="showData.remark"></div>
            </el-form-item>
            <el-form-item label="群成员：">
                <el-table :data="showData.userList" border style="width: 100%" maxHeight="400">
                    <el-table-column prop="name" label="姓名">
                    </el-table-column>
                    <el-table-column prop="realStatus" label="是否实名">
                        <template slot-scope="scope">
                            {{ (scope.row.realStatus || 0) | status }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.realStatus">
                                已实名
                            </span>
                            <el-button v-else size="small" type="success" @click="realTip(scope.row.id)">提醒实名
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
    </el-row>
</template>
<script>
    let Util = null;
    import api from './api';

    export default {
        props: ["operailityData"],
        data() {
            return {
                showData: {
                    "id": '',//ID,
                    "no": '',// 群号
                    "title": '',// 群名称
                    "remark": '',// 备注、简介
                    "counts": '',// 总人数
                    "managerId": '',// 创建人ID、管理员ID
                    "managerName": '',// 创建人姓名、管理员姓名
                    "createTime": '',// 创建时间 时间戳
                    "updateTime": '',// 修改时间 时间戳
                    "userList": []// 群成员对象集合
                },
                formValidate: {
                    id: ""
                }
            };
        },
        created() {
            console.log(this.operailityData)
            this.init();
        },
        methods: {
            init() {
                Util = this.$util;
                this.getShowData()
            },
            getShowData() {
                let opt = {
                    ajaxSuccess: res => {
                        if (res.data instanceof Object) {
                            this.showData = res.data;
                            this.formValidate.id = res.data.id;
                        }
                    },
                    ajaxError: () => this.errorMess('获取数据失败，请重试'),
                    ajaxParams: {
                        url: api.get.path,
                        method: api.get.method,
                        params: {
                            id: this.operailityData.id
                        }
                    }
                };
                this.ajax(opt)
            },
            //提醒实名
            realTip(id) {
                let opt = {
                    ajaxSuccess: res => {
                        this.successMess('发送成功')
                    },
                    ajaxError: () => this.errorMess('获取数据失败，请重试'),
                    ajaxParams: {
                        url: api.trueName.path,
                        method: api.trueName.method,
                        data: {
                            studentId: id
                        }
                    }
                };
                this.ajax(opt)
            }
        },
        components: {}
    };
</script>

