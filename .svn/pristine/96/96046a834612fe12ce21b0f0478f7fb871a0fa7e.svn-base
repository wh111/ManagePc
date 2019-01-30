<template>
  <div class="moudle-wrap modal clearfix" id="content" ref="content">
    <el-col>
      <div>
        <el-form ref="formValidate" :model="formValidate" label-width="100px" class="demo-ruleForm">
          <el-row class="search-from">
            <el-col :span="4">
              <el-form-item label="性别：" prop="status" style="margin-left: -37px">
                <el-select size="small" v-model="formValidate.sex" placeholder="" @change="request()">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="答题数：" prop="sort">
                <el-select size="small" v-model="formValidate.sort" placeholder="" @change="request()">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="回答数量" value="answerNum"></el-option>
                  <el-option label="采纳数量" value="adoptNum"></el-option>
                </el-select>
              </el-form-item>


            </el-col>
            <el-col :span="4">
              <el-form-item label="顺序：" prop="orderBy">
                <el-select size="small" v-model="formValidate.orderBy" placeholder="" style="width: 193px"
                           @change="request()">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="从高到低" value="DESC"></el-option>
                  <el-option label="从低到高" value="ASC"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="科目：" prop="subject">
                <el-select size="small" v-model="formValidate.subject" placeholder="" @change="request()">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="(item,index) in subjectList" :key="item.code" :label="item.value"
                             :value="item.code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="margin-right:15px;">
              <el-form-item label="搜索：">
                <el-input size="small" v-model="formValidate.name" placeholder="输入教师姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-top:5px;">
              <el-button size="small" class="search-btn" style="margin-top: 0" @click="request()">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div id="myTable" ref="myTable">
        <el-table align="center" :context="self" :height="dynamicHt" :data="tableData" tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column prop="index" align="center" label="序号" width="70px" show-overflow-tooltip></el-table-column>
          <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="性别" align="center" prop="sex" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="编号" align="center" prop="teachCertNo" width="120"
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="所属机构" align="center" prop="orgName" show-overflow-tooltip></el-table-column>
          <el-table-column label="答题数" align="center" prop="answerNum" show-overflow-tooltip></el-table-column>
          <el-table-column label="采纳数" align="center" prop="adoptNum" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center" width="210">
            <template slot-scope="scope">
              <el-button size="small" class="tableMakeItem" @click="show(scope.row)">查看</el-button>
              <el-button v-if="scope.row.levelStatus != 1" size="small" class="tableMakeItem" @click="edit(scope.row)">
                提升为名师
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
      <!--查看详情弹窗-->
      <!--<el-dialog title="解题详情" v-if="showModal" width="1000px">-->
      <!--<getTeacherReply :id="id" @cancel="cancel" @add="subCallback"></getTeacherReply>-->
      <!--<div slot="footer" class="dialog-footer"></div>-->
      <!--</el-dialog>-->


    </el-col>
    <!--&lt;!&ndash;查看&ndash;&gt;-->
    <!--<Modal :mask-closable="false" width="1000" v-model="showModal" title="查看任务" class-name="vertical-center-modal" :loading="loading">-->
    <!--<modal-header slot="header" :content="showId"></modal-header>-->
    <!--<show v-if="showModal" @cancel="cancel" @show="subCallback" :operaility-data="operailityData"></show>-->
    <!--<div slot="footer"></div>-->
    <!--</Modal>-->
    <Modal
      :mask-closable="false"
      width="1000"
      v-model="showModal"
      title="解题详情"
      class-name="alertSelftest1" :loading="loading">
      <modal-header slot="header" :content="selfTextAlert"></modal-header>
      <!---->
      <get-teacher-reply v-if="showModal" :id="id" @cancel="cancel" @add="subCallback"></get-teacher-reply>
      <div slot="footer"></div>
    </Modal>
  </div>


</template>
<script>
    //   import add from './goodsList_add.vue'
    //import show from '../../common/users/teacherDetail.vue'
    import getTeacherReply from './getTeacherReply.vue'
    import api from './api'
    //   import edit from './goodsList_edit.vue'
    let Util = null
    export default {
        data () {
            return {
                loading: true,
                id: '',
                teacherId: '',
                //* 表格 *//
                self: this,
                totalCount: 0,
                // loading: false,
                dynamicHt: 100, // 表格高度
                showModal: false,
                multipleSelection: [],
                operailityData: {},
                subjectList: null,
                tableData: [],
                selfTextAlert: {
                    id: 'confirmId',
                    title: '解题详情',
                },
                formValidate: {
                    sex: '',//男女
                    sort: '',//回答数量/采纳数量
                    orderBy: '',//顺序
                    name: '',//搜索姓名
                    subject: '',//科目
                },
                // 模态框提示
                /*--按钮button--*/
                addId: {
                    id: 'add',
                    title: '新增商品',
                },
                showId: {
                    id: 'show',
                    title: '查看',
                },
                editId: {
                    id: 'edit',
                    title: '修改',
                },
            }
        },
        created () {

            this.init()
            this.subjectList = this.$store.getters['app/gradeMap'](12)
        },
        watch: {},
        methods: {
            request () {
                this.setTableData()
            },
            //初始化函数
            init () {
                Util = this.$util
                this.myPages = Util.pageInitPrams
                this.queryQptions = {
                    url: api.teacherList.path,
                    params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize},
                }
                this.setTableData()

            },
            setTableData (isLoading) {
                this.queryQptions.params = Object.assign(this.queryQptions.params, this.formValidate)
                this.ajax({
                    ajaxSuccess: 'listDataSuccess',
                    ajaxParams: this.queryQptions,
                }, isLoading)
            },
//            listDataSuccess (res) {
//                this.tableData = res.data
//                this.totalCount = res.totalCount
//            },
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

            // 数据请求成功回调
            listDataSuccess (res, m, loading) {
                this.totalCount = res.data.totalCount || 0,
                    this.tableData = this.addIndex(res.data.dataList || [])
                this.tableData.map(function (item) {
                    if (item.sex == '0') {
                        item.sex = '男'
                    } else if (item.sex == '1') {
                        item.sex = '女'
                    }
                    return item
                })
            },
            //查看
            show (item) {
                console.log(item.id)
                this.id = item.id
//                this.openModel('show')
                this.showModal = true
            },
            //修改
            edit (index) {
                console.log(index)
                this.$confirm('是否将该老师权限提升问名师?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.changeVip(index.id)

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作',
                    })
                })
            },
            changeVip (i) {
                this.ajax({//更改名师
                    ajaxSuccess: this.RightSend,
                    ajaxParams: {
                        url: api.level.path,
                        method: api.level.method,
                        data: {
                            id: i,
                        },
                    },
                })
            },
            RightSend () {
                this.$message({
                    type: 'success',
                    message: '执行成功!',
                })
                this.init()
            },

            handleOpen (key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose (key, keyPath) {
                console.log(key, keyPath)
            },
            //搜索查询
            searchEvent () {
                let isSubmit = this.handleSubmit('formValidate')
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
            //设置表格及分页的位置
            setTableDynHeight () {
                let content = this.$refs.content
                let parHt = content.parentNode.offsetHeight
                let myTable = this.$refs.myTable
                let paginationHt = 50
                this.dynamicHt = parHt - myTable.offsetTop - paginationHt
                this.$refs.myTable.style.height = this.dynamicHt + 'px'
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
            getTeacherReply,
        },
    }
</script>
<style lang="scss" scoped>
  .clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
  }

  .clearfix {
    zoom: 1;
  }

  .el-col-20 {
    width: 86%;
    margin-left: 1%;
  }

  #menu {
    overflow-y: scroll;
  }

  .btn-lable {
    font-size: 16px;
  }
</style>



