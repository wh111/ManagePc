<template>
    <div class="cqqa-content">
        <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="100px" class="demo-form-inline"
                 :inline="true">
            <p>基本信息</p>
            <el-row>
                <el-form-item label="年级：" prop="grade">
                    <el-select @change="GradeChange" v-model="formValidate.grade" placeholder="请选择">
                        <grade-option-list></grade-option-list>
                    </el-select>
                </el-form-item>
                <el-form-item label="科目：" prop="subject">
                    <el-select v-model="formValidate.subject" placeholder="请选择" @change="SubjectChange">
                        <el-option v-for="(item,index) in subjectList" :key="item.code" :label="item.value"
                                   :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学期：" prop="term">
                    <el-select v-model="formValidate.term" placeholder="请选择">
                        <el-option label="上学期" value="0"></el-option>
                        <el-option label="下学期" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="添加知识点">
                    <el-select @change="getknowledgeIds" v-model="knowledgeIds" filterable placeholder="请选择">
                        <el-option v-for="item in knowledgeIdArr" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                    <el-tag style="margin-right: 5px"
                            v-for="tag in knowledgeList"
                            :key="tag.id"
                            closable
                            @close="handleClose(tag)">
                        {{tag.name}}
                    </el-tag>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="题型：" prop="questionsTypeId">
                    <el-select size="small" v-model="formValidate.questionsTypeId" placeholder="请选择"
                               @change="changeQuestionsType">
                        <el-option v-for="(item,index) in QuestionsTypeList" :key="index" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分值：" prop="score">
                    <el-input size="small" v-model="formValidate.score">分</el-input>
                </el-form-item>
                <el-form-item label="权限：" prop="openType">
                    <el-select size="small" v-model="formValidate.openType" placeholder="请选择">
                        <el-option label="共有" value="1"></el-option>
                        <el-option label="私有" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-row>
            <!--<el-row>-->
            <!--<el-form-item label="试题难度：">-->
            <!--<el-select v-model="formValidate.diffLevel">-->
            <!--<el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--</el-row>-->
            <el-row>
                <el-form-item label="题目内容：" class="width" prop="title">
                    <el-input :rows="4" size="small" type="textarea" v-model="formValidate.title"></el-input>
                    <!--<viewUEditor style="width: 84%;margin:-20px 0px 0px 101px" :name="'ud1'" @storeUE="storeUE" @getUeditorVal="getUeditorVal"-->
                    <!--:ueditor-val="ueditorVal" :ueditor-config="ueditorConfig"></viewUEditor>-->
                </el-form-item>
                <br/>
                <el-form-item label="添加文件：" class="width">
                    <upload-file class="left" :accept="'mp3|cda|WAV|MIDI|mp4|avi|flv|rmvb|rm'"
                                 @setUploadFiles="expenseFileEventTitleExtTitleType"
                                 :call-data="{titleType:2}"></upload-file>
                    <upload-file class="left" style="margin-left: 30px" :accept="'png|jpg|jpeg|bmp|gif'"
                                 @setUploadFiles="expenseFileEventTitleExtTitleType"
                                 :call-data="{titleType:1}"></upload-file>
                </el-form-item>
            </el-row>
            <div
                    v-if="formValidate.questionsTypeId == '-101' || formValidate.questionsTypeId == '-102'">
                <label class="label" style="position: relative">选项</label>
                <el-row>
                    <el-form-item v-for="(domain, index) in formValidate.questionsOptions" :key="index"
                                  class="answeritem" label=" " label-width="50px">
                        <el-input style="width: 50px;" v-model="domain.options"></el-input>
                        <el-input style="width: 700px;" size="small" v-model="domain.content"></el-input>
                        <el-button size="small" type="primary" @click="addquestionsOptions"
                                   icon="el-icon-circle-plus"></el-button>
                        <el-button v-if="index == formValidate.questionsOptions.length-1" size="small" type="warning"
                                   @click.prevent="removeQuestionsOptions"
                                   icon="el-icon-circle-close"></el-button>
                        <el-col :offset="2" style="margin-top: 20px">
                            <upload-file class="left" :accept="'mp3|cda|WAV|MIDI|mp4|avi|flv|rmvb|rm'"
                                         @setUploadFiles="expenseFileEventTitleExt"
                                         :call-data="{key:index,titleType:2}"></upload-file>
                            <upload-file class="left" style="margin-left: 30px" :accept="'png|jpg|jpeg|bmp|gif'"
                                         @setUploadFiles="expenseFileEventTitleExt"
                                         :call-data="{key:index,titleType:1}"></upload-file>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="正确答案：">
                        <el-checkbox-group v-if="formValidate.questionsTypeId == '-102'" v-model="answerList"
                                           @change="answerChange">
                            <el-checkbox v-for="(item, index) in formValidate.questionsOptions" :key="index"
                                         :label="item.options"></el-checkbox>
                        </el-checkbox-group>
                        <el-radio v-if="formValidate.questionsTypeId == '-101'"
                                  v-for="(item, index) in formValidate.questionsOptions" :key="index"
                                  v-model="formValidate.answer"
                                  :label="item.options">{{item.options}}
                        </el-radio>
                    </el-form-item>
                </el-row>
            </div>
            <div v-else-if="formValidate.questionsTypeId == '-103'">
                <el-form-item label="正确答案：">
                    <el-radio v-for="(item, index) in formValidate.questionsOptions" :key="index"
                              v-model="formValidate.answer"
                              :label="item.options">{{item.options}}
                    </el-radio>
                </el-form-item>
            </div>
            <div v-else-if="formValidate.questionsTypeId == '-104'" style="position: relative">
                <label class="label">正确答案</label>
                <el-row style="margin-left: 100px">
                    <el-form-item v-for="(domain, index) in formValidate.questionsKeyword" :key="index">
                        <el-col>
                            <el-input style="width: 750px;" v-model="domain.tag"></el-input>
                            <el-button size="small" type="primary" @click="addquestionsKeyword"
                                       icon="el-icon-circle-plus"></el-button>
                        </el-col>
                    </el-form-item>
                    <div>
                        <el-button size="small" type="warning" @click.prevent="removeQuestionsKeyword"
                                   icon="el-icon-circle-close"></el-button>
                    </div>
                </el-row>
            </div>
            <div v-else="formValidate.questionsTypeId == '-105'">
                <el-form-item label="正确答案：">
                    <el-input style="width: 600px;" :rows="4" size="small" type="textarea"
                              v-model="formValidate.answer"></el-input>
                </el-form-item>
            </div>
            <el-row style="margin-top: 15px">
                <el-form-item label="题目解析：" class="width" prop="answer">
                    <el-input :rows="4" size="small" type="textarea" v-model="formValidate.answerExplain"></el-input>
                </el-form-item>
            </el-row>
            <el-form-item style="margin:20px 0 0 40%">
                <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
                <el-button class="tableMakeItemCancel" size="small" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import api from './api'
    import gradeOptionList from '../../common/gradeOption.vue'
    import {questionsManageAdd as rules} from '../rules'

    let Util = null
    //  import subjectHeader from '../../common/subjectHead.vue'

    export default {
        data() {
            return {
                rules,
                fileList: [],
                subjectList: [{value: '语文', code: 'Chinese'}, {value: '数学', code: 'Math'}, {
                    value: '英语',
                    code: 'English'
                }],
                knowledgeIds: '',
                knowledgeIdArr: {},
                knowledgeList: [],
                answerList: [],
                loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
                QuestionsTypeList: [],//题型列表
                formValidate: {
                    textbookVersionId: "",   // 教材版本ID
                    subject: "Chinese",   //科目
                    grade: "1",     //年级：1-12
                    term: "0",      //学期：0上学期/1下学期
                    openType: "1",     //权限：0共有题库/1私有题库
                    diffLevel: "0",     //难度：1-10
                    questionsTypeId: -101,     //题型ID
                    score: "",    //分值
                    knowledgeIds: "",   //知识点ID，多个逗号隔开
                    titleType: "0",    //题目类别：0文字/1图片/2音视频
                    titleExt: "",    //图片或音视频路径
                    title: "",     //题目内容：文字或文件路径
                    answer: "",    //正确答案：多个| 隔开
                    answerExplain: "",     //答案解析
                    questionsOptions: [     // 单选题、多选题、判断题 必填。填空题不需要此项。
                        {
                            optionsType: "",    //题目类别：0文字/1图片/2音视频
                            optionsExt: "",      //图片或音视频路径
                            options: "A",         //选项(A/B/C)
                            content: ""          //选项文字内容
                        },
                        {
                            optionsType: "",    //题目类别：0文字/1图片/2音视频
                            optionsExt: "",      //图片或音视频路径
                            options: "B",         //选项(A/B/C)
                            content: ""          //选项文字内容
                        },
                        {
                            optionsType: "",    //题目类别：0文字/1图片/2音视频
                            optionsExt: "",      //图片或音视频路径
                            options: "C",         //选项(A/B/C)
                            content: ""          //选项文字内容
                        },
                        {
                            optionsType: "",    //题目类别：0文字/1图片/2音视频
                            optionsExt: "",      //图片或音视频路径
                            options: "D",         //选项(A/B/C)
                            content: ""          //选项文字内容
                        }
                    ],
                    questionsKeyword: [{  //填空题必填。单选题、多选题、判断题 不需要此项。
                        tag: "",             //关键词
                        weight: 1         // 权重
                    }]
                },
                //当前组件提交(add)数据时,ajax处理的 基础信息设置
                addMessTitle: {
                    type: 'add',
                    callback: 'add',
                    successTitle: '添加成功!',
                    errorTitle: '添加失败!',
                    ajaxSuccess: res => this.$emit('add', 'add', '添加成功'),
                    ajaxError: 'ajaxError',
                    ajaxParams: {
                        jsonString: true,
                        url: api.add.path,
                        method: api.add.method
                    }
                },
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Util = this.$util;
                this.getKnowledges();
                this.getQuestionsTypeList()
            },
            expenseFileEventTitleExtTitleType(ids, fileList, callData) {
                if(callData.titleType) {
                    this.formValidate.titleType = callData.titleType
                } else {
                    this.formValidate.titleType = 0
                }
                this.formValidate.titleExt = ids
            },
            expenseFileEventTitleExt(ids, fileList, callData) {
                this.formValidate.questionsOptions.map(function(item, index) {
                    if(index == callData.key) {
                        item.optionsExt = ids;
                        item.optionsType = callData.titleType
                    }
                })
            },
            changeQuestionsType() {
                if(this.formValidate.questionsTypeId == '-103') {
                    this.formValidate.questionsOptions = [{
                        optionsType: "",    //题目类别：0文字/1图片/2音视频
                        optionsExt: "",      //图片或音视频路径
                        options: "对",         //选项(A/B/C)
                        content: ""          //选项文字内容
                    },
                        {
                            optionsType: "",    //题目类别：0文字/1图片/2音视频
                            optionsExt: "",      //图片或音视频路径
                            options: "错",         //选项(A/B/C)
                            content: ""          //选项文字内容
                        }]
                } else if(this.formValidate.questionsTypeId == '-101' || this.formValidate.questionsTypeId == '-102' || this.formValidate.questionsTypeId == -101) {
                    this.formValidate.questionsOptions = [{
                        optionsType: "",    //题目类别：0文字/1图片/2音视频
                        optionsExt: "",      //图片或音视频路径
                        options: "A",         //选项(A/B/C)
                        content: ""          //选项文字内容
                    },
                        {
                            optionsType: "",    //题目类别：0文字/1图片/2音视频
                            optionsExt: "",      //图片或音视频路径
                            options: "B",         //选项(A/B/C)
                            content: ""          //选项文字内容
                        },
                        {
                            optionsType: "",    //题目类别：0文字/1图片/2音视频
                            optionsExt: "",      //图片或音视频路径
                            options: "C",         //选项(A/B/C)
                            content: ""          //选项文字内容
                        },
                        {
                            optionsType: "",    //题目类别：0文字/1图片/2音视频
                            optionsExt: "",      //图片或音视频路径
                            options: "D",         //选项(A/B/C)
                            content: ""          //选项文字内容
                        }]
                } else if(this.formValidate.questionsTypeId == '-104' || this.formValidate.questionsTypeId == '-105') {
                    this.formValidate.questionsOptions = []
                }
            },
            GradeChange(val) {
                this.subjectList = this.$store.getters['app/gradeMap'](val)
            },
            /*
            * 知识点随着科目变化更新函数
            *
            * */
            SubjectChange(val) {
                this.formValidate.subject = val
                this.getKnowledges()
            },
            answerChange(val) {
                this.formValidate.answer = val.join('|')
            },
            getQuestionsTypeList() {
                this.ajax({
                    ajaxSuccess: res => {
                        this.QuestionsTypeList = res.data
                    },
                    ajaxParams: {
                        url: '/questionsType/list?types=0',
                        method: 'get',
                    }
                })
            },
            /*
            * 获取知识点
            * */
            getKnowledges() {
                this.ajax({
                    ajaxSuccess: res => {
                        let obj = {};
                        if(res.data instanceof Array) {
                            res.data.map(item => obj[item.id] = item)
                        }
                        this.knowledgeIdArr = obj
                    },
                    ajaxParams: {
                        url: '/knowledge/all?subject=' + this.formValidate.subject,
                        method: 'get',
                    }
                })
            },
            /*
            * 知识点删除回调
            * **/
            handleClose(tag) {
                this.knowledgeList.splice(this.knowledgeList.indexOf(tag), 1);
            },
            /*
            * 选中知识点展示
            * **/
            getknowledgeIds(val) {
                let obj = this.knowledgeIdArr[val];
                if(this.knowledgeList.indexOf(obj) < 0) {
                    this.knowledgeList.push(obj)
                }
            },
            /**
             *
             * 存储编辑器的value值
             * @param name {string}  编辑器的name
             *
             * @param val  {string}  编辑器的内容
             *
             */
            getUeditorVal(name, val) {
                this.ueditorVal[name] = val;
                this.formValidate.title = this.ueditorVal.ud1;

            },

            /**
             *
             * 存储编辑器的UE.editor对象
             * @param name {string}  编辑器的name
             *
             * @param editor {}      编辑器的对象
             *
             */
            storeUE(name, editor) {
                this.UE[name] = editor;
            },
            /*
             * 取消
             *
             * */
            cancel() {
                this.$emit('cancel', 'add');
            },
            removeQuestionsOptions() {
                var index = this.formValidate.questionsOptions.length - 1;
                if(index > 1) {
                    this.formValidate.questionsOptions.splice(index, 1)
                }
            },
            addquestionsOptions() {
                this.formValidate.questionsOptions.push({
                    optionsType: "",    //题目类别：0文字/1图片/2音视频
                    optionsExt: "",      //图片或音视频路径
                    options: "",         //选项(A/B/C)
                    content: ""          //选项文字内容
                });
            },
            removeQuestionsKeyword() {
                var index = this.formValidate.questionsKeyword.length - 1
                if(index > 1) {
                    this.formValidate.questionsKeyword.splice(index, 1)
                }
            },
            addquestionsKeyword() {
                this.formValidate.questionsKeyword.push({
                    tag: "",             //关键词
                    weight: 1         // 权重
                });
            },

            /*
           * 点击提交按钮 监听是否提交数据
           * @param isLoadingFun boolean  form表单验证是否通过
           * */
            listenSubEvent(isLoadingFun) {
                let that = this
                let arr = [];
                this.knowledgeList.map(item => {
                    arr.push(item.id)
                })
                if(this.formValidate.questionsTypeId == '-102') {
                    this.formValidate.answer = this.answerList.join()
                } else if(this.formValidate.questionsTypeId == '-104') {
                    this.formValidate.questionsKeyword.map(function(item) {
                        that.formValidate.answer += item.tag
                    })
                }
                if(this.formValidate.answer == '') {
                    this.errorMess('请填写试题答案！')
                    return false
                }
                this.formValidate.knowledgeIds = arr.join()
                if(this.formValidate.knowledgeIds == '') {
                    this.errorMess('请选择知识点！')
                    return false
                }
                let isSubmit = this.submitForm("formValidate");
                if(isSubmit) {
                    if(!isLoadingFun) isLoadingFun = function() {
                    };
                    isLoadingFun(true);
                    this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
                    console.log(this.addMessTitle.ajaxParams.data)
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
        },
        components: {
            gradeOptionList
        }
    }
</script>

<style lang="scss">
    .cqqa-content {
        .label {
            font-size: 14px;
            margin-left: 20px;
        }
        .remove-btn {
            position: absolute;
            bottom: 164px;
            right: 328px;
        }
        .keyword {
            position: absolute;
            bottom: 123px;
            right: 258px;
        }
        .answeritem {
            width: 900px;
            margin: 0 0 20px 30px;
            .el-input {
                display: inline-block;
            }
        }
        .upload-demo {
            margin-top: 10px;
            .el-upload-list {
                margin: -40px 100px;
            }
        }
        p {
            font-size: 20px;
            line-height: 30px;
        }

        .width .el-input, .width .el-textarea {
            width: 800px;
        }
    }
</style>

