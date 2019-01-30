<template>
    <div>
        <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="160px">
            <el-form-item label="题型名称：" prop="name">
                <el-input v-model="formValidate.name"></el-input>
            </el-form-item>
            <el-form-item label="是否为组题：" prop="groups">
                <el-radio-group v-model="formValidate.groups" @change="changeGroups">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否为公用后选项：" prop="publics" v-if="formValidate.groups == '1'">
                <el-radio-group v-model="formValidate.publics" @change="changePublics">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="题型成分：" prop="childTypes">
                <!--<el-checkbox-group v-model="formValidate.childTypes">-->
                <!--<el-checkbox v-for="(type,id) in childTypes" :label="type.id" :key="type.id">{{type.name}}-->
                <!--</el-checkbox>-->
                <!--</el-checkbox-group>-->
                <el-checkbox-group v-model="formValidate.childTypes"
                                   v-if="formValidate.groups=='1' && formValidate.publics == '0'">
                    <el-checkbox v-for="(item,key) in questionsBasicTypes" :key="key"
                                 :label="item.code">{{item.value}}
                    </el-checkbox>
                </el-checkbox-group>
                <el-radio-group v-model="formValidate.childTypes" v-else-if="formValidate.groups=='0'">
                    <el-radio v-for="(item,key) in questionsBasicTypes" :key="key"
                              :label="item.code">{{item.value}}
                    </el-radio>
                </el-radio-group>
                <el-radio-group v-model="formValidate.childTypes" v-else>
                    <el-radio v-for="(item,key) in questionsPublicsTypes" :key="key"
                              :label="item.code">{{item.value}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item style="margin-left:30%">
                <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    let Util = null;
    import api from './api'
    import {edit as rules} from './rules'
    import {questionsBasicTypes} from '../../../libs/questionsBasicTypes'

    export default {
        props: ['operailityData'],
        data() {
            return {
                rules,
                questionsBasicTypes,
                questionsPublicsTypes: [
                    {
                        "code": "Radio",
                        "value": "单选题"
                    },
                    {
                        "code": "Checkbox",
                        "value": "多选题"
                    },
                    // {
                    //     "code": "Judgment",
                    //     "value": "判断题"
                    // }
                ],
                loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
                formValidate: {
                    id: '',
                    name: '',
                    groups: '0',
                    publics: '0',
                    childTypes: ''
                },
                childTypes: [],
                editType: 'add'
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Util = this.$util;
                if (this.operailityData) {
                    this.editType = 'edit';
                    this.getEditData()
                }
                // this.ajax({
                //     ajaxSuccess: res => this.childTypes = res.data,
                //     ajaxParams: {
                //         url: api.list.path,
                //         method: api.list.method,
                //         params: {
                //             types: '0'
                //         }
                //     }
                // })
            },
            // 改变组题
            changeGroups(val) {
                if (val == 0) {
                    this.formValidate.publics = '0';
                    this.formValidate.childTypes = '';
                } else {
                    this.formValidate.childTypes = [];
                }
            },
            // 改变公用后选项
            changePublics(val) {
                if (val == 1) {
                    this.formValidate.childTypes = '';
                } else {
                    this.formValidate.childTypes = [];
                }
            },
            // 获取编辑数据
            getEditData() {
                let opt = {
                    ajaxSuccess: res => {
                        if (res.data.groups == 1 && res.data.publics == 0) {
                            res.data.childTypes = res.data.childTypes.split(',')
                        }
                        res.data.publics = res.data.publics.toString();
                        res.data.groups = res.data.groups.toString();
                        for (let key in this.formValidate) {
                            this.formValidate[key] = res.data[key]
                        }
                    },
                    ajaxParams: {
                        url: api.get.path,
                        params: {
                            id: this.operailityData.id
                        }
                    }
                }
                this.ajax(opt)
            },
            /*
            * 点击提交按钮 监听是否验证通过
            * @param formName string  form表单v-model数据对象名称
            * @return flag boolean   form表单验证是否通过
            * */
            submitForm(formName) {
                let flag = false;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        flag = true;
                    }
                });
                return flag;
            },
            /*
            * 点击提交按钮 监听是否提交数据
            * @param isLoadingFun boolean  form表单验证是否通过
            * */
            listenSubEvent(isLoadingFun) {
                let isSubmit = this.submitForm("formValidate");
                let msg = {add: '增加', edit: '修改'};
                if (isSubmit) {
                    if (!isLoadingFun) isLoadingFun = function () {
                    };
                    isLoadingFun(true);
                    let data = this.getFormData(this.formValidate);
                    if (data.childTypes instanceof Array) {
                        data.childTypes = data.childTypes.join(',')
                    }
                    let opt = {
                        type: this.editType,
                        errorTitle: msg[this.editType] + '失败!',
                        ajaxSuccess: res => this.$emit(this.editType, this.editType, msg[this.editType] + '成功!'),
                        ajaxError: 'ajaxError',
                        ajaxParams: {
                            url: api[this.editType].path,
                            method: api[this.editType].method,
                            data
                        }
                    };
                    this.ajax(opt, isLoadingFun)
                }
            },
            /*
            * 获取表单数据
            * @return string  格式:id=0&name=aa
            * */
            getFormData(data) {
                let myData = Util._.defaultsDeep({}, data);
                return myData;
            }
        }
    }
</script>
