<template>
  <div>
        <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="80px">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="formValidate.name"></el-input>
            </el-form-item>
            <el-form-item label="用户权限" prop="name">
                <el-tree style="height:240px;overflow-y:scroll" :ref="menuTree" :data="menuTree" default-expand-all show-checkbox node-key="id" :default-checked-keys="keys" :props="defaultProps" @check-change="getCurrentNode"></el-tree>
            </el-form-item>
          <el-form-item label="描述" prop="remark">
                 <el-input :rows="4" type="textarea" v-model="formValidate.remark"></el-input>
            </el-form-item>
            <el-form-item align="center">
                <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
                <!-- <el-button size="small" type="primary" @click="onSave">确定修改</el-button>                 -->
              <el-button size="small" class="tableMakeItemCancel" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>
<script>
let Util = null;
import api from './api'
import { add as rules } from './rules'
export default {
    props:{
        value:Object
    },
    data(){
        return{
            rules,
            allId:'',
            loadBtn:{title:'提交',callParEvent:'listenSubEvent'},
            formValidate:{
            },
            menuTree:[],
            menuIds:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            keys:[],
            editMessTitle:{
                type:'edit',
                callback:'close',
                successTitle:'修改成功!',
                errorTitle:'修改失败!',
                ajaxSuccess:'ajaxSuccess',
                ajaxError:'ajaxError',
                ajaxParams:{
                    url:api.modify.path ,
                    method:api.modify.method,
                }
            },
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){//初始化函数
            Util = this.$util;
            this.ajax({
                ajaxSuccess: this.getAjaxSuccess,
                ajaxParams: {
                    url: api.get.path + '?id='+this.value.dialogData.id,
                    method: api.get.method
                }
            })
        },
        getAjaxSuccess(res){
            this.formValidate = {
                name:res.data.name,
                remark:res.data.remark,
                menuIds:'',
                id:res.data.id
            };
            this.allId = res.data.menuTree[0].id+ ',';
            this.menuTree = res.data.menuTree.splice(1);
            let that = this;
            this.menuTree.forEach(function(item){
                if(item.checked == true && item.children == null){
                    that.keys.push(item.id)
                    if(that.menuIds.indexOf(item.id)<0){
                      that.menuIds.push(item.id)
                    }
                }
                if(item.children != null){
                    item.children.forEach(function(child){
                        if(child.checked == true){
                            that.keys.push(child.id)
                            if(that.menuIds.indexOf(item.id)<0){
                              that.menuIds.push(item.id)
                            }
                            if(that.menuIds.indexOf(child.id)<0){
                              that.menuIds.push(child.id)
                            }
                        }
                    })
                }
            })
        },
        getCurrentNode(data) {
            this.menuIds.push(data.id);
        },
        //去除menuIds中出现成对出现的数据
        getmenyIds(arr){
            let a = [],sum = 1;
            let b = arr.sort();
            for(var i = 0; i < b.length; i++){
                if(b[i] !== b[i+1]){
                    if(sum % 2 === 1){
                        a.push(b[i])
                    }
                    sum = 1;
                }else{
                    sum ++
                }
            }
            return a
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
            this.formValidate.menuIds = this.allId + this.getmenyIds(this.menuIds).join();
            if(this.formValidate.menuIds == '-1,'){
                this.errorMess('请选择用户权限!')
                isLoadingFun(false);
                return false
            };
            this.editMessTitle.ajaxParams.data=this.getFormData(this.formValidate);
            this.ajax(this.editMessTitle,isLoadingFun)
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
        },
    }
}
</script>
