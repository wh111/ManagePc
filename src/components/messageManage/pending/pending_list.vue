<template>
  <div class="moudle-wrap modal clearfix" id="content" ref="content">
    <div v-if="tableData.length > 0">
      <el-col :span="14" style="margin-bottom:20px">
        <p style="font-size: 22px ;margin-bottom: 25px">待处理</p>
        <!--<el-button size="small" type="success" @click="pass">批量通过</el-button>-->
      </el-col>
      <div id="myTable" ref="myTable">
        <el-table align="center" :context="self" :height="dynamicHt" :data="tableData" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange">
          <!--<el-table-column type="selection" width="30"></el-table-column>-->
          <el-table-column label="申请类型" prop="seqName" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="申请摘要" align="center" prop="title" show-overflow-tooltip></el-table-column>
          <el-table-column label="申请人" align="center" prop="proposerName" show-overflow-tooltip></el-table-column>
          <el-table-column label="申请时间" align="center" prop="createTime" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.createTime | formatDate('yyyy-MM-dd HH:mm') }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="status" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.status | msgStatus }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.status == 'Close'" size="small" type="success" @click="handle(scope.row)">
                办理
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 10px 50px 10px 0;">
          <div style="float: right;">
            <el-pagination
              @size-change="changePageSize2"
              @current-change="changePage2"
              :current-page.sync="myPages2.currentPage"
              :page-size="myPages2.pageSize"
              layout="total,prev, pager, next, jumper"
              :total="totalCount2">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-col :span="14" style="margin:60px 0 20px 0">
        <p style="font-size: 22px ;margin-bottom: 25px">通过</p>
        <!--<el-button size="small" type="success" @click="remove('')">批量删除</el-button>-->
      </el-col>
      <div id="myTable1" ref="myTable1">
        <el-table align="center" :context="self" :height="dynamicHt" :data="tipData" tooltip-effect="dark"
                  style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="标题" prop="title" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="摘要" align="center" prop="content" show-overflow-tooltip></el-table-column>
          <el-table-column label="创建者" align="center" width="120" prop="operator"
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="创建时间" align="center" width="160" prop="createTime" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.createTime | formatDate('yyyy-MM-dd HH:mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100" align="center" prop="status" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.status | msgPublishStatus }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="240">
            <template slot-scope="scope">
              <el-button size="small" type="success" @click="show(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 10px 50px 10px 0;">
          <div style="float: right;">
            <el-pagination
              @size-change="changePageSize1"
              @current-change="changePage1"
              :current-page.sync="myPages1.currentPage"
              :page-size="myPages1.pageSize"
              layout="total,prev, pager, next, jumper"
              :total="totalCount1">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!--办理弹窗-->
    <Modal
      :mask-closable="false"
      width="1000"
      v-model="handleModal"
      title="消息处理"
      class-name="vertical-center-modal">
      <modal-header slot="header" :content="handleId"></modal-header>
      <handle v-if="handleModal" @cancel="cancel" @handle="subCallback" :operaility-data="operailityData"></handle>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
    let Util = null
    import handle from './pending_handle'
    import show from '../../systemManage/message/message_show.vue'

    export default {
        data () {
            return {
                myPages2: {},
                //* 表格 *//
                self: this,
                totalCount2: 0,
                totalCount1: 0,
                loading: false,
                dynamicHt: 350, // 表格高度
                tipData: [],
                searchObj: {},
                multipleSelection: [],
                operailityData: {},
                value: {},
                tableData: [],
                formValidate: {
                    no: '',
                    title: '',
                },
                handleModal: false,
                handleId: {
                    id: 'handleId',
                    title: '待处理消息',
                },
//        showId:{
//          id:'showId',
//          title:'查看系统消息'
//        },
                removeApi: { // 删除
                    path: '/sysMsg/remove',
                    method: 'delete',
                },
            }
        },
        created () {
            this.init()
        },
        methods: {
            init () {//初始化函数
                Util = this.$util
                this.myPages = Util.pageInitPrams
                console.log(Util.pageInitPrams)
                this.myPages1 = Util._.defaultsDeep({}, Util.pageInitPrams)
                this.myPages2 = Util._.defaultsDeep({}, Util.pageInitPrams)
                this.myPages2.currentPage = 1
                this.myPages1.currentPage = 1
                this.getAuditData()
                this.getTipData()
            },
            //改变页码
            changePageSize1 (n) {
//            let pageSize = this.queryQptions.params && (this.queryQptions.params.pageSize = n) || (this.queryQptions.pageSize = n)
//            pageSize = n
            },
            //改变页码
            changePageSize2 (n) {
//            let pageSize = this.queryQptions.params && (this.queryQptions.params.pageSize = n) || (this.queryQptions.pageSize = n)
//            pageSize = n
            },
            changePage2 (n) {
                console.log(n, 169)
                // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                let curPage = (this.queryQptions2.params && (this.queryQptions2.params.curPage = n) ||
                    (this.queryQptions2.curPage = n))
                console.log(curPage)
                this.getAuditData(curPage)
            },
            changePage () {

            },
            changePage1 (n) {
                console.log(n, 180)
                // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                let curPage = (this.queryQptions1.params && (this.queryQptions1.params.curPage = n) ||
                    (this.queryQptions1.curPage = n))
                console.log(curPage)
                this.getTipData(curPage)

            },
            getAuditData (n) {
                this.queryQptions = {
                    url: '/auditTodo/list',
                    params: {curPage: n || 1, pageSize: Util.pageInitPrams.pageSize},
                }
                Object.assign(this.queryQptions.params, this.formValidate)
                this.ajax({
                    ajaxSuccess: 'listDataSuccess',
                    ajaxParams: this.queryQptions,
                })
            },
            getTipData (size) {
                this.queryQptions1 = {
                    url: '/sysMsg/list',
                    params: {curPage: size || 1, pageSize: Util.pageInitPrams.pageSize},
                }
                Object.assign(this.queryQptions1.params, this.searchObj)
                this.ajax({
                    ajaxSuccess: 'listDataSuccess1',
                    ajaxParams: this.queryQptions1,
                })
            },
            // 数据请求成功回调
            listDataSuccess (res, m, loading) {
                this.totalCount2 = res.data.totalCount || 0
                this.tableData = this.addIndex(res.data.dataList || [])
            },
            // 数据请求成功回调
            listDataSuccess1 (res, m, loading) {
                this.totalCount1 = res.data.totalCount || 0
                this.tipData = this.addIndex(res.data.dataList || [])
                console.log(this.tipData)
            },
            /*
            * checkbox 选择后触发事件
            * @param val Array 存在所有的选择每一个行数据
            */
            handleSelectionChange (val) {
                this.multipleSelection = val
            },
            show (item) {
                Util.dialog({
                    title: '查看系统消息',
                    width: '1000px',
                    content: {id: 'showId', title: '查看系统消息'},
                    component: show,
                    data: {operailityData: item},
                    close: () => {
                    },
                    confirm: (result) => {
                    },
                })
            },
            remove (item) {//删除
                if (!(item || this.isSelected())) {
                    return false
                }
                Util.todoConfirm({
                    title: '确定删除系统消息吗？',
                    content: {id: 'todoId', title: '删除系统消息'},
                    data: {
                        data: {ids: Util.getStrByArr(item ? [item] : this.multipleSelection, 'id')},
                        api: this.removeApi,
                        msg: '删除',
                    },
                    close: () => {//关闭后触发
                        this.subCallback()
                    },
                    confirm: (result) => {
                    },
                })
            },
            /*
                  * 列表数据只能选择一个
                  * @param isOnly true  是否只选择一个
                  */
            isSelected (isOnly) {
                let len = this.multipleSelection.length
                let flag = true
                if (len == 0) {
                    this.showMess('请选择数据!')
                    flag = false
                }
                return flag
            },
            handle (item) {//办理
                this.operailityData = item
                this.openModel('handle')
            },
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
//      pass() {//批量通过
//        this.$confirm('此操作将审核通过选中的消息, 是否继续?', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {
//
//          this.$message({
//            type: 'success',
//            message: '操作成功!'
//          });
//        }).catch(() => {
//          this.$message({
//            type: 'info',
//            message: '已取消操作'
//          });
//        });
//      },
            //设置表格及分页的位置
//        setTableDynHeight(){
//            let content = this.$refs.content;
//            let parHt = content.parentNode.offsetHeight;
//            let myTable = this.$refs.myTable;
//            let paginationHt = 70;
//            this.dynamicHt = parHt - myTable.offsetTop - paginationHt;
//            this.$refs.myTable.style.height = this.dynamicHt + 'px';
//            // this.$refs.menu.style.height = myTable.parentNode.offsetHeight + 'px';
//        },
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
                this.init()
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
//        this.$nextTick(function () {
//            //初始表格高度及分页位置
//            this.setTableDynHeight();
//            //为窗体绑定改变大小事件
//            let Event = Util.events;
//            Event.addHandler(window, "resize", this.setTableDynHeight);
//        })
        },
        components: {
            handle, show,
        },
    }
</script>
