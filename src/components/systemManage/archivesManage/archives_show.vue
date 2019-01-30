<!--
****--@file     growthArchives.vue
****--@date     2017/12/25 9:29
****--@author   王恒
****--@describe   成长档案
-->
<template>
  <div>
    <div class="growthArchives-root">

      <!--<button class="seeHistory">导出</button>-->
      <!--&lt;!&ndash;<router-link to="/selfcenter/seeHistory">&ndash;&gt;-->
      <!--<el-button class="seeHistory"> 查看历史</el-button>-->
      <!--</router-link>-->
      <h1>{{operailityData.studentName}}{{year}}年{{grade | grade}}{{term | term}}成长档案</h1>
      <div class="select-project">选择科目：
        <el-radio @change="change" v-model="subject" :label="item.code" v-for="(item,index) in bookBtn"
                  :key="index">{{item.value}}
        </el-radio>

      </div>

      <div class="groupsDetailtitle">
        <div></div>&nbsp;章节掌握
      </div>
      <div class="know-access">
        <p style="color: #fd7416" v-if="chapter.length==0">暂无数据</p>
        <!--<div  v-if="chapter.length!=0" >-->
        <div :class="chapter.length==0?'vis':''">
          <div id="myRadarChart" :style="{width: '890px', height: '300px'}"></div>
        </div>
        <!--</div>    -->
      </div>
      <div class="groupsDetailtitle">
        <div></div>&nbsp;科目掌握度
      </div>
      <div style="height: 280px">
        <el-select @change="drawProjectPerData" v-model="myProjectprecent" placeholder="默认"
                   style="float: left;z-index: 100">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!--<p style="color: #fd7416" v-if="!chapter" >暂无数据</p>-->
        <div id="myProjectprecent" :style="{width: '890px', height: '300px',top:'-40px'}"></div>

      </div>
      <div class="groupsDetailtitle">
        <div></div>&nbsp;近日做题量
      </div>
      <div style="height: 280px">
        <el-select v-model="valuemyProjectprecentNumofquestion" placeholder="默认"
                   style="float: left;z-index: 100" @change="drawmyProjectprecentNumofquestionData">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div id="myProjectprecent-numofquestion" :style="{width: '890px', height: '300px',top:'-40px'}"></div>

      </div>
      <div class="groupsDetailtitle">
        <div></div>&nbsp;历次作业成绩走势图
      </div>
      <div style="height: 280px">
        <el-select v-model="passGrade1" placeholder="默认" style="float: left;z-index: 100">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div id="passGrade" :style="{width: '890px', height: '300px',top:'-40px'}"></div>

      </div>

      <div class="groupsDetailtitle">
        <div></div>&nbsp;历次班组排名
      </div>
      <div style="height: 280px">
        <el-select v-model="passGradeRanking1" placeholder="默认" style="float: left;z-index: 100">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div id="passGradeRanking" :style="{width: '890px', height: '300px',top:'-40px'}"></div>

      </div>
      <div class="groupsDetailtitle">
        <div></div>&nbsp;测评分析
      </div>
      <div id="myTable" ref="myTable" class="growthArchives-myTable" style="width: 890px">

        <el-table
          :data="LastTableData"
          border
          style="width: 890px;">
          <el-table-column
            prop="id"
            label="序号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="project"
            label="科目"
            align="center">
            <template slot-scope="scope">
              {{scope.row.project}}
            </template>
          </el-table-column>
          <el-table-column
            prop="testName"
            label="评测名称"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="testDate"
            width="150"
            label="评测日期"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.createTime | formatDate('yyyy-MM-dd HH:mm')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="timer"
            label="结束时间"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.updateTime | formatDate('yyyy-MM-dd HH:mm')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="answerTrueNum"
            label="答对题数"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="answerFalseNum"
            label="答错题数"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <router-link to="/selfCenter/selfTestResult">
                <el-button>查看</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination" style="width: 920px">
          <div style="text-align: center">
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
      </div>
      <div class="groupsDetailtitle">
        <div></div>&nbsp;已完成作业
      </div>
      <div class="selfWork" v-for="item in alreadywork">
        <p>
          布置者:{{item.teacher}}&nbsp &nbsp&nbsp&nbsp&nbsp | &nbsp&nbsp&nbsp&nbsp&nbsp 来源：{{item.origin}} <span>布置时间：{{item.time}}&nbsp&nbsp&nbsp&nbsp&nbsp  上交时间：2013-08-09 10：00 </span>
        </p>
        <div class="selfWorkname">
          <ul>
            <li class="title">
              <div class="ulleft">作业名称：{{item.name}}</div>
            </li>
            <li class="sec">完成状态：<span class="alreadyComplate">{{item.title}}</span></li>
          </ul>

          <div class="selfready">
            <router-link :to="{path:'/selfCenter/homeworkAlreadydid',params:{id:1}}">
              <!--to="{path:'/selfCenter/homeworkAlreadydid',params:{id:1}}"-->
              <el-button>查看详情 ></el-button>
            </router-link>
          </div>
          <div class="selfWorkprocess">
            <!--<co-progress background="#fd7416" type="circle" :width="60" :percentage="90"></co-progress>-->
          </div>
        </div>

      </div>
      <div class="seeMore" @click="showmore" v-if="this.totalCount1>this.list.length">
        展开更多
        <i class="el-icon-tickets"></i>
      </div>
    </div>
  </div>
</template>
<script>
    import echarts from 'echarts'
    // import coProgress from '../../../components/common/progress.vue'
    import api from './api'

    let Util = null
    export default {
        props: ['operailityData'],
        data () {
            return {
                mouth: '',
                myProjectprecent: '',//科目掌握度
                valuemyProjectprecentNumofquestion: '',
                passGrade1: JSON.stringify(new Date().getMonth() + 1),
                passGradeRanking1: JSON.stringify(new Date().getMonth() + 1),
                options: [
                    {
                        value: '1',
                        label: '一月',
                    }, {
                        value: '2',
                        label: '二月',
                    }, {
                        value: '3',
                        label: '三月',
                    }, {
                        value: '4',
                        label: '四月',
                    }, {
                        value: '5',
                        label: '五月',
                    }, {
                        value: '6',
                        label: '六月',
                    }, {
                        value: '7',
                        label: '七月',
                    }, {
                        value: '8',
                        label: '八月',
                    }, {
                        value: '9',
                        label: '九月',
                    }, {
                        value: '10',
                        label: '十月',
                    }, {
                        value: '11',
                        label: '十一月',
                    }, {
                        value: '12',
                        label: '十二月',
                    },],

                value: '',
                totalCount: 0,
                totalCount1: 0,
                grade: this.operailityData.grade,
                subject: 'Chinese',
                term: this.operailityData.term,
                year: this.operailityData.year,
                alreadywork: [
                    {
                        teacher: '王老师',
                        origin: '班级群',
                        time: '布置时间：2013-08-09 10：00',
                        name: '汉语练习作业',
                        title: '已完成',
                    }, {
                        teacher: '王老师',
                        origin: '班级群',
                        time: '布置时间：2013-08-09 10：00',
                        name: '汉语练习作业',
                        title: '已完成',
                    }, {
                        teacher: '王老师',
                        origin: '班级群',
                        time: '布置时间：2013-08-09 10：00',
                        name: '汉语练习作业',
                        title: '已完成',
                    }],
                selectHomeworkNum: '1',
                selectDate: '1',
                selectbefore: '1',
                GradeRankBefore: '1',
                radio: '1',
                bookBtn: [],
                LastTableData: [],
                queryQptions1: {},
                list: [],
                precentNumofquestion: {},//近日做题量
                percentNumData: [],//近日做题量数据
                porjectCatch: {},//科目掌握度
                chapter: [],//章节
                chapterValue: [],
                formValidate: {},
                porjectLevel: [],//科目掌握度数据
            }
        },
        created () {
            this.init()
            console.log(this.operailityData)
        },
        updated () {
            this.init()
            console.log(this.operailityData)
        },
        mounted () {



            //this.drawmyProjectprecentNumofquestion()//近日做题量
            this.passGrade()//历次成绩走势图
            this.passGradeRanking()//历次班组排名

            this.bookBtn = this.$store.state.app.envs.gradeMap[this.grade]

        },
        methods: {
            init () {
                this.queryQptions1 = {
                    url: api.myQuestionDetailList.path,
                    params: {
                        curPage: 1,
                        pageSize: 3,
                        problemId: '',
                    },
                },
                    this.drawRadarData()//雷达图
                this.drawProjectPerData()//科目掌握度
                this.drawmyProjectprecentNumofquestionData()//近日做题量
                this.passGradeData()//历次成绩走势图
                this.passGradeRankingData()//历次班组排名
                Util = this.$util
                this.myPages = Util.pageInitPrams
                this.queryQptions = {
                    url: api.myQuestionDetailList.path,
                    params: {
                        curPage: 1,
                        pageSize: Util.pageInitPrams.pageSize,
                    },
                }
                this.setTableData()//分析测评
            },
            change () {
                console.log(1)
                this.init()
            },
            getList () {//获取已完成作业
                this.ajax({
                    ajaxSuccess: this.listData,
                    ajaxParams: this.queryQptions1,
                })
            },
            listData (res) {
                this.totalCount1 = res.data.dataList.totalCount
            },
            setTableData (isLoading) {
                this.formValidate = {
                    grade: this.grade,
                    subject: this.subject,
                    term: this.term,
                }
                this.queryQptions.params = Object.assign(this.queryQptions.params, this.formValidate)
                this.ajax({
                    ajaxSuccess: this.listDataSuccess,
                    ajaxParams: this.queryQptions,
                }, isLoading)
            },
            listDataSuccess (res) {//获取分析列表
                this.queryQptions = res.data.dataList
                this.totalCount = res.data.dataList.totalCount || 0
            },
            drawRadarData () {//雷达图数据
                this.ajax({
                    ajaxSuccess: this.queryChapterLevelListSuccess,
                    ajaxParams: {
                        //baseURL:'PUBLIC',
                        url: api.queryChapterLevelList.path,
                        params: {
                            grade: this.grade,
                            subject: this.subject,
                            term: this.term,
                            studentId: this.operailityData.studentId,

                        },
                    },
                })
            },
            queryChapterLevelListSuccess (res) {
                this.chapter = []
                for (var i = 0; i < res.data.dataList.length; i++) {
                    var m = {}
                    m = {name: res.data.dataList[i].name, max: 100}
                    this.chapter.push(m)
                    this.chapterValue[i] = res.data.dataList[i].level * 100 || 0
                }
                this.drawRadar()
            },
            drawProjectPerData () {//科目掌握度
                if (this.myProjectprecent) {
                    this.porjectCatch = {
                        grade: this.grade,
                        subject: this.subject,
                        term: this.term,
                        date: this.year + '-' + this.myProjectprecent,
                        studentId: this.operailityData.studentId,
                    }
                } else {
                    this.porjectCatch = {
                        grade: this.grade,
                        subject: this.subject,
                        term: this.term,
                        date: '',
                        studentId: this.operailityData.studentId,
                    }
                }
                this.ajax({
                    ajaxSuccess: 'drawProjectPerDataSuccess',
                    ajaxParams: {
                        //baseURL:'PUBLIC',
                        url: api.querySubjectLevelList.path,
                        params: this.porjectCatch,
                    },
                })
            },
            drawProjectPerDataSuccess (res) {//科目掌握度获取成功
                console.log(this.porjectLevel)
                if (this.myProjectprecent) {
                    var dataTime = []
                    var dataTrue = []

                    for (var i = 0; i < res.data.length; i++) {
                        dataTime[i] = res.data[i].year + '-' + res.data[i].month + '-' + res.data[i].day
                        dataTrue[i] = res.data[i].level || 0

                    }
                    this.porjectLevel = [dataTime, dataTrue,]
                } else {
                    var dataTime = []
                    var dataTrue = []
                    var total = []
                    for (var i = 0; i < res.data.length; i++) {

                        dataTime[i] = res.data[i].date
                        dataTrue[i] = res.data[i].level || 0
                    }
                    this.porjectLevel = [dataTime, dataTrue,]

                }
                console.log(this.porjectLevel)
                this.drawProjectPer()//科目掌握度
                //this.drawmyProjectprecentNumofquestion()

            },
            drawmyProjectprecentNumofquestionData () {//近日做题量

                if (this.valuemyProjectprecentNumofquestion) {
                    this.precentNumofquestion = {
                        grade: this.grade,
                        subject: this.subject,
                        term: this.term,
                        date: this.year + '-' + this.valuemyProjectprecentNumofquestion,
                        studentId: this.operailityData.studentId,
                    }
                } else {
                    this.precentNumofquestion = {
                        grade: this.grade,
                        subject: this.subject,
                        term: this.term,
                        date: '',
                        studentId: this.operailityData.studentId,
                    }
                }
                this.ajax({
                    ajaxSuccess: 'drawmyProjectprecentNumofquestionDataSuccess',
                    ajaxParams: {
                        //baseURL:'PUBLIC',
                        url: api.queryQuestionsNumList.path,
                        params: this.precentNumofquestion,
                    },
                })
            },
            drawmyProjectprecentNumofquestionDataSuccess (res) {//获取近日做题量成功
                if (this.valuemyProjectprecentNumofquestion) {
                    var dataTime = []
                    var dataTrue = []
                    var dataFalse = []
                    var total = []
                    for (var i = 0; i < res.data.length; i++) {
                        dataTime[i] = res.data[i].year + '-' + res.data[i].month + '-' + res.data[i].day
                        dataTrue[i] = res.data[i].answerTrueNums || 0
                        dataFalse[i] = res.data[i].answerFalseNums || 0
                        total[i] = res.data[i].answerTrueNums || 0 + res.data[i].answerFalseNums || 0
                    }
                    this.percentNumData = [dataTime, total, dataTrue, dataFalse]
                } else {
                    var dataTime = []
                    var dataTrue = []
                    var dataFalse = []
                    var total = []
                    for (var i = 0; i < res.data.length; i++) {
                        dataTime[i] = res.data[i].date
                        dataTrue[i] = res.data[i].answerTrueNums || 0
                        dataFalse[i] = res.data[i].answerFalseNums || 0
                        total[i] = res.data[i].answerTrueNums || 0 + res.data[i].answerFalseNums || 0
                    }
                    this.percentNumData = [dataTime, total, dataTrue, dataFalse]

                }
                this.drawmyProjectprecentNumofquestion()
            },
            passGradeData () {//历次成绩走势图

            },
            passGradeRankingData () {//历次班组排名

            },
            selectTime (i) {//科目掌握度
                this.selectDate = i

            },
            selectHomeworkNum1 (i) {//近日做题量
                this.selectHomeworkNum = i
            },
            selectbefore1 (num) {//历次作业成绩走势图
                this.selectbefore = num
            },
            selectGradeRankBefore (num) {//历次班组排名
                this.GradeRankBefore = num
            },

            showmore () {
                this.queryQptions1.params.curPage++
                this.getList()
            },
            drawRadar () {//雷达图

                // return false
                let myChart = echarts.init(document.getElementById('myRadarChart'))
                if (this.chapter.length == 0) {
                    return false
                }
                myChart.setOption({
                    title: {
                        text: '',
                    },
                    tooltip: {},
                    legend: {
                        data: ['', ''],
                    },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5],
                            },
                        },
                        // indicator:[{}],
                        indicator: this.chapter,
//                        indicator:  [
//                            {name: '第一章', max: 100},
//                            {name: '第二章', max: 100},
//                            {name: '第三章', max: 100},
//                            {name: '第四章', max: 100},
//                        ],
                    },
                    series: [
                        {
                            name: '章节掌握度',
                            type: 'radar',
                            // areaStyle: {normal: {}},
                            data: [
                                {
                                    value: this.chapterValue,
                                    // value:   [50, 40, 70, 100],
                                    name: '掌握百分比(%)',
                                },
                            ],
                        }],
                })

            },
            drawProjectPer () {//科目掌握度图

                console.log(this.porjectLevel)
                let myProjectprecent = echarts.init(document.getElementById('myProjectprecent'))
                myProjectprecent.setOption({
                    tooltip: {
                        trigger: 'axis',
                    },
                    toolbox: {
                        show: true,
                        feature: {},
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.porjectLevel[0],
                        // data: ['8月11日', '8月12日', '8月13日', '8月14日', '8月15日', '8月16日', '8月17日'],
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}',
                        },
                    },
                    series: [
                        {
                            name: '掌握度',
                            type: 'line',
                            data: this.porjectLevel[1],

                            markLine: {
                                data: [],
                            },
                        },
                    ],
                })
            },
            drawmyProjectprecentNumofquestion () {
                //myProjectprecent-numofquestion
                // console.log(this.percentNumData)
                let aa = echarts.init(document.getElementById('myProjectprecent-numofquestion'))
                aa.setOption({
                    tooltip: {
                        trigger: 'axis',
                    },
                    toolbox: {
                        show: true,
                        feature: {},
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.percentNumData[0],
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} ',
                        },
                    },
                    series: [
                        {
                            name: '做题量',
                            type: 'line',
                            data: this.percentNumData[1],
                            markLine: {
                                data: [],
                            },
                        },
                        {
                            name: '答对数',
                            type: 'line',
                            data: this.percentNumData[2],
                            markLine: {
                                data: [],
                            },
                        },
                        {
                            name: '答错数',
                            type: 'line',
                            data: this.percentNumData[3],
                            markLine: {
                                data: [],
                            },
                        },

                    ],
                })
            },
            passGrade () {
                //myProjectprecent-numofquestion
                let aa = echarts.init(document.getElementById('passGrade'))
                aa.setOption({
                    tooltip: {
                        trigger: 'axis',
                    },
                    toolbox: {
                        show: true,
                        feature: {},
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['8月11日', '8月12日', '8月13日', '8月14日', '8月15日', '8月16日', '8月17日'],
                    },
                    yAxis: {
                        type: '',
                        axisLabel: {
                            formatter: '{} ',
                        },
                    },
                    series: [
                        {
                            name: '分数',
                            type: 'line',
                            data: [30, 60, 80, 56, 100, 70, 39],

                            markLine: {
                                data: [],
                            },
                        },
                    ],
                })
            },
            passGradeRanking () {
                //myProjectprecent-numofquestion
                let aa = echarts.init(document.getElementById('passGradeRanking'))
                aa.setOption({
                    tooltip: {
                        trigger: 'axis',
                    },
                    toolbox: {
                        show: true,
                        feature: {},
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['8月11日', '8月12日', '8月13日', '8月14日', '8月15日', '8月16日', '8月17日'],
                    },
                    yAxis: {
                        type: '',
                        axisLabel: {
                            formatter: '{} ',
                        },
                    },
                    series: [
                        {
                            name: '分数',
                            type: 'line',
                            data: [30, 60, 80, 56, 100, 70, 39],

                            markLine: {
                                data: [],
                            },
                        },
                    ],
                })
            },
        },
        components: {},

    }
</script>
<style lang="scss">
  .growthArchives-root {
    width: 950px;
    border-radius: 5px;
    background-color: #ffffff;
    margin: 0 auto;
    text-align: center;
    padding: 30px;
    padding-top: 0;
    button {
      cursor: pointer;
    }
    .growthArchives-myTable .el-table__body-wrapper {
      overflow: hidden;
    }
    h1 {
      font-size: 30px;
    }
    .focus {
      background-color: #fd7416 !important;
      color: #ffffff !important;
      border: none !important;
    }

    #myTable {
      padding: 0 0px;
      .el-table thead {
        tr {
          background-color: #e6f9ec;
          color: #11a63f;
          text-align: center;
        }
      }
    }

    .groupsDetailtitle {

      margin-left: 30px;
      font-size: 16px;
      margin-top: 30px;
      padding-bottom: 20px;
      div {
        height: 23px;
        float: left;
        width: 4px;
        border-radius: 1px;
        background-color: #11a63f;
      }
    }
    .seeHistory {
      float: right;
      margin-left: 10px;
      height: 30px;
      border-radius: 3px;
      background-color: #ffffff;
      border: solid 1px #cccccc;
      padding: 0 12px;
      font-size: 12px;
      line-height: 30px;
      color: #898989;
    }
    .select-project {
      height: 60px;
      border-radius: 5px;
      background-color: #f5f5f5;
      line-height: 60px;
    }
    .groupsDetailtitle {
      text-align: left;
      margin-left: 0;
    }
    .know-access {
      height: 300px;
      border-radius: 5px;
      background-color: #f5f5f5;
      text-align: center;
    }
    .growthArchives-root-timeborder {
      width: 100px;
      float: right;
      button {
        margin-bottom: 10px;
      }
    }
    .myProjectprecent {
      top: -50px
    }

    .selfWork {
      height: 121px;
      width: 890px;
      border: 1px solid #e5e5e5;
      margin-bottom: 30px;
      p {
        font-size: 12px;
        padding-left: 20px;
        height: 39px;
        background: #e7f9ed;
        line-height: 39px;
        border-bottom: 1px solid #e5e5e5;
        span {
          color: #a0a0a0;
          float: right;
          margin-right: 20px;
        }
      }
    }
    .selfWorkname {
      ul {
        float: left;
        padding-left: 20px;
        font-size: 12px;
        color: #a0a0a0;
        margin-top: 17px;
        line-height: 30px;
        .title {
          color: black;
          font-size: 14px;
          line-height: 18px;
          .ulleft {
            float: left;
          }
          span {
            float: left;
            display: block;
            background: #fd4344;
            height: 18px;
            line-height: 18px;
            font-size: 9px;
            -webkit-transform: scale(0.75);
            width: 47px;
            text-align: center;
            color: white;
            border-radius: 4px;
            margin-left: 5px;
          }
        }
        .sec {
          float: left;
          .alreadyComplate {
            color: #fd7416;
          }
        }
      }

    }
    .selfready {
      width: 170px;
      border-left: 1px solid #e5e5e5;
      float: right;
      text-align: center;
      height: 81px;
      button {
        font-size: 13px;
        color: #ffffff;
        margin-top: 15px;
        width: 110px;
        height: 40px;
        border-radius: 3px;
        background-color: #fd7416;
        border: none;
      }
      .show-detail {
        border-radius: 3px;
        background-color: #ffffff;
        border: solid 1px #cccccc;
        text-align: center;
        font-size: 13px;
        color: #898989;
      }

    }
    .selfWorkprocess {
      float: right;
      width: 120px;
      border-left: 1px solid #e5e5e5;
      float: right;
      text-align: center;
      height: 81px;
      padding-top: 10px;
    }
    .seeMore {
      width: 890px;
      height: 26px;
      text-align: center;
      font-size: 13px;
      line-height: 26px;
      color: #898989;
      background-color: #f5f5f5;
      margin-top: 20px;
    }
  }

  .vis {
    visibility: hidden;
  }
</style>