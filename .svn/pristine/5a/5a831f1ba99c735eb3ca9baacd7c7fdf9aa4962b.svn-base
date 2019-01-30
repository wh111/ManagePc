<template>
    <div class="questionsPaper_show">
        <p class="paper-title" v-if="questionsData.paperName">{{ questionsData.paperName }}</p>
        <div class="question-item-wrap" v-for="(item,index) in questionsList" :key="index">
            <div>
                <span class="index">第{{item.seq + 1}}题</span>
                <div class="progress-wrap">
                    <co-progress class="diffLevelBox" :text-inside="true" :stroke-width="18"
                                 :percentage="Number((((item.diffLevel+3)/6)*100).toFixed(1))"></co-progress>
                    <span class="right ndz">难度值：<i style="color: #fd7416;">{{item.diffLevel}}</i></span>
                </div>
            </div>
            <div class="question-item-content">
                <question-show :show-data="item" :show-answer="true"></question-show>
            </div>
        </div>
    </div>
</template>
<script>
    let Util = null
    import api from './api'
    import coProgress from '../../common/progress'
    import questionShow from '../../common/questionShow/show'

    export default {
        props: ['operailityData'],
        data() {
            return {
                questionsList: [],
                questionsData: {
                    paperName: ''
                }
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util;
                let opt = {
                    ajaxSuccess: res => {
                        this.questionsData = res.data;
                        if (res.data instanceof Array) {
                            this.questionsList = res.data
                        } else {
                            this.questionsList = res.data.questionsList
                        }
                    },
                    ajaxParams: {
                        url: api.getAllAnswerQuestion.path,
                        method: api.getAllAnswerQuestion.method,
                        params: {
                            assessmentId: this.operailityData.id
                        }
                    }
                };
                this.ajax(opt)
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        components: {
            coProgress, questionShow
        }
    }
</script>

<style lang="scss">
    .questionsPaper_show {
        .paper-title {
            font-size: 20px;
            line-height: 1.54;
            text-align: center;
            color: #313131;
            padding-bottom: 20px;
            &:empty {
                display: none;
            }
        }
        .question-item-wrap {
            background: #f5f5f5;
            padding-top: 10px;
            margin-bottom: 40px;
            .index {
                font-size: 14px;
                font-weight: bold;
                line-height: 1;
                text-align: left;
                color: #11a63f;
                margin-left: 5px;
            }
            .progress-wrap {
                width: 190px;
                float: right;
                .ndz {
                    line-height: 14px;
                    margin-right: 5px;
                }
                .el-progress-bar__outer {
                    height: 10px !important;
                    .el-progress-bar__innerText {
                        color: #11A63F;
                    }
                }
            }
            .diffLevelBox {
                width: 100px;
                float: left;
                .el-progress-bar__inner {
                    background-color: transparent;
                    background-image: url("../../../assets/images/diffLevelBg.png");
                }
            }
            .question-item-content {
                height: auto;
                .answer {
                    padding: 10px 10px 0 20px;
                    width: 670px;
                    color: #434343;
                    font-size: 14px;
                    line-height: 30px;
                    /*border-right: 1px solid #cacaca;*/
                    display: inline-block;
                }
            }
            .right-answer {
                margin-top: 15px;
                font-size: 14px;
                line-height: 50px;
                border-radius: 3px;
                background-color: #fff7de;
                border: solid 1px #f8e1c3;
                span {
                    font-size: 14px;
                    font-weight: bold;
                    text-align: left;
                    color: #fd7416;
                }
                .mar-left {
                    margin-left: 19px
                }
            }
            .resolve-content {
                background: #fff7de;
                color: #fc4341;
                font-size: 14px;
                padding: 10px 10px 0 10px;
                line-height: 30px;
            }
        }
        .resolve a {
            color: rgb(252, 67, 65);
        }
        .el-progress-bar__innerText {
            display: none
        }
    }
</style>
