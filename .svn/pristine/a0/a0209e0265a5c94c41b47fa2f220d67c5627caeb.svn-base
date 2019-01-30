<template>
    <div>
        <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="160px">
            <el-form-item label="教材版本名称：" prop="name">
                <el-input v-model="formValidate.name" ></el-input>
            </el-form-item>
            <el-form-item style="margin-left:30%">
                <!-- <el-button size="small" type="primary" @click="save">确定</el-button> -->
                <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
              <el-button class="tableMakeItemCancel" size="small" type="info" @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
let Util = null;
import api from './api'

import { versionAdd as rules} from './rules'
export default {
    data(){
        return{
            rules,
            loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
            formValidate:{
                name:''
            },
            addMessTitle:{
                type:'addVersion',
                successTitle:'新增成功!',
                errorTitle:'新增失败!',
                ajaxSuccess:'ajaxSuccess',
                ajaxError:'ajaxError',
                ajaxParams:{
                    url:api.versionadd.path ,
                    method:api.versionadd.method,
                    data:{}
                }
            },
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            Util = this.$util;
        },
        /*
        * 点击提交按钮 监听是否验证通过
        * @param formName string  form表单v-model数据对象名称
        * @return flag boolean   form表单验证是否通过
        * */
        submitForm(formName){
            let flag = false;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                flag= true;
            }
            });
            return flag;
        },
        /*
        * 点击提交按钮 监听是否提交数据
        * @param isLoadingFun boolean  form表单验证是否通过
        * */
        listenSubEvent(isLoadingFun){
            let isSubmit = this.submitForm("formValidate");
            if(isSubmit){
            if(!isLoadingFun) isLoadingFun=function(){};
            isLoadingFun(true);
            this.addMessTitle.ajaxParams.data=this.getFormData(this.formValidate);
            this.ajax(this.addMessTitle,isLoadingFun)
            }
        },
        /*
        * 获取表单数据
        * @return string  格式:id=0&name=aa
        * */
        getFormData(data){
            let myData = Util._.defaultsDeep({},data);
            return myData;
        },
        cancel(){
            this.$emit('confirm')
        }
    }
}
</script>

