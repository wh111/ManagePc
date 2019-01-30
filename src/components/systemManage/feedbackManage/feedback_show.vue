<template>
    <el-row>
        <el-form class="demo-ruleForm" label-width="140px">
            <el-form-item label="反馈姓名：">
                {{showData.userName}}
            </el-form-item>
            <el-form-item label="反馈内容：">
                {{showData.content}}
            </el-form-item>
            <el-form-item label="反馈回复：" v-if="showData.reply">
                {{showData.reply}}
            </el-form-item>
            <el-col align="center">
              <el-button class="tableMakeItemCancel" type="info" @click="cancel">取消</el-button>
            </el-col>
        </el-form>
    </el-row>
</template>
<script>
    let Util = null;
    import api from './api';

    export default {
        props: ['value'],
        data() {
            return {
                showData: {
                    userName: "",
                    content: "",
                    reply: ""
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Util = this.$util;
                this.getShowData()
            },
            getShowData() {
                let opt = {
                    ajaxSuccess: res => {
                        if (res.data instanceof Object) {
                            this.showData = res.data;
                        }
                    },
                    ajaxError: () => this.errorMess('获取数据失败，请重试'),
                    ajaxParams: {
                        url: api.get.path,
                        method: api.get.method,
                        params: {
                            id: this.value.operailityData.id
                        }
                    }
                };
                this.ajax(opt)
            },
            cancel() {
                this.$emit('confirm');
            }
        }
    }
</script>
