<template>
    <div>
        <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="160px">
            <el-form-item label="教材版本名称：">
                {{ formValidate.name }}
            </el-form-item>
            <el-form-item label="阶段：" prop="stage">
                <el-select v-model="formValidate.stage" placeholder="请选择" @change="stageChange">
                    <el-option label="小学" value="0"></el-option>
                    <el-option label="初中" value="1"></el-option>
                    <el-option label="高中" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学制：" prop="length">
                <el-select :disabled="formValidate.stage > 1 || formValidate.grade > 9" v-model="formValidate.length" placeholder="请选择" @change="selectChange">
                    <el-option label="六三制" value="0"></el-option>
                    <el-option label="五四制" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学期：" prop="term">
                <el-select v-model="formValidate.term" placeholder="请选择" @change="selectChange">
                    <el-option label="上学期" value="0"></el-option>
                    <el-option label="下学期" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="年级：" prop="grade">
                <el-select size="small" v-model="formValidate.grade" placeholder="" @change="selectChange">
                    <el-option v-if="formValidate.stage == '0' && formValidate.length == '0'" v-for="item in ['1','2','3','4','5','6']" :label="item | grade" :value="item" :key="item"></el-option>
                    <el-option v-if="formValidate.stage == '0' && formValidate.length == '1'" v-for="item in ['1','2','3','4','5']" :label="item | grade" :value="item" :key="item"></el-option>
                    <el-option v-if="formValidate.stage == '1' && formValidate.length == '0'" v-for="item in ['7','8','9']" :label="item | grade" :value="item" :key="item"></el-option>
                    <el-option v-if="formValidate.stage == '1' && formValidate.length == '1'" v-for="item in ['6','7','8','9']" :label="item | grade" :value="item" :key="item"></el-option>
                    <el-option v-if="formValidate.stage == '2'" v-for="item in ['10','11','12']" :label="item | grade" :value="item" :key="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="科目：" prop="subject">
                <el-select v-model="formValidate.subject" placeholder="请选择">
                    <el-option v-for="(item,index) in subjectList" :key="index" :label="item.value"
                               :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="教材内容">
                <div class="csma-chartContainer-content">
                    <!--v-if="chartContainer"-->
                    <div style="height:330px;">
                        <div id="chart-container" v-loading="!chartContainer" v-if="chartContainer"></div>
                    </div>
                    <div id="edit-panel" class="view-state">
                        <!-- <span id="chart-state-panel" class="radio-panel">
                            <input type="radio" name="chart-state" id="rd-view" value="view" checked="true"><label for="rd-view">View</label>
                            <input type="radio" name="chart-state" id="rd-edit" value="edit">
                            <label for="rd-edit">Edit</label>
                        </span> -->
                        <p class="do-type" @click="isAdd = true">添加章节</p>
                        <el-collapse-transition>
                            <div v-if="isAdd" v-show="isAdd">
                                <el-form inline label-width="100px">
                                    <!--<el-form-item label="选择节点">-->
                                    <!--<el-input></el-input>-->
                                    <!--</el-form-item>-->
                                    <el-form-item label="章节名称">
                                        <el-input v-model="chapter" placeholder="请输入第几章"></el-input>
                                        <el-input v-model="chapterText" placeholder="请章节名称"></el-input>
                                    </el-form-item>
                                    <button type="button" @click="addContent">添加</button>
                                    <br/>
                                    <el-form-item label="选择章节">
                                        <el-select v-model="chapterName" placeholder="请选择">
                                            <el-option v-for="(item,index) in datascource.children" :key="index"
                                                       :label="item.name"
                                                       :value="item.name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <br/>
                                    <el-form-item label="选择知识点">
                                        <el-select v-model="knowledgeId" placeholder="请选择" @change="knowledgeChange">
                                            <el-option v-for="(item,index) in knowledgeList" :key="index" :label="item.name"
                                                       :value="item.id"></el-option>
                                        </el-select>
                                        <el-input placeholder="请输入掌握程度" v-model="leaf"></el-input>
                                        <button type="button" @click="addChapter">添加</button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-collapse-transition>
                        <p class="do-type" @click="isAdd = false">修改章节</p>
                        <el-collapse-transition>
                            <div v-if="!isAdd" v-show="!isAdd">
                                <el-form inline label-width="100px">
                                    <el-form-item label="选择章节">
                                        <el-select v-model="chapterName" placeholder="请选择" @change="editChapterNameChange">
                                            <el-option v-for="(item,index) in datascource.children" :key="index"
                                                       :label="item.name"
                                                       :value="item.name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <br/>
                                    <el-form-item label=" ">
                                        <el-input v-model="chapterIndex" placeholder="请输入修改章节为第几章"></el-input>
                                        <el-input v-model="chapterIndexText" placeholder="请输入修改章节的章节名称"></el-input>
                                    </el-form-item>
                                    <button type="button" @click="editChapter">修改</button>
                                    <button type="button" @click="removeChapter">删除</button>
                                    <br/>
                                    <el-form-item label="选择知识点">
                                        <el-select v-model="editKnowledgeName" placeholder="请选择" @change="editKnowledgeChange">
                                            <el-option v-for="(item,index) in editKnowledgeList" :key="index" :label="item.name"
                                                       :value="item.name"></el-option>
                                        </el-select>
                                        <el-input placeholder="请输入掌握程度" v-model="editKnowledgeleaf"></el-input>
                                        <button type="button" @click="editKnowledge">修改</button>
                                        <button type="button" @click="removeKnowledge">删除</button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-collapse-transition>

                    </div>
                </div>
            </el-form-item>
            <el-form-item style="margin-left:30%">
                <!-- <el-button size="small" type="primary" @click="save">确定</el-button> -->
                <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
              <el-button class="tableMakeItemCancel" size="small" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    let Util = null;
    import $ from 'jquery'
    import '../../../assets/lib-orgchart/js/jquery.orgchart'
    //import '../../../assets/lib-orgchart/js/html2canvas.min.js'
    import api from './api'
    import {add as rules} from './rules'

    export default {
        props: {
            value: Object,
            that: Object
        },
        data() {
            return {
                rules,
                tName: '',
                leaf: '',
                chapterName: '',
                chapterText:'',
                grade: '',
                chapter: '',
                knowledgeId: '',
                knowledgeName: '',
                knowledgeList: [],
                editKnowledgeName:'',
                chartContainer: true,
                subjectList: [],
                subjectListObj: {},
                isDisabled: false,
                isLeaf: false,
                loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
                formValidate: {},
                datascource: {},
                isAdd:true,
                chapterIndex:'',
                chapterIndexText:'',
                chapterIndexTextChoice:'',
                editKnowledgeleaf:'',
                editKnowledgeList:[],
                editMessTitle: {
                    type: 'edit',
                    successTitle: '修改成功!',
                    errorTitle: '修改失败!',
                    ajaxSuccess: 'ajaxSuccess',
                    ajaxError: 'ajaxError',
                    ajaxParams: {
                        url: api.modify.path,
                        method: api.modify.method,
                        jsonString: true,
                        data: {}
                    }
                }
            }
        },
        created() {
            this.ajax({
                ajaxSuccess: res => this.knowledgeList = res.data,
                ajaxParams: {
                    url: '/knowledge/all',
                    method: 'get',
                    data: {
                        subject: this.formValidate.subject,
                        name: ''
                    }
                }
            })
        },
        methods: {
            init() {
                Util = this.$util;
                this.ajax({
                    ajaxSuccess: this.getData,
                    ajaxParams: {
                        url: api.get.path + this.value.dialogData.id,
                        method: api.get.method
                    }
                });
                let subjectListObj = {};
                this.that.$store.getters['app/gradeMap'](12).map(item => subjectListObj[item.code] = item);
                this.subjectListObj = subjectListObj;
            },
            stageChange() {
                if (this.formValidate.stage == '0') {
                    this.formValidate.grade = '1'
                } else if (this.formValidate.stage == '1') {
                    this.formValidate.grade = '7'
                } else {
                    this.formValidate.grade = '10'
                }
            },
            /**
             * 选择章节函数
             * **/
            editChapterNameChange(val){
                this.chapterIndex = val.split(' - ')[0];
                this.chapterIndexTextChoice = val.split(' - ')[1];
                this.chapterIndexText = val.split(' - ')[1];
                let that = this;
                this.datascource.children.map(item =>{
                    if(item.chapterText == that.chapterIndexText){
                        that.editKnowledgeList = item.children;
                    }
                })
            },
            /**
             * 选择章节下面对应知识点
             * ***/
            editKnowledgeChange(val){
                this.editKnowledgeName = val;
            },
            /**
             * 修改章节
             * **/
            editChapter(){
                if(this.chapterIndex == ''){
                    this.errorMess('请选择修改的章节！');
                    return false
                };
                if(this.chapterIndex == '' || this.chapterIndexText ==''){
                    this.errorMess('请输入您要修改的章节名称！');
                    return false
                }
                let that = this;
                this.datascource.children.map(item =>{
                    if(item.chapterText == that.chapterIndexTextChoice){
                        item.name = that.chapterIndex + ' - ' + that.chapterIndexText;
                        item.chapterText = that.chapterIndexText;
                    }
                });
                this.chartContainer = false;
                setTimeout(function () {
                    that.initOrgchart()
                }, 200);
                this.chapterName = '';
                this.chapterIndex = '';
                this.chapterIndexText = '';
            },
            /**
             * 删除章节
             * **/
            removeChapter(){
                if(this.chapterIndex == ''){
                    this.errorMess('请选择修改的章节！');
                    return false
                };
                let that = this;
                let ind = '';
                this.datascource.children.map((item,index) =>{
                    if(item.chapterText == that.chapterIndexTextChoice){
                        ind = index
                    }
                });
                this.datascource.children.splice(ind,1);
                this.chartContainer = false;
                setTimeout(function () {
                    that.initOrgchart()
                }, 200);
                this.chapterName = '';
                this.chapterIndex = '';
                this.chapterIndexText = '';
            },
            /**
             * 删除知识点
             * **/
            removeKnowledge(){
                let that = this;
                let ind = '';
                this.datascource.children.map(item =>{
                    if(item.chapterText == that.chapterIndexTextChoice){
                        item.children.map((child,index) =>{
                            if(child.name == that.editKnowledgeName){
                                ind = index
                            }
                        });
                        item.children.splice(ind,1)
                    }
                });
                this.chartContainer = false;
                setTimeout(function () {
                    that.initOrgchart()
                }, 200);
                this.editKnowledgeName = ''
            },
            /**
             * 修改知识点对应掌握程度
             *
             * ***/
            editKnowledge(){
                let patt = new RegExp("^[0-9]*[1-9][0-9]*$");
                if(!patt.test(this.editKnowledgeleaf)){
                    this.errorMess('掌握程度必须为整数！');
                    return false
                };
                let that = this;
                this.datascource.children.map(item =>{
                    if(item.chapterText == that.chapterIndexTextChoice){
                        item.children.map(child =>{
                            if(child.name == that.editKnowledgeName){
                                child.name = child.name.split(' --- ')[0] + ' --- ' + that.editKnowledgeleaf;
                                child.level = that.editKnowledgeleaf
                            }
                        });
                    }
                });
                this.chartContainer = false;
                setTimeout(function () {
                    that.initOrgchart()
                }, 200);
                this.editKnowledgeleaf = ''
            },
            knowledgeChange(val) {
                let that = this;
                this.knowledgeList.map(function (item) {
                    if (item.id == val) {
                        that.knowledgeName = item.name
                    }
                })
            },
            selectChange() {
                let str2 = '';
                switch (this.formValidate.grade) {
                    case '1':
                        str2 = '一年级';
                        break;
                    case '2':
                        str2 = '二年级';
                        break;
                    case '3':
                        str2 = '三年级';
                        break;
                    case '4':
                        str2 = '四年级';
                        break;
                    case '5':
                        str2 = '五年级';
                        break;
                    case '6':
                        str2 = '六年级';
                        break;
                    case '7':
                        str2 = '七年级';
                        break;
                    case '8':
                        str2 = '八年级';
                        break;
                    case '9':
                        str2 = '九年级';
                        break;
                    case '10':
                        str2 = '高一';
                        break;
                    case '11':
                        str2 = '高二';
                        break;
                    case '12':
                        str2 = '高三';
                        break;
                }
                this.grade = str2;
                this.subjectList = this.that.$store.getters['app/gradeMap'](this.formValidate.grade);
                if (this.formValidate.stage != '' && this.formValidate.term != '' && this.formValidate.subject != '') {
                    this.chartContainer = false;
                    let str1 = '';
                    let str3 = this.subjectListObj[this.formValidate.subject].value;
                    this.formValidate.term == '0' ? str1 = '上学期' : str1 = '下学期';
                    this.datascource.name = this.value.dialogData.name + '-' + this.grade + '-' + str1 + '-' + str3;
                    this.formValidate.contentTree.name = this.value.dialogData.name + '-' + this.grade + '-' + str1 + '-' + str3;
                    let that = this;
                    setTimeout(function () {
                        that.initOrgchart()
                    }, 200)
                }
            },
            getData(res) {//获取详情ajax回调函数
                let that = this;
                this.formValidate = res.data;
                this.formValidate.grade = String(this.formValidate.grade);
                this.formValidate.stage = String(this.formValidate.stage);
                this.formValidate.length = String(this.formValidate.length);
                this.formValidate.term = String(this.formValidate.term);
                this.datascource = res.data.contentTree;
                if (res.data.contentTree.children == null || res.data.contentTree.children.length == 0) return false
                res.data.contentTree.children.map(function (item, index) {
                    item.name = item.name + ' - ' + item.chapterText;
                    (item.children && item.children.length && item.children || []).map(function (child, inx) {
                        if (child.level != undefined) {
                            that.datascource.children[index].children[inx].name = child.name + ' --- ' + child.level
                        }
                    })
                })
                this.chartContainer = true;
                this.subjectList = this.that.$store.getters['app/gradeMap'](this.formValidate.grade)
                this.initOrgchart()
            },
            initOrgchart() {
                let that = this;
                this.chartContainer = true;
                this.$nextTick(function () {
                    $('#chart-container').orgchart({
                            'data': that.datascource,
                            'exportButton': false,
                            'exportFilename': 'SportsChart',
                            'parentNodeSymbol': 'fa-th-large',
                            'createNode': function ($node, data) {
                                $node.on('click', function (event) {
                                    if (!$(event.target).is('.edge')) {
                                        that.tName = data.name;
                                        $('#selected-node').val(data.name).data('node', $node);
                                        that.tName != that.datascource.name ? that.isLeaf = true : that.isLeaf = false;
                                    }
                                })
                            }
                        })
                        .on('click', '.orgchart', function (event) {
                            if (!$(event.target).closest('.node').length) {
                                $('#selected-node').val('');
                            }
                        });
                    $('.orgchart').find('tr').removeClass('hidden')
                        .find('td').removeClass('hidden')
                        .find('.node').removeClass('slide-up slide-down slide-right slide-left');
                });
            },
            blur() {
                if (this.formValidate.name != '' && this.formValidate.name != undefined) {
                    this.datascource.name = this.formValidate.name;
                    this.init()
                    this.isDisabled = true;
                }
            },
            choice(type) {//选择添加类型
                if (type === 'parent') {
                    $('#edit-panel').addClass('edit-parent-node');
                    $('#new-nodelist').children(':gt(0)').remove();
                } else {
                    $('#edit-panel').removeClass('edit-parent-node');
                }
            },
            addContent() {//添加节点
                if (this.chapter == '' || this.chapterText == '') {
                    this.errorMess('请输入您要添加的章节名称！')
                    return false;
                }
                let that = this;
                if (!this.datascource.children) {
                    this.datascource.children = [];
//          this.contentTree.children = []
                }
                this.datascource.children.push({
                    'name': this.chapter + ' - ' + this.chapterText,
                    'types': 'B',
                    'chapterText':this.chapterText,
                    'leaf': false
                })
//        this.contentTree.children.push({'name': this.chapter, 'types': 'B', 'leaf': false,})
                this.chartContainer = false;
                setTimeout(function () {
                    that.initOrgchart()
                }, 200)
            },
            addChapter() {
                let that = this;
                let patt = new RegExp("^[0-9]*[1-9][0-9]*$");
                if(!patt.test(this.leaf)){
                    this.errorMess('掌握程度必须为整数！');
                    return false
                };
                for (let i = 0; i < this.datascource.children.length; i++) {
                    if (this.datascource.children[i].name == this.chapterName) {
                        if (this.datascource.children[i].children == null || this.datascource.children[i].children == undefined) {
                            this.datascource.children[i].children = [];
                        }
                        this.datascource.children[i].children.push({
                            'knowledgeId': this.knowledgeId,
                            'name': this.knowledgeName + ' --- ' + this.leaf,
                            'types': 'C',
                            'level': this.leaf
                        })
                    }
                }
                this.chartContainer = false;
                setTimeout(function () {
                    that.initOrgchart()
                }, 200)
            },
            cancel() {
                this.$emit('confirm')
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
                if (isSubmit) {
                    if (!isLoadingFun) isLoadingFun = function () {
                    };
                    isLoadingFun(true);
//          this.formValidate.contentTree = this.datascource;
                    this.getTreeData()
//                    console.log(this.formValidate.contentTree)
                    this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
                    this.ajax(this.editMessTitle, isLoadingFun)
                }
            },
            getTreeData() {
                let that = this;
                delete this.datascource.relationship;
                if (this.datascource.children == null || this.datascource.children.length == 0) return false;
                this.datascource.children.map(function (item, index) {
                    delete item.relationship;
                    if(item.name){
                        item.name = item.name.split(' - ')[0];
                        if(item.children){
                            item.children.map(function (child, inx) {
                                that.datascource.children[index].children[inx].name = child.name.split(' --- ')[0];
                                delete child.relationship
//                            if (child.leaf != undefined) {
//                                that.datascource.children[index].children[inx].name = child.name.split(' --- ')[0]
//                            }
                            })
                        }
                    }

                })
                this.formValidate.contentTree = this.datascource
            },
            /*
            * 获取表单数据
            * @return string  格式:id=0&name=aa
            * */
            getFormData(data) {
                let myData = Util._.defaultsDeep({}, data);
                return myData;
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.init()
            })
        }
    }
</script>
<style lang="scss">
    .csma-chartContainer-content {
        .el-input {
            width: 230px;
        }
        .rigth {
            margin-right: 400px;
        }
        .el-input--suffix {
            width: 150px !important;
        }
    }

</style>

<style lang="css" scoped>
    @import '../../../assets/lib-orgchart/css/jquery.orgchart.css';
    @import '../../../assets/lib-orgchart/css/style.css';

    .csma-chartContainer-content .el-input {
        width: 230px;
    }

    #chart-container {
        background-color: #eee;
        height: auto;
    }

    .orgchart > table:first-child {
        margin: 20px auto;
    }

    .oc-export-btn {
        display: none !important;
    }
    .do-type{
        line-height: 30px;
        background: orange;
        font-size: 20px;
        margin-bottom: 10px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }
    .orgchart table {
        border-spacing: 0 !important;
        border-collapse: separate !important;
    }

    .orgchart td {
        text-align: center;
        vertical-align: top;
        padding: 0;
    }
</style>

