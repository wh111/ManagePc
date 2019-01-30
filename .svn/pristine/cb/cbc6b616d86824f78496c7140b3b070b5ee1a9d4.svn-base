import baseRules from '../../formRules/base.js';

let CongregationAdd = {
    name: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],//任务名称
    beginTime: [baseRules.requiredNoEvent],
    endTime: [baseRules.requiredNoEvent],
    remark: [baseRules.requiredNoEvent, baseRules.inputLen(1, 250)],
    textbookVersionId: [baseRules.requiredNoEvent],
    // grade: [baseRules.requiredNoEvent],
    // subject: [baseRules.requiredNoEvent],
    seasonId: [baseRules.requiredNoEvent],
    integral: [baseRules.requiredNoEvent, baseRules.float(2)],
    term: [baseRules.requiredNoEvent]
}

let CongregationModify = {
    msg: [baseRules.required, baseRules.inputLen(1, 250)]
}

let submitDataRules = {
    reason: [baseRules.requiredNoEvent, baseRules.inputLen(1, 250)]
}

export {
    CongregationAdd,
    CongregationModify,
    submitDataRules
}
