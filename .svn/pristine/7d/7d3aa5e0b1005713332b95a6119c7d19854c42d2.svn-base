<!--
****--@file     mix
****--@date     2018/1/12 19:56
****--@author   YC
****--@describe 公共候选项
-->
<template>
    <el-row class="questionBox">
        <!-- 顶部 -->
        <el-col class="qHeader"></el-col>
        <!-- 主体部分 -->
        <el-col class="qContent">
            <!-- 问题标题 -->
            <el-col class="qcTitle" :class="{'hasDo':hasDo}">
                <!-- 问题显示区域 -->
                <!--<span v-if="index" class="qctIndex">{{ index }}.</span>-->
                <div class="qctTextBox" v-if="index">{{ index }}.</div>
                <el-col class="qctTodoBox" align="right" :style="{width:hasDo + 'px'}">
                    <slot name="todo"></slot>
                </el-col>
            </el-col>
            <!-- 问题选项 -->
            <el-col class="qcMain">
                <el-col>
                    <el-col class="qcmSel" v-for="(str,index) in questionData.questionsOptions" :key="index">
                        <span class="qcmSelItem">{{ index | getCharCode }}.</span>
                        <div class="qcmSelText" v-html="str"></div>
                    </el-col>
                </el-col>
                <el-col>
                    <template v-for="(showData,cIndex) in questionData.childQuestionsList">
                        <radio-show v-if="showData.basicType === 'Radio'" :question="showData" :key="cIndex"
                                    :index="cIndex+1" :showAnswer="showAnswer" :showInput="showInput"
                                    :questionItem="questionsOptions"
                                    :showScore="showScore" @answer="answer">
                            <slot name="answerRight" slot="answerRight"></slot>
                        </radio-show>
                        <checkbox-show v-if="showData.basicType === 'Checkbox'" :question="showData"
                                       :key="cIndex" :index="cIndex+1" :showAnswer="showAnswer" :showInput="showInput"
                                       :showScore="showScore" @answer="answer" :questionItem="questionsOptions">
                            <slot name="answerRight" slot="answerRight"></slot>
                        </checkbox-show>
                        <judgment-show v-if="showData.basicType === 'Judgment'" :question="showData"
                                       :key="cIndex" :index="cIndex+1" :showAnswer="showAnswer" :showInput="showInput"
                                       :showScore="showScore" @answer="answer">
                            <slot name="answerRight" slot="answerRight"></slot>
                        </judgment-show>
                    </template>
                </el-col>
            </el-col>
            <!-- 答案及解析 -->
            <!--<el-col class="qcFooter"></el-col>-->
        </el-col>
        <!-- 底部 -->
        <el-col class="qFooter"></el-col>
    </el-row>
</template>
<script>
    /*当前组件必要引入*/
    import radioShow from './radio_show'
    import checkboxShow from './checkbox_show'
    import judgmentShow from './judgment_show'
    //当前组件引入全局的util
    let Util = null;
    export default {
        /**
         * index    题号
         * question 题目对象
         * hasDo 标题操作
         */
        props: ['index', 'question', 'hasDo', 'showAnswer', 'showScore', 'showInput'],
        data() {
            return {
                showExpStatus: false, // 显示解析
                optionsSpan: 24, // 选项展示比例
                questionsOptions: '',
                questionData: {
                    "score": "", // 分值
                    "title": "", // 题目内容：文字
                    "answer": "", // 正确答案：多个|隔开
                    "answerExplain": "", // 答案解析
                    "questionsOptions": [] // 试题选项：单选题、多选题、判断题 有此项。填空题 没有此项
                }
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                if (this.question instanceof Object) {
                    let data = this.$util._.defaultsDeep({}, this.question);
                    this.questionsOptions = data.questionsOptions;
                    data.questionsOptions = data.questionsOptions && data.questionsOptions.split(this.$util.questionConfig.contentSplitStr) || [];
                    this.questionData = data;
                }
            },
            answer(data) {
                this.$emit('answer', data)
            }
        },
        watch: {
            question(val) {
                console.log(val)
                this.init()
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        components: {
            radioShow, checkboxShow, judgmentShow
        }
    }

</script>
