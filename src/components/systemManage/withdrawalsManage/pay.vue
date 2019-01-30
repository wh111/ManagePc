<template>
  <div>
      <el-form ref="operailityData" v-model="operailityData" class="demo-ruleForm" label-width="140px">
        <el-form-item label="收款人姓名：">
            {{operailityData.tipPerson}}
        </el-form-item>
        <el-form-item label="手机号：">
            18699666092
        </el-form-item>
        <el-form-item label="体现方式：">
            银行卡
        </el-form-item>
        <el-form-item label="认证姓名：">
            {{operailityData.name}}
        </el-form-item>
        <el-form-item label="账号：">
            {{operailityData.tipNumber}}
        </el-form-item>
        <el-form-item label="提现金额：">
            ¥ {{operailityData.num}}
        </el-form-item>
        <el-form-item style="margin-left:30%">
          <el-button class="search-btn" @click="submit">确定</el-button>
          <el-button class="tableMakeItemCancel" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
let Util = null;
export default {
    props:['operailityData'],
    data(){
        return{

        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            Util = this.$util;
        },
        submit(){
            this.$emit('cancel','pay');
        },
        cancel(){
            this.$emit('cancel','pay');
        }
    }
}
</script>
