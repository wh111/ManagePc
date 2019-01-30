import baseRules from '../../../formRules/base.js'; // 公共规则

let audit = {
  result:[baseRules.requiredNoEvent],
  suggestion:[baseRules.requiredNoEvent,baseRules.inputLen(1,250)]
}

export {
  audit
}
