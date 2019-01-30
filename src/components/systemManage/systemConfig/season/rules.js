import baseRules from '../../../../formRules/base.js'

let addMatch = {
    title: [baseRules.required],
    startTime: [baseRules.requiredNoEvent],
    endTime: [baseRules.requiredNoEvent],
    // studyType: [baseRules.selectText],
    // textbookVersionNewList: [baseRules.mustHasOne],
    // length: [baseRules.mustHasOne],
    // school: [baseRules.inputLen(0, 30)]
}
export {
    addMatch,
}
