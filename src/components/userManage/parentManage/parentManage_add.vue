<template>
    <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="160px">
        <el-form-item label="学生账号" prop="account">
            <el-input style="width: 300px;" size="small" v-model="formValidate.account" @blur="getStudent"
                      @focus="empty"></el-input>
            <!--<el-button @click></el-button>-->
        </el-form-item>
        <el-form-item label="学生姓名" prop="name">
            <el-input style="width: 300px;" disabled size="small" v-model="StudentInfodate.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-select disabled size="small" v-model="StudentInfodate.sex" placeholder="">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
            <el-select disabled size="small" v-model="StudentInfodate.grade" placeholder="">
                <grade-option-list></grade-option-list>
            </el-select>
        </el-form-item>
        <el-form-item label="所在市区：">
            <el-input style="width: 110px" disabled v-model="StudentInfodate.province"></el-input>
            <el-input style="width: 110px" disabled v-model="StudentInfodate.town"></el-input>
            <el-input style="width: 110px" disabled v-model="StudentInfodate.county"></el-input>
        </el-form-item>
        <div style="text-align: center">
            <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <el-button size="small" class="tableMakeItemCancel" @click="cancel">取消</el-button>
        </div>
    </el-form>
</template>
<script>
    import VDistpicker from 'v-distpicker' //地区选择器
    import gradeOptionList from '../../common/gradeOption.vue'
    import {add as rules} from './rules'
    import api from './api'

    let Util = null;
    export default {
        props: {
            value: Object
        },
        data() {
            return {
                rules,
                formValidate: {
                    account: '',
                },
                StudentInfodate: {},
                select: {province: '', city: '', area: ''},
                loadBtn: {title: '提交', callParEvent: 'listenSubEvent', size: 'small', disabled: true},
                //当前组件提交(add)数据时,ajax处理的 基础信息设置
                addMessTitle: {
                    type: 'add',
                    successTitle: '添加成功!',
                    errorTitle: '添加失败!',
                    ajaxSuccess: 'ajaxSuccess',
                    ajaxError: 'ajaxError',
                    ajaxParams: {
                        url: api.add.path,
                        method: api.add.method,
                        data: {
                            guardianId: this.value.dialogData.id,
                            studentId: ''
                        }
                    }
                },
            }
        },
        created() {
            //给当前组件注入全局util
            Util = this.$util;
        },
        methods: {
            /*
             * 根据学生账号获取学生信息
             * 失焦执行
             **/
            getStudent() {
                this.StudentInfodate = {}
                if(this.formValidate.account == '') return;
                this.ajax({
                    ajaxSuccess: this.getStudentInfo,
                    ajaxParams: {
                        url: api.getByAccount.path + this.formValidate.account,
                        method: api.getByAccount.method
                    }
                })
            },
            empty() {
                this.StudentInfodate = {}
            },
            getStudentInfo(res) {
                this.loadBtn.disabled = false
                if(res.data instanceof Object) {
                    this.StudentInfodate = res.data;
                    if(this.StudentInfodate.sex != null) {
                        this.StudentInfodate.sex = String(this.StudentInfodate.sex);
                    }
                    if(this.StudentInfodate.grade) {
                        this.StudentInfodate.grade = String(this.StudentInfodate.grade);
                    }

                } else {
                    this.errorMess('您输入的学生账号不存在!')
                    this.loadBtn.disabled = true
                }
                console.log(this.loadBtn)
            },
            /*
             * 点击提交按钮 监听是否提交数据
             * @param isLoadingFun boolean  form表单验证是否通过
             * */
            listenSubEvent(isLoadingFun) {
                let isSubmit = this.submitForm("formValidate");
                if(isSubmit) {
                    if(!isLoadingFun) isLoadingFun = function() {
                    };
                    isLoadingFun(true);
                    this.addMessTitle.ajaxParams.data.studentId = this.StudentInfodate.id;
//          this.addMessTitle.ajaxParams.data=this.addMessTitle.ajaxParams.data;
                    this.ajax(this.addMessTitle, isLoadingFun)
                }
            },
            /*
             * 点击提交按钮 监听是否验证通过
             * @param formName string  form表单v-model数据对象名称
             * @return flag boolean   form表单验证是否通过
             * */
            submitForm(formName) {
                let flag = false;
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        flag = true;
                    }
                });
                return flag;
            },
            /*
            * 获取表单数据
            * @return string  格式:id=0&name=aa
            * */
            getFormData(data) {
                let myData = Util._.defaultsDeep({}, data);
                return myData;
            },
            /*
             * 当前组件发送事件给父组件
             * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
             * */
            cancel() {
                this.$emit('confirm');
            },

            /*
             * 组件初始化入口
             * */
            init() {
                //this.ajax(this.listMessTitle)
            },
        },
        components: {
            VDistpicker,
            gradeOptionList
        }
    }
</script>
