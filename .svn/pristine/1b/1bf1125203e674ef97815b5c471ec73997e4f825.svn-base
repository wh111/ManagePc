<template>
    <el-row class="recharge">
        <el-form ref="form" :inline="true" v-model="form" class="demo-form-inline">
            <el-col style="padding-top:15px;">活跃统计</el-col>
            <!--<el-col style="padding-top:15px;">-->
            <!--<el-col>今日浏览量统计</el-col>-->
            <!--<el-form-item label="今日浏览量">{{ todayViewNum }}</el-form-item>-->
            <!--</el-col>-->
            <el-col>
                <el-form-item label="日期：">
                    <el-date-picker v-model="form.date" type="daterange" :editable="false"
                                    :picker-options="pickerOptions" @change="changeDate"
                                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-form>
        <el-col style="padding: 0 20px">
            <ve-line :data="chartData" :settings="chartSettings" :loading="lineLoading" :tooltip="tooltip"></ve-line>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    date: []
                },
                lineLoading: false,
                todayViewNum: 0, // 今日访问量
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
                }
            }
        },
        created() {
            this.chartData = {
                columns: ['日期', '学生登录人数'],
                rows: [
                    // {'学生登陆人数': 1523, '日期': '08月09日'}
                ]
            }
            this.chartSettings = {
                metrics: ['学生登录人数'],
                dimension: ['日期']
            }
            this.tooltip = {
                trigger: 'axis',
                formatter: params => {
                    let str = [];
                    params.map(data => {
                        let unit = '人'; // 单位
                        if (!str.length) {
                            str.push(`<p>${data.axisValue}</p>`)
                        }
                        str.push(`<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${data.color}"></span>${data.seriesName}：${data.value} ${unit}<br/>`)
                    });
                    return str.join('')
                }
            }
            this.init()
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
                        if (res.data instanceof Array) {
                            this.todayViewNum = res.data[0].studentLoginNums || 0;
                        }
                    },
                    ajaxParams: {
                        url: '/statistics/login/lineChart',
                        method: 'get',
                        params: {
                            startDate: this.conductDate(new Date(), 'yyyy-MM-dd'),
                            endDate: this.conductDate(new Date(), 'yyyy-MM-dd')
                        }
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
                                    '学生登录人数': item.studentLoginNums,
                                })
                            })
                        }
                        this.lineLoading = false;
                        this.chartData.rows = temp;
                    },
                    ajaxParams: {
                        url: '/statistics/login/lineChart',
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
