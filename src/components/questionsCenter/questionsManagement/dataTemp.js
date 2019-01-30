const question = {
    "id": "",    // 试题ID
    "no": "",    // 试题编号
    "subject": "", // 科目
    "grade": '', // 年级：1-12
    "term": 0, // 学期：0上学期/1下学期
    "openType": 0, // 权限：0共有题库/1私有题库

    "knowledgeList": [], // 知识点
    "diffLevelCode": '', // 试题难度
    "diffLevel": "", // 试题难度 -3 至 3
    "score": "",	// 试题分值
    "title": "",	// 题目内容
    "answer": "",	// 正确答案：多个|隔开
    "answerExplain": "", // 答案解析

    "has_img": 0,  //是否包含图片：0否/1是
    "has_video": 0, //是否包含音视频：0否/1是

    "questionsTypeId": "",  //题型ID
    "basicType": "", //基本题型：单选Radio/多选Checkbox/判断Judgment/问答Answer/填空Input
    "groups": "", // 是否组题:0否/1是
    "publics": "", // 是否公用候选项：0否/1是
    "isMain": 0, // 是否有主体干：0否/1是

    "parentId": "", // 所属题目id

    "questionsOptions": '', //选择题的选项，当publics=1时，代表共有候选项。
    "childQuestionsList": [] // 当 groups=1 也就是组题时，有此项 。并且结合publics来判断是否共有候选项。
};

// 选择题选项数据项
const questionsOptionsItem = {
    "optionsType": 0, // 题目类别：0文字/1图片/2音视频
    "options": "", // 选项(A/B/C)
    "content": "" // 选项文字内容
}

export {
    question, questionsOptionsItem
}