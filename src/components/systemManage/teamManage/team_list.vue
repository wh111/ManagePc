<template>
    <div class="moudle-wrap modal clearfix" id="content" ref="content">
      <el-form :rules="rules" ref="searchObj" :model="searchObj" class="demo-ruleFormsearch-from" :inline="true">
        <el-row class="search-from">
              <el-col :span="24">
                <el-form-item label="班级名称：" prop="title" style="margin-left: 10px">
                        <el-input size="small" v-model="searchObj.title"></el-input>
                    </el-form-item>
                    <el-form-item label="群号：" prop="no">
                        <el-input size="small" v-model="searchObj.no"></el-input>
                    </el-form-item>

                    <el-form-item>
                      <el-button size="small" class="search-btn" @click="searchEvent">搜索</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div id="myTable" ref="myTable">
            <el-table sortable="custom" align="center" :context="self" :height="dynamicHt" :data="tableData"
                      tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="index" label="序号" width="70px" align="center"
                               show-overflow-tooltip></el-table-column>
                <el-table-column prop="no" label="群号" width="100">
                </el-table-column>
                <el-table-column prop="title" label="群名称" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="managerName" label="创建人" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="counts" label="成员数" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.counts || 0 }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        {{ scope.row.createTime | formatDate('yyyy-MM-dd HH:mm:ss') }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="70">
                    <template slot-scope="scope">
                      <el-button size="small" class="tableMakeItem" @click="show(scope.row)">查看</el-button>
                        <!--<el-button size="small" type="warning" @click="edit(scope.row)">修改</el-button>-->
                        <!--<el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 10px 50px 10px 0;">
              <el-button :disabled="multipleSelection.length == '0'" size="small" class="deleteButton"
                         @click="remove">批量删除
              </el-button>
                <div style="float: right;">
                    <el-pagination @size-change="changePageSize" @current-change="changePage"
                                   :current-page.sync="myPages.currentPage" :page-size="myPages.pageSize"
                                   layout="total,prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!-- 修改群组 -->
        <!--<Modal :mask-closable="false" v-model="editModal" height="200" class-name="vertical-center-modal" :width="1000">-->
        <!--<modal-header slot="header" :content="headerContent.editId"></modal-header>-->
        <!--<edit v-if="editModal" @cancel="cancel" @edit="subCallback" :operaility-data="operailityData"></edit>-->
        <!--<div slot="footer"></div>-->
        <!--</Modal>-->
        <!-- 查看群组 -->
        <Modal :mask-closable="false" v-model="showModal" height="200" class-name="vertical-center-modal" :width="1000">
            <modal-header slot="header" :parent="self" :content="headerContent.showId"></modal-header>
            <show v-if="showModal" @cancel="cancel" :operaility-data="operailityData"></show>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
  import api from './api'
  import show from './team_show'
  import { team as rules } from '../rules'
  //    import edit from "./team_edit";

  let Util = null
  export default {
    data () {
      return {
        rules,
        //* 表格 *//
        self: this,
        totalCount: 0,
        // loading: false,
        dynamicHt: 0, // 表格高度
        multipleSelection: [],
        operailityData: {},
        tableData: [],
        searchObj: {
          title: '', //班级名称
          no: '' // 群号
        },
        headerContent: {
//                    editId: {
//                        id: "editId",
//                        title: "修改班组"
//                    },
          showId: {
            id: 'showId',
            title: '查看班组'
          }
        }
      }
    },
    created () {
      this.init()
    },
    methods: {
      //初始化函数
      init () {
        Util = this.$util
        this.myPages = Util.pageInitPrams
        this.queryQptions = {
          url: api.list.path,
          params: {
            curPage: 1,
            pageSize: Util.pageInitPrams.pageSize
          }
        }
        this.setTableData()
      },
      /************************** 表格 ************************/
      /*
         * checkbox 选择后触发事件
         * @param val Array 存在所有的选择每一个行数据
         */
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      /*
         * 设置表格数据
         * @param isLoading Boolean 是否加载
         */
      setTableData (isLoading) {
        Object.assign(this.queryQptions.params, this.searchObj)
        this.ajax({
          ajaxSuccess: 'listDataSuccess',
          ajaxParams: this.queryQptions
        }, isLoading)
      },
      // 数据请求成功回调
      listDataSuccess (res, m, loading) {
        this.totalCount = res.data.totalCount || 0
        this.tableData = this.addIndex(res.data.dataList || [])
      },
      //查看
      show (item) {
        this.operailityData = item
        this.openModel('show')
      },
      //修改
      edit (item) {
        this.operailityData = item
        this.openModel('edit')
      },

      //搜索查询
      searchEvent () {
        let isSubmit = this.handleSubmit('searchObj')
        if (isSubmit) {
          this.setTableData()
        }
      },
      /*
      * 列表查询方法
      * @param string 查询from的id
      * */
      handleSubmit (name) {
        let flag = false
        this.$refs[name].validate((valid) => {
          if (valid) {
            flag = true
          } else {
            this.errorMess('表单验证失败!')
          }
        })
        return flag
      },
      //批量删除
      remove () {

      },
      //设置表格及分页的位置
      setTableDynHeight () {
        let content = this.$refs.content
        let parHt = content.parentNode.parentNode.offsetHeight
        let myTable = this.$refs.myTable
        let paginationHt = 122
        this.dynamicHt = parHt - myTable.offsetTop - paginationHt
        // this.$refs.myTable.style.height = this.dynamicHt + 'px';
        // this.$refs.menu.style.height = myTable.parentNode.offsetHeight + 'px';
      },
      /*
         * 监听子组件通讯的方法
         * 作用:根据不同的参数关闭对应的模态
         * @param targer string example:"add"、"edit"
         * */
      cancel (targer) {
        this[targer + 'Modal'] = false
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
      subCallback (target, title, updata) {
        this.cancel(target)
        if (title) {
          this.successMess(title)
        }
        if (!updata) {
          this.setTableData()
        }
      },
      /*
         * 打开指定的模态窗体
         * @param options string 当前指定的模态:"add"、"edit"
         * */
      openModel (options) {
        this[options + 'Modal'] = true
      }
    },
    mounted () {
      //页面dom稳定后调用
      this.$nextTick(function () {
        //初始表格高度及分页位置
        this.setTableDynHeight()
        //为窗体绑定改变大小事件
        let Event = Util.events
        Event.addHandler(window, 'resize', this.setTableDynHeight)
      })
    },
    components: {
      show
//            edit
    }
  }
</script>

