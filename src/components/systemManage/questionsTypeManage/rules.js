import baseRules from '../../../formRules/base.js'; // 公共规则
let list = {
    name: [baseRules.inputLen(0, 50), baseRules.illegalChar()]//题型名称
}
let edit = {
    name: [baseRules.requiredNoEvent, baseRules.inputLen(0, 50), baseRules.illegalChar()],//题型名称
    groups: [baseRules.requiredNoEvent],
    publics: [baseRules.requiredNoEvent],
    childTypes: [baseRules.requiredNoEvent, baseRules.array]
}
export {
    list,
    edit
}
