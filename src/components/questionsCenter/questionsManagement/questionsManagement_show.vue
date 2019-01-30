<template>
  <el-row class="cqqs-content">
    <el-form ref="showData" :model="showData" label-width="100px">
      <p>基本信息</p>
      <el-col>
        <el-col :span="8">
          <el-form-item label="年级：" prop="grade">
            {{ showData.grade | grade }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="科目：" prop="subject">
            {{ showData.subject | subject }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学期：" prop="term">
            {{ showData.term | term }}
          </el-form-item>
        </el-col>
      </el-col>
      <el-col>
        <el-col :span="8">
          <el-form-item label="题型：" prop="questionsTypeId">
            {{ showData.questionsTypeName }}
          </el-form-item>
        </el-col>
        <!-- 只有非组题时主题干部分才有分数 -->
        <el-col :span="8" v-if="!showData.groups">
          <el-form-item label="分值：" prop="score">
            {{ showData.score }}分
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="权限：" prop="openType">
            {{ showData.openType | questionOpenType }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="难度：" prop="diffLevelCode">
            {{ showData.diffLevelCode | diffLevelCode(self) }}
          </el-form-item>
        </el-col>
      </el-col>
      <!-- 非组题时题干部分才有知识点 -->
      <el-col v-if="!showData.groups">
        <el-form-item label="知识点：" prop="knowledgeList">
          <el-tag style="margin-right: 5px" v-for="(tag,index) in showData.knowledgeList"
                  :key="index">
            {{tag.name}}
          </el-tag>
        </el-form-item>
      </el-col>

      <el-col>
        <question-show :showData="showData" v-if="showData.basicType" :show-answer="true"
                       :showScore="true"></question-show>
      </el-col>

      <el-col align="center" style="margin-top: 20px">
        <el-button size="small" @click="cancel">关闭</el-button>
      </el-col>
    </el-form>
  </el-row>
</template>
<script>
    let Util = null

    import api from './api'
    import questionShow from '../../common/questionShow/show'

    export default {
        props: ['operailityData', 'type'],
        data () {
            return {
                self: this,
                showData: {},
            }
        },
        created () {
            this.init()
        },
        methods: {
            init () {
                Util = this.$util
                let url = api.getZbzt.path
                console.log(this.operailityData)
                let params = {
                    questionsId: this.operailityData.id,
                }
                if (this.type == 'center') {
                    url = api.get.path
                    params = {
                        id: this.operailityData.id,
                    }
                } else {
                    url = api.getZbzt.path
                }

                console.log(url)
                let option = {
                    ajaxSuccess: res => {
                        if (res.data instanceof Object) {
                            this.showData = res.data
                        }
                    },
                    ajaxError: () => this.errorMess('获取数据失败，请重试'),
                    ajaxParams: {
                        url: url,
                        method: api.getZbzt.method,
                        params,
                    },
                }
                this.ajax(option)
            },
            cancel () {
                this.$emit('cancel', 'show')
            },
        },
        components: {
            questionShow,
        },
    }
</script>

<style lang="scss">
  .cqqs-content {
    .el-form {
      padding-left: 40px;
    }
    .showDataBox {
      .el-col-24 {
        padding-left: 40px;
      }
    }
    .qc_options {
      margin-left: 30px;
    }
    p {
      font-size: 20px;
      line-height: 30px;
    }
    .width .el-input, .width .el-textarea {
      width: 600px;
    }
  }
</style>

