<template>
    <el-row class="smm_box">
        <el-form label-width="160px">
            <h3>基本信息</h3>
            <el-form-item label="机构名称：" prop="title">{{formValidate.title}}
            </el-form-item>
            <el-form-item label="机构地址：" prop="address">{{formValidate.address}}
            </el-form-item>
            <el-form-item label="联系人：" prop="contacts">{{formValidate.contacts}}
            </el-form-item>
            <el-form-item label="手机：" prop="mobile">{{formValidate.mobile}}
            </el-form-item>
            <el-form-item label="电话：" prop="telephone">{{formValidate.telephone}}
            </el-form-item>
            <el-form-item label="国家：" prop="country">{{formValidate.country}}
            </el-form-item>
            <el-form-item label="省份：" prop="province">{{formValidate.province}}
            </el-form-item>
            <el-form-item label="市县：" prop="city">{{formValidate.city}} {{formValidate.county}}
            </el-form-item>
            <el-form-item label="邮编：" prop="postcode">{{formValidate.postcode}}
            </el-form-item>
            <el-form-item label="机构级别：" prop="orgLevel">{{formValidate.orgLevel | orgLevel}}
            </el-form-item>
            <el-form-item label="行业级别：" prop="proLevel">{{formValidate.proLevel | proLevel}}
            </el-form-item>
            <el-form-item label="重要级别：" prop="impLevel">{{formValidate.impLevel | impLevel}}
            </el-form-item>
            <h3>其他信息</h3>
            <el-form-item label="经办人：" prop="operator">{{formValidate.operator}}
            </el-form-item>
            <el-form-item label="年费：" prop="yearFee">{{formValidate.yearFee}}
            </el-form-item>
            <el-form-item label="经办时间：" prop="startTime">{{formValidate.startTime | formatDate('yyyy-MM-dd')}}
            </el-form-item>
            <el-form-item label="截止时间：" prop="endTime">{{formValidate.endTime | formatDate('yyyy-MM-dd')}}
            </el-form-item>
            <el-form-item label="审核状态：" prop="auditStatus">
                {{ formValidate.auditStatus | mechanismManageAuditStatus }}
            </el-form-item>
            <el-form-item label="备注信息：" prop="remark">
                {{ formValidate.remark }}
            </el-form-item>
        </el-form>
    </el-row>
</template>
<script>
    import api from './api';

    let Util = null;
    export default {
        props: ['operailityData'],
        data() {
            return {
                formValidate: {
                    id: "",
                    title: '',//机构名称
                    address: '',//机构地址
                    contacts: '',//联系人
                    mobile: '',//手机
                    telephone: '',//电话
                    country: '',//国家
                    province: '',//省
                    city: '',//市
                    county: '',
                    postcode: '',//邮编
                    orgLevel: '',//机构级别
                    proLevel: '',//行业级别
                    impLevel: '',//重要级别
                    operator: '',//经办人
                    yearFee: '',//年费
                    startTime: '',//经办时间
                    endTime: '',//截止时间
                    auditStatus: '',//状态
                    remark: ''//备注
                }
            }
        },
        created() {
            this.getShowData()
        },
        methods: {
            getShowData() {
                let opt = {
                    ajaxSuccess: res => {
                        if (res.data instanceof Object) {
                            for (let key in this.formValidate) {
                                this.formValidate[key] = res.data[key]
                            }
                        }
                    },
                    ajaxParams: {
                        url: api.get.path,
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
<style lang="scss">
    .smm_box {
        h3 {
            padding-left: 50px;
            line-height: 50px;
            margin-bottom: 15px;
            border-bottom: 2px solid #ccc;
        }

        .el-input {
            width: 400px;
        }

        .el-date-editor--date {
            width: 300px !important;
        }
    }
</style>

