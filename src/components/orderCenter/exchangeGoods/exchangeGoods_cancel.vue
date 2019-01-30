<!--
****--@file     orderManage_cancel
****--@date     2017/11/24 15:54
****--@author   YC
****--@describe 撤单
-->
<template>
    <el-row>
        <el-form>
            <el-form-item>
                确定撤销该订单？
            </el-form-item>
        </el-form>
        <el-col align="center">
            <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
            <el-button @click="cancel">取消</el-button>
        </el-col>
    </el-row>
</template>
<script>
    /*当前组件必要引入*/
    import api from './api';
    //当前组件引入全局的util
    let Util = null;
    export default {
        props: ['value'],
        data() {
            return {
                //保存按钮基本信息
                loadBtn: {
                    title: '确定',
                    callParEvent: 'listenSubEvent'
                }
            }
        },
        methods: {
            //初始化请求列表数据
            init() {

            },
            listenSubEvent(isLoadingFun) {
                if (!isLoadingFun) isLoadingFun = function () {
                };
                isLoadingFun(true);
                let opt = {
                    successTitle: "撤单成功",
                    errorTitle: "撤单失败",
                    ajaxParams: {
                        url: api.cancel.path,
                        method: api.cancel.method,
                        data: {id: this.value.operailityData.id}
                    }
                };
                this.ajax(opt, isLoadingFun)
            },
            cancel() {
                this.$emit('confirm')
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