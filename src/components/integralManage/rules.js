import baseRules from '../../formRules/base.js'; // 公共规则
let list = {
    nickname: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//用户姓名
}
export {
    list
}
