<template>
    <el-row>
        <el-form ref="formValidate" label-width="120px">
            <el-form-item label="标题：">
                {{ showData.title }}
            </el-form-item>
            <el-form-item label="创建者：">
                {{ showData.operator }}
            </el-form-item>
            <el-form-item label="状态：">
                {{ showData.status | msgPublishStatus }}
            </el-form-item>
            <el-form-item label="创建时间：">
                {{ showData.createTime | formatDate('yyyy-MM-dd HH:mm:ss') }}
            </el-form-item>
            <el-form-item label="内容：">
                {{ showData.content }}
            </el-form-item>
            <el-col align="center">
                <!--<el-button v-if="showData.status === 0" type="success" @click="submit">发布</el-button>-->
                <el-button size="small" @click="cancel">关闭</el-button>
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
                    id: '',
                    title: "",
                    content: "",
                    operatorId: "",
                    operator: "",
                    status: "",
                    createTime: ""
                },
                formValidate: {}
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
        },
        mounted() {

        }
    }
</script>
