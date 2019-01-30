<!--
****--@file     answer_show
****--@date     2017/12/5 9:41
****--@author   YC
****--@describe 问答题-查看
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
                <el-col class="qcMain"></el-col>
                <!-- 答案及解析 -->
                <el-col class="qcFooter" v-if="showAnswer">
                    <el-col>
                        <el-col :span="21">
                            <div class="qcfItem">
                                <b>正确答案：</b>
                                <b class="qcfiAnswer" v-html="questionData.answer"></b>
                            </div>
                        </el-col>
                        <!-- 学生答案 -->
                      <!--<el-col :span="21" v-if="questionData.studentAnswer !== null">-->
                      <!--&lt;!&ndash;<div class="qcfItem">&ndash;&gt;-->
                      <!--&lt;!&ndash;<b>您的答案：</b>&ndash;&gt;-->
                      <!--&lt;!&ndash;<b class="qcfiAnswer">{{ questionData.studentAnswer === null ? '' :&ndash;&gt;-->
                      <!--&lt;!&ndash;questionData.studentAnswer }}</b>&ndash;&gt;-->
                      <!--&lt;!&ndash;</div>&ndash;&gt;-->
                      <!--</el-col>-->
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
                <el-form>
                    <el-form-item label="填写答案：">
                        <el-input type="textarea" :rows="3" v-model="answerVal" @input="answer"
                                  placeholder="请填写答案"></el-input>
                    </el-form-item>
                </el-form>
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
          'questionsOptions': null // 试题选项：单选题、多选题、判断题 有此项。填空题 没有此项
        }
      }
    },
    methods: {
      //初始化请求列表数据
      init () {
        if (this.question instanceof Object) {
          this.questionData = this.$util._.defaultsDeep({}, this.question)
        }
        this.answerVal = ''
        if (this.questionData.studentAnswer !== undefined && this.questionData.studentAnswer !== null) {
          this.answerVal = this.questionData.studentAnswer
          this.answer()
        }
      },
      showExp () {
        this.showExpStatus = !this.showExpStatus
      },
      answer () {
        this.$emit('answer', this.answerVal)
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
