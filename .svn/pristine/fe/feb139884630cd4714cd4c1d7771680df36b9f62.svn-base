<!--
****--@file     add
****--@date     2017/12/5 9:15
****--@author   YC
****--@describe 人工组卷
-->
<template>
    <el-row>
        <!-- 第一步：基本配置 -->
        <el-col v-if="step===0">
            <subject-head @change="changeHeader" :hasAll="false"
                          :showItems="['textbookVersion', 'grade', 'subject']"
                          :selectItems="bindHeader()"></subject-head>
            <el-form ref="formValidate" :model="formValidate" :rules="testPaperManagementRg0" label-width="100px"
                     style="margin-top: 10px">
                <el-form-item label="试卷名称：" prop="name">
                    <el-input v-model="formValidate.name"></el-input>
                </el-form-item>
                <el-form-item label="试卷说明：" prop="remark">
                    <el-input type="textarea" :rows="4" v-model="formValidate.remark"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <!-- 第二步：选择题目 -->
        <el-col v-if="step===1">
            <div class="cs_moudle-head noAll">
                <p>学期：
                    <span v-for="index in 2" :key="index"
                          :class="formValidate.term == (index - 1) ? 'is-active' : ''"
                          @click="changeMoudle('term',index - 1)"><i></i>{{ (index - 1) | term }}</span>
                </p>
                <p>章节：
                    <span v-for="(item,id) in chapterList" :key="id"
                          :class="formValidate.chapter == id ? 'is-active' : ''"
                          @click="changeMoudle('chapter',id)"><i></i>{{ item.name }}</span>
                    <template v-if="!chapterList">
                        暂无章节
                    </template>
                </p>
            </div>
            <h2 class="papersLibs">题库</h2>
            <el-row>
                <el-col :span="12" class="papersRgItem">
                    <!-- 搜索 -->
                    <el-row>
                        <el-form>
                            <el-col :span="8">
                                <el-form-item label="题型：">
                                    <el-select v-model="selectFormValidate.questionsTypeId" clearable placeholder="请选择"
                                               @change="getQuestionsList">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option v-for="(item,index) in questionsType" :key="index" :label="item.name"
                                                   :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="难度：">
                                    <el-select v-model="selectFormValidate.diffLevelCode" clearable placeholder="请选择"
                                               @change="getQuestionsList">
                                        <el-option label="全部" value=""></el-option>
                                        <question-diff-level-option></question-diff-level-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="知识点：">
                                    <el-select v-model="selectFormValidate.knowledgeId" clearable placeholder="请选择"
                                               @change="getQuestionsList">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option v-for="(item,index) in knowledgeList" :key="index" :label="item.name"
                                                   :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-row>
                    <!-- 题目 -->
                    <div class="papersSelectBox overShow">
                        <div>
                            <template v-if="questionSelectArr.length">
                                <template v-for="(item,index) in questionSelectArr">
                                    <question-show :key="index" :index="index+1"
                                                   :showData="item" class="questionItem" :hasDo="100" :show-answer="true"
                                                   :showScore="true">
                                        <template slot="todoBox">
                                            <el-button v-if="!questionSelectedIds.includes(item.id)" type="success" size="small" @click="addToRes(index,item)">
                                                添加
                                            </el-button>
                                            <el-button type="info" size="small" v-else>该题已选择</el-button>
                                        </template>
                                    </question-show>
                                </template>
                            </template>
                            <p class="noDataTips" v-else>暂无试题可选择</p>
                        </div>
                    </div>
                    <!-- 分页 -->
                    <div style="margin: 10px 50px 10px 0;">
                        <p style="float: right;">
                            <el-pagination
                                    @current-change="changeCall"
                                    :current-page.sync="currentPage"
                                    :page-size="queryQpt.params.pageSize"
                                    layout="total,prev, pager, next, jumper"
                                    :total="totalCount">
                            </el-pagination>
                        </p>
                    </div>
                </el-col>
                <el-col :span="12" class="papersRgItem res">
                    <div class="overShow">
                        <div>
                            <template v-if="questionSelectedIds.length">
                                <template v-for="(item,questionsTypeId) in questionSelectedObj">
                                    <el-row class="paperQuestionType">
                                        <el-col :span="12">
                                            <h3 :key="questionsTypeId" class="questionTypeText">
                                                {{ questionsType[questionsTypeId].name }}
                                            </h3>
                                        </el-col>
                                    </el-row>

                                    <template v-for="(cItem,index) in item">
                                        <question-show :key="questionsTypeId+'_'+index" :index="index+1"
                                                       :showData="cItem" class="questionItem" :hasDo="60"
                                                       :show-answer="true" :showScore="true">
                                            <template slot="todoBox">
                                                <el-button type="danger" size="small"
                                                           @click="delToRes(questionsTypeId,index,item)">
                                                    删除
                                                </el-button>
                                            </template>
                                        </question-show>
                                    </template>

                                </template>
                            </template>
                            <p class="noDataTips" v-else>请在左侧选择试题并添加</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <!-- 第三步：题目分布信息 -->
        <el-col v-if="step===2">
            <div>
                <el-table align="center" :context="self" maxHeight="400" :data="questionsInfo" tooltip-effect="dark"
                          :summary-method="getSummaries" show-summary>
                    <el-table-column label="题型" prop="type" show-overflow-tooltip></el-table-column>
                    <el-table-column label="数量" prop="num" show-overflow-tooltip></el-table-column>
                    <template v-if="formValidate.scoreType === 1">
                        <el-table-column label="单题分值" prop="score" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.score" @input="setThisTotalScore(scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="总分" prop="totalScore" show-overflow-tooltip></el-table-column>
                    </template>
                    <el-table-column label="知识点" prop="knowledges" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <p v-for="(item,index) in scope.row.knowledges" :key="index">
                                {{ item.name }}（{{ item.value }}）
                            </p>
                        </template>
                    </el-table-column>
                </el-table>
                <h3 class="qtt_h3Title">难度预估：</h3>
                <el-row class="qtt_chartMain">
                    <el-col :span="4">
                        <p class="qtt_centerText difNum">难度值：{{ (selectFormValidate.diffLevelCode || '全部') |
                            diffLevelCode(self)
                            }}</p>
                    </el-col>
                    <el-col :span="10">
                        <div id="questionsTypes" class="qtt_chartBox"></div>
                        <!--<p class="qtt_centerText">题型分布</p>-->
                    </el-col>
                    <el-col :span="10">
                        <div id="questionsKnowledges" class="qtt_chartBox"></div>
                        <!--<p class="qtt_centerText">知识点分布</p>-->
                    </el-col>
                </el-row>
                <el-form ref="formValidate" :model="formValidate" :rules="testPaperManagementZn2" :inline="true"
                         label-width="100px">
                    <el-col>
                        <el-form-item label="定义分数：">
                            <el-radio-group v-model="formValidate.scoreType" @change="changeScoreType">
                                <el-radio :label="2">使用试题库分数，并将总分折算为 100分</el-radio>
                                <el-radio :label="1">自定义各题型分值，总分为 {{ formValidate.score }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="答题时长：" prop="times">
                            <el-input v-model="formValidate.times">
                                <template slot="append">分钟</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
        </el-col>

        <el-col align="center">
            <el-button type="info" v-show="step" @click="prev">上一步</el-button>
            <el-button type="success" @click="next" v-show="step < 2">下一步</el-button>
            <load-btn @listenSubEvent="listenSubEvent" v-show="step === 2" :btnData="loadBtn"></load-btn>
        </el-col>
    </el-row>
</template>
<style lang="scss">
    .papersRgItem {
        width: 49%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin: 10px 0;
        .el-select > .el-input {
            width: 110px;
        }
        .overShow {
            overflow: auto;
            height: 100%;
            width: 100%;
        }
        &.res {
            margin-left: 2%;
            height: 465px;
            .noDataTips {
                line-height: 440px
            }
        }
        .noDataTips {
            text-align: center;
        }
        .paperQuestionType {
            margin-top: 40px;
            &:first-child {
                margin-top: 10px;
            }
        }
        .questionBox.questionItem0 {
            margin-top: 10px;
        }
        .questionItem {
            margin-bottom: 20px
        }
    }

    .papersSelectBox.overShow {
        height: 350px;
        .noDataTips {
            line-height: 350px
        }
        .questionItem {
            margin-bottom: 20px
        }
    }

    .papersLibs {
        margin-top: 10px;
    }
</style>
<style lang="scss">
    .qtt_centerText {
        text-align: center;
        &.difNum {
            line-height: 220px;
        }
    }

    .qtt_h3Title {
        margin-top: 20px;
    }

    .qtt_chartMain {
        margin-bottom: 20px;
        position: relative;
    }

    .qtt_chartBox {
        width: 100%;
        height: 200px;
    }
</style>
<script>
  // 引入 ECharts 主模块
  var Echarts = require('echarts')
  /*当前组件必要引入*/
  import api from '../api'
  import subjectHead from '@/components/common/subjectHead.vue'

  import questionDiffLevelOption from '../../../common/questionDiffLevelOption' // 难度组件

  import questionShow from '../../../common/questionShow/show'

  import { testPaperManagementRg0, testPaperManagementZn2 } from '../../rules'

  //当前组件引入全局的util
  let Util = null
  export default {
    data () {
      return {
        step: 0,
        totalCount: 0,
        // projectDiffLevels,
        testPaperManagementRg0,
        testPaperManagementZn2,
        self: this,
        questionsType: {}, // 题型
        headerSelectObj: {}, // 缓存选择的数据
        // questionDiffMap: {}, // 试题难度区间
        allChapter: {}, // 缓存章节
        chapterList: null, // 当前章节
        knowledgeList: {}, // 知识点
        headerKey: {'textbookVersionId': '教材', 'grade': '年级', 'subject': '科目'},
        loadBtn: {title: '保存', callParEvent: 'listenSubEvent'},

        questionSelectArr: [], // 待选的题目
        questionSelectedObj: {}, // 已选的题目
        questionSelectedTypeId: [], // 已选择的题目类型
        questionSelectedIds: [], // 已选择的题目id[避免重复添加相同的试题]

        formValidate: {
          textbookVersionId: '', // 版本
          subject: '', // 科目
          grade: '', // 年级
          term: '0', // 学期
          stage: '', // 阶段
          chapter: '', // 章节
          types: '1', // 0智能组卷|1人工组件
          times: '', // 考试时长
          name: '', // 试卷名称
          remark: '', // 试卷描述
          score: 100, // 总分
          scoreType: 2, // 1 自定义个题型分值 2 使用试题库分数，并将总分折算为score
          questionNums: '', // 试题总数
          papersQuestions: [], // 试题
          papsersQuestionsTypeScoreList: [], // 试题分数
        },

        // 第二步表单
        selectFormValidate: {
          questionsTypeId: '', // 题型
          diffLevelCode: '', // 难度
          knowledgeId: '' // 知识点
        },

        // 第三歩
        questionsInfo: [], // 试卷基本信息

        searchObj: {},

        // 接口
        api: {
          chapter: 'textbookContent/queryChapterList', // 章节
          knowledge: 'textbookContent/queryKnowledgeListByChapter', // 知识点
          questionsType: 'questionsType/query-all' //题型,
        },
        currentPage: 1,
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        // this.questionDiffMap = this.$store.getters['app/envs']('questionDiffMap');
        this.initPages()
        // 获取题型
        this.getQuestionsType()
      },
      changeCall (num) {
        this.initPages(num)
        this.getListData()
      },
      /*
       * 设置表格数据
       * @param isLoading Boolean 是否加载
       */
      getListData () {
        this.questionSelectArr = []
        Object.assign(this.queryQpt.params, this.searchObj)
        let opt = {
          ajaxSuccess: res => {
            let data = []
            if (res.data.dataList instanceof Array) {
              data = res.data.dataList
            }
            this.questionSelectArr = data
            this.totalCount = res.data.totalCount
          },
          ajaxError: () => this.errorMess('获取数据失败，请重试'),
          ajaxParams: this.queryQpt
        }
        this.ajax(opt)
      },
      // 初始化分页
      initPages (n = 1) {
        this.queryQpt = {
          url: api.query.path,
          params: {curPage: n, pageSize: 10 || Util.pageInitPrams.pageSize}
        }
      },
      // 初始化选中的题目
      initQuestionSelecte () {
        this.questionSelectedObj = {}
        this.questionSelectedTypeId = []
        this.questionSelectedIds = []
      },
      // 初始化题目筛选
      initSelectFormValidate () {
        this.selectFormValidate.questionsTypeId = '' // 题型
        this.selectFormValidate.diffLevelCode = ''// 难度
        this.selectFormValidate.knowledgeId = ''// 知识点
      },
      // 初始化图表
      initChar (obj) {
        let charts = ['questionsTypes', 'questionsKnowledges']
        let myChart = {}
        this.$nextTick(() => {
          charts.map(item => myChart[item] = Echarts.init(document.getElementById(item)))
          for (let key in myChart) {
            myChart[key].setOption(obj[key])
          }
        })
      },
      // 统计试卷信息
      getSummaries (param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (!~[1, 3].indexOf(index)) {
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = '该列只允许输入数字'
          }
          if (index === 3) { // 计算总分
            this.formValidate.score = sums[index]
          }
        })

        return sums
      },
      // 设置该题型的总分
      setThisTotalScore (row) {
        let res = 0
        if (!isNaN(row.num)) {
          res = row.num * row.score
        }
        row.totalScore = res
      },
      /******************************* 数据转换 **********************************/
      // 获取试卷信息表格数据
      getQuestionsInfoTable () {
        let questionTypes = {} // 所有题型
        let table = [] // 表格数据

        for (let typeId in this.questionSelectedObj) {
          if (!questionTypes[typeId]) {
            questionTypes[typeId] = { // 表格每一行的数据
              questionsTypeId: typeId, // 试题类型id
              type: this.questionsType[typeId].name, // 试题类型
              num: 0, // 试题数量
              score: '', // 单题分值
              totalScore: 0, // 总分
              knowledges: {} // 知识点
            }
          }
          this.questionSelectedObj[typeId].map(item => {
            // 组合题型累加该题型下的所有小题
            questionTypes[typeId].num += item.childQuestionsList && item.childQuestionsList.length || 1;
            (item.knowledgeList && item.knowledgeList || []).map(kItem => {
              if (!questionTypes[typeId].knowledges[kItem.id]) {
                questionTypes[typeId].knowledges[kItem.id] = {name: kItem.name, value: 1}
              } else {
                questionTypes[typeId].knowledges[kItem.id].value++
              }
            })
          })
        }

        for (let key in questionTypes) {
          let knowledges = []
          for (let k in questionTypes[key].knowledges) {
            knowledges.push(questionTypes[key].knowledges[k])
          }
          questionTypes[key].knowledges = knowledges
          table.push(questionTypes[key])
        }

        questionTypes = null
        this.questionsInfo = table
      },
      // 获取试卷信息
      getQuestionsInfo () {
        // 计算试卷信息
        this.getQuestionsInfoTable()
        let questionsTypesNameArr = [] // 问题类型数组
        let questionsTypesDataArr = [] // 问题类型对应的数量信息数组
        let questionsKnowledgesNameObj = {} // 知识点类型[缓存使用]
        let questionsKnowledgesNameArr = [] // 知识点类型数组
        let questionsKnowledgesDataArr = [] // 知识点类型对应的数量信息数组

        for (let typeId in this.questionSelectedObj) {
          let name = this.questionsType[typeId].name
          let questionList = this.questionSelectedObj[typeId] // 该题型下的题目
          // 题型
          questionsTypesNameArr.push(name)
          questionsTypesDataArr.push({name, value: questionList.length})
          // 知识点
          questionList.map(item => {
            (item.knowledgeList && item.knowledgeList || []).map(kItem => {
              if (!questionsKnowledgesNameObj[kItem.id]) {
                questionsKnowledgesNameObj[kItem.id] = {name: kItem.name, value: 1}
              } else {
                questionsKnowledgesNameObj[kItem.id].value++
              }
            })
          })
        }

        for (let key in questionsKnowledgesNameObj) {
          questionsKnowledgesNameArr.push(questionsKnowledgesNameObj[key].name)
          questionsKnowledgesDataArr.push(questionsKnowledgesNameObj[key])
        }

        // 计算统计图数据
        let chartsOptions = {
          questionsTypes: {
            title: {
              text: '题型分布',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: questionsTypesNameArr
            },
            series: [
              {
                name: '题型分布',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: questionsTypesDataArr,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          },
          questionsKnowledges: {
            title: {
              text: '知识点分布',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: questionsKnowledgesNameArr
            },
            series: [
              {
                name: '知识点分布',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: questionsKnowledgesDataArr,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        }

        this.initChar(chartsOptions)
      },
      // 获取提交数据
      getSaveData (isLoadingFun) {
        let data = this.getFormData(this.formValidate)
        let questionsList = [] // 所有题目

        // 分钟转换为秒
        data.times = data.times * 60
        // 阶段
        data.stage = data.grade > 6 ? (data.grade > 9 ? 2 : 1) : '0'

        // 难度、知识点
        let {diffLevelCode} = this.selectFormValidate
        data.diffLevelCode = diffLevelCode

        // let difMap = this.questionDiffMap[diffLevel]; // 获取难度区间
        // let dif = ['', ''];
        // if (difMap) {
        //     dif = difMap.split(',')
        // }
        // data.diffLevelSmall = dif[0];
        // data.diffLevelBig = dif[1];

        for (let key in this.questionSelectedObj) {
          this.questionSelectedObj[key].map(item => questionsList.push(item))
        }

        if (data.scoreType == 2) {
          this.getScoreForServer(data, questionsList, isLoadingFun)
        } else {
          // 检测自定义分数
          let saveErr = this.questionsInfo.some(item => !item.score || !/^\d{1,2}$/.test(item.score))
          if (saveErr) {
            isLoadingFun(false)
            this.errorMess('每个题型的分数必须填写并且是有效的两位数')
            return
          }
          // 分数
          let score = {}
          let papsersQuestionsTypeScoreList = []
          this.questionsInfo.map(item => {
            score[item.questionsTypeId] = item.score
            papsersQuestionsTypeScoreList.push({ // 记录题型分数
              questionsTypeId: item.questionsTypeId,
              score: item.score
            })
          })
          // 设置分数
          questionsList.map(item => {
            let questionsType = item.questionsTypeId
            // 组合题型中的每个小题使用自定义分数
            if (item.childQuestionsList instanceof Array && item.childQuestionsList.length) {
              item.childQuestionsList.map(cItem => cItem.score = score[questionsType])
            } else {
              item.score = score[questionsType]
            }
          })
          data.papsersQuestionsTypeScoreList = papsersQuestionsTypeScoreList
          this.saveDataToServer(data, questionsList, isLoadingFun)
        }
      },
      // 获取系统计算的分数
      getScoreForServer (oldData, questionsList, isLoadingFun) {
        let data = {
          score: oldData.score,
          questionsList
        }
        let opt = {
          ajaxSuccess: res => {
            this.saveDataToServer(oldData, res.data.questionsList, isLoadingFun)
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
      /******************************* 按钮交互 **********************************/
      // 上一步
      prev () {
        this.step--
      },
      // 下一步
      next () {
        let checkData = this['checkedData' + this.step]
        if (typeof checkData === 'function' && !checkData()) {
          // 数据检测未通过
          return
        }
        //下一步
        this.step++
        switch (this.step) {
          case 1:
            this.getChapterDataForServer()
            this.initPages()
            this.initQuestionSelecte()
            break
          case 2:
            this.getQuestionsInfo()
            break
          default:
            break
        }
      },
      // 改变获取题目
      getQuestionsList () {
        let {textbookVersionId, grade, subject, term, chapter: chapterId = ''} = this.formValidate
        let {questionsTypeId, knowledgeId, diffLevelCode} = this.selectFormValidate

        // let difMap = this.questionDiffMap[diffLevel]; // 获取难度区间
        // let dif = ['', ''];
        // if (difMap) {
        //     dif = difMap.split(',')
        // }
        //
        // let diffLevelSmall = dif[0];
        // let diffLevelBig = dif[1];

        subject = this.headerSelectObj.subject.code

        this.searchObj = {
          textbookVersionId,
          grade,
          subject,
          term,
          chapterId,
          questionsTypeId,
          knowledgeId,
          diffLevelCode /*diffLevelSmall, diffLevelBig*/
        }

        this.getListData()
      },
      // 添加题目
      addToRes (index, d) {
        let obj = this.$util._.defaultsDeep({}, d)
        if (~this.questionSelectedIds.indexOf(obj.id)) {
          this.errorMess('该题已经存在了，请勿重复添加')
          return
        }
        if (!obj.questionsTypeId) {
          this.errorMess('该题数据错误，请勿添加使用')
          return
        }
        if (!this.questionSelectedObj[obj.questionsTypeId]) {
          this.questionSelectedObj[obj.questionsTypeId] = []
          this.questionSelectedTypeId.push(obj.questionsTypeId)
        }
        this.questionSelectedIds.push(obj.id)
        this.questionSelectedObj[obj.questionsTypeId].push(obj)
        // this.questionSelectArr.splice(index, 1);
      },
      // 删除题目
      delToRes (questionsTypeId, index, item) {
        // 删除题目索引
        let delIdIndex = this.questionSelectedIds.indexOf(item.id)
        this.questionSelectedIds.splice(delIdIndex, 1)
        // 删除题目
        this.questionSelectedObj[questionsTypeId].splice(index, 1)
        // 删除题型
        if (!this.questionSelectedObj[questionsTypeId].length) {
          let delTypeIndex = this.questionSelectedTypeId.indexOf(questionsTypeId)
          // 从已选题型中删除该题型
          this.questionSelectedTypeId.splice(delTypeIndex, 1)
          delete this.questionSelectedObj[questionsTypeId]
        }
        // 重新加载待选试题列表
        // this.getQuestionsList()
      },
      // 改变分数类型
      changeScoreType (type) {
        if (type === 2) {
          this.formValidate.score = 100
        }
      },
      // 保存
      listenSubEvent (isLoadingFun) {
        if (!this.submitForm('formValidate')) {
          return
        }
        if (!isLoadingFun) isLoadingFun = function () {
        }
        isLoadingFun(true)
        this.getSaveData(isLoadingFun)
      },
      saveDataToServer (oldData, questionsList, isLoadingFun) {
        let data = oldData
        let start = 1 // 题目顺序从1开始
        let papersQuestions = []
        questionsList.map(item => {
          let isGroup = item.childQuestionsList instanceof Array && item.childQuestionsList.length
          let childQuestionsList = []
          // 组合题型提取该题型下的所有小题
          if (isGroup) {
            item.childQuestionsList.map((cItem, cIndex) => {
              childQuestionsList.push({
                'questionsId': cItem.id,
                'seq': start,
                'score': cItem.score,
                'childQuestionsList': []
              })
              start++
            })
          }
          papersQuestions.push({
            'questionsId': item.id,
            'seq': isGroup ? '' : start,
            'score': isGroup ? '' : item.score,
            childQuestionsList
          })
          !isGroup && start++
        })
        data.questionNums = start
        data.papersQuestions = papersQuestions
        let opt = {
          ajaxSuccess: res => {
            this.$emit('add', 'addRg', '人工组卷成功！')
          },
          ajaxError: () => {
            this.errorMess('人工组卷失败，请重试!')
            isLoadingFun(false)
          },
          ajaxParams: {
            jsonString: true,
            url: api.add.path,
            method: api.add.method,
            data
          }
        }
        this.ajax(opt, isLoadingFun)
      },
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
      /*
       * 重置当前表单
       * */
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
      getFormData (data) {
        let myData = Util._.defaultsDeep({}, data)
        return myData
      },
      //筛选
      changeHeader (obj, select) {
        for (let key in obj) {
          this.formValidate[key] = select[key]
        }
        this.formValidate.textbookVersionId = select.textbookVersion
        this.headerSelectObj = obj
      },
      // 改变学期或者章节
      changeMoudle (key, val) {
        this.formValidate[key] = val
        if (key == 'term') {
          // 获取章节
          this.getChapterDataForServer()
        } else {
          this.initSelectFormValidate()
          // 知识点
          this.getKnowledgeDataForServer()
        }
      },
      /******************************* 数据验证 **********************************/
      // 检测第一步数据是否正确
      checkedData0 () {
        for (let key in this.headerKey) {
          if (this.formValidate[key] === '') {
            this.errorMess('请选择' + this.headerKey[key])
            return false
          }
        }
        return this.submitForm('formValidate')
      },
      // 检测第二步数据是否正确
      checkedData1 () {
        // 是否有题目
        if (!this.questionSelectedIds.length) {
          this.errorMess('请选择试题之后才能继续下一步')
          return false
        }
        return true
      },
      // 绑定顶部筛选
      bindHeader () {
        let {textbookVersionId: textbookVersion, grade, subject} = this.formValidate
        return {textbookVersion, grade, subject}
      },
      /******************************* 数据获取 ****************************/
      // 获取知识点
      getKnowledgeDataForServer () {
        if (!this.formValidate.chapter) {
          this.knowledgeList = null
          this.questionSelectArr = []
          return
        }
        this.getDataForServer('knowledge', {chapterIds: this.formValidate.chapter}, (data, res) => {
          this.knowledgeList = data
        })
        // 获取题目
        this.getQuestionsList()
      },
      // 获取题型
      getQuestionsType () {
        this.getDataForServer('questionsType', {type: 0}, obj => this.questionsType = obj)
      },
      // 获取章节
      getChapterDataForServer () {
        this.formValidate.chapter = ''
        let {textbookVersionId, grade, term, subject} = this.formValidate
        // 教材、年级、学期、科目缺一不可
        if (!textbookVersionId || !grade || term === '' || !subject) {
          this.chapterList = null
          return
        }

        let chapterId = ''

        // 缓存数据
        let cacheKey = [textbookVersionId, grade, term, subject]
        let cacheData = this.allChapter[cacheKey.join('-')]
        if (cacheData) {
          this.chapterList = this.$util.getFormData(cacheData) // 读取缓存
          for (let key in this.chapterList) {
            chapterId = key
            break
          }
          this.changeMoudle('chapter', chapterId)
        } else {
          // 获取数据并缓存
          this.getDataForServer('chapter', {
            textbookVersionId,
            grade,
            subject: this.headerSelectObj.subject.code,
            term
          }, (data, res) => {
            this.chapterList = data
            this.allChapter[cacheKey.join('-')] = data
            chapterId = res.data.length && res.data[0].id || ''
            this.changeMoudle('chapter', chapterId)
          })
        }
      },
      // 从服务器获取选择数据
      getDataForServer (type, params, call, isObj = true) {
        let opt = {
          ajaxSuccess: res => {
            let data = {}
            if (isObj && res.data instanceof Array && res.data.length) {
              res.data.map(item => data[item.id] = item)
            } else {
              data = null
            }
            call && call(data, res)
          },
          ajaxError: () => this.errorMess('获取数据失败，请重试'),
          ajaxParams: {
            url: this.api[type],
            params
          }
        }
        this.ajax(opt)
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {
      subjectHead,
      questionDiffLevelOption,
      questionShow
    }
  }

</script>
