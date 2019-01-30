import _ from 'lodash';
import baseRules from '../../../formRules/base.js'; // 公共规则

let add = {
    name:[baseRules.requiredNoEvent,baseRules.illegalChar(),baseRules.inputLen(1,50)],//用户名
    remark: [baseRules.illegalChar(), baseRules.inputLen(0, 200),],
}
let search = {
    name:[baseRules.inputLen(0,50),baseRules.illegalChar()]
}
export {
    add,
    search
}
