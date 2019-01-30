<template>
  <div>
      <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="160px">
        <el-form-item label="题型名称：" prop="name">
            <el-input v-model="formValidate.name"></el-input>
        </el-form-item>
        <el-form-item label="是否为组题：" prop="groups">
            <el-radio-group v-model="formValidate.groups">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否为公用后选项：" prop="publics">
            <el-radio-group v-model="formValidate.publics">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="题型成分：" prop="childTypes">
            <el-checkbox-group v-model="formValidate.childTypes">
                <el-checkbox v-for="(type,id) in childTypes" :label="type.id" :key="type.id">{{type.name}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item style="margin-left:30%">
            <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
let Util = null;
import api from './api'
import { edit as rules } from './rules'
export default {
    data(){
        return{
            rules,
            loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
            formValidate:{
                name:'',
                groups:'',
                publics:'',
                childTypes:[]
            },
            childTypes : [],
            addMessTitle:{
                type:'add',
                callback:'close',
                successTitle:'新增成功!',
                errorTitle:'新增失败!',
                ajaxSuccess:'ajaxSuccess',
                ajaxError:'ajaxError',
                ajaxParams:{
                    url:api.add.path ,
                    method:api.add.method,
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
            this.ajax({
                ajaxSuccess: res => this.childTypes = res.data,
                ajaxParams: {
                    url: api.list.path + '?types=0',
                    method: api.list.method,
                    data:{
                        types:0
                    }
                }
            })
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
            this.formValidate.childTypes = this.formValidate.childTypes.join();
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
        }
    }
}
</script>
