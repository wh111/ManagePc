<!--照片墙-->
<template>
    <div :class="{'onlyUploadShowWell': show,'onlyOnePic':onlyOnePic, 'noFile': show && !fileList.length }">
        <el-upload
                :action="action"
                list-type="picture-card"
                :file-list="fileLists"
                :on-preview="handlePictureCardPreview"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-error="onError"
                :headers="headers"
                :on-remove="handleRemove">
            <i class="el-icon-plus" v-if="!show"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny" :modal="false">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<style lang="scss">
    // 查看 隐藏删除图标
    .onlyUploadShowWell {
        li.el-upload-list__item:hover {
            .el-icon-close {
                display: none;
            }
            .el-upload-list__item-status-label {
                display: inline-block;
            }
        }
        .el-upload-list__item-actions, .el-upload--picture-card {
            display: none;
        }
    }

    .noFile {
        .uploadShow {
            display: none;
        }
    }

    .noFileTips {
        text-align: center;
        line-height: 26px;
    }

    .el-form-item__content {
        .noFileTips {
            line-height: 36px;
        }
    }

</style>

<script>
    import config from '../../config/config.js';

    export default {
        /**
         * fileList: [{url:"显示的图片路径",path:"原来的相对路径"}]
         * */
        props: ["actionUrl", "imgFile", "index", "fileList", "onlyOnePic", 'show'],
        data() {
            return {
                action: "/file/uploadImg",
                loading: false,
                dialogImageUrl: '',
                dialogVisible: false,
                idx: 0,
                fileLists: [],
                headers: ''

            };
        },
        watch: {
            fileList: function (val, oldVl) {
                this.fileLists = val || [];
            }
        },
        created() {

            if (typeof this.actionUrl != "undefined") {
                this.action = this.actionUrl;
            }
            if (typeof this.index != "undefined") {
                this.idx = this.index;
            }
            if (typeof this.fileList != "undefined") {
                this.fileLists = this.fileList;
            }
            this.action = config.ajaxUrl + this.action;
            this.headers = {
                "Token": this.$util.getCookie("Token")
            }
        },
        methods: {
            /*
             * 上传成功后处理
             * */
            handleAvatarSuccess(res, file, fileList) {
                if (res.status.code != 0) {
                    this.errorMess(res.status.msg);
                    fileList.length = fileList.length - 1;
                    return;
                }
                if (this.onlyOnePic) {
                    if (fileList.length > 1) {
                        fileList.shift();
                    }
                }
                this.$emit("upladSuccess", this.handleResData(fileList), this.idx, fileList);
            },
            handleRemove(file, fileList) {
                this.$emit("upladSuccess", this.handleResData(fileList), this.idx, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //处理server返回的数据
            handleResData(fileList) {
                let tempArr = [];
                for (var i = 0, item; i < fileList.length; i++) {
                    item = fileList[i];
                    let imgSrc = item.path; // 取值path
                    if (item.response) {
                        imgSrc = item.response.data;
                    }
                    imgSrc && tempArr.push(imgSrc);
                }
                return tempArr;
            },
            /*
             * 上传前校验
             * */
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png') || (file.type === 'image/gif');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$Notice.warning({
                        title: '只能上传图片',
                        desc: '格式为: JPG、png、gif 格式!'
                    });
                }
                if (!isLt2M) {
                    this.$Notice.warning({
                        title: '超出文件大小限制',
                        desc: '文件 ' + file.name + ' 太大，不能超过 2MB!'
                    });
                }
                return isJPG && isLt2M;
            },

            onError(error, file, fileList) {
                //文件上传失败时的钩子，返回字段为 error, file, fileList
                this.$Notice.warning({
                    title: '上传失败'
                });
            }
        }
    }
</script>
<style lang="scss">
    .onlyOnePic {
        width: 160px;
        height: 160px;
        overflow: hidden;
    }
</style>
