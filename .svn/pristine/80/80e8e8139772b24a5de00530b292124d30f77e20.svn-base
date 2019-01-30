<template>
    <div>
        <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="120px">
            <el-form-item label="商品标题：" prop="title">
                <el-input size="small" v-model="formValidate.title"></el-input>
            </el-form-item>
            <el-form-item label="商品副标题：" prop="subtitle">
                <el-input size="small" v-model="formValidate.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="出版社：" prop="press">
                <el-input size="small" v-model="formValidate.press"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="types">
                <el-select size="small" v-model="formValidate.types" placeholder="请选择">
                    <product-type-option></product-type-option>
                </el-select>
                <!-- <span v-if="formValidate.type == '付费商品'"><el-input size="small" v-model="formValidate.price"></el-input>  元</span>
                <span v-else><el-input size="small" v-model="formValidate.price"></el-input>  积分</span> -->
            </el-form-item>
            <el-form-item label="商品价格" prop="originalPrice">
                <el-input v-model="formValidate.originalPrice"></el-input>
                元
            </el-form-item>
          <el-form-item label="折扣（折）" prop="discount">
                <el-input style="width: 195px" class="item" v-if="self" v-model="formValidate.discount"
                          placeholder="请输入折扣 0.0"></el-input>
                <el-select v-else size="small" v-model="formValidate.discount" placeholder="请选择">
                    <el-option label="不打折" value="10"></el-option>
                    <el-option label="1折" value="1"></el-option>
                    <el-option label="2折" value="2"></el-option>
                    <el-option label="3折" value="3"></el-option>
                    <el-option label="4折" value="4"></el-option>
                    <el-option label="5折" value="5"></el-option>
                    <el-option label="6折" value="6"></el-option>
                    <el-option label="7折" value="7"></el-option>
                    <el-option label="8折" value="8"></el-option>
                    <el-option label="9折" value="9"></el-option>
                </el-select>
                <el-button @click="self = !self">自定义</el-button>
            </el-form-item>
            <el-form-item label="商品单位：" prop="unit">
                <el-select size="small" v-model="formValidate.unit" placeholder="请选择">
                    <el-option label="套" value="0"></el-option>
                    <el-option label="份" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="阶段：" prop="stage">
                <el-select size="small" v-model="formValidate.stage" placeholder="请选择" @change="stageChange">
                    <el-option label="小学" value="0"></el-option>
                    <el-option label="初中" value="1"></el-option>
                    <el-option label="高中" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销量：" prop="sales">
                <el-input class="item" size="small" v-model="formValidate.sales"></el-input>
            </el-form-item>
            <!-- <el-form-item
                v-for="(lable, index) in formValidate.lable"
                :label="'商品标签' + (index + 1)"
                :key="lable.key"
                :prop="'lable.' + index + '.value'"
                :rules="{
                    required: true, message: '标签不能为空', trigger: 'blur'
                }"
            >
                <el-input size="small" v-model="lable.value"></el-input>
                <el-button size="small" @click.prevent="removeLable(lable)">-</el-button>
                <el-button size="small" @click="addLable">+</el-button>
            </el-form-item> -->
            <el-form-item label="试题选择：">
                <el-button size="small" type="primary" @click="choice">从试题库中选择</el-button>
                <i v-if="formValidate.papers != ''" class="el-icon-success">已选择试卷</i>
            </el-form-item>
            <!--<el-form-item label="包含章节点：">-->
            <!--<el-select @change="getknowledgeIds" v-model="knowledgeIds" filterable placeholder="请选择">-->
            <!--<el-option v-for="item in knowledgeIdArr" :key="item.id" :label="item.name"-->
            <!--:value="item"></el-option>-->
            <!--</el-select>-->
            <!--<i v-if="formValidate.papers == ''" style="color:red;">请先从题库中选择试卷！</i>-->
            <!--<i v-else>请选取1-10个重要知识点</i>-->
            <!--<br/>-->
            <!--<el-tag-->
            <!--v-for="tag in knowledgeList"-->
            <!--:key="tag.id"-->
            <!--closable-->
            <!--@close="handleClose(tag)">-->
            <!--{{tag.name}}-->
            <!--</el-tag>-->
            <!--</el-form-item>-->
            <el-form-item label="商品规格：" prop="spec">
                <el-input class="item" size="small" :disabled="true" v-model="formValidate.spec"></el-input>
                张试卷
            </el-form-item>
            <el-form-item label="商品图片：">
                <el-upload
                        :action="actionUrl"
                        list-type="picture-card"
                        :before-upload="beforeAvatarUpload"
                        show-file-list
                        :limit="4"
                        :on-success="uploadSuccess">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，图片分辨率不小于550*550且不超过2M</div>
                </el-upload>
                <el-radio style="margin-left: 48px;" v-for="(item,index) in fileList" :key="index" v-model="radio"
                          :label="item.response">设置为主图
                </el-radio>
            </el-form-item>
            <el-form-item label="商品介绍：" prop="remark">
                <el-input size="small" :rows="4" type="textarea" v-model="formValidate.remark"></el-input>
            </el-form-item>
            <el-form-item label="商品内容：" prop="content">
                <el-input size="small" :rows="4" type="textarea" v-model="formValidate.content"></el-input>
            </el-form-item>
            <el-form-item label="商品目标：" prop="target">
                <el-input size="small" :rows="4" type="textarea" v-model="formValidate.target"></el-input>
            </el-form-item>
            <el-form-item label="商品优势：" prop="advantage">
                <el-input size="small" :rows="4" type="textarea" v-model="formValidate.advantage"></el-input>
            </el-form-item>
            <p class="title">添加至：</p>
            <el-form-item label="教材：">
                <el-select @change="getTextbookVersion" size="small" v-model="textbookVersionId" filterable placeholder="请选择">
                    <el-option v-for="(item,index) in textbook" :key="item.id" :label="item.name"
                               :value="item"></el-option>
                </el-select>
                <br/>
                <el-tag
                        v-for="tag in textbookVersionList"
                        :key="tag.id"
                        closable
                        @close="handleClose(tag)">
                    {{tag.name}}
                </el-tag>
            </el-form-item>
            <el-form-item label="年级：" prop="grade">
                <el-select size="small" v-model="formValidate.grade" placeholder="" @change="changGrade">
                    <grade-option-list></grade-option-list>
                </el-select>
            </el-form-item>
            <el-form-item label="科目：">
                <!--<el-input :value="formValidate.subject | subject" placeholder="所选择科目" style="width: 195px"></el-input>-->
                <!--{{formValidate.subject | subject}}-->
                <el-select v-model="formValidate.subject" placeholder="请选择" @change="changeSubject">
                    <el-option v-for="(item,index) in subjectList" :key="index" :label="item.value"
                               :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="章节：">-->
            <!--<el-select size="small" v-model="formValidate.chapterId" placeholder="请选择">-->
            <!--<el-option v-for="item in chapterList" :key="item.id" :label="item.name"-->
            <!--:value="item.id"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item style="text-align: center">
                <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
              <el-button class="tableMakeItemCancel" size="small" @click="cancle">取消</el-button>
            </el-form-item>
        </el-form>
        <Modal
                :mask-closable="false"
                width="1100"
                v-model="addModal"
                title="添加商品"
                class-name="vertical-center-modal"
                :loading="loading">
            <modal-header slot="header" :content="addId"></modal-header>
            <test-list v-if="addModal" @cancel="close" @choice="subCallback" :papers="formValidate.papers"></test-list>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
  let Util = null
  import api from './api'
  import { add as rules } from '../integralManage/rules'
  import testList from '../test_list'
  import productTypeOption from '../../common/productTypeOption.vue'
  import gradeOptionList from '../../common/gradeOption.vue'
  //  import uploadPhotoWall from "../../common/upLoadPhotoWell.vue";

  export default {
    data () {
      return {
        rules,
        self: false,
        fileList: [],
        papersArr: [],
        radio: '',
        knowledgeIds: '',
        loading: false,
        knowledgeIdArr: [],
        knowledgeList: [],
        textbookVersionId: '',
        textbookVersionList: [],
        actionUrl: this.$util.urlPrefix + '/file/uploadImg',
        formValidate: {
          title: '',
          subtitle: '',
          press: '',
          originalPrice: '',
          discount: '',
          currentPrice: '',
          unit: '0',
          types: '100',
          sales: 0,
          stocks: '',
          textbookVersionId: '',
          stage: '0',
          subject: '',
          grade: '1',
          chapterId: '',
          papers: '',
          tags: '',
          spec: '',
          icon: '',
          imgs: '',
          remark: '',
          content: '',
          target: '',
          advantage: ''
        },
        chapterList: [],
        subjectList: [],
        loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
        textbook: [],
        addId: {
          id: 'add',
          title: '选择试卷'
        },
        addMessTitle: {
          type: 'add',
          callback: 'close',
          successTitle: '添加成功!',
          errorTitle: '添加失败!',
          ajaxSuccess: res => this.$emit('add', 'add', '添加成功!'),
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.add.path,
            method: api.add.method
          }
        }
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        Util = this.$util
        this.ajax({
          ajaxSuccess: res => (this.textbook = res.data),
          ajaxParams: {
            url: api.getTextbook.path,
            method: api.getTextbook.method
          }
        })
        this.subjectList = this.$store.getters['app/gradeMap'](1)
      },
      /*
      * 获取知识点
      * */
      getKnowledges () {
        this.ajax({
          ajaxSuccess: res => this.knowledgeIdArr = res.data,
          ajaxParams: {
            url: '/papers/queryKnowledgeList?paperIds=' + this.formValidate.papers,
            method: 'get'
          }
        })
      },
      /*
      * 知识点删除回调
      * **/
      handleClose (tag) {
        this.textbookVersionList.splice(this.textbookVersionList.indexOf(tag), 1)
      },
      /*
       * 上传前校验
       * */
      beforeAvatarUpload (file) {
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png')
        const isLt2M = file.size / 1024 / 1024 < 2
        const isLt10Kb = file.size / 1024 > 30
        if (!isJPG) {
          this.$Notice.warning({
            title: '只能上传图片',
            desc: '格式为: JPG、png 格式!'
          })
        }
        if (!isLt2M) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '上传头像图片 ' + file.name + ' 太大，不能超过 2MB!'
          })
        }
        if (!isLt10Kb) {
          this.$Notice.warning({
            title: '文件大小限制',
            desc: '上传头像图片 ' + file.name + ' 分辨率太小，不能小于550 * 550像素'
          })
        }
        return isJPG && isLt2M && isLt10Kb
      },
      /*
     * 选中教材展示
     * **/
      getTextbookVersion (val) {
        this.textbookVersionId = val.name
        if (this.textbookVersionList.indexOf(val) > 0 && this.textbookVersionList.length < 11) return
        this.textbookVersionList.push(val)
      },
      /*
      * 选中知识点展示
      * **/
      getknowledgeIds (val) {
        this.knowledgeIds = val.name
        if (this.knowledgeList.indexOf(val) < 0 && this.knowledgeList.length < 11) {
          this.knowledgeList.push(val)
        }

      },
      changeSubject (val) {
        this.formValidate.subject = val
      },
      getChapter () {
        this.ajax({
          ajaxSuccess: res => this.chapterList = res.data,
          ajaxParams: {
            url: '/textbookContent/queryChapterList',
            method: 'get',
            params: {
              textbookVersionId: this.formValidate.textbookVersionId,
              subject: this.formValidate.subject,
              grade: this.formValidate.grade,
              term: this.formValidate.term,
            }
          }
        })
//        }
      },
      /*
      * 年级改变对应获取该年级下的对应课程
      * */
      changGrade (val) {
        this.subjectList = this.$store.getters['app/gradeMap'](val)
      },
      stageChange () {
        if (this.formValidate.stage == '0') {
          this.formValidate.grade = '1'
        } else if (this.formValidate.stage == '1') {
          this.formValidate.grade = '7'
        } else {
          this.formValidate.grade = '10'
        }
      },
      choice () {
        this.addModal = true
      },
      subCallback (obj) {
        let that = this
        this.addModal = false
        this.papersArr = this.papersArr.concat(obj.ids)
        this.formValidate.grade = String(obj.grade)
        this.formValidate.subject = obj.subject
        this.formValidate.spec = obj.ids.length
//                this.formValidate.textbookVersionId = Number(obj.textbookVersionId)
        this.formValidate.papers = Util.unique(this.papersArr).join()
        this.textbook.map(item => {
          if (obj.textbookVersionId == item.id) {
            that.textbookVersionList.push(item)
          }
        })
        this.getKnowledges()
        this.getChapter()
      },
      // 图片上传
      uploadSuccess (res, file, fileList) {
        this.fileList = fileList
        this.radio = this.fileList[0].response
      },
      close (targer) {
        this[targer + 'Modal'] = false
      },
      cancle () {
        this.$emit('cancel', 'add')
      },
      /*
          * 点击提交按钮 监听是否验证通过
          * @param formName string  form表单v-model数据对象名称
          * @return flag boolean   form表单验证是否通过
          * */
      submitForm (formName) {
        let flag = false
        this.$refs[formName].validate(valid => {
          if (valid) {
            flag = true
          }
        })
        return flag
      },
      getImgs () {
        let arr = []
        this.fileList.map(function (item) {
          arr.push(item.response.data)
        })
        this.formValidate.imgs = arr.join(',')
      },
      /*
          * 点击提交按钮 监听是否提交数据
          * @param isLoadingFun boolean  form表单验证是否通过
          * */
      listenSubEvent (isLoadingFun) {
        this.getImgs()
        this.formValidate.icon = this.radio.data
        let textbookArr = []
        this.textbookVersionList.map(function (item) {
          textbookArr.push(item.id)
        })
        if (this.textbookVersionList.length == 0) {
          this.errorMess('请选择教材！')
          return false
        }
        this.formValidate.textbookVersionId = textbookArr.join()

        let isSubmit = this.submitForm('formValidate')
        if (isSubmit) {
          if (!isLoadingFun) isLoadingFun = function () {
          }
          isLoadingFun(true)
          this.formValidate.discount = this.formValidate.discount * 10;
          this.formValidate.currentPrice = Math.round(this.formValidate.originalPrice * this.formValidate.discount);
          this.formValidate.originalPrice = Math.round(this.formValidate.originalPrice * 100)
          this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate)
//                    console.log(this.addMessTitle.ajaxParams.data)
          this.ajax(this.addMessTitle, isLoadingFun)
        }
      },
      /*
          * 获取表单数据
          * @return string  格式:id=0&name=aa
          * */
      getFormData (data) {
        let myData = Util._.defaultsDeep({}, data)
        return myData
      }
    },
    components: {
//      uploadPhotoWall,
      testList,
      productTypeOption,
      gradeOptionList
    }
  }
</script>

<style lang="scss" scoped>
    .el-input {
        width: 60%;
    }
</style>
