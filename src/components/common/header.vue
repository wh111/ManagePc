<template>
  <div class="topbar-wrap topbar-clearfix">
    <div class="topbar-yylogo topbar-left">
      <div class="topbar-yylogo-imgBox">
        <a href="#"><img style="height: 36px" src="../../assets/images/logo.png"/></a>
      </div>
    </div>
    <!-- <div class="topbar-workbench topbar-left">
        <router-link to="/manage">工作台</router-link>
    </div>
    <div class="topbar-global-nav topbar-left">
        <a href="javascript:void(0)">功能大全</a>
    </div> -->
    <div class="topbar-info topbar-right topbar-clearfix">

      <div class="topbar-user topbar-left" :class="{'topbar-user-showLogout':expendLogin}">
        <div class="admin">
          <span style="color: #555">欢迎您，{{ userInfo.name }}</span>
          <el-badge class="item"><img src="../../assets/images/ling.png" style="position: relative" size="small"
                                      @click="msg"/>
            <div class="messageItem" @click="msg" style="position: absolute;">{{msgNum}}</div>
          </el-badge>
          | <span style="color: #555" @click="openModifyPassword">修改密码</span> | <span @click="signOut"
                                                                                      style="color: #555">退出</span>
        </div>

      </div>
      <!-- <div class="topbar-zyysLogo topbar-left">
          <a href="#"><img src="../../assets/ambuf/images/logo/small-zyysLogo.png" /></a>
      </div>-->
    </div>
    <Modal :mask-closable="false" v-model="showModal" height="200" class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :parent="self" :content="headerContent.showId"></modal-header>
      <el-form v-if="showModal" label-width="80px" :rules="rules" :model="formLabelAlign" ref="formLabelAlign">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="formLabelAlign.oldPassword" placeholder="请输入旧密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="newPassword">
          <el-input type="password" v-model="formLabelAlign.newPassword" placeholder="请输入新密码"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassword1">
          <el-input type="password" v-model="formLabelAlign.newPassword1" auto-complete="off"
                    placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-row>
          <el-col align="center">
            <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"></div>
    </Modal>
    <Modal
      :mask-closable="false"
      width="1000"
      v-model="msgModal"
      title="消息处理"
      class-name="vertical-center-modal"
      :loading="loading">
      <modal-header slot="header" :content="msgId"></modal-header>
      <msg v-if="msgModal" @msg="cancel"></msg>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
    let Util = null
    import baseRules from '../../formRules/base'
    import msg from '../messageManage/pending/pending_list.vue'

    export default {
        data () {
            let validatePass = (rule, value, callback) => {
                if (value !== this.formLabelAlign.newPassword) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                msgNum: 0,
                self: this,
                expendLogin: false,
                showLogin: false,
                msgModal: false,
                loading: false,
                msgId: {
                    id: 'msgId',
                    title: '消息通知',
                },
                loadBtn: {title: '重置密码', callParEvent: 'listenSubEvent'},
                headerContent: {
                    showId: {
                        id: 'showId',
                        title: '修改密码',
                    },
                },
                userInfo: {
                    name: '',
                },
                formLabelAlign: {
                    oldPassword: '',
                    newPassword: '',
                    newPassword1: '',
                },
                rules: {
                    oldPassword: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'},
                        baseRules.inputLen(1, 30),
                    ],
                    newPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        baseRules.inputLen(1, 30),
                    ],
                    newPassword1: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'},
                        baseRules.inputLen(1, 30),
                    ],
                },
            }
        },
        created () {
            Util = this.$util
            let userInfo = this.$store.getters['user/info']()
            if (userInfo instanceof Object) {
                this.userInfo = userInfo
            }
            this.getMesNum()
        },
        methods: {
            getMesNum () {
                this.ajax({
                    ajaxSuccess: res => this.msgNum = res.data,
                    ajaxParams: {
                        url: '/auditTodo/queryBadgeNums',
                        method: 'get',
                    },
                })
            },
            showLoginMess () {
                this.expendLogin = !this.expendLogin
                this.$emit('setZindex', this.expendLogin)
            },
            signOut () {
                //退出登陆
                Util.loginOut(this)
            },
            msg () {
                this.msgModal = true
            },
            cancel () {
                this.msgModal = false
                this.getMesNum()
            },
            openModifyPassword () {
                this.formLabelAlign = {
                    oldPassword: '',
                    newPassword: '',
                    newPassword1: '',
                }
                this.showModal = true
            },
            /*
            * 点击提交按钮 监听是否验证通过
            * @param formName string  form表单v-model数据对象名称
            * @return flag boolean   form表单验证是否通过
            * */
            submitForm (formName) {
                let flag = false
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        flag = true
                    }
                })
                return flag
            },
            /*
            * 点击提交按钮 监听是否提交数据
            * @param isLoadingFun boolean  form表单验证是否通过
            * */
            listenSubEvent (isLoadingFun) {
                let isSubmit = this.submitForm('formLabelAlign')
                if (isSubmit) {
                    if (!isLoadingFun) isLoadingFun = function () {
                    }
                    isLoadingFun(true)
                    let opt = {
                        ajaxSuccess: res => {
                            this.showModal = false
                            this.successMess('重置密码成功')
                        },
                        ajaxError: () => this.errorMess('重置密码失败'),
                        ajaxParams: {
                            url: '/modify-password',
                            method: 'put',
                            data: this.getFormData(this.formLabelAlign),
                        },
                    }
                    this.ajax(opt, isLoadingFun)
                }
            },
            /*
            * 获取表单数据
            * @return string  格式:id=0&name=aa
            * */
            getFormData (data) {
                let myData = Util._.defaultsDeep({}, data)
                return myData
            },
        },
        mounted () {
            let that = this
            this.$nextTick(() => {
                // Util.events.addHandler(this.$refs.showLoginMessId, "click", function (e) {
                //   e.stopPropagation();
                //   that.showLoginMess();
                // });
                Util.events.addHandler(document, 'click', function () {
                    that.expendLogin = false
                    that.$emit('setZindex', false)
                })
            })
        },
        components: {
            msg,
        },
    }
</script>
<style lang="scss">
  .topbar-wrap {
    box-shadow: 2px 2px 5px #ccc;
  }
  .admin {
    line-height: 60px;
    font-size: 14px;
    color: #bfbfbf;
    span {
      margin: 0 5px;
      cursor: pointer;
    }
    .item {
      width: 30px;
      cursor: pointer;
      top: -1px;
      .messageItem {
        min-width: 20px;
        text-align: center;
        background: rgb(252, 67, 65);
        color: rgb(255, 255, 255);
        height: 15px;
        line-height: 15px;
        font-size: 12px;
        border-radius: 7px;
        padding: 0 4px;
        top: 16px;
        left: 10px;

      }
    }
    .el-badge__content.is-fixed {
      top: 17px;
    }
    .admin-icon {
      display: inline-block;
      height: 17px;
      width: 18px;
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: 0;
      }
      span {
        position: absolute;
        top: -8px;
        right: -11px;
        width: 15px;
        height: 15px;
        text-align: center;
        border-radius: 50%;
        background: red;
        line-height: 15px;
      }
    }
  }
</style>

