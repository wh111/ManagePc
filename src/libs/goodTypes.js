/**
 * 商品类别
 * @type {*[]}
 */
const goodTypes = [
    {
        'code': "100",
        'name': "小升初"
    },
    {
        'code': "101",
        'name': "初升高"
    },
    {
        'code': "102",
        'name': "中考"
    },
    {
        'code': "103",
        'name': "高考"
    },
    {
        'code': "104",
        'name': "会考"
    },
    {
        'code': "105",
        'name': "期中"
    },
    {
        'code': "106",
        'name': "期末"
    },
    {
        'code': "107",
        'name': "初高衔接"
    },
    {
        'code': "108",
        'name': "寒暑假"
    },
    {
        'code': "109",
        'name': "同步学科"
    }
];

let goodType = {};
goodTypes.map(item => goodType[item.code.toUpperCase()] = item.name);

export {goodTypes, goodType}