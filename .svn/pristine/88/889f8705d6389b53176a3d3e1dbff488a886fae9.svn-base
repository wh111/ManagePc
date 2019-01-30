<template>
  <div>
      <task-form :form="form"></task-form>
      <el-form ref="form1" :model="form1" label-width="140px">
          <el-form-item label="任务内容：">100 第一名 李晓明<br>50  第二名  王道<br>20  第三名  李丽莉</el-form-item>
      </el-form>
       <el-table
        :data="tableData"
        border
        height="200"
        :summary-method="getSummaries"
        show-summary
        style="width: 100%; margin-top: 20px">
        <el-table-column
        prop="name"
        label="类型">
        </el-table-column>
        <el-table-column
        prop="num"
        label="数量"
        width="180">
        </el-table-column>
        <el-table-column
        prop="one"
        label="单题分值">
        </el-table-column>
        <el-table-column
        prop="all"
        label="总分">
        </el-table-column>
        <el-table-column
        prop="zsd"
        label="知识点">
        </el-table-column>
        <el-table-column
        prop="time"
        label="答题时长（分钟）">
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import taskForm from './task_form'
export default {
    props:['item'],
    data(){
        return{
            form:{
                date1:'2017-08-09 10:00',
                date2:'2017-09-18 12:00'
            },
            form1:{

            },
            tableData: [{
                num: 33,
                name: '选择',
                one: '3分／题',
                all: 30,
                zsd: '汉语拼音',
                time:'30'
            },{
                num: 33,
                name: '简答',
                one: '5分／题',
                all: 30,
                zsd: '阅读理解',
                time:'40'
            },{
                num: 33,
                name: '填空',
                one: '2分／题',
                all: 20,
                zsd: '诗词',
                time:'30'
            }]
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.ajax({
              url:'get/info?status=' + this.item.status,
              method:'get',
              success:res => this.form = res.data
            })
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '总计';
                return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                sums[index] += '';
            } else {
                sums[index] = '';
            }
            });

            return sums;
        },
    },
    components:{
        taskForm
    }
}
</script>
