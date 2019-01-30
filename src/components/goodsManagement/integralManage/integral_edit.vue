<template>
    <div>
        <el-form :rules="rules" ref="formValidate" :model="formValidate" label-width="120px">
            <el-form-item label="商品标题：" prop="title">
                <el-input :disabled="isEdit" size="small" v-model="formValidate.title"></el-input>
            </el-form-item>
            <el-form-item label="商品副标题：" prop="subtitle">
                <el-input :disabled="isEdit" size="small" v-model="formValidate.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="出版社：" prop="press">
                <el-input :disabled="isEdit" size="small" v-model="formValidate.press"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="types">
                <el-select :disabled="isEdit" size="small" v-model="formValidate.types" placeholder="请选择">
                    <product-type-option></product-type-option>
                </el-select>
                <!-- <span v-if="formValidate.type == '付费商品'"><el-input size="small" v-model="formValidate.price"></el-input>  元</span>
                <span v-else><el-input size="small" v-model="formValidate.price"></el-input>  积分</span> -->
            </el-form-item>
            <el-form-item label="折扣（折）" prop="discount">
                <el-input :disabled="isEdit" class="item" v-if="self" v-model="formValidate.discount"></el-input>
                <el-select :disabled="isEdit" v-else size="small" v-model="formValidate.discount" placeholder="请选择">
                    <el-option label="不打折" value="100"></el-option>
                    <el-option v-for="(item,index) in discount" :key="index" :label="(index+1) + '折'"
                               :value="item"></el-option>
                </el-select>
                <el-button :disabled="isEdit" @click="self = !self">自定义</el-button>
            </el-form-item>
            <el-form-item label="商品单位：" prop="unit">
                <el-select :disabled="isEdit" size="small" v-model="formValidate.unit" placeholder="请选择">
                    <el-option label="套" value="0"></el-option>
                    <el-option label="份" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="阶段：" prop="stage">
                <el-select :disabled="isEdit" size="small" v-model="formValidate.stage" placeholder="请选择">
                    <el-option label="小学" value="0"></el-option>
                    <el-option label="初中" value="1"></el-option>
                    <el-option label="高中" value="2"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="商品状态：">
                <el-select size="small" v-model="formValidate.status" placeholder="请选择">
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="审核驳回" value="2"></el-option>
                    <el-option label="下架" value="3"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="销量：" prop="sales">
                <el-input class="item" size="small" v-model="formValidate.sales"></el-input>
            </el-form-item>
            <!-- <el-form-item
                v-for="(lable, index) in formValidate.lable"
                :label="'商品标签' + (index + 1)"
                :key="lable.key"
                :prop="'lable.' + index + '.value'"
                :rules="{
                    required: true, message: '标签不能为空', trigger: 'blur'
                }"
            >
                <el-input size="small" v-model="lable.value"></el-input>
                <el-button size="small" @click.prevent="removeLable(lable)">-</el-button>
                <el-button size="small" @click="addLable">+</el-button>
            </el-form-item> -->
            <el-form-item label="试题选择：">
                <el-button :disabled="isEdit" size="small" type="primary" @click="choice">从试题库中选择</el-button>
            </el-form-item>
            <el-form-item label="内含试卷" style="max-height: 400px">
                <p v-if="formValidate.paperList" v-for="tag in paperList">
                    <el-tag :key="tag.name" closable
                            @close="handleClose(tag)">
                        {{tag.name}}
                    </el-tag>
                </p>
                <span v-else>无</span>
            </el-form-item>
            <!--<el-form-item label="包含章节：">-->
                <!--<el-select @change="getknowledgeIds" v-model="knowledgeIds" filterable placeholder="请选择">-->
                    <!--<el-option v-for="item in knowledgeIdArr" :key="item.id" :label="item.name"-->
                               <!--:value="item"></el-option>-->
                <!--</el-select>-->
                <!--<i v-if="formValidate.papers == ''" style="color:red;">请先从题库中选择试卷！</i>-->
                <!--<i v-else>请选取1-10个重要知识点</i>-->
                <!--<br/>-->
                <!--<el-tag-->
                        <!--v-for="tag in knowledgeList"-->
                        <!--:key="tag.name">-->
                    <!--{{tag.name}}-->
                <!--</el-tag>-->
            <!--</el-form-item>-->
            <el-form-item label="商品规格：" prop="spec">
                <el-input :disabled="isEdit" class="item" disabled size="small" v-model="formValidate.spec"></el-input>
            </el-form-item>
            <el-form-item label="商品图片：">
                <el-upload
                        :action="actionUrl"
                        list-type="picture-card"
                        show-file-list
                        :limit="4"
                        :file-list="fileList"
                        :before-upload="beforeAvatarUpload"
                        :on-success="uploadSuccess">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，图片分辨率不小于550*550且不超过2M</div>
                </el-upload>
                <el-radio style="margin-left: 48px;" v-for="(item,index) in fileList" :key="index" v-model="radio"
                          :label="item.name">设置为主图
                </el-radio>
            </el-form-item>
            <el-form-item label="商品介绍：" prop="remark">
                <el-input :disabled="isEdit" size="small" :rows="4" type="textarea" v-model="formValidate.remark"></el-input>
            </el-form-item>
            <el-form-item label="商品内容：" prop="content">
                <el-input :disabled="isEdit" size="small" :rows="4" type="textarea" v-model="formValidate.content"></el-input>
            </el-form-item>
            <el-form-item label="商品目标：" prop="target">
                <el-input :disabled="isEdit" size="small" :rows="4" type="textarea" v-model="formValidate.target"></el-input>
            </el-form-item>
            <el-form-item label="商品优势：" prop="advantage">
                <el-input :disabled="isEdit" size="small" :rows="4" type="textarea" v-model="formValidate.advantage"></el-input>
            </el-form-item>
            <p class="title">添加至：</p>
            <el-form-item label="教材：">
                <el-select :disabled="isEdit" @change="getTextbookVersion" size="small" v-model="textbookVersionId" filterable placeholder="请选择">
                    <el-option v-for="(item,index) in textbook" :key="item.id" :label="item.name"
                               :value="item"></el-option>
                </el-select>
                <br/>
                <el-tag
                        v-for="tag in textbookVersionList"
                        :key="tag.id"
                        closable
                        @close="handleCloseText(tag)">
                    {{tag.name}}
                </el-tag>
            </el-form-item>
            <el-form-item label="年级：">
                <el-select disabled size="small" v-model="formValidate.grade" placeholder="" @change="changGrade">
                    <grade-option-list></grade-option-list>
                </el-select>
            </el-form-item>
            <el-form-item label="科目：">
                {{formValidate.subject | subject }}
            </el-form-item>
            <!--<el-form-item label="章节：">-->
                <!--<el-select size="small" v-model="formValidate.chapterId" placeholder="请选择">-->
                    <!--<el-option v-for="item in chapterList" :label="item.name" :value="item.id"-->
                               <!--:key="item.id"></el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item style="margin-left:30%">
                <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
              <el-button class="tableMakeItemCancel" size="small" @click="cancle">取消</el-button>
            </el-form-item>
        </el-form>
        <Modal
                :mask-closable="false"
                width="1000"
                v-model="addModal"
                title="添加商品"
                class-name="vertical-center-modal"
                :loading="loading">
            <modal-header slot="header" :content="addId"></modal-header>
            <test-list v-if="addModal" @cancel="close" @choice="subCallback" :papers="formValidate.papers"></test-list>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
    let Util = null
    import gradeOptionList from '../../common/gradeOption.vue'
    import productTypeOption from '../../common/productTypeOption.vue'
    import testList from '../test_list'
    import api from './api'
    import {add as rules} from '../integralManage/rules'

    export default {
        props: ['operailityData'],
        data() {
            return {
                rules,
                self: false,
                loading: false,
                resourceHttp: '',
                papersArr: [],
                knowledgeIds: '',
                knowledgeIdArr: [],
                knowledgeList: [],
                chapterList: [],
                paperList:[],
                textbookVersionId:'',
                textbookVersionList:[],
                radio: '',
                discount: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
                formValidate: {
                    status: 0
                },
                addId: {
                    id: 'add',
                    title: '选择试卷'
                },
                fileList: [],
                actionUrl: this.$util.urlPrefix + '/file/uploadImg',
                subjectList: [{value: '语文'}, {value: '数学'}, {value: '英语'}],
                textbook: [],
                isSubcall:false,
                isEdit:null,
                editMessTitle: {
                    type: 'edit',
                    callback: 'close',
                    successTitle: '修改成功!',
                    errorTitle: '修改失败!',
                    ajaxSuccess: res => this.$emit('edit', 'edit', '修改成功!'),
                    ajaxError: 'ajaxError',
                    ajaxParams: {
                        url: api.modify.path,
                        method: api.modify.method,
                    }
                },

            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                Util = this.$util;
                this.ajax({
                    ajaxSuccess: res => {
                        this.textbook = res.data;
                        this.ajax({
                            ajaxSuccess: this.getData,
                            ajaxParams: {
                                url: api.get.path + '?id=' + this.operailityData.id,
                                method: api.get.method
                            }
                        })
                    },
                    ajaxParams: {
                        url: api.getTextbook.path,
                        method: api.getTextbook.method
                    }
                });
            },
            /*
             * 上传前校验
             * */
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png') ;
                const isLt2M = file.size / 1024 / 1024 < 2;
                const isLt10Kb = file.size / 1024 > 30;
                if (!isJPG) {
                    this.$Notice.warning({
                        title: '只能上传图片',
                        desc: '格式为: JPG、png 格式!'
                    });
                }
                if (!isLt2M) {
                    this.$Notice.warning({
                        title: '超出文件大小限制',
                        desc: '上传头像图片 ' + file.name + ' 太大，不能超过 2MB!'
                    });
                }
                if (!isLt10Kb) {
                    this.$Notice.warning({
                        title: '文件大小限制',
                        desc: '上传头像图片 ' + file.name + ' 分辨率太小，不能小于550 * 550像素'
                    });
                }
                return isJPG && isLt2M && isLt10Kb;
            },
            /*
            * 年级改变对应获取该年级下的对应课程
            * */
            changGrade(val) {
                this.subjectList = this.that.$store.getters['app/gradeMap'](val)
            },
            getData(res) {
                let that = this
                this.resourceHttp = this.$store.getters['app/envs']('resourceHttp');
                res.data.status == '3' ? this.isEdit = false : this.isEdit = true;
                res.data.status == '2' ? this.isEdit = false : this.isEdit = true;
                this.formValidate = res.data;
                let disCount = String(this.formValidate.discount/10);
                if(disCount.indexOf('.') < -1) {
                    this.formValidate.discount = String(this.formValidate.discount/10);
                } else {
                    this.self = true
                }
                this.formValidate.unit = String(this.formValidate.unit);
                this.formValidate.types = String(this.formValidate.types);
                this.formValidate.stage = String(this.formValidate.stage);
                this.formValidate.grade = String(this.formValidate.grade);
                this.paperList = this.formValidate.paperList;
                if(this.formValidate.chapterId) {
                    this.formValidate.chapterId = String(this.formValidate.chapterId);
                }
                if(this.paperList) {
                    this.paperList.map(function(item) {
                        that.papersArr.push(item.id)
                    })
                }
                if(this.formValidate.imgs) {
                    let arr = this.formValidate.imgs.split(',');
                    arr.map(function(item) {
                        that.fileList.push({
                            name: item,
                            url: that.resourceHttp + item
                        })
                    })
                }
                if(this.formValidate.tags){
                    let arr = this.formValidate.tags.split(',');
                    this.radio = this.formValidate.icon;
                    arr.map(function(item) {
                        that.knowledgeList.push({
                            name: item
                        })
                    })
                }
                if(this.formValidate.textbookVersionId){
                    let arr = this.formValidate.textbookVersionId.split(',');
                    this.radio = this.formValidate.icon;
                    arr.map(function(item) {
                        that.textbook.map(function(child) {
                            if(item == child.id){
                                that.textbookVersionList.push(child)
                            }
                        })
                    })
                }
            },
            /*
            * 试卷删除回调
            * **/
            handleClose(tag) {
                this.formValidate.paperList.splice(this.formValidate.paperList.indexOf(tag), 1);
                console.log(this.formValidate.paperList)
            },
            /*
            * 教材点删除回调
            * **/
            handleCloseText(tag) {
                this.textbookVersionList.splice(this.textbookVersionList.indexOf(tag), 1);
            },
            /*
           * 选中教材展示
           * **/
            getTextbookVersion(val){
                this.textbookVersionId = val.name;
                if(this.textbookVersionList.indexOf(val) < 0 && this.textbookVersionList.length < 11) {
                    this.textbookVersionList.push(val);
                }

            },
            // 从服务器获取选择数据
            getSelectDataForServer() {
                let opt = {
                    ajaxSuccess: res => {
                        this.chapterList = res.data;
                        console.log(res.data)
                    },
                    ajaxError: () => this.errorMess('获取数据失败，请重试'),
                    ajaxParams: {
                        url: 'textbookContent/queryChapterList',
                        params: {
                            textbookVersionId: this.formValidate.textbookVersionId,
                            grade: this.formValidate.grade,
                            subject: this.formValidate.subject,
                            term: ''
                        }
                    }
                };
                this.ajax(opt)
            },
            /*
            * 选中知识点展示
            * **/
            getknowledgeIds(val) {
                this.knowledgeIds = val.name
                if(this.knowledgeList.indexOf(val) > 0 && this.knowledgeList.length < 11) return
                this.knowledgeList.push(val)
            },
            //试题选择回调函数
            subCallback(obj) {
                this.addModal = false;
                this.isSubcall = true;
                this.papersArr = this.papersArr.concat(obj.ids)
                this.formValidate.grade = String(obj.grade);
                this.formValidate.subject = obj.subject;
                this.formValidate.spec = obj.ids.length;
//                this.formValidate.textbookVersionId = Number(obj.textbookVersionId)
                this.formValidate.papers = Util.unique(this.papersArr).join()
                this.getKnowledges()
            },
            close(targer) {
                this[targer + 'Modal'] = false;
            },
            /*
            * 获取知识点
            * */
            getKnowledges() {
                this.ajax({
                    ajaxSuccess: res => this.knowledgeIdArr = res.data,
                    ajaxParams: {
                        url: '/papers/queryKnowledgeList?paperIds=' + this.formValidate.papers,
                        method: 'get'
                    }
                })
            },
            // removeLable(item) {
            //     var index = this.formValidate.lable.indexOf(item)
            //     if (index !== -1) {
            //     this.formValidate.lable.splice(index, 1)
            //     }
            // },
            // addLable() {
            //     this.formValidate.lable.push({
            //     value: '',
            //     key: Date.now()
            //     });
            // },
            cancle() {
                this.$emit('cancel', 'edit')
            },
            choice() {
                this.addModal = true;
            },

            // 图片上传
            // 图片上传
            uploadSuccess(res, file, fileList) {
                this.fileList = fileList;
                this.fileList.map(function(item) {
                    if(item.response != undefined) {
                        item.name = item.response.data
                    }
                })
                this.radio = this.fileList[0].name;
            },
            /*
            * 点击提交按钮 监听是否验证通过
            * @param formName string  form表单v-model数据对象名称
            * @return flag boolean   form表单验证是否通过
            * */
            submitForm(formName) {
                let flag = false;
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        flag = true;
                    }
                });
                return flag;
            },
            getImgs() {
                let arr = [];
                this.fileList.map(function(item) {
                    if(item.response != undefined) {
                        item.url = item.response.data
                    } else {
                        item.url = item.name
                    }
                    arr.push(item.url)
                })
                this.formValidate.imgs = arr.join(',')
            },
            /*
            * 点击提交按钮 监听是否提交数据
            * @param isLoadingFun boolean  form表单验证是否通过
            * */
            listenSubEvent(isLoadingFun) {
                this.getImgs()
                let isSubmit = this.submitForm("formValidate");
                if(isSubmit) {
                    this.formValidate.icon = this.radio
                    let textbookArr = []
                    this.textbookVersionList.map(function(item) {
                        textbookArr.push(item.id)
                    });
                    if(this.textbookVersionList.length == 0){
                        this.errorMess('请选择教材！');
                        return false
                    }
                    this.formValidate.textbookVersionId = textbookArr.join();
                    this.formValidate.discount = this.formValidate.discount*10;
                    this.formValidate.currentPrice = Math.round(this.formValidate.originalPrice * this.formValidate.discount /100);
                    if(!this.isSubcall){
                        if(this.paperList){
                            let paperArr = [];
                            this.paperList.map(function(item) {
                                paperArr.push(item.id)
                            })
                            this.formValidate.papers = paperArr.join(',');
                        }
                    }
                    delete this.formValidate.paperList;
                    delete this.formValidate.pageSize;
                    delete this.formValidate.curPage;
                    delete this.formValidate.limit;
                    delete this.formValidate.createTime;
                    delete this.formValidate.updateTime;
                    delete this.formValidate.commentNum;
                    delete this.formValidate.productTypes;

                    if(!isLoadingFun) isLoadingFun = function() {
                    };
                    isLoadingFun(true);
                    this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate);
                    this.ajax(this.editMessTitle, isLoadingFun)
                }
            },
            /*
            * 获取表单数据
            * @return string  格式:id=0&name=aa
            * */
            getFormData(data) {
                let myData = Util._.defaultsDeep({}, data);
                return myData;
            }
        },
        components: {
            testList,
            productTypeOption,
            gradeOptionList
        }
    }
</script>

<style lang="scss" scoped>
    .el-input {
        width: 60%;
    }

    .title {
        font-size: 20px;
        line-height: 40px
    }

    .item {
        width: 195px
    }
</style>
