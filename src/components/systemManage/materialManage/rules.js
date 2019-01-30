import baseRules from '../../../formRules/base.js'; // 公共规则
let list={
    name:[baseRules.inputLen(0,20),baseRules.illegalChar()],//题型名称
}
let add = {
    name:[baseRules.required,baseRules.inputLen(0,50),baseRules.illegalChar()],//题型名称
    stage:[baseRules.required],
    length:[baseRules.required],
    grade:[baseRules.required],
    subject:[baseRules.required],
    term:[baseRules.required]

}
let versionAdd = {
    name:[baseRules.required,baseRules.inputLen(0,50),baseRules.illegalChar()],
}
export {
    list,
    add,
    versionAdd
}
