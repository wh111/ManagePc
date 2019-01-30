<!--
****--@file     judge_show
****--@date     2017/12/5 9:40
****--@author   YC
****--@describe 判断题-查看
-->
<template>
    <div>
        <el-row class="questionBox">
            <!-- 顶部 -->
            <el-col class="qHeader"></el-col>
            <!-- 主体部分 -->
            <el-col class="qContent">
                <!-- 问题标题 -->
                <el-col class="qcTitle" :class="{'hasDo':hasDo}">
                    <!-- 问题显示区域 -->
                    <span v-if="index" class="qctIndex">{{ index }}.</span>
                    <div class="qctTextBox" v-html="questionData.title + (showScore ? `（${questionData.score}分）` : '')"
                         :style="{paddingRight:hasDo + 10 + 'px'}"></div>
                    <el-col class="qctTodoBox" align="right" :style="{width:hasDo + 'px'}">
                        <slot name="todo"></slot>
                    </el-col>
                </el-col>
                <!-- 问题选项 -->
                <el-col class="qcMain">
                    <el-col class="qcmSel" v-for="(str,index) in questionData.questionsOptions" :key="index">
                        <span class="qcmSelItem">{{ index | getCharCode }}.</span>
                        <div class="qcmSelText" v-html="str"></div>
                    </el-col>
                </el-col>
                <!-- 答案及解析 -->
                <el-col class="qcFooter" v-if="showAnswer">
                    <el-col>
                        <el-col :span="21">
                            <div class="qcfItem">
                                <b>正确答案：</b>
                                <b class="qcfiAnswer">{{parseInt(question.answer) | answerText }}</b>
                            </div>
                            <!-- 学生答案 -->
                            <!--<div class="qcfItem" v-if="questionData.studentAnswer !== null">-->
                            <!--<b>您的答案：</b>-->
                            <!--<b class="qcfiAnswer" v-if="questionData.studentAnswer !== null">{{-->
                            <!--questionData.studentAnswer | answerText }}</b>-->
                            <!--<b class="qcfiAnswer" v-else></b>-->
                            <!--</div>-->
                            <!--<div class="qcfItem error" v-if="questionData.answerResult !== null"-->
                            <!--:class="{'success':questionData.answerResult==1}">-->
                            <!--<template v-if="questionData.answerResult==1">-->
                            <!--<i class="el-icon-success"></i> 正确-->
                            <!--</template>-->
                            <!--<template v-else>-->
                            <!--<i class="el-icon-error"></i> 错误-->
                            <!--</template>-->
                            <!--</div>-->
                        </el-col>
                        <el-col :span="3" align="right">
                            <slot name="answerRight">
                                <el-button type="text" class="qcfShowExp" @click="showExp">查看解析 <i
                                        :class="showExpStatus ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                                </el-button>
                            </slot>
                        </el-col>
                    </el-col>
                    <el-col class="qcfExpCon" v-if="showExpStatus">
                        <div>【解析】</div>
                        <div v-html="questionData.answerExplain"></div>
                    </el-col>
                </el-col>
            </el-col>
            <!-- 底部 -->
            <el-col class="qFooter"></el-col>
        </el-row>
        <el-row class="qAnswerBox" v-if="showInput">
            <el-col>
                选择答案：
                <el-button v-for="(item,index) in 2" :key="index"
                           :class="answerVal === index?'active':''" @click="choice(index)">{{ index | answerText
                    }}
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss">
    @import "../../../assets/ambuf/css/paper/question";
</style>
<script>
  /*当前组件必要引入*/

  //当前组件引入全局的util
  let Util = null
  export default {
    /**
     * index    题号
     * question 题目对象
     * hasDo 标题操作
     */
    props: ['index', 'question', 'hasDo', 'showAnswer', 'showScore', 'showInput'],
    data () {
      return {
        answerVal: '',
        showExpStatus: false, // 显示解析
        optionsSpan: 24, // 选项展示比例
        questionData: {
          'score': '', // 分值
          'title': '', // 题目内容：文字
          'answer': '', // 正确答案：多个|隔开
          'answerExplain': '', // 答案解析
          'questionsOptions': [] // 试题选项：单选题、多选题、判断题 有此项。填空题 没有此项
        }
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
          console.log(this.question)
        if (this.question instanceof Object) {
          this.questionData = this.$util._.defaultsDeep({}, this.question)
        }
        this.answerVal = ''
        if (this.questionData.studentAnswer !== undefined && this.questionData.studentAnswer !== null) {
          this.choice(Number(this.questionData.studentAnswer))
        }
      },
      showExp () {
        this.showExpStatus = !this.showExpStatus
      },
      choice (index) {
        this.answerVal = index
        this.$emit('answer', this.answerVal || '0')
      }
    },
    watch: {
      question (val) {
        console.log(val)
        this.init()
      }
    },
    created () {
      this.init()
    },
    mounted () {
    },
    components: {}
  }
</script>
