<template>
    <div class="moudle-wrap modal clearfix" id="content" ref="content">
        <el-col>
            <div>
                <el-form :inline="true" ref="formValidate" v-model="formValidate" class="demo-ruleForm" label-width="120px">
                    <el-row class="search-from">
                      <el-form-item label="日期：" style="margin-left: -55px">
                            <el-date-picker
                                    v-model="formValidate.time1"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                            -
                            <el-date-picker
                                    v-model="formValidate.time2"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="状态：">
                            <el-select size="small" v-model="formValidate.status" placeholder="请选择活动区域">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="已打款" value="1"></el-option>
                                <el-option label="已拒绝" value="2"></el-option>
                                <el-option label="待处理" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="formValidate.msg"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button size="small" class="search-btn" @click="searchEvent">搜索</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </div>

            <div id="myTable" ref="myTable">
                <el-table
                        sortable="custom"
                        align="center" :context="self" :height="dynamicHt" :data="tableData" tooltip-effect="dark"
                        style="width: 100%" @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="50"></el-table-column>
                  <el-table-column align="center" prop="index" label="序号" width="70px"
                                   show-overflow-tooltip></el-table-column>
                    <el-table-column
                            prop="code"
                            label="提现编号"
                            show-overflow-tooltip
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="提现人"
                            show-overflow-tooltip
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="申请时间"
                            show-overflow-tooltip
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="tipPerson"
                            label="开户人"
                            show-overflow-tooltip
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="tipNumber"
                            label="开户账号"
                            show-overflow-tooltip
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="num"
                            label="提现金额"
                            show-overflow-tooltip
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="msg"
                            label="提现理由"
                            show-overflow-tooltip
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            show-overflow-tooltip
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="240">
                        <template slot-scope="scope">
                          <el-button v-if="scope.row.status == '待处理'" size="small" class="tableMakeItem"
                                     @click="pay(scope.row)">打款
                          </el-button>
                          <el-button v-if="scope.row.status == '待处理'" size="small" class="tableMakeItem"
                                     @click="notPass(scope.row)">拒绝
                          </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin: 10px 50px 10px 0;">
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
        <!-- 打款-->
        <el-dialog title="打款" :visible.sync="payModal" width="800px">
            <pay @cancel="cancel" @add="subCallback" :operaility-data="operailityData"></pay>
            <div slot="footer" class="dialog-footer"></div>
        </el-dialog>
        <!--拒绝-->
        <el-dialog title="拒绝" :visible.sync="notPassModal" width="800px">
            <not-pass @cancel="cancel" @add="subCallback" :operaility-data="operailityData"></not-pass>
            <div slot="footer" class="dialog-footer"></div>
        </el-dialog>
    </div>
</template>
<script>
  import pay from './pay'
  import notPass from './notPass'

  let Util = null
  export default {
    data () {
      return {
        //* 表格 *//
        self: this,
        totalCount: 0,
        // loading: false,
        dynamicHt: 100, // 表格高度
        checkedPower: [],
        operailityData: {},
        tableData: [{
          index: 1,
          code: 7178337,
          name: '安琪',
          tipPerson: '安琪',
          tipNumber: 7865456755443345546,
          num: 8670,
          msg: '无',
          status: '待处理',
          time: '2017-08-09 10:00'
        }],
        formValidate: {
          time1: '',
          time2: '',
          status: '',
          msg: ''
        },
        payModal: false,
        notPassModal: false
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
          params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize}
        }
      },
      /************************** 表格 ************************/
      /*
       * 设置表格数据
       * @param isLoading Boolean 是否加载
       */
      setTableData (isLoading) {
        // Object.assign(this.queryQptions.params, this.searchObj);
        // this.ajax({
        //   ajaxSuccess: 'listDataSuccess',
        //   ajaxParams: this.queryQptions
        // }, isLoading)
      },
      // 数据请求成功回调
      listDataSuccess (res, m, loading) {
        this.totalCount = res.data.totalCount || 0
        this.tableData = this.addIndex(res.data.dataList || [])
      },
      //新增
      add () {
        this.openModel('add')
      },
      //打款
      pay (item) {
        this.operailityData = item
        this.openModel('pay')
      },
      //修改
      notPass (item) {
        this.operailityData = item
        this.openModel('notPass')
      },

      //搜索查询
      searchEvent () {
        this.setTableData()
      },
      /*
        * checkbox 选择后触发事件
        * @param val Array 存在所有的选择每一个行数据
        */
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      //设置表格及分页的位置
      setTableDynHeight () {
        let content = this.$refs.content
        let parHt = content.parentNode.offsetHeight
        let myTable = this.$refs.myTable
        let paginationHt = 60
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
      },
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
      pay, notPass
    }
  }
</script>

<style lang="scss" scoped>
    .tip {
        margin-left: 20px;
        i {
            background: #e0b9b6;
            border-radius: 50%;
            display: inline-block;
            width: 18px;
            height: 18px;
            color: #000000;
            text-align: center;
            font-weight: 600;
            margin-right: 5px;
        }
    }

</style>



