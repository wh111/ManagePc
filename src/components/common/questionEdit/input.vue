<!--
****--@file     input
****--@date     2017/12/26 17:21
****--@author   YC
****--@describe 填空题
-->
<template>
    <el-row>
        <el-form :labelWidth="labelWidthStr">
            <el-col>
                <p>题目内容</p>
                <el-form-item label="标题：">
                    <el-col>
                        <p v-if="!edits.title">
                            <el-input :rows="4" type="textarea"
                                      v-model="formValidate.title"></el-input>
                        </p>
                        <div v-else>
                            <view-u-editor style="width: 100%" name="title" @storeUE="storeUE"
                                           @getUeditorVal="getUeditorVal"
                                           :ueditor-val="formValidate"
                                           :ueditor-config="ueditorConfig"></view-u-editor>
                        </div>
                    </el-col>
                    <el-col class="editTodoBtnBox" align="right">
                        <span>填空题说明：请用 <b>三个下划线</b> 代表一个需要填空的位置如  ___ </span>
                        <el-button @click="changeEdit('title')">{{ edits.title ? '文本' : '图文' }}编辑</el-button>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col>
                <p>答案详情</p>
                <el-form-item label="正确答案：" prop="answer">
                    <p v-if="!edits.answer">
                        <el-input :rows="4" type="textarea"
                                  v-model="formValidate.answer"></el-input>
                    </p>
                    <div v-else>
                        <view-u-editor style="width: 100%" name="answer" @storeUE="storeUE"
                                       @getUeditorVal="getUeditorVal"
                                       :ueditor-val="formValidate"
                                       :ueditor-config="ueditorConfig"></view-u-editor>
                    </div>
                    <el-col class="editTodoBtnBox" align="right">
                        <el-button @click="changeEdit('answer')">{{ edits.answer ? '文本' : '图文' }}编辑</el-button>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col>
                <el-form-item label="题目解析：" prop="answerExplain">
                    <p v-if="!edits.answerExplain">
                        <el-input :rows="4" type="textarea"
                                  v-model="formValidate.answerExplain"></el-input>
                    </p>
                    <div v-else>
                        <view-u-editor style="width: 100%" name="answerExplain" @storeUE="storeUE"
                                       @getUeditorVal="getUeditorVal"
                                       :ueditor-val="formValidate"
                                       :ueditor-config="ueditorConfig"></view-u-editor>
                    </div>
                    <el-col class="editTodoBtnBox" align="right">
                        <el-button @click="changeEdit('answerExplain')">{{ edits.answerExplain ? '文本' : '图文' }}编辑</el-button>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-form>
    </el-row>
</template>
<style>
    .editTodoBtnBox {
        margin-top: 10px
    }
</style>
<script>
    /*当前组件必要引入*/
    import viewUEditor from '../showUeditor.vue' // 富文本编辑器
    //当前组件引入全局的util
    let Util = null;
    export default {
        props: ['fromData', 'labelWidth'],
        data() {
            return {
                labelWidthStr: this.labelWidth || '100px',
                formValidate: {},

                edits: {},
                //富文本编译器
                UE: {},
                ueditorConfig: {
                    //详细配置参考UEditor 官网api
                    initialFrameHeight: 200  //初始化编辑器高度,默认320
                }
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                let data = this.$util._.defaultsDeep({}, this.fromData);
                this.formValidate = data;
                this.initEditState()
            },
            initEditState() {
                let formObj = this.formValidate;
                let editKey = ['title', 'answer', 'answerExplain'];
                editKey.map(k => {
                    let key = k.split('_');
                    if (formObj[key[0]] instanceof Array) {
                        formObj[key[0]].map((item, index) => {
                            if (this.$util.hasHtmlTag(item[key[1]])) {
                                this.edits[key[0] + '_' + index + '_' + key[1]] = true;
                            }
                        })
                    } else {
                        if (this.$util.hasHtmlTag(formObj[key[0]])) {
                            this.edits[key[0]] = true;
                        }
                    }
                })
            },
            /**
             *
             * 存储编辑器的value值
             * @param name {string}  编辑器的name
             *
             * @param val  {string}  编辑器的内容
             *
             */
            getUeditorVal(name, val) {
                let arr = name.split('_');
                if (arr.length > 1) {
                    if (arr.length == 3) {
                        this.formValidate[arr[0]][arr[1]][arr[2]] = val;
                    } else {
                        this.formValidate[arr[0]][arr[1]] = val;
                    }
                } else {
                    this.formValidate[name] = val;
                }
            },

            /**
             *
             * 存储编辑器的UE.editor对象
             * @param name {string}  编辑器的name
             *
             * @param editor {}      编辑器的对象
             *
             */
            storeUE(name, editor) {
                this.UE[name] = editor;
                this.edits[name] = true;
            },
            /**
             * 图文切换
             * @param name
             */
            changeEdit(name) {
                // 每次切换模式都清除原来的值
                let arr = name.split('_');
                if (arr.length > 1) {
                    if (arr.length == 3) {
                        this.formValidate[arr[0]][arr[1]][arr[2]] = '';
                    } else {
                        this.formValidate[arr[0]][arr[1]] = '';
                    }
                } else {
                    this.formValidate[name] = '';
                }
                if (this.edits[name] == undefined) {
                    let opt = {};
                    opt[name] = true;
                    this.edits = this.$util._.defaultsDeep({}, this.edits, opt);
                } else {
                    this.edits[name] = !this.edits[name]
                }
            },
            // 检测数据是否完整
            checkData() {
                if (!this.formValidate.title) {
                    this.errorMess('请填写题目标题');
                    return false
                }

                if (this.formValidate.answer === '') {
                    this.errorMess('请填写答案');
                    return false
                }
                return true
            },
            /**
             * 获取当前编辑的所有数据
             * @returns {*}
             */
            getEditVal() {
                if (!this.checkData()) {
                    return false
                }
                let data = this.$util._.defaultsDeep({}, this.formValidate);
                return data
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        components: {
            viewUEditor
        }
    }

</script>