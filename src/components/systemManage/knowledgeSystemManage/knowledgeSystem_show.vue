<template>
    <el-row>
        <el-form ref="operailityData" class="demo-ruleForm" label-width="140px">
            <el-col>
                <el-form-item label="科目：">{{ showData.subject | subject }}</el-form-item>
            </el-col>
            <el-form-item label="知识点名称：">
                {{ showData.name }}
            </el-form-item>
            <el-form-item label="知识点描述：">
                {{ showData.remark || '暂无描述' }}
            </el-form-item>

            <!--<el-col :span="6">-->
            <!--<el-form-item label="学段：">{{ showData.stage | stage }}</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="年级：">{{ showData.grade | grade }}</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="学期：">{{ showData.term | term }}</el-form-item>-->
            <!--</el-col>-->

            <el-form-item label="前置知识点：">
                {{ beforeName === null ? '正在加载知识点' : beforeName || '暂无知识点' }}
            </el-form-item>
            <el-col align="center">
                <el-button type="info" @click="cancel">关闭</el-button>
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
                beforeName: null,
                showData: {
                    stage: "",
                    subject: "",
                    grade: "",
                    term: "",
                    name: "",
                    remark: ""
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
                            let beforeName = [];
                            res.data.before.map(item => beforeName.push(item.name));
                            this.beforeName = beforeName.join('、')
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
