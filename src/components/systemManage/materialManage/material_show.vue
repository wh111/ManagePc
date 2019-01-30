<template>
    <div>
        <el-form ref="formValidate" :model="formValidate" label-width="160px">
            <el-form-item label="教材版本：">
                {{ formValidate.name }}
            </el-form-item>
            <el-form-item label="阶段：">
                {{ formValidate.stage | stage}}
            </el-form-item>
            <el-form-item label="学制：">
                {{formValidate.length | length}}
            </el-form-item>
            <el-form-item label="学期：">
                {{formValidate.term | term}}
            </el-form-item>
            <el-form-item label="年级：">
                {{formValidate.grade | grade}}
            </el-form-item>
            <el-form-item label="科目：">
                {{formValidate.subject | subject}}
            </el-form-item>
            <el-form-item label="教材内容" class="content">
                <div id="chart-container"></div>
            </el-form-item>
            <el-form-item style="margin-left:30%">
                <el-button size="small" type="info" @click="cancel">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    let Util = null;
    import $ from 'jquery'
    import '../../../assets/lib-orgchart/js/jquery.orgchart'
    //import '../../../assets/lib-orgchart/js/html2canvas.min.js'
    import api from './api'

    export default {
        props: {
            value: Object
        },
        data() {
            return {
                formValidate: {},
                datascource: {}
            }
        },
        created() {

        },
        methods: {
            init() {
                Util = this.$util;
                let that = this;
                this.ajax({
                    ajaxSuccess: this.getData,
                    ajaxParams: {
                        url: api.get.path + this.value.dialogData.id,
                        method: api.get.method
                    }
                })

            },
            getData(res) {//获取详情ajax回调函数
                this.formValidate = res.data;
                this.datascource = res.data.contentTree;
                let that = this;
                if (res.data.contentTree == undefined || res.data.contentTree.children == null || res.data.contentTree.children.length == 0) return false
                res.data.contentTree.children.map(function (item, index) {
                    item.name = item.name + ' - ' + item.chapterText;
                    (item.children && item.children.length && item.children || []).map(function (child, inx) {
                        if (child.level != undefined) {
                            that.datascource.children[index].children[inx].name = child.name + ' --- ' + child.level
                        }
                    })
                })
                $('#chart-container').orgchart({
                    'data': this.datascource,
                    'exportButton': false,
                    'exportFilename': 'SportsChart',
                    'parentNodeSymbol': 'fa-th-large'
                });
            },
            cancel() {
                this.$emit('confirm')
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.init()
            })
        }
    }
</script>
<style lang="scss" scoped>
    .content {
        .el-input {
            width: 230px;
        }
        .el-input--suffix {
            width: 150px !important;
        }
    }

</style>
<style lang="css" scoped>
    @import '../../../assets/lib-orgchart/css/jquery.orgchart.css';
    @import '../../../assets/lib-orgchart/css/style.css';

    #chart-container {
        background-color: #eee;
        height: auto;
    }

    .orgchart > table:first-child {
        margin: 20px auto;
    }

    .oc-export-btn {
        display: none !important;
    }

    .orgchart table {
        border-spacing: 0 !important;
        border-collapse: separate !important;
    }

    .orgchart td {
        text-align: center;
        vertical-align: top;
        padding: 0;
    }
</style>

