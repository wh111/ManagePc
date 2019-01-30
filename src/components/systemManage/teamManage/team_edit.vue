<template>
    <el-row>
        <el-form ref="formValidate" :model="formValidate" :rules="rules" label-width="110px">
            <el-form-item label="群组名称：" prop="title">
                <el-input size="small" v-model="formValidate.title"></el-input>
            </el-form-item>
            <el-form-item label="创建人：">
                {{ showData.managerName }}
            </el-form-item>
            <el-form-item label="群简介：">
                <div v-html="showData.remark"></div>
            </el-form-item>
            <el-form-item label="群成员：">
                <el-table :data="showData.userList" border style="width: 100%">
                    <el-table-column prop="name" label="姓名">
                    </el-table-column>
                    <el-table-column prop="status" label="是否实名">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="success" @click="remove(scope.row)">删除成员</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="添加成员：">
                <el-input size="small" v-model="operailityData.new" style="width:400px"></el-input>
                <el-button size="small" @click="add">确定</el-button>
            </el-form-item>
            <el-col align="center">
                <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
            </el-col>
        </el-form>
    </el-row>
</template>
<script>
    let Util = null;
    import api from './api'
    import {teamManage as rules} from '../rules'

    export default {
        props: ["operailityData"],
        data() {
            return {
                rules,
                loadBtn: {title: "保存", callParEvent: "listenSubEvent"},
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
                    id: '',
                    title: '', // 群组名称
                    removeStudentIds: '', // 删除的成员ID集合，多个逗号隔开
                    addStudentIds: '' // 添加的成员ID集合，多个逗号隔开
                }
            };
        },
        created() {
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
                            this.formValidate.title = res.data.title;
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
            /*
            * 点击提交按钮 监听是否验证通过
            * @param formName string  form表单v-model数据对象名称
            * @return flag boolean   form表单验证是否通过
            * */
            submitForm(formName) {
                let flag = false;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        flag = true;
                    }
                });
                return flag;
            },
            /*
            * 点击提交按钮 监听是否提交数据
            * @param isLoadingFun boolean  form表单验证是否通过
            * */
            listenSubEvent(isLoadingFun) {
                let isSubmit = this.submitForm("formValidate");
                if (isSubmit) {
                    if (!isLoadingFun) isLoadingFun = function () {
                    };
                    isLoadingFun(true);
                    let opt = {
                        callback: 'close',
                        errorTitle: '新增失败',
                        successTitle: '新增成功',
                        ajaxSuccess: "ajaxSuccess",
                        ajaxError: "ajaxError",
                        ajaxParams: {
                            url: api.edit.path,
                            method: api.edit.method,
                            data: this.getFormData(this.formValidate)
                        }
                    }
                    this.ajax(opt, isLoadingFun);
                }
            },
            /*
            * 获取表单数据
            * @return string  格式:id=0&name=aa
            * */
            getFormData(data) {
                let myData = Util._.defaultsDeep({}, data);
                return myData;
            },
            cancel() {
                this.$emit('confirm');
            },
            add() {
                this.$message({
                    message: "添加成功！",
                    type: "success"
                });
            }
        },
        components: {}
    };
</script>