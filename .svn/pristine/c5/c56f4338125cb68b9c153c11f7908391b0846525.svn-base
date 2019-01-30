<template>
  <div>
      <el-form ref="form" :model="form" label-width="140px">
            <el-form-item label="任务名称：">9月9日题集投稿</el-form-item>
            <el-form-item label="类型：">题集投稿</el-form-item>
            <el-form-item label="发布者：">系统</el-form-item>
            <el-form-item label="发布至：">
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option label="全体教师" value="shanghai"></el-option>
                    <el-option label="全体学生" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布日期：">2017年08月16日</el-form-item>
            <el-form-item label="起止日期">
                <el-date-picker
                width="360px"
                v-model="form.date1"
                type="datetime"
                placeholder="选择日期时间">
                </el-date-picker>
                至
                <el-date-picker
                width="360px"
                v-model="form.date2"
                type="datetime"
                placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
        </el-form>
  </div>
</template>
<script>
let Util = null;
export default {
    props:['form'],
    data(){
        return{
            
        }
    },
    created(){
        Util = this.$util;
    }
}
</script>
