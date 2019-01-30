<template>
   <el-table
          sortable="custom"
          align="center" :data="tableData" tooltip-effect="dark"
          style="width: 100%"
          >
          <el-table-column
            prop="parent"
            label="家长姓名"
            align="center"
            >
            <template slot-scope="scope">
              {{value.dialogData.name}}
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="关联学生"
            show-overflow-tooltip
            align="center"
            >

          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button size="small" type="warning" @click="edit(scope.row.id)">解除</el-button>
            </template>
          </el-table-column>
        </el-table>
</template>
<script>
  let Util = null;
  import api from './api'
  export default {
    props:{
      value:Object
    },
    data() {
      return {
        tableData:[]
      }
    },
    created(){
      //给当前组件注入全局util
      Util = this.$util;
      this.init()
    },
    methods: {
      /*
       * 组件初始化入口
       * */
      init(){
        this.ajax({
          ajaxSuccess: res => this.tableData = res.data.studentList,
          ajaxParams: {
            url: '/guardian/query-guardian-student?guardianId=' + this.value.dialogData.id,
            method: 'get'
          }
        });
      },
      edit(item){
        this.$confirm('确定解除关系吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ajax({
            ajaxSuccess: res => {
              if(res.status.code == '0'){
                this.$message({
                  type: 'success',
                  message: '解除成功!'
                });
                this.init()
              }
            },
            ajaxParams: {
              url: api.unparent.path + '?guardianId='+ this.value.dialogData.id + '&studentId=' + item,
              method: api.unparent.method
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
      cancel(){
        this.$emit('close');
      },
    }
  }
</script>
