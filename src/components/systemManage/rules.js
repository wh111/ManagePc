import _ from 'lodash';
import baseRules from '../../formRules/base'; // 公共规则

// 知识体系-知识点设置
let knowledgeSystemManageSet = {
    beforeId: [baseRules.requiredNoEvent, baseRules.array]
};
let knowledgeSystemManageList = {
    name: [baseRules.inputLen(0, 50)]
}
// 知识体系-知识点设置
let knowledgeSystemManageAdd = {
    subject: baseRules.selectText,
    name: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
    remark: [baseRules.inputLen(0, 250)]
};

// 反馈回复
let feedbackManage = {
    reply: [baseRules.requiredNoEvent, baseRules.inputLen(1, 250)]
};

// 系统消息
let message = {
    title: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
    content: [baseRules.requiredNoEvent, baseRules.inputLen(1, 250)]
};
let team = {
    title: [baseRules.inputLen(0, 50)],
    no: [baseRules.inputLen(0, 50)]
}

let mechanismManageSearch = {
    title: baseRules.inputLen(0, 50)
}

let mechanismManage = {
    title: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
    address: [baseRules.requiredNoEvent, baseRules.inputLen(1, 100)],
    contacts: [baseRules.requiredNoEvent, baseRules.inputLen(1, 10)],
    mobile: [baseRules.requiredNoEvent, baseRules.mobile],
    telephone: [
        baseRules.requiredNoEvent,
        baseRules.inputLen(6, 9),
        baseRules.numbers],
    province: [baseRules.requiredNoEvent, baseRules.selectText],
    city: [baseRules.requiredNoEvent, baseRules.selectText],
    postcode: baseRules.postCode,
    orgLevel: [baseRules.requiredNoEvent, baseRules.selectText],
    proLevel: [baseRules.requiredNoEvent, baseRules.selectText],
    impLevel: [baseRules.requiredNoEvent, baseRules.selectText],
    operator: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
    auditStatus: [baseRules.requiredNoEvent, baseRules.selectText],
    remark: [baseRules.inputLen(0, 500)],
    
}

let distpickerRules = {
    currentProvince: baseRules.requiredNoEvent,
    currentCity: baseRules.requiredNoEvent
};

export {
    knowledgeSystemManageList,
    knowledgeSystemManageSet,
    knowledgeSystemManageAdd,
    feedbackManage,
    message,
    team,
    mechanismManageSearch,
    mechanismManage,
    distpickerRules
};
