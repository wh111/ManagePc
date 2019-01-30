<template>
    <div class="test_result" style="width: 100%">
        <template v-if="answerResult instanceof Object">
            <h2 class="titleText">《{{ answerResult.title }}》</h2>
            <h3 class="titleText">{{ userName }}的测评结果分析</h3>
            <p class="title">
                <span>本次测评得分：<i style="color: #fd7416">{{answerResult.totalScore / 100}}</i>分</span>
                <span>用时：<i>{{answerResult.useTime / 1000 | formatTimes}}</i></span>
                <span>答对：<i style="color:#11a63f">{{answerResult.answerTrueNum}}</i>道题</span>
                <span>答错：<i style="color:#fc4341">{{answerResult.answerFalseNum}}</i>道题</span>
            </p>
            <div class="clearfix">
                <div class="item left" style="margin-right: 25px;width: 432px;">
                    <span class="icon-left"><i></i>正确率</span>
                    <div class="content" style="text-align: center;position: relative">
                        <span style="position: absolute;top: 33px;left: 191px;">正确率</span>
                        <co-progress background="#fd7416" type="circle"
                                     :percentage="getAnswerAccuracy()"></co-progress>
                    </div>
                </div>
                <div class="item left" style="width: 432px;">
                    <span class="icon-left"><i></i>试卷难度</span>
                    <div class="content inside">
                        <p class="numText">难度值：<i>{{answerResult.diffLevel}}</i></p>
                        <ul class="diffBox" :style="{width: 69 * answerResult.diffReslutList.length + 'px'}">
                            <li class="diffItem" v-for="(item,index) in answerResult.diffReslutList" :key="index">
                                <p class="diffTitle" :class="[item.diffLevelCode]">{{ item.diffLevelName }}</p>
                                <p class="diffNum">{{item.total}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="item">
                <span class="icon-left"><i></i>测评结果</span>
                <div class="content" style="height: auto;padding: 10px;">
                    <p class="time">{{ answerResult.updateTime | formatDate('yyyy-MM-dd HH:mm:ss') }}</p>
                    <p class="tip">{{ userName }}完成系统根据其能力进行的自选测评，进行了综合测试，
                        主要知识点为{{ getAnswerKnowledgeList() }}，
                        共答题{{ answerResult.questionsCount }}题，
                        答对{{ answerResult.answerTrueNum }}题，
                        得分为{{ answerResult.totalScore / 100 }}分，
                        正确率为{{ getAnswerAccuracy() }}%，
                        测评结果为{{ answerAccuracy(getAnswerAccuracy()) }}。
                    </p>
                </div>
            </div>


            <div class="item">
                <span class="icon-left"><i></i>做题详情</span>
                <el-button class="right show-paper" @click="showModal = true">查看试卷
                    <i class="el-icon-arrow-right"></i></el-button>
                <div class="content" style="height: auto;">
                    <p class="detial" v-for="(item,index) in answerResult.knowledgeList" :key="index">
                        {{item.knowledgeName}}：
                        <!--<router-link v-for="(child,ind) in item.stuAnswerInfo" :key="ind" target="_blank"-->
                        <!--:to='{path:"/selfCenter/myNoteAdd",query:{questionId:child.questionsId,assessmentId:id,types:testType}}'>-->
                        <span v-for="(child,ind) in item.stuAnswerInfo" :key="ind"
                              :class="child.answerResult == true ? 'green' : 'red' ">
                                {{child.questionsSeq}}
                            </span>
                        <!--</router-link>-->
                    </p>
                </div>
            </div>
            <div class="item">
                <span class="icon-left"><i></i>分项测评结果</span>
                <div id="myTable" ref="myTable">
                    <el-table
                            :data="tableData"
                            :span-method="objectSpanMethod"
                            border
                            style="width: 100%">
                        <el-table-column class="cTitle"
                                         prop="chapterName"
                                         label="章节"
                                         align="center">
                        </el-table-column>
                        <el-table-column
                                prop="knowledgeName"
                                label="考核内容"
                                align="center"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                prop="totalScore"
                                label="分值"
                                align="center">
                            <template slot-scope="scope">
                                {{scope.row.totalScore}}分
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="score"
                                label="成绩"
                                align="center">
                            <template slot-scope="scope">
                                {{scope.row.score}}分
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="correctRate"
                                label="正确率"
                                align="center">
                            <template slot-scope="scope">
                                {{parseInt(scope.row.correctRate * 100)}} %
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="item">
                <span class="icon-left"><i></i>提升建议</span>
                <div class="content" style="height: auto;">
                    <p class="tip" style="padding: 20px;">{{ answerResult.advise }}</p>
                </div>
            </div>
            <div class="clearfix">
                <div class="item left" style="margin-right: 25px;width: 432px;">
                    <span class="icon-left"><i></i>做题速度</span>
                    <div class="content">
                        <co-progress background="#fd7416" style="margin-left: 20px;" type="circle"
                                     :percentage="answerResult.speedPercent"></co-progress>
                        <div class="analytic right">
                            <div class="name">做题速度分析：</div>
                            <div class="name-content">你的做题速度超过了{{answerResult.speedPercent}}%的全国学生！
                                继续努力，加油练习。
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item left" style="width: 432px;">
                    <span class="icon-left"><i></i>做题得分</span>
                    <div class="content">
                        <co-progress background="#fd7416" style="margin-left: 20px;" type="circle"
                                     :percentage="answerResult.scorePercent"></co-progress>
                        <div class="analytic right">
                            <div class="name">得分分析：</div>
                            <div class="name-content">你的得分超过了{{answerResult.scorePercent}}%的全国学生！
                                继续努力，加油练习。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <p class="errMsg">
                <span class="el-icon-loading"></span>
                数据加载中
            </p>
        </template>
        <!--查看试卷-->
        <Modal
                :mask-closable="false"
                width="810"
                v-model="showModal"
                title="查看试卷"
                class-name="vertical-center-modal"
                :loading="loading">
            <modal-header slot="header" :content="showId"></modal-header>
            <show v-if="showModal" :operailityData="operailityData"></show>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null
    import api from './api'
    import show from './evaluationManagement_detail'
    import coProgress from '../../common/progress'

    export default {
        props: ['operailityData', 'testType'],
        data() {
            return {
                userName: '',
                showId: {
                    id: 'showId',
                    title: '查看试卷'
                },
                loading: false,
                tableData: [],
                answerResult: null,
                gamesAnswerId: ''
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util;
                this.userName = this.operailityData.studentName;
                this.getAnswerResult()
            },
            getAnswerAccuracy() {
                return isNaN(this.answerResult.answerTrueNum / this.answerResult.questionsCount) ? 0 : Number((this.answerResult.answerTrueNum / this.answerResult.questionsCount * 100).toFixed(1))
            },
            answerAccuracy(val) {
                return val > 50 ? (val > 80 ? '优秀' : '良好') : '略差'
            },
            getAnswerKnowledgeList() {
                let t = [];
                let data = this.$util._.defaultsDeep([], this.answerResult.knowledgeList);
                data.sort((a, b) => a.stuAnswerInfo.length < b.stuAnswerInfo.length);
                for (let i = 0, l = data.length; i < l; i++) {
                    t.push(data[i].knowledgeName);
                    if (i > 1) {
                        break
                    }
                }
                return t.join('、')
            },
            getAnswerResult() {
                let opt = {
                    ajaxSuccess: this.answerResultCall,
                    ajaxParams: {
                        url: api.get.path,
                        method: api.get.method,
                        params: {
                            id: this.operailityData.id
                        }
                    }
                }
                this.ajax(opt)
            },
            answerResultCall(res) {
                this.answerResult = res.data;
                let tempArr = [];
                //处理序号合并单元格的数据
                res.data.chapterInfoList.map(item => {
                    item.number = item.stuChapterInfoList.length;
                    if (item.number) {
//                        tempArr.push({
//                            ...item,
//                            ...item.stuChapterInfoList[0]
//                        })
                        if (item.stuChapterInfoList.length > 1) {
                            item.stuChapterInfoList.map((it, index) => {
                                if (index == 0) return;
                                tempArr.push(it);
                            })
                        }
                    }
                })
                this.tableData = tempArr;
                this.$emit('setData', res.data)
            },
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (column.property == 'chapterName') {
                    if (row.number) {
                        return {
                            rowspan: row.number || 1,
                            colspan: 1
                        }
                    } else {
                        return [0, 0]
                    }

                }
            },
            /**
             * 回调函数
             * **/
            subCallback() {

            },
            /**
             * 回调函数
             * **/
            cancel() {

            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        components: {
            coProgress,
            show
        }
    }

</script>
<style lang="scss">
    .test_result {
        padding: 0 30px 30px;
        .titleText {
            text-align: center;
            padding-bottom: 20px
        }
        .errMsg {
            line-height: 470px;
            text-align: center;
        }
        .title {
            font-weight: 500;
            font-size: 14px;
            border-radius: 5px;
            background-color: #f5f5f5;
            line-height: 60px;
            span {
                margin-left: 90px;
            }
        }
        .diffBox {
            margin: 10px auto 0;
            overflow: hidden;
            .diffItem {
                float: left;
                width: 65px;
                text-align: center;
                line-height: 34px;
                margin: 0 2px;
                &:first-child .diffTitle {
                    border-radius: 15px 0 0 15px;
                    background-color: #1fa940;
                }
                &:last-child .diffTitle {
                    border-radius: 0 15px 15px 0;
                    background-color: #fd4b42;
                }
                &:nth-child(2) .diffTitle {
                    background-color: #8db649;
                }
                &:nth-child(3) .diffTitle {
                    background-color: #f6b650;
                }
                &:nth-child(4) .diffTitle {
                    background-color: #fd7548;
                }
            }
            .diffTitle {
                color: #fff;
            }
        }
        .item {
            margin-top: 20px;
            .icon-left {
                i {
                    display: inline-block;
                    width: 4px;
                    height: 13px;
                    margin-right: 5px;
                    background: #11a63f;
                }
            }
            .show-paper {
                border-radius: 12px;
                padding: 5px 14px;
                background-color: #ffffff;
                border: solid 1px #bfbfbf;
            }
            .content {
                background: #f5f5f5;
                height: 150px;
                padding: 10px 0;
                p {
                    line-height: 30px;
                }
                .analytic {
                    width: 260px;
                    padding: 28px 10px;
                    color: #434343;
                    .name {
                        font-size: 16px;
                        font-weight: bold;
                        line-height: 1.5;
                    }
                    .name-content {
                        font-size: 14px;
                        line-height: 1.43;
                    }
                }
                .detial {
                    line-height: 45px;
                    margin-left: 15px;
                    span {
                        display: inline-block;
                        width: 30px;
                        color: #ffffff;
                        line-height: 30px;
                        text-align: center;
                        border-radius: 15px;
                        margin-right: 10px;
                    }
                    .green {
                        background: #1cc03b;
                    }
                    .red {
                        background: red;
                    }
                }
                .el-progress--circle .el-progress__text {
                    font-size: 28px !important;
                    color: #fd7416;
                }
            }
            .inside {
                /*position: relative;*/
                /*span {*/
                /*position: absolute;*/
                /*top: 30px;*/
                /*left: 38%;*/
                /*}*/
                .numText {
                    text-align: center;
                    margin-top: 20px;
                    i {
                        color: #fd7416;
                    }
                }
                .el-progress-bar__inner {
                    background-color: #fd7416;
                }
                .el-progress--line {
                    margin-top: 13%;
                    width: 80%;
                }
                .el-progress-bar {
                    margin-left: 42px;
                    .el-progress-bar__innerText {
                        color: #fd7416;
                    }
                }
            }
            #myTable {
                .el-table thead {
                    tr {
                        background-color: #e6f9ec;
                        color: #11a63f;
                    }
                }
                /*.el-table_1_column_1 {*/
                /*background-color: #e6f9ec;*/
                /*color: #11a63f;*/
                /*}*/
                /*tbody {*/
                /*tr:first-child {*/
                /*td:first-child {*/
                /*background-color: #e6f9ec;*/
                /*color: #11a63f;*/
                /*}*/
                /*}*/
                /*}*/
            }
            .time {
                font-size: 12px;
                line-height: 1.5;
                text-align: left;
                color: #bfbfbf;
            }
            .tip {
                font-size: 14px;
                text-align: left;
                color: #434343;
            }
        }
    }
</style>