<!--
****--@file     testPaperManagement_edit
****--@date     2017/12/5 9:12
****--@author   YC
****--@describe 试卷编辑
-->
<template>
    <div class="paperView edit">
        <!-- 试卷顶部 -->
        <el-row class="paperHeader">
            <el-form :inline="true" :model="info" ref="info" :rules="rules">
                <el-col align="center" class="paperTitle" style="line-height: normal">
                    <el-form-item label="试卷名称：" prop="name">
                        <el-input v-model="info.name" align="center" style="width: 300px"></el-input>
                    </el-form-item>
                    <!--<b>{{ info.name }}</b>-->
                </el-col>
                <el-col :span="16">
                    <el-form-item label="试卷总分：">{{ info.score }}分</el-form-item>
                    <el-form-item label="答题时间：">{{ info.times / 60 }}分钟</el-form-item>
                    <el-form-item label="试卷题数：">{{ info.questionsLen }}题</el-form-item>
                </el-col>
                <el-col :span="8" align="right">
                    <el-form-item label=" 出卷时间：">{{(info.createTime || new Date()) | formatDate('yyyy-MM-dd HH:mm')}}
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
        <!-- 试卷结构 -->
        <div class="paperBody">
            <div>
                <template v-for="questionsTypeId in info.questionsListShowOrder">
                    <el-row class="paperQuestionType">
                        <el-col :span="12">
                            <h3 :key="questionsTypeId" class="questionTypeText">
                                {{ questionType[questionsTypeId] }}
                            </h3>
                        </el-col>
                        <el-col :span="12" align="right">
                            <el-button icon="el-icon-plus" @click="addQueToPaper(questionsTypeId)">添加题目</el-button>
                        </el-col>
                    </el-row>

                    <template v-for="(cItem,index) in info.questionsList[questionsTypeId]">
                        <question-show :key="index" :index="index+1"
                                       :showData="cItem" :class="'questionItem' + index" :has-do="200"
                                       :show-score="true"
                                       :show-answer="true">
                            <template slot="todoBox">
                                <el-button-group>
                                    <el-button type="success" size="small"
                                               @click="moveIndex(questionsTypeId,index,'up')"
                                               :disabled="index==0">
                                        ↑
                                    </el-button>
                                    <el-button type="success" size="small"
                                               @click="moveIndex(questionsTypeId,index,'down')"
                                               :disabled="index==info.questionsList[questionsTypeId].length-1">↓
                                    </el-button>
                                </el-button-group>
                                <el-select v-model="todoType[cItem.id]" placeholder="管理试题" class="todoTypeBox"
                                           @change="changeTodoType">
                                    <template v-for="(oItem,oIndex) in todoTypeOptions">
                                        <!-- 组题题型不允许替换 -->
                                        <el-option v-if="!cItem.groups || cItem.groups && oItem.value!='change'"
                                                   :disabled="info.questionsList[questionsTypeId].length < 2 && oItem.value === 'delete'"
                                                   :key="oIndex" :label="oItem.label"
                                                   :value="oItem.value+'_'+questionsTypeId+'_'+index+'_'+cItem.id"></el-option>
                                    </template>
                                </el-select>
                            </template>
                        </question-show>
                    </template>

                </template>
            </div>
        </div>
        <el-row>
            <el-col align="center" class="btnBox">
                <load-btn @reloadPaper="reloadPaper" :btnData="reloadPaperBtn" v-show="editType=='add'"></load-btn>
                <load-btn @listenSubEvent="listenSubEvent" :btnData="saveBtn"></load-btn>
            </el-col>
        </el-row>

        <!-- 模态框 增加（add） -->
        <Modal :mask-closable="false" v-model="addModal" height="200" title="对话框标题" class-name="vertical-center-modal"
               :width="1100">
            <modal-header slot="header" :content="contentHeader.addId"></modal-header>
            <add-que-to-paper v-if="addModal" @cancel="cancel" @add="addCall"
                              :selectItems="headerSelectObj" :btnText="btnText" :selectedIds="selectedIds"
                              :questionsTypeId="todoQuestionsTypeId"></add-que-to-paper>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<style lang="scss">
    @import "../../../assets/ambuf/css/paper/view";
</style>
<script>
  /*当前组件必要引入*/
  import api from './api'
  import questionShow from '../../common/questionShow/show'
  import { testPaperManagementEdit as rules } from '../rules'

  import addQueToPaper from './components/addQueToPaper'

  //当前组件引入全局的util
  let Util = null
  export default {
    props: ['operailityData'],
    data () {
      return {
        rules,
        info: {},
        selectedIds: [],
        questionType: {}, // 题型
        questionTypeIndex: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
        // 选择题、判断题、填空题、问答题
        saveBtn: {title: '保存', callParEvent: 'listenSubEvent', type: 'success'},
        reloadPaperBtn: {title: '换一批', callParEvent: 'reloadPaper', type: 'info'},

        headerSelectObj: { // 当前试题的配置信息
          textbookVersion: '', // 教材
          grade: '', // 年级
          term: '', // 学期
          subject: '', // 科目
          chapter: '' // 章节
        },

        contentHeader: {
          addId: {id: 'addId', title: '选择试题'}
        },

        todoType: {}, // 操作类型
        todoQuestionsTypeId: '', // 操作试题类型id
        todoQuestionsObj: {id: '', index: ''}, // 操作试题索引
        todoTypeOptions: [{label: '删除试题', value: 'delete'}, {label: '替换试题', value: 'change'}],

        btnText: '添加',

        queTodoType: 'add', // 添加试题add|替换试题change
        editType: 'add',

        scoreConf: null, // 计分方式
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        if (this.operailityData) {
          // 获取数据初始化
          this.$store.commit('papers/init')
          this.editType = 'edit'
          this.getShowData()
        } else {
          this.initInfo()
        }
      },
      initInfo () {
        // 获取题型
        this.questionType = this.$store.getters['papers/questionsType']()
        this.$store.commit('papers/getShowQuestionTypeOrder')
        // 从状态中初始化数据
        this.info = this.$store.state.papers.info
        this.selectedIds = this.$store.state.papers.questionsIds || []
        for (let key in this.headerSelectObj) {
          this.headerSelectObj[key] = this.info[key]
        }
        this.headerSelectObj.textbookVersion = this.info.textbookVersionId

        console.log(this.selectedIds)
        this.getPaperScoreType()
      },
      /*********************************** 按钮事件 *********************************/
      // 添加试题到试卷中
      addQueToPaper (questionsTypeId) {
        this.todoQueToPaper('add', questionsTypeId)
      },
      // 上下移动
      moveIndex (questionsTypeId, index, type) {
        this.$store.commit('papers/moveQuestionsIndex', {questionsTypeId, index, type})
        this.initInfo()
      },
      // 保存
      listenSubEvent (isLoadingFun) {
        if (!this.submitForm('info')) {
          return
        }
        let data = this.getSaveData()
        if (data.questionNums < 1) {
          this.errorMess('试卷至少要有一道试题！')
          return false
        }
        if (!isLoadingFun) isLoadingFun = function () {
        }
        isLoadingFun(true)
        let opt = {
          ajaxSuccess: res => {
            this.$emit('edit', 'edit', '保存成功！')
          },
          ajaxParams: {
            jsonString: true,
            url: api[this.editType].path,
            method: api[this.editType].method,
            data
          }
        }
        this.ajax(opt, isLoadingFun)
      },
      // 换一批
      reloadPaper (isLoadingFun) {
        let data = this.$util.getFormData(this.$store.state.papers.znPreview)
        if (!isLoadingFun) isLoadingFun = function () {
        }
        isLoadingFun(true)
        let opt = {
          ajaxSuccess: res => {
            this.$store.commit('papers/updateInfo', res.data)
            this.$store.commit('papers/initQuestionsList', res.data.questionsList)
            this.initInfo()
          },
          ajaxParams: {
            jsonString: true,
            url: api.preview.path,
            method: api.preview.method,
            data
          }
        }
        this.ajax(opt, isLoadingFun)
      },
      // 管理
      changeTodoType (type) {
        let todoObj = type.split('_')
        switch (todoObj[0]) {
          case 'delete':
            this.$store.commit('papers/deleteQuestions', {
              questionsTypeId: todoObj[1],
              index: todoObj[2]
            })
            this.todoType[todoObj[3]] = ''
            this.getQuestionScoreData()
            break
          case 'change':
            //                  操作类型    题型id        操作索引    题目id
            this.todoQueToPaper(todoObj[0], todoObj[1], todoObj[2], todoObj[3])
            break
          default:
            break
        }
        this.initInfo()
      },
      /************************************ 数据相关 ********************************/
      /*
      * 点击提交按钮 监听是否验证通过
      * @param formName string  form表单v-model数据对象名称
      * @return flag boolean   form表单验证是否通过
      * */
      submitForm (formName) {
        let flag = false
        this.$refs[formName].validate((valid) => {
          if (valid) {
            flag = true
          }
        })
        return flag
      },
      checkData () {

      },
      // 获取保存数据
      getSaveData () {
        let data = this.$util.getFormData(this.info)
        let {id = '', textbookVersionId, stage, subject, grade, term, types, name, remark, times, score, questionsListShowOrder} = data
        let papersQuestions = []
        let start = 1 // 题目顺序从1开始

        questionsListShowOrder.map(key => {
          data.questionsList[key].map(item => {
            let isGroup = item.childQuestionsList instanceof Array && item.childQuestionsList.length
            let childQuestionsList = [] // 记录组题中的小题
            // 组合题型提取该题型下的所有小题
            if (isGroup) {
              item.childQuestionsList.map((cItem, cIndex) => {
                childQuestionsList.push({
                  'questionsId': cItem.oldId || cItem.id,
                  'seq': start,
                  'score': cItem.score,
                  'childQuestionsList': []
                })
                start++
              })
            }
            papersQuestions.push({
              'questionsId': item.oldId || item.id,
              'seq': isGroup ? '' : start,
              'score': isGroup ? '' : item.score,
              childQuestionsList
            })
            // 统计题数（累加）
            !isGroup && start++
          })
        })

        return {
          id,
          // 统计试题数量
          questionNums: start - 1,
          textbookVersionId, stage, subject, grade, term, types, name, remark, times, score, papersQuestions
        }
      },
      // 获取编辑数据
      getShowData () {
        let opt = {
          ajaxSuccess: res => {
            this.$store.commit('papers/updateInfo', res.data)
            this.$store.commit('papers/initQuestionsList', res.data.questionsList)
            this.getPaperScoreType()
            this.initInfo()
          },
          ajaxParams: {
            url: api.get.path,
            method: api.get.method,
            params: {id: this.operailityData.id}
          }
        }
        this.ajax(opt)
      },
      // 获取试卷计分方式
      getPaperScoreType () {
          console.log('lll')
        let {scoreType, papsersQuestionsTypeScoreList} = this.editType === 'add' ? this.$store.state.papers.znPreview : this.info
        let questionsTypeScoreObj = {}
        this.$util._.defaultsDeep([], papsersQuestionsTypeScoreList).map(item => questionsTypeScoreObj[item.questionsTypeId] = item.score)
        this.scoreConf = {scoreType, papsersQuestionsTypeScoreList, questionsTypeScoreObj}
          console.log(this.scoreType)
      },
      // 试卷操作
      todoQueToPaper (type, questionsTypeId, index = '', id = '') {
        let todoText = {add: '添加', change: '替换'}
        this.queTodoType = type
        this.todoQuestionsTypeId = questionsTypeId
        this.todoQuestionsObj = {index, id}
        if (id) {
          this.todoType[id] = ''
        }
        this.btnText = todoText[type]
        this.openModel('add')
      },
      // 重新计算试卷分数
      getQuestionScoreData (addQuestion) {
        let {scoreType, questionsTypeScoreObj} = this.scoreConf
          console.log(this.scoreConf)
        if (scoreType === 1) { // 按题型计算分数
          if (!addQuestion) {
            return
          }
          if (addQuestion.groups) {
            addQuestion.childQuestionsList.map(item => item.score = questionsTypeScoreObj[addQuestion.questionsTypeId])
          } else {
            addQuestion.score = questionsTypeScoreObj[addQuestion.questionsTypeId]
          }
          this.$store.commit('papers/addQuestionsList', {
            questionsTypeId: addQuestion.questionsTypeId,
            question: addQuestion
          })
        } else {
          this.getQuestionScoreByServer(addQuestion)
        }
      },
      // 获取系统计算分数所需数据
      getCalculationScoreData (addQuestion) {
        let data = this.$util._.defaultsDeep({}, this.info)
        let questionsList = []
        Object.keys(data.questionsList).map(type => {
          data.questionsList[type].map(item => {
            item.id = item.oldId || item.id
            item.score = item.oldScore || item.score || ''
            if (item.groups) {
              item.childQuestionsList.map(cItem => {
                cItem.id = cItem.oldId || cItem.id
                cItem.score = cItem.oldScore || cItem.score || ''
                cItem.parentId = item.id
              })
            } else {
              item.parentId = ''
            }
            questionsList.push(item)
          })
        })
        if (addQuestion) {
          addQuestion.parentId = ''
          questionsList.push(addQuestion)
        }
        return {
          score: 100,
          questionsList
        }
      },
      // 系统计算分数
      getQuestionScoreByServer (addQuestion) {
        let data = this.getCalculationScoreData(addQuestion)
        let opt = {
          ajaxSuccess: res => {
            this.$store.commit('papers/initQuestionsList', res.data.questionsList)
            this.initInfo()
          },
          ajaxParams: {
            jsonString: true,
            url: api.calculationScore.path,
            method: api.calculationScore.method,
            data
          }
        }
        this.ajax(opt)
      },
      /************************************ 弹窗相关 ********************************/
      // 选择试题回调
      addCall (res) {
        if (this.queTodoType == 'add') {
          this.getQuestionScoreData(res)
        } else if (this.queTodoType == 'change') {
          this.$store.commit('papers/updateQuestions', {
            questionsTypeId: res.questionsTypeId,
            index: this.todoQuestionsObj.index,
            data: res
          })
        }
        this.initInfo()
        this.cancel('add')
      },
      /*
      * 打开指定的模态窗体
      * @param options string 当前指定的模态:"add"、"edit"
      * */
      openModel (options) {
        this[options + 'Modal'] = true
      },
      // 取消
      cancel (targer) {
        this[targer + 'Modal'] = false
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    destroyed () {
      this.$store.commit('papers/destroy')
    },
    components: {
      // 试题类型
      questionShow,
      // 试题选择弹窗
      addQueToPaper
    }
  }

</script>
