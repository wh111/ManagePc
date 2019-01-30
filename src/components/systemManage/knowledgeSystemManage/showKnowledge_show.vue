<template>
    <div>
        <div id="showknowledge"></div>
        <p style="text-align: right">操作提示：可以通过鼠标左键拖动和鼠标滚轮缩放组织图</p>
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    var Echarts = require('echarts');
    import $ from 'jquery'

    import api from './api';

    export default {
        props: ['operailityData'],
        data() {
            return {
                myChart: null,
                option: {}
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.getShowData()
            },
            getShowData() {
                let opt = {
                    ajaxSuccess: res => {
                        if (res.data instanceof Array) {
                            this.getShowDataSuccess(res.data)
                        }
                    },
                    ajaxError: () => this.errorMess('获取数据失败，请重试'),
                    ajaxParams: {
                        url: api.infoImg.path,
                        method: api.infoImg.method,
                        params: {
                            subject: this.operailityData.subject
                        }
                    }
                };
                this.ajax(opt)
            },
            getShowDataSuccess(arr) {
                let temp = {}; // 知识点去重
                let data = []; // 所有知识点
                let edges = []; // 对应关系下标数组
                let index = {}; // 每个知识点的下标
                let start = 0; // 下标从0开始

                arr.map(item => {
                    if (!temp[item.id]) {
                        temp[item.id] = {
                            name: item.name,
                            id: item.id,
                            label: {
                                normal: {
                                    show: true
                                }
                            }
                        }
                    }
                })

                for (let key in temp) {
                    if (data.length) {
                        data.push(temp[key])
                    } else {
                        data.push({
                            fixed: true,
                            name: temp[key].name,
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            x: 500,
                            y: 300,
                            symbolSize: 10,
                            id: temp[key].id
                        })
                    }
                    // 记录下标
                    index[key] = start;
                    start++
                }

                arr.map(item => {
                    edges.push({
                        // 根据id获取关系索引
                        source: index[item.id],
                        target: index[item.beforeId]
                    })
                })

                let opt = {
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        animation: true,
                        roam: true,
                        hoverAnimation: true,
                        draggable: true,
                        focusNodeAdjacency: true,
                        data,
                        force: {
                            repulsion: 100,
                            edgeLength: 5
                        },
                        edges
                    }]
                };
                this.$nextTick(() => {
                    this.myChart.setOption(opt);
                })
            }
        },
        mounted() {
            this.myChart = Echarts.init(document.getElementById('showknowledge'));
        }
    }
</script>
<style lang="scss">
    #showknowledge {
        width: 100%;
        height: 600px;
    }
</style>
