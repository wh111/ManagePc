/**
 * 所有科目
 * @type {*[]}
 */
const subjects = [
    {
        "code": "Chinese",
        "value": "语文"
    },
    {
        "code": "Math",
        "value": "数学"
    },
    {
        "code": "English",
        "value": "英语"
    },
    {
        "code": "Physics",
        "value": "物理"
    },
    {
        "code": "Chemistry",
        "value": "化学"
    },
    {
        "code": "Politics",
        "value": "政治"
    },
    {
        "code": "History",
        "value": "历史"
    },
    {
        "code": "Geography",
        "value": "地理"
    },
    {
        "code": "Biology",
        "value": "生物"
    }
];

let subject = {};
subjects.map(item => subject[item.code.toUpperCase()] = item.value);

export {subjects, subject}