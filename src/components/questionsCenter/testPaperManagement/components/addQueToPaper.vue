<!--
****--@file     addQueToPaper
****--@date     2017/12/7 16:58
****--@author   YC
****--@describe 添加试题到试卷
-->
<template>
    <div class="selectPapersBox">
        <subject-head @change="changeHeader" :hasAll="true" :selectItems="selectItems"
                      :disSel="['textbookVersion', 'grade', 'term', 'subject']"></subject-head>
        <el-row>
            <el-col class="selectPapersItem">
                <!-- 搜索 -->
                <el-row>
                    <el-form>
                        <el-col :span="8">
                            <el-form-item label="题型：">
                                <el-select v-model="selectFormValidate.questionsTypeId" clearable placeholder="请选择"
                                           @change="getQuestionsList" :disabled="questionsTypeId !== undefined">
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
                                    <!--<el-option v-for="(item,index) in projectDiffLevels" :key="index"-->
                                    <!--:label="item.value"-->
                                    <!--:value="item.code"></el-option>-->
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
                    <template v-if="questionSelectArr.length">
                        <template v-for="(item,index) in questionSelectArr">
                            <question-show :key="index" :index="index+1"
                                           :showData="item" :show-answer="true" :showScore="true" class="questionItem"
                                           :has-do="60">
                                <template slot="todoBox">
                                    <el-button type="success" size="small" @click="add(item)"
                                               :disabled="hasThisQuestion(item)">
                                        {{ btnStr }}
                                    </el-button>
                                </template>
                            </question-show>
                        </template>
                    </template>
                    <p class="noDataTips" v-else>暂无试题可选择</p>
                </div>
                <!-- 分页 -->
                <div style="margin: 10px 50px 10px 0;">
                    <div style="float: right;">
                        <el-pagination
                                @size-change="changePageSize"
                                @current-change="changePage"
                                :current-page.sync="myPages.currentPage"
                                :page-size="myPages.pageSize"
                                layout="total,prev, pager, next, jumper"
                                :total="totalCount">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss">
    .selectPapersBox {
        .overShow {
            overflow: auto;
            height: 365px;
            width: 100%;
        }
        .selectPapersItem {
            margin-top: 16px;
        }
        .questionItem {
            margin-bottom: 20px;
        }
        .noDataTips {
            line-height: 340px;
            text-align: center;
        }
    }
</style>
<script>
  /*当前组件必要引入*/
  import api from '../api'
  // import {projectDiffLevels} from '../../../../libs/projectDiffLevel'
  import questionDiffLevelOption from '../../../common/questionDiffLevelOption' // 难度组件
  import subjectHead from '@/components/common/subjectHead.vue'

  import questionShow from '../../../common/questionShow/show'

  //当前组件引入全局的util
  let Util = null
  export default {
    props: ['selectItems', 'btnText', 'questionsTypeId', 'selectedIds'],
    data () {
      return {
        totalCount: 0,
        // projectDiffLevels,
        questionSelectArr: [],
        self: this,
        questionsType: {}, // 题型
        headerSelectObj: {}, // 缓存选择的数据
        questionDiffMap: {}, // 试题难度区间
        allChapter: {}, // 缓存章节
        chapterList: null, // 当前章节
        knowledgeList: {}, // 知识点
        formValidate: {
          textbookVersionId: '', // 版本
          subject: '', // 科目
          grade: '', // 年级
          term: '0', // 学期
          stage: '', // 阶段
          chapter: '' // 章节
        },
        // 第二步表单
        selectFormValidate: {
          questionsTypeId: '', // 题型
          diffLevelCode: '', // 难度
          knowledgeId: '' // 知识点
        },
        searchObj: {},

        btnStr: this.btnText || '添加',

        // 接口
        api: {
          chapter: 'textbookContent/queryChapterList', // 章节
          knowledge: 'textbookContent/queryKnowledgeListByChapter', // 知识点
          questionsType: 'questionsType/query-all' //题型,
        },

        disSelectIds: this.selectedIds || [], // 不允许选择的id
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util
        console.log(this.disSelectIds)
        this.questionDiffMap = this.$store.getters['app/envs']('questionDiffMap')
        this.initPages()
        // 获取题型
        this.getQuestionsType()
      },
      hasThisQuestion (item) {
        let tag = false
        if (item.groups) {
          tag = !!~this.disSelectIds.indexOf(item.childQuestionsList[0].id)
        } else {
          tag = !!~this.disSelectIds.indexOf(item.id)
        }
        return tag
      },
      /*
       * 设置表格数据
       * @param isLoading Boolean 是否加载
       */
      setTableData () {
        Object.assign(this.queryQptions.params, this.searchObj)
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
          ajaxParams: this.queryQptions
        }
        this.ajax(opt)
      },
      // 初始化分页
      initPages () {
        this.myPages = Util.pageInitPrams
        this.queryQptions = {
          url: api.query.path,
          params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize}
        }
      },
      // 初始化题目筛选
      initSelectFormValidate () {
        if (this.questionsTypeId) {
          this.selectFormValidate.questionsTypeId = Number(this.questionsTypeId)
        } else {
          this.selectFormValidate.questionsTypeId = '' // 题型
        }
        this.selectFormValidate.diffLevelCode = ''// 难度
        this.selectFormValidate.knowledgeId = ''// 知识点
      },
      // 改变获取题目
      getQuestionsList () {
        let {grade, subject, term, chapter: chapterId = ''} = this.formValidate
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
          grade,
          subject,
          term,
          chapterId,
          questionsTypeId,
          knowledgeId,
          diffLevelCode /*diffLevelSmall, diffLevelBig*/
        }

        this.setTableData()
      },
      //筛选
      changeHeader (obj, select) {
        for (let key in obj) {
          this.formValidate[key] = select[key]
        }
        this.formValidate.textbookVersionId = select.textbookVersion
        this.headerSelectObj = obj
        this.changeMoudle()
      },
      // 改变学期或者章节
      changeMoudle (key, val) {
        if (key) {
          this.formValidate[key] = val
        }
        if (key == 'term') {
          // 获取章节
          this.getChapterDataForServer()
        } else {
          this.initSelectFormValidate()
          // 知识点
          this.getKnowledgeDataForServer()
        }
        // 获取题目
        this.getQuestionsList()
      },
      // 获取试题
      getQuestion () {
        let opt = {}
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
      },
      add (item) {
        this.$emit('add', item)
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
