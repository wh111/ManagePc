<!--
****--@file     questionDiffLevelOption
****--@date     2018/1/4 9:49
****--@author   YC
****--@describe 试题难度选项组件
-->
<template>
    <div>
        <el-option v-for="(item,index) in projectDiffLevels" :key="index"
                   :label="item.value"
                   :value="item.code"></el-option>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    //当前组件引入全局的util
    let Util = null;
    export default {
        data() {
            return {
                projectDiffLevels: [] // 题型
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                let questionDiffMap = this.$store.getters['app/envs']('questionDiffMap');
                let temp = [];
                if (questionDiffMap instanceof Object) {
                    for (let key in questionDiffMap) {
                        temp.push({value: questionDiffMap[key], code: key})
                    }
                }
                this.projectDiffLevels = temp;
            }

        },
        created() {
            this.init();
        },
        mounted() {
        },
        components: {}
    }

</script>