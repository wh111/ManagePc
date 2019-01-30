<template>
    <el-row id="content" class="cuta_content">
        <el-form label-width="160px">
            <p>基本信息</p>
            <el-form-item label="教师账号：" :span="8" prop="account">
                {{ formValidate.account }}
            </el-form-item>
            <el-form-item label="教师姓名：" :span="8" prop="name">
                {{ formValidate.name }}
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                {{ formValidate.sex | sex }}
            </el-form-item>
            <el-form-item label="教师手机号：" prop="mobile">
                {{ formValidate.mobile }}
            </el-form-item>
            <el-form-item label="生日：" prop="birth">
                {{ formValidate.birth | formatDate('yyyy-MM-dd')}}
            </el-form-item>
            <el-form-item label="身份证号：" :span="8" prop="idcard">
                {{ formValidate.idcard }}
            </el-form-item>
            <el-form-item label="上传身份证：">
                <el-col :span="14">
                    <up-load-photo-well :show="true" :onlyOnePic="true"
                                        :fileList="idcard1ImgsShow"></up-load-photo-well>
                    <p>身份证正面照</p>
                </el-col>
                <el-col :span="6">
                    <up-load-photo-well :show="true" :onlyOnePic="true"
                                        :fileList="idcard2ImgsShow"></up-load-photo-well>
                    <p>身份证背面照</p>
                </el-col>
            </el-form-item>
            <p>学历信息</p>
            <el-form-item label="最高学历：" prop="degree">
                {{ formValidate.degree }}
            </el-form-item>
            <el-form-item label="毕业学校：" prop="school">
                {{ formValidate.school }}
            </el-form-item>
            <el-form-item label="毕业时间：" prop="times">
                {{ formValidate.times | formatDate('yyyy-MM-dd') }}
            </el-form-item>
            <p>教学信息</p>
            <el-form-item label="教师资格证编号：" prop="teachCertNo">
                {{ formValidate.teachCertNo }}
            </el-form-item>
            <el-form-item label="上传教师资格证：">
                <up-load-photo-well :show="true" :fileList="teachCertImgsShow"></up-load-photo-well>
            </el-form-item>
            <el-form-item label="所属机构：" prop="orgId">
                {{ formValidate.orgName }}
            </el-form-item>
            <el-form-item label="资格种类：" prop="types">
                {{ formValidate.types | proLevel }}教师
            </el-form-item>
            <el-form-item label="任教学科：" prop="subject">
                {{ formValidate.subject | subject }}
            </el-form-item>
            <el-form-item label="使用教材：" prop="subject">
                {{ formValidate.textbookVersionList.length && formValidate.textbookVersionList[0].textbookVersionName || '-' }}
            </el-form-item>
            <el-form-item label="教学经验：" prop="teachYears">
                {{formValidate.teachYears || '0'}}年
            </el-form-item>
        </el-form>
        <div class="head-box">
            <user-avatar :src="imgSrc" :avatarTips="true" tipText="还未上传" :border="true"></user-avatar>
        </div>
    </el-row>
</template>
<script>
  let Util = null

  import api from '../../userManage/teacherManage/api'
  import userAvatar from '../userAvatar.vue' // 用户头像
  import upLoadPhotoWell from '../upLoadPhotoWell'

  export default {
    props: ['operailityData'],
    data () {
      return {
        imgSrc: '',
        organization: [],
        subjectList: [],
        idcard1Imgs: [], // 正
        idcard2Imgs: [], // 反
        // 图片查看
        idcard1ImgsShow: [],
        idcard2ImgsShow: [],
        teachCertImgsShow: [],
        //上传头像
        uploadHeaderUrl: 'file/uploadImg',
        formValidate: {
          id: '',
          account: '',
          name: '',
          sex: '0',
          birth: '',
          idcard: '',
          degree: '',
          school: '',
          times: '',
          teachCertNo: '',
          orgId: '',
          types: '0',
          subject: '',
          subjectName: '',
          teachYears: '',
          icon: '',
          idcardImgs: '',
          textbookVersionList: [],
          teachCertImgs: ''
        },
        loadBtn: {title: '提交', callParEvent: 'listenSubEvent'}
      }
    },
    created () {
      this.init()
      this.getOrganization()
      this.getShowData()
    },
    methods: {
      init () {
        Util = this.$util
        this.subjectList = this.$store.getters['app/gradeMap'](12)
      },
      getShowData () {
        let opt = {
          ajaxSuccess: res => {
            if (!(res.data instanceof Object)) {
              return
            }
            this.formValidate = res.data

            this.imgSrc = this.getStaticPath(res.data.icon)
            let idcardImgs = res.data.idcardImgs && res.data.idcardImgs.split(',') || []
            if (idcardImgs.length) {
              this.idcard1ImgsShow = [{url: this.getStaticPath(idcardImgs[0]), path: idcardImgs[0]}]
              this.idcard2ImgsShow = [{url: this.getStaticPath(idcardImgs[1]), path: idcardImgs[1]}]
              this.idcard1Imgs = [idcardImgs[0]]
              this.idcard2Imgs = [idcardImgs[1]]
            }

            let teachCertImgsArr = []
            let teachCertImgs = res.data.teachCertImgs && res.data.teachCertImgs.split(',') || []
            teachCertImgs.map(item => {
              teachCertImgsArr.push({url: this.getStaticPath(item), path: item})
            })
            this.teachCertImgsShow = teachCertImgsArr
          },
          ajaxError: 'ajaxError',
          ajaxParams: {
            url: api.get.path,
            method: api.get.method,
            params: {
              id: this.operailityData.id
            }
          }
        }
        this.ajax(opt)
      },
      getOrganization () {
        let opt = {
          ajaxSuccess: res => {
            this.organization = res.data
          },
          ajaxParams: {
            url: api.organization.path
          }
        }
        this.ajax(opt)
      },
      getStaticPath (path) {
        return path ? this.$store.getters['app/envs']('resourceHttp') + path : ''
      }
    },
    components: {
      userAvatar,
      upLoadPhotoWell
    }
  }
</script>
<style lang="scss">
    .cuta_content {
        position: relative;
        .el-form .el-input {
            width: 300px;
        }
        .head-box {
            width: 170px;
            height: 190px;
            position: absolute;
            right: 100px;
            top: 50px;
        }
        p {
            font-size: 16px;
            line-height: 50px;
        }
    }
</style>
