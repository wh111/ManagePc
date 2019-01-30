<template>
    <div class="moudle-wrap modal clearfix" id="content" ref="content">
        <el-col>
            <div>
                <el-form ref="formValidate" :rules="rules" :model="formValidate" class="demo-ruleForm"
                         label-width="120px">
                    <el-row class="search-from">
                        <el-col :span="5" style="margin-left: -20px">
                            <el-form-item label="题型名称：" prop="name">
                                <el-input size="small" v-model="formValidate.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="公用后选项：">
                                <el-select size="small" v-model="formValidate.publics" placeholder="请选择活动区域">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="是" value="1"></el-option>
                                    <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="组题：">
                                <el-select size="small" v-model="formValidate.groups" placeholder="请选择活动区域">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="是" value="1"></el-option>
                                    <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2" style="margin-left:15px">
                          <el-button size="small" class="search-btn" @click="searchEvent">搜索</el-button>
                        </el-col>

                    </el-row>
                  <el-col :span="14" style="margin-bottom:20px;margin-top: 10px">
                      <el-button size="small" class="greenButton" @click="add">新增题型</el-button>

                    </el-col>
                </el-form>
            </div>

            <div id="myTable" ref="myTable">
                <el-table
                        sortable="custom"
                        align="center" :context="self" :height="dynamicHt" :data="tableData" tooltip-effect="dark"
                        style="width: 100%" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="50" :selectable="canDel"></el-table-column>
                  <el-table-column prop="index" label="序号" align="center" width="70px"
                                   show-overflow-tooltip></el-table-column>
                    <el-table-column
                            prop="name"
                            label="题型名称"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="childTypes"
                            label="题型成分"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <!--<template v-if="scope.row.types && scope.row.types.length">-->
                            <!--<span v-for="(item,index) in scope.row.types.split(',')" :key="index">-->
                            <!--{{item | questionsBasicType }}-->
                            <!--</span>-->
                            <!--</template>-->
                            {{ scope.row.childTypes | getStr('questionsBasicType') }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="types"
                            label="题型类别"
                            show-overflow-tooltip
                            align="center">
                        <template slot-scope="scope">
                            {{ scope.row.types | questionsType }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="groups"
                            label="组题"
                            show-overflow-tooltip
                            align="center">
                        <template slot-scope="scope">
                            {{scope.row.groups | groups }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="publics"
                            label="公用后选项"
                            show-overflow-tooltip
                            align="center">
                        <template slot-scope="scope">
                            {{scope.row.publics | groups }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span v-if="scope.row.createTime">
                                {{ scope.row.createTime | formatDate('yyyy-MM-dd HH:mm') }}
                            </span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="240">
                        <template slot-scope="scope">
                          <el-button size="small" class="tableMakeItem" @click="show(scope.row)">查看</el-button>
                          <el-button size="small" class="tableMakeItem" @click="edit(scope.row)"
                                     :disabled="!scope.row.whetherModify">修改
                          </el-button>
                          <el-button size="small" class="tableMakeItem" :disabled="scope.row.id < 0"
                                     @click="remove(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin: 10px 50px 10px 0;">
                  <el-button size="small" class="deleteButton" @click="remove('')">批量删除</el-button>
                    <div style="float: right;">
                        <el-pagination
                                @size-change="changePageSize"
                                @current-change="changePage"
                                :current-page.sync="myPages.currentPage"
                                :page-size="myPages.pageSize"
                                layout="total,prev, pager, next, jumper"
                                :total="totalCount">
                        </el-pagination>
                    </div>
                </div>
            </div>

        </el-col>

        <!--新增-->
        <Modal :mask-closable="false" width="800" v-model="addModal" class-name="vertical-center-modal"
               :loading="loading">
            <modal-header slot="header" :content="addId"></modal-header>
            <edit v-if="addModal" @cancel="cancel" @add="subCallback"></edit>
            <div slot="footer"></div>
        </Modal>
        <!--新增-->
        <Modal :mask-closable="false" width="800" v-model="editModal" class-name="vertical-center-modal"
               :loading="loading">
            <modal-header slot="header" :content="editId"></modal-header>
            <edit v-if="editModal" @cancel="cancel" @edit="subCallback" :operailityData="operailityData"></edit>
            <div slot="footer"></div>
        </Modal>
        <!--查看-->
        <Modal :mask-closable="false" width="800" v-model="showModal" class-name="vertical-center-modal"
               :loading="loading">
            <modal-header slot="header" :content="showId"></modal-header>
            <show v-if="showModal" @cancel="cancel" @show="subCallback" :operailityData="operailityData"></show>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import show from './questionsType_show'
    import edit from './questionsTypeManage_input'
    import api from './api'
    import {list as rules} from './rules'

    let Util = null;
    export default {
        data() {
            return {
                rules,
                //* 表格 *//
                self: this,
                deleteUrl: api.delete.path,
                totalCount: 0,
                loading: false,
                dynamicHt: 100, // 表格高度
                checkedPower: [],
                multipleSelection: [],
                operailityData: {},
                tableData: [],
                formValidate: {
                    name: '',//题型
                    publics: '',
                    groups: ''
                },
                addId: {id: "addId", title: '添加题型'},
                editId: {id: "editId", title: '修改题型'},
                showId: {id: "showId", title: '查看题型'}
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
            // 是否可删除
            canDel(row) {
                return row.id > 0
            },
            //新增
            add() {
                this.openModel('add')
            },
            //查看
            show(item) {
                this.operailityData = item;
                this.openModel('show')
            },
            //修改
            edit(item) {
                this.operailityData = item;
                this.openModel('edit')
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
            //批量删除
            remove(item) {
                if (!(item || this.isSelected())) {
                    return false
                }
                Util.todoConfirm({
                    title: '确定删除该题型吗？',
                    content: {id: 'todoId', title: '删除该题型'},
                    data: {
                        data: {ids: Util.getStrByArr(item ? [item] : this.multipleSelection, 'id')},
                        api: api.delete,
                        msg: '删除'
                    },
                    close: () => {//关闭后触发
                        this.subCallback()
                    },
                    confirm: (result) => {
                    }
                })
            },
            /*
            * 列表数据只能选择一个
            * @param isOnly true  是否只选择一个
            */
            isSelected() {
                let len = this.multipleSelection.length;
                let flag = true;
                if (len == 0) {
                    this.showMess("请选择数据!");
                    flag = false;
                }
                return flag;
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
                let paginationHt = 102;
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
                target && this.cancel(target);
                title && this.successMess(title);
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
            show, edit
        }
    }
</script>
