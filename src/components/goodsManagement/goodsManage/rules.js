import baseRules from '../../../formRules/base.js'; // 公共规则
let list={
    title:[baseRules.inputLen(0,50),baseRules.illegalChar()],
}
let edit = {
  title:[baseRules.required,baseRules.inputLen(0,200),baseRules.illegalChar()],
  subtitle:[baseRules.required,baseRules.inputLen(0,200),baseRules.illegalChar()],
  press:[baseRules.required,baseRules.inputLen(0,200),baseRules.illegalChar()],
  sales:[baseRules.required,baseRules.numbers,baseRules.numberSection(0,100000)],
  originalPrice:[baseRules.required,baseRules.numbers,baseRules.numberSection(0,100000)],
  spec:[baseRules.required,baseRules.numbers,baseRules.numberSection(0,100000)],
}
export {
    list,
    edit
}
