<!--
****--@file     productTypeOption
****--@date     2018/1/4 下午12:00
****--@author   jhd
****--@describe   商品类型 option
-->
<template>
    <div>
        <el-option v-for="item in questionTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </div>
</template>
<script>
    /*当前组件必要引入*/
    let Util = null
    export default {
        data() {
            return {
                questionTypeList: []
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                Util = this.$util;
                this.getTypeList()
            },
            getTypeList() {
                let opt = {
                    ajaxSuccess: res => this.questionTypeList = res.data,
                    ajaxParams: {
                        url: '/questionsType/query-all',
                        method: 'get'
                    }
                };
                this.ajax(opt)
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
