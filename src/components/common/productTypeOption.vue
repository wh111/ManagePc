<!--
****--@file     productTypeOption
****--@date     2018/1/4 下午12:00
****--@author   jhd
****--@describe   商品类型 option
-->
<template>
    <div>
        <el-option v-for="item in productTypeList" :key="item.code" :label="item.name" :value="item.code"></el-option>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null
    export default {
        data() {
            return {
                productTypeList:[]
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util;
                this.productTypeList = this.$store.getters['app/envs']('productTypeList');
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
