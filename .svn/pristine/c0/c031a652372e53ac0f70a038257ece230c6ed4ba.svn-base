<!--
****--@file     orderItem
****--@date     2017/11/24 11:01
****--@author   YC
****--@describe 订单列表项
-->
<template>
    <el-row class="orderItem">
        <el-form :inline="true">
            <el-col :span="4">
                <el-form-item label="序号：">{{ showData.index }}</el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="订单编号：">{{ showData.no }}</el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="购买用户：">{{ showData.userName }}</el-form-item>
            </el-col>
            <el-col :span="6" align="right">
                <el-form-item label="下单时间：">{{ showData.paymentTime | formatDate('yyyy-MM-dd HH:dd') }}</el-form-item>
            </el-col>
        </el-form>

        <el-table :data="showData.productList" :span-method="objectSpanMethod" border>
            <el-table-column label="商品图片">
                <template slot-scope="scope">
                    <img :src="resourceHttp + scope.row.icon" alt="" width="80" height="80">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="商品名称"></el-table-column>
            <el-table-column prop="unit" label="单位">
                <template slot-scope="scope">
                    {{scope.row.unit | unit}}
                </template>
            </el-table-column>
            <el-table-column prop="spec" label="商品规格"></el-table-column>
            <el-table-column prop="spec" label="数量"></el-table-column>
            <el-table-column prop="currentPrice" label="兑换积分">
                <template slot-scope="scope">
                    {{scope.row.currentPrice }}积分
                </template>
            </el-table-column>
            <el-table-column prop="currentPrice" label="消耗积分">
                <template slot-scope="scope">
                    -{{scope.row.currentPrice}}积分
                </template>
            </el-table-column>
            <!--<el-table-column label="剩余积分">-->
                <!--<template slot-scope="scope">-->
                    <!--{{showData.userIntegral}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    {{ showData.status | orderStatus }}
                </template>
            </el-table-column>

        </el-table>

        <el-form :inline="true" class="noMargin marginTop10">
            <el-col :span="16" v-if="cancel">
                <el-button type="danger" size="mini" @click="cancelFun">撤单</el-button>
                <el-button type="info" size="mini">剩余<b>{{state.dd}}天{{state.hh}}小时{{state.mm}}分钟{{state.ss}}秒</b>自动撤单
                </el-button>
            </el-col>
            <el-col :span="cancel ? 8 : 24" align="right">
                <el-form-item label="订单总价：">{{ showData.totalPrice | money }}</el-form-item>
            </el-col>
        </el-form>
    </el-row>
</template>
<style lang="scss">
    @import "../../../assets/ambuf/css/order/item";
</style>
<script>
    /*当前组件必要引入*/

    //当前组件引入全局的util
    let Util = null;
    export default {
        props: ['showData'],
        data() {
            return {
                resourceHttp: '',
                cancel: false,
                state: {
                    dd: 0,
                    hh: 0,
                    mm: 0,
                    ss: 0
                },
                interval: null
            }
        },
        methods: {
            //初始化请求列表数据
            init() {
                this.resourceHttp = this.$store.getters['app/envs']('resourceHttp');
                this.showData.status === 0 && this.startCountDown()
            },
            cancelFun() {
                this.$emit('cancel')
            },
            objectSpanMethod({rowIndex, columnIndex}) {
                if (rowIndex === 8) {
                    return {
                        rowspan: this.showData.productList.length,
                        colspan: 0
                    };
                }
            },
            startCountDown() {
                this.interval = setInterval(() => this.countDown('2017-11-24 17:52'), 1000)
            },
            countDown(date) {
                let toDate = new Date(date || '').getTime();
                let now = Date.now();
                let subTime = toDate - now;
                let sub = subTime / 1000 | 0;
                if (toDate < now - 60) {
                    this.cancel = false;
                    clearInterval(this.interval);
                    this.interval = null;
                    return
                } else {
                    this.cancel = true;
                }
                this.setState({
                    ss: ((subTime / 1000) % 60).toFixed(0),
                    mm: (sub / 60 | 0) % 60,
                    hh: (sub / 60 / 60 | 0) % 24,
                    dd: (sub / 60 / 60 / 24 | 0)
                })
            },
            setState(obj) {
                for (let key in obj) {
                    this.state[key] = obj[key]
                }
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        beforeDestroy() {
            clearInterval(this.interval);
            this.interval = null;
        },
        components: {}
    }

</script>
