<!--
****--@file     gradeOption
****--@date     2018/1/4 下午3:30
****--@author   jhd
****--@describe   年级option
-->
<template>
    <div>
        <el-option v-for="(item,index) in gradeList" :key="index" :label="index | grade" :value="index"></el-option>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null
    export default {
        data() {
            return {
                gradeList:[]
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util;
                this.gradeList = this.$store.getters['app/envs']('gradeMap');
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
<style lang="scss">

</style>
