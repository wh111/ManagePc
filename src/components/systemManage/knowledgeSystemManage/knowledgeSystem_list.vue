<template>
    <div class="moudle-wrap modal clearfix" id="content" ref="content">
      <div class="skk_moudle-head" style="padding: 10px 0">
          <p><b>科目：</b>
                <span @click="changeSubject('')" :class="formValidate.subject === '' ? 'is-active' : ''">全部</span>
                <span v-for="(item,index) in subjects" :key="index"
                      :class="formValidate.subject === item.code ? 'is-active' : ''"
                      @click="changeSubject(item.code)"><i></i>{{ item.value }}</span>
            </p>
        </div>

        <div>
            <el-form :inline="true" :model="formValidate" :rules="rules" ref="formValidate" class="demo-ruleForm">
              <el-row class="search-from" style="padding-left: 13px">
                    <el-form-item label="知识点名称：" prop="name">
                        <el-input v-model="formValidate.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button size="small" class="search-btn" @click="searchEvent">搜索</el-button>
                    </el-form-item>
                </el-row>
              <el-col style="margin-bottom:20px;margin-top: 10px">
                  <el-button size="small" class="greenButton" @click="add">新增知识点</el-button>
                  <el-button :disabled="!formValidate.subject" size="small" class="orangeButton"
                             @click="showKnowledge">
                        查看知识点组织图
                    </el-button>
                </el-col>
            </el-form>
        </div>

        <div id="myTable" ref="myTable">
            <el-table sortable="custom" align="center" :context="self" :height="dynamicHt" :data="tableData"
                      tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="index" label="序号" align="center" width="70px"
                               show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" label="知识点名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="remark" label="描述" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.remark || '——' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="240">
                    <template slot-scope="scope">
                      <el-button size="small" class="tableMakeItem" @click="show(scope.row)">查看</el-button>
                      <el-button size="small" class="tableMakeItem" @click="edit(scope.row)">设置</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 10px 50px 10px 0;">
                <div style="float: right;">
                    <el-pagination @size-change="changePageSize" @current-change="changePage"
                                   :current-page.sync="myPages.currentPage" :page-size="myPages.pageSize"
                                   layout="total,prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!-- 模态框 增加（add） -->
        <Modal :mask-closable="false" v-model="addModal" height="200" title="对话框标题" class-name="vertical-center-modal"
               :width="840">
            <modal-header slot="header" :content="headerContent.addId"></modal-header>
            <add v-if="addModal" @cancel="cancel" @add="subCallback"></add>
            <div slot="footer"></div>
        </Modal>
        <!-- 模态框 编辑（edit） -->
        <Modal :mask-closable="false" v-model="editModal" height="200" title="对话框标题" class-name="vertical-center-modal"
               :width="840">
            <modal-header slot="header" :content="headerContent.editId"></modal-header>
            <edit v-if="editModal" @cancel="cancel" @edit="subCallback" :operaility-data="operailityData"></edit>
            <div slot="footer"></div>
        </Modal>
        <!-- 模态框 查看（view） -->
        <Modal :mask-closable="false" v-model="showModal" height="200" title="对话框标题" class-name="vertical-center-modal"
               :loading="true"
               :width="840">
            <modal-header slot="header" :parent="self" :content="headerContent.showId"></modal-header>
            <show v-if="showModal" @cancel="cancel" :operaility-data="operailityData"></show>
            <div slot="footer"></div>
        </Modal>
        <!-- 模态框 查看（view） -->
        <Modal :mask-closable="false" v-model="showKnowledgeModal" height="200" title="对话框标题"
               class-name="vertical-center-modal" :loading="true"
               :width="1000">
            <modal-header slot="header" :parent="self" :content="headerContent.showKnowledgeId"></modal-header>
            <show-knowledge v-if="showKnowledgeModal" @cancel="cancel"
                            :operailityData="operailityData"></show-knowledge>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import subjectHead from '../../common/subjectHead.vue'
    import add from './knowledgeSystem_add'
    import show from './knowledgeSystem_show'
    import showKnowledge from './showKnowledge_show'
    import edit from './knowledgeSystem_edit'
    import api from './api'
    import {subjects} from '../../../libs/subjects'
    import {knowledgeSystemManageList as rules} from '../rules'

    let Util = null;
    export default {
        data() {
            return {
                rules,
                subjects,
                //* 表格 *//
                self: this,
                totalCount: 0,
                // loading: false,
                dynamicHt: 100, // 表格高度
                checkedPower: [],
                operailityData: {},
                stage: '全部',
                subject: '全部',
                tableData: [],
                formValidate: {
                    name: '',
                    textbookId: '', // 教材id
                    subject: '', // 科目
                    grade: '', // 年级
                    term: '' // 学期
                },
                showKnowledgeModal: false,
                headerContent: {
                    addId: {id: "addId", title: "新增知识点"},
                    editId: {id: "editId", title: "新增知识点"},
                    showId: {id: "showId", title: "新增知识点"},
                    showKnowledgeId: {id: "showKnowledgeId", title: "查看知识图谱"}
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            //初始化函数
            init() {
                Util = this.$util;
                this.myPages = Util.pageInitPrams;
                this.queryQptions = {
                    url: api.list.path,
                    params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize}
                }
                this.setTableData();
            },
            /************************** 表格 ************************/
            /*
             * 设置表格数据
             * @param isLoading Boolean 是否加载
             */
            setTableData(isLoading) {
                Object.assign(this.queryQptions.params, this.formValidate);
                this.ajax({
                    ajaxSuccess: 'listDataSuccess',
                    ajaxParams: this.queryQptions
                }, isLoading)
            },
            // 数据请求成功回调
            listDataSuccess(res, m, loading) {
                this.totalCount = res.data.totalCount || 0;
                this.tableData = this.addIndex(res.data.dataList || []);
            },
            //筛选
            changeHeader(obj, select) {
//                for (let key in this.formValidate) {
//                    this.formValidate[key] = select[key];
//                }
//                this.formValidate.textbookVersionId = select.textbookVersion;
//                this.setTableData()
            },
            //查看知识点组织结构图
            showKnowledge() {
                this.operailityData = {subject: this.formValidate.subject};
                this.openModel('showKnowledge')
            },
            //新增知识点
            add() {
                Util.dialog({
                    title: '新增知识点',
                    width: '600px',
                    content: {id: 'addId', title: '新增知识点'},
                    component: add,
                    close: () => {//关闭后触发
                        this.subCallback()
                    },
                    confirm: (result) => {
                    }
                })
            },
            edit(item) {
                Util.dialog({
                    title: '设置知识点',
                    width: '1000px',
                    content: {id: 'editId', title: '设置知识点'},
                    component: edit,
                    data: {operailityData: item},
                    close: () => {//关闭后触发
                        this.subCallback()
                    },
                    confirm: (result) => {
                    }
                })
            },
            //查看
            show(item) {
                Util.dialog({
                    title: '查看知识点',
                    width: '1000px',
                    content: {id: 'showId', title: '查看知识点'},
                    component: show,
                    data: {operailityData: item},
                    close: () => {
                    },
                    confirm: (result) => {
                    }
                })
            },
            //反馈
            feedback(item) {
                this.operailityData = item;
                this.openModel('feedback');
            },

            //搜索查询
            searchEvent() {
                let isSubmit = this.handleSubmit('formValidate');
                if (isSubmit) {
                    this.setTableData()
                }
            },
            /*
           * 列表查询方法
           * @param string 查询from的id
           * */
            handleSubmit(name) {
                let flag = false
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        flag = true;
                    } else {
                        this.errorMess('表单验证失败!');
                    }
                })
                return flag
            },

            changeSubject(val) {
                this.formValidate.subject = val;
                this.setTableData()
            },
            /*
             * checkbox 选择后触发事件
             * @param val Array 存在所有的选择每一个行数据
             */
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //设置表格及分页的位置
            setTableDynHeight() {
                let content = this.$refs.content;
                let parHt = content.parentNode.offsetHeight;
                let myTable = this.$refs.myTable;
                let paginationHt = 110;
                this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
                // this.$refs.myTable.style.height = this.dynamicHt + 'px';
                // this.$refs.menu.style.height = myTable.parentNode.offsetHeight + 'px';
            },
            /*
             * 监听子组件通讯的方法
             * 作用:根据不同的参数关闭对应的模态
             * @param targer string example:"add"、"edit"
             * */
            cancel(targer) {
                this[targer + 'Modal'] = false;
            },
            /*
             * 监听子组件通讯的方法
             * 作用:ajax请求成功回调,该监听方法在libs/util 中的混合模式下定义回调
             * @param targer string example:"add"、"edit"
             * @param targer string 提示返回的ajax回调返回的信息改信息在对应的子组件中定义
             * 例如:errorTitle、errorTitle
             *addMessTitle:{
             *    type:'add',
             *    successTitle:'添加成功!',
             *    errorTitle:'添加失败!',
             *    ajaxSuccess:'ajaxSuccess',
             *    ajaxError:'ajaxError',
             *    ajaxParams:{
             *      url:'/role/add',
             *      method:'post'
             *    }
             *    }
             * @param udata boolean 默认false  是否不需要刷新当前表格数据
             * */
            subCallback(target, title, updata) {
                this.cancel(target);
                if (title) {
                    this.successMess(title);
                }
                if (!updata) {
                    this.setTableData();
                }
            },
            /*
             * 打开指定的模态窗体
             * @param options string 当前指定的模态:"add"、"edit"
             * */
            openModel(options) {
                this[options + 'Modal'] = true;
            }
        },
        mounted() {
            //页面dom稳定后调用
            this.$nextTick(function () {
                //初始表格高度及分页位置
                this.setTableDynHeight();
                //为窗体绑定改变大小事件
                let Event = Util.events;
                Event.addHandler(window, "resize", this.setTableDynHeight);
            })
        },
        components: {
            subjectHead,
            add,
            show,
            edit,
            showKnowledge
        }
    }

</script>

<style lang="scss">
    .skk_moudle-head {
        width: 100%;
        font-size: 16px;
        background: #ffffff;
        padding-bottom: 10px;
        border-bottom: 2px solid #cccccc;
        p {
          line-height: 24px;
            padding-left: 20px;
          font-size: 14px;
            span {
                display: inline-block;
                cursor: pointer;

                i {
                    border: 1px solid #bfbfbf;
                    font-size: 12px;
                    margin: 0 15px;
                }
            }
            .is-frist {
                border-left: none;
            }
            .is-active {
              color: #11a63f;
            }
        }
    }
</style>
