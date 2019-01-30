const file = '/';//当前模块api前缀
const api = {
    statisticsBInMoneyLine: {//充值记录折线图
        path: '/statistics/statisticsBInMoney/lineChart',
        method: 'get'
    },
    statisticsBInMoney: {//充值记录历史统计
        path: '/statistics/statisticsBInMoney/statistics',
        method: 'get'
    },
    productPayment: {//销售历史统计
        path: '/statistics/productPayment/statistics',
        method: 'get'
    },
    productPaymentLine: {//销售历史折线图
        path: '/statistics/productPayment/lineChart',
        method: 'get'
    },
    
}
export default api 
