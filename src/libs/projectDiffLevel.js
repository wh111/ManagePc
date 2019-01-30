/**
 * 题目难易程度
 * @type {*[]}
 */
const projectDiffLevels = [
    {
        "code": "easy",
        "value": "易"
    },
    {
        "code": "normal",
        "value": "中"
    },
    {
        "code": "hard",
        "value": "难"
    }
];

let projectDiffLevel = {};
projectDiffLevels.map(item => projectDiffLevel[item.code.toUpperCase()] = item.value);

export {projectDiffLevels, projectDiffLevel}