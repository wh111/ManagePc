<!-- 操作确认弹窗 -->
<template>
    <el-row>
        <div class="c_todoTitle">{{ title }}</div>
        <el-col align="right">
            <load-btn @handleRemove="handleRemove" :btnData="loadBtn"></load-btn>
          <el-button class="but-col tableMakeItemCancel" @click="cancel">取消</el-button>
        </el-col>
    </el-row>
</template>

<style lang="scss">
    .c_todoTitle {
        padding: 15px;
        text-indent: 2em;
    }
</style>

<script>
    let Util;
    export default {
//        props: ['operailityData', 'deleteUrl'],
        props: ['postOption', 'title'],
        data() {
            return {
                loadBtn: {title: '确定', callParEvent: 'handleRemove'}
            }
        },
        created() {
            Util = this.$util;
        },
        methods: {
            cancel() {
                this.$emit('confirm');
            },
            handleRemove(isLoadingFun) {
                isLoadingFun(true);
                let opt = {
                    callback: 'close',
                    errorTitle: this.postOption.msg + '失败',
                    successTitle: this.postOption.msg + '成功',
                    ajaxSuccess: "ajaxSuccess",
                    ajaxError: "ajaxError",
                    ajaxParams: {
                        url: this.postOption.api.path,
                        method: this.postOption.api.method
                    }
                };
                if (this.postOption.api.method === 'delete') {
                    opt.ajaxParams.params = this.postOption.data
                } else {
                    opt.ajaxParams.data = this.postOption.data
                }
                this.ajax(opt, isLoadingFun)
            }
        }

    }
</script>
