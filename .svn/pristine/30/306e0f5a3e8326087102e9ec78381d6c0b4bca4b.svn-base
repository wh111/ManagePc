<template>
    <div class="moudle-wrap modal clearfix" id="content" ref="content">
        <subject-head @change="materialChange" :showItems="showItems"></subject-head>
        <el-col>
            <div>
                <el-form class="demo-ruleForm" label-width="100px">
                    <el-row class="search-from">
                        <el-col :span="5">
                          <el-form-item label="机构名称：" style="margin-left: -7px">
                                <el-input size="small" v-model="formValidate.studentName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-button class="search-btn" size="small" type="primary" @click="searchEvent">搜索
                            </el-button>
                        </el-col>

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
                    <el-table-column prop="studentName" label="姓名" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="grade" label="成长档案" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.studentName}}的{{scope.row.grade | grade}}{{scope.row.term | term}}成长档案
                        </template>
                    </el-table-column>

                    <el-table-column prop="updateTime" label="最后更新时间" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            {{(scope.row.updateTime || scope.row.createTime) | formatDate('yyyy-MM-dd HH:mm')}}
                        </template>
                        案
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="240">
                        <template slot-scope="scope">
                          <el-button size="small" class="tableMakeItem" @click="show(scope.row)">查看</el-button>
                          <el-button size="small" class="tableMakeItem" @click="remove(scope.row)">删除</el-button>
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
        <!--查看-->
        <el-dialog title="" :visible.sync="showModal" width="1000px">
            <show @cancel="cancel" @add="subCallback" :operailityData="operailityData"></show>
            <div slot="footer" class="dialog-footer"></div>
        </el-dialog>
    </div>
</template>
<script>
  let Util = null
  import subjectHead from '../../common/subjectHead.vue'
  import show from './archives_show.vue'
  import api from './api'

  export default {
    data () {
      return {
        showItems: ['grade', 'term'],
        multipleSelection: [],
        //* 表格 *//
        self: this,
        totalCount: 0,
        loading: false,
        dynamicHt: 100, // 表格高度
        checkedPower: [],
        operailityData: '',
        tableData: [],
        formValidate: {
          grade: '',
          term: '',
          studentName: ''
        }

      }
    },
    created () {
      this.init()
      // this.openModel('show')
    },
    methods: {
      init () {
        Util = this.$util
        this.myPages = Util.pageInitPrams
        this.queryQptions = {
          url: api.studentTermArchives.path,
          params: {
            curPage: 1,
            pageSize: Util.pageInitPrams.pageSize
          }
        }
        this.setListData()
      },
      setListData (isLoading) {//初始化数据
        this.queryQptions.params = Object.assign(this.queryQptions.params, this.formValidate)
        this.ajax({
          ajaxSuccess: this.getMydataSuccess,
          ajaxParams: this.queryQptions
        }, isLoading)
      },//获取列表成功
      getMydataSuccess (res) {
        this.tableData = this.addIndex(res.data.dataList || [])
        this.totalCount = res.data.totalCount
      },
      //获取当前所选中的教材板块
      materialChange (item, sel) {
        this.formValidate.grade = sel.grade
        this.formValidate.term = sel.term
        this.init()
      },
//            //获取当前所选中的教学科目
//            subjectChange (item) {
//                console.log(item)
//            },
//            //获取当前所选中的年级
//            gradeChange (item) {
//                console.log(item)
//            },
//            //获取当前所选中的阶段
//            stageChange (item) {
//                console.log(item)
//            },
//            //获取当前所选中的单元
//            unitChange (item) {
//                console.log(item)
//            },
      //查看
      show (item) {
        this.operailityData = item
        this.openModel('show')

      },
      //搜索查询
      searchEvent () {
        this.init()
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
      //批量删除
      remove (item) {
        this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(item.id)
          this.ajax({
            ajaxSuccess: this.deleteSuccess,
            ajaxParams: {
              //baseURL:'PUBLIC',
              url: api.deleteIt.path + '?id=' + item.id,
              method: api.deleteIt.method
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      deleteSuccess () {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.init()
      },
      //设置表格及分页的位置
      setTableDynHeight () {
        let content = this.$refs.content
        let parHt = content.parentNode.offsetHeight
        let myTable = this.$refs.myTable
        let paginationHt = 50
        this.dynamicHt = parHt - myTable.offsetTop - paginationHt
        // this.$refs.myTable.style.height = this.dynamicHt + 'px';
        // this.$refs.menu.style.height = myTable.parentNode.offsetHeight + 'px';
      },
      /*
      * checkbox 选择后触发事件
      * @param val Array 存在所有的选择每一个行数据
      */
      handleSelectionChange (val) {
        this.multipleSelection = val
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
      subjectHead, show
    }
  }
</script>

