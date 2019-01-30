import baseRules from '../../../formRules/base.js';

let list = {
  town: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//学校
  account: [baseRules.inputLen(0, 50), baseRules.illegalChar()],//账号
  // name: [baseRules.inputLen(0, 20), baseRules.illegalChar()],//账号
}

let add = {
  name: [baseRules.inputLen(0, 50), baseRules.illegalChar(),baseRules.requiredNoEvent],
    account: [
        baseRules.inputLen(0, 50),
        baseRules.illegalChar(),
        baseRules.requiredNoEvent,
        baseRules.cannottChinese],
  mobile:[baseRules.mobile],
  wechat:[baseRules.inputLen(0, 50), baseRules.illegalChar()],
  qq:[baseRules.number],
  textbookVersionId:[baseRules.requiredNoEvent],
  stage:[baseRules.requiredNoEvent],
  grade:[baseRules.requiredNoEvent],
  length:[baseRules.requiredNoEvent],
  school:[baseRules.inputLen(0, 200), baseRules.illegalChar(),baseRules.requiredNoEvent],
    textbookVersionList: [baseRules.requiredNoEvent],
}
let addVip = {
  deadline:[baseRules.requiredNoEvent]
}
export {
  list,
  add,
  addVip
}
