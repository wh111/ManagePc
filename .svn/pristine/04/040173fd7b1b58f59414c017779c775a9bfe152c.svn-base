<template>
  <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input disabled v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="用户权限">
                <el-tree style="height:240px;overflow-y:scroll" :ref="form.menuTree" :data="form.menuTree" default-expand-all show-checkbox node-key="id" :default-checked-keys="keys" :props="defaultProps"></el-tree>
            </el-form-item>
          <el-form-item label="描述">
                 <el-input :rows="4" type="textarea" v-model="form.remark" disabled></el-input>
            </el-form-item>
            <el-form-item align="center">
                <el-button size="small" type="info" @click="cancel">关闭</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>
<script>
let Util = null;
import api from './api'
export default {
    props:{
        value:Object
    },
    data(){
        return{
            checked: false,
            isIndeterminate: true,
            form:{
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            keys:[]
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){//初始化函数
            Util = this.$util;
            this.ajax({
                ajaxSuccess: this.ajaxSuccess,
                ajaxParams: {
                    url: api.get.path + '?id='+this.value.dialogData.id,
                    method: api.get.method
                }
            })
        },
        ajaxSuccess(res){
            this.form = res.data;
            let that = this;
            this.form.menuTree = this.form.menuTree.splice(1);
            this.form.menuTree.forEach(function(item){
                item.disabled = true;
                if(item.checked == true){
                    that.keys.push(item.id)
                }
                if(item.children != null){
                    item.children.forEach(function(child){
                        child.disabled = true;
                        if(child.checked == true){
                            that.keys.push(child.id)
                        }
                    })
                }
            })
        },
        cancel(){
            this.$emit('confirm')
        }
    }
}
</script>
