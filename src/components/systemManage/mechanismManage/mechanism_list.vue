<template>
    <div class="moudle-wrap modal clearfix" id="content" ref="content">
        <el-col>
            <div>
                <el-form :inline="true" class="demo-ruleForm" :rules="rules" :model="searchObj" ref="searchObj">
                    <el-row class="search-from">

                      <el-col :span="24" align="right">
                            <el-form-item label="机构级别">
                                <el-select style="width: 100px" v-model="searchObj.orgLevel" placeholder="请选择">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="企业" value="0"></el-option>
                                    <el-option label="学校" value="1"></el-option>
                                    <el-option label="出版社" value="2"></el-option>
                                    <el-option label="教育机构" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审核状态">
                                <el-select style="width: 100px" v-model="searchObj.auditStatus" placeholder="请选择">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="未审核" value="0"></el-option>
                                    <el-option label="审核通过" value="1"></el-option>
                                    <el-option label="审核驳回" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="机构状态">
                                <el-select style="width: 100px" v-model="searchObj.status" placeholder="请选择">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="正常" value="0"></el-option>
                                    <el-option label="冻结" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="机构名称：" prop="title">
                                <el-input size="small" v-model="searchObj.title"></el-input>
                            </el-form-item>
                            <el-form-item label="经办人：" prop="title">
                                <el-input size="small" v-model="searchObj.operator"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人：" prop="title">
                                <el-input size="small" v-model="searchObj.contacts"></el-input>
                            </el-form-item>
                            <el-button class="search-btn" size="small" type="primary" @click="searchEvent">搜索
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
          <el-col style="margin-bottom: 20px;margin-top: 10px">
            <el-button size="small" class="greenButton" @click="add">新增机构</el-button>
          </el-col>

            <div id="myTable" ref="myTable">
                <el-table sortable="custom" align="center" :context="self" :height="dynamicHt" :data="tableData"
                          tooltip-effect="dark" style="width: 100%">
                  <el-table-column prop="index" label="序号" width="70px" align="center"
                                   show-overflow-tooltip></el-table-column>
                    <el-table-column prop="title" label="机构名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="orgLevel" label="机构级别" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            {{ scope.row.orgLevel | orgLevel }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="city" label="省份／市" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            {{ scope.row.province }}
                            {{ scope.row.city }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="operator" label="经办人" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="contacts" label="联系人" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="auditStatus" label="审核状态" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            {{ scope.row.auditStatus | mechanismManageAuditStatus }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="240">
                        <template slot-scope="scope">
                          <el-button size="small" class="tableMakeItem" @click="show(scope.row)">查看</el-button>
                          <el-button size="small" v-if="!scope.row.status" class="tableMakeItem"
                                     @click="edit(scope.row)">修改
                          </el-button>
                            <template v-if="scope.row.auditStatus === 1">
                                <el-button v-if="scope.row.status" size="small"
                                           class="tableMakeItem" @click="enable(scope.row,'0')">解冻
                                </el-button>
                              <el-button v-else size="small" class="tableMakeItem"
                                         @click="enable(scope.row,'1')">冻结
                                </el-button>
                            </template>
                          <el-button v-else disabled size="small" class="tableMakeItem">冻结</el-button>
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

        </el-col>

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
    </div>
</template>
<script>
    import {mechanismManageSearch as rules} from '../rules';
    import api from './api';
    import show from "./mechanism_show";
    import edit from "./mechanism_edit";
    import add from "./mechanism_add";

    let Util = null;
    export default {
        data() {
            return {
                rules,
                //* 表格 *//
                self: this,
                totalCount: 0,
                headerContent: {
                    addId: {id: "addId", title: "新增机构"},
                    editId: {id: "editId", title: "新增机构"},
                    showId: {id: "showId", title: "新增机构"}
                },
                // loading: false,
                dynamicHt: 0, // 表格高度
                checkedPower: [],
                operailityData: {},
                tableData: [],
                searchObj: {
                    title: '', //角色名称
                    operator: '',//经办人
                    contacts: '',
                }
            };
        },
        created() {
            this.init();
        },
        methods: {
            //初始化函数
            init() {
                Util = this.$util;
                this.myPages = Util.pageInitPrams;
                this.queryQptions = {
                    url: api.list.path,
                    params: {
                        curPage: 1,
                        pageSize: Util.pageInitPrams.pageSize
                    }
                };
                this.setTableData()
            },
            /************************** 表格 ************************/
            /*
            * 设置表格数据
            * @param isLoading Boolean 是否加载
            */
            setTableData(isLoading) {
                Object.assign(this.queryQptions.params, this.searchObj);
                this.ajax({
                    ajaxSuccess: 'listDataSuccess',
                    ajaxParams: this.queryQptions
                }, isLoading)
            },
            // 数据请求成功回调
            listDataSuccess(res, m, loading) {
                this.totalCount = res.data.totalCount || 0;
              this.tableData = this.addIndex(res.data.dataList || [])
            },
            //新增
            add() {
                this.openModel("add");
            },
            //查看
            show(item) {
                this.operailityData = item;
                this.openModel("show");
            },
            //修改
            edit(item) {
                this.operailityData = item;
                this.openModel("edit");
            },

            //搜索查询
            searchEvent() {
                let isSubmit = this.handleSubmit("searchObj");
                if (isSubmit) {
                    this.setTableData();
                }
            },
            /*
            * 列表查询方法
            * @param string 查询from的id
            * */
            handleSubmit(name) {
                let flag = false;
                this.$refs[name].validate(valid => {
                    if (valid) {
                        flag = true;
                    }
                });
                return flag;
            },
            //冻结/还原
            enable(row, status) {
                let msg = {0: "解冻", 1: "冻结"};
                Util.todoConfirm({
                    close: () => this.subCallback(),
                    title: "是否冻结该机构？",
                    content: {id: status, title: msg[status] + '机构'},
                    data: {
                        api: api.enable,
                        data: {ids: row.id, status},
                        msg: msg[status]
                    }

                })
            },
            //设置表格及分页的位置
            setTableDynHeight() {
                let content = this.$refs.content;
                let parHt = content.parentNode.offsetHeight;
                let myTable = this.$refs.myTable;
                let paginationHt = 50;
                this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
            },
            /*
            * 监听子组件通讯的方法
            * 作用:根据不同的参数关闭对应的模态
            * @param targer string example:"add"、"edit"
            * */
            cancel(targer) {
                this[targer + "Modal"] = false;
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
                console.log(target)
                target && this.cancel(target);
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
                this[options + "Modal"] = true;
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
            });
        },
        components: {
            show,
            edit,
            add
        }
    };
</script>
