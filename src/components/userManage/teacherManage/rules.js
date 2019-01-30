import baseRules from '../../../formRules/base.js';

let list = {
    school: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//学校
    name: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//姓名
    account: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//账号
    mobile: [baseRules.mobile],//手机号
    idcard: [baseRules.inputLen(0, 50)],
    orgId: [baseRules.inputLen(0, 50)],
    subject: [baseRules.inputLen(0, 50)],
    teachCertNo: [
        baseRules.numbers,
        baseRules.inputLen(17, 17),
        baseRules.requiredNoEvent],
}

let add = {
    account: [
        baseRules.required,
        baseRules.inputLen(1, 50),
        baseRules.illegalChar(),
        baseRules.cannottChinese],//账号
    name: [baseRules.required, baseRules.inputLen(1, 50), baseRules.illegalChar()],//姓名
    mobile: [baseRules.mobile],//手机号
    school: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//学校
    teachCertNo: [
        baseRules.numbers,
        baseRules.inputLen(17, 17),
        baseRules.requiredNoEvent],
  teachYears: [baseRules.requiredNoEvent, baseRules.numberSection(0, 100)],
    idcard: [baseRules.idNumber],//身份证号
    types: [baseRules.requiredNoEvent],//资格种类
    subject: [baseRules.requiredNoEvent],//学科
    textbookVersionId: [baseRules.requiredNoEvent],
}
export {
    list,
    add
}
