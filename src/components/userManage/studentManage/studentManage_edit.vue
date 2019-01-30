<template>
    <div id="content" class="cuse_content">
        <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="140px">
            <el-form-item label="姓名：" prop="name">
                <el-input size="small" v-model="formValidate.name"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-select size="small" v-model="formValidate.sex" placeholder="请选择">
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="生日：" prop="birth">
                <el-date-picker
                        v-model="formValidate.birth"
                        type="date"
                        :editable="false"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions0"
                        placeholder="选择时间" @change="changeBirth">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="学生账号：" prop="account">
                <el-input size="small" v-model="formValidate.account"></el-input>
            </el-form-item>
            <el-form-item label="QQ号：" prop="qq">
                <el-input size="small" v-model="formValidate.qq"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
                <el-input size="small" v-model="formValidate.mobile"></el-input>
            </el-form-item>
            <el-form-item label="微信号：" prop="wechat">
                <el-input size="small" v-model="formValidate.wechat"></el-input>
            </el-form-item>
            <el-form-item label="所属学校：" prop="school">
                <el-input size="small" v-model="formValidate.school"></el-input>
            </el-form-item>
            <!--<el-form-item label="阶段：" prop="stage">-->
            <!--<el-select size="small" v-model="formValidate.stage" placeholder="请选择">-->
            <!--<el-option label="小学" value="0"></el-option>-->
            <!--<el-option label="初中" value="1"></el-option>-->
            <!--<el-option label="高中" value="2"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="年级：" prop="grade">
                <el-select size="small" v-model="formValidate.grade" @change="fn" placeholder="请选择">
                    <grade-option-list></grade-option-list>
                </el-select>
            </el-form-item>
            <p>
                <el-form-item label="使用教材：" prop="textbookVersionList">
                    <el-form-item :label="item.subject | subject" prop="project" label-width="70px"
                                  class="useSubject" v-for="(item,index) in formValidate.textbookVersionList"
                                  :key="index">
                        <el-select size="small" v-model="item.textbookVersionId" placeholder="请选择">
                            <el-option v-for="(item,index) in list " :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form-item>
            </p>
            <el-form-item label="学制：" prop="length">
                <el-select :disabled="formValidate.grade > 9" size="small" v-model="formValidate.length"
                           placeholder="请选择">
                    <el-option label="五四制" value="1"></el-option>
                    <el-option label="六三制" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学期：" prop="term">
                <el-select size="small" v-model="formValidate.term" placeholder="请选择">
                    <el-option label="上学期" value="0"></el-option>
                    <el-option label="下学期" value="1"></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="所在市区：" prop="province">-->
            <distpicker @selected="getArea" :province="select.province" :city="select.city" :area="select.area"
                        label-width="140px"></distpicker>
            <!--</el-form-item>-->

        </el-form>
        <p style="text-align: center">
            <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <el-button size="small" class="tableMakeItemCancel" type="info" @click="cancel">取消</el-button>
        </p>
    </div>
</template>
<script>
    let Util = null
    import api from './api'
    import {add as rules} from './rules'
    // import VDistpicker from 'v-distpicker' //地区选择器
    import distpicker from '../../common/distpicker/index'
    import gradeOptionList from '../../common/gradeOption.vue'

    export default {
        props: ['textbookLsit', 'operailityData'],
        data() {
            return {
                pickerOptions0: {
                    //选择开始时间后设置结束日期的限制
                    disabledDate: (time) => {
                        return time.getTime() >= Date.now()
                    }
                },
                rules,
//                textbookLsit: this.textbookLsit,
                formValidate: {},
                select: {province: '', city: '', area: ''},
                loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
                editMessTitle: {
                    type: 'edit',
                    callback: 'edit',
                    successTitle: '修改成功!',
                    errorTitle: '修改失败!',
                    ajaxSuccess: res => this.$emit('edit', 'edit', '修改成功!'),
                    ajaxError: 'ajaxError',
                    ajaxParams: {
                        jsonString: true,
                        url: api.modify.path,
                        method: api.modify.method
                    }
                },
                gradeList: [],
                list: [],//书本类型
//                formValidate1: {length: '', textbookVersionList: []}
            }
        },
        created() {
            this.list = this.$store.state.app.envs.textBookVersionList
            this.init()
        },
        methods: {
            fn(index) {
                let gradeList = this.$store.getters['app/gradeMap'](index)
                this.gradeList = gradeList
                let thisGrade = []
                gradeList.map(item => thisGrade.push({
                    subject: item.code,
                    textbookVersionId: ''
                }))
                this.formValidate.textbookVersionList = thisGrade
            },
            init() {
                Util = this.$util
                this.ajax({
                    ajaxSuccess: this.getData,
                    ajaxParams: {
                        url: api.get.path + '?userId=' + this.operailityData.id,
                        method: api.get.method
                    }
                })
            },
            getData(res) {
                if (res.data.birth) {
                    res.data.birth = new Date(res.data.birth)
                }
                this.formValidate = res.data
                if (this.formValidate.sex != null) {
                    this.formValidate.sex = String(this.formValidate.sex)
                }
                if (this.formValidate.stage != null) {
                    this.formValidate.stage = String(this.formValidate.stage)
                }
                if (this.formValidate.grade != null) {
                    this.formValidate.grade = String(this.formValidate.grade)

                    let gradeList = this.$store.getters['app/gradeMap'](this.formValidate.grade)
                    this.gradeList = gradeList
                    let thisGrade = []
                    gradeList.map(item => thisGrade.push({
                        subject: item.code,
                        textbookVersionId: ''
                    }))
                    for (var i = 0; i < thisGrade.length; i++) {
                        for (var j = 0; j < this.formValidate.textbookVersionList.length; j++) {
                            if (this.formValidate.textbookVersionList[j].subject == thisGrade[i].subject) {
                                thisGrade[i].textbookVersionId = this.formValidate.textbookVersionList[j].textbookVersionId
                            }
                        }

                    }
                    this.formValidate.textbookVersionList = thisGrade

                }
                if (this.formValidate.term != null) {
                    this.formValidate.term = String(this.formValidate.term)
                }
                if (this.formValidate.length != null) {
                    this.formValidate.length = String(this.formValidate.length)
                }
                if (this.formValidate.birth == null) {
                    this.formValidate.birth = ''
                }
                this.select = {
                    province: this.formValidate.province,
                    city: this.formValidate.town,
                    area: this.formValidate.county
                }
//                let gradeList = this.$store.getters['app/gradeMap'](JSON.parse(this.formValidate.grade))
//                let thisGrade = []
//                gradeList.map(item => thisGrade.push({
//                    subject: item.code,
//                    textbookVersionId: item.textbookVersionId,
//                }))
//                this.formValidate.textbookVersionList = thisGrade
            },
            getArea(val) {
                this.formValidate.province = val.province.value
                this.formValidate.town = val.city.value
                this.formValidate.county = val.area.value
            },
            changeBirth(val) {
//        this.formValidate.birth = val
            },
            cancel() {
                this.$emit('cancel', 'edit')
            },
            /*
            * 点击提交按钮 监听是否验证通过
            * @param formName string  form表单v-model数据对象名称
            * @return flag boolean   form表单验证是否通过
            * */
            submitForm(formName) {
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
            listenSubEvent(isLoadingFun) {
                if (!this.formValidate.textbookVersionList.length || this.formValidate.textbookVersionList.some(item => !item.textbookVersionId)) {
                    this.errorMess('使用教材每个都必须选择版本');
                    return false
                }
//                for (var i = 0; i < this.formValidate.textbookVersionList.length; i++) {
//                    var m = {}
//                    m.textbookVersionId = this.formValidate.textbookVersionList[i].textbookVersionId
//                    m.subject = this.formValidate.textbookVersionList[i].subject
//                    this.formValidate.textbookVersionList.push(m)
//                }
//                this.formValidate1.id = this.formValidate.id
//                this.formValidate1.name = this.formValidate.name
//                this.formValidate1.account = this.formValidate.account
//                this.formValidate1.sex = this.formValidate.sex
//                this.formValidate1.birth = this.formValidate.birth
//                this.formValidate1.mobile = this.formValidate.mobile
//                this.formValidate1.wechat = this.formValidate.wechat
//                this.formValidate1.qq = this.formValidate.qq
//                this.formValidate1.grade = this.formValidate.grade
                if(Number(this.formValidate.grade) > 9){
                    this.formValidate.stage = '2'
                }else {
                    if(Number(this.formValidate.length) == 0){
                        Number(this.formValidate.grade) > 6 ? this.formValidate.stage = '1' : this.formValidate.stage = '0'
                    }else{
                        Number(this.formValidate.grade) > 5 ? this.formValidate.stage = '1' : this.formValidate.stage = '0'
                    }
                };
                this.formValidate.length = String(this.formValidate.length)
                this.formValidate.term = String(this.formValidate.term)
                this.formValidate.school = this.formValidate.school
                this.formValidate.province = this.select.province
                this.formValidate.county = this.select.area

                this.formValidate.town = this.select.city;
                let isSubmit = this.submitForm('formValidate')
                if (isSubmit) {
                    if (!isLoadingFun) isLoadingFun = function () {
                    }
                    isLoadingFun(true)
                    this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
                    console.log(this.editMessTitle.ajaxParams.data)
                    this.ajax(this.editMessTitle, isLoadingFun)
                }
            },
            /*
            * 获取表单数据
            * @return string  格式:id=0&name=aa
            * */
            getFormData(data) {
                let myData = Util._.defaultsDeep({}, data)
                this.formDate(myData, ['birth'], this.yearMonthData)
                return myData
            }
        },
        components: {
            distpicker,
            gradeOptionList
        }
    }
</script>
<style lang="scss" scoped>
    .cuse_content {
        position: relative;
        .el-form {
            .el-input {
                width: 300px;
            }
            width: 800px;
        }
        .head-box {
            width: 170px;
            height: 190px;
            position: absolute;
            right: 100px;
            top: 0px;
        }
    }


</style>


