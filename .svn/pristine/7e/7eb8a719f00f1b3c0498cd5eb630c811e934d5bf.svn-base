<template>
  <div>
    <img width="300" height="300" class="img" v-if="goodData.icon" :src="resourceHttp + goodData.icon" alt="">
    <el-form ref="goodData" :model="goodData" label-width="120px">
      <el-form-item label="商品标题：">
        {{goodData.title}}
      </el-form-item>
      <el-form-item label="商品副标题：">
        {{goodData.subtitle}}
      </el-form-item>
      <el-form-item label="出版社：">
        {{goodData.press}}
      </el-form-item>
      <el-form-item label="商品编号：">
        {{goodData.no}}
      </el-form-item>
      <el-form-item label="价格：">
        {{goodData.originalPrice}}
      </el-form-item>
      <el-form-item label="销量：">
        {{goodData.sales}}
      </el-form-item>
      <!-- <el-form-item label="评价：">
          {{goodData.subtitle}}
      </el-form-item> -->
      <el-form-item label="规格：">
        {{goodData.spec}}
      </el-form-item>
      <!--<el-form-item>-->
      <!--<el-button size="small" type="primary" @click="show">查看评价</el-button>-->
      <!--</el-form-item>-->
      <el-form-item label="商品图片：">
        <div class="img-wrap" v-if="goodData.imgs">
          <img v-for="(item,index) in goodData.imgs" :key="index" :src="resourceHttp + item" alt="">
        </div>
        <span v-else>无商品图片</span>
      </el-form-item>
      <el-form-item label="商品介绍：">
        <el-input disabled size="small" :rows="4" type="textarea" v-model="goodData.remark"></el-input>
      </el-form-item>
      <el-form-item label="商品内容：">
        <el-input disabled size="small" :rows="4" type="textarea" v-model="goodData.content"></el-input>
      </el-form-item>
      <el-form-item label="商品目标：">
        <el-input disabled size="small" :rows="4" type="textarea" v-model="goodData.target"></el-input>
      </el-form-item>
      <el-form-item label="商品优势：">
        <el-input disabled size="small" :rows="4" type="textarea" v-model="goodData.advantage"></el-input>
      </el-form-item>
    </el-form>
    <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="120px">
      <audit-process :id="operailityData.productId"></audit-process>
      <el-form-item label="审批结果" prop="result">
        <el-radio-group v-model="formValidate.result">
          <el-radio label="Agree">通过</el-radio>
          <el-radio label="Reject">驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审批意见" prop="suggestion">
        <el-input :rows="4" type="textarea" v-model="formValidate.suggestion"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:30%">
        <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
        <el-button size="small" class="tableMakeItemCancel" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  let Util = null;
  import auditProcess from '../../goodsManagement/goodsManage/components/auditProcess.vue'
  import { audit as rules } from './rules'
  export default {
    props: ['operailityData'],
    data() {
      return {
        rules,
        goodData: {},
        loadBtn: {title: "提交", callParEvent: "listenSubEvent"},
        resourceHttp: '',
        formValidate: {
          suggestion: '',
          result: 'Agree',
          auditSeqId:this.operailityData.auditSeqId,
          auditProductId:this.operailityData.auditProductId,
          no:this.operailityData.no
        },
        auditMessTitle: {
          type: 'add',
          callback: 'close',
          successTitle: '添加成功!',
          errorTitle: '添加失败!',
          ajaxSuccess: res => this.$emit('handle', 'handle', '审核成功!'),
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: '/auditRecord/add',
            method: 'post',
          }
        },
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        Util = this.$util;
        this.resourceHttp = this.$store.getters['app/envs']('resourceHttp');
        this.ajax({
          ajaxSuccess: this.getData,
          ajaxParams: {
            url: '/product/get?id=' + this.operailityData.productId,
            method: 'get'
          }
        })
      },
      getData(res) {
        this.goodData = res.data;
        if (this.goodData.imgs) {
          this.goodData.imgs = this.goodData.imgs.split(',');
        }
      },
      cancel(targer) {
        this.$emit('cancel', 'handle')
      },
      onSubmit() {
        this.$emit('cancel', 'handle')
      },
      /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
      submitForm(formName) {
        let flag = false;
        this.$refs[formName].validate((valid) => {
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
//        this.formValidate.no = this.goodData.no;
//        this.formValidate.auditSeqId = this.goodData.auditSeqId;
//        this.formValidate.auditProductId = this.goodData.auditProductId;
        let isSubmit = this.submitForm("formValidate");
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {
          };
          isLoadingFun(true);
          this.auditMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
          console.log(this.auditMessTitle.ajaxParams.data)
          this.ajax(this.auditMessTitle, isLoadingFun)
        }
      },
      /*
      * 获取表单数据
      * @return string  格式:id=0&name=aa
      * */
      getFormData(data) {
        let myData = Util._.defaultsDeep({}, data);
        return myData;
      }
    },
    mounted() {

    },
    components: {
      auditProcess
    }
  }
</script>
<style lang="scss" scoped>
  .img {
    position: absolute;
    right: 28px;
    top: 64px;
  }

  .el-input {
    width: 60%;
  }

  .el-form-item {
    img {
      width: 100px;
    }
  }
</style>
