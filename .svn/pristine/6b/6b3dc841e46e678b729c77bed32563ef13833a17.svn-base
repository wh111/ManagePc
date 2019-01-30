<template>
    <div class="recharge">
        <el-form ref="form" :inline="true" v-model="form" class="demo-form-inline">
            <el-row style="padding-top:15px;">
                <el-col>做题量</el-col>
                <el-form-item label="历史做题总量：">{{ questionsNums }}</el-form-item>
            </el-row>
            <div>
                <el-form-item label="日期：">
                    <el-date-picker v-model="form.date" type="daterange" :editable="false"
                                    :picker-options="pickerOptions" @change="changeDate"
                                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <ve-line :data="chartData" :settings="chartSettings" :loading="lineLoading"
                         :tooltip="tooltip"></ve-line>
            </div>
            <!--<el-col>题目分布</el-col>-->
            <!--<el-table-->
            <!--:data="tableData"-->
            <!--style="width: 100%">-->
            <!--<el-table-column-->
            <!--prop="type"-->
            <!--label="题型"-->
            <!--align="center">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="num"-->
            <!--label="人数"-->
            <!--align="center">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="tl"-->
            <!--label="题量"-->
            <!--align="center">-->
            <!--</el-table-column>-->
            <!--</el-table>-->
            <!--<ve-pie :data="chartData1" :settings="chartSettings1"></ve-pie>-->
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                lineLoading: true,
                form: {
                    date: []
                    // startDate:'',
                    // endDate:''
                },
                questionsNums: 0, // 历史做题总数
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                tableData: [{
                    type: '选择题',
                    num: 37362,
                    tl: 329383
                }, {
                    type: '填空题',
                    num: 45662,
                    tl: 729383
                }, {
                    type: '问答题',
                    num: 5662,
                    tl: 9383
                }]
            }
        },
        created() {
            this.chartData = {
                // columns: ['日期', '今日做题人数', '今日做题量', '人均做题量', '做题正确率'],
                columns: ['日期', '做题人数', '做题量'],
                rows: [
                    // {'今日做题人数': 1523, '日期': '08月09日', '今日做题量': 1223},
                    // {'今日做题人数': 1223, '日期': '08月10日', '今日做题量': 2231},
                    // {'今日做题人数': 2123, '日期': '08月20日', '今日做题量': 1552},
                    // {'今日做题人数': 1123, '日期': '08月24日', '今日做题量': 1833},
                    // {'今日做题人数': 1238, '日期': '08月28日', '今日做题量': 1553},
                    // {'今日做题人数': 2123, '日期': '09月10日', '今日做题量': 1523}
                ]
            }
            this.chartSettings = {
                // metrics: ['今日做题人数', '今日做题量', '人均做题量', '做题正确率'],
                metrics: ['做题人数', '做题量'],
                dimension: ['日期']
            };
            this.tooltip = {
                trigger: 'axis',
                formatter: params => {
                    let str = [];
                    params.map(data => {
                        let unit = '道'; // 单位
                        if (data.seriesName == "做题人数") {
                            unit = '人'
                        }
                        if (!str.length) {
                            str.push(`<p>${data.axisValue}</p>`)
                        }
                        str.push(`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${data.color}"></span>${data.seriesName}：${data.value} ${unit}<br/>`)
                    });
                    return str.join('')
                }
            }
            this.chartData1 = {
                columns: ['题型', '占比', '其他'],
                rows: [
                    {'题型': '选择题', '占比': 0.50, '其他': 100},
                    {'题型': '填空题', '占比': 0.25, '其他': 100},
                    {'题型': '问答题', '占比': 0.25, '其他': 100}
                ]
            }
            this.chartSettings1 = {
                dimension: '题型',
                selectedMode: 'single',
                hoverAnimation: false,
                radius: 100,
                offsetY: 200
            }
            this.init();
        },
        methods: {
            init() {
                this.form.date = [new Date(this.getBeforeDate(7)), new Date()];
                this.getListData();
                this.getAllQuestionNum()
            },
            changeDate(arr) {
                arr && this.getListData()
            },
            getAllQuestionNum() {
                let opt = {
                    ajaxSuccess: res => {
                        this.questionsNums = res.data.questionsNums || 0;
                    },
                    ajaxParams: {
                        url: '/statistics/doQuestions/statistics',
                        method: 'get'
                    }
                }
                this.ajax(opt)
            },
            getListData() {
                let opt = {
                    ajaxSuccess: res => {
                        let temp = [];
                        let arr = res.data;
                        if (arr instanceof Array) {
                            arr.sort((a, b) => a.dates > b.dates);
                            arr.map(item => {
                                temp.push({
                                    '日期': this.conductDate(item.dates, 'MM月dd日'),
                                    '做题人数': item.studentNums,
                                    '做题量': item.questionsNums
                                })
                            })
                        }
                        this.lineLoading = false;
                        this.chartData.rows = temp;
                    },
                    ajaxParams: {
                        url: '/statistics/doQuestions/lineChart',
                        method: 'get',
                        params: {
                            startDate: this.conductDate(this.form.date[0], 'yyyy-MM-dd'),
                            endDate: this.conductDate(this.form.date[1], 'yyyy-MM-dd')
                        }
                    }
                }
                this.lineLoading = true;
                this.ajax(opt)
            },
            getBeforeDate(n) {
                let d = new Date();
                let year = d.getFullYear();
                let mon = d.getMonth() + 1;
                let day = d.getDate();
                let s;
                if (day <= n) {
                    if (mon > 1) {
                        mon = mon - 1;
                    } else {
                        year = year - 1;
                        mon = 12;
                    }
                }
                d.setDate(d.getDate() - n);
                year = d.getFullYear();
                mon = d.getMonth() + 1;
                day = d.getDate();
                s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
                return s;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .recharge {
        background: #ffffff;
        border-radius: 5px;
    }

    .el-form {
        margin-left: 35px;
    }

    .el-col {
        font-size: 18px;
        line-height: 30px;
    }
</style>
