<!--
****--@file     testPaperManagement_show
****--@date     2017/12/5 9:13
****--@author   YC
****--@describe 试卷查看
-->
<template>
    <div class="paperView show">
        <el-row class="paperHeader">
            <el-form :inline="true">
                <el-col align="center" class="paperTitle">
                    <b>{{ info.name }}</b>
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
            <template v-for="(item,questionsTypeId) in info.questionsList">
                <h3 :key="questionsTypeId" class="questionTypeText">{{ questionType[questionsTypeId] }}</h3>
                <question-show v-for="(cItem,index) in item"
                               :key="questionsTypeId+'_'+index"
                               :index="index+1"
                               :showData="cItem"
                               :showScore="true"
                               :show-answer="true"
                               :class="'questionItem' + index"></question-show>
            </template>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../../assets/ambuf/css/paper/view";
</style>
<script>
    /*当前组件必要引入*/
    import api from './api'
    import questionShow from '../../common/questionShow/show'
    //当前组件引入全局的util
    let Util = null;
    export default {
        props: ['operailityData'],
        data() {
            return {
                info: {},
                questionType: {}, // 题型
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                this.$store.commit('papers/init');
                if (this.operailityData) {
                    // 获取数据初始化
                    this.getShowData()
                } else {
                    // 从状态中初始化数据
                    this.info = this.$store.state.papers.info;
                }
            },
            getShowData() {
                let opt = {
                    ajaxSuccess: res => {
                        this.$store.commit('papers/updateInfo', res.data);
                        this.$store.commit('papers/initQuestionsList', res.data.questionsList);
                        // 获取题型
                        this.questionType = this.$store.getters['papers/questionsType']();
                        this.info = this.$store.state.papers.info;
                    },
                    ajaxParams: {
                        url: api.get.path,
                        method: api.get.method,
                        params: {id: this.operailityData.id}
                    }
                }
                this.ajax(opt)
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        destroyed() {
            this.$store.commit('papers/destroy')
        },
        components: {
            questionShow
            // radioShow, checkboxShow, judgeShow, packAnswerShow, answerShow
        }
    }

</script>