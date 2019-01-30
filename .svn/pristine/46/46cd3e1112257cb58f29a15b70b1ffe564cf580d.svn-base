import baseRules from '../../../formRules/base.js';

let list = {
    account: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//账号
    name: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//账号
}
let add = {
    account: [
        baseRules.requiredNoEvent,
        baseRules.inputLen(0, 50),
        baseRules.illegalChar(),
        baseRules.cannottChinese],//账号
    name: [baseRules.requiredNoEvent, baseRules.inputLen(0, 50), baseRules.illegalChar()],//账号
    mobile: [baseRules.requiredNoEvent, baseRules.mobile],
    roleId: [baseRules.requiredNoEvent],//权限
    remark: [baseRules.inputLen(0, 200), baseRules.illegalChar()]//备注
}

export {
    list,
    add
}
