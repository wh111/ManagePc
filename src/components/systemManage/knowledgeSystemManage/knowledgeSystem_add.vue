<template>
    <el-row>
        <el-form ref="formValidate" :model="formValidate" :rules="rules" label-width="110px">
            <el-form-item label="科目：" prop="subject">
                <el-select v-model="formValidate.subject" placeholder="请选择">
                    <el-option v-for="(item,index) in subjects" :key="index" :label="item.value"
                               :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="知识点名称：" prop="name">
                <el-input v-model="formValidate.name"></el-input>
            </el-form-item>
            <el-form-item label="知识点描述：" prop="remark">
                <el-input type="textarea" :rows="4" v-model="formValidate.remark"></el-input>
            </el-form-item>
            <el-col align="center">
                <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
              <el-button class="tableMakeItemCancel" @click="cancel">取消</el-button>
            </el-col>
        </el-form>
    </el-row>
</template>
<script>
    import {knowledgeSystemManageAdd as rules} from '../rules';
    import {subjects} from '../../../libs/subjects';
    import api from './api';

    let Util = null;
    export default {
        data() {
            return {
                rules,
                subjects,
                loadBtn: {title: "提交", callParEvent: "listenSubEvent"},
                formValidate: {
                    subject: "",
                    name: '',
                    remark: ''
                }
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                Util = this.$util;
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
                            url: api.add.path,
                            method: api.add.method,
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
            }
        }
    }
</script>
