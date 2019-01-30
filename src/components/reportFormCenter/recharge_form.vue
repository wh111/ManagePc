<template>
  <div class="recharge">
    <el-row :offset="2" style="padding-top:15px;">
      <el-form ref="form" :inline="true" v-model="form" class="demo-form-inline">
        <el-col>历史统计</el-col>
        <el-form-item label="历史充值总金额：">
          <span style="font-size: 14px;font-weight: 500">{{InMoneyData.inAmount / 100 || 0 }}（鲁教学币）</span>
        </el-form-item>
        <br>
        <el-form-item label="历史开通会员总金额：">
          <span style="font-size: 14px;font-weight: 500">{{ InMoneyData.openVipAmount || 0 | money}}</span>
        </el-form-item>
        <br>
        <!--<el-row>-->
        <!--<el-col>支出</el-col>-->
        <!--<el-form-item label="提现">¥500</el-form-item>-->
        <!--<el-form-item label="提现成功">¥2567</el-form-item>-->
        <!--<el-form-item label="支出">¥7800</el-form-item>-->
        <!--</el-row>-->
        <el-form-item label="日期：">
          <el-date-picker v-model="form.date" type="daterange" :editable="false"
                          :picker-options="pickerOptions" @change="changeDate"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!--<ve-line style="padding-left: 20px" :data="chartData" :settings="chartSettings" :loading="lineLoading"-->
      <!--:tooltip="tooltip"></ve-line>-->
      <!--<ve-line style="padding-left: 20px" :data="payData" :settings="paySettings" :loading="lineLoading"-->
      <!--:tooltip="tooltip"></ve-line>-->
      <el-col :offset="2">
        <p class="passGrade1-p" v-if="chartData.length <= 0">暂无充值记录</p>
      </el-col>
      <div style="clear: both"></div>
      <div style="height: 400px;" id="questionsTypes"></div>
      <div style="clear: both"></div>
    </el-row>
  </div>
</template>
<script>
    let Util = null
    import api from './api'
    import echarts from 'echarts'

    export default {
        data () {
            return {

                lineLoading: true,
                chartData: [],
                payData: [],
                payDateObj: {},
                chartSettings: {
                    metrics: ['充值总金额'],
                    dimension: ['充值日期'],
                },
                paySettings: {
                    metrics: ['充值人数'],
                    dimension: ['充值日期'],
                },
                InMoneyData: {},
                form: {
                    date: [],
                },
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                                picker.$emit('pick', [start, end])
                            },
                        }, {
                            text: '最近一个月',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                                picker.$emit('pick', [start, end])
                            },
                        }, {
                            text: '最近三个月',
                            onClick (picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                                picker.$emit('pick', [start, end])
                            },
                        }],
                },
            }
        },
        created () {
            this.tooltip = {
                trigger: 'axis',
                formatter: params => {
                    let str = []
                    params.map(data => {
                        let unit = '鲁教学币' // 单位
                        if (data.seriesName == '充值人数') {
                            unit = '人'
                        }
                        if (!str.length) {
                            str.push(`<p>${data.axisValue}</p>`)
                        }
                        str.push(
                            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${data.color}"></span>${data.seriesName}：${data.value} ${unit}<br/>`)
                    })
                    return str.join('')
                },
            }
            this.init()
        },
        methods: {
            init () {
                this.form.date = [new Date(this.getBeforeDate(7)), new Date()]
                this.ajax({
                    ajaxSuccess: res => {
                        this.InMoneyData = res.data
                    },
                    ajaxParams: {
                        url: api.statisticsBInMoney.path,
                    },
                })
                this.getBInMoney()
            },
            /*
            * 获取充值记录
            * **/
            getBInMoney () {
                this.lineLoading = true
                this.ajax({
                    ajaxSuccess: this.chartSet,
                    ajaxParams: {
                        url: api.statisticsBInMoneyLine.path,
                        params: {
                            startDate: this.conductDate(this.form.date[0], 'yyyy-MM-dd'),
                            endDate: this.conductDate(this.form.date[1], 'yyyy-MM-dd'),
                        },
                    },
                })
            },
            changeDate (arr) {
                arr && this.getBInMoney()
            },
            drawRadar () {
                var dateArr = []
                var moneyList = []
                var chartData = this.chartData
                var payData = this.payData
                var len = chartData.length
                if (len <= 0) {
                    document.getElementById('questionsTypes').style.visibility = 'hidden'
                } else {
                    document.getElementById('questionsTypes').style.visibility = 'visible'
                }
                chartData.map((item) => {
                    dateArr.push(item.date)
                    moneyList.push(item.money)
                })
                let _this = this
                let myChart = echarts.init(document.getElementById('questionsTypes'))
                let option = {
                    title: {
                        text: '',
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (tipsObj) {
                            tipsObj = tipsObj[0]
                            let tips = []
                            tips.push(tipsObj.axisValueLabel)
                            tips.push('<br>')
                            tips.push(
                                `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#c23531;"></span>`)
                            tips.push(`充值总金额: ${tipsObj.data}`)
                            tips.push('<br>')
                            tips.push(
                                `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#a7c22c;"></span>`)
                            tips.push(`充值总人数: ${_this.payDateObj[tipsObj.axisValueLabel].num}`)
                            return tips.join('')
                        },
                    },

                    legend: {
                        data: ['充值情况'],
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {},
                        },
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dateArr,
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            name: '充值总金额',
                            type: 'line',
                            stack: '总量',
                            data: moneyList,
                        },
//                        {
//                            name:'充值人数',
//                            type:'line',
//                            stack: '总量',
//                            data:chartData
//                        },
                    ],
                }
                myChart.setOption(option)
            },
            chartSet (res) {

                let data = res.data
                let rows = []
                let payRows = []
                let payDateObj = {}
                data.sort((a, b) => a.dates > b.dates)
                data.map(item => {
                    let date = this.conductDate(item.dates, 'MM月dd日')
                    let info = {
                        num: item.totalNums,
                        money: item.totalMoney / 100,
                        date,
                    }
                    rows.push(info)
                    payDateObj[date] = info

//                    payRows.push({
//                        num: item.totalNums,
//                        date: this.conductDate(item.dates, 'MM月dd日'),
//                    })
                })
//                this.lineLoading = false;
                this.chartData = rows//金额
                this.payData = payRows//人数
                this.payDateObj = payDateObj

                this.drawRadar()
            },
            getBeforeDate (n) {
                let d = new Date()
                let year = d.getFullYear()
                let mon = d.getMonth() + 1
                let day = d.getDate()
                let s
                if (day <= n) {
                    if (mon > 1) {
                        mon = mon - 1
                    } else {
                        year = year - 1
                        mon = 12
                    }
                }
                d.setDate(d.getDate() - n)
                year = d.getFullYear()
                mon = d.getMonth() + 1
                day = d.getDate()
                s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day)
                return s
            },
        },
        mounted () {

        },
    }
</script>
<style lang="scss" scoped>
  .recharge {
    background: #ffffff;
    border-radius: 5px;
  }

  .el-form {
    margin-left: 35px;
    .el-col {
      font-size: 18px;
      line-height: 30px;
    }
  }
</style>
