<template>
    <div>
        <el-form ref="itemData" v-model="itemData" class="demo-ruleForm" label-width="140px">
            <el-form-item label="题型名称：" prop="name">
                {{itemData.name}}
            </el-form-item>
            <el-form-item label="题型成分：" prop="childTypes">
                <template slot-scope="scope">
                    {{ itemData.childTypes | getStr('questionsBasicType') }}
                </template>
            </el-form-item>
            <el-form-item label="组题：" prop="groups">
                <template slot-scope="scope">
                    {{itemData.groups | groups }}
                </template>
            </el-form-item>
            <el-form-item label="公用后选项：" prop="publics">
                <template slot-scope="scope">
                    {{itemData.publics | groups }}
                </template>
            </el-form-item>
            <el-form-item label="创建时间：" prop="createTime">
                <template slot-scope="scope">
                    <span v-if="itemData.createTime">
                        {{ itemData.createTime | formatDate('yyyy-MM-dd HH:mm') }}
                    </span>
                    <span v-else>-</span>
                </template>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    let Util = null;
    import api from './api'

    export default {
        props: ['operailityData'],
        data() {
            return {
                itemData: {}
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Util = this.$util;
                let opt = {
                    ajaxSuccess: res => this.itemData = res.data,
                    ajaxParams: {
                        url: api.get.path,
                        method: api.get.method,
                        params: {
                            id: this.operailityData.id
                        }
                    }
                };
                this.ajax(opt)
            }
        }
    }
</script>
