<template>
    <div class="login_page fillcontain" style="margin: 0 auto">
        <div class="login_page_back" style="width: 1920px;margin: 0 auto;position: relative;height: 539px">
            <!--<img src="../assets/images/loginBack.png"/>-->

            <transition name="form-fade" mode="in-out">

                <section class="form_contianer_new" v-show="showLogin">
                    <img src="../assets/images/logo.jpg" style="margin-left: 152px;margin-top: 25px;">
                    <p class="login_title">鲁教测评后台管理系统</p>
                    <p class="english">BACKSTAGE MANAGEMENT SYSTEM LOGIN</p>
                    <el-form :model="loginForm" :rules="rules" ref="loginForm"
                             style="width: 310px;text-align: center;margin: 0 auto">
                        <p style="margin-top: 40px;text-align: left; color: #959595;margin-bottom: 7px">用户名</p>
                        <el-form-item prop="username" style="position: relative">
                            <el-input style="height: 43px" size="small" type="text" v-model="loginForm.username"
                                      @keyup.enter.native="listenSubEvent('')" placeholder="用户名">

                            </el-input>
                            <img class="icon" src="../assets/images/icon_07.jpg"/>
                        </el-form-item>
                        <p style="text-align: left; color: #959595;margin-bottom: 7px">密码</p>
                        <el-form-item prop="password" style="position: relative">
                            <el-input style="height: 43px;" size="small" type="password" placeholder="密码"
                                      @keyup.enter.native="listenSubEvent('')"
                                      v-model="loginForm.password">


                            </el-input>
                            <img class="icon" src="../assets/images/icon_10.jpg"/>
                        </el-form-item>
                        <el-form-item>
                            <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn" class="submit_btn"
                                      style="margin-left: 0;width: 100%;height: 50px;font-size: 14px !important;"></load-btn>
                        </el-form-item>
                    </el-form>
                </section>
            </transition>
        </div>
        <!--<section style="position: fixed;height: 540px;z-index: -1;background: #11a63f;top: 0;width: 100%">-->

    </div>
</template>

<script>
    import baseRules from '../formRules/base'
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                showLogin: false,
                adminCookieKey: 'manager_login_token',
                loginForm: {
                    username: '',
                    password: ''
                },
                routerPath: {}, // 路由
                loadBtn: {title: '点此进入', callParEvent: 'listenSubEvent'},
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        baseRules.inputLen(1, 30)
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        baseRules.inputLen(1, 30)
                    ]
                },
                indexPath: '',
                loading: null
            }
        },
        created() {
            // 获取默认首页
            this.indexPath = this.$util.base + this.$util.pathPrefix;
           if (this.$util.getCookie(this.adminCookieKey)) {
                this.$router.push(this.indexPath);
            } else {
                this.showLogin = true;
            }
        },
        methods: {
            /*
            * 登录
            * @param isLoadingFun boolean  form表单验证是否通过
            * */
            listenSubEvent(isLoadingFun) {
                let isSubmit = this.submitForm("loginForm");
                if (isSubmit) {
                    if (!isLoadingFun) isLoadingFun = function () {
                    };
                    isLoadingFun(true);
                    let opt = {
                        error: () => {
                            this.$util.loginOut(this)
                        },
                        ajaxSuccess: res => this.getUserInfoSuccess(res),
                        ajaxError: () => this.errorMess('登录失败，请重试'),
                        ajaxParams: {
                            url: '/login',
                            method: 'post',
                            data: this.$util.getFormData(this.loginForm)
                        }
                    };
                    this.ajax(opt, isLoadingFun);
                }
            },

            // 获取用户信息成功
            getUserInfoSuccess(res) {
                if (res.data instanceof Object) {
                    this.showLogin = false;
                    this.$store.commit('user/updateInfo', res.data);
                    let role = [];
                    if (res.data.role instanceof Array) {
                        res.data.role.map(item => role.push(item.id));
                    } else {
                        role.push(res.data.role.id)
                    }
                    this.$store.commit('user/updateRole', role);
                    this.$router.push(this.indexPath + '/userCenter/studentManager')
                } else {
                    this.showLogin = true;
                }
            },

            /*
            * 点击提交按钮 监听是否验证通过
            * @param formName string  form表单v-model数据对象名称
            * @return flag boolean   form表单验证是否通过
            * */
            submitForm(formName) {
                let flag = false;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        flag = true;
                    }
                });
                return flag;
            }
        },
        watch: {}
    }
</script>

<style lang="less">
    @blue: #3190e8;
    @bc: #e4e4e4;
    @fc: #fff;

    // 背景图片地址和大小
    .bis(@url) {
        background-image: url(@url);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    //定位全屏
    .allcover {
        position: absolute;
        top: 0;
        right: 0;
    }

    //transform上下左右居中
    .ctt {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    //定位上下左右居中
    .ctp(@width, @height) {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -@height/2;
        margin-left: -@width/2;
    }

    //定位上下居中
    .tb {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    //定位左右居中
    .lr {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    //宽高
    .wh(@width, @height) {
        width: @width;
        height: @height;
    }

    //字体大小、行高、字体
    .ft(@size, @line-height) {
        font-size: @size;
        line-height: @line-height;
    }

    //字体大小，颜色
    .sc(@size, @color) {
        font-size: @size;
        color: @color;
    }

    .loginLoding {
        .el-loading-text, i {
            color: #fff;
        }
    }

    .form_contianer_new {
        position: absolute;
        top: 318px;
        background: #fff;
        left: 774px;
        width: 370px;
        height: 465px;
        border-radius: 3px;
        box-shadow: 2px 2px 5px #d3d6da;
    }

    .login_page {
        .login_page_back {
            background: url(../assets/images/loginBack.png);
        }
        .icon {
            position: absolute;
            left: 10px;
            top: 1px;
            height: 41px;
        }
        .login_title {
            font-size: 25px;
            color: #555;
            height: 44px;
            line-height: 50px;
            text-align: center;
        }
        .el-input--small .el-input__inner {
            height: 43px;
            padding-left: 40px
        }
        .english {
            color: #959595;
            text-align: center;
        }
        background-color: #11a63f;
        height: 538px;
        /*background: url(../assets/images/loginBack.png);*/
        .manage_tip {
            position: absolute;
            width: 100%;
            top: -100px;
            left: 0;
            p {
                font-size: 32px;
                color: #fff;
            }
        }
        .form_contianer {
            .wh(320px, 210px);
            .ctp(320px, 210px);
            padding: 25px;
            border-radius: 5px;
            text-align: center;
            background-color: #fff;
            top: 320px;
            .submit_btn {
                width: 100%;
                font-size: 16px;
            }
        }
        .tip {
            font-size: 12px;
            color: red;
        }
        .form-fade-enter-active, .form-fade-leave-active {
            transition: all 1s;
        }
        .form-fade-enter, .form-fade-leave-active {
            transform: translate3d(0, -50px, 0);
            opacity: 0;
        }
    }
</style>
