<template>
    <el-row>
        <!-- 第一步：基本配置 -->
        <el-col v-if="step===0">
            <subject-head @change="changeHeader" :hasAll="false"
                          :showItems="['textbookVersion', 'grade', 'term', 'subject']"
                          :selectItems="bindHeader()"></subject-head>
            <el-form ref="formValidate" :model="formValidate" :rules="testPaperManagementZn0" label-width="100px"
                     style="margin-top: 10px">
                <el-form-item label="题型：" prop="questionType">
                    <el-checkbox-group v-model="formValidate.questionType">
                        <template v-for="(item,index) in questionsType">
                            <!-- 基本题型中排除“填空题”和“问答题”，组合题型中排除非“公共候选项”之外的题型 -->
                            <el-checkbox
                                    v-if="(!item.groups && !~['Input','Answer'].indexOf(item.childTypes)) || (item.groups && item.publics)"
                                    :key="index" :label="item.id">
                                {{ item.name }}
                            </el-checkbox>
                        </template>
                    </el-checkbox-group>
                </el-form-item>
                <!--<el-form-item label="答题时长：" prop="times">-->
                <!--<el-input size="small" v-model="formValidate.times" style="width:33%"></el-input>-->
                <!--<span>分钟</span>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="试卷名称：" prop="name">-->
                <!--<el-input v-model="formValidate.name"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="试卷说明：" prop="remark">-->
                <!--<el-input type="textarea" :rows="4" v-model="formValidate.remark"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
        </el-col>
        <!-- 第二步：选择题目类型 -->
        <el-col v-if="step===1">
            <el-form ref="selectFormValidate" :model="selectFormValidate" :rules="testPaperManagementZn1"
                     label-width="100px">
                <el-form-item label="章节：" prop="selectChapter">
                    <el-checkbox :indeterminate="isIndeterminateChapter" v-model="checkAllChapter"
                                 v-if="chapterList" @change="handleCheckAllChapterChange">全选
                    </el-checkbox>
                    <span v-else>暂无章节（返回上一步重新选择相关信息试试）</span>
                    <el-checkbox-group v-model="selectFormValidate.selectChapter" @change="handleCheckedChapterChange">
                        <el-checkbox v-for="(item,index) in chapterList" :key="index" :label="item.id">{{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="知识点：" prop="selectknowledge">
                    <el-checkbox :indeterminate="isIndeterminateKnowledge" v-model="checkAllKnowledge"
                                 v-if="knowledgeList" @change="handleCheckAllKnowledgeChange">全选
                    </el-checkbox>
                    <span v-else>暂无知识点（换个章节试试）</span>
                    <el-checkbox-group v-model="selectFormValidate.selectknowledge"
                                       @change="handleCheckedKnowledgeChange">
                        <el-checkbox v-for="(item,index) in knowledgeList" :key="index" :label="item.id">{{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="难度：" prop="diffLevelCode">
                    <el-select v-model="selectFormValidate.diffLevelCode" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <question-diff-level-option></question-diff-level-option>
                        <!--<el-option v-for="(item,index) in projectDiffLevels" :key="index" :label="item.value"-->
                        <!--:value="item.code"></el-option>-->
                    </el-select>
                    <el-button type="warning" @click="getQuestions">筛选</el-button>
                </el-form-item>
              <el-form-item label="试卷结构：" class="paperConstrutor">
                    <el-table align="center" :context="self" maxHeight="400" class="qtt_questionKnowledgeTable"
                              :data="questions" tooltip-effect="dark" style="width: 100%">
                        <el-table-column label="知识点" prop="knowledgeName" show-overflow-tooltip></el-table-column>
                        <el-table-column v-for="(item,index) in questionHeader" :key="index" :label="item.label"
                                         min-width="200"
                                         :prop="item.prop" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <template v-if="scope.row[item.prop]">
                                    <el-input v-model="scope.row[item.prop+'_edit']" style="width: 70%"></el-input>
                                    / {{ scope.row[item.prop] }}
                                </template>
                                <span v-else>{{ scope.row[item.prop] }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="70">
                            <template slot-scope="scope">
                                <el-button size="small" type="danger" @click="removeQuestions(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
        </el-col>
        <!-- 第三步：题目分布信息 -->
        <el-col v-if="step===2">
            <el-table align="center" :context="self" maxHeight="400" :data="questionsInfo" tooltip-effect="dark"
                      :summary-method="getSummaries" show-summary>
                <el-table-column label="题型" prop="type" show-overflow-tooltip></el-table-column>
                <el-table-column label="数量" prop="num" show-overflow-tooltip></el-table-column>
                <template v-if="formValidate.scoreType === 1">
                    <el-table-column label="单题分值" prop="score" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.score" @input="setThisTotalScore(scope.row)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="总分" prop="totalScore" show-overflow-tooltip></el-table-column>
                </template>
                <el-table-column label="知识点" prop="knowledges" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <p v-for="(item,index) in scope.row.knowledges" :key="index">
                            {{ item.knowledgeName }}（{{ item.num }}）
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <h3 class="qtt_h3Title">难度预估：</h3>
            <el-row class="qtt_chartMain">
                <el-col :span="4">
                    <p class="qtt_centerText difNum">难度值：{{ (selectFormValidate.diffLevelCode || '全部') |
                        diffLevelCode(self)
                        }}</p>
                </el-col>
                <el-col :span="10">
                    <div id="questionsTypes" class="qtt_chartBox"></div>
                    <!--<p class="qtt_centerText">题型分布</p>-->
                </el-col>
                <el-col :span="10">
                    <div id="questionsKnowledges" class="qtt_chartBox"></div>
                    <!--<p class="qtt_centerText">知识点分布</p>-->
                </el-col>
            </el-row>
            <!--<el-form ref="formValidate" :model="formValidate" :rules="testPaperManagementZn2" :inline="true"-->
            <!--label-width="100px">-->
            <!--<el-col>-->
            <!--<el-form-item label="定义分数：">-->
            <!--<el-radio-group v-model="formValidate.scoreType" @change="changeScoreType">-->
            <!--<el-radio :label="2">使用试题库分数，并将总分折算为 100分</el-radio>-->
            <!--<el-radio :label="1">自定义各题型分值，总分为 {{ formValidate.score }}</el-radio>-->
            <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col>-->
            <!--<el-form-item label="答题时长：" prop="times">-->
            <!--<el-input v-model="formValidate.times">-->
            <!--<template slot="append">分钟</template>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--</el-form>-->
        </el-col>

        <el-col align="center">
            <el-button type="info" v-show="step" @click="prev">上一步</el-button>
            <el-button type="success" @click="next" v-show="step < 2">下一步</el-button>
            <load-btn @preview="preview" v-show="step === 2" :btnData="saveBtn"></load-btn>
        </el-col>
    </el-row>
</template>
<script>
    import api from '../../../questionsCenter/testPaperManagement/api'
    import {
        testPaperManagementZn0,
        testPaperManagementZn1,
        testPaperManagementZn2
    } from '../../../questionsCenter/rules'

    // import {projectDiffLevels} from '../../../../libs/projectDiffLevel';
    import questionDiffLevelOption from '../../../common/questionDiffLevelOption' // 难度组件

    import subjectHead from '@/components/common/subjectHead.vue'

    // 引入 ECharts 主模块
    var Echarts = require('echarts');

    let Util = null;
    export default {
        data() {
            return {
                self: this,
                // projectDiffLevels, // 试题难度
                testPaperManagementZn0,
                testPaperManagementZn1,
                testPaperManagementZn2,
                step: 0,
                headerKey: {'textbookVersionId': "教材", 'grade': "年级", 'term': "学期", 'subject': "科目"},
                // questionDiffMap: {}, // 试题难度区间
                questionsType: null, // 题型
                saveBtn: {title: "生成题库", callParEvent: "preview"},

                // 缓存所有章节
                allChapter: {},
                allknowledge: {}, // 缓存所有知识点
                headerSelectObj: {}, // 第一步选择的所有数据
                chapterListLen: 0,
                knowledgeListLen: 0,
                chapterList: null, // 章节
                knowledgeList: null, // 知识点
                checkAllChapter: false,
                isIndeterminateChapter: false,
                checkAllKnowledge: false,
                isIndeterminateKnowledge: false,

                questionHeader: [], // 试卷题目类型
                questions: [], // 查询试题数量（智能组卷）

                // 第二步表单
                selectFormValidate: {
                    diffLevelCode: '', // 难度
                    selectChapter: [], // 选中的章节
                    selectknowledge: [] // 选中的知识点
                },

                // 第三歩
                questionsInfo: [], // 试卷基本信息

                // 综合表单
                formValidate: {
                    textbookVersionId: '', // 版本
                    subject: "", // 科目
                    grade: "", // 年级
                    term: "", // 学期
                    stage: "", // 阶段
                    questionType: [], // 问题类型
                    types: '0', // 0智能组卷|1人工组件
                    times: "", // 考试时长
                    name: "", // 试卷名称
                    remark: "", // 试卷描述
                    score: 100, // 总分
                    scoreType: 2, // 1 自定义个题型分值 2 使用试题库分数，并将总分折算为score
                    questionsTypeScore: [],
                    condition: []
                },

                // 接口
                api: {
                    questionsType: 'questionsType/query-all', //题型
                    chapter: 'textbookContent/queryChapterList',
                    knowledge: 'textbookContent/queryKnowledgeListByChapter',
                    questions: '/questions/group' // 查询试题数量（智能组卷）
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Util = this.$util;
                // this.questionDiffMap = this.$store.getters['app/envs']('questionDiffMap');
                this.getQuestionsType();
            },
            // 筛选
            changeHeader(obj, select) {
                for (let key in this.headerKey) {
                    (select[key] !== undefined) && (this.formValidate[key] = select[key]);
                }
                this.formValidate.textbookVersionId = select.textbookVersion;
                this.headerSelectObj = obj;
            },
            // 绑定顶部筛选
            bindHeader() {
                let {textbookVersionId: textbookVersion, grade, term, subject} = this.formValidate;
                return {textbookVersion, grade, term, subject}
            },
            // 是否全选章节
            handleCheckAllChapterChange(all) {
                let selArr = []
                if (all) {
                    for (let key in this.chapterList) {
                        selArr.push(+key)
                    }
                } else {
                    this.initKnowledge();
                }
                this.selectFormValidate.selectChapter = selArr;
                this.isIndeterminateChapter = false;
                all && this.getKnowledgeDataForServer();
            },
            // 选择章节
            handleCheckedChapterChange(value) {
                let checkedCount = value.length;
                this.checkAllChapter = checkedCount === this.chapterListLen;
                this.isIndeterminateChapter = checkedCount > 0 && checkedCount < this.chapterListLen;
                if (checkedCount) {
                    this.getKnowledgeDataForServer();
                } else {
                    this.initKnowledge()
                }
            },

            // 是否全选知识点
            handleCheckAllKnowledgeChange(all) {
                let selArr = []
                if (all) {
                    for (let key in this.knowledgeList) {
                        selArr.push(+key)
                    }
                }
                this.selectFormValidate.selectknowledge = selArr;
                this.isIndeterminateKnowledge = false;
                this.getQuestions()
            },
            // 选择知识点
            handleCheckedKnowledgeChange(value) {
                let checkedCount = value.length;
                this.checkAllKnowledge = checkedCount === this.knowledgeListLen;
                this.isIndeterminateKnowledge = checkedCount > 0 && checkedCount < this.knowledgeListLen;
                this.getQuestions()
            },

            /******************************* 数据验证 **********************************/
            // 检测第一步数据是否正确
            checkedData0() {
                for (let key in this.headerKey) {
                    if (this.formValidate[key] === '') {
                        this.errorMess('请选择' + this.headerKey[key]);
                        return false
                    }
                }
                return this.submitForm('formValidate')
            },
            // 检测第一步数据是否正确
            checkedData1() {
                let canNext = true;
                let sum = 0;

                for (let i = 0, item, d = this.questions, l = d.length; i < l; i++) {
                    item = d[i];
                    for (let key in item) {
                        if (/_edit$/.test(key)) { // 取到有数量的题目输入数量
                            let num = key.replace('_edit', ''); // 原数量
                            if (item[key] && !/^\d+$/.test(item[key]) || (+item[key] > +item[num])) {
                                this.errorMess('试卷结构输入的题型数量必须是有效数字且不能大于总试题数量')
                                canNext = false;
                                break;
                            } else {
                                sum += +item[key]
                            }
                        }
                    }
                }

                let formCheck = this.submitForm('selectFormValidate');

                if (canNext && !sum) {
                    this.errorMess('至少选择一个知识点的题型才能进行下一步')
                }

                return canNext && formCheck && sum > 0
            },
            // 检测预览数据
            checkPreviewData() {
                if (this.formValidate.scoreType === 1) {
                    for (let i = 0, d = this.questionsInfo, l = d.length; i < l; i++) {
                        if (!d[i].score || !/^\d{1,2}$/.test(d[i].score)) {
                            this.errorMess('每个题型的分数必须填写并且是有效的两位数');
                            return false
                        }
                    }
                }
                return true
            },
            /******************************* 按钮交互 **********************************/
            // 上一步
            prev() {
                this.step--;
            },
            // 下一步
            next() {
                let checkData = this['checkedData' + this.step];
                if (typeof checkData === 'function' && !checkData()) {
                    // 数据检测未通过
                    return
                }
                //下一步
                this.step++;
                switch (this.step) {
                    case 1:
                        this.getQuestionHeader();
                        this.getChapterDataForServer();
                        break;
                    case 2:
                        this.getQuestionsInfo();
                        break;
                    default:
                        break;
                }
            },
            // 删除题目
            removeQuestions(index) {
                this.questions.splice(index, 1)
            },
            // 改变分数类型
            changeScoreType(type) {
                if (type === 2) {
                    this.formValidate.score = 100
                }
            },
            // 预览
            preview(isLoadingFun) {
                // if (!this.submitForm('formValidate') || !this.checkPreviewData()) {
                if (!this.checkPreviewData()) {
                    return
                }
                let data = this.getPreviewData();
                if (!isLoadingFun) isLoadingFun = function () {
                };
                isLoadingFun(true);
                let opt = {
                    ajaxSuccess: res => this.$emit('getQuestion', res.data),
                    ajaxParams: {
                        jsonString: true,
                        url: '/papers/queryQuestions',
                        method: 'post',
                        data
                    }
                };
                this.ajax(opt, isLoadingFun)
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
             * 重置当前表单
             * */
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            /*
             * 获取表单数据
             * @return string  格式:id=0&name=aa
             * */
            getFormData(data) {
                let myData = Util._.defaultsDeep({}, data);
                return myData;
            },

            // 初始化图表
            initChar(obj) {
                let charts = ['questionsTypes', 'questionsKnowledges'];
                let myChart = {};
                this.$nextTick(() => {
                    charts.map(item => myChart[item] = Echarts.init(document.getElementById(item)));
                    for (let key in myChart) {
                        myChart[key].setOption(obj[key])
                    }
                })
            },
            // 统计试卷信息
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if (!~[1, 3].indexOf(index)) {
                        return
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                    } else {
                        sums[index] = '该列只允许输入数字';
                    }
                    if (index === 3) { // 计算总分
                        this.formValidate.score = sums[index]
                    }
                });

                return sums;
            },
            // 设置该题型的总分
            setThisTotalScore(row) {
                let res = 0;
                if (!isNaN(row.num)) {
                    res = row.num * row.score
                }
                row.totalScore = res
            },
            /******************************* 数组转换 ***************************/
            // 服务器数据一对一转换为一对多
            serverToQuestions(arr) {
                let temp = {}; // 知识点去重
                let res = []; // 知识点
                let questionTypeObj = {}; // 知识点动态题型初始化
                // 初始化知识点对应的题型数量
                this.formValidate.questionType.map(item => {
                    questionTypeObj[this.getQuestionHeaderProp(item, true)] = 0; // 原数据
                    questionTypeObj[this.getQuestionHeaderProp(item, true) + '_edit'] = 0; // 编辑数据
                });

                arr.map(item => {
                    if (!temp[item.knowledgeId]) {
                        let {knowledgeId, knowledgeName} = item;
                        // 初始化知识点对应的题型
                        temp[item.knowledgeId] = this.$util.getFormData(questionTypeObj, {knowledgeId, knowledgeName});
                    }
                    // 对应知识点的题型数量赋值
                    temp[item.knowledgeId][this.getQuestionHeaderProp(item.questionsTypeId, true)] = item.total;
                });

                for (let key in temp) {
                    res.push(temp[key])
                }

                /**
                 * 知识点id        知识点        总题数 需要题数
                 * [{knowledgeId, knowledgeName,total,total_edit}]
                 */
                return res
            },
            // 获取试卷信息表格数据
            getQuestionsInfoTable() {
                let questionTypes = {}; // 所有题型
                let table = []; // 表格数据
                this.questions.map(item => {
                    /* 表格数据 */
                    for (let key in item) {
                        // 获取题型
                        if (~key.indexOf('_edit')) {
                            let res = this.getQuestionHeaderProp(key);
                            let {knowledgeId, knowledgeName} = item;
                            if (!questionTypes[res[1]]) {
                                questionTypes[res[1]] = { // 表格每一行的数据
                                    questionsTypeId: res[1], // 试题类型id
                                    type: this.questionsType[res[1]].name, // 试题类型
                                    num: 0, // 试题数量
                                    score: '', // 单题分值
                                    totalScore: 0, // 总分
                                    knowledges: [] // 知识点
                                }
                            }
                            // 累加每个知识点对应的题型数量
                            questionTypes[res[1]].num += +(item[key]);
                            // 该题型下的知识点(只有该知识点有数量才会加入到该题型下)
                            item[key] && questionTypes[res[1]].knowledges.push({
                                knowledgeId,
                                knowledgeName,
                                num: item[key], // 该知识点在该题型下的数量
                                total: item[key.replace('_edit', '')] // // 该知识点在该题型下的总数量
                            })
                        }
                    }
                })
                for (let key in questionTypes) {
                    // 删除没有使用的知识点
                    let knowledges = [];
                    questionTypes[key].knowledges.map(item => {
                        if (+item.num) {
                            knowledges.push(item)
                        }
                    });
                    questionTypes[key].knowledges = knowledges;
                    // 只有试题下有题目才会加入到表格中
                    questionTypes[key].num && table.push(questionTypes[key])
                }
                questionTypes = null;
                this.questionsInfo = table;
            },
            // 获取预览提交数据
            getPreviewData() {
                let data = this.getFormData(this.formValidate);
                let questionsTypeScore = [];
                let condition = [];

                // 分钟转换为秒
                data.times = data.times * 60;
                // 阶段
                data.stage = data.grade > 6 ? (data.grade > 9 ? 2 : 1) : '0';

                // 难度、知识点
                let {diffLevelCode} = this.selectFormValidate;
                data.diffLevelCode = diffLevelCode;

                // let difMap = this.questionDiffMap[diffLevel]; // 获取难度区间
                // let dif = ['', ''];
                // if (difMap) {
                //     dif = difMap.split(',')
                // }
                // data.diffLevelSmall = dif[0];
                // data.diffLevelBig = dif[1];

                this.questionsInfo.map(item => {
                    questionsTypeScore.push({
                        questionsTypeId: item.questionsTypeId,
                        score: data.scoreType === 1 ? item.score : '' // 自定义的分数的时候才读取分数
                    })
                    item.knowledges.map(kItem => {
                        let {knowledgeId, total, num: selectCount} = kItem;
                        condition.push({
                            questionsTypeId: item.questionsTypeId,
                            knowledgeId, total, selectCount
                        })
                    })
                })

                data.questionsTypeScore = questionsTypeScore;
                data.condition = condition;

                return data
            },
            /******************************* 数据初始化 **************************/
            initKnowledge() {
                this.selectFormValidate.selectknowledge = [];
                this.checkAllKnowledge = false;
                this.isIndeterminateKnowledge = false;
                this.knowledgeList = null;
            },
            initChapter() {
                this.selectFormValidate.selectChapter = [];
                this.checkAllChapter = false;
                this.isIndeterminateChapter = false;
                this.chapterList = null;
            },
            /******************************* 数据获取 ****************************/
            // 根据选择的所选的题型获取表格头部
            getQuestionHeader() {
                let t = [];
                this.formValidate.questionType.map(item => t.push({
                    label: this.questionsType[item].name,
                    prop: this.getQuestionHeaderProp(item, true)
                }));
                this.questionHeader = t
            },
            // 获取题型表格头部的动态字段及值
            getQuestionHeaderProp(params, getStr) {
                let str = '_';
                if (getStr) {
                    // str
                    return 'total' + str + params
                } else {
                    // []
                    return params.split(str);
                }
            },
            // 获取试卷信息
            getQuestionsInfo() {
                // 计算试卷信息
                this.getQuestionsInfoTable();
                let questionsTypesNameArr = []; // 问题类型数组
                let questionsTypesDataArr = []; // 问题类型对应的数量信息数组
                let questionsKnowledgesNameObj = {}; // 知识点类型[缓存使用]
                let questionsKnowledgesNameArr = []; // 知识点类型数组
                let questionsKnowledgesDataArr = []; // 知识点类型对应的数量信息数组

                this.questionsInfo.map(item => {
                    questionsTypesNameArr.push(item.type);
                    questionsTypesDataArr.push({value: item.num, name: item.type});
                    item.knowledges.map(kItem => {
                        let {knowledgeName: name, num: value} = kItem;
                        if (!questionsKnowledgesNameObj[kItem.knowledgeId]) {
                            questionsKnowledgesNameObj[kItem.knowledgeId] = {name, value: +value};
                        } else {
                            questionsKnowledgesNameObj[kItem.knowledgeId].value += +value
                        }
                    })
                })

                for (let key in questionsKnowledgesNameObj) {
                    questionsKnowledgesNameArr.push(questionsKnowledgesNameObj[key].name);
                    questionsKnowledgesDataArr.push(questionsKnowledgesNameObj[key])
                }

                // 计算统计图数据
                let chartsOptions = {
                    questionsTypes: {
                        title: {
                            text: '题型分布',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: questionsTypesNameArr
                        },
                        series: [
                            {
                                name: '题型分布',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: questionsTypesDataArr,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    },
                    questionsKnowledges: {
                        title: {
                            text: '知识点分布',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: questionsKnowledgesNameArr
                        },
                        series: [
                            {
                                name: '知识点分布',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: questionsKnowledgesDataArr,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    }
                };

                this.initChar(chartsOptions)
            },
            // 获取题型
            getQuestionsType() {
                this.getDataForServer('questionsType', {type: 0}, obj => this.questionsType = obj)
            },
            // 获取章节
            getChapterDataForServer() {
                // 初始化数据
                this.initChapter();
                this.initKnowledge();

                let {textbookVersionId, grade, term, subject} = this.formValidate;
                // 教材、年级、学期、科目缺一不可
                if (!textbookVersionId || !grade || term === '' || !subject) {
                    return
                }
                // 缓存数据
                let cacheKey = [textbookVersionId, grade, term, subject];
                let cacheData = this.allChapter[cacheKey.join('-')];
                if (cacheData) {
                    this.chapterList = this.$util.getFormData(cacheData) // 读取缓存
                } else {
                    // 获取数据并缓存
                    this.getDataForServer('chapter', {
                        textbookVersionId,
                        grade,
                        subject: this.headerSelectObj.subject.code,
                        term
                    }, (data, res) => {
                        this.chapterList = data;
                        this.allChapter[cacheKey.join('-')] = data;
                        this.chapterListLen = res.data.length;
                    })
                }
            },
            // 获取知识点
            getKnowledgeDataForServer() {
                this.getDataForServer('knowledge', {chapterIds: this.selectFormValidate.selectChapter.join(',')}, (data, res) => {
                    this.knowledgeList = data;
                    this.knowledgeListLen = res.data.length;
                })
            },
            // 获取试题类型组
            getQuestions() {
                // 版本、年级、学期、科目、题型
                let {grade, term, subject, questionType: questionsTypeIds} = this.formValidate;
                // 难度、知识点
                let {diffLevelCode, selectknowledge: knowledgeIds} = this.selectFormValidate;

                // let difMap = this.questionDiffMap[diffLevel]; // 获取难度区间
                // let dif = ['', ''];
                // if (difMap) {
                //     dif = difMap.split(',')
                // }

                subject = this.headerSelectObj.subject.code;
                questionsTypeIds = questionsTypeIds.join(',');
                knowledgeIds = knowledgeIds.join(',');

                // 没有知识点则不请求数据
                if (!knowledgeIds) {
                    this.selectFormValidate.selectknowledge = [];
                    this.questions = [];
                    return
                }

                this.getDataForServer('questions', {
                    grade,
                    term,
                    subject,
                    diffLevelCode, /*diffLevelSmall: dif[0], diffLevelBig: dif[1],*/
                    questionsTypeIds,
                    knowledgeIds
                }, (obj, res) => {
                    this.questions = this.serverToQuestions(res.data instanceof Array ? res.data : [])
                }, false)
            },
            // 从服务器获取选择数据
            getDataForServer(type, params, call, isObj = true) {
                let opt = {
                    ajaxSuccess: res => {
                        let data = {};
                        if (isObj && res.data instanceof Array && res.data.length) {
                            res.data.map(item => data[item.id] = item)
                        } else {
                            data = null
                        }
                        call && call(data, res)
                    },
                    ajaxError: () => this.errorMess('获取数据失败，请重试'),
                    ajaxParams: {
                        url: this.api[type],
                        params
                    }
                };
                this.ajax(opt)
            }
        }
        ,
        components: {
            subjectHead,
            questionDiffLevelOption
        }
    }
</script>

<style lang="scss">
    .qtt_questionKnowledgeTable {
        overflow: auto
    }

    ;
    .qtt_centerText {
        text-align: center;
        &.difNum {
            line-height: 220px;
        }
    }

    .qtt_h3Title {
        margin-top: 20px;
    }

    .qtt_chartMain {
        margin-bottom: 20px;
    }

    .qtt_chartBox {
        width: 100%;
        height: 200px;
    }
</style>