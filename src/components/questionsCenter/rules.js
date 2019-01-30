import baseRules from '../../formRules/base.js';

let questionsManageList = {
    id: [baseRules.inputLen(0, 50), baseRules.illegalChar()],
    title: [baseRules.inputLen(0, 50), baseRules.illegalChar()]
}
let questionsManageAdd = {
    subject: [baseRules.requiredNoEvent],
    term: [baseRules.requiredNoEvent],
    grade: [baseRules.requiredNoEvent],
    diffLevel: [baseRules.requiredNoEvent],
    diffLevelCode: [baseRules.requiredNoEvent],
    openType: [baseRules.requiredNoEvent],
    questionsTypeId: [baseRules.requiredNoEvent],
    // knowledgeList: [baseRules.required, baseRules.array],
    score: [baseRules.requiredNoEvent, baseRules.numberSection(0.1, 100), baseRules.float(2)],
    title: [baseRules.requiredNoEvent, baseRules.inputLen(1, 500)],
    answerExplain: [baseRules.requiredNoEvent, baseRules.inputLen(1, 500)]
}

let testPaperManagementEdit = {
    name: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)]
}

let testPaperManagementSearch = {
    title: baseRules.inputLen(0, 50),
    no: [baseRules.inputLen(0, 50), baseRules.numbers]
};

let testPaperManagementZn0 = {
    questionType: [baseRules.requiredNoEvent, baseRules.array],
    name: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
    remark: [baseRules.inputLen(0, 250)]
};

let testPaperManagementZn1 = {
    // diffLevel: [baseRules.requiredNoEvent, baseRules.selectId],
    selectChapter: [baseRules.requiredNoEvent, baseRules.array],
    selectknowledge: [baseRules.requiredNoEvent, baseRules.array]
};

let testPaperManagementZn2 = {
    times: [baseRules.requiredNoEvent, baseRules.numbers, baseRules.inputLen(1, 3)]
}

let testPaperManagementRg0 = {
    name: [baseRules.requiredNoEvent, baseRules.inputLen(1, 50)],
    remark: [baseRules.inputLen(0, 250)]
}

let wrongFeedbackReply = {
    reply: [baseRules.requiredNoEvent, baseRules.inputLen(1, 500)],
    point: [baseRules.requiredNoEvent, baseRules.number]
}
let wrongFeedbackList = {
    questionId: [baseRules.inputLen(0, 50)]
}

let mixQuestionEdit = {
    basicType: [baseRules.selectText],
    score: [baseRules.requiredNoEvent, baseRules.numberSection(0.1, 100), baseRules.float(2)],
    diffLevelCode: [baseRules.selectText],
    knowledgeList: [baseRules.requiredNoEvent]
}
export {
    questionsManageList,
    questionsManageAdd,
    testPaperManagementEdit,
    testPaperManagementSearch,
    testPaperManagementZn0,
    testPaperManagementZn1,
    testPaperManagementZn2,
    testPaperManagementRg0,
    wrongFeedbackReply,
    wrongFeedbackList,
    mixQuestionEdit
}
