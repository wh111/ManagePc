<template>
    <!-- 基本信息 - 实习生 - 查看 -->
    <el-form ref="formValidate" class="demo-form-inline cusd_content" label-width="155px">
        <!--标题-->
        <el-row>
            <el-col :span="24" class="lose-margin2" style="text-align: center">
                <span class="table-headline ">基本情况</span>
            </el-col>
        </el-row>
        <!--内容-->
        <el-row>
            <el-form-item label="姓名：" prop="name">
                {{formValidate.name}}
            </el-form-item>
            <el-form-item label="昵称：" prop="nickname">
                {{formValidate.nickname }}
            </el-form-item>
            <el-form-item label="生日：" prop="birth">
                {{formValidate.birth | formatDate }}
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                {{formValidate.sex | sex }}
            </el-form-item>
            <el-form-item label="账号：" prop="account">
                {{formValidate.account}}
            </el-form-item>
            <el-form-item label="QQ号：" prop="qq">
                {{formValidate.qq}}
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
                {{formValidate.mobile}}
            </el-form-item>
            <el-form-item label="微信账号：" prop="wechat">
                {{formValidate.wechat}}
            </el-form-item>
            <el-form-item label="所属市区：">
                {{formValidate.province }}{{ formValidate.town }}
            </el-form-item>
            <el-form-item label="年级：" prop="grade">
                {{formValidate.grade | grade }}
            </el-form-item>
            <el-form-item label="学期：" prop="school">
                {{formValidate.term | term }}
            </el-form-item>
            <el-form-item label="教材：" prop="textbookVersionList">
          <span v-for="(item,index) in formValidate.textbookVersionList" :key="index">
            <span style="margin-left: 10px">{{item.subject |
            subject}}</span> : <span>{{item.textbookVersionName}}</span>
          </span>
            </el-form-item>
            <el-form-item label="学制：" prop="internshipNum">
                {{formValidate.length | length }}
            </el-form-item>
            <el-form-item label="学校：" prop="school">
                {{formValidate.school}}
            </el-form-item>
            <el-col :span="4" class="table-back-header">
                <user-avatar :src="imgSrc" tipText="还未上传"></user-avatar>

            </el-col>
        </el-row>
        <!--审核信息-->
        <el-row>
            <el-col :span="24" class="lose-margin2" style="text-align: center;margin-top:20px">
                <span class="table-headline ">家长信息</span>
            </el-col>
        </el-row>
        <el-table
                :data="guardianData"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="relationship"
                    label="关系">
                <template slot-scope="scope">
                    {{scope.row.relationship | relationship }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="联系方式">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="status"-->
            <!--label="状态">-->
            <!--</el-table-column>-->
        </el-table>
    </el-form>
</template>
<script>
    import userAvatar from '../userAvatar.vue'

    export default {
        //props接收父组件传递过来的数据
        props: ['stuid'],
        data() {
            return {
                //form表单bind数据
                formValidate: {},
                getUrl: '/student/getMyInfo?userId=',
                getInfo: '/student/info?id=',
                guardianData: [],
                //是否显示头像
                imgSrc: '',

                id: ''
            }
        },
        updated() {

            // this.init();
        },
        created() {
            //初始化
            this.init()
        },
        methods: {
            /*
             * 组件初始化入口
             * */
            init() {

                //初始化数据
                this.ajax({
                    ajaxSuccess: this.detail,
                    ajaxParams: {
                        url: this.getUrl + this.stuid,
                        method: 'get'
                    }
                })
                this.ajax({
                    ajaxSuccess: res => this.guardianData = res.data.guardian,
                    ajaxParams: {
                        url: this.getInfo + this.stuid,
                        method: 'get'
                    }
                })

            },
            detail(res) {
                this.formValidate = res.data

                this.imgSrc = this.getStaticPath(this.formValidate.icon)

            },

            // 通过id获取查看视图
            getViewData() {
                let opt = {
                    ajaxSuccess: res => this.SuccessGetCurrData(res.data),
                    ajaxParams: {
                        url: api.get.path + this.stuid
//            params:{
//              archivesId: this.dataId,
//            }
                    }
                }
                this.ajax(opt)
            },

            /*
             * 默认组件第一次请求数据
             * @param res JSON  数据请求成功后返回的数据
             * */
            SuccessGetCurrData(data) {
                // let data = this.initData; //this.$store.state.archivesAudit.index.archivesContent.archivesBasicInfoDto;//this.initData;//responseData.data;
                if (data === null || typeof data == 'undefined' || data == '') return
                this.formValidate = this.formDate(data, ['birth', 'jobTime'], this.yearMonth)
                let env = this.$store.getters.getEnvPath
                if (data.headPhoto) {
                    //this.imgSrc = env["http"] + data.headPhoto;
                } else {
                    // this.imgSrc = "";
                }
            }
        },
        components: {
            userAvatar
        }
    }

</script>
<style lang="scss">
    .cusd_content {
        position: relative;
        .table-back-header {
            position: absolute;
            right: 16%;
            top: 1px;
        }
    }
</style>

