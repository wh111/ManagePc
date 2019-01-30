import baseRules from '../../../formRules/base.js'; // 公共规则
let list = {
  title: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//题型名称
}
let add = {
  title:[baseRules.required,baseRules.inputLen(0,200),baseRules.illegalChar()],
  subtitle:[baseRules.required,baseRules.inputLen(0,200),baseRules.illegalChar()],
  press:[baseRules.required,baseRules.inputLen(0,200),baseRules.illegalChar()],
  sales: [baseRules.requiredNoEvent, baseRules.greaterThanZero],
    originalPrice: [baseRules.required, baseRules.numberSection(0.01, 100000)],
  discount: [baseRules.requiredNoEvent]
  // spec:[baseRules.required,baseRules.numbers,baseRules.numberSection(0,100000)],
}
let testList = {
  name: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//试卷名称
}
export {
  list,
  add,
  testList
}
