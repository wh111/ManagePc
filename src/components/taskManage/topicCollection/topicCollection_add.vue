<!--
****--@file     topicCollection_add
****--@date     2017/12/4 下午6:16
****--@author   jhd
****--@describe   添加题集投稿任务
-->
<template>
    <div class="ctta-content">
        <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="240px" style="width: 77%">
            <el-form-item prop="name" label="任务名称">
                <el-input v-model="formValidate.name"></el-input>
            </el-form-item>
            <el-form-item prop="" label="任务类型">
                集体投稿
            </el-form-item>
            <el-form-item prop="" label="发布者">
                系统
            </el-form-item>
            <date-group :dateGroup="{text:'',startDate:formValidate.beginTime,endDate:formValidate.endTime}">
                <el-form-item slot="start" prop="beginTime" label="开始时间">
                    <el-date-picker
                            v-model="formValidate.beginTime"
                            type="datetime"
                            :editable="false"
                            placeholder="选择时间" :picker-options="pickerOptions0" @change="handleStartTime">
                    </el-date-picker>
                </el-form-item>
                <i></i>
                <el-form-item slot="end" prop="endTime" label="结束时间">
                    <el-date-picker
                            v-model="formValidate.endTime"
                            type="datetime"
                            :editable="false"
                            placeholder="选择时间" :picker-options="pickerOptions1"
                            @change="handleEndTime">
                    </el-date-picker>
                </el-form-item>
            </date-group>
            <el-form-item prop="remark" label="编制标准">
                <el-input :rows="4" type="textarea" v-model="formValidate.remark"></el-input>
            </el-form-item>
            <el-form-item label="教材" prop="textbookVersionId">
                <el-select size="small" v-model="formValidate.textbookVersionId" placeholder="请选择"
                           @change="getKnowledges">
                    <el-option v-for="(item,index) in textbook" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
                <el-select size="small" v-model="formValidate.grade" placeholder="" @change="changGrade">
                    <grade-option-list></grade-option-list>
                </el-select>
            </el-form-item>
            <el-form-item label="科目" prop="subject">
                <el-select v-model="formValidate.subject" placeholder="请选择" @change="getKnowledges">
                    <el-option v-for="(item,index) in subjectList" :key="index" :label="item.value"
                               :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学期" prop="term">
                <el-select v-model="formValidate.term" placeholder="请选择" @change="getKnowledges">
                    <el-option label="上学期" value="0"></el-option>
                    <el-option label="下学期" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="知识点">
                <el-select @change="showKnowledgeIds" v-model="knowledgeIds" filterable placeholder="请选择">
                    <el-option v-for="item in knowledgeIdArr" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="奖励积分" prop="integral">
                <el-input v-model="formValidate.integral"></el-input>
                积分
            </el-form-item>
        </el-form>
        <p style="text-align: center">
            <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <el-button class="tableMakeItemCancel" size="small" @click="cancle">取消</el-button>
        </p>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    //引入表单验证规则
    import {CongregationAdd as rules} from '../rules'
    //当前组件引入全局的util
    let Util = null;
    import gradeOptionList from '../../common/gradeOption.vue'
    import api from '../Congregation/api'

    export default {
        data() {
            return {
                rules,
                knowledgeIdArr: {},
                subjectList: [],
                textbook: [],
                knowledgeIds: '',
                knowledgeList: [],
                loadBtn: {title: "提交", callParEvent: "listenSubEvent"},
                formValidate: {
                    name: '',
                    types: '1',
                    remark: '',
                    beginTime: '',
                    endTime: '',
                    integral: '',
                    textbookVersionId: '',
                    knowledgeIds: '',
                    subject: '',
                    term: '0',
                    grade: '1'
                },
                addMessTitle: {
                    type: "add",
                    callback: "close",
                    successTitle: "添加成功!",
                    errorTitle: "添加失败!",
                    ajaxSuccess: res => this.$emit('add', 'add', '添加成功'),
                    ajaxError: "ajaxError",
                    ajaxParams: {
                        url: api.add.path,
                        method: api.add.method
                    }
                }
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util;
                this.subjectList = this.$store.getters['app/gradeMap'](1)
                this.ajax({
                    ajaxSuccess: res => (this.textbook = res.data),
                    ajaxParams: {
                        url: '/textbook/version/all',
                        method: 'get'
                    }
                });
            },
            /*
            * 年级改变对应获取该年级下的对应课程
            * */
            changGrade(val) {
                this.subjectList = this.$store.getters['app/gradeMap'](val)
                this.formValidate.subject = ''
            },
            getKnowledges() {
                this.ajax({
                    ajaxSuccess: res => {
                        let obj = {};
                        if (res.data instanceof Array) {
                            res.data.map(item => obj[item.id] = item)
                        }
                        this.knowledgeIdArr = obj
                    },
                    ajaxParams: {
                        url: '/knowledge/all',
                        method: 'get',
                        date: {
                            subject: this.formValidate.subject
                        }
                    }
                })
            },
            /*
             * 选中知识点展示
             * **/
            showKnowledgeIds(val) {
                let obj = this.knowledgeIdArr[val];
                if (this.knowledgeList.indexOf(obj) > 0) return
                this.knowledgeList.push(obj)
            },
            /*
            * 知识点删除回调
            * **/
            handleClose(tag) {
                this.knowledgeList.splice(this.knowledgeList.indexOf(tag), 1);
            },
            /*
            * 点击提交按钮 监听是否提交数据
            * @param isLoadingFun boolean  form表单验证是否通过
            * */
            listenSubEvent(isLoadingFun) {
                let arr = [];
                this.knowledgeList.map(item => {
                    arr.push(item.id)
                })
                this.formValidate.knowledgeIds = arr.join()
                let isSubmit = this.submitForm("formValidate");
                if (isSubmit) {
                    if (!isLoadingFun) isLoadingFun = function () {
                    };
                    isLoadingFun(true);
                    this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
                    let data = this.addMessTitle.ajaxParams.data;
                    data.beginTime = new Date(data.beginTime).getTime();
                    data.endTime = new Date(data.endTime).getTime();
                    this.ajax(this.addMessTitle, isLoadingFun);
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
//                if (this.formValidate.knowledgeIds == '') {
//                    this.errorMess('请选择知识点！')
//                    flag = false
//                }
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
            cancle() {
                this.$emit("cancel", 'add');
            }
        },
        created() {
            this.init();
        },
        mounted() {

        },
        components: {
            gradeOptionList
        }
    }

</script>
<style lang="scss">
    .ctta-content {
        .el-input,
        .el-select,
        .el-textarea {
            width: 100%;
        }
    }
</style>
